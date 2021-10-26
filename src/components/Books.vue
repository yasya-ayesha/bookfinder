<template>
  <div>
    <div v-if="noResults && books.length === 0">
      <p class="error-title text-center" >
        Sorry, we couldn't find any books by your request :(
      </p>
      <img src="./../assets/notfound.svg" alt="books not found">
    </div>
    <ul class="list-unstyled mt-5">
      <li
        class="list-item media mb-5 d-flex"
        v-for="(book) in books"
        :key="book.id"
      >
        <div class="d-flex">
          <img v-if="book.volumeInfo.imageLinks"
            class="d-inline shadow-lg book-img"
            alt="book cover"
            :src="book.volumeInfo.imageLinks.smallThumbnail"
          />
          <img 
            v-else
            class="d-inline shadow-lg book-img"
            src="./../assets/nocover.svg" 
            alt="no cover available"
          />
          <div class="media-body ml-3 book-info">
            <div class="book-info">
              <h5 class="mt-0 mb-2">
                {{book.volumeInfo.title}}
              </h5>
              <div class="mb-2">
                <ul class="list-unstyled list-group-horizontal">
                  <span v-if="book.volumeInfo.authors === undefined">
                    Author is unknown
                  </span>
                  <span v-else-if="book.volumeInfo.authors.length === 1">
                    Author: 
                  </span>
                  <span v-else>Authors: </span>
                  <li
                    class="d-inline"
                    v-for="(author, index) in book.volumeInfo.authors"
                    :key="index"
                  >
                    <span v-if="index === book.volumeInfo.authors.length-1">{{author}}</span>
                    <span v-else>{{author}}, </span>
                  </li>
                </ul>
              </div>
              <p v-if="book.volumeInfo.publishedDate">
                Published: {{formatDate(book.volumeInfo.publishedDate)}}
              </p>
              <p v-else>
                Date of publishing is unknown
              </p>
            </div>
          </div>
        </div>
        <div class="h-100">
          <b-button 
          v-if="book.saleInfo.isEbook === true" 
          @click="sendToCart(book)"
          class="btn btn-success order-btn p-2"
          >
            Add to cart
          </b-button>
          <p 
          v-else-if="book.saleInfo.isEbook === false" 
          class="d-flex align-items-center alert alert-danger mb-0 p-2"
          >
            <span>Not in stock</span>
          </p>
        </div>
      </li> 
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Books',
  props: ["bookIndex"],
  setup(props) {
    const store = useStore();

    // no results event
    const noResults = computed(() => {
      return store.getters.ifNoResults;
    })
    // getting store books
    const books = computed(() => {
      return store.getters.booksData;
    })
    const book = computed(() => {
      return store.getters.booksData[props.bookIndex];
    })

    // adding selected book to cart
    function sendToCart(book) {
      // console.log('book: ', book);
      let bookOrder = {
        book,
        bookAmount: book.saleInfo.retailPrice.amount
      };
      // console.log('bookOrder: ', bookOrder);
      store.dispatch('addBookToCart', bookOrder);
    }
    
    // reverse date function
    function formatDate(date) {
      return date
        .split("-")
        .reverse()
        .join(".");
    }

    return {
      noResults,
      books,
      book,
      formatDate,
      sendToCart
    }
  },
}
</script>

<style scoped>
.book-img {
  margin-right: 30px;
  width: 128px;
}
.book-info {
  display: flex;
  flex-direction: column;
  text-align: start;
}
.list-item {
  justify-content: space-between;
}
.error-title {
  font-size: 1.5rem;
}
</style>