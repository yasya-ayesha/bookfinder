<template>
  <div>
    <header>
      <nav></nav>
    </header>
    <main>
      <section>
        <books-list></books-list>
      </section>
    </main>
  </div>
</template>

<script>
import BooksList from "./../components/BooksList";
export default {
  components: {
    BooksList
  },
};
</script>

<style>
</style>
