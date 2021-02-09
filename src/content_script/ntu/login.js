'use strict'
let dom = sendMessage("GetScoreNtu");
console.log(dom);
let json = parseTranscriptToJson(dom);
sendMessage("SendScoreNtu",json);
