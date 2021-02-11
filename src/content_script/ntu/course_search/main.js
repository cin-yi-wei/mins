'use strict'
fetchTranscript().
then(response => {
  loadCourses(parseToJson(document)).
  then(response => {
    if (response.fail) {
      insertPresentation({fail: true}, document);
    } else {
      insertPresentation(response, document);
    }
  })
})
