const SITE = 'https://bar-view-back.herokuapp.com/';

export function getOrganizationInfo(id) {
  return fetch(`${SITE}organization/info/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(data => data.json());
}

export function getOrganizationCoords() {
  console.log('getOrganizationCoords');
  return fetch(`${SITE}organization/coords`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(data => data.json())
    .catch(err => console.log(err));

  //   return fetch('https://localhost:8443/organization/coords', {
  //     method: 'GET',
  //     mode: 'no-cors',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   }).then(data => data.json());
}

function get() {
  fetch(`${SITE}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(data => data.json())
    .then(data => console.log(data));
}
