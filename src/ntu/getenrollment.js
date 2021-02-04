'use strict'

let path = location.pathname.split('/');

if (path[1]+path[2] == 'nolcoursesearch' && path[3] != 'search_for_08_other.php') {
  //console.log($('table tbody tr td table tbody tr'));
window.onload = function () {

  let allButton = $('td[valign="top"] td[width="480"][align="left"] input,td[valign="top"] td[width="480"][align="right"] input').last();
  console.log(allButton);
  allButton.each( (index, listItem)  => console.log(index, listItem) /*= "text" */);//function(){ alert('a'); }
}
/*
8
6
10


*/



  /*
  let courseNumber= {
                      "university": "NTU",
                      "courses": ["10910CSIE5410","aaa"]
                    };
  chrome.runtime.sendMessage({
    action: "GetEnrollment",
    courseNumber: courseNumber
  }, function (response) {

  });
  */
}
