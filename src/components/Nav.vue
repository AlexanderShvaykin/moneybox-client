<template>
  <div>
    <nav class="mb-2">
      <button class="btn btn-light" @click="$router.go(-1)">{{ $t('app.back') }}</button>
    </nav>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component

  export default class Nav extends Vue {
  }
</script>

<style scoped>

</style>