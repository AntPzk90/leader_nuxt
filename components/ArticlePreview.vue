<template>
  <div class="article-preview">
    <img />
    <div class="article-preview__txt">
      <h3 class="article-preview__title">
        <a> </a>
      </h3>
      <p class="article-preview__dscr"></p>
      <b class="article-preview__author"></b>
      <a class="article-preview"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppArticlePreview",
  parops: {
    article: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="postcss"></style>
