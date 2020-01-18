import { Component, Mixins } from 'vue-property-decorator';
import CurrentUser from "@/interfaces/currentUser";
import WithCurrentUser from "@/mixins/currentUser";
import { HttpResponse } from 'vue-resource/types/vue_resource';

@Component
export default class Authorized extends Mixins(WithCurrentUser) {
  private requireAuth: boolean = true;

  getMe(): void {
    this.$http.get('api/users/me')
      .then(response => {
        response.json().then((response: { data: CurrentUser }) => {
          this.$store.commit('setUser', response.data)
        })
      }, this.errorHandler);
  }

  errorHandler(response: HttpResponse): void {
    const error401 = this.$t('errors.error401');
    if (response.status == 401) {
      this.$store.commit('addError', error401);
      this.$router.push("/login")
    } else {
      response.json().then((body: {errors: {title: string}[]}) => {
        const errors = body.errors.map(value => value.title);
        this.$store.commit('addErrors', errors);
      })
    }
  }

  created(): void {
    if (this.requireAuth) this.getMe();
    this.registerResource();
  }

  registerResource(): void {
  }
}
