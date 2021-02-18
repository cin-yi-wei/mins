'use strict'

loadCourses(parseToJson(document)).
then(response => {
  if (response.fail) {
    return fetchTranscript().
    then(() => loadCourses(parseToJson(document))).
    then(response => insertPresentation(response.fail ? {fail: true} : response, document))
  } else {
    return insertPresentation(response, document);
  }
});
