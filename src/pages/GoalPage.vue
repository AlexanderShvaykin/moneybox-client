<template>
  <div is="Nav">
    <div class="row">
      <div class="col-7">
        <table
            is="Table"
            class="mt-3"
        >
          <tbody v-if="planedExpenses.length > 0">
          <tr
              is="TableRow"
              v-for="(expense, index) in planedExpenses"
              :key="expense.id"
              :columns="[{value: expense.attributes.name, editable: true, key: 'name'}, {value: expense.attributes.amount, editable: true, key: 'amount', style: 'width: 100px'}]"
              @changeRow="updateExpense($event, expense)"
              @remove="removeExpense(expense.id, index)"
          >
            <div slot="actions"></div>
          </tr>
          </tbody>
        </table>
        <button class="btn btn-primary mt-3 float-right" @click="toggleForm()">
          <Icon name="plus"></Icon>
        </button>
      </div>
      <div class="col-5" v-if="financeGoal()">
        <table
            is="Table"
            class="mt-3"
        >
          <tbody v-if="planedExpenses.length > 0">
          <tr
              is="TableRow"
              :columns="[{value: $i18n.t('goal.paymentAmount')}, {value: goal.attributes.paymentAmount}]"
              :remove_btn="false"
              :action_btn="false"
          >
          </tr>
          <tr
              is="TableRow"
              :columns="[{value: $i18n.t('goal.incomeAmount')}, {value: goal.attributes.incomeAmount, editable: true, key: 'incomeAmount', style: 'width: 100px'}]"
              :remove_btn="false"
              :action_btn="false"
              @changeRow="updateGoal($event)"
          >
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ModalForm
        v-if="displayForm"
        v-on:closeForm="displayForm = false"
        :haveCloseForm="true"
        title="Add expense"
        v-on:onSubmit="createExpense()"
    >

      <label for="expName">{{$i18n.t('app.title')}}</label>
      <input type="text" v-model="expName" id="expName" class="form-control">
      <label for="expAmount">{{$i18n.t('app.sum')}}</label>
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
        planedExpenses: [],
        goal: undefined
      }
    }
  })

  export default class GoalPage extends Mixins(Authorized, Resources) {
    goal!: FinanceGoal;
    planedExpenses!: Expense[];
    expName: string = "";
    expAmount: number = 0;
    displayForm: boolean = false;

    updateGoal(changes: {key: string, value: string}) {
      const goal = this.goal;
      this.$set(goal.attributes, changes.key, changes.value);
      this.goalResource.update(
        {id: goal.id}, goal.attributes
      ).then(() => { }, this.errorHandler)
    }

    removeExpense(id: number, index: number) {
      this.expenseRwsource.delete({id: id}).then(() => {
        this.planedExpenses.splice(index, 1);
        this.loadGoal()
      })
    }

    updateExpense(changes: {key: string, value: string}, expense: Expense): void {
      this.$set(expense.attributes, changes.key, changes.value);
      this.expenseRwsource.update(
        {id: expense.id}, expense.attributes
      ).then(() => { this.loadGoal() }, this.errorHandler)
    }

    financeGoal(): FinanceGoal | undefined {
      return this.goal
    }

    createExpense(): void {
      const params = { name: this.expName, amount: this.expAmount };

      // @ts-ignore
      this.goalResource.createExpense({id: this.goal.id}, params).then((response: Response) => {
        response.json().then((body: { data: Expense }) => {
          this.planedExpenses.push(body.data);
          this.loadGoal();
          this.expName = "";
          this.expAmount = 0;
          this.toggleForm(false)
        })
      }, this.errorHandler)
    }

    toggleForm(flag: boolean = true): void {
      this.displayForm = flag
    }

    loadGoal(): void {
      this.goalResource.get({id: this.$router.currentRoute.params['id']})
        .then((response) => {
          response.json().then((body: { data: FinanceGoal }) => {
            this.goal = body.data;
          })
        }, this.errorHandler)
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
