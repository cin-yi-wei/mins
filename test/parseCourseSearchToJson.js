const PATH = `${__dirname}/../src/content_script/ntu/parseCourseSearchToJson.js`;
let assert = require('assert');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let program = fs.readFileSync(PATH, 'utf8');
eval(program.substring(program.indexOf('\n') + 1));
const { document } = (new JSDOM(fs.readFileSync(`${__dirname}/assets/ntu_coursesearch_example.htm`, 'utf8'))).window;
let bachelor_json = JSON.parse(fs.readFileSync(`${__dirname}/assets/ntu_coursesearch_example.json`, 'utf8'));

describe('parseCourseSearchToJson', () => {
  it('should return insert presnetaion to DOM', () => {
    assert.deepEqual(parseCourseSearchToJson(document), bachelor_json);
  });
});
