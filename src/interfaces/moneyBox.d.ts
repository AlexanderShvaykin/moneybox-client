export default interface Box {
  id: number,
  attributes: {
    name: string
  },
  relationships: {
    financeGoals: {
      links: {
        related: string
      }
    }
  }
}
