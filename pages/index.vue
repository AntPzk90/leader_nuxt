<template>
  <div>
    <client-only>
      <AppMainMenu />
      <full-page :options="options" ref="fullpage" id="fullpage">
        <div class="section">
          <AppStartScreen />
        </div>
        <div class="section">
          <AppInfoScreen />
        </div>
        <div class="section">
          <AppGalleryScreen />
        </div>
        <div class="section">
          <AppTraniersScreen />
        </div>
        <div class="section">
          <AppContactsScreen />
        </div>
      </full-page>
    </client-only>
  </div>
</template>

<script>
import AppMainMenu from "~/components/MainMenu";
import AppStartScreen from "~/components/StartScreen";
import AppInfoScreen from "~/components/InfoScreen";
import AppGalleryScreen from "~/components/GalleryScreen";
import AppTraniersScreen from "~/components/TraniersScreen";
import AppContactsScreen from "~/components/ContactsScreen";
import { mapState } from "vuex";

export default {
  components: {
    AppMainMenu,
    AppStartScreen,
    AppInfoScreen,
    AppGalleryScreen,
    AppTraniersScreen,
    AppContactsScreen
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
  computed: {
    ...mapState({
      isLoadedData: state => state.mainContent.isLoadedData,
      seo: state => state.mainContent.seo
    }),
    options() {
      return {
        menu: "#menu",
        anchors: [
          "start-screen",
          "about-us",
          "gallery",
          "traniers",
          "contacts"
        ],
        licenseKey: "",
        onLeave: (origin, destination, direction) => {
          this.$store.commit("mainContent/changeActiveScreen", destination);
          switch (destination.anchor) {
            case "start-screen":
              this.$store.commit("mainContent/changeMenuBtnColor", "#ffffff");
              break;
            case "about-us":
              this.$store.commit("mainContent/changeMenuBtnColor", "#ffffff");
              break;
            case "gallery":
              this.$store.commit("mainContent/changeMenuBtnColor", "crimson");
              break;
            case "traniers":
              this.$store.commit("mainContent/changeMenuBtnColor", "crimson");
              break;
            case "contacts":
              this.$store.commit("mainContent/changeMenuBtnColor", "#ffffff");
              break;
            default:
              this.$store.commit("mainContent/changeMenuBtnColor", "#ffffff");
              break;
          }
        }
      };
    }
  },
  mounted() {
    this.$store.commit("mainContent/changeMenuBtnColor", "#ffffff");
    setInterval(() => {
      if (this.$refs.fullpage) {
        this.$refs.fullpage.api.moveSlideRight();
      }
    }, 4000);
  }
};
</script>

<style lang="scss"></style>
