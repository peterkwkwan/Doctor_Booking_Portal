<template>
  <v-footer class="footer">
    <v-card flat tile width="100%">
      <div class="techstack-container">
        <div class="text-center" v-for="(tech, index) of techStack" v-bind:key="index">
          <v-btn class="mx-4 p-6" icon @click="onClick(tech)">
            <v-img class="icons" :alt="tech.name" max-height="50" max-width="50" :src="getImgUrl(tech)"></v-img>
          </v-btn>
          <v-card-text>
            {{ tech.name }}
          </v-card-text>
        </div>
      </div>

      <v-divider></v-divider>

      <v-card-text class="white--text text-center">
        <span class="copyright-date">© {{ new Date().getFullYear() }}</span> |
        <span class="copyright">peter_kw_kwan</span>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      techStack: [
        { name: 'Vue.js', url: 'https://vuejs.org/', imgName: 'vue.png' },
        { name: 'Axios', url: 'https://axios-http.com/', imgName: 'axios.png' },
        { name: 'Vuetify', url: 'https://vuetifyjs.com/', imgName: 'vuetify.png' },
        { name: 'vue-dayjs', url: 'https://www.npmjs.com/package/vue-dayjs', imgName: 'dayjs.png' },
      ],
    };
  },
  methods: {
    onClick(tech) {
      window.open(tech.url, '_blank');
    },
    getImgUrl(tech) {
      return require(`../assets/${tech.imgName}`);
    },
  },
};
</script>
<style scoped>
.footer {
  background-color: hsla(20, 100%, 70%, 0.725) !important;
  padding: 20px;
}
.techstack-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.icons {
  border-radius: 50px;
}
.copyright-date {
  color: hsla(20, 100%, 70%, 0.725);
  font-weight: 600;
}
.copyright {
  color: hsl(20, 100%, 60%);
  font-weight: 600;
  letter-spacing: 2px;
}
</style>
