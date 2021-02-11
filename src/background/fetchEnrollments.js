'use strict'
function fetchEnrollments(json) {
  return fetch(`${server}/api/v1/enrollment/create`, {
    method: "POST",
    headers:  {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(json)
  }).
  then(response => response.json());
}
