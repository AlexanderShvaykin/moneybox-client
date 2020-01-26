import VueRouter from 'vue-router'
import LoginPage from "./pages/Login.vue"
import MoneyBoxesPage from "@/pages/MoneyBoxes.vue"
import MoneyBox from "@/pages/MoneyBox.vue";

export default new VueRouter({
  routes: [
    {
      path: "",
      component: MoneyBoxesPage
    },
    {
      path: "/moneyboxes",
      component: MoneyBoxesPage

    },
    {
      path: "/moneyboxes/:id",
      component: MoneyBox
    },
    {
      path: "/login",
      component: LoginPage
    }
  ],
  mode: "history"
})
