<template>
    <div class="search">
        <form class="search-form row g-3" @submit.prevent="getBooksData">
            <div class="col-6">
                <input type="text" class="form-control" id="searchField" placeholder="Type a keyword" v-model="booksName">
            </div>
            <div class="col-2">
                <button type="submit" class="submit btn btn-primary mb-3">Send</button>
            </div>
        </form>
        <Books />
    </div>
</template>

<script>
import Books from '@/components/Books.vue';
export default {
    name: 'Home',
    props: {
        
    },
    components: {
        Books
    },
    data() {
        return {
            booksName: ''
        };
    },
    methods: {
        getBooksData() {
            this.$store.dispatch('getBooksData', this.booksName);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
    width: 100%;
    margin: 40px auto;
}
.row {
    margin-top: 0;
    justify-content: center;
}
.col-2 {
    flex: 0;
}
</style>
