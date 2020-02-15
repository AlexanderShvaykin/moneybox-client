<template>
  <div class="row-cols-3">
    <div>
      <form class="pt-4" @submit.prevent="createMoneybox">
        <div class="form-group">
          <label for="name">Moneybox name</label>
          <input type="text" id="name" class="form-control" v-model="boxName">
        </div>

        <button class="btn btn-success">Create Moneybox</button>
      </form>

      <table is="Table" class="mt-3">
        <div
            is="TableRow"
            v-for="box of moneyboxes"
            :key="box.id"
            @remove="removeBox(box.id)"
            @goto="toBox(box.id)"
            @changeRow="updateBox($event, box.id)"
            :columns="[{value: box.attributes.name, editable: true, key: 'name'}]"
        >
        </div>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import { ResourceMethods } from 'vue-resource/types/vue_resource';
  import Authorized from "@/mixins/authorized";
  import Icon from "@/components/Icon.vue";
  import Table from "@/components/Table.vue";
  import TableRow from "@/components/TableRow.vue"
  import Box from "@/interfaces/moneyBox";

  @Component({
    components: {
      Icon,
      Table,
      TableRow
    }
  })

  export default class MoneyBoxesPage extends Mixins(Authorized) {
    moneyboxes: Box[] = [];
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
          response.json().then((resp: { data: Box[] }) => this.moneyboxes = resp["data"])
        }, this.errorHandler)
    }

    addBoxHandler(response: { data: Box }): void {
      this.boxName = "";
      this.moneyboxes.push(response["data"]);
    }

    registerResource(): void {
      this.resource = this.$resource("api/moneyboxes{/id}");
    }

    toBox(id: number): void {
      this.$router.push("/moneyboxes/" + id)
    }

    updateBox(changes: {key: string, value: string}, id: number): void {
      let box = this.moneyboxes.find(e => e.id === id);
      if (box) {
        this.$set(box.attributes, changes.key, changes.value);
        this.resource.update(
          {id: id}, box.attributes
        ).then(() => {}, this.errorHandler)
      }
    }

    removeBox(id: number): void {
      this.resource.delete({id: id}).then(() => {
        this.loadMoneyboxes()
      }, this.errorHandler)
    }

    mounted(): void {
      this.loadMoneyboxes()
    }
  }
</script>

<style scoped>

</style>
