<template>
  <span v-html="icons[name].toSvg()"></span>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Feather from 'feather-icons'

  @Component

  export default class Icon extends Vue {
    @Prop() private name!: string;
    icons!: {};

    beforeCreate(): void {
      this.icons = Feather.icons
    }
  }
</script>

<style scoped>

</style>
