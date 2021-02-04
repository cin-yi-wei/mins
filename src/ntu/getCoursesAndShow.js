'use strict'
const server = 'http://localhost:3000';
function dyeAndAddEventListenerOnAvailableCourses(DOM) {
  const course_id_regex = /\b\d{3}[12]0[a-zA-CEFHJ-Z ][a-zA-Z ]{1,5}[1-8]\d{3}(-\w{2})?\b/;
  let year_semester = DOM.querySelector('#select_sem').selectedOptions[0].innerHTML.replace('-', '') + '0';
  DOM.querySelector('table[bordercolorlight="#CCCCCC"] tbody').firstElementChild.insertCell(-1).innerText = '平均 GPA'
  const table = DOM.querySelector('table[bordercolorlight="#CCCCCC"] tbody');
  let columnNum = table.firstElementChild.children.length;
  let idx = {"課號": 0, "班次": 0};
  for (let j = 0; j < columnNum; ++j) {
    let text = table.firstElementChild.children[j].innerText.trim();
    if (text in idx) idx[text] = j;
  }
  let courses = [];
  let rows = [];

  let to_course_id = function(row) {
    let tds = row.children;
    let course_number = tds[idx["課號"]].innerText.trim();
    let class_number = tds[idx["班次"]].innerText.trim();
    return year_semester + course_number + (class_number ? '-' + class_number : "");
  }

  for (let row of table.children) {
    if (Math.max(...Object.values(idx)) < columnNum) {
      let course_id = to_course_id(row);
      if (course_id_regex.test(course_id)) {
        rows.push(row);
        courses.push(course_id);
      }
    }
  }
  fetch(`${server}/api/v1/enrollment/create`,{
    method: "POST",
    headers:  {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
        "university": "NTHU",
        "student": "104010091",
        "courses": {
          "10730EE  415000": {
            "score": "B",
            "total_enrollment": 49,
            "rank": 41
          },
          "10730EECS201000": {
            "score": "B"
          },
          "10730EMBA508000": {
            "score": "A",
            "total_enrollment": 30,
            "rank": 12,
            "A+": 11,
            "A": 8,
            "A-": 3,
            "B+": 4,
            "B": 1,
            "B-": 0,
            "C+": 1,
            "C": 0,
            "C-": 0,
            "F": 2,
            "X": 0,
            "U": 0
          },
          "A single invalid enrollment is acceptable": {
            "score": "B"
          }
        }
      })
  }).then(response => response.json()).then(json => console.log(json));
  //chrome.runtime.sendMessage({action: "queryPastCourseExist", "university": "NTU", {"numbers": courses}},
  /*
  function (existHash) {
    for (let row of rows) {
      let course_id = to_course_id(row);
      if (existHash[course_id]) {
        chrome.runtime.sendMessage({university: "ntu", action: "getCourseInformation", argument: {"number": course_id}},
          course_info => row.insertCell(-1).innerText = averageGPA(course_info.score)
        );
      } else row.insertCell(-1).innerText = '請先登入';
      row.style.backgroundColor = existHash[course_id] ? '#FAD0D5' : '#9EDEF9';
    }
  });
  */
  return null;
}

dyeAndAddEventListenerOnAvailableCourses(document);
