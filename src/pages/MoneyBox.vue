<template>
  <div v-if="loaded">
    <button class="btn btn-light" @click="$router.go(-1)">{{ $t('app.back') }}</button>
    <button class="btn btn-light ml-1" @click="toggleForm()">Add</button>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <h5 class="mt-1 text-center card-header">{{ box.attributes.name }}</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">month</th>
              <th scope="col">payment_amount</th>
              <th scope="col">income_amount</th>
              <th scope="col">started_at</th>
              <th scope="col">finished_at</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="goal of goals" :key="goal.id">
              <th scope="row">{{ goal.attributes.monthNumber }}</th>
              <td>{{ goal.attributes.paymentAmount }}</td>
              <td>{{ goal.attributes.incomeAmount }}</td>
              <td>{{ goal.attributes.startedAt }}</td>
              <td>{{ goal.attributes.finishedAt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-1"></div>
    </div>
    <ModalForm v-if="displayForm" v-on:closeForm="displayForm = false" :haveCloseForm="true"/>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import { ResourceMethods } from 'vue-resource/types/vue_resource';
  import Authorized from "@/mixins/authorized";
  import Box from "@/interfaces/moneyBox";
  import FinanceGoal from "@/interfaces/financeGoal";
  import MonthPicker from "@/components/MonthPicker.vue";
  import ModalForm from "@/components/ModalForm.vue";

  @Component({
    components: {
      MonthPicker,
      ModalForm
    }
  })

  export default class MoneyBoxPage extends Mixins(Authorized) {
    private resource!: ResourceMethods;
    private boxId!: string;
    box!: Box;
    goals!: FinanceGoal[];
    loaded: Boolean = false;
    displayForm: Boolean = false;
    // startedAt: number = Date.now();
    // finishedAt: number = Date.now();

    loadMoneybox(): void {
      this.resource.get({ id: this.boxId })
        .then(response => {
          response.json().then((resp: { data: Box }) => {
            this.box = resp.data;
            this.loadGoals(this.box.relationships.financeGoals.links.related)
          })
        }, this.errorHandler)
    }

    loadGoals(url: string): void {
      // TODO: need get full url or get correct path
      this.$http.get(url.slice(1))
        .then(response => {
          response.json().then((resp: { data: FinanceGoal[] }) => {
            this.goals = resp.data;
            this.loaded = true
          })
        }, this.errorHandler)
    }

    toggleForm(flag: boolean = true): void {
      this.displayForm = flag
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
