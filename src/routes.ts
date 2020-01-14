import VueRouter from 'vue-router'
import LoginPage from "./pages/Login.vue"
import MoneyBoxesPage from "@/pages/MoneyBoxes.vue"

export default new VueRouter({
  routes: [
    {
      path: "",
      component: MoneyBoxesPage

    },
    {
      path: "/login",
      component: LoginPage
    }
  ],
  mode: "history"
})
