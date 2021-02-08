'use strict'

const course_id_regex = /\A([a-zA-Z\& ]{2,6}[1-8]\d{3})(-\w{2})?\z/;

let path = location.pathname.split('/');

if (path[1]+path[2] == 'nolcoursesearch' && path[3] != 'search_for_08_other.php') {
  //console.log($('table tbody tr td table tbody tr'));
/*
  let allButton = $('td[valign="top"] td[width="480"][align="left"] input,td[valign="top"] td[width="480"][align="right"] input').last();
  console.log(allButton);
  allButton.each( (index, listItem) => {
    listItem.addEventListener("click", function() {
      alert('a');
    });
  });
  */
  let course_ids = new Set([]);
  let scoreTable = $('table[bordercolorlight="#CCCCCC"] tr[bgcolor="#DDEDFF"]').parent().parent()[0].rows;
  let courseNumber =$('select[id="select_sem"]>option[selected]')[0].innerText.split('-');
  for (let i = 1; i < scoreTable.length; i++) {
    let course_id = scoreTable[i].cells[2].innerText;
    course_ids.add(courseNumber[0]+courseNumber[1]+'0'+course_id);
  }
  console.log(course_ids);
  console.log(Array.from(course_ids));
  let course= {
                "university": "NTU",
                "courses": Array.from(course_ids)
              };

  chrome.runtime.sendMessage({
    action: "GetCourses",
    course: course
  }, function (response) {
    console.log(response);
  });


}
