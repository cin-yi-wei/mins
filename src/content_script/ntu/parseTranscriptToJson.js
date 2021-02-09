'use strict'
function parseTranscriptToJson(doc) {
  const STUDENT_ID_REGEX = /\?regno=([ABCDEFHJKNPQRSTYZ]\d{2}[1-9ABE][0-4]\d[0-3]\d{2})&/i;
  const COURSE_ID_REGEX = /\b\d{3}[12]0[a-zA-CEFHJ-Z ][a-zA-Z ]{1,5}[1-8]\d{3}(-\w{2})?\b/;
  const SCORE_REGEX = /\b(A+|A|A-|B+|B|B-|C+|C|C-|F|X)\b/;

  let courses = {};

  const tables = doc.querySelectorAll("tr");
  const student = Array.prototype.slice.call(doc.querySelectorAll('a')).map(element => {
    let ret = element.outerHTML.match(STUDENT_ID_REGEX);
    if (!ret || !ret[1]) return false;
    else return ret[1].toUpperCase();
  }).filter(a=>a)[0];
  let idx = {"學年/學期": 0, "課號": 0, "班次": 0, "學分": 0, "課程名稱": 0, "成績": 0};
  for (let row of tables) {
    let td = row.children;
    for (let j = 0; j < td.length; ++j) {
      let text = td[j].textContent.trim();
      if (text in idx) idx[text] = j;
    }
    if (Math.max(...Object.values(idx)) < td.length) {
      let year_semester = td[idx["學年/學期"]].textContent.trim().replace('上', '10').replace('下', '20');
      let course_number = td[idx["課號"]].textContent.trim();
      let class_id = td[idx["班次"]].textContent.trim();
      let course_id = year_semester + course_number + (class_id ? '-' + class_id : "");
      let title = td[idx["課程名稱"]].textContent.trim();
      let credit = parseInt(td[idx["學分"]].textContent, 10);
      let score = td[idx["成績"]].textContent.trim();
      if (COURSE_ID_REGEX.test(course_id) && SCORE_REGEX.test(score) && !isNaN(credit)) {
        courses[course_id] = { score };
      }
    }
  }
  return {
    "university": "NTU",
    "student": student,
    courses
  };
}
