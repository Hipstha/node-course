const axios = require('axios');

const getClima = async (lat, lng) => {
  const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=14db6adba265ab237b944e95b2dbc264`);
  return resp.data.main.temp;
}

module.exports = {
  getClima
}
