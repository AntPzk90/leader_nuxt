<template>
  <div class="info-screen">
    <div class="info-screen__row">
      <img :src="img1" alt="image" class="info-screen__img" />
      <div class="info-screen__txt-content">
        <transition
          enter-active-class="bounceInRight"
          leave-active-class="bounceOutRight"
        >
          <h3 class="info-screen__title" v-if="show">{{ title1 }}</h3>
        </transition>
        <transition
          enter-active-class="bounceInUp"
          leave-active-class="bounceOutRight"
        >
          <p class="info-screen__txt" v-if="show">
            {{ txt1 }}
          </p>
        </transition>
      </div>
    </div>
    <div class="info-screen__row info-screen__row--reverse">
      <img :src="img2" alt="image" class="info-screen__img" />
      <div class="info-screen__txt-content">
        <transition
          enter-active-class="bounceInLeft"
          leave-active-class="bounceOutRight"
        >
          <h3 class="info-screen__title" v-if="show">{{ title2 }}</h3>
        </transition>
        <transition
          enter-active-class="bounceInDown"
          leave-active-class="bounceOutLeft"
        >
          <p class="info-screen__txt" v-if="show">
            {{ txt2 }}
          </p>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppInfoScreen",
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapState({
      activeScreen: state => state.mainContent.activeScreen,
      isLoadedData: state => state.mainContent.isLoadedData,
      img1: state => state.mainContent.data.second_screen_img_1.url,
      title1: state => state.mainContent.data.second_screen_title_1,
      txt1: state => state.mainContent.data.second_screen_txt_1,
      img2: state => state.mainContent.data.second_screen_img_2.url,
      title2: state => state.mainContent.data.second_screen_title_2,
      txt2: state => state.mainContent.data.second_screen_txt_2
    })
  },
  mounted() {
    this.$store.watch(
      state => state.mainContent.activeScreen,
      () => {
        this.activeScreen === "page2"
          ? (this.show = true)
          : (this.show = false);
      }
    );
  }
};
</script>

<style lang="scss">
.info-screen {
  color: $white;
  background-color: $bg-color;

  .info-screen__row {
    display: flex;
    height: 50vh;

    @media screen and (max-width: 1024px) {
      flex-direction: column;
    }
  }

  .info-screen__row--reverse {
    flex-direction: row-reverse;

    @media screen and (max-width: 1024px) {
      flex-direction: column;
    }
  }

  .info-screen__img {
    width: 50%;
    object-fit: cover;

    @media screen and (max-width: 1024px) {
      width: 100%;
      height: 60%;
      margin-bottom: auto;
    }

    @media screen and (max-width: 576px) {
      height: 50%;
    }
  }

  .info-screen__txt-content {
    width: 50%;
    box-sizing: border-box;
    padding: 0 4vw;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1024px) {
      width: 100%;
      height: 40%;
      margin-top: 1vh;
      margin-bottom: auto;
    }

    @media screen and (max-width: 576px) {
      height: 50%;
    }

    .info-screen__title {
      font-size: 2.5vw;
      font-weight: 500;
      text-align: center;
      margin-top: auto;

      @media screen and (max-width: 1024px) {
        font-size: 2.5vh;
        margin-bottom: auto;
      }
    }

    .info-screen__txt {
      font-size: 1vw;
      line-height: 1.4vw;
      text-align: center;
      margin-bottom: auto;

      @media screen and (max-width: 1024px) {
        font-size: 1.6vh;
        line-height: 2vh;
      }
    }
  }
}
</style>
