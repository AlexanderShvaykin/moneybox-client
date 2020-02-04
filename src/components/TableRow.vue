<template>
  <tr v-if="columns.length > 0">
    <td v-for="(value, index) in columns" :key="index">{{ value }}</td>
    <td>
      <button
          @click="$emit('remove')"
          class="btn btn-outline-danger"
      >{{ removeText() }}</button>
    </td>
  </tr>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class TableRow extends Vue {
    @Prop() private columns!: [];
    @Prop() private customRemoveText!: string;

    removeText(): string {
      return (this.customRemoveText || "remove")
    }
  }
</script>

<style scoped>

</style>
