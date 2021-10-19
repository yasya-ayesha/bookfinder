import roundPrice from '../filters/roundPrice';

export const state = () => {
  return {
    cart: [],
    totalPrice: 0,
    isPurchaseСompleted: false,
  };
};

export const mutations = {
  addToCart(state, book) {
    state.cart.push(book);
    state.totalPrice += roundPrice(book.saleInfo.retailPrice.amount);
  },
  // need to fiz deleting from cart mutation
  // removeFromCart(state, price, index) {
  //   state.totalPrice -= roundPrice(price);
  //   state.cart.splice(index, 1);
  // },
  checkoutTrigger(state, isPurchaseСompleted) {
    state.isPurchaseСompleted = isPurchaseСompleted;
  },
  clearCart(state) {
    state.cart = [];
    state.totalPrice = 0;
  }
};

export const actions = {
  addToCart({ commit }, book) {
    commit("addToCart", book);
  },
  // need to fix deleting from cart action
  // removeFromCart({ commit }, price, index) {
  //   commit("removeFromCart", price, index);
  // },
  checkout({ commit }) {
    commit("checkoutTrigger", true);

    setTimeout(() => {
      commit("clearCart");
      commit("checkoutTrigger", false);
    }, 5000)
  },
  clearCart({ commit }) {
    commit("clearCart");
  }
};

export const getters = {
  cart: state => state.cart,
  cartBooksCount: state => state.cart.length,
  cartTotalPrice: state => state.totalPrice,
  isPurchaseСompleted: state => state.isPurchaseСompleted
};