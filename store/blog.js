const state = () => ({
  articles: null,
  isLoadedData: false
});

const mutations = {
  getArticles(state, payload) {
    state.articles = payload;
  },
  changeIsLoadedData(state, payload) {
    state.isLoadedData = payload;
  }
};

const actions = {
  getArticlesAction(context, { apiUrl }) {
    return new Promise(resolve => {
      this.$axios
        .$get(apiUrl, { loading: true })
        .then(response => {
          context.commit("getArticles", response);
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
