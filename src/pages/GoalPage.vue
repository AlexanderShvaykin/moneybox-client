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
  import ModalForm from "@/components/ModalForm.vue";
  import Table from "@/components/Table.vue";
  import TableRow from "@/components/TableRow.vue";
  import Expense from "@/interfaces/expense";
  import Resources from "@/resouces";

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
    planedExpenses!: Expense[]

  }
</script>

<style>

</style>