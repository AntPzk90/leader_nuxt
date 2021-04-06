<template>
  <div v-if="articles">
    <AppMainMenu />
    <div class="articles-page">
      <div class="articles-page__top">
        <transition
          enter-active-class="bounceInUp"
          leave-active-class="bounceOutUp"
        >
          <h1 v-if="show">Блог</h1>
        </transition>
        <transition
          enter-active-class="bounceInDown"
          leave-active-class="bounceOutDown"
        >
          <p class="articles-page__slogan" v-if="show">
            Всё самое интересное для боксёров, собрано здесь.
          </p>
        </transition>
      </div>
      <div class="container">
        <div class="articles-page__wrapper-inner">
          <transition
            enter-active-class="bounceInLeft"
            leave-active-class="bounceOutLeft"
          >
            <ul class="breadcrumbs breadcrumbs--articles-page" v-if="show">
              <li><NuxtLink :to="{ path: '/' }">Главная</NuxtLink></li>
              <li>блог</li>
            </ul>
          </transition>
          <transition
            enter-active-class="bounceInRight"
            leave-active-class="bounceOutRight"
          >
            <button
              class="articles-page__filter-btn"
              @click="showCategories = !showCategories"
            >
              <span>Категории</span>
              <svg
                width="27"
                height="15"
                viewBox="0 0 27 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    d="M1.4614 2.0514H16.7266C17.1463 0.863281 18.3253 0.00488281 19.7115 0.00488281C21.0976 0.00488281 22.2766 0.863281 22.6963 2.0514H25.0791C25.6326 2.0514 26.0814 2.47913 26.0814 3.00673C26.0814 3.53433 25.6326 3.96206 25.0791 3.96206H22.6963C22.2766 5.15018 21.0976 6.00858 19.7114 6.00858C18.3252 6.00858 17.1462 5.15018 16.7265 3.96206H1.46134C0.907822 3.96206 0.459076 3.53433 0.459076 3.00673C0.459076 2.47913 0.907822 2.0514 1.4614 2.0514ZM19.7115 4.09791C20.3427 4.09791 20.8562 3.6084 20.8562 3.00673C20.8562 2.40506 20.3427 1.91555 19.7115 1.91555C19.0802 1.91555 18.5667 2.40506 18.5667 3.00673C18.5667 3.6084 19.0802 4.09791 19.7115 4.09791Z"
                    fill="#2a3d7a"
                  />
                  <path
                    d="M1.4614 10.2369H3.84425C4.26393 9.04883 5.44299 8.19043 6.82912 8.19043C8.21525 8.19043 9.39424 9.04883 9.81392 10.2369H25.0791C25.6326 10.2369 26.0814 10.6647 26.0814 11.1923C26.0814 11.7199 25.6326 12.1476 25.0791 12.1476H9.81392C9.39424 13.3357 8.21518 14.1941 6.82905 14.1941C5.44292 14.1941 4.26386 13.3357 3.84418 12.1476H1.46134C0.907822 12.1476 0.459076 11.7199 0.459076 11.1923C0.459076 10.6647 0.907822 10.2369 1.4614 10.2369ZM6.82905 12.2835C7.46028 12.2835 7.97383 11.7939 7.97383 11.1923C7.97383 10.5906 7.46028 10.1011 6.82905 10.1011C6.19783 10.1011 5.68427 10.5906 5.68427 11.1923C5.68427 11.7939 6.19783 12.2835 6.82905 12.2835Z"
                    fill="#2a3d7a"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="26"
                      height="15"
                      fill="white"
                      transform="matrix(-1 0 0 1 26.2703 0)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </transition>
        </div>

        <transition-group
          class="articles-page__categories-list"
          v-if="show && showCategories"
          enter-active-class="bounceInRight"
          leave-active-class="bounceOutLeft"
          appear
          tag="ul"
        >
          <li
            v-for="(category, index) in categories"
            :key="category"
            :class="{ active: activeCategory === category }"
            @click.prevent="changeActiveCategory(category)"
            :style="{ 'animation-duration': `${index * 0.3}s` }"
          >
            <a href="#" :data-category="category">
              {{ category }}
            </a>
          </li>
        </transition-group>
        <transition-group
          enter-active-class="bounceIn"
          tag="div"
          class="articles-list"
          appear
          v-if="articles"
        >
          <AppArticlePreview
            v-for="article in filteredArticles[paginationPage]"
            :key="article.id"
            :url="article.acf.article_img.sizes.medium_large"
            :title="article.acf.article_title"
            :content="article.acf.article_content"
            :author="article.acf.article_author"
            :id="article.id"
          ></AppArticlePreview>
        </transition-group>
        <AppPaginate
          v-if="showPaginate"
          :page-count="pageCount"
          :initial-page="initialPage"
          @clickOnPaginateLink="changePaginationPage"
          :key="activeCategory"
        />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppMainMenu from "~/components/MainMenu";
import AppArticlePreview from "~/components/ArticlePreview";
import AppFooter from "~/components/Footer";
import AppPaginate from "~/components/Paginate";
import { mapState } from "vuex";

export default {
  name: "AppArticles",
  components: {
    AppMainMenu,
    AppArticlePreview,
    AppFooter,
    AppPaginate
  },
  head() {
    return {
      title: this.seo.meta_title,
      meta: [
        {
          hid: this.seo.meta_hid,
          name: this.seo.meta_name,
          content: this.seo.meta_content
        }
      ]
    };
  },
  async asyncData({ store, error }) {
    await store.dispatch("blog/getBlogMetaAction", {
      apiUrl: "/posts/177"
    });
  },
  data() {
    return {
      show: false,
      paginationPage: 0,
      initialPage: 1,
      activeCategory: "Все категории",
      showCategories: true
    };
  },
  computed: {
    ...mapState({
      isLoadedData: state => state.blog.isLoadedData,
      articles: state => state.blog.articles,
      categories: state => state.blog.categories,
      seo: state => state.blog.seo
    }),
    filteredArticles() {
      if (this.activeCategory === "Все категории") {
        return this.articles;
      } else {
        let filteredArticles = this.articles.flat().filter(article => {
          return article.acf.article_category === this.activeCategory;
        });
        let convertedArr = [];
        for (let i = 0; i < Math.ceil(filteredArticles.length / 4); i++) {
          convertedArr[i] = filteredArticles.slice(i * 4, i * 4 + 4);
        }
        return convertedArr;
      }
      return [];
    },
    pageCount() {
      if (this.articles) {
        return Math.ceil(this.filteredArticles.length);
      }
      return 1;
    },
    showPaginate() {
      return this.filteredArticles.length > 1 ? true : false;
    }
  },
  methods: {
    changePaginationPage(num) {
      this.$router.replace({
        query: { category: this.activeCategory, page: num }
      });
      this.paginationPage = num - 1;
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    },
    changeActiveCategory(category) {
      this.$router.replace({
        query: { category, page: 1 }
      });
      this.paginationPage = 0;
      this.activeCategory = category;
    }
  },
  mounted() {
    this.$store.dispatch("mainContent/getMainContentAction", {
      apiUrl: "/posts/76"
    });
    this.$store.dispatch("blog/getBlogMetaAction", {
      apiUrl: "/posts/177"
    });
    this.$store.dispatch("blog/getArticlesAction", {
      apiUrl: "articles/?per_page=100"
    });
    this.show = !this.show;
    this.$store.commit("mainContent/changeActiveScreen", {
      anchor: "articles"
    });
    this.$store.commit("mainContent/changeMenuBtnColor", "#ffffff");
    document.addEventListener("scroll", () => {
      if (
        window.scrollY >=
        this.$el.querySelector(".articles-page__top").clientHeight
      ) {
        this.$store.commit("mainContent/changeMenuBtnColor", "#2a3d7a");
      } else {
        this.$store.commit("mainContent/changeMenuBtnColor", "#ffffff");
      }
    });
    if (this.$route.query.category) {
      this.activeCategory = this.$route.query.category;
    }
    if (this.$route.query.page) {
      this.paginationPage = parseInt(this.$route.query.page - 1);
      this.initialPage = parseInt(this.$route.query.page);
    }
    window.matchMedia("(max-width: 576px)").matches
      ? (this.showCategories = false)
      : (this.showCategories = true);
  }
};
</script>

<style lang="scss">
.breadcrumbs {
  padding: 0;
  margin-top: 35px;
  margin-bottom: 60px;
  list-style: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &--articles-page {
    @media screen and (max-width: 576px) {
      margin-bottom: 25px;
    }
  }

  li {
    margin-right: 15px;
    font-size: 22px;
    line-height: 26px;
    color: $bg-color;
    &:not(li:first-child) {
      text-transform: lowercase;
    }
  }

  a {
    color: $bg-color;
    text-decoration: dotted;
    padding-right: 20px;
    position: relative;

    &::after {
      content: "\00BB";
      display: block;
      position: absolute;
      right: 0;
      top: 1px;
    }

    &:hover,
    &:active {
      color: crimson;
    }
  }
}
.container {
  max-width: 1440px;
  padding-left: 40px;
  padding-right: 40px;
  margin: 0 auto;
}

.articles-page {
  background-color: $white;
  min-height: 100vh;

  color: $bg-color;
  padding-bottom: 50px;

  .articles-page__top {
    padding-top: 40px;
    padding-bottom: 1px;
    background-color: $bg-color;
    position: relative;
    z-index: 1;
    background-image: url("~assets/img/collage2.png");
    background-size: 620px 314px;

    .canvas {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
    }
  }

  h1 {
    color: $white;
    font-size: 74px;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 30px;
    text-align: center;
    position: relative;
    z-index: 3;

    @media screen and (max-width: 1200px) {
      font-size: 54px;
    }
  }

  .articles-page__slogan {
    font-size: 34px;
    font-weight: 500;
    color: $white;
    text-align: center;
    margin-top: 0;
    margin-bottom: 40px;
    position: relative;
    z-index: 3;

    @media screen and (max-width: 1200px) {
      font-size: 26px;
    }
  }
}

.articles-list {
  display: flex;
  flex-wrap: wrap;
}

.articles-wrapper__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 5%;
}

.articles-page__categories-list {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  padding-left: 0;
  position: relative;
  z-index: 2;
  background-color: $white;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media screen and (max-width: 576px) {
    align-items: center;
  }

  li {
    margin-right: 30px;
    padding-left: 5px;
    padding-right: 5px;

    @media screen and (max-width: 1024px) {
      text-align: center;
    }

    @media screen and (max-width: 768px) {
      margin-bottom: 10px;
    }

    @media screen and (max-width: 576px) {
      margin-right: 0;
    }

    &.active {
      background-color: $bg-color;
      a {
        color: $white;
      }
    }

    &:last-child() {
      margin-right: 0;
    }

    a {
      font-size: 22px;
      line-height: 26px;
      color: $bg-color;
      text-decoration: none;

      @media screen and (max-width: 1024px) {
        font-size: 18px;
      }

      @media screen and (max-width: 768px) {
        border-bottom: 1px solid $bg-color;
      }

      &:hover {
        color: crimson;
      }
    }
  }
}

.articles-page__wrapper-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  background-color: $white;

  @media screen and (max-width: 576px) {
    flex-direction: column;
    margin-bottom: 35px;
  }
}

.articles-page__filter-btn {
  height: 34px;
  border: 1px solid $bg-color;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: $bg-color;
  padding: 8px 5px;
  background-color: transparent;
  display: none;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    display: flex;
  }

  span {
    margin-right: 15px;
  }
}
</style>
