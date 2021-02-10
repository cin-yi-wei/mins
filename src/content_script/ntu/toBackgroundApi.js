'use strict'
/*
async function sendMessage(action,argument){
  chrome.runtime.sendMessage({
    action: action,//"GetCourses",
    argument: argument//params
  }, function (response) {
    if(action == "GetScoreNtu"){
      console.log(response);
      //parseTranscriptToJson(response);
      console.log( response);
      return response;
    }
  });
}
*/
function sendMessagePromise(action,argument) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      action: action,//"GetCourses",
      argument: argument//params
    }, response => {
      resolve(response);
    });
  });
}
