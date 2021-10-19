export const state = () => {
  return {
    books: [],
    bookName: ""
  };
};

export const getters = {
  books: state => state.books,
  bookName: state => state.bookName
};

export const mutations = {
  setBooks(state, books) {
    state.books = books.items;
  },
  setBookName(state, bookName) {
    state.bookName = bookName;
  },
  listLoaded(state) {
    state.isListLoaded = true;
  }
};

export const actions = {
  async getBooks({ commit, state }, bookName) {
    if (bookName !== state.bookName) {
      if (bookName !== undefined) {
        commit("setBookName", bookName);
      }
      const { data } = await this.$axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${state.bookName}`
      );
      commit("setBooks", data);
    }
  },

  setBookName({ commit }, bookName) {
    commit("setBookName", bookName);
  }
};