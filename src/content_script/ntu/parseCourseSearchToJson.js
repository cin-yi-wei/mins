'use strict'

function parseCoureseSearchToJson(){
  let path = location.pathname.split('/');
  if (path[1]+path[2] == 'nolcoursesearch' && path[3] != 'search_for_08_other.php') {
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

    let params = 'university=NTU'
    Array.from(course_ids).forEach((item, i) => {
      params+= '&courses[]='+item+'%2c';
    });
    return params;
  }
}
