export default {
  debounce(func: () => void, delay: number): () => void {
    let inDebounce: number | undefined;
    return function(this: any) {
      const context = this;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context), delay)
    }
  },
  formatDate(date: Date): string {
    const month = date.getMonth() + 1;
    let inputMonth: string;
    if (month < 10) {
      inputMonth = "0" + month
    } else {
      inputMonth = String(month)
    }

    const day = date.getDate();
    let inputDay: string;
    if (day < 10) {
      inputDay = "0" + day
    } else {
      inputDay = String(day)
    }

    return date.getFullYear() + "-" + inputMonth + "-" + inputDay
  }
}
