<template>
  <div>
    <h2>{{ name }}</h2>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import { ResourceMethods } from 'vue-resource/types/vue_resource';
  import Authorized from "@/mixins/authorized";
  import Box from "@/interfaces/moneyBox";

  @Component

  export default class MoneyBoxPage extends Mixins(Authorized) {
    private resource!: ResourceMethods;
    private boxId!: string;
    name: string = "";

    loadMoneybox(): void {
      this.resource.get({ id: this.boxId })
        .then(response => {
          response.json().then((resp: { data: Box }) => {
            this.name = resp["data"].attributes.name
          })
        }, this.errorHandler)
    }

    registerResource(): void {
      this.resource = this.$resource("api/moneyboxes{/id}");
    }

    mounted(): void {
      this.boxId = this.$router.currentRoute.params['id'];
      this.loadMoneybox();
    }
  }
</script>

<style scoped>

</style>
