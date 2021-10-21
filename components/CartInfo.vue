<template>
  <div>
    <b-link
      class="cart-info__link d-flex align-items-center"
      :to="isUserSignIn"
    >
      <p
        v-if="isPurchaseСompleted"
        class="alert alert-success mr-2 message"
      >Your order in the amount of {{cartTotalPrice | roundPrice}} UAH is successful</p>
      <div class="d-flex flex-column justify-content-end align-items-center mr-2">
        <b-badge
          v-if="!isPurchaseСompleted"
          class="badge-warning"
        >
          {{cartBooksCount}} <span v-if="cartBooksCount === 1">book</span><span v-else>books</span>
        </b-badge>
        <span
          v-if="!isPurchaseСompleted"
          class="cart-info__price"
        >{{cartTotalPrice | roundPrice}} UAH</span>
      </div>
      <img v-if="!isPurchaseСompleted" src="./../assets/shopping-cart.svg" alt="cart icon">
    </b-link>
  </div>
</template>

<script>
import roundPrice from "../filters/roundPrice";
export default {
  filters: {
    roundPrice
  },
  computed: {
    cartBooksCount() {
      return this.$store.getters["cart/cartBooksCount"];
    },
    cartTotalPrice() {
      return this.$store.getters["cart/cartTotalPrice"];
    },
    isPurchaseСompleted() {
      return this.$store.getters["cart/isPurchaseСompleted"];
    },
    isUserSignIn () {
      return this.$store.getters["user/user"] === null ? '' : '/cart'
    }
  },
};
</script>

<style scoped>
.cart-info__link {
  color: #343a40;
}
.message {
  display: block;
  max-width: vw;
}
</style>