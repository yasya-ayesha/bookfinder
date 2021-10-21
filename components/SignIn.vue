<template>
  <div>
    <b-row
      class="align"
      align-h="center"
      align-v="center"
    >
      <b-col
        md="8"
        lg="6"
      >
        <b-form
          @submit.prevent="signIn"
        >
          <h2 class="text-center mb-3">Sign in</h2>
          <b-form-group>
            <b-form-input
              v-model="inputData.email"
              type="text"
              class="form-control text-center"
              placeholder="E-mail"
              autocomplete="username"
            />
          </b-form-group>
          <b-form-group>
            <b-form-input
              v-model="inputData.password"
              type="password"
              class="form-control text-center"
              placeholder="Password"
              autocomplete="current-password"
            />
          </b-form-group>

          <div class="d-flex justify-content-between mb-3">
            <div>
            <p class="m-0">Have no account yet?</p>
            <b-link
              to="/signup"
            >Sign up</b-link>
            </div>
            <b-button
              class="px-5"
              variant="dark"
              type="submit"
            >Log in</b-button>
          </div>
          <div
            v-show="isError"
            class="alert alert-danger"
          >
            <p class="mb-0 text-center">{{errorMsg}}</p>
          </div>
        </b-form>
        <b-link class="link text-center" to="/">
          Back to Home page
        </b-link>
        <b-alert
          v-if="isNewUserRegistered"
          class="text-center"
          show
          variant="success"
        >A new user has been signed up</b-alert>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  layout: "empty",
  data() {
    return {
      inputData: {
        email: "",
        password: ""
      },
      isError: false,
      errorMsg: ""
    };
  },
  computed: {
    isNewUserRegistered() {
      return this.$store.getters["user/isNewUserRegistered"];
    }
  },
  methods: {
    async signIn() {
      await this.$store.dispatch("user/signIn", this.inputData).catch(error => {
        this.isError = true;
        this.errorMsg = error.message;
        setTimeout(() => {
          this.isError = false;
        }, 5000);
      });
      if (this.$store.getters["user/user"] !== null) {
        this.$router.push("/");
      }
    }
  },
  
};
</script>

<style scoped>

.link {
  color: black;
}
</style>