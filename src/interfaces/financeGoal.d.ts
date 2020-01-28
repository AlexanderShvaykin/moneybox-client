export default interface FinanceGoal {
  id: number,
  attributes: {
    payment_amount: number,
    income_amount: number,
    started_at: number,
    finished_at: number,
    month_number: number
  }
}
