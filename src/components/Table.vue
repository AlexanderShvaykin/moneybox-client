<template>
  <table cellpadding="0" cellspacing="0">
    <slot></slot>
  </table>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  @Component
  export default class Table extends Vue {

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
