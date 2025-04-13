import axios from 'axios';

// Базовый URL сервера
const API_URL = 'http://localhost:5000/api';

// Создаем экземпляр Axios с базовой конфигурацией
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Получение списка всех услуг
// Возвращает массив услуг или бросает ошибку
export const getServices = async () => {
  try {
    const response = await api.get('/services');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении услуг:', error.message);
    throw error;
  }
};

// Создание новой услуги
// Принимает объект с данными услуги (title, description, price, contact, category)
// Возвращает созданную услугу или бросает ошибку
export const createService = async (serviceData) => {
  try {
    const response = await api.post('/services', serviceData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании услуги:', error.message);
    throw error;
  }
};