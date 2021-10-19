<template>
  <b-container>
    <b-row class="main-header pt-4 align-items-center">
      <b-col
        class="mb-3 mb-xl-0"
        cols="2"
      >
        <b-link
          to="/"
          class="link d-flex align-items-end"
        >
        <img src="./../assets/find.svg" alt="bookfinder logo" class="mr-2">
        <span class="logo-text">BookFinder</span> 
        </b-link>
      </b-col>

      <b-col
        class="d-flex justify-content-end"
        cols="10"
      >
        <cart-info class="mr-5"></cart-info>
        <div class="d-flex align-items-center">
          <div v-if="user === null">
            <b-button
              to="signin"
              class="btn-info"
            >Sign in</b-button>
            <b-button
              to="signup"
              class="btn-outline-info"
            >Sign up</b-button>
          </div>
          <b-button
            v-if="user !== null"
            to="/"
            class="btn-outline-secondary"
            @click="logout"
          >Logout</b-button>
        </div>
      </b-col>
    </b-row>
    <b-row class="main-header pb-4">
      <b-col
        class="d-flex"
        cols="8"
        offset="2"
        offset-md="3"
        md="6"
      >
        <book-search class="w-100 mt-5 mb-4 ml-xl-4 ml-0"></book-search>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <nuxt class="w-100"></nuxt>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import BookSearch from "./../components/BookSearch";
import CartInfo from "./../components/CartInfo";
// import { auth } from "./../services/firebase";

export default {
  name: "Default",
  components: {
    CartInfo,
    BookSearch
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$store.dispatch('cart/clearCart');
    }
  }
};
</script>

<style scoped>
.logo-text {
  font-size: 28px;
}
.link {
  color: black;
}
.btn-outline-info {
  background-color: white;
}
.btn-outline-info:hover {
  background-color: #17a2b8;
}
.btn-outline-secondary {
  background-color: white;
}
.btn-outline-secondary:hover {
  background-color: #6c757d;
}
/* .main-header {
  background-color: paleturquoise;
} */
</style>