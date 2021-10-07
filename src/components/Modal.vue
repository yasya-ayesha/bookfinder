<template>
    <div>
        <div class="h-100">
            <b-button 
                v-if="book.saleInfo.isEbook === true" 
                v-b-modal="'modal-prevent-closing'+bookIndex"
                class="btn btn-success order-btn"
            >Order</b-button>
            <p 
                v-else-if="book.saleInfo.isEbook === false" 
                class="d-flex align-items-center alert alert-danger mb-0">
                    <span>Not in stock</span>
            </p>
        </div>

        <b-modal
            :id="'modal-prevent-closing'+bookIndex"
            ref="modal"
            :title="book.volumeInfo.title"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <template #modal-header="{ close }">
                <h5>Modal Header</h5>
                <b-button size="sm" class="close" @click="close()">
                    X
                </b-button>
            </template>
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
                <p v-else>Book is not for sale</p>
            </div>
            <p>{{book.volumeInfo.description}}</p>
            <form ref="form" @submit.stop.prevent="sendToCart()">
                <b-form-group
                    label="Name:"
                    label-for="name-input"
                >
                    <b-form-input
                        id="name-input"
                        v-model.trim="inputData.name"
                        :class="{'is-invalid': $v.inputData.name.$error, 'is-valid': !$v.inputData.name.$invalid}"
                        required
                    >
                    </b-form-input>
                    <div 
                        v-if="!$v.inputData.name.required" 
                        class="invalid-feedback">
                            Filling of this field is required
                    </div>
                    <div 
                        v-if="!$v.inputData.name.minLength" 
                        class="invalid-feedback">
                            Name should be at least 2 symbols long
                    </div>
                </b-form-group>
                <b-form-group
                    label="Email:"
                    label-for="email-input"
                >
                    <b-form-input
                        id="email-input"
                        v-model="inputData.email"
                        :class="{'is-invalid': $v.inputData.email.$error, 'is-valid': !$v.inputData.email.$invalid}"
                        required
                    ></b-form-input>
                    <div 
                        v-if="!$v.inputData.email.required"     
                        class="invalid-feedback">
                            Filling of this field is required
                    </div>
                    <div 
                        v-if="!$v.inputData.email.email" 
                        class="invalid-feedback">
                            This email isn't valid
                    </div>
                </b-form-group>
                <b-form-group
                    label="Phone number:"
                    label-for="phone-input"
                >
                    <the-mask
                        class="form-control"
                        type="tel"
                        id="phone-input"
                        v-model="inputData.phoneNumber"
                        :masked="true"
                        :mask="['+380#########']"
                        :class="{'is-invalid': $v.inputData.phoneNumber.$error, 'is-valid': !$v.inputData.phoneNumber.$invalid}"
                    />
                    <div 
                        v-if="!$v.inputData.phoneNumber.required" 
                        class="invalid-feedback">
                            Filling of this field is required
                    </div>
                    <div 
                        v-else-if="!$v.inputData.phoneNumber.minLength || !$v.inputData.phoneNumber.maxLength" 
                        class="invalid-feedback">
                            This phone number isn't valid
                    </div>
                </b-form-group>
            </form>
            <template #modal-footer="{ ok }">
                <b-button size="lg" variant="success" :class="['btn', 'btn-primary', {'disabled': !$v.inputData.name.required || !$v.inputData.email.required || !$v.inputData.phoneNumber.minLength}]" @click="ok()">
                Send
                </b-button>
            </template>
        </b-modal>
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
        name: 'Modal',
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
            resetModal() {
                this.inputData.name = '',
                this.inputData.email = '',
                this.inputData.phoneNumber = '+380'
            },
            handleOk(bvModalEvt) {
                // Prevent modal from closing
                bvModalEvt.preventDefault()
                // Trigger submit handler
                this.sendToCart()
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
                    this.$nextTick(() => {
                        this.$bvModal.hide('modal-prevent-closing'+this.bookIndex)
                    })
                } 
            }
        }
    }
</script>

<style scoped>
.close {
    border-radius: 5px;
    border-color: #a39f9f;
    background-color: #ffffff;
    color:#757070;
    padding: 5px 10px;
}
.close:hover {
    background-color: #757070;
    color: #ffffff;
}
</style>