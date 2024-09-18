import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import KEY from "../../constants/mapaKey"

const GooglePlacesInput = () => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}
            query={{
                key: KEY,
                language: 'en',
            }}
            requestUrl={{
                useOnPlatform: 'all', // or "all"
                url:
                    'https://maps.googleapis.com/maps/api', // or any proxy server that hits https://maps.googleapis.com/maps/api
            }}
        />
    );
};

export default GooglePlacesInput