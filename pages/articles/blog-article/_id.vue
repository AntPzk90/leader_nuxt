<template>
  <div>
    <div class="article-post">
      <AppMainMenu />
      <div class="container">
        <transition
          enter-active-class="bounceInRight"
          leave-active-class="bounceOutRight"
        >
          <ul class="breadcrumbs breadcrumbs--article-post" v-show="show">
            <li><NuxtLink :to="{ path: '/' }">Главная</NuxtLink></li>
            <li><NuxtLink :to="{ path: '/articles' }">блог</NuxtLink></li>
            <li>{{ article.acf.article_title }}</li>
          </ul>
        </transition>
      </div>
      <transition
        enter-active-class="bounceInLeft"
        leave-active-class="bounceOutLeft"
      >
        <div class="article-post__img-wrapper" v-show="show">
          <img :src="article.acf.article_img.url" :alt="article.alt" />
        </div>
      </transition>
      <div class="container">
        <transition
          enter-active-class="bounceInRight"
          leave-active-class="bounceOutRight"
        >
          <div class="article-post__go-back-wrapper" v-show="show">
            <NuxtLink :to="{ name: 'articles' }" class="article-post__go-back"
              >Назад</NuxtLink
            >
          </div>
        </transition>
        <transition
          enter-active-class="bounceInUp"
          leave-active-class="bounceOutUp"
        >
          <h1 class="article-post__title" v-show="show">
            {{ article.acf.article_title }}
          </h1>
        </transition>
        <transition
          enter-active-class="bounceInUp"
          leave-active-class="bounceOutUp"
        >
          <div
            v-html="article.acf.article_content"
            class="article-post__content"
            v-show="show"
          ></div>
        </transition>
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<script>
import AppMainMenu from "~/components/MainMenu";
import AppFooter from "~/components/Footer";
import { mapState } from "vuex";

export default {
  name: "AppArticle",
  components: {
    AppMainMenu,
    AppFooter
  },
  async asyncData({ store }) {
    await store.dispatch("mainContent/getMainContentAction", {
      apiUrl: "/posts/76"
    });
    await store.dispatch("blog/getBlogMetaAction", {
      apiUrl: "/posts/177"
    });
    await store.dispatch("blog/getArticlesAction", {
      apiUrl: "articles/?per_page=100"
    });
  },
  head() {
    return {
      title: this.article.meta_title,
      meta: [
        {
          hid: this.article.meta_hid,
          name: this.article.meta_name,
          content: this.article.meta_content
        }
      ]
    };
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapState({
      isLoadedData: state => state.blog.isLoadedData,
      articles: state => state.blog.articles
    }),
    article() {
      if (this.articles) {
        for (const articleSub of this.articles) {
          for (const article of articleSub) {
            if (article.id === parseInt(this.$route.params.id)) {
              return article;
            }
          }
        }
      }
      return {};
    }
  },
  mounted() {
    this.$store.commit("mainContent/changeMenuBtnColor", "#2a3d7a");
    this.show = !this.show;
  }
};
</script>

<style lang="scss">
.container {
  max-width: 1440px;
  padding-left: 40px;
  padding-right: 40px;
  margin: 0 auto;
}

.breadcrumbs--article-post {
  @media screen and (max-width: 576px) {
    width: 65%;
  }
}

.article-post {
  padding-top: 40px;

  @media screen and (max-width: 576px) {
    padding-top: 0;
  }

  .article-post__img-wrapper {
    margin-left: 5%;
    margin-top: 2%;
    width: 60%;
    height: 520px;
    position: relative;
    margin-bottom: 40px;

    @media screen and (max-width: 1366px) {
      width: 68%;
      height: 420px;
    }

    @media screen and (max-width: 1200px) {
      height: 320px;
    }

    @media screen and (max-width: 576px) {
      height: 200px;
      width: 90%;
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
      width: 96%;
      height: 94%;
      object-fit: cover;
      position: relative;
      z-index: 2;
    }
  }

  .article-post__title {
    font-size: 42px;
    font-weight: 700;
    text-align: center;
    margin-bottom: auto;
    color: $bg-color;
    margin-top: 30px;
    margin-bottom: 40px;

    @media screen and (max-width: 1200px) {
      font-size: 32px;
      font-weight: 600;
    }
  }

  .article-post__content {
    font-size: 22px;
    line-height: 32px;
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;
    color: $bg-color;
    margin-bottom: 70px;
  }

  .article-post__go-back-wrapper {
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;
  }

  .article-post__go-back {
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
    max-width: 45px;

    &::after {
      content: "";
      display: block;
      width: 18px;
      height: 18px;
      background-color: $bg-color;
      transform: rotate(45deg);
      position: absolute;
      left: -9px;
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
</style>
