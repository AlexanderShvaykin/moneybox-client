<template>
  <div is="Nav">
    <div class="row">
      <div class="col-6">
        <table
            is="Table"
            class="mt-3"
        >
          <tbody v-if="planedExpenses.length > 0">
          <tr
              is="TableRow"
              v-for="(expense) in planedExpenses"
              :key="expense.id"
              :columns="[{value: expense.attributes.name}, {value: expense.attributes.amount}]"
          >
          </tr>
          </tbody>
        </table>
        <button class="btn btn-primary mt-3 float-right" @click="toggleForm()">
          <Icon name="plus"></Icon>
        </button>
      </div>
    </div>
    <ModalForm
        v-if="displayForm"
        v-on:closeForm="displayForm = false"
        :haveCloseForm="true"
        title="Add expense"
        v-on:onSubmit="createExpense()"
    >

      <label for="expName">Имя</label>
      <input type="text" v-model="expName" id="expName" class="form-control">
      <label for="expAmount">Сумма</label>
      <input type="number" v-model="expAmount" id="expAmount" class="form-control">
    </ModalForm>
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
  import Icon from "@/components/Icon.vue";
  import ModalForm from "@/components/ModalForm.vue";

  @Component({
    components: {
      Nav,
      Table,
      TableRow,
      Icon,
      ModalForm
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
    expName: string = "";
    expAmount: number = 0;
    displayForm: boolean = false;

    createExpense(): void {
      const params = { name: this.expName, amount: this.expAmount };

      // @ts-ignore
      this.goalResource.createExpense({id: this.goal.id}, params).then((response: Response) => {
        response.json().then((body: { data: Expense }) => {
          this.planedExpenses.push(body.data);
          this.toggleForm(false)
        })
      }, this.errorHandler)
    }

    toggleForm(flag: boolean = true): void {
      this.displayForm = flag
    }

    loadData(): void {
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

<style scoped>
</style>
