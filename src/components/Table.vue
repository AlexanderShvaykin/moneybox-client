<template>
  <table cellpadding="0" cellspacing="0">
    <thead>
      <tr v-if="headers">
        <th
          scope="col"
          v-for="(head, index) in headers"
          :key="index"
        >{{ head }}</th>
      </tr>
    </thead>
    <slot></slot>
  </table>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component
  export default class Table extends Vue {
    @Prop() private headers!: string[];
  }
</script>

<style scoped>
  table {
    width: 100%;
    border: 1px solid #000;
    background-color: var(--table-color);
  }

  table th, td {
    text-align: center;
    border-left:1px solid rgba(23, 25, 17, 0.42);
    border-bottom:1px solid rgba(23, 25, 17, 0.42);
    padding: 10px;
  }
</style>
