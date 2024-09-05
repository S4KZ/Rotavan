import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { StyleSheet, View, Image, Text } from 'react-native';
import { useState } from 'react';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        position: "absolute",
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default function GoogleMapsScreen() {

    const [markersList, setMarkersList] = useState([
        {
            id: 1,
            latitude: -22.8007425,
            longitude: -45.2005121,
            title: "Etec Alfredo de Barros Santos",
            description: "Escola"
        },
        // {
        //     id: 2,
        //     latitude: -22.8475272,
        //     longitude: -45.2371961,
        //     title: "Ponto de Miguel Prata",
        //     description: "Ponto de embarque"
        // },
    ])

    const MyCustomMarkerView = () => {
        return (
            <Image style={{
                width: 35,
                height: 35,
                borderRadius: 20
            }} source={require('../../../assets/mig.jpg')} />
        )
    }

    const MyCustomCalloutView = () => {
        return(
            <View>
                <Text>Ponto de embarque de Miguel Prata</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: -22.8007425,
                    longitude: -45.2005121,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
            >

                <Marker coordinate={{ latitude: -22.8475272, longitude: -45.2371961,}}>
                    <MyCustomMarkerView />
                    <Callout style={{width: 300, height: 50}}>
                        <MyCustomCalloutView />
                    </Callout>
                </Marker>
                
                {markersList.map((marker) => {
                        return (
                            <Marker
                                key={marker.id}
                                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                title={marker.title}
                                description={marker.description}
                            />
                        );
                    })}
            </MapView>
        </View>
    );
}
