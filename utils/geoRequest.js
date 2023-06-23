const axios = require('axios');
const logger = require('./logger');

async function geocode(address) {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
            q: address,
            format: 'json',
        },
    });

    if (response.data.length > 0) {
      const result = response.data[0];
      return [parseFloat(result.lat), parseFloat(result.lon)]
    } else {
      logger.info('No se encontraron resultados de geocodificación para la dirección proporcionada.');
    }
  } catch (err) {
    logger.info('Error al realizar la solicitud de geocodificación:', err.message);
  }
}

module.exports = geocode