<template>
  <div class="container" id="app">
    <div class="nav">
      <router-link to="/">
        <div class="home-box">
          <img class="home-logo" src="./assets/find.svg" alt="home">
          <h2 class="home-title">BookFinder</h2>
        </div>
      </router-link> 
      <router-link to="/cart">
        <div class="cart-box">
          <p class="mb-0" v-if="numberOfBooks !== 0 && !showMessage">
            <span v-if="numberOfBooks === 1">Added {{numberOfBooks}} book</span>
            <span v-if="numberOfBooks > 1">Added {{numberOfBooks}} books</span>
            worth {{totalPrice | roundPrice}} UAH
          </p>
          
          <img src="./assets/shopping-cart.svg" class="mr-1" alt="cart">
        </div>
      </router-link>
    </div>
    <p v-if="showMessage" class="alert alert-success mb-0">
    Your order in the amount of {{totalAmountOrder | roundPrice}} UAH is successful!
    </p>
    <div class="main-screen">
      <router-view />
    </div>
  </div>
</template>

<script>

import roundPrice from '@/components/roundPrice';
import { eventEmitter } from "./main";

export default {
  name: 'App',
  data() {
    return {
      numberOfBooks: 0,
      totalPrice: 0,
      totalAmountOrder: 0,
      showMessage: false,
    };
  },
  filters: {
    roundPrice
  },
  computed: {
    customersOrders() {
      return this.$store.getters.customersOrders;
    },
  },
  created() {
    eventEmitter.$on("cartListUpdated", () => {
      this.numberOfBooks = 0;
      this.totalPrice = 0;
      for (let customer in this.customersOrders) {
        this.numberOfBooks += this.customersOrders[customer].cart.length;
        this.totalPrice += this.customersOrders[customer].totalAmount;
      }
    });
    eventEmitter.$on("madeOrder", customer => {
      this.totalAmountOrder = this.$store.getters.customersOrders[customer].totalAmount;
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 15000);
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body a {
  text-decoration: none;
  color: rgb(53, 50, 50);
}
.home-box {
  display: flex;
  align-items: center;
  width: fit-content;
}
.home-logo {
  margin-right: 10px;
}
.home-title {
  margin-bottom: 0;
}
.cart-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav {
  justify-content: space-between;
  align-items: center;
}
.main-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}



</style>