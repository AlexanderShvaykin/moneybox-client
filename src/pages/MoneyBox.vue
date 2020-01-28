<template>
  <div v-if="loaded">
    <button class="btn btn-light" @click="$router.go(-1)">{{ $t('app.back') }}</button>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <h5 class="mt-1 text-center card-header">{{ box.attributes.name }}</h5>
      </div>
      <div class="col-1"></div>
    </div>
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
    box!: Box;
    loaded: Boolean = false;

    loadMoneybox(): void {
      this.resource.get({ id: this.boxId })
        .then(response => {
          response.json().then((resp: { data: Box }) => {
            this.box = resp.data;
            this.loaded = true
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
