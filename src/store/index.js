import { createStore } from 'vuex'

const emitter = require('tiny-emitter/instance');

export const store = createStore({
  state () {
    return {
      books: [], // list of fetched books 
      cart: {
        orderList: [], // list of books in cart
        totalAmount: '' // total amount of books in cart
      },      
      customer: {}, // customer data
      noResults: false, // data about fetching error
    }
  },
  mutations: {
    // pushing fetched books to state
    setBooksData(state, booksData) {
      state.books = [];
      state.books.push(...booksData.items);
      state.noResults = false;
      // console.log('books:', state.books);
    },
    // pushing chosen book to cart list, adding its amount to total amount
    addBookToCart(state, bookOrder) {
      // console.log('bookOrder.bookAmount:', bookOrder.bookAmount);
      state.cart.orderList.push(bookOrder.book);
      if (state.cart.totalAmount == '') {
        state.cart.totalAmount = bookOrder.bookAmount;
      } else {
        state.cart.totalAmount += bookOrder.bookAmount;
      }
      // console.log('state.cart:', state.cart);
    },
    // setting customer info in state
    addCustomerInfo(state, customerData) {
      state.customer = {};
      state.customer.name = customerData.name;
      state.customer.email = customerData.email;
      state.customer.phoneNumber = customerData.phoneNumber;

      // console.log('customer data: ', state.customer);
    },
    // removing all data from state
    removeCustomerData(state) {
      let customerRemoved = delete state.customer;
      if (customerRemoved) {
        state.books = [];
        state.cart.orderList = [];
        state.cart.totalAmount = '';
        state.customer = {};

        // console.log('removed customer data')
      }
    },
    // if fetching books was unsuccessful
    eventNoResults(state) {
      state.noResults = true;
    },
  },
  actions: {
    // activates on 'Search' button in Home
    getBooksData({ commit }, booksName) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${booksName}`)
      .then(response => {
        return response.json()})
      .then(json => commit("setBooksData", json)) // adding fetched books to store by mutation
      .catch(() => {
        commit("eventNoResults") // if some error in fetching
      })
    },
    // activates on "Add to cart' button in Books
    addBookToCart({ commit }, bookOrder) {
      commit('addBookToCart', bookOrder); // adding book to cart in store by mutation
      emitter.emit('cartListUpdated', bookOrder); // updating data in showing cart info in App
    },
    // activates after submitting validated form in Checkout
    makeOrder({ commit }, customerData) {
      commit('addCustomerInfo', customerData); // setting customer data in store by mutation
      emitter.emit('madeOrder'); // triggering madeOrder event in App
      commit('removeCustomerData'); // clearing data in store
      emitter.emit('cartListUpdated'); // clearing data in showing cart info in App
    },
  },
  getters: {
    // calling from Books
    booksData: state => {
      return state.books;
    },
    // calling from App, Cart
    cartData: state => {
      return state.cart;
    },
    // calling from Books
    ifNoResults: state => {
      return state.noResults;
    }
  }
})
