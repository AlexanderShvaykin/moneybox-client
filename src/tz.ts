export default {
  timeZone(): number {
    return ((new Date()).getTimezoneOffset()) / (-60)
  },
  current(): number {
    return (Date.now() / 1000) + this.offsetSeconds()
  },
  withOffset(seconds: number): number {
    return seconds + this.offsetSeconds()
  },
  offsetSeconds(): number {
    return (60 * 60 * this.timeZone())
  }
}
