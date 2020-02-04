<template>
  <div
      class="modal fade show"
      ref="addGoal"
      tabindex="-1"
      role="dialog"
      aria-hidden="false"
      style="display: block"
  >
    <div class="modal-dialog" role="document">
      <form @submit.prevent="onSubmit">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <slot></slot>
            </div>
          </div>
          <div class="modal-footer">
            <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="closeForm"
                v-if="haveCloseForm"
                v-html="svg.icons.x.toSvg()"
            >
            </button>
            <button type="submit" class="btn btn-primary" v-html="svg.icons.save.toSvg()"></button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  const feather = require('feather-icons');

  @Component

  export default class ModalForm extends Vue {
    @Prop() private haveCloseForm!: boolean;
    @Prop() private title!: string;
    @Prop() private saveText!: string;
    @Prop() private closeText!: string;
    private svg!: object;
    closeForm(): void {
      this.$emit("closeForm")
    }
    onSubmit(): void {
      this.$emit("onSubmit")
    }
    beforeCreate(): void {
      this.svg = feather
    }
  }
</script>

<style scoped>

</style>
