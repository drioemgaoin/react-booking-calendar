// GET BOOKING DATAS
export const GET_SERVICES = 'GET_SERVICES';
export const GET_SERVICES_SUCCESSFUL = 'GET_SERVICES_SUCCESSFUL';
export const GET_SERVICES_FAILED = 'GET_SERVICES_FAILED';

// POST BOOKING
export const POST_BOOKING = 'POST_BOOKING';
export const POST_BOOKING_SUCCESSFUL = 'POST_BOOKING_SUCCESSFUL';
export const POST_BOOKING_FAILED = 'POST_BOOKING_FAILED';

//View list
export const CANCEL_BOOKING = 'CANCEL_BOOKING';
export const VALIDER_BOOKING = 'VALIDER_BOOKING';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
};

function parseJSON(response) {
  return response.json()
};

export function cancelBookingAction() {
  return {
    type: CANCEL_BOOKING
  };
}

export function validerBookingAction() {
  return {
    type: VALIDER_BOOKING
  };
}

export function getServicesAction() {
  return {
    type: GET_SERVICES
  };
}

export function getServicesSuccessfulAction(services) {
  return {
    type: GET_SERVICES_SUCCESSFUL,
    payload: services
  };
}

export function getServicesFailedAction(error) {
  return {
    type: GET_SERVICES_FAILED,
    payload: error
  };
}

export function getServices() {
  return function(dispatch) {
    dispatch(getServicesAction());
    return fetch('http://www.reddit.com/user/spilcm/comments/.json')
      .then(checkStatus)
      .then(parseJSON)
      .then(function(data) {
        console.log('get booking services succeeded with JSON response', data)
        dispatch(getServicesSuccessfulAction(data.data.children));
      })
      .catch(function(error) {
        console.log('get booking services failed', error)
        dispatch(getServicesFailedAction(error));
      });
  };
};

export function postBookingAction(services) {
  return {
    type: POST_BOOKING
  };
}

export function postBookingSuccessfulAction() {
  return {
    type: POST_BOOKING_SUCCESSFUL
  };
}

export function postBookingFailedAction(error) {
  return {
    type: POST_BOOKING_FAILED,
    payload: error
  };
}

export function addBooking() {
  return function(dispatch) {
    dispatch(postBookingAction());
    dispatch(postBookingSuccessfulAction());
    // return fetch('http://www.reddit.com/user/spilcm/comments/.json')
    //   .then(checkStatus)
    //   .then(parseJSON)
    //   .then(function(data) {
    //     console.log('post booking succeeded')
    //     dispatch(postBookingSuccessfulAction());
    //   })
    //   .catch(function(error) {
    //     console.log('post booking failed', error)
    //     dispatch(postBookingFailedAction(error));
    //   });
  };
};
