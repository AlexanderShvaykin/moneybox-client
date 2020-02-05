const throttle = require('lodash.throttle');
const debounce = require('lodash.debounce');

export default {
  debounce,
  throttle,
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
