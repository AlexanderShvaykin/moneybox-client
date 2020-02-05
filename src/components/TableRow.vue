<template>
  <tr v-if="columns.length > 0">
    <td v-for="(column, index) in columns" :key="index">
      <input
          type="text"
          :value="column.value"
          v-if="column.editable"
          @input="debounceEmit(column.key, $event.target.value)"
      >
      <div v-else>{{ column.value }}</div>
    </td>
    <td>
      <button
          @click="$emit('remove')"
          class="btn btn-outline-danger"
          v-html="removeText()"
      ></button>
    </td>
  </tr>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Helper from '@/helpers'
  const feather = require('feather-icons');

  @Component
  export default class TableRow extends Vue {
    @Prop() private columns!: {value: string, editable: boolean}[];
    @Prop() private customRemoveText!: string;
    debounceEmit = Helper.debounce(this.emitValue, 1000);

    removeText(): any {
      return feather.icons.x.toSvg()
    }

    emitValue(key: string, value: string): void {
      if (key) {
        this.$emit("changeRow", {key, value});
      }
    }
  }
</script>

<style scoped>
  td input, div {
    border:none;
    width:100%;
    height:100%;
    padding-bottom: 15px;
    padding-top: 15px;
    padding-left: 5px;
    text-align: center;
  }

  td input:focus {
    border:2px solid #5292F7;
    outline: none;
  }

  td {
    text-align: center;
    border:1px solid rgba(23, 25, 17, 0.42);
  }
</style>
