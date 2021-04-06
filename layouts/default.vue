<template>
  <div>
    <Nuxt />
  </div>
</template>
//
<script>
export default {
  async fetch() {
    await this.$nuxt.context.store.dispatch(
      "mainContent/getMainContentAction",
      {
        apiUrl: "/posts/76"
      }
    );
    await this.$nuxt.context.store.dispatch("blog/getBlogMetaAction", {
      apiUrl: "/posts/177"
    });
    await this.$nuxt.context.store.dispatch("blog/getArticlesAction", {
      apiUrl: "articles/?per_page=100"
    });
  }
};
</script>
