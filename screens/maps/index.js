import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Geocoder from "react-native-geocoding";
import * as Location from 'expo-location';
import { useEffect, useState, useRef } from "react";
import MapViewDirections from 'react-native-maps-directions';
import { useRoute } from '@react-navigation/native';

export default function GoogleMapsScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const mapRef = useRef(null);
    const route = useRoute();
    const { userId } = route.params;
    

    // Destino teste
    const [destino, setDestino] = useState({
        latitude: -22.80068662,
        longitude: -45.20045729
    });

    const handleAddressToCoordinates = async (address) => {
        try {
            const json = await Geocoder.from(address);
            const location = json.results[0].geometry.location;
            setDestino({
                latitude: location.lat,
                longitude: location.lng
            });
        } catch (error) {
            console.warn(error);
        }
    };

    useEffect(() => {
        handleAddressToCoordinates("Rua José Elache 160, São Paulo, Brasil");
    }, []);

    const GOOGLE_MAPS_APIKEY = "";

    Geocoder.init(GOOGLE_MAPS_APIKEY);

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
                />
                <Marker coordinate={destino} pinColor="blue" />

                {/* Rota entre os dois destinos */}
                {/* <MapViewDirections
                    origin={location.coords}
                    destination={destino}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={5}
                    strokeColor="blue"
                /> */}
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
