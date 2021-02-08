const PATH = `${__dirname}/../src/content_script/ntu/InsertPresnetaionToDomObject.js`;
let assert = require('assert');
let program = require('fs').readFileSync(PATH, 'utf8');
eval(program.substring(program.indexOf('\n') + 1));



describe('InsertPresnetaionToDomObject', () => {
  it('should return insert presnetaion to DOM');
});
