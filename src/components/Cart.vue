<template>
    <div>
        <h4 class="error-title text-center mb-4 mt-5" >
            This is your cart
        </h4>
        <ul class="list-unstyled">
            <li class="listItem media d-flex flex-column mb-4" v-for="(orderData, customer) in cartData" :key="customer">
                <div class="d-flex flex-column justify-content-center align-items-center p-0 pb-2">
                    <p class="mb-0 font-weight-bold alert alert-secondary">Current order for: <strong>{{customer}}</strong> </p>
                    <ul class="list-unstyled">
                        <li v-for="(book, index) in orderData.cart" :key="index" class="d-flex justify-content-between listItem-cart listItem-cart--border-bottom d-flex align-items-center py-2 mt-3 mb-3" :class="{'listItem-cart--border-top': index === 0}">
                            <div class="media-body d-flex">
                                <div class="d-flex align-items-center">
                                    <img :src="book.volumeInfo.imageLinks.smallThumbnail" class="d-inline float-left shadow-lg mr-3 align-self-center book-img" alt="book cover" />
                                </div>
                                <div>
                                    <h5 class="mt-0 mb-2">{{book.volumeInfo.title}}</h5>
                                    <p class="mb-0 text-left flex-grow-1">{{book.volumeInfo.description}}</p>
                                </div>
                            </div>
                            <p class="alert alert-primary ml-2">
                                Price:<br /> <strong>{{book.saleInfo.retailPrice.amount}}</strong> UAH
                            </p>
                        </li>
                    </ul>
                    <p class="alert alert-success mb-3 text-right font-weight-bold">
                        Total: <strong>{{totalAmount(customer) | roundPrice}}</strong> UAH
                    </p>
                    <button class="btn btn-primary px-5" type="button" @click="makeOrder(customer)">
                        Send order
                    </button>
                </div>
            </li>
        </ul>
        <img src="./../assets/empty-cart.svg" alt="cart">
    </div>
</template>

<script>
import roundPrice from "./roundPrice";
export default {
    name: 'Cart',
    methods: {
        makeOrder(customer) {
            this.$store.dispatch("makeOrder", customer);
            this.$router.push("/");
        },
        totalAmount(customer) {
            if(this.cartData[customer].totalAmount !== undefined) {
                return this.cartData[customer].totalAmount;
            }
        },
    },
    computed: {
        cartData() {
            return this.$store.getters.customersOrders;
        }
    },
    filters: {
        roundPrice
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