'use strict'
function insertPresentationToDomObject(courseInfo, doc) {
  const COURSE_ID_REGEX = /\b\d{3}[12]0[a-zA-CEFHJ-Z ][a-zA-Z ]{1,5}[1-8]\d{3}(-\w{2})?\b/;
  let year_semester = doc.querySelector('#select_sem').querySelector('option[selected]').textContent.replace('-', '') + '0';
  let idx = {"課號": 2, "班次": 3};
  let indexRow = doc.querySelector('tr[align="center"][bgcolor="#DDEDFF"]');
  let coursesRows = doc.querySelectorAll('tr[align="center"]:not([bgcolor="#DDEDFF"])');
  indexRow.insertCell(-1).textContent = '平均 GPA';
  let columnNum = indexRow.children.length;
  for (let j = 0; j < columnNum; ++j) {
    let text = indexRow.children[j].textContent.trim();
    if (text in idx) idx[text] = j;
  }
  let to_course_id = function(row) {
    let tds = row.children;
    let course_number = tds[idx["課號"]].textContent.trim();
    let class_number = tds[idx["班次"]].textContent.trim();
    return year_semester + course_number + (class_number ? '-' + class_number : "");
  }
  for (let row of coursesRows) {
    let course_id = to_course_id(row);
    row.insertCell(-1).textContent = (courseInfo[course_id] || {}).average || '資料未齊';
    row.style.backgroundColor = course_id in courseInfo ? '#66DBFF' : '#74E647';
  }
}
