'use strict'
sendMessagePromise("GetScoreNtu").then(domString => {

  let dom = new DOMParser().parseFromString(domString,"text/html");
  console.log(dom);
  let json = parseTranscriptToJson(dom);
  sendMessagePromise("SendScoreNtu",json);
});
