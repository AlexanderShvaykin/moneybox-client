<template>
  <tr v-if="columns.length > 0">
    <td v-for="(column, index) in columns" :key="index" :style="column.style">
      <input
          type="text"
          :value="column.value"
          :disabled="!column.editable"
          @input="debounceEmit(column.key, $event.target.value)"
          :class="column.value < 0 ? 'red' : ''"
      >
    </td>
    <slot name="actions" v-if="action_btn !== false">
      <td>
        <button
            @click="$emit('goto')"
            class="btn btn-outline-primary btn-sm ml-1 mr-1"
        >
          <Icon name="arrow-right"></Icon>
        </button>
      </td>
    </slot>
    <slot name="remove" v-if="action_btn !== false">
      <td style="width: 50px">
        <button
            @click="$emit('remove')"
            class="btn btn-outline-danger btn-sm ml-1 mr-1"
        >
          <Icon name="trash-2"></Icon>
        </button>
      </td>
    </slot>
  </tr>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Helper from '@/helpers'
  import Icon from "@/components/Icon.vue"

  @Component({
    components: {
      Icon
    }
  })
  export default class TableRow extends Vue {
    @Prop() private columns!: {value: string, editable: boolean, style: string}[];
    @Prop() private customRemoveText!: string;
    @Prop() private remove_btn!: boolean;
    @Prop() private action_btn!: boolean;
    debounceEmit = Helper.debounce(this.emitValue, 1000);

    emitValue(key: string, value: string): void {
      if (key) {
        this.$emit("changeRow", {key, value});
      }
    }
  }
</script>

<style scoped>
  input.red {
    color: red !important
  }

  td input {
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

  input[type="text"]:disabled {
    background-color: var(--table-color);
    color: black;
  }

  td {
    text-align: center;
    border:1px solid rgba(23, 25, 17, 0.42);
  }
</style>
