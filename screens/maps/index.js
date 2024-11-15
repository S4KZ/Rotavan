import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text, ActivityIndicator, Image } from "react-native";
import Geocoder from "react-native-geocoding";
import * as Location from 'expo-location';
import { useEffect, useState, useRef } from "react";
import { getDistance } from 'geolib';
import MapViewDirections from 'react-native-maps-directions';

export default function GoogleMapsScreen({ pasIda, pasVolta, role }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [embarkMarkers, setEmbarkMarkers] = useState([]);
    const [destinationMarkers, setDestinationMarkers] = useState([]);
    const [returnMarkers, setReturnMarkers] = useState([]);
    const [schoolMarkers, setSchoolMarkers] = useState([]);
    const mapRef = useRef(null);

    const GOOGLE_MAPS_APIKEY = "";
    Geocoder.init(GOOGLE_MAPS_APIKEY);

    if (role === "motor") {
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
            loadEmbarkMarkers();
        }, [pasIda]);

        useEffect(() => {
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
            loadDestinationMarkers();
        }, [pasIda]);

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
            loadReturnMarkers();
        }, [pasVolta]);

        useEffect(() => {
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
            loadSchoolMarkers();
        }, [pasVolta]);
        console.log("Motor view with pasIda:", pasIda, "and pasVolta:", pasVolta);
    } else if (role === "user") {
        // User-specific functions
        console.log("User view, only basic map features enabled");
    }

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

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Aguarde, carregando mapa...</Text>
            </View>
        );
    }

    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text>{errorMsg}</Text>
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
                <Marker
                    coordinate={{
                        latitude: location?.coords.latitude || 0,
                        longitude: location?.coords.longitude || 0,
                    }}
                    title="Sua localização"
                >
                    <Image
                        source={require('../../assets/icons/van-icon.jpeg')}
                        style={{ width: 30, height: 30, borderRadius: 15 }}
                        resizeMode="contain"
                    />
                </Marker>

                {embarkMarkers.map((marker, index) => (
                    <Marker
                        key={`embark-marker-${index}`}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                    >
                        <Image
                            source={require('../../assets/icons/user-icon.jpeg')}
                            style={{ width: 30, height: 30, borderRadius: 15 }}
                            resizeMode="contain"
                        />
                    </Marker>
                ))}

                {destinationMarkers.map((marker, index) => (
                    <Marker
                        key={`destination-marker-${index}`}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        description={marker.description}
                    >
                        <Image
                            source={require('../../assets/icons/escola-icon.jpeg')}
                            style={{ width: 30, height: 30, borderRadius: 15 }}
                            resizeMode="contain"
                        />
                    </Marker>
                ))}

                {returnMarkers.map((marker, index) => (
                    <Marker
                        key={`return-marker-${index}`}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        pinColor="orange"
                    />
                ))}

                {schoolMarkers.map((marker, index) => (
                    <Marker
                        key={`school-marker-${index}`}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        description={marker.description}
                    >
                        <Image
                            source={require('../../assets/icons/escola-icon.jpeg')}
                            style={{ width: 30, height: 30, borderRadius: 15 }}
                            resizeMode="contain"
                        />
                    </Marker>
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
