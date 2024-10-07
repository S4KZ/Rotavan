import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import * as Location from 'expo-location';
import { useEffect, useState, useRef } from "react";
import GooglePlacesInput from "./googlePlacesAutocomplete";

export default function GoogleMapsScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true); // Para controlar o carregamento do mapa
    const mapRef = useRef(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão para acessar a localização negada!');
                setLoading(false); // Para parar o loading caso a permissão seja negada
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setLoading(false); // Parar o loading quando a localização for obtida
            // console.log(location); //Fala a localização atual no console log
        })();
    }, []);

    useEffect(() => {
        Location.watchPositionAsync({
            accuracy: Location.LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
        }, (response) => {
            // console.log('Nova localização: ', response); // Mostra a localização após o movimento/ ou atualiza a localização
            setLocation(response);
            mapRef.current?.animateCamera({
                center: response.coords
            })
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
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.002,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                />
            </MapView>
            {/* <View style={{ width: "100%", height: 200 }}>
                <GooglePlacesInput />
            </View> */}
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
