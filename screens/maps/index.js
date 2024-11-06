import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Geocoder from "react-native-geocoding";
import * as Location from 'expo-location';
import { useEffect, useState, useRef } from "react";
import { useRoute } from '@react-navigation/native';
import { orderByDistance, getDistance } from 'geolib';

export default function GoogleMapsScreen({ pasIda, pasVolta }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [embarkMarkers, setEmbarkMarkers] = useState([]);
    const [destinationMarkers, setDestinationMarkers] = useState([]);
    const [routeIndex, setRouteIndex] = useState(0); // Controle do índice da rota atual
    const mapRef = useRef(null);
    const route = useRoute();

    const GOOGLE_MAPS_APIKEY = "";
    Geocoder.init(GOOGLE_MAPS_APIKEY);

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

    useEffect(() => {
        if (location && embarkMarkers.length > 0 && destinationMarkers.length > 0) {
            const orderedEmbarks = orderByDistance(location.coords, embarkMarkers);
            const lastEmbark = orderedEmbarks[orderedEmbarks.length - 1];
            const orderedDestinations = orderByDistance(lastEmbark, destinationMarkers);

            setEmbarkMarkers(orderedEmbarks);
            setDestinationMarkers(orderedDestinations);
        }
    }, [location]);

    const getNextRoute = () => {
        setRouteIndex((prevIndex) => prevIndex + 1);
    };

    const checkProximity = () => {
        if (routeIndex < embarkMarkers.length) {
            const distanceToEmbark = getDistance(location.coords, embarkMarkers[routeIndex]);
            if (distanceToEmbark < 10) { // Verifica se está a menos de 10 metros do próximo ponto
                getNextRoute();
            }
        } else if (routeIndex < embarkMarkers.length + destinationMarkers.length) {
            const destinationIndex = routeIndex - embarkMarkers.length;
            const distanceToDestination = getDistance(location.coords, destinationMarkers[destinationIndex]);
            if (distanceToDestination < 10) {
                getNextRoute();
            }
        }
    };

    useEffect(() => {
        if (location) checkProximity();
    }, [location]);

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
                    <Marker
                        key={`embark-marker-${index}`}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        pinColor="green"
                    />
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

                {routeIndex < embarkMarkers.length && (
                    <MapViewDirections
                        origin={location.coords}
                        destination={embarkMarkers[routeIndex]}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="green"
                        onReady={() => {}}
                    />
                )}
                
                {routeIndex >= embarkMarkers.length && routeIndex < embarkMarkers.length + destinationMarkers.length && (
                    <MapViewDirections
                        origin={embarkMarkers[embarkMarkers.length - 1]}
                        destination={destinationMarkers[routeIndex - embarkMarkers.length]}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="blue"
                        onReady={() => {}}
                    />
                )}
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
