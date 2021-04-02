<template>
  <article class="article-preview">
    <div class="article-preview__img-wrapper">
      <img :src="url" alt="article img" />
    </div>
    <div class="article-preview__txt">
      <h3 class="article-preview__title">
        <NuxtLink
          :to="{ name: 'articles-blog-article-id', params: { id: id } }"
          >{{ title }}</NuxtLink
        >
      </h3>
      <div class="article-preview__dscr" v-html="slicedContent"></div>
      <div class="article-preview__links-wrapper">
        <b class="article-preview__author">{{ author }}</b>
        <NuxtLink
          :to="{ name: 'articles-blog-article-id', params: { id: id } }"
          class="article-preview__link"
        >
          Подробнее</NuxtLink
        >
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "AppArticlePreview",
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    slicedContent() {
      if (this.content) {
        console.log();
        return `${this.content.slice(0, 155)}...`;
      }
      return "";
    }
  }
};
</script>

<style lang="scss">
.article-preview {
  width: 46%;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    .article-preview__img-wrapper {
      &::before {
        background-color: crimson;
        border-color: crimson;
      }
    }
  }

  .article-preview__img-wrapper {
    width: 100%;
    height: 60%;
    max-height: 390px;
    position: relative;

    @media screen and (max-width: 1366px) {
      height: 320px;
    }

    @media screen and (max-width: 576px) {
      height: 240px;
    }

    &::before {
      content: "";
      display: block;
      width: 95%;
      height: 90%;
      background-color: transparent;
      position: absolute;
      bottom: 0;
      right: 0;
      border: 2px solid $bg-color;
      top: -5%;
      left: -3%;
      background-color: $white;
      transition: all ease-in 1s;
    }

    &::after {
      content: "";
      display: block;
      width: 95%;
      height: 90%;
      background-color: $bg-color;
      position: absolute;
      bottom: 0;
      right: 0;
    }

    img {
      width: 97%;
      height: 93%;
      object-fit: cover;
      position: relative;
      z-index: 2;
    }
  }

  .article-preview__txt {
    background-color: $white;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .article-preview__title {
    font-size: 42px;
    font-weight: 700;
    text-align: center;
    margin-bottom: auto;

    @media screen and (max-width: 1200px) {
      font-size: 32px;
      font-weight: 600;
    }

    a {
      color: $bg-color;
      text-decoration: none;
      transition: all ease-in 0.2s;

      &:hover {
        color: crimson;
      }
    }
  }

  .article-preview__dscr {
    width: 80%;
    font-size: 18px;
  }

  .article-preview__links-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .article-preview__author {
    display: block;
    font-size: 16px;
  }

  .article-preview__link {
    display: block;
    text-align: right;
    color: $white;
    background-color: $bg-color;
    padding: 3px 12px;
    padding-bottom: 4px;
    text-decoration: none;
    position: relative;
    margin-right: 25px;
    transition: all ease-in 0.2s;

    &::after {
      content: "";
      display: block;
      width: 18px;
      height: 18px;
      background-color: $bg-color;
      transform: rotate(45deg);
      position: absolute;
      right: -9px;
      top: 4px;
      transition: all ease-in 0.2s;
    }

    &:hover {
      background-color: crimson;

      &::after {
        background-color: crimson;
      }
    }
  }
}
.article-preview:nth-child(2n) {
  margin-left: auto;
}
</style>
