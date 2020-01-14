import Vue from 'vue'
import Component from 'vue-class-component'
import CurrentUser from "@/interfaces/currentUser";

@Component
export default class WithCurrentUser extends Vue {
  currentUser(): CurrentUser | null {
    let user = this.$store.state.current_user;
    if (user.id) {
      return this.$store.state.current_user
    } else {
      return null
    }
  }
}
