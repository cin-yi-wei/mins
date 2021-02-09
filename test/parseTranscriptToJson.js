const PATH = `${__dirname}/../src/content_script/ntu/parseTranscriptToJson.js`;
let assert = require('assert');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let program = fs.readFileSync(PATH, 'utf8');
eval(program.substring(program.indexOf('\n') + 1));
const { document } = (new JSDOM(fs.readFileSync(`${__dirname}/assets/ntu_transcript_bachelor.htm`, 'utf8'))).window;
let bachelor_json = JSON.parse(fs.readFileSync(`${__dirname}/assets/ntu_transcript_bachelor.json`, 'utf8'));

describe('parseTranscriptToJson', () => {
  it('should parse transcript to json', () => {
    assert.deepEqual(parseTranscriptToJson(document), bachelor_json);
  });
});
