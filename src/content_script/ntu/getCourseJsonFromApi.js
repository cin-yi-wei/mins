'use strict'
function sendMessage(action,argument){
  chrome.runtime.sendMessage({
    action: action,//"GetCourses",
    argument: argument//params
  }, function (response) {
    console.log(response);
    if(action == "GetScoreNtu"){
      console.log(action);
      //parseTranscriptToJson(response);

      return response;
    }
  });

}
