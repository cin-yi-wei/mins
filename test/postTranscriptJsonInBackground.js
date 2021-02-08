const PATH = `${__dirname}/../src/content_script/ntu/postTranscriptJsonInBackground.js`;
let assert = require('assert');
let program = require('fs').readFileSync(PATH, 'utf8');
eval(program.substring(program.indexOf('\n') + 1));



describe('postTranscriptJsonInBackground', () => {
  it('should post transcript json in background');
});
