<template>
    <div>
        <div class="h-100">
            <button v-if="book.saleInfo.isEbook === true"
                class="btn btn-success order-btn"
                type="button"
                data-toggle="modal"
                :data-target="'#to-cart'+bookIndex"
            >Order</button>
            <p v-else-if="book.saleInfo.isEbook === false" class="d-flex align-items-center alert alert-danger mb-0">
                <span>Not in stock</span>
            </p>
            <p v-else>
                test
            </p>
        </div>

        <div class="modal fade" ref="toCartModal" :id="'to-cart'+bookIndex">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">{{book.volumeInfo.title}}</h5>
                        <button type="button" class="close btn-outline-secondary" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">x</span>
                        </button>
                    </div>
                    <div class="modal-body d-flex flex-column">
                        <div class="d-flex justify-content-around align-items-center mb-3">
                            <img v-if="book.volumeInfo.imageLinks"
                                class="mr-3"
                                alt="book cover"
                                :src="book.volumeInfo.imageLinks.smallThumbnail"
                            />
                            <img v-else
                                class="mr-3"
                                alt="book cover"
                                src="./../assets/nocover.svg"
                            />
                            <p class="alert alert-warning" v-if="book.saleInfo.retailPrice">Book price:<br>
                                <span>
                                    <strong>{{book.saleInfo.retailPrice.amount}}</strong> {{book.saleInfo.retailPrice.currencyCode}}
                                </span>
                            </p>
                            <p  v-else>Book is not for sale</p>
                        </div>
                        <p>{{book.volumeInfo.description}}</p>
                        <form @submit.prevent="submit">
                            <div class="form-group">
                                <label class="col-form-label" for="name">Name:</label>
                                <input class="form-control" type="text" v-model.trim="inputData.name" id="name" :class="{'is-invalid': $v.inputData.name.$error, 'is-valid': !$v.inputData.name.$invalid}"/>
                                <div v-if="!$v.inputData.name.required" class="invalid-feedback">Filling of this field is required</div>
                                <div v-if="!$v.inputData.name.minLength" class="invalid-feedback">Name should be at least 2 symbols long</div>
                            </div>
                            <div class="form-group">
                                <label class="col-form-label" for="email">Email:</label>
                                <input class="form-control" type="email" v-model="inputData.email" id="email" :class="{'is-invalid': $v.inputData.email.$error, 'is-valid': !$v.inputData.email.$invalid}"/>
                                <div v-if="!$v.inputData.email.required" class="invalid-feedback">Filling of this field is required</div>
                                <div v-if="!$v.inputData.email.email" class="invalid-feedback">This email isn't valid</div>
                            </div>
                            <div class="form-group">
                                <label class="col-form-label" for="phone">Phone number:</label>
                                <the-mask
                                    class="form-control"
                                    type="tel"
                                    id="phone"
                                    v-model="inputData.phoneNumber"
                                    :masked="true"
                                    :mask="['+380#########']"
                                    :class="{'is-invalid': $v.inputData.phoneNumber.$error, 'is-valid': !$v.inputData.phoneNumber.$invalid}"
                                />
                                <div v-if="!$v.inputData.phoneNumber.required" class="invalid-feedback">Filling of this field is required</div>
                                <div v-else-if="!$v.inputData.phoneNumber.minLength || !$v.inputData.phoneNumber.maxLength" class="invalid-feedback">This phone number isn't valid</div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" :class="['btn', 'btn-primary', {'disabled': !$v.inputData.name.required || !$v.inputData.email.required || !$v.inputData.phoneNumber.minLength}]" @click="sendToCart" data-dismiss="modal">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {TheMask} from 'vue-the-mask'
import {
    required,
    minLength,
    maxLength,
    email
} from "vuelidate/lib/validators";

export default {
    name: 'ToCart',
    components: {TheMask},
    props: ['bookIndex'],
    data() {
        return {
            inputData: {
                name: '',
                email: '',
                phoneNumber: '+380'
            }
        }
    },
    validations: {
        inputData: {
            name: {
                minLength: minLength(2),
                required,
            },
            email: {
                email,
                required
            },
            phoneNumber: {
                minLength: minLength(13),
                maxLength: maxLength(13),
                required
            }
        }
    },
    computed: {
        book() {
            return this.$store.getters.booksData[this.bookIndex];
        }
    },
    methods: {
        validationRun(input) {
            this.$v.inputData[input].$touch();
        },
        sendToCart() {
            for (let input in this.$data.inputData) {
                this.validationRun(input);
            }
            if (!this.$v.inputData.$error) {
                let bookOrder = {
                    customerInfo: this.inputData,
                    book: this.book,
                    bookAmount: this.book.saleInfo.retailPrice.amount
                };
                this.$store.dispatch('addBookToCart', bookOrder);
            } 
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.close {
    border-radius: 5px;
    border: #eeeeee;
}
</style>