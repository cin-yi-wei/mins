const PATH = `${__dirname}/../src/content_script/ntu/parseTranscriptToJson.js`;
let assert = require('assert');
let fs = require('fs');
let program = fs.readFileSync(PATH, 'utf8');
eval(program.substring(program.indexOf('\n') + 1));

let doc = fs.readFileSync(`${__dirname}/assets/ntu_transcript_bachelor.htm`, 'utf8');
let bachelor_json = JSON.parse(fs.readFileSync(`${__dirname}/assets/ntu_transcript_bachelor.json`, 'utf8'));

describe('parseTranscriptToJson', () => {
  it('should parse transcript to json', () => {
    assert.equal(parseTranscriptToJson(doc), bachelor_json);
  });
});
