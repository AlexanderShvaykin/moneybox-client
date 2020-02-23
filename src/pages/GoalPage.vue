<template>
  <div is="Nav">
    <div class="row">
      <div class="col-2">

      </div>
    </div>
    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, iusto?</div>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import Authorized from "@/mixins/authorized";
  import Nav from "@/components/Nav.vue";
  import Table from "@/components/Table.vue";
  import TableRow from "@/components/TableRow.vue";
  import Expense from "@/interfaces/expense";
  import Resources from "@/resouces";
  import FinanceGoal from "@/interfaces/financeGoal";

  @Component({
    components: {
      Nav,
      Table,
      TableRow
    },
    data() {
      return {
        planedExpenses: []
      }
    }
  })

  export default class GoalPage extends Mixins(Authorized, Resources) {
    goal!: FinanceGoal;
    planedExpenses!: Expense[];

    loadData(): void {
      console.log("loadData");
      this.goalResource.get({id: this.$router.currentRoute.params['id']})
        .then((response) => {
        response.json().then((body: { data: FinanceGoal }) => {
          this.goal = body.data;
          this.loadExpenses()
        })
      }, this.errorHandler)
    }

    loadExpenses(): void {
      this.$http.get(this.goal.relationships.planedExpenses.links.related).then(response => {
        response.json().then((body: {data: Expense[]}) => {
          this.planedExpenses = body.data
        })
      })
    }

    // noinspection JSUnusedGlobalSymbols
    mounted() {
      this.loadData()
    }
  }
</script>

<style>

</style>
