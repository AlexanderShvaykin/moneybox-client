import Vue from 'vue';
import Vuex from 'vuex';
import CurrentUser from "@/interfaces/currentUser";

Vue.use(Vuex);

const errorsType: string[] = [];
const userType: CurrentUser | object = {};
export default new Vuex.Store({
  state: {
    token: window.sessionStorage.getItem('token'),
    current_user: userType,
    errors: errorsType
  },
  mutations: {
    setUser(state, user: CurrentUser | {}) {
      state.current_user = user
    },
    addError(state, error: string) {
      state.errors.push(error)
    },
    clearErrors(state) {
      state.errors = []
    },
    saveToken(state, token: string) {
      window.sessionStorage.setItem('token', token);
      state.token = token
    }
  }
})
