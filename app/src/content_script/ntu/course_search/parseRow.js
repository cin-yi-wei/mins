'use strict'
function parseRow(row) {
  const COURSE_ID_REGEX = /\b[a-zA-Z\& ]{2,6}[1-8]\d{3}(-\w{2})?\b/;
  let td = row.children;
  let course_number = td[2].textContent.trim();
  let class_id = td[3].textContent.trim();
  let course_id = course_number + (class_id ? '-' + class_id : "");
  return COURSE_ID_REGEX.test(course_id) ? course_id : null;
}
