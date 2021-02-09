'use strict'
console.log('postTranscriptInBackground.js')

function parseTranscriptToJson(dom) {
  const ntuServer = 'https://ifsel3.aca.ntu.edu.tw';
  const student_id_regex = /[^\A-Z]([ABCDEFHJKNPQRSTYZ]\d{2}[1-9ABE][0-4]\d[0-3]\d{2})[^\d]/i;
  const course_id_regex = /\b\d{3}[12]0[a-zA-CEFHJ-Z ][a-zA-Z ]{1,5}[1-8]\d{3}(-\w{2})?\b/;
  const score_regex = /\b(A+|A|A-|B+|B|B-|C+|C|C-|F|X)\b/;

  let courses = {};
  let enrollment = {};

  const tables = dom.querySelectorAll("tr");
  const student_id = Array.prototype.slice.call(dom.querySelectorAll('*')).map(element => {
    let ret = element.outerHTML.match(student_id_regex);
    if (!ret || !ret[1]) return false;
    else return ret[1].toUpperCase();
  }).filter(b => b).reduce((current, num) => {
    const freq = (num in current.numMap) ? ++current.numMap[num] : (current.numMap[num] = 1)
      if (freq > current.modeFreq && freq > 1){
        current.modeFreq = freq
        current.mode = num
      }
    return current;
  }, { mode: null, modeFreq: 0, numMap: {} }).mode;
  let idx = {"學年/學期": 0, "課號": 0, "班次": 0, "學分": 0, "課程名稱": 0, "成績": 0};
  for (let row of tables) {
    let td = row.children;
    for (let j = 0; j < td.length; ++j) {
      let text = td[j].innerText.trim();
      if (text in idx) idx[text] = j;
    }
    if (Math.max(...Object.values(idx)) < td.length) {
      let year_semester = td[idx["學年/學期"]].innerText.trim().replace('上', '10').replace('下', '20');
      let course_number = td[idx["課號"]].innerText.trim();
      let class_rank = td[idx["班次"]].innerText.trim();
      let course_id = year_semester + course_number + (class_rank ? '-' + class_rank : "");
      let title = td[idx["課程名稱"]].innerText.trim();
      let credit = parseInt(td[idx["學分"]].innerText, 10);
      let score = td[idx["成績"]].innerText.trim();
      if (course_id_regex.test(course_id) && score_regex.test(score) && !isNaN(credit)) {
        courses[course_id] = {
          "score": score,
          "rank": class_rank
        };
      }
    }
  }
  enrollment = {
    "university": "NTU",
    "student": student_id,
    "courses": courses
  };
  return enrollment;
}
