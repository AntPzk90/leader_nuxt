<template>
  <div v-if="isLoadedData">
    <div class="articles-page">
      <AppMainMenu />
      <h1>Блог</h1>
      <p class="articles-page">
        Всё самое интересное для боксёров, собрано здесь.
      </p>
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
    AppMainMenu
  },
  computed: {
    ...mapState({
      isLoadedData: state => state.mainContent.isLoadedData
    })
  }
};
</script>

<style lang="scss">
.articles-page {
  background-color: $bg-color;
  min-height: 100vh;
  padding-top: 4vh;

  h1 {
    color: $white;
    font-size: 12vh;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 1vh;
    text-align: center;
  }

  .articles-page {
    font-size: 6vh;
    font-weight: 500;
    color: $white;
    text-align: center;
    margin-top: 0;
  }
}
</style>
