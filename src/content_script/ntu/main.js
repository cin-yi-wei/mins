'use strict'
console.log('main.js')
let params = parseCoureseSearchToJson();
sendMessage("GetCourses",params)
