import Vue from 'vue'
import Component from 'vue-class-component'
import { ResourceMethods } from 'vue-resource/types/vue_resource';

@Component
export default class Resources extends Vue {
  goalResource: ResourceMethods = this.$resource("api/finance_goals{/id}", {}, {
    createExpense: { method: "POST", url: "api/finance_goals{/id}/planed_expenses" }
  });
  moneyboxResource: ResourceMethods = this.$resource("api/moneyboxes{/id}", {}, {
    createGoal: { method: 'POST', url: "api/moneyboxes{/id}/finance_goals"}
  });
}
