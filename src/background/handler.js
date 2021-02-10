'use strict'
const server = 'https://secure-mesa-73673.herokuapp.com';
var Handler = {

  GetCourses(message, sender, sendResponse){
    let url = new URL(`${server}/api/v1/course/show?`);
    let params = message.argument;
    fetch(url+params ,{
      headers:  {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then(response => response.json()).then(json => console.log(json));
  },

  async GetScoreNtu(message, sender, sendResponse){
    let dom = await fetch('https://ifsel3.aca.ntu.edu.tw/hissco/main_stu.asp')
    let buffer = await dom.arrayBuffer();
    let decoder = new TextDecoder("utf-8");
    let text = decoder.decode(buffer);
    return text;
  },

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
