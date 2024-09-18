import axios from 'axios';

const consultarEnderecoPorCEP = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao consultar o CEP:', error);
    throw error;
  }
};
