const state = () => ({
  data: null,
  activeScreen: null,
  isLoadedData: false,
});

const mutations = {
  getMainContent(state, payload) {
    state.data = payload;
  },
  changeIsLoadedData(state, payload) {
    state.isLoadedData = payload;
  },
  changeActiveScreen(state, payload) {
    state.activeScreen = payload.anchor;
  }
};

const actions = {
  getMainContentAction(context, { apiUrl }) {
    return new Promise(resolve => {
      this.$axios
        .$get(apiUrl, { loading: true })
        .then(response => {
          context.commit("getMainContent", response.acf);
          context.commit("changeIsLoadedData", true);
          resolve(response.acf);
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
