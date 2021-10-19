<template>
  <div>
    <div v-if="cart.length === 0"  class="d-flex flex-column justify-content-center">
      <p
      v-if="cart.length === 0"
      class="attention text-center"
    >Cart is empty</p>
    <img v-if="cart.length === 0" src="./../assets/empty-cart.svg" alt="empty cart image" class="empty-cart">
    </div>
    <ul class="list-unstyled">
      <li
        v-for="(book, index) in cart"
        :key="index"
        class="listItem media mb-5"
      >
        <div class="media-body">
          <img
            v-if="book.volumeInfo.imageLinks"
            class="d-inline float-left shadow-lg mr-3"
            alt="Book cover"
            :src="book.volumeInfo.imageLinks.thumbnail"
          />
          <img 
          v-else
          class="d-inline float-left shadow-lg mr-3"
          src="./../assets/nocover.svg" 
          alt="no cover available">
          <h5 class="mt-0 mb-2">{{book.volumeInfo.title}}</h5>
          <p class="mb-0">{{book.volumeInfo.description}}</p>
        </div>
        <div>
          <p class="alert alert-warning ml-3">
            <strong>Price:</strong>
            <br />
            {{book.saleInfo.retailPrice.amount | roundPrice}} UAH
          </p>
          <!-- after fix add this deleting button
            <b-button class="ml-3" @click="removeFromCart(book.saleInfo.retailPrice.amount, index)">
           X
          </b-button> -->
        </div>
      </li>
    </ul>
    <b-button
      v-if="cart.length !== 0"
      class="mx-auto d-block mb-5 px-5 py-3 btn-success"
      @click="buy"
    >Order</b-button>
  </div>
</template>

<script>
import roundPrice from "../filters/roundPrice";
export default {
  filters: {
    roundPrice
  },
  computed: {
    cart() {
      return this.$store.getters["cart/cart"];
    }
  },
  methods: {
    buy() {
      this.$router.push("/checkout");
    },
    // need to fix deleting books from cart method
    // removeFromCart(price, index) {
    //   this.$store.dispatch("cart/removeFromCart", price, index);
    // }
  }
};
</script>

<style scoped>
.attention {
  padding-top: 40px;
  font-size: 26px;
}
.empty-cart {
  width: 300px;
  margin: auto
}
</style>