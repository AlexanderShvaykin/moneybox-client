export default {
  debounce(func: () => void, delay: number): () => void {
    let inDebounce: number | undefined;
    return function(this: any) {
      const context = this;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context), delay)
    }
  }
}
