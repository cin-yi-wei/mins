const PATH = `${__dirname}/../src/content_script/ntu/getCourseJsonFromApi.js`;
let assert = require('assert');
let program = require('fs').readFileSync(PATH, 'utf8');
eval(program.substring(program.indexOf('\n') + 1));




describe('getCourseJsonFromApi', () => {
  it('should get course json from API');
});
