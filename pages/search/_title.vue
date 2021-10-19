<template>
  <div>
    <books-list></books-list>
  </div>
</template>

<script>
import BooksList from "./../../components/BooksList.vue";
export default {
  components: {
    BooksList,
  },
  async fetch({ store, route }) {
    if(store.getters['booksData/bookName'] !== route.params.title) {
      await store.dispatch("booksData/getBooks", route.params.title);
    }
  }
};
</script>

<style scoped>
</style>