<template>
  <div>
    <form class="pt-4" @submit.prevent="createMoneybox">
      <div class="form-group">
        <label for="name">Moneybox name</label>
        <input type="text" id="name" class="form-control" v-model="boxName">
      </div>

      <button class="btn btn-success">Create Moneybox</button>
    </form>

    <ul class="list-group mt-3">
      <li class="list-group-item" v-for="box of moneyboxes" :key="box.id">{{ box.attributes.name }}</li>
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
      this.resource.save({}, box).then(
        response => response.json().then(this.addBoxHandler), this.errorHandler
      )
    }

    loadMoneyboxes(): void {
      this.resource.get()
        .then(response => {
          response.json().then((resp: { data: object[] }) => this.moneyboxes = resp["data"])
        }, this.errorHandler)
    }

    addBoxHandler(response: { data: object }): void {
      this.boxName = "";
      this.moneyboxes.push(response["data"]);
    }

    registerResource(): void {
      this.resource = this.$resource("api/moneyboxes");
    }

    mounted(): void {
      this.loadMoneyboxes()
    }
  }
</script>

<style scoped>

</style>
