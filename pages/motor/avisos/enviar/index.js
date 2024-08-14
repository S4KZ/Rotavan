import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Enviar() {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={[styles.title, { marginBottom: 25, color: '#1A478A' }]}>Envie novo aviso</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Título do aviso"
                />
                <TextInput
                    style={[styles.input, { height: 150 }]}
                    placeholder="Assunto"
                />
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff'}
  }
  );