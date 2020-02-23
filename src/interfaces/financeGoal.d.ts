export default interface FinanceGoal {
  id: number,
  attributes: {
    paymentAmount: number,
    incomeAmount: number,
    startedAt: string,
    finishedAt: string,
    monthNumber: number
  },
  relationships: {
    planedExpenses: {
      links: {
        related: string
      }
    }
  }
}
