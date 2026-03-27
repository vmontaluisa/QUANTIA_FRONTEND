import axios from 'axios';



export const fetchTerminos = async () => {
  try {
    const response = await axios.get('/api/terminos');
    return response.data;
  } catch (error) {
    console.error('❌ Error en fetchTerminos:', error);
    return null;
  }
};

export const getTerminoById = async (id: number) => {
  try {
    const response = await axios.get(`/api/terminos/${id}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error en getTerminoById:', error);
    return null;
  }
};
