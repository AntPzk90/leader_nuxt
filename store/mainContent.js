const state = () => ({
  data: null,
  seo: null,
  menuBtnColor: null,
  activeScreen: null,
  isLoadedData: false
});

const mutations = {
  getMainContent(state, payload) {
    state.data = payload;
  },
  getSeoMeta(state, payload) {
    const seo_meta = new Object();

    seo_meta.meta_title = payload.meta_title;
    seo_meta.meta_hid = payload.meta_hid;
    seo_meta.meta_name = payload.meta_name;
    seo_meta.meta_content = payload.meta_content;

    state.seo = seo_meta;
  },
  changeIsLoadedData(state, payload) {
    state.isLoadedData = payload;
  },
  changeMenuBtnColor(state, payload) {
    state.menuBtnColor = payload;
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
          context.commit("getSeoMeta", response.acf);
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
