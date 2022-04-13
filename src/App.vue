<template>
  <v-app>
    <v-main>
      <Header />
      <Home />
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Home from './pages/Home.vue';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

export default {
  name: 'App',

  components: {
    Home,
    Footer,
    Header,
  },
};
</script>
