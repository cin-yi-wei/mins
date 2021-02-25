'use strict'

loadCourses(parseToJson(document)).
then(response => {
  if (response.fail) {
    return fetchTranscript().
    then(response => loadCourses(parseToJson(document))).
    then(response => insertPresentation(response.fail ? {fail: true} : response, document))
  } else {
    insertPresentation(response, document);
    insertPopper(response, document);
  }
});
