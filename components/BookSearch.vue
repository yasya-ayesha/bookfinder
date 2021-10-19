<template>
  <div>
    <b-form
      class="d-flex"
      @submit.prevent="getBooks"
    >
      <b-input
        v-model="bookName"
        class="form-control text-center"
        type="text"
        placeholder="Book title"
      />
        <b-button
          type="submit"
          class="ml-3 search-button"
        >Search</b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bookName: ""
    };
  },
  methods: {
    getBooks() {
      this.$router.push(`/search/${this.bookName}`);
    }
  }
};
</script>

<style>
.search-button {
  background: #007bff;
  border: #007bff;
}
.search-button:hover {
  background: #005abb;
  border: #005abb;
}
</style>