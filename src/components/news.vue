<template>
    <div class="container">
      <div class="header">
        <h1>Новости</h1>
        <button class="btn" @click="openMain">На главную</button>
      </div>
  
      <div class="cards-grid">
        <div class="card" v-for="item in processedNews" :key="item.id">
          <div class="image-container">
            <img class="news-image" :src="item.image" :alt="item.title">
          </div>
          <div class="content">
            <div class="head-container">
              <h3>{{ item.title }}</h3>
              <p>{{ item.formattedDate }}</p>
            </div>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '@/api';
  
  export default {
    name: 'news',
    data() {
      return {
        news: []
      }
    },
    computed: {
      processedNews() {
        return this.news.map(item => ({
          ...item,
          formattedDate: this.formatDate(item.created_at)
        }));
      }
    },
    async created() {
      await this.fetchNews();
    },
    methods: {
      async fetchNews() {
        try {
          const response = await api.getNews();
          this.news = response.data;
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      },
      getImageUrl(imagePath) {
        if (!imagePath) return '';
        
        // Если это уже полный URL
        if (imagePath.startsWith('http')) return imagePath;
        
        // Для локальных изображений
        return `/images/${imagePath}`;
      },
      formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
      },
      openMain() {
        this.$router.push('/')
      }
    }
  }
  </script>
  
  <style scoped>
  /* Ваши существующие стили остаются без изменений */
  .container {
    padding: 2rem;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
  }
  
  .card {
    background: var(--card-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .image-container {
    height: 200px;
    overflow: hidden;
  }
  
  .news-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .content {
    padding: 15px;
  }
  
  .head-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .btn {
    padding: 10px 20px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: var(--border-radius);
  }
  
  .btn:hover {
    background: var(--secondary-color);
  }
  </style>