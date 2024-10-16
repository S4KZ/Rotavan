import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import config from '../../../config/config.json';

const UserProfileScreen = () => {
  const route = useRoute();
  const { userId } = route.params;
  // console.log(userId);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(config.urlRootNode + '/user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: userId }),
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar perfil');
        }

        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setProfileData(data);
          setNewName(data.nome);
          setNewEmail(data.email);
        }
      } catch (err) {
        setError('Erro ao buscar perfil. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    } else {
      setError('ID do usuário não fornecido.');
      setLoading(false);
    }
  }, [userId]);

  const handleSaveProfile = () => {
    if (newPassword !== newConfirmPassword) {
      Alert.alert('As senhas não coincidem. Por favor, verifique.');
      return;
    }

    // Atualiza o perfil no backend ou faz outras ações necessárias
    setProfileData(prevData => ({
      ...prevData,
      nome: newName,
      email: newEmail,
      password: newPassword
    }));
    setEditing(false);
    Alert.alert('Perfil atualizado com sucesso!');
  };

  const handleChoosePhoto = () => {
    // Lógica para escolher uma nova foto de perfil
    Alert.alert('Escolher foto do perfil');
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!profileData) {
    return <Text>Dados do perfil não disponíveis</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileImageContainer} onPress={handleChoosePhoto}>
        <Image source={{ uri: profileData.profileImage || 'https://via.placeholder.com/150' }} style={styles.profileImage} />
      </TouchableOpacity>

      {editing ? (
        <View>
          <Text style={styles.label}>Novo Nome:</Text>
          <TextInput
            style={styles.input}
            value={newName}
            onChangeText={setNewName}
            placeholder="Digite seu novo nome"
          />

          <Text style={styles.label}>Novo E-mail:</Text>
          <TextInput
            style={styles.input}
            value={newEmail}
            onChangeText={setNewEmail}
            placeholder="Digite seu novo e-mail"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Nova Senha:</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Digite sua nova senha"
            secureTextEntry={true}
          />

          <Text style={styles.label}>Confirmar Nova Senha:</Text>
          <TextInput
            style={styles.input}
            value={newConfirmPassword}
            onChangeText={setNewConfirmPassword}
            placeholder="Confirme sua nova senha"
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={styles.saveButtonText}>Salvar Perfil</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.text}>{profileData.nome}</Text>

          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.text}>{profileData.email}</Text>

          <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  text: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
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
});

export default UserProfileScreen;
