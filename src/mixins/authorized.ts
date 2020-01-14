import { Component, Mixins } from 'vue-property-decorator';
import CurrentUser from "@/interfaces/currentUser";
import WithCurrentUser from "@/mixins/currentUser";

@Component
export default class Authorized extends Mixins(WithCurrentUser) {
  private requireAuth: boolean = true;

  getMe(): void {
    const error401 = this.$t('errors.error401');

    this.$http.get('api/users/me')
      .then(response => {
        response.json().then((user: CurrentUser) => {
          const currentUser: CurrentUser = {id: user.id, email: user.email };
          this.$store.commit('setUser', currentUser)
        })
      }, response => {
        if (response.status == 401) {
          this.$store.commit('addError', error401);
          this.$router.push("/login")
        } else {
          response.json().then((errorMsg: object) => console.error(errorMsg))
        }
      });
  }

  created(): void {
    if (this.requireAuth) this.getMe();
    this.registerResource();
  }

  registerResource(): void {
  }
}
