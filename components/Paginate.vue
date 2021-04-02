<template>
  <div>
    <ul class="articles-paginate">
      <li>
        <button
          :disabled="activePage === 1"
          @click.prevent="changeActivePageDec()"
        >
          Пред
        </button>
      </li>
      <li
        v-for="int in count"
        :key="int"
        :class="{ active: int + 1 === activePage }"
      >
        <a :data-int="int + 1" @click.prevent="clickOnPaginateLink(int + 1)">
          {{ int + 1 }}
        </a>
      </li>
      <li>
        <button
          :disabled="activePage === pageCount"
          @click.prevent="changeActivePageInt()"
        >
          След
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppPaginate",
  props: {
    pageCount: {
      type: Number,
      required: true
    },
    initialPage: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      activePage: 0,
      prevBtnDisabled: true,
      nextBtnDisabled: false
    };
  },
  computed: {
    count() {
      let array = [];
      for (let i = 0; i < this.pageCount; i++) {
        array.push(i);
      }
      return array;
    }
  },
  methods: {
    clickOnPaginateLink(int) {
      this.activePage = 0;
      this.activePage = int;
      this.$emit("clickOnPaginateLink", int);
    },
    changeActivePageInt() {
      if (this.activePage > this.pageCount) {
        this.activePage = 1;
      } else {
        this.activePage++;
        this.$emit("clickOnPaginateLink", this.activePage);
      }
    },
    changeActivePageDec() {
      if (this.activePage < 1) {
        this.activePage = this.pageCount;
      } else {
        this.activePage--;
        this.$emit("clickOnPaginateLink", this.activePage);
      }
    }
  },
  mounted() {
    setTimeout((this.activePage = this.initialPage), 500);
  }
};
</script>

<style lang="scss">
.articles-paginate {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0 auto;
  list-style: none;
  font-size: 24px;

  li {
    border-bottom: 2px solid transparent;
    padding-left: 10px;
    padding-right: 10px;

    &.active {
      color: crimson;
      border-bottom: 2px solid crimson;
    }

    &:first-child {
      margin-right: 20px;
    }

    &:last-child {
      margin-left: 20px;
    }

    a {
      outline: none;
      cursor: pointer;
    }

    button {
      outline: none;
      font: inherit;
      color: inherit;
      border: none;
      padding: 0;
      background: none;
      cursor: pointer;

      &:disabled {
        opacity: 0.4;
      }
    }
  }
}
</style>
