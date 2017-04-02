import axios from 'axios';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
};

export function getServices() {
  const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  const url = isDevelopment
      ?  'http://localhost:3004/services'
      : window.location.href + 'services'

  return axios.get(url)
    .then(checkStatus)
    .then(function(response) {
      return isDevelopment ? response.data : response.data.services;
    })
    .catch(function(error) {
    });
}
