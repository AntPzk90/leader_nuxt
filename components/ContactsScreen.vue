<template>
  <div class="contacts-screen">
    <div class="contacts-wrapper">
      <transition
        enter-active-class="bounceInDown"
        leave-active-class="bounceOutDown"
      >
        <h4 v-show="show">Контакты</h4>
      </transition>
      <ul>
        <transition
          enter-active-class="bounceInLeft"
          leave-active-class="bounceOutLeft"
        >
          <li v-show="show">
            <span>Тел :</span>
            <span>{{ tel }}</span>
          </li>
        </transition>
        <transition
          enter-active-class="bounceInRight"
          leave-active-class="bounceOutRight"
        >
          <li v-show="show">
            <span>Адрес :</span>
            <span>{{ address }}</span>
          </li>
        </transition>
        <transition
          enter-active-class="bounceInRight"
          leave-active-class="bounceOutRight"
        >
          <li v-show="show">
            <span>Вр. работы :</span>
            <p v-html="workTime"></p>
          </li>
        </transition>
      </ul>
      <transition
        enter-active-class="bounceInUp"
        leave-active-class="bounceOutDown"
      >
        <div class="social" v-show="show">
          <a
            v-for="(instLink, index) in instLinks"
            :href="`http://instagram.com/_u/${instLink.link}/`"
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
    <a
      hrfe="https://www.google.com/maps/place/сквер+60-летия+Победы,+вулиця+Вадима+Гурова,+Кривий+Ріг,+Дніпропетровська+область,+50000/@47.8962214,33.4005861,17z/data=!4m2!3m1!1s0x40db20cf280a4a53:0x804393b2f5b28e86"
      target="blank"
      class="map"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.1395165629624!2d33.40185200347569!3d47.896067071975565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUzJzQ3LjIiTiAzM8KwMjQnMDYuMSJF!5e0!3m2!1sru!2scz!4v1615475151080!5m2!1sru!2scz"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </a>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppContactsScreen",
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapState({
      activeScreen: state => state.mainContent.activeScreen,
      instLinks: state => state.mainContent.data.inst,
      address: state => state.mainContent.data.address,
      tel: state => state.mainContent.data.tel,
      workTime: state => state.mainContent.data.work_time
    })
  },
  mounted() {
    this.$store.watch(
      state => state.mainContent.activeScreen,
      () => {
        this.activeScreen === "contacts"
          ? (this.show = true)
          : (this.show = false);
      }
    );
  }
};
</script>

<style lang="scss">
.contacts-screen {
  height: 100%;
  background-color: $bg-color;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
}

.contacts-wrapper {
  text-align: center;

  @media screen and (max-width: 1024px) {
    padding-top: 2vh;
  }

  @media screen and (max-width: 576px) {
    padding-top: 4vh;
  }

  h4 {
    font-size: 5vw;
    font-weight: 500;
    color: $white;
    margin: 0;

    @media screen and (max-width: 1024px) {
      font-size: 5vh;
    }
  }

  ul {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    list-style: none;
    padding: 0;

    @media screen and (max-width: 1024px) {
      width: 90%;
    }

    li {
      font-size: 2vw;
      color: $white;
      text-align: left;
      display: flex;
      margin-bottom: 2vw;
      border-bottom: 2px solid $white;
      padding-bottom: 1vh;

      @media screen and (max-width: 1024px) {
        font-size: 2.5vh;
        flex-direction: column;
      }

      span:nth-child(1) {
        width: 24%;
        position: relative;

        @media screen and (max-width: 1024px) {
          width: 100%;
          margin-bottom: 2vh;

          &::after {
            content: "";
            width: 14%;
            height: 2px;
            background-color: crimson;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }
      }

      span:nth-child(2) {
        width: 70%;

        @media screen and (max-width: 1024px) {
          width: 100%;
          text-align: center;
        }
      }
    }

    p {
      margin: 0;
      @media screen and (max-width: 1024px) {
        text-align: center;
      }
    }
  }

  .social {
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media screen and (max-width: 1024px) {
    }

    a {
      text-decoration: none;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    svg {
      fill: $white;
      width: 7vw;
      height: auto;
      margin-left: auto;
      margin-right: auto;

      @media screen and (max-width: 1024px) {
        width: 12vw;
      }
    }

    span {
      color: $white;
      font-size: 4vh;
      border-bottom: 2px solid crimson;
      width: 100%;

      @media screen and (max-width: 1024px) {
        font-size: 2vh;
      }
    }
  }
}

.map {
  width: 50%;
  height: 100%;

  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 40%;
  }

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
