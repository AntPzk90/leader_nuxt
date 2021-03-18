<template>
  <div v-if="isLoadedData">
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
  </div>
  <div v-else>
    <AppLoading />
  </div>
</template>

<script>
import AppStartScreen from "~/components/StartScreen";
import AppInfoScreen from "~/components/InfoScreen";
import AppGalleryScreen from "~/components/GalleryScreen";
import AppTraniersScreen from "~/components/TraniersScreen";
import AppContactsScreen from "~/components/ContactsScreen";
import AppLoading from "~/components/Loading";
import AppMainMenu from "~/components/MainMenu";
import { mapState } from "vuex";

export default {
  components: {
    AppStartScreen,
    AppInfoScreen,
    AppGalleryScreen,
    AppTraniersScreen,
    AppContactsScreen,
    AppLoading,
    AppMainMenu
  },
  data() {
    return {
      options: {
        licenseKey: "",
        menu: "#menu",
        anchors: ["page1", "page2", "page3", "page4", "page5"],
        sectionsColor: ["red", "#ff5f45", "#0798ec"],
        onLeave: (origin, destination, direction) => {
          this.$store.commit("mainContent/changeActiveScreen", destination);
        }
      }
    };
  },
  computed: {
    ...mapState({
      isLoadedData: state => state.mainContent.isLoadedData
    })
  },
  mounted() {
    this.$store.dispatch("mainContent/getMainContentAction", {
      apiUrl: "/posts/76"
    });
    setInterval(() => {
      if (this.$refs.fullpage) {
        this.$refs.fullpage.api.moveSlideRight();
      }
    }, 4000);
  }
};
</script>

<style lang="scss">
label span {
  background: #fff;
  border-radius: 10px;
  height: 7px;
  margin: 7px 0;
  transition: 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

span:nth-of-type(1) {
  width: 40%;
}

span:nth-of-type(2) {
  width: 90%;
}

span:nth-of-type(3) {
  width: 65%;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]:checked ~ span:nth-of-type(1) {
  transform-origin: bottom;
  //transform: rotatez(45deg) translate(8px, 0px);
  transform: rotatez(44deg) translate(9px, 0px);
  width: 41%;
}

input[type="checkbox"]:checked ~ span:nth-of-type(2) {
  transform-origin: top;
  transform: rotatez(-45deg);
  width: 93%;
}

input[type="checkbox"]:checked ~ span:nth-of-type(3) {
  transform-origin: bottom;
  width: 50%;
  transform: translate(30px, -11px) rotatez(45deg);
}

.menu {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 1;
  height: 100%;
  background-color: $bg-color;
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  padding: 3vw;
  padding-top: 10vw;
  padding-right: 3vw;
  transition: all ease 0.4s;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-left: 2px solid $white;
  width: 22vw;

  @media screen and (max-width: 1024px) {
    padding: 3vh;
    padding-top: 15vh;
    padding-right: 3vh;
    padding-bottom: 15vh;
    width: 40vw;
  }

  @media screen and (max-width: 576px) {
    width: 70vw;
  }

  li {
    margin-bottom: 3vh;
    font-size: 3vh;
    color: $white;
    text-decoration: none;

    @media screen and (max-width: 1024px) {
      font-size: 2.5vh;
    }

    &.address {
      padding-left: 3vw;
      position: relative;
      border-top: 3px solid $white;
      padding-top: 2vh;

      @media screen and (max-width: 1024px) {
        padding-left: 5vh;
      }
    }

    svg {
      width: 5vh;
      height: auto;
      fill: crimson;
      position: absolute;
      top: 1vh;
      left: 0;

      @media screen and (max-width: 1024px) {
        width: 5vh;
      }
    }
  }

  a {
    font-size: 3vh;
    color: $white;
    text-decoration: none;

    @media screen and (max-width: 1024px) {
      font-size: 2.5vh;
    }
  }
}

.active {
  a {
    color: crimson;
  }
}

.menu-logo {
  position: absolute;
  top: 1vw;
  left: 1vw;

  img {
    width: 6vw;
    height: auto;

    @media screen and (max-width: 1024px) {
      width: 10vh;
      height: auto;
    }

    @media screen and (max-width: 576px) {
      width: 12vh;
    }
  }

  @media screen and (max-width: 1024px) {
    top: 1vh;
    left: 3vh;
  }
}

.show {
  bottom: 0;
  right: 0;
}

.hide {
  bottom: 0;
  right: -600px;
}

.burger-btn {
  position: fixed;
  top: 2vw;
  right: 2vw;
  z-index: 2;
  width: 70px;
  background-color: transparent;
  border: none;
  padding: 4px;
  outline: none;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    top: 4vh;
    right: 1vh;
  }

  @media screen and (max-width: 576px) {
    top: 3vh;
  }

  svg {
    fill: $white;
    width: 100%;
    height: auto;
  }

  svg.close {
    width: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
