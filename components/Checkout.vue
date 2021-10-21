<template>
  <b-container>
    <b-row
      class="align"
      align-h="center"
      align-v="center"
    >
      <b-col
        md="8"
        lg="6"
      >
        <b-form @submit.stop.prevent="onSubmit">
          <b-form-group
            label="Enter your name"
            label-for="name"
          >
            <b-form-input
              id="name"
              v-model="inputData.name"
              type="text"
              placeholder="Name"
              :class="{'is-invalid': $v.inputData.name.$error, 'is-valid': !$v.inputData.name.$invalid}"
              required
            ></b-form-input>
            <b-form-invalid-feedback 
              v-if="!$v.inputData.name.required" 
              class="invalid-feedback">
                Filling of this field is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback 
              v-if="!$v.inputData.name.minLength" 
              class="invalid-feedback">
                Name should be at least 2 symbols long
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            label="Enter your e-mail"
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="inputData.email"
              placeholder="E-mail"
              :class="{'is-invalid': $v.inputData.email.$error, 'is-valid': !$v.inputData.email.$invalid}"
              required
            ></b-form-input>
            <b-form-invalid-feedback 
              v-if="!$v.inputData.email.required">
                Filling of this field is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback
              v-if="!$v.inputData.email.email"
            >This email isn't valid
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            label="Enter your phone number"
            label-for="phone"
          >
            <b-form-input
              id="phone"
              v-model="inputData.phoneNumber"
              v-mask="'+380#########'"
              type="tel"
              :class="{'is-invalid': $v.inputData.phoneNumber.$error, 'is-valid': !$v.inputData.phoneNumber.$invalid}"
            ></b-form-input>
            <b-form-invalid-feedback
              v-if="!$v.inputData.phoneNumber.minLength || !$v.inputData.phoneNumber.maxLength">
                Phone number isn't valid
              </b-form-invalid-feedback>
          </b-form-group>
          <div class="d-flex justify-content-end">
            <b-button
              type="submit"
              :class="['btn', 'primary-button', 'btn-primary', 'px-5', {'disabled': !$v.inputData.name.required || !$v.inputData.email.required || !$v.inputData.phoneNumber.minLength}]"
            >Submit</b-button>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { setTimeout } from "timers";
import { required, minLength, maxLength, email } from "vuelidate/lib/validators";
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMask from "v-mask";

Vue.use(VueMask);
Vue.use(Vuelidate); 

export default {
  data() {
    return {
      inputData: {
        name: "",
        email: "",
        phoneNumber: "+38"
      },
      totalPrice: 0
    };
  },
  validations: {
    inputData: {
      name: {
        minLength: minLength(2),
        required
      },
      email: {
        email,
        required
      },
      phoneNumber: {
        minLength: minLength(13),
        maxLength: maxLength(13),
        required
      }
    }
  },
  methods: {
    validationRun(input) {
      this.$v.inputData[input].$touch();
    },
    onSubmit() {
      for (const input in this.$data.inputData) {
        this.validationRun(input);
      }
      if (!this.$v.inputData.$error) {
        this.$router.push("/");
        this.totalPrice = this.$store.getters["cart/cartTotalPrice"];
        this.$store.dispatch("cart/checkout");
        setTimeout(() => {
          this.$store.dispatch("cart/checkout", "");
        }, 150);
      }
    },
  }
};
</script>
<style scoped>
.align {
  margin-top: 40px;
}
</style>