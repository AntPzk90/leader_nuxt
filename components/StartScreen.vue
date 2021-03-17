<template>
  <div class="start-screen__main-wrapper">
    <div
      class="start-screen"
      v-if="isLoadedData"
      :style="{ 'background-image': 'url(' + bgImage + ')' }"
    >
      <div class="start-screen__content">
        <transition
          enter-active-class="zoomInLeft"
          leave-active-class="zoomOutLeft"
        >
          <h1 v-if="show">
            {{ title }}<br /><span>{{ colorWord }}</span>
          </h1>
        </transition>
        <transition
          enter-active-class="zoomInLeft"
          leave-active-class="zoomOutLeft"
        >
          <p v-if="show">{{ slogan }}</p>
        </transition>
      </div>
    </div>
    <div v-else>
      loading
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppStartScreen",
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapState({
      activeScreen: state => state.mainContent.activeScreen,
      isLoadedData: state => state.mainContent.isLoadedData,
      title: state => state.mainContent.data.main_title,
      colorWord: state => state.mainContent.data.main_title_color,
      slogan: state => state.mainContent.data.main_slogan,
      bgImage: state => state.mainContent.data.main_img.url
    })
  },
  mounted() {
    this.show = true;
    this.$store.watch(
      state => state.mainContent.activeScreen,
      () => {
        this.activeScreen === "page1"
          ? (this.show = true)
          : (this.show = false);
      }
    );
  }
};
</script>

<style lang="scss">
.start-screen__main-wrapper {
  height: 100%;
}
.start-screen {
  box-sizing: border-box;
  background-color: $bg-color;
  height: 100%;
  padding: 3vw;
  background-image: url("~assets/img/mike-tyson.jpg");
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  color: $white;
  display: flex;
  align-items: center;
  position: relative;

  @media screen and (max-width: 576px) {
    background-position: 35%;
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0;
    width: 20vw;
    border-bottom: 100vh solid $bg-color;
    border-right: 30vw solid transparent;
    z-index: 0;
  }

  .start-screen__content {
    z-index: 1;

    @media screen and (max-width: 576px) {
      margin-bottom: -15vh;
    }
  }

  h1 {
    font-size: 12vh;
    font-weight: 500;

    span {
      text-transform: uppercase;
      border-bottom: 1vh solid crimson;
    }

    @media screen and (max-width: 1024px) {
      font-size: 8vh;
    }

    @media screen and (max-width: 576px) {
      font-size: 6vh;
      text-align: center;
    }
  }

  p {
    font-size: 7vh;
    font-weight: 400;

    @media screen and (max-width: 1024px) {
      font-size: 5vh;
    }

    @media screen and (max-width: 576px) {
      font-size: 4vh;
      text-align: center;
    }
  }
}
</style>
