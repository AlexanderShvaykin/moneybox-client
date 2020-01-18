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
  getters: {
    uniqErrors(state) {
      return state.errors.filter((value: any, index: any) => {
        return state.errors.indexOf(value) === index;
      })
    }
  },
  mutations: {
    setUser(state, user: CurrentUser | {}) {
      state.current_user = user
    },
    addError(state, error: string) {
      state.errors.push(error)
    },
    addErrors(state, errors: string[]) {
      state.errors = state.errors.concat(errors)
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
