module.exports = {
  hostname: process.env.NODE_ENV === 'production' ? 'https://smartmoneybox.herokuapp.com' : 'http://localhost:3000'
};
