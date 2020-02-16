import VueRouter from 'vue-router'
import LoginPage from "./pages/Login.vue"
import MoneyBoxesPage from "@/pages/MoneyBoxes.vue"
import MoneyBox from "@/pages/MoneyBox.vue";
import GoalPage from "@/pages/GoalPage.vue";

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
      path: "/goals/:id",
      component: GoalPage
    },
    {
      path: "/login",
      component: LoginPage
    }
  ],
  mode: "history"
})
