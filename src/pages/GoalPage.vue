<template>
  <div is="Nav">
    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, iusto?</div>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import Authorized from "@/mixins/authorized";
    import Nav from "@/components/Nav.vue";

  @Component({
    components: {
      Nav
    }
  })

  export default class GoalPage extends Mixins(Authorized) {
  }
</script>

<style>

</style>