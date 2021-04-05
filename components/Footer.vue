<template>
  <div>
    <footer class="footer">
      <div class="container">
        <transition
          enter-active-class="bounceInLeft"
          leave-active-class="bounceOutLeft"
        >
          <NuxtLink :to="{ path: '/' }" class="footer__logo" v-show="show">
            <img :src="logo.url" :alt="logo.alt" />
          </NuxtLink>
        </transition>

        <transition
          enter-active-class="bounceInDown"
          leave-active-class="bounceOutDown"
        >
          <div class="footer__title">
            <h3>
              {{ title }} <span>{{ colorWord }}</span>
            </h3>
            <p>{{ slogan }}</p>
          </div>
        </transition>

        <ul>
          <transition
            enter-active-class="bounceIn"
            leave-active-class="bounceOut"
          >
            <li v-show="show">
              <span>Тел :</span>
              <span>{{ tel }}</span>
            </li>
          </transition>
          <transition
            enter-active-class="bounceIn"
            leave-active-class="bounceOut"
          >
            <li v-show="show">
              <span>Адрес :</span>
              <span>{{ address }}</span>
            </li>
          </transition>
          <transition
            enter-active-class="bounceIn"
            leave-active-class="bounceOut"
          >
            <li v-show="show">
              <span>Вр. раб.:</span>
              <div v-html="workTime"></div>
            </li>
          </transition>
        </ul>
        <transition
          enter-active-class="bounceInRight"
          leave-active-class="bounceOutRight"
        >
          <div class="footer__social" v-show="show">
            <a
              v-for="(instLink, index) in instLinks"
              :href="`https://www.instagram.com/${instLink.link}/?hl=ru`"
              :key="index"
              target="blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                enable-background="new 0 0 144.083 144"
                height="144px"
                id="Instagram"
                version="1.1"
                viewBox="0 0 144.083 144"
                width="144.083px"
                xml:space="preserve"
              >
                <path
                  d="M72.041,11.166c-33.543,0-60.833,27.29-60.833,60.834c0,33.544,27.29,60.834,60.833,60.834  c33.544,0,60.834-27.29,60.834-60.834C132.875,38.456,105.584,11.166,72.041,11.166z M72.041,126.834  c-30.235,0-54.833-24.599-54.833-54.834c0-30.235,24.598-54.834,54.833-54.834c30.235,0,54.834,24.599,54.834,54.834  C126.875,102.235,102.276,126.834,72.041,126.834z"
                />
                <path
                  d="M91.076,42.701H53.006c-5.615,0-10.184,4.568-10.184,10.184v38.245c0,5.615,4.568,10.184,10.184,10.184h38.069  c5.615,0,10.184-4.568,10.184-10.184V52.884C101.259,47.269,96.691,42.701,91.076,42.701z M80.847,71.899  c0,4.856-3.95,8.806-8.806,8.806s-8.806-3.95-8.806-8.806c0-2.409,0.974-4.593,2.546-6.184H78.3  C79.874,67.306,80.847,69.49,80.847,71.899z M83.4,50.849h8.92v9.189H83.4V50.849z M91.076,95.313H53.006  c-2.307,0-4.184-1.877-4.184-4.184V65.715h9.784c-0.871,1.885-1.371,3.975-1.371,6.184c0,8.165,6.642,14.806,14.806,14.806  s14.806-6.642,14.806-14.806c0-2.209-0.5-4.299-1.371-6.184h9.783v25.414C95.259,93.436,93.382,95.313,91.076,95.313z"
                />
              </svg>
              <span>
                {{ instLink.link }}
              </span>
            </a>
          </div>
        </transition>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppFooter",
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapState({
      isLoadedData: state => state.mainContent.isLoadedData,
      logo: state => state.mainContent.data.logo,
      title: state => state.mainContent.data.main_title,
      colorWord: state => state.mainContent.data.main_title_color,
      slogan: state => state.mainContent.data.main_slogan,
      instLinks: state => state.mainContent.data.inst,
      address: state => state.mainContent.data.address,
      tel: state => state.mainContent.data.tel,
      workTime: state => state.mainContent.data.work_time
    })
  },
  mounted() {
    this.show = true;
  }
};
</script>

<style lang="scss">
footer {
  background-color: $bg-color;
  padding-top: 30px;
  padding-bottom: 30px;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .footer__logo {
      width: 140px;
      height: auto;

      @media screen and (max-width: 1024px) {
        width: 112px;
      }

      @media screen and (max-width: 576px) {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
      }

      img {
        width: 100%;
        height: auto;
      }
    }

    @media screen and (max-width: 1200px) {
      justify-content: space-between;
    }

    .footer__title {
      @media screen and (max-width: 1024px) {
        display: none;
      }
      h3 {
        font-size: 32px;
        color: $white;

        span {
          border-bottom: 3px solid crimson;
        }
      }

      p {
        font-size: 18px;
        color: $white;
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // margin-left: 31%;
      // margin-right: auto;
      list-style: none;
      padding: 0;

      // @media screen and (max-width: 1366px) {
      //   margin-left: 28%;
      // }

      // @media screen and (max-width: 1200px) {
      //   flex-direction: column;
      //   margin-left: 24%;
      //   margin-right: auto;
      // }

      @media screen and (max-width: 1024px) {
        margin-left: 14.5%;
      }

      @media screen and (max-width: 768px) {
        margin-left: 4%;
      }

      @media screen and (max-width: 576px) {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
      }

      li {
        font-size: 18px;
        color: $white;
        text-align: left;
        display: flex;
        max-width: 320px;
        margin-right: 40px;

        @media screen and (max-width: 1200px) {
          text-align: center;
          margin-right: 0;
        }

        span:first-child {
          white-space: nowrap;
          width: auto;
          margin-right: 20px;
        }

        span:last-child {
          width: auto;
          margin-left: auto;
          margin-right: auto;
        }

        p {
          white-space: nowrap;
          margin-left: 0;
          margin: 0;
        }
      }

      p {
        margin: 0 auto;
      }
    }

    .footer__social {
      display: flex;
      justify-content: space-around;
      align-items: center;

      @media screen and (max-width: 768px) {
        flex-direction: column;
      }

      @media screen and (max-width: 576px) {
        flex-direction: row;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
      }

      a {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 40px;

        @media screen and (max-width: 1200px) {
          margin-right: 20px;
        }

        @media screen and (max-width: 768px) {
          margin-right: 0;
        }

        @media screen and (max-width: 576px) {
          margin-right: auto;
        }

        &:last-child {
          margin-right: 0;
        }
      }

      svg {
        fill: $white;
        width: 80px;
        height: auto;
        margin-left: auto;
        margin-right: auto;

        @media screen and (max-width: 1200px) {
          width: 60px;
        }
      }

      span {
        color: $white;
        font-size: 18px;
        border-bottom: 2px solid crimson;
        width: 100%;

        @media screen and (max-width: 1200px) {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
