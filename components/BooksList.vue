<template>
  <div>
    <p
      v-if="bookName && !books"
      class="error-title text-center"
    >Unfortunately, we couldn't find any books by your request.</p>
    <ul class="list-unstyled">
      <li
        v-for="book in books"
        :key="book.id"
        class="listItem media mb-4"
      >
        <img
          v-if="book.volumeInfo.imageLinks"
          class="d-inline shadow-lg"
          alt="Book cover"
          :src="book.volumeInfo.imageLinks.thumbnail"
        />
        <img 
          v-else
          class="d-inline shadow-lg book-img"
          src="./../assets/nocover.svg" 
          alt="no cover available">
        <div class="media-body ml-3">
          <div>
            <h5 class="mt-0 mb-3">{{book.volumeInfo.title}}</h5>
            <div>
              <ul class="list-unstyled list-group-horizontal">
                <span v-if="book.volumeInfo.authors === undefined">Author is unknown</span>
                <span v-else-if="book.volumeInfo.authors.length === 1">Author: </span>
                <span v-else>Authors: </span>
                <li
                  v-for="(author, index) in book.volumeInfo.authors"
                  :key="index"
                  class="d-inline"
                >
                  <span v-if="index === book.volumeInfo.authors.length-1">{{author}}</span>
                  <span v-else>{{author}} </span>
                </li>
              </ul>
            </div>
            <p
              v-if="book.volumeInfo.publishedDate"
            >Published: {{book.volumeInfo.publishedDate | formatDate}}</p>
            <p v-else>Date of publishing is unknown</p>
          </div>
        </div>
        <div class="d-flex flex-column align-self-center m-2 h-100">
          <p v-if="book.saleInfo.retailPrice" class="alert alert-info p-0 text-center">
            <strong>Price:</strong>
            <br />
            {{book.saleInfo.retailPrice.amount | roundPrice}} UAH
          </p>
          <b-button
            v-if="book.saleInfo.isEbook"
            type="button"
            class="btn-success p-3"
            @click="addToCart(book)"
          >Add to cart</b-button>
          <b-alert
            v-else
            show
            variant="danger"
            class="d-flex align-items-center text-center p-3 mb-0"
          >
            <span>Not in stock</span>
          </b-alert>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import roundPrice from "~/filters/roundPrice";

export default {
  filters: {
    formatDate(date) {
      return date
        .split("-")
        .reverse()
        .join(".");
    },
    roundPrice
  },
  computed: {
    books() {
      return this.$store.getters["booksData/books"];
    },
    bookName() {
      return this.$store.getters["booksData/bookName"];
    }
  },
  methods: {
    addToCart(book) {
      if (this.$store.getters["user/user"] !== null) {
        this.$store.dispatch("cart/addToCart", book);
      } else {
        this.$router.push("/signin");
      }
    }
  }
};
</script>


<style scoped>

</style>