'use strict'
fetchTranscript().
then(response => loadCourses(parseToJson(document))).
then(response => insertPresentation(response.fail ? {fail: true} : response, document))
