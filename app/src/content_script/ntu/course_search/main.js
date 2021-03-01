'use strict'

let year_sem = document.querySelector('#select_sem').querySelector('option[selected]').textContent.replace('-', '') + '0';
let rows = getAllRows(document);
let input = {university: "NTU", courses: rows.map(parseRow)};

document.querySelector('tr[align="center"][bgcolor="#DDEDFF"]').insertCell(-1).textContent = '平均 GPA';
rows.map(row => row.insertCell(-1).textContent = '⌛');

function insertPresentation(courseInfo) {
  rows.forEach(row => {
    if (courseInfo.fail) {
      row.lastElementChild.innerHTML = '<a target="_blank" href="https://ifsel3.aca.ntu.edu.tw/hissco/index.asp">請先登入</a>';
    } else {
      let course_id = parseRow(row);
      row.lastElementChild.textContent = (courseInfo[course_id][year_sem] || {}).average || '資料未齊';
      if (Object.values(courseInfo[course_id]).some(info => info.average)) {
        row.lastElementChild.style.backgroundColor = '#9edef9';
      }
    }
  })
}

loadCourses(input).
then(response => {
  if (response.fail) {
    return fetchTranscript('NTU').
    then(() => loadCourses(input)).
    then(courseInfo => {
      insertPresentation(courseInfo);
      insertListenerToDom(courseInfo, document);
    });
  } else {
    insertPresentation(response);
    insertListenerToDom(response, document);
  }
});
