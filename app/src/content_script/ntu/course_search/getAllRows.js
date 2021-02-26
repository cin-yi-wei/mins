'use strict'
function getAllRows(doc) {
  return [...doc.querySelectorAll('tr[align="center"]:not([bgcolor="#DDEDFF"])')];
}
