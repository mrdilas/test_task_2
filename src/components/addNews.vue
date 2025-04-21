<template>
    <div class="form-container">
      <h2>Добавить новость</h2>
      <form @submit.prevent="submitForm">
        <input v-model="news.title" type="text" placeholder="Заголовок" required>
        <textarea v-model="news.description" placeholder="Описание" required></textarea>
        
        <div class="image-selection">
          <label>Выберите изображение:</label>
          <select v-model="news.image" required>
            <option value="">Список изображений</option>
            <option v-for="image in availableImages" :value="image" :key="image">
              {{ image }}
            </option>
          </select>
          <div class="image-preview" v-if="news.image">
            <img :src="'/images/' + news.image" :alt="'Предпросмотр ' + news.image">
          </div>
        </div>
  
        <button type="submit" class="btn">Добавить</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '@/api';
  
  // список изображений из папки public/images
  const AVAILABLE_IMAGES = [
    'fish.jpg',
    'granta.png',
    'doctor.jpg',
    'cat.jpg',
    'pubg.png'
  ];
  
  export default {
    data() {
      return {
        news: {
          title: '',
          description: '',
          image: ''
        },
        availableImages: AVAILABLE_IMAGES
      }
    },
    methods: {
      async submitForm() {
        try {
          await api.addNews({
            title: this.news.title,
            description: this.news.description,
            image: this.news.image
          });
          this.$router.push('/news');
        } catch (error) {
          console.error('Ошибка при добавлении новости:', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  textarea {
    min-height: 150px;
  }
  
  .image-selection {
    margin: 1rem 0;
  }
  
  .image-preview {
    margin-top: 1rem;
  }
  
  .image-preview img {
    max-width: 100%;
    max-height: 200px;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  
  .btn {
    padding: 10px 20px;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn:hover {
    background: #357ab8;
  }
  </style>