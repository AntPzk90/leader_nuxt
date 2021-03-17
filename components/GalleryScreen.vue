<template>
  <div class="gallery-screen">
    <div
      class="slide"
      v-for="(photosItem, index) in photosConverted"
      :data-anchor="`slide${index + 1}`"
      :key="index"
    >
      <transition
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        v-for="(photo, index) in photosItem"
        :key="index"
      >
        <div class="slide__img-wrapper" v-if="show">
          <img
            :src="photo.gallery_img.url"
            :alt="photo.gallery_img.alt"
            v-if="show"
            @click="showFullPicture(photo.gallery_img.url)"
          />
          <p v-if="show">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
            eius unde quisquam consequatur voluptates dolorum ab vitae
          </p>
        </div>
      </transition>
    </div>
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div
        class="gallery-screen__pop-up"
        v-if="isShowFullPhoto"
        @click="isShowFullPhoto = false"
      >
        <button class="gallery-screen__pop-up-close"></button>
        <img
          class="gallery-screen__full-photo"
          :src="fullPhotoUrl"
          alt="full size photo"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppGalleryScreen",
  data() {
    return {
      show: false,
      fullPhotoUrl: null,
      isShowFullPhoto: false
    };
  },
  computed: {
    ...mapState({
      activeScreen: state => state.mainContent.activeScreen,
      isLoadedData: state => state.mainContent.isLoadedData,
      photos: state => state.mainContent.data.gallery
    }),
    photosConverted() {
      if (this.photos) {
        let convertedArr = []; //массив в который будет выведен результат.
        for (let i = 0; i < Math.ceil(this.photos.length / 2); i++) {
          convertedArr[i] = this.photos.slice(i * 2, i * 2 + 2);
        }
        return convertedArr;
      }
      return [];
    }
  },
  methods: {
    showFullPicture(url) {
      this.fullPhotoUrl = url;
      this.isShowFullPhoto = true;
    }
  },
  mounted() {
    this.$store.watch(
      state => state.mainContent.activeScreen,
      () => {
        this.activeScreen === "page3"
          ? (this.show = true)
          : (this.show = false);
        this.isShowFullPhoto ? (this.isShowFullPhoto = false) : "";
      }
    );
  }
};
</script>

<style lang="scss">
.gallery-screen {
  background-color: $bg-color;
  background-image: url("~assets/img/bombing.png");
  background-size: 650px 490px;
  position: relative;

  .gallery-screen__title {
    text-align: center;
    font-size: 8vh;
    margin: 0;
    margin-bottom: 0;
    color: $bg-color;
    background-color: $white;
  }

  .slide {
    .fp-tableCell {
      background-color: transparent;
      display: flex;
      justify-content: space-around;
      align-items: center;

      @media screen and (max-width: 1024px) {
        flex-direction: column;
      }

      .slide__img-wrapper {
        display: block;
        border: 2px solid $bg-color;
        width: 42%;
        height: 74%;
        position: relative;

        &:nth-child(1) {
          margin-left: auto;
          margin-right: 1vw;
        }

        &:nth-child(2) {
          margin-right: auto;
          margin-left: 1vw;
        }

        @media screen and (max-width: 1024px) {
          height: 48%;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        p {
          box-sizing: border-box;
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: $bg-color;
          color: $white;
          margin: 0;
          width: 100%;
          padding: 3vh;
          text-align: center;

          @media screen and (max-width: 1024px) {
            font-size: 2vh;
            line-height: 2vh;
          }
        }
      }
    }
  }
}
.fp-controlArrow.fp-next {
  border-color: transparent transparent transparent $bg-color;
  @media screen and (max-width: 1024px) {
    display: none;
  }
}

.fp-controlArrow.fp-prev {
  border-color: transparent $bg-color transparent transparent;
  @media screen and (max-width: 1024px) {
    display: none;
  }
}

.gallery-screen__pop-up {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  img {
    width: 80%;
    height: auto;
    max-height: 90vh;
    object-fit: cover;
    transform: translate(-50%, -50%);
    position: fixed;
    top: 50%;
    left: 50%;
  }
}

.gallery-screen__pop-up-close {
  position: fixed;
  top: 2%;
  right: 2%;
  width: 60px;
  height: 60px;
}
</style>
