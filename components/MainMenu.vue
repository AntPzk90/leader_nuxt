<template>
  <div v-show="isLoadedData">
    <header>
      <label for="check" class="burger-btn">
        <input type="checkbox" id="check" @change="isShowMenuChange" />
        <span
          :style="{
            'background-color': !isShowMenu ? menuBtnColor : '#ffffff'
          }"
        ></span>
        <span
          :style="{
            'background-color': !isShowMenu ? menuBtnColor : '#ffffff'
          }"
        ></span>
        <span
          :style="{
            'background-color': !isShowMenu ? menuBtnColor : '#ffffff'
          }"
        ></span>
      </label>
      <ul
        id="menu"
        class="menu"
        :class="{ show: isShowMenu, hide: !isShowMenu }"
        :style="{ 'background-color': backgroundColorMenu }"
      >
        <li class="menu-logo">
          <NuxtLink :to="{ path: '/' }" class="menu-logo">
            <img :src="logo.url" :alt="logo.alt" />
          </NuxtLink>
        </li>
        <li
          data-menuanchor="start-screen"
          :class="{ active: activeScreen == 'start-screen' }"
        >
          <a @click.prevent="routerPush('#start-screen')" v-show="!isMainPage"
            >Стартовый экран</a
          >
          <a href="#start-screen" v-show="isMainPage">Стартовый экран</a>
        </li>
        <li
          data-menuanchor="about-us"
          :class="{ active: activeScreen == 'about-us' }"
        >
          <a @click.prevent="routerPush('#about-us')" v-show="!isMainPage"
            >О нас</a
          >
          <a href="#about-us" v-show="isMainPage">О нас</a>
        </li>
        <li
          data-menuanchor="gallery"
          :class="{ active: activeScreen == 'gallery' }"
        >
          <a @click.prevent="routerPush('#gallery')" v-show="!isMainPage"
            >Галерея</a
          >
          <a href="#gallery" v-show="isMainPage">Галерея</a>
        </li>
        <li
          data-menuanchor="traniers"
          :class="{ active: activeScreen == 'traniers' }"
        >
          <a @click.prevent="routerPush('#traniers')" v-show="!isMainPage"
            >Тренера</a
          >
          <a href="#traniers" v-show="isMainPage">Тренера</a>
        </li>
        <li
          data-menuanchor="contacts"
          :class="{ active: activeScreen == 'contacts' }"
        >
          <a @click.prevent="routerPush('#contacts')" v-show="!isMainPage"
            >Контакты</a
          >
          <a href="#contacts" v-show="isMainPage">Контакты</a>
        </li>
        <li :class="{ active: activeScreen === 'articles' }">
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
    </header>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppMainMenu",
  data() {
    return {
      isShowMenu: false,
      backgroundColorMenu: "#2a3d7a"
    };
  },
  computed: {
    ...mapState({
      isLoadedData: state => state.mainContent.isLoadedData,
      activeScreen: state => state.mainContent.activeScreen,
      logo: state => state.mainContent.data.logo,
      address: state => state.mainContent.data.address,
      tel: state => state.mainContent.data.tel,
      menuBtnColor: state => state.mainContent.menuBtnColor
    }),

    isMainPage() {
      return this.$route.name === "index" ? true : false;
    }
  },
  methods: {
    isShowMenuChange() {
      this.isShowMenu = !this.isShowMenu;
    },
    routerPush(route) {
      if (this.$router.history.current.name !== "index") {
        this.$router.push({ name: "index", hash: route });
      }
    }
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
  z-index: 3;
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
  background-image: url("~assets/img/ali-leader.jpg");
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;

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
    cursor: pointer;

    &:active {
      opacity: 0.7;
    }

    @media screen and (max-width: 1366px) {
      font-size: 4vh;
    }

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
  z-index: 4;
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
    top: 2vh;
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
