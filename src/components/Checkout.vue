<template>
  <div class="container">
    <h5 class="mt-5 alert alert-light">To complete your order, please fill in the following form</h5>
    <div class="d-flex justify-content-center mt-4">
      <div class="col-sm-6">
        <form @submit.prevent="confirmOrder">
          <div :class="['form-group', 'mb-4', { error: v$.name.$errors.length }]">
            <label for="name">Enter your name: </label>
            <input 
              id="name"
              type="text"
              placeholder="Name"
              v-model="v$.name.$model"
              class="form-control"
            />
            <div 
            class="input-errors" 
            v-for="(error, index) of v$.name.$errors" 
            :key="index"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div :class="['form-group', 'mb-4', { error: v$.email.$errors.length }]">
            <label for="email">Enter your e-mail: </label>
            <input
              id="email"
              type="text"
              placeholder="E-mail"
              v-model="v$.email.$model"
              class="form-control"
            />
            <div 
            class="input-errors" 
            v-for="(error, index) of v$.email.$errors" 
            :key="index"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div :class="['form-group', 'mb-4', { error: v$.phoneNumber.$errors.length }]">
            <label for="phone">Enter your phone number: </label>
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">+380</span>
              <input
                id="phone"
                v-model="v$.phoneNumber.$model"
                type="number"
                placeholder="Phone number"
                class="form-control"
                aria-describedby="basic-addon1"
                aria-label="Phone number"
              />
            </div>
            <div 
            class="input-errors" 
            v-for="(error, index) of v$.phoneNumber.$errors" 
            :key="index"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button
            type="submit"
            class="btn primary-button btn-primary px-5" 
            :disabled="v$.$invalid"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
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

    const form = reactive({
      name: '',
      email: '',
      phoneNumber: ''
    })

    const rules = {
      name: {required, min: minLength(2)},
      email: {required, email},
      phoneNumber: {required, min: minLength(9), max: maxLength(9)}
    }

    const v$ = useVuelidate(rules, form)

    function confirmOrder() {
      if (!v$.$error) {
        const customerData = {
          name: form.name,
          email: form.email,
          phoneNumber: '+380'+form.phoneNumber
        }
        // console.log('inputData: ', customerData);
        store.dispatch("makeOrder", customerData);
        router.push('/')
      }
    }

    return {
      form,
      v$,
      confirmOrder
    }
  }
}
</script>

<style scoped>
.input-group-text {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.error-msg {
  color: red
}
</style>