<template>
  <div v-if="loaded">
    <button class="btn btn-light" @click="$router.go(-1)">{{ $t('app.back') }}</button>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <h5 class="mt-1 text-center card-header">{{ box.attributes.name }}</h5>
        <table is="Table" class="mt-3">
          <thead>
            <tr>
              <th scope="col">{{$t('goal.month')}}</th>
              <th scope="col">{{$t('goal.paymentAmount')}}</th>
              <th scope="col">{{$t('goal.incomeAmount')}}</th>
              <th scope="col">{{$t('goal.startedAt')}}</th>
              <th scope="col">{{$t('goal.finishedAt')}}</th>
            </tr>
          </thead>
          <tbody v-if="goals.length > 0">
            <tr
                is="TableRow"
                v-for="(goal, index) in goals"
                :key="goal.id"
                :columns="goalColumns(goal)"
                @remove="removeGoal(goal.id, index)"
                @changeRow="updateGoal($event, goal.id)"
            >
            </tr>
          </tbody>
        </table>
        <button class="btn btn-primary mt-3 float-right" @click="toggleForm()">
          <Icon name="plus"></Icon>
        </button>
      </div>
      <div class="col-1"></div>
    </div>
    <ModalForm
        v-if="displayForm"
        v-on:closeForm="displayForm = false"
        :haveCloseForm="true"
        title="Title"
        v-on:onSubmit="createGoal()"
    >
      <DateInput v-model="startedAt" cssClass="form-control" elId="startedAt" label="started At"/>
      <DateInput v-model="finishedAt" cssClass="form-control" elId="finishedAt" label="finished At" day="31"/>
    </ModalForm>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import { ResourceMethods } from 'vue-resource/types/vue_resource';
  import Authorized from "@/mixins/authorized";
  import Box from "@/interfaces/moneyBox";
  import FinanceGoal from "@/interfaces/financeGoal";
  import DateInput from "@/components/DateInput.vue";
  import ModalForm from "@/components/ModalForm.vue";
  import Table from "@/components/Table.vue";
  import TableRow from "@/components/TableRow.vue";
  import Icon from "@/components/Icon.vue";

  @Component({
    components: {
      DateInput,
      ModalForm,
      TableRow,
      Table,
      Icon
    },
    data() {
      return {
        goals: []
      }
    }
  })

  export default class MoneyBoxPage extends Mixins(Authorized) {
    private moneyboxResource!: ResourceMethods;
    private goalResource!: ResourceMethods;
    private boxId!: string;
    private svg!: object;
    box!: Box;
    goals!: FinanceGoal[];
    loaded: Boolean = false;
    displayForm: Boolean = false;
    startedAt: string = "";
    finishedAt: string = "";

    updateGoal(changes: {key: string, value: string}, id: number): void {
      let goal = this.goals.find(e => e.id === id);
      if (goal) {
        this.$set(goal.attributes, changes.key, changes.value);
        this.goalResource.update(
          {id: id}, goal.attributes
        ).then(() => {}, this.errorHandler)
      }
    }

    goalColumns(goal: FinanceGoal | undefined): any[] {
      if (goal) {
        return [
          {value: goal.attributes.monthNumber},
          {value: goal.attributes.paymentAmount},
          {value: goal.attributes.incomeAmount, editable: true, key: "incomeAmount"},
          {value: this.timeFormat(goal.attributes.startedAt)},
          {value: this.timeFormat(goal.attributes.finishedAt)}
        ]
      } else {
        return []
      }
    }

    timeFormat(value: string): string {
      const result: any = Date.parse(value);
      if (isNaN(result)) {
        return  ""
      } else {
        return this.$d(new Date(value), 'short')
      }
    }

    loadMoneybox(): void {
      this.moneyboxResource.get({ id: this.boxId })
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

    removeGoal(id: number, index: number): void {
      this.goalResource.delete({id: id}).then(() => {
        this.goals.splice(index, 1)
      })
    }

    toggleForm(flag: boolean = true): void {
      this.displayForm = flag
    }

    createGoal(): void {
      const params = { started_at: this.startedAt, finished_at: this.finishedAt };

      // @ts-ignore
      this.moneyboxResource.createGoal({id: this.boxId}, params).then((response: Response) => {
        response.json().then((resp: { data: FinanceGoal }) => {
          this.goals.push(resp.data);
          this.toggleForm(false)
        })
      }, this.errorHandler)
    }

    registerResource(): void {
      this.moneyboxResource = this.$resource("api/moneyboxes{/id}", {}, {
        createGoal: { method: 'POST', url: "api/moneyboxes{/id}/finance_goals"}
      });
      this.goalResource = this.$resource("api/finance_goals{/id}");
    }

    mounted(): void {
      this.boxId = this.$router.currentRoute.params['id'];
      this.loadMoneybox();
    }
  }
</script>

<style scoped>
  h5 {
    background-color: var(--header-color);
    text-transform: uppercase;
  }

</style>
