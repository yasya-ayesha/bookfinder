import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../services/firebase";

export const state = () => {
  return {
    user: null,
    isNewUserRegistered: false,
  };
};

export const mutations = {
  setUser(state, account) {
    state.user = account;
  },
  removeUser(state) {
    state.user = null;
  },
  newUserRegistered(state, hideMessage=false) {
    if (hideMessage) {
      state.isNewUserRegistered = false;
    } else {
      state.isNewUserRegistered = true;
    }
  }
};

export const actions = {
  async signIn({ commit }, account) {
    await signInWithEmailAndPassword(auth, account.email, account.password)
    .then((state, account) => {
      // Signed in 
      state.user = account;
      const { email, uid } = auth.currentUser;
      commit("setUser", { email, uid });
    })
    // .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
    // });
  },
  async signUp ({commit}, account) {
    await createUserWithEmailAndPassword(auth, account.email, account.password)
    .then((state, account) => {
      // Signed in 
      state.user = account;
      commit("newUserRegistered");
    })
    // .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // ..
    // });
  },

  newUserRegistered ({commit}, hideMessage) {
    commit("newUserRegistered", hideMessage);
  },

  async logout({ commit }) {
    await auth.signOut();
    commit("removeUser");
  }
};

export const getters = {
  user: state => state.user,
  isNewUserRegistered: state => state.isNewUserRegistered
};