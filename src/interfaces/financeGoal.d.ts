export default interface FinanceGoal {
  id: number,
  attributes: {
    paymentAmount: number,
    incomeAmount: number,
    startedAt: number,
    finishedAt: number,
    monthNumber: number
  }
}
