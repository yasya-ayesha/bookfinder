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
                v-for="(book, bookIndex) in books"
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
                        alt="no cover available">
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
                                Published: {{book.volumeInfo.publishedDate | formatDate}}
                            </p>
                            <p v-else>
                                Date of publishing is unknown
                            </p>
                        </div>
                    </div>
                </div>
                <ToCart :bookIndex="bookIndex" />
            </li> 
        </ul>
    </div>
</template>

<script>
import { eventEmitter } from "./../main";
import ToCart from './ToCart.vue';

export default {
    name: 'Books',
    props: ["bookIndex"],
    components: {
        ToCart
    },
    data() {
        return {
            noResults: false
        }
    },
    computed: {
        books() {
            return this.$store.getters.booksData;
        }
    },
    filters: {
        formatDate: function(date) {
            return date
                .split("-")
                .reverse()
                .join(".");
        }
    },
    created() {
        eventEmitter.$on("noResults", () => {
            this.noResults = true;
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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