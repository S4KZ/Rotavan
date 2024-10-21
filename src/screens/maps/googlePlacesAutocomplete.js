
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View } from "react-native";
// import KEY from "../../constants/mapaKey"

const GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder='Search'
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(JSON.stringify(data, details));
          console.log(JSON.stringify(details?.geometry?.location))
        }}
        query={{
          key: '',
          language: 'pt-BR',
        }}
      />
    );
  };

export default GooglePlacesInput
