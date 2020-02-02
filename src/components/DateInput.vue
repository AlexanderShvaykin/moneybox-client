<template>
  <div>
    <label v-if="label" :for="elId">{{label}}</label>
    <input
        type="text"
        :class="cssClass"
        :id="elId"
        @input="handleInput"
        @focus="emitValue"
        @focusout="emitValue"
        v-model="inputValue"
    >
  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Helper from '@/helpers'

  @Component

  export default class DateInput extends Vue {
    @Prop() private elId!: string;
    @Prop() private label!: string;
    @Prop() private cssClass!: string;
    @Prop() private day!: string;
    readonly initValue: string = this.formatDate(this.initDate());
    inputValue: string = this.initValue;

    handleInput(): void {
      Helper.debounce(this.emitValue, 2000)()
    }

    initDate(): Date {
      const currentDate = new Date();
      let day = 1;
      const month = currentDate.getMonth() + 2;
      const year = currentDate.getFullYear();
      if (this.day) {
        const endDay = new Date(year, month + 1, 0).getDate();

        if (Number(this.day) > endDay) {
          day = endDay
        } else {
          day = Number(this.day)
        }
      }
      return new Date(year, month, day)
    }

    formatDate(date: Date): string {
      const month = date.getMonth() + 1;
      let inputMonth: string;
      if (month < 10) {
        inputMonth = "0" + month
      } else {
        inputMonth = String(month)
      }

      const day = date.getDate();
      let inputDay: string;
      if (day < 10) {
        inputDay = "0" + day
      } else {
        inputDay = String(day)
      }

      return date.getFullYear() + "-" + inputMonth + "-" + inputDay
    }
    convertValue(): string {
      const result: any = Date.parse(this.inputValue);
      if (isNaN(result)) {
        this.inputValue = this.initValue;
      }
      this.inputValue = this.formatDate(new Date(this.inputValue));
      return this.inputValue
    }

    emitValue(): void {
      this.$emit("input", this.convertValue())
    }
    created() {
      this.$emit("input", this.convertValue())
    }
  }
</script>

<style scoped>

</style>
