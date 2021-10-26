<template>
  <div class="container">
    <!-- <div
      class="align"
      align-h="center"
      align-v="center"
    >
      <div
        md="8"
        lg="6"
      > -->
        <form @submit.stop.prevent="confirmOrder">
          <div
            label="Enter your name"
            label-for="name"
          >
            <input
              id="name"
              type="text"
              placeholder="Name"
              ref="inputName"
              @change="getInputValue"
              :class="{'is-invalid': v$.inputData.name.$error, 'is-valid': !v$.inputData.name.$invalid}"
              required
            />
            <div 
              v-if="!v$.inputData.name.required" 
              class="invalid-feedback">
                Filling of this field is required
            </div>
            <div 
              v-if="!v$.inputData.name.minLength" 
              class="invalid-feedback">
                Name should be at least 2 symbols long
            </div>
          </div>

          <div
            label="Enter your e-mail"
            label-for="email"
          >
            <input
              id="email"
              placeholder="E-mail"
              ref="inputEmail"
              @change="getInputValue"
              :class="{'is-invalid': v$.inputData.email.$error, 'is-valid': !v$.inputData.email.$invalid}"
              required
            />
            <div 
              v-if="!v$.inputData.email.required">
                Filling of this field is required
            </div>
            <div
              v-if="!v$.inputData.email.email"
            >This email isn't valid
            </div>
          </div>

          <div
            label="Enter your phone number"
            label-for="phone"
          >
            <input
              id="phone"
              v-mask="'+380#########'"
              type="tel"
              ref="inputPhoneNumber"
              @change="getInputValue"
              :class="{'is-invalid': v$.inputData.phoneNumber.$error, 'is-valid': !v$.inputData.phoneNumber.$invalid}"
            />
            <div
              v-if="!v$.inputData.phoneNumber.minLength || !v$.inputData.phoneNumber.maxLength">
                This phone number isn't valid
              </div>
          </div>
          <div class="d-flex justify-content-end">
            <button
            type="submit"
            :class="['btn', 'primary-button', 'btn-primary', 'px-5', {'disabled': !v$.inputData.name.required || !v$.inputData.email.required || !v$.inputData.phoneNumber.minLength}]"
            >
              Submit
            </button>
          </div>
        </form>
      <!-- </div>
    </div> -->
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import {
  required,
  minLength,
  maxLength,
  email
} from "@vuelidate/validators";

export default {
  name: 'Checkout',
  setup() {
    const store = useStore();
    const router = useRouter();

    // inputs
    const inputName = ref(null);
    const inputEmail = ref(null);
    const inputPhoneNumber = ref(null);

    const inputData = {
      name: inputName.value,
      email: inputEmail.value,
      phoneNumber: '+380'+inputPhoneNumber.value
    }

    // validation
    const rules = {
      name: { 
        required,
        minLength: minLength(2)
      }, 
      email: { 
        required,
        email
      },
      phoneNumber: {
        required,
        minLength: minLength(13),
        maxLength: maxLength(13)
      }
    }
    const v$ = useVuelidate(rules, inputData)

    function validationRun(input) {
      v$.inputData[input].$touch();
    }

    // testing inputs
    function getInputValue() {
      console.log('inputName: ', inputName.value.value);
      console.log('inputEmail: ', inputEmail.value.value);
      console.log('inputPhoneNumber: ', inputPhoneNumber.value.value);
    }

    // submitting form -> validation -> sending to store -> redirecting to home page
    function confirmOrder() {
      for (let input in inputData) {
        validationRun(input);
      }
      console.log('inputData: ', inputData);
      if (!v$.inputData.$error) {
        let customerData = {
          name: inputData.name,
          email: inputData.email,
          phoneNumber: inputData.phoneNumber
        }
        store.dispatch("makeOrder", customerData);
        router.push('/')
      }
    }

    return {
      confirmOrder,
      getInputValue,
      inputName,
      inputEmail,
      inputPhoneNumber,
      v$,
      inputData,
    }
  }
}
</script>

<style scoped>

</style>