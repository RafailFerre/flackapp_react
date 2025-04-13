import React, { useState } from 'react';
import './ServiceForm.css'; // Импортируем стили (создадим ниже)

// Компонент формы для добавления новой услуги
// Принимает функцию onSubmit как пропс для обработки отправки формы
const ServiceForm = ({ onSubmit }) => {
  // Состояние для полей формы
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    contact: '',
    category: '',
  });

  // Обработка изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    // Передаем данные формы в пропс onSubmit
    onSubmit({
      ...formData,
      price: formData.price ? parseFloat(formData.price) : null, // Преобразуем цену в число
    });
    // Очищаем форму после отправки
    setFormData({
      title: '',
      description: '',
      price: '',
      contact: '',
      category: '',
    });
  };

  return (
    <div className="service-form">
      <h2>Добавить новую услугу</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Название:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Цена (руб.):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Контакты:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Категория:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Добавить услугу</button>
      </form>
    </div>
  );
};

export default ServiceForm;