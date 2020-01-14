<template>
  <div>
    <div class="row">
      <div class="col-6">
        <h1 class="text-center pt-3">{{ $t('login.title') }}</h1>
        <form class="pt-4" @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="email">Email</label>
            <input
                type="email"
                class="form-control"
                id="email"
                v-model="email"
                @blur="$v.email.$touch()"
                :class="{'is-invalid': $v.email.$error}"
            >
            <div class="invalid-feedback" v-if="!$v.email.email">{{$t('validations.email')}}</div>
            <div class="invalid-feedback" v-if="!$v.email.required">{{$t('validations.required')}}</div>

            <label for="password">Password</label>
            <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
                @blur="$v.password.$touch()"
                :class="{'is-invalid': $v.password.$error}"
            >
            <div class="invalid-feedback">{{$t('validations.required')}}</div>
          </div>

          <button
              class="btn btn-dark"
              type="submit"
              :disabled="$v.$invalid"
          >
            {{$t('login.submit')}}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { required, email } from 'vuelidate/lib/validators'
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    validations: {
      email: {required, email},
      password: {
        required,
      }
    }
  })
  export default class LoginPage extends Vue {
    email: string = "";
    password: string = "";
    requireAuth: boolean = false;

    onSubmit(): void {
      const params = {
        email: this.email,
        password: this.password
      };
      const errorMessage = this.$t('login.failLogin');

      this.$http.post('tokens', params)
        .then(response => {
          response.json().then((response: {token: string}) => {
            const token: string = response.token;
            this.$store.commit('saveToken', token);
            this.$router.push("/")
          })
        }, response => {
          if (response.status == 401) {
            this.$store.commit('addError', errorMessage);
          } else {
            response.json().then((errorMsg: object) => console.error(errorMsg))
          }
        });
    }
  }
</script>

<style scoped>

</style>
