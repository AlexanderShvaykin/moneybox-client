<template>
  <div>
    <label v-if="label" :for="elId">{{label}}</label>
    <input
        type="text"
        :class="cssClass"
        :id="elId"
        @input="debounce(emitValue, 2000)()"
        @focus="emitValue"
        @focusout="emitValue"
        v-model="inputValue"
    >
  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component

  export default class MonthPicker extends Vue {
    @Prop() private elId!: string;
    @Prop() private label!: string;
    @Prop() private cssClass!: string;
    @Prop() private day!: string;
    readonly initValue: string = this.formatDate(new Date());
    inputValue: string = this.initValue;
    formatDate(date: Date): string {
      const month = date.getMonth() + 2;
      let inputMonth: string;
      if (month < 10) {
        inputMonth = "0" + month
      } else {
        inputMonth = String(month)
      }

      let inputDay: string | undefined;
      if (this.day) {
        const endDay = new Date(date.getFullYear(), month, 0).getDate();
        if (Number(this.day) > endDay) {
          inputDay = String(endDay)
        } else {
          inputDay = this.day
        }
      }
      return date.getFullYear() + "/" + inputMonth + "/" + (inputDay || "01")
    }
    convertValue(): number {
      const result: any = Date.parse(this.inputValue);
      if (isNaN(result)) {
        this.inputValue = this.initValue;
      }
      return Date.parse(this.inputValue)
    }
    emitValue(): void {
      this.$emit("input", this.convertValue())
    }
    debounce(func: (this: Vue) => void, delay: number): () => void {
      let inDebounce: number | undefined;
      return function(this: Vue) {
        const context: Vue = this;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context), delay)
      }
    }
    created() {
      this.$emit("input", this.convertValue())
    }
  }
</script>

<style scoped>

</style>
