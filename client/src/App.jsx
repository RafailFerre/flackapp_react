import React, { useState, useEffect } from 'react';
import ServiceList from './components/ServiceList';
import ServiceForm from './components/ServiceForm';
import { getServices, createService } from './services/api';
import './App.css'; // Импортируем стили

// Главный компонент приложения
function App() {
  // Состояние для списка услуг
  const [services, setServices] = useState([]);
  // Состояние для отслеживания загрузки
  const [isLoading, setIsLoading] = useState(false);
  // Состояние для хранения ошибок
  const [error, setError] = useState(null);

  // Загрузка услуг при монтировании компонента
  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const data = await getServices();
        setServices(data);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить услуги. Попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []); // Пустой массив зависимостей — выполняется один раз при монтировании

  // Обработка отправки формы
  const handleAddService = async (serviceData) => {
    setIsLoading(true);
    try {
      const newService = await createService(serviceData);
      // Обновляем список услуг, добавляя новую
      setServices((prev) => [...prev, { ...serviceData, id: newService.id }]);
      setError(null);
    } catch (err) {
      setError('Не удалось добавить услугу. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Flackapp — Услуги</h1>
      {/* Показываем состояние загрузки */}
      {isLoading && <p>Загрузка...</p>}
      {/* Показываем ошибки, если они есть */}
      {error && <p className="error">{error}</p>}
      {/* Форма для добавления услуги */}
      <ServiceForm onSubmit={handleAddService} />
      {/* Список услуг */}
      <ServiceList services={services} />
    </div>
  );
}

export default App;








// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
