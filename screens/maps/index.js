import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Geocoder from "react-native-geocoding";
import * as Location from 'expo-location';
import { useEffect, useState, useRef } from "react";
import MapViewDirections from 'react-native-maps-directions'
import { useRoute } from '@react-navigation/native';

export default function GoogleMapsScreen({ pasIda, pasVolta }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [markers, setMarkers] = useState([]);
    const mapRef = useRef(null);
    const route = useRoute();

    // console.log(pasIda);
    // console.log(pasVolta);

    const GOOGLE_MAPS_APIKEY = ""; // Sua chave da API Google Maps
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

    // Carregar localizações dos passageiros de ida
    useEffect(() => {
        const loadMarkers = async () => {
            const newMarkers = await Promise.all(
                pasIda.map(async (passenger) => {
                    const address = `${passenger.EnderecoEmbarque}, ${passenger.BairroEmbarque}, ${passenger.CidadeEmbarque}, ${passenger.UfEmbarque}, Brasil`;
                    console.log('O ENDERECO AQUI', address);
                    const coordinates = await handleAddressToCoordinates(address);
                    return coordinates ? { ...coordinates, title: passenger.useNome } : null;
                })
            );
            setMarkers(newMarkers.filter(marker => marker !== null));
        };
        loadMarkers();
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

                {markers.map((marker, index) => (
                    <Marker
                        key={`marker-${index}`}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        pinColor="blue"
                    />
                ))}

                {/* Rota entre a localização e os passageiros */}
                {/* {markers.map((marker, index) => (
                    <MapViewDirections
                        key={`direction-${index}`}
                        origin={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude
                        }}
                        destination={{
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        }}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="blue"
                    />
                ))} */}
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
