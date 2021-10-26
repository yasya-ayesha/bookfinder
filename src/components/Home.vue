<template>
  <div class="search">
    <form class="search-form row g-3" @submit.prevent="getBooksData">
      <div class="col-6">
        <input type="text" class="form-control" id="searchField" placeholder="Type a keyword" ref="booksName">
      </div>
      <div class="col-2">
        <button type="submit" class="submit btn btn-primary mb-3">Search</button>
      </div>
    </form>
    <Books />
  </div>
</template>

<script>
import Books from '@/components/Books.vue';
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
export default {
  name: 'Home',
  components: {
    Books
  },
  setup() {
    const store = useStore();

    // search input value
    const booksName = ref(null);

    // sending input value to fetch books
    function getBooksData() {
      console.log(booksName.value.value);
      store.dispatch('getBooksData', booksName.value.value)
    }

    return {
      booksName,
      getBooksData
    }
  }
}
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