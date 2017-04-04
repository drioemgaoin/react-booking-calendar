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
  return axios.get(process.env.API_URL + '/services')
    .then(checkStatus)
    .then(function(response) {
      return process.env.NODE_ENV === 'development' ? response.data : response.data.services;
    })
    .catch(function(error) {
    });
}
