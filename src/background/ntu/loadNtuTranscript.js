'use strict'
function loadNtuTranscript() {
  return fetch('https://ifsel3.aca.ntu.edu.tw/hissco/main_stu.asp', {credentials: 'include'}).
  then(response=>response.text()).
  then(dom => parseNtuTranscriptToJson((new DOMParser()).parseFromString(dom, 'text/html')))
}
