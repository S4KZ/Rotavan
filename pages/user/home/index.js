import React, { useRef, useMemo } from "react";
import { Image, StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const mapIcon = require("../../../assets/icons/mapa.png");
const localIcon = require("../../../assets/icons/local.png");

export default function Home() {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["20%", "80%"], []);

  return (
    <View style={styles.container}>
      <Image source={mapIcon} style={styles.map} />

      <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: "#FFF" }}
        >
        
            <View style={styles.bottomSheetContent}>
              <View style={styles.box}>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.title}>Procurar</Text>
                    <Text style={styles.subtitle}>Pesquise Vans</Text>
                    <Text style={styles.subtitle}>na região</Text>
                  </View>
                  <Image source={localIcon} style={styles.icon} />
                </View>
              </View>
            </View>
        
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  bottomSheetContent: {
    flex: 1,
    padding: 30,
    display: "flex",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    width: "80%",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowSpread: 5,
    elevation: 15,
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {

  },
  icon: {
    width: 50,
    height: 50,
    left: 20,
  },
  title: {
    fontSize: 20,
    color: '#1A478A',
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: '#FAB428',
    fontWeight: "bold",
  },
});
