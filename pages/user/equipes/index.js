import React, { createContext, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Switch, StyleSheet, Alert } 
from 'react-native';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

const UserProfileScreen = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [name, setName] = useState('João Silva');
  const [email, setEmail] = useState('joao.silva@example.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [editing, setEditing] = useState(false);

  const handleSaveProfile = () => {
    if (newPassword !== newConfirmPassword) {
      Alert.alert('As senhas não coincidem. Por favor, verifique.');
      return;
    }

    setName(newName);
    setEmail(newEmail);
    setPassword(newPassword);
    setEditing(false);
    Alert.alert('Perfil atualizado com sucesso!');
  };

  const handleChoosePhoto = () => {
    // Lógica para escolher uma nova foto de perfil
    Alert.alert('Escolher foto do perfil');
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TouchableOpacity style={styles.profileImageContainer} onPress={handleChoosePhoto}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      </TouchableOpacity>

      {editing ? (
        <View>
          <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Novo Nome:</Text>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            value={newName}
            onChangeText={setNewName}
            placeholder="Digite seu novo nome"
            placeholderTextColor={isDarkMode ? "#ccc" : "#888"}
          />

          <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Novo E-mail:</Text>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            value={newEmail}
            onChangeText={setNewEmail}
            placeholder="Digite seu novo e-mail"
            keyboardType="email-address"
            placeholderTextColor={isDarkMode ? "#ccc" : "#888"}
          />

          <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Nova Senha:</Text>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Digite sua nova senha"
            secureTextEntry={true}
            placeholderTextColor={isDarkMode ? "#ccc" : "#888"}
          />

          <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Confirmar Nova Senha:</Text>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            value={newConfirmPassword}
            onChangeText={setNewConfirmPassword}
            placeholder="Confirme sua nova senha"
            secureTextEntry={true}
            placeholderTextColor={isDarkMode ? "#ccc" : "#888"}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={styles.saveButtonText}>Salvar Perfil</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Nome:</Text>
          <Text style={[styles.text, isDarkMode && styles.darkText]}>{name}</Text>

          <Text style={[styles.label, isDarkMode && styles.darkLabel]}>E-mail:</Text>
          <Text style={[styles.text, isDarkMode && styles.darkText]}>{email}</Text>

          <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.setting}>
        <Text style={[styles.settingText, isDarkMode && styles.darkSettingText]}>Modo Escuro</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  profileImageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  darkLabel: {
    color: '#fff',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    color: '#000',
  },
  darkInput: {
    borderColor: '#555',
    color: '#fff',
  },
  editButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  settingText: {
    fontSize: 18,
    color: '#000',
  },
  darkSettingText: {
    color: '#fff',
  },
});

export default function App() {
  return (
    <ThemeProvider>
      <UserProfileScreen />
    </ThemeProvider>
  );
}
