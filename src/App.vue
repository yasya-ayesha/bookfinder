<template>
  <div class="container" id="app">
    <div class="nav">
      <router-link to="/">
        <div class="home-box">
          <img class="home-logo" src="./assets/find.svg" alt="home">
          <h2 class="home-title">BookFinder v3</h2>
        </div>
      </router-link> 
      <router-link to="/cart">
        <div class="cart-box">
          <p class="mb-0" v-if="numberOfBooks !== 0 && !showMessage">
            <span v-if="numberOfBooks === 1">Added {{numberOfBooks}} book</span>
            <span v-if="numberOfBooks > 1">Added {{numberOfBooks}} books</span>
            worth {{totalPrice}} UAH
          </p>
          
          <img src="./assets/shopping-cart.svg" class="mr-1" alt="cart">
        </div>
      </router-link>
    </div>
    <p v-if="showMessage" class="alert alert-success mb-0 mt-5">
    Your order in the amount of {{roundPrice(totalAmountOrder)}} UAH is successful!
    </p>
    <div class="main-screen">
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { onMounted, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'App',
  setup() {
    const store = useStore();
    const emitter = require('tiny-emitter/instance');

    // creating cart data for showing
    const numberOfBooks = ref(0);
    const totalPrice = ref(0);
    const totalAmountOrder = ref(0);
    let showMessage = false;

    // getting cart data from store
    const cartData = computed(() => {
      return store.getters.cartData
    })

    // listening custom events (updating cart and making order)
    onMounted(() => {
      emitter.on("cartListUpdated", () => {
        numberOfBooks.value = 0;
        totalPrice.value = 0;
        console.log('cartData: ', cartData.value);
        numberOfBooks.value += cartData.value.orderList.length;
        totalPrice.value += roundPrice(cartData.value.totalAmount);
      });
      emitter.on("madeOrder", () => {
        totalAmountOrder.value = roundPrice(cartData.value.totalAmount);
        showMessage = true;
        setTimeout(() => {
          showMessage = false;
        }, 15000);
      });
    });

    // stop listening custom events
    onUnmounted(() => {
      emitter.off("cartListUpdated")
      emitter.off("madeOrder")
    })

    // round showing price function
    function roundPrice(num) {
      return Number(Math.round(num + 'e' + 2) + 'e-' + 2);
    }

    return {
      numberOfBooks,
      totalPrice,
      totalAmountOrder,
      showMessage,
      roundPrice
    }
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
