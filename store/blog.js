const state = () => ({
  articles: null,
  seo: null,
  categories: new Set(),
  isLoadedData: false
});

const mutations = {
  getArticles(state, payload) {
    let convertedArr = []; //массив в который будет выведен результат.

    for (let i = 0; i < Math.ceil(payload.length / 4); i++) {
      convertedArr[i] = payload.slice(i * 4, i * 4 + 4);
    }

    state.articles = convertedArr;
  },
  changeIsLoadedData(state, payload) {
    state.isLoadedData = payload;
  },
  getCategories(state, payload) {
    state.categories.add("Все категории");
    payload.forEach(article => {
      state.categories.add(article.acf.article_category);
    });
  },
  getSeoMeta(state, payload) {
    const seo_meta = new Object();

    seo_meta.meta_title = payload.meta_title;
    seo_meta.meta_hid = payload.meta_hid;
    seo_meta.meta_name = payload.meta_name;
    seo_meta.meta_content = payload.meta_content;

    state.seo = seo_meta;
  }
};

const actions = {
  getBlogMetaAction(context, { apiUrl }) {
    return new Promise(resolve => {
      this.$axios
        .$get(apiUrl, { loading: true })
        .then(response => {
          context.commit("getSeoMeta", response.acf);
          resolve(response);
        })
        .catch(result => {
          console.log("get main content action error", result);
        });
    });
  },
  getArticlesAction(context, { apiUrl }) {
    return new Promise(resolve => {
      this.$axios
        .$get(apiUrl, { loading: true })
        .then(response => {
          context.commit("getArticles", response);
          context.commit("getCategories", response);
          context.commit("changeIsLoadedData", true);
          resolve(response);
        })
        .catch(result => {
          console.log("get main content action error", result);
        });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
