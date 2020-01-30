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
      <form action="#">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          </div>
          <div class="modal-body">
            <div class="form-group">
<!--              <MonthPicker v-model="startedAt" cssClass="form-control" elId="startedAt" label="started At"/>-->
<!--              <MonthPicker v-model="finishedAt" cssClass="form-control" elId="finishedAt" label="finished At" day="31"/>-->
            </div>
          </div>
          <div class="modal-footer">
            <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="closeForm"
                v-if="haveCloseForm"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component

  export default class ModalForm extends Vue {
    @Prop() private haveCloseForm!: boolean;
    closeForm(): void {
      this.$emit("closeForm")
    }
  }
</script>

<style scoped>

</style>
