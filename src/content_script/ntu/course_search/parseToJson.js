'use strict'
function parseToJson(doc) {
  const COURSE_ID_REGEX = /\b\d{3}[12]0[a-zA-CEFHJ-Z ][a-zA-Z ]{1,5}[1-8]\d{3}(-\w{2})?\b/;
  let year_semester = doc.querySelector('#select_sem').querySelector('option[selected]').textContent.replace('-', '') + '0';
  let idx = {"課號": 2, "班次": 3};
  let indexRow = doc.querySelector('tr[align="center"][bgcolor="#DDEDFF"]');
  let coursesRows = doc.querySelectorAll('tr[align="center"]:not([bgcolor="#DDEDFF"])');
  let columnNum = indexRow.children.length;
  for (let j = 0; j < columnNum; ++j) {
    let text = indexRow.children[j].textContent.trim();
    if (text in idx) idx[text] = j;
  }
  let courses = [];
  for (let row of coursesRows) {
    let td = row.children;
    let course_number = td[idx["課號"]].textContent.trim();
    let class_id = td[idx["班次"]].textContent.trim();
    let course_id = year_semester + course_number + (class_id ? '-' + class_id : "");
    if (COURSE_ID_REGEX.test(course_id)) {
      courses.push(course_id);
    }
  }
  return {
    "university": "NTU",
    courses
  };
}
