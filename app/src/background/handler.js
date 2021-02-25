'use strict'
const server = //'http://119.14.151.252:1124';
                'https://mighty-woodland-62500.herokuapp.com';
let handler = {
  loadCourses(message, sender, sendResponse) {
    console.log("message",message);
    fetch(`${server}/api/v2/course/show` ,{
      method: 'POST',
      headers:  {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(message.argument)
    }).
    then(response => response.status == 200 ? response.json() : {fail: true}).
    then(json => sendResponse(json));
  },
  fetchTranscript(message, sender, sendResponse) {
    let argument = message.argument;
    if (argument.university == "NTU") {
      loadNtuTranscript(argument).
      then(json => fetchEnrollments(json)).
      then(json => sendResponse(json));
    }
  }
};
