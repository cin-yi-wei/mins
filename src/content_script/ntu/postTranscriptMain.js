'use strict'
console.log('main.js')
let params = parseCoureseSearchToJson();
console.log(params);
sendMessage("GetCourses",params)
