import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Geocoder from "react-native-geocoding";
import * as Location from 'expo-location';
import { useEffect, useState, useRef } from "react";
import { useRoute } from '@react-navigation/native';
import { getDistance } from 'geolib';
import MapViewDirections from 'react-native-maps-directions';

export default function GoogleMapsScreen({ pasIda, pasVolta }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [embarkMarkers, setEmbarkMarkers] = useState([]);
    const [destinationMarkers, setDestinationMarkers] = useState([]);
    const mapRef = useRef(null);
    const route = useRoute();

    const GOOGLE_MAPS_APIKEY = "";
    Geocoder.init(GOOGLE_MAPS_APIKEY);

    // Função para converter endereços em coordenadas
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

    // Carregar localizações dos pontos de embarque dos passageiros
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
        const subscription = Location.watchPositionAsync(
            {
                accuracy: Location.LocationAccuracy.Highest,
                timeInterval: 1000,
                distanceInterval: 1,
            },
            (response) => {
                setLocation(response);
                mapRef.current?.animateCamera({
                    center: response.coords,
                });
    
                // Atualize os marcadores de embarque ao se aproximar
                setEmbarkMarkers((prevMarkers) =>
                    prevMarkers.filter((marker) => {
                        const distance = getDistance(
                            { latitude: response.coords.latitude, longitude: response.coords.longitude },
                            { latitude: marker.latitude, longitude: marker.longitude }
                        );
                        return distance > 10; // Mantém apenas marcadores fora de 10 metros
                    })
                );
            }
        );
    
        return () => subscription.remove();
    }, []);
    


    // Carregar localizações dos destinos finais agrupados por escola
    useEffect(() => {
        const loadDestinationMarkers = async () => {
            // Agrupa os passageiros por escola
            const groupedBySchool = pasIda.reduce((acc, passenger) => {
                const schoolAddress = `${passenger.EnderecoEscolaRua}, ${passenger.EnderecoEscolaBairro}, ${passenger.EnderecoEscolaCidade}, ${passenger.EnderecoEscolaUf}`;
                const schoolName = passenger.NomeEscola;

                if (!acc[schoolAddress]) acc[schoolAddress] = { schoolName, passengers: [] };
                acc[schoolAddress].passengers.push(passenger.useNome);

                return acc;
            }, {});

            // Converte cada escola para coordenadas e cria um marker
            const destinationMarkers = await Promise.all(
                Object.entries(groupedBySchool).map(async ([schoolAddress, { schoolName, passengers }]) => {
                    const coordinates = await handleAddressToCoordinates(`${schoolAddress}, Brasil`);
                    if (coordinates) {
                        return {
                            ...coordinates,
                            title: schoolName,
                            description: `Passageiros: ${passengers.join(", ")}`
                        };
                    }
                    return null;
                })
            );

            setDestinationMarkers(destinationMarkers.filter(marker => marker !== null));
        };

        loadDestinationMarkers();
    }, [pasIda]);

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
        Location.watchPositionAsync({
            accuracy: Location.LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
        }, (response) => {
            setLocation(response);
            mapRef.current?.animateCamera({
                center: response.coords
            });
        });
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
                />

                {embarkMarkers.map((marker, index) => (
                    <>
                        <Marker
                            key={`embark-marker-${index}`}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            title={marker.title}
                            pinColor="green"
                        />
                        <MapViewDirections
                            origin={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                            destination={{ latitude: marker.latitude, longitude: marker.longitude }}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />
                    </>
                ))}

                {destinationMarkers.map((marker, index) => (
                    <Marker
                        key={`destination-marker-${index}`}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        description={marker.description}
                        pinColor="blue"
                    />
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
