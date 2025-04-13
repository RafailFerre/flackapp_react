import React from 'react';
import './ServiceList.css'; // Импортируем стили (создадим ниже)

// Компонент для отображения списка услуг
// Принимает массив services как пропс
const ServiceList = ({ services }) => {
  // Если список пуст, показываем сообщение
  if (!services || services.length === 0) {
    return <p>Услуги пока не добавлены.</p>;
  }

  return (
    <div className="service-list">
      <h2>Список услуг</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id} className="service-item">
            <h3>{service.title}</h3>
            <p>{service.description || 'Описание отсутствует'}</p>
            <p>
              <strong>Цена:</strong> {service.price ? `${service.price} руб.` : 'Не указана'}
            </p>
            <p>
              <strong>Контакты:</strong> {service.contact || 'Не указаны'}
            </p>
            <p>
              <strong>Категория:</strong> {service.category || 'Не указана'}
            </p>
            <p>
              <strong>Добавлено:</strong> {new Date(service.created_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;