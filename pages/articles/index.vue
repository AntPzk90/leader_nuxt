<template>
  <div v-if="isLoadedData">
    <div class="articles-page">
      <AppMainMenu />
      <h1>Блог</h1>
      <p class="articles-slogan">
        Всё самое интересное для боксёров, собрано здесь.
      </p>
      <div v-for="(article, index) in articles" :key="index">{{ article }}</div>
      <NuxtLink :to="{ name: 'articles-id', params: { id: 2 } }">link</NuxtLink>
    </div>
  </div>
  <div v-else>
    <AppLoading />
  </div>
</template>

<script>
import AppMainMenu from "~/components/MainMenu";
import AppLoading from "~/components/Loading";
import { mapState } from "vuex";

export default {
  name: "AppArticles",
  components: {
    AppMainMenu,
    AppLoading
  },
  computed: {
    ...mapState({
      isLoadedData: state => state.blog.isLoadedData,
      articles: state => state.blog.articles
    })
  },
  mounted() {
    this.$store
      .dispatch("blog/getArticlesAction", {
        apiUrl: "articles/?per_page=10"
      })
      .then(response => {
        console.log(response);
      });
  }
};
</script>

<style lang="scss">
.articles-page {
  background-color: $bg-color;
  min-height: 100vh;
  padding-top: 4vh;
  color: $white;

  h1 {
    color: $white;
    font-size: 74px;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 30px;
    text-align: center;
  }

  .articles-slogan {
    font-size: 34px;
    font-weight: 500;
    color: $white;
    text-align: center;
    margin-top: 0;
  }
}
</style>
