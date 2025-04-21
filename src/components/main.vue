<template>
    <div class="container">
      <h1>Анонсы последних новостей</h1>
      
        <div class="cards-grid">
            <div class="card" v-for="item in threeNews" :key="item.id">
                <div class="image-container">
                    <img class="news-image" :src="item.image" :alt="item.title">
                </div>
                <div class="content">
                    <div class="head-container">
                        <h3>{{ item.title }}</h3>
                    </div>
                    <p>{{ truncateDescription(item.description) }}</p>
                </div>
            </div>
        </div>
    
        <div class="actions">
            <button class="btn" @click="openNews">Все новости</button>
            <button class="btn" @click="openFeedback">Обратная связь</button>
        </div>
    </div>
</template>

<script>
import api from '@/api';

export default {
    name: 'main',
    data() {
        return {
            news: []
        }
    },
    async created() {
        try {
            const response = await api.getNews(3);
            this.news = response.data;
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    },
    computed: {
      threeNews() {
        return [...this.news].slice(0, 3);
      }
    },
    methods: {
        truncateDescription(text) {
            return text.length > 50 ? text.substring(0, 50) + '...' : text;
        },
        openFeedback() {
            this.$router.push('/feedback')
        },
        openNews() {
            this.$router.push('/news')
        }
    }
}
</script>

<style scoped>
.container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin: 2rem 0;
}

.card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background: #ffffff;
  color: #333;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.image-container {
  height: 200px;
  width: 100%;
  overflow: hidden;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .news-image {
  transform: scale(1.05);
}

.content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.head-container {
  margin-bottom: 12px;
}

.head-container h3 {
  font-size: 1.25rem;
  margin-bottom: 8px;
  color: #2c3e50;
}

.content p {
  color: #666;
  line-height: 1.5;
  margin-top: auto;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 3rem;
}

.btn {
  padding: 12px 24px;
  min-width: 150px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn:hover {
  background: #357ab8;
}
</style>