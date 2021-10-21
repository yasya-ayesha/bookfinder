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
          @submit.prevent="signUp"
        >
          <h2 class="text-center mb-3">Sign up</h2>
          <b-form-group>
            <b-form-input
              v-model="inputData.email"
              class="form-control text-center"
              type="text"
              placeholder="E-mail"
              autocomplete="username"
            ></b-form-input>
          </b-form-group>
          <b-form-group description="Password should be at least 6 symbols long">
            <b-form-input
              v-model="inputData.password"
              class="form-control text-center"
              type="password"
              placeholder="Password"
              autocomplete="current-password"
            ></b-form-input>
          </b-form-group>

          <div class="d-flex justify-content-between mb-3">
            <div>
            <p class="m-0">Have an account already?</p>
            <b-link
              to="/signin"
            >Sign in</b-link>
            </div>
            <b-button
              type="submit"
              variant="dark"
            >Sign up</b-button>
          </div>
          <b-link
            class="link text-center"
            to="/"
          >Back to Home page</b-link>
          <div
            v-show="isError"
            class="alert alert-danger"
          >
            <p class="mb-0 text-center">{{errorMsg}}</p>
          </div>
        </b-form>
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
  methods: {
    async signUp() {
      await this.$store
        .dispatch("user/signUp", this.inputData)
        .then(() => this.$router.push("/signin"))
        .catch(error => {
          this.isError = true;
          this.errorMsg = error.message;
          setTimeout(() => {
            this.isError = false;
          }, 5000);
        });
      setTimeout(() => {
        this.$store.dispatch("user/newUserRegistered", true);
      }, 5000);
    }
  }
};
</script>

<style scoped>

.link {
  color: black;
}
</style>