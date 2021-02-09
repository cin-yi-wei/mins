'use strict'
console.log('handler.js')
const server = 'https://secure-mesa-73673.herokuapp.com';
class Handler {

  GetCourses(message, sender, sendResponse){
    let url = new URL(`${server}/api/v1/course/show?`);
    let params = message.argument;
    fetch(url+params ,{
      headers:  {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then(response => response.json()).then(json => console.log(json));
  }

  async GetScoreNtu(message, sender, sendResponse){
    let dom = await fetch('https://ifsel3.aca.ntu.edu.tw/hissco/main_stu.asp')
    let buffer = await dom.arrayBuffer();
    let decoder = new TextDecoder("utf-8");// big5
    let text = decoder.decode(buffer);
    let parser = new DOMParser();
    console.log(parser.parseFromString(text, "text/html"));
    return parser.parseFromString(text, "text/html");
  }

  SendScoreNtu(message, sender, sendResponse){
    let enrollment = message.argument;
    fetch(`${server}/api/v1/enrollment/create`,{
      method: "POST",
      headers:  {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(enrollment)
    }).then(response => response.json()).then(json => console.log(json));
  }


}
