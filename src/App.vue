<template>
  <div class="container">
    <div v-if="currentUser()">
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <button class="btn"  @click="logout">{{$t('app.logout')}}</button>
        </li>
      </ul>
    </div>
    <div class="alert alert-danger mt-1" v-if="errors()">
      <ul>
        <li v-for="error in errors()" :key="error">{{error}}</li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import WithCurrentUser from "@/mixins/currentUser";


  @Component
  export default class App extends Mixins(WithCurrentUser) {
    errors(): object[] | null {
      const errs = this.$store.getters.uniqErrors;
      if (errs.length == 0) {
        return null
      } else {
        setTimeout(() => {
          this.$store.commit('clearErrors');
        }, 3000);
        return errs
      }
    }
    logout(): void {
      this.$store.commit('setUser', {});
      this.$store.commit('saveToken', "");
      this.$router.push("/login")
    }
  }
</script>

<style>
  @import '~bootstrap/dist/css/bootstrap.css';
</style>
