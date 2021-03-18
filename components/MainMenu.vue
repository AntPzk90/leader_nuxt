<template>
  <div v-if="isLoadedData">
    <label for="check" class="burger-btn">
      <input type="checkbox" id="check" @change="isShowMenuChange" />
      <span :style="{ 'background-color': colorMenuBtn }"></span>
      <span :style="{ 'background-color': colorMenuBtn }"></span>
      <span :style="{ 'background-color': colorMenuBtn }"></span>
    </label>
    <ul
      id="menu"
      class="menu"
      :class="{ show: isShowMenu, hide: !isShowMenu }"
      :style="{ 'background-color': backgroundColorMenu }"
    >
      <NuxtLink :to="{ path: '/' }" class="menu-logo">
        <img :src="logo.url" :alt="logo.alt" />
      </NuxtLink>
      <li
        data-menuanchor="page1"
        @click="routerPush('#page1')"
        :class="{ active: activeScreen == 'page1' }"
      >
        <a href="#page1">Стартовый экран</a>
      </li>
      <li
        data-menuanchor="page2"
        @click="routerPush('#page2')"
        :class="{ active: activeScreen == 'page2' }"
      >
        <a href="#page2">О нас</a>
      </li>
      <li
        data-menuanchor="page3"
        @click="routerPush('#page3')"
        :class="{ active: activeScreen == 'page3' }"
      >
        <a href="#page3">Галерея</a>
      </li>
      <li
        data-menuanchor="page4"
        @click="routerPush('#page4')"
        :class="{ active: activeScreen == 'page4' }"
      >
        <a href="#page4">Тренера</a>
      </li>
      <li
        data-menuanchor="page5"
        @click="routerPush('#page5')"
        :class="{ active: activeScreen == 'page5' }"
      >
        <a href="#page5">Контакты</a>
      </li>
      <li
        :class="{ active: this.$router.history.current.path === '/articles' }"
      >
        <NuxtLink :to="{ name: 'articles' }">Блог</NuxtLink>
      </li>
      <li class="address">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <title>map-pin</title>
          <path
            d="M13 8.17a3.001 3.001 0 1 1-2 0V4a1 1 0 0 1 .999-1c2.1-.002 4.12.783 5.643 2.243 3.144 3.014 3.144 7.92-.016 10.948l-4.95 4.546a1 1 0 0 1-1.352 0l-4.966-4.56c-3.144-3.014-3.144-7.92 0-10.934a1 1 0 0 1 1.384 1.444c-2.323 2.227-2.323 5.819-.015 8.031L12 18.643l4.258-3.91c2.323-2.227 2.323-5.819 0-8.046A6.068 6.068 0 0 0 13 5.077v3.094zM12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            fill-rule="nonzero"
          /></svg
        >{{ address }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppMainMenu",
  data() {
    return {
      isShowMenu: false,
      colorMenuBtn: "#ffffff",
      backgroundColorMenu: "#2a3d7a"
    };
  },
  computed: {
    ...mapState({
      activeScreen: state => state.mainContent.activeScreen,
      isLoadedData: state => state.mainContent.isLoadedData,
      logo: state => state.mainContent.data.logo,
      address: state => state.mainContent.data.address,
      tel: state => state.mainContent.data.tel
    }),
    location() {
      return window.location.href;
    }
  },
  methods: {
    isShowMenuChange() {
      if (!this.isShowMenu) {
        this.colorMenuBtn = "#ffffff";
      } else {
        if (this.activeScreen === "page3" || this.activeScreen === "page4")
          this.colorMenuBtn = "#dc143c";
        else if (this.activeScreen === "page5" && window.innerWidth >= 1024) {
          this.colorMenuBtn = "#2a3d7a";
        }
      }
      this.isShowMenu = !this.isShowMenu;
    },
    routerPush(page) {
      if (this.$router.history.current.path !== "/") {
        this.$router.replace("/" + page);
      }
    }
  },
  mounted() {
    this.$store.watch(
      state => state.mainContent.activeScreen,
      () => {
        if (!this.isShowMenu) {
          if (this.activeScreen === "page3" || this.activeScreen === "page4")
            this.colorMenuBtn = "#dc143c";
          else if (this.activeScreen === "page5" && window.innerWidth >= 1024) {
            this.colorMenuBtn = "#2a3d7a";
          } else {
            this.colorMenuBtn = "#ffffff";
          }
        }
      }
    );
    if (this.$router.history.current.path !== "/") {
      this.backgroundColorMenu = "#282828";
    }
  }
};
</script>

<style lang="scss">
.active {
  color: crimson;
}
</style>
