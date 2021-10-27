<template>
  <div>
    <div v-if="cartData.orderList.length !== 0">
      <ul class="list-unstyled mt-5">
        <li v-for="(book, index) in cartData.orderList" :key="index" class="d-flex justify-content-between listItem-cart listItem-cart--border-bottom d-flex align-items-center py-2 mt-4 mb-4" :class="{'listItem-cart--border-top': index === 0}">
          <div class="media-body d-flex">
            <div class="d-flex align-items-center justify-content-center flex-column">
              <img :src="book.volumeInfo.imageLinks.smallThumbnail" class="d-inline float-left shadow-lg mr-3 align-self-center book-img" alt="book cover" />
              <p class="alert alert-primary p-1 mr-3 mt-3">
                Price:<br /> <strong>{{book.saleInfo.retailPrice.amount}}</strong> UAH
              </p>
            </div>
            <div>
              <h5 class="text-left mt-0 mb-2 font-weight-bold">{{book.volumeInfo.title}}</h5>
              <p class="mb-0 text-left flex-grow-1">{{book.volumeInfo.description}}</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="">
        <p class="alert alert-success mb-3 font-weight-bold col-3 mx-auto">
          Total: <strong>{{totalAmount().toFixed(2)}}</strong> UAH
        </p>
        <button class="btn btn-primary px-5" type="button" @click="makeOrder()">
          Send order
        </button>
      </div>
    </div>
    <div v-else>
      <h4 class="error-title text-center mb-4 mt-5" >
        Your cart is empty
      </h4>
      <p>Try to search some books <router-link to="/"><strong>HERE</strong></router-link></p>
      <img src="./../assets/empty-cart.svg" alt="empty cart image">
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'Cart',
  setup() {
    const store = useStore();
    const router = useRouter();

    // getting cart data from store
    const cartData = computed(() => {
      return store.getters.cartData
    })

    // redirecting to checkout page to fill forms
    function makeOrder() {
      router.push('/checkout')
    }

    // total amount rounded for showing
    function totalAmount() {
      if(cartData.value.totalAmount !== undefined) {
        return roundPrice(cartData.value.totalAmount)
      }
    }

    // function of rounding price
    function roundPrice(num) {
      return Number(Math.round(num + 'e' + 2) + 'e-' + 2);
    }

    return {
      makeOrder,
      totalAmount,
      cartData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-left {
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
}
</style>