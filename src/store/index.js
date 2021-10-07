import Vue from 'vue';
import Vuex from 'vuex';
import { eventEmitter } from '../main';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        books: [],
        customers: {
            // customer: {
            //     customerInfo:{
            //         email,
            //         name,
            //         phoneNumber
            //     },
            //     cart: [],
            //     totalAmount: ''
            // }
        }
    },
    mutations: {
        setBooksData(state, booksData) {
            state.books = [];
            state.books.push(...booksData.items);
        },
        addBookToCart(state, bookOrder) {
            const customer = bookOrder.customerInfo.phoneNumber;
            if (!state.customers[customer]) {
                state.customers[customer] = {};
            }
            state.customers[customer].customerInfo = bookOrder.customerInfo;

            if (!state.customers[customer].cart) {
                state.customers[customer].cart = [];
            }
            state.customers[customer].cart.push(bookOrder.book);

            if (!state.customers[customer].totalAmount) {
                state.customers[customer].totalAmount = bookOrder.bookAmount;
                // console.log('bookOrder.totalAmount:', bookOrder.totalAmount);
            } else {
                state.customers[customer].totalAmount += bookOrder.bookAmount;
            }
            // console.log('state.customers:', state.customers);
        },
        removeCustomerData(state, customer) {
            let customerRemoved = delete state.customers[customer];
            if (customerRemoved) {
                state.books = [];
                // console.log('removed customer data')
            }
        }
    },
    actions: {
        getBooksData({ commit }, booksName) {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${booksName}`)
            .then(response => {
                // console.dir(response);
                return response.json()})
            .then(json => commit("setBooksData", json))
            .catch(() => {
                eventEmitter.$emit('noResults')
            })
        },
        addBookToCart({ commit }, bookOrder) {
            commit('addBookToCart', bookOrder);
            eventEmitter.$emit('cartListUpdated', bookOrder.customerInfo.customer);
        },
        makeOrder({ commit }, customer) {
            eventEmitter.$emit('madeOrder', customer);
            commit('removeCustomerData', customer);
            eventEmitter.$emit('cartListUpdated', customer);
        }
    },
    getters: {
        booksData: state => {
            return state.books;
        },
        customersOrders: state => {
            return state.customers;
        }
    }
})