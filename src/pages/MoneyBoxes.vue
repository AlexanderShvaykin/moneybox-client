<template>
  <div>
    <div class="form-group pt-3">
      <label for="name">Moneybox name</label>
      <input type="text" id="name" class="form-control" v-model="boxName">
    </div>

    <button class="btn btn-success" @click="createMoneybox">Create Moneybox</button>
    <button class="btn btn-info ml-1" @click="loadMoneyboxes">Load Moneybox</button>

    <ul class="list-group mt-3">
      <li class="list-group-item" v-for="box of moneyboxes" :key="box.id">{{ box.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import { ResourceMethods } from 'vue-resource/types/vue_resource';
  import Authorized from "@/mixins/authorized";

  @Component

  export default class MoneyBoxesPage extends Mixins(Authorized) {
      moneyboxes: object[] = [];
      private boxName: string = '';
      private resource!: ResourceMethods;
      createMoneybox(): void {
        const box = { name: this.boxName };
        this.resource.save({}, box).then(null, response => {
          response.json().then((errorMsg: object) => console.error(errorMsg))
        })
      }
      loadMoneyboxes(): void {
        this.resource.get()
          .then(response => {
            response.json().then((resp: object[]) => this.moneyboxes = resp)
          }, response => {
            response.json().then((errorMsg: object) => console.error(errorMsg))
          })
      }
      registerResource(): void {
        this.resource = this.$resource("api/moneyboxes");
      }
    }
</script>

<style scoped>

</style>
