import {required} from "vuelidate/lib/validators";

export default {
  ru: {
    app: {
      logout: "Выход"
    },
    message: {
      hello: 'Привет {email}'
    },
    errors: {
      error401: "Необходимо войти в систему"
    },
    login: {
      title: "Вход",
      failLogin: "Логин или пароль не совпадают, попробуйте еще",
      submit: "Войти"
    },
    validations: {
      required: "Поле обязательное для заполнения",
      email: "Не валидный email"
    }
  }
}
