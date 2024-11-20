import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text, ActivityIndicator, Image } from "react-native";
import Geocoder from "react-native-geocoding";
import * as Location from 'expo-location';
import { useEffect, useState, useRef } from "react";
import MapViewDirections from 'react-native-maps-directions';

export default function GoogleMapsScreen({ pasIda, pasVolta, role }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [embarkMarkers, setEmbarkMarkers] = useState([]);
    const [destinationMarkers, setDestinationMarkers] = useState([]);
    const [returnMarkers, setReturnMarkers] = useState([]);
    const [schoolMarkers, setSchoolMarkers] = useState([]);
    const [geoicon, setGeoicon] = useState(null);
    const mapRef = useRef(null);

    const GOOGLE_MAPS_APIKEY = "AIzaSyCeMxhjNXwFVUsm5fjmwWE5rzxbBewq9pU";
    Geocoder.init(GOOGLE_MAPS_APIKEY);

    const simulatedDriverLocation = {
        latitude: -22.8039696, // Coordenadas simuladas para o motorista
        longitude: -45.1875496, // Coordenadas simuladas
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão para acessar a localização negada!');
                setLoading(false);
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (role === "motor") {
            setGeoicon(require("../../assets/icons/van-icon.png"));
        } else if (role === "user") {
            setGeoicon(require("../../assets/icons/localizacao-icon.png"));
        }
    }, [role]);

    const handleAddressToCoordinates = async (address) => {
        try {
            const json = await Geocoder.from(address);
            const location = json.results[0].geometry.location;
            return {
                latitude: location.lat,
                longitude: location.lng
            };
        } catch (error) {
            console.warn(error);
            return null;
        }
    };

    // Carregar marcadores de embarque e destinos para 'pasIda'
    useEffect(() => {
        const loadEmbarkMarkers = async () => {
            const embarkMarkers = await Promise.all(
                pasIda.map(async (passenger) => {
                    const address = `${passenger.EnderecoEmbarque}, ${passenger.BairroEmbarque}, ${passenger.CidadeEmbarque}, ${passenger.UfEmbarque}, Brasil`;
                    const coordinates = await handleAddressToCoordinates(address);
                    return coordinates ? { ...coordinates, title: `Embarque: ${passenger.useNome}` } : null;
                })
            );
            setEmbarkMarkers(embarkMarkers.filter(marker => marker !== null));
        };

        const loadDestinationMarkers = async () => {
            const groupedBySchool = pasIda.reduce((acc, passenger) => {
                const schoolAddress = `${passenger.EnderecoEscolaRua}, ${passenger.EnderecoEscolaBairro}, ${passenger.EnderecoEscolaCidade}, ${passenger.EnderecoEscolaUf}`;
                const schoolName = passenger.NomeEscola;

                if (!acc[schoolAddress]) acc[schoolAddress] = { schoolName, passengers: [] };
                acc[schoolAddress].passengers.push(passenger.useNome);

                return acc;
            }, {});

            const destinationMarkers = await Promise.all(
                Object.entries(groupedBySchool).map(async ([schoolAddress, { schoolName, passengers }]) => {
                    const coordinates = await handleAddressToCoordinates(`${schoolAddress}, Brasil`);
                    return coordinates ? { ...coordinates, title: schoolName, description: `Passageiros: ${passengers.join(", ")}` } : null;
                })
            );
            setDestinationMarkers(destinationMarkers.filter(marker => marker !== null));
        };

        loadEmbarkMarkers();
        loadDestinationMarkers();
    }, [pasIda]);

    // Carregar marcadores de desembarque e escolas para 'pasVolta'
    useEffect(() => {
        const loadReturnMarkers = async () => {
            const returnMarkers = await Promise.all(
                pasVolta.map(async (passenger) => {
                    const address = `${passenger.EnderecoDesembarque}, ${passenger.BairroDesembarque}, ${passenger.CidadeDesembarque}, ${passenger.UfDesembarque}, Brasil`;
                    const coordinates = await handleAddressToCoordinates(address);
                    return coordinates ? { ...coordinates, title: `Desembarque: ${passenger.useNome}` } : null;
                })
            );
            setReturnMarkers(returnMarkers.filter(marker => marker !== null));
        };

        const loadSchoolMarkers = async () => {
            const groupedBySchool = pasVolta.reduce((acc, passenger) => {
                const schoolAddress = `${passenger.EnderecoEscolaRua}, ${passenger.EnderecoEscolaBairro}, ${passenger.EnderecoEscolaCidade}, ${passenger.EnderecoEscolaUf}`;
                const schoolName = passenger.NomeEscola;

                if (!acc[schoolAddress]) acc[schoolAddress] = { schoolName, passengers: [] };
                acc[schoolAddress].passengers.push(passenger.useNome);

                return acc;
            }, {});

            const schoolMarkers = await Promise.all(
                Object.entries(groupedBySchool).map(async ([schoolAddress, { schoolName, passengers }]) => {
                    const coordinates = await handleAddressToCoordinates(`${schoolAddress}, Brasil`);
                    return coordinates ? { ...coordinates, title: schoolName, description: `Passageiros: ${passengers.join(", ")}` } : null;
                })
            );
            setSchoolMarkers(schoolMarkers.filter(marker => marker !== null));
        };

        loadReturnMarkers();
        loadSchoolMarkers();
    }, [pasVolta]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Aguarde, carregando mapa...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {/* Marcador da localização atual */}
                <Marker
                    coordinate={{
                        latitude: location?.coords.latitude || 0,
                        longitude: location?.coords.longitude || 0,
                    }}
                    title="Sua localização"
                >
                    <Image
                        source={geoicon}
                        style={{ width: 40, height: 40, resizeMode: "contain" }}
                    />
                </Marker>

                {/* Marcador para simular o motorista */}
                {role === "user" && (
                    <Marker
                        coordinate={simulatedDriverLocation}
                        title="Localização do motorista"
                    >
                        <Image
                            source={require("../../assets/icons/van-icon.png")}
                            style={{ width: 40, height: 40, resizeMode: "contain" }}
                        />
                    </Marker>
                )}

                {/* Marcadores de embarque */}
                {embarkMarkers.map((marker, index) => (
                    <>
                        <Marker
                            key={`embark-marker-${index}`}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            title={marker.title}
                        >
                            <Image
                                source={require("../../assets/icons/user-icon.png")}
                                style={{ width: 35, height: 35, resizeMode: "contain" }}
                            />
                        </Marker>
                        <MapViewDirections
                            key={`embark-directions-${index}`}
                            origin={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            destination={{ latitude: marker.latitude, longitude: marker.longitude }}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={4}
                            strokeColor="blue"
                        />
                    </>
                ))}

                {/* Direções e marcadores de destino */}
                {destinationMarkers.map((marker, index) => (
                    <>
                        <Marker
                            key={`destination-marker-${index}`}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            title={marker.title}
                            description={marker.description}
                        >
                            <Image
                                source={require("../../assets/icons/escola-icon.png")}
                                style={{ width: 40, height: 40, resizeMode: "contain" }}
                            />
                        </Marker>
                        <MapViewDirections
                            key={`destination-directions-${index}`}
                            origin={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            destination={{ latitude: marker.latitude, longitude: marker.longitude }}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={4}
                            strokeColor="orange"
                        />
                    </>
                ))}

                {/* Outros marcadores: desembarque e escola */}
                {returnMarkers.map((marker, index) => (
                    <>
                        <Marker
                            key={`return-marker-${index}`}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            title={marker.title}
                        >
                            <Image
                                source={require("../../assets/icons/desembarque-icon.png")}
                                style={{ width: 35, height: 35, resizeMode: "contain" }}
                            />
                        </Marker>
                        <MapViewDirections
                            key={`embark-directions-${index}`}
                            origin={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            destination={{ latitude: marker.latitude, longitude: marker.longitude }}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={4}
                            strokeColor="blue"
                        />
                    </>
                ))}

                {/* Direções e marcadores de destino */}
                {schoolMarkers.map((marker, index) => (
                    <>
                        <Marker
                            key={`school-marker-${index}`}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            title={marker.title}
                            description={marker.description}
                        >
                            <Image
                                source={require("../../assets/icons/escola-icon.png")}
                                style={{ width: 40, height: 40, resizeMode: "contain" }}
                            />
                        </Marker>
                        <MapViewDirections
                            key={`school-directions-${index}`}
                            origin={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            destination={{ latitude: marker.latitude, longitude: marker.longitude }}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={4}
                            strokeColor="orange"
                        />
                    </>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
