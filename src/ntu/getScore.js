'use strict'
function parseTranscript(doc) {
  const ntuServer = 'https://ifsel3.aca.ntu.edu.tw';
  const student_id_regex = /[^\A-Z]([ABCDEFHJKNPQRSTYZ]\d{2}[1-9ABE][0-4]\d[0-3]\d{2})[^\d]/i;
  const course_id_regex = /\b\d{3}[12]0[a-zA-CEFHJ-Z ][a-zA-Z ]{1,5}[1-8]\d{3}(-\w{2})?\b/;
  const score_regex = /\b(A+|A|A-|B+|B|B-|C+|C|C-|F|X)\b/;

  let courses = {};
  let enrollment = {};

  const tables = doc.querySelectorAll("tr");
  const student_id = Array.prototype.slice.call(doc.querySelectorAll('*')).map(element => {
    let ret = element.outerHTML.match(student_id_regex);
    if (!ret || !ret[1]) return false;
    else return ret[1].toUpperCase();
  }).filter(b => b).reduce((current, num) => {
    const freq = (num in current.numMap) ? ++current.numMap[num] : (current.numMap[num] = 1)
      if (freq > current.modeFreq && freq > 1){
        current.modeFreq = freq
        current.mode = num
      }
    return current;
  }, { mode: null, modeFreq: 0, numMap: {} }).mode;
  let idx = {"學年/學期": 0, "課號": 0, "班次": 0, "學分": 0, "課程名稱": 0, "成績": 0};
  for (let row of tables) {
    let td = row.children;
    for (let j = 0; j < td.length; ++j) {
      let text = td[j].innerText.trim();
      if (text in idx) idx[text] = j;
    }
    if (Math.max(...Object.values(idx)) < td.length) {
      let year_semester = td[idx["學年/學期"]].innerText.trim().replace('上', '10').replace('下', '20');
      let course_number = td[idx["課號"]].innerText.trim();
      let class_number = td[idx["班次"]].innerText.trim();
      let course_id = year_semester + course_number + (class_number ? '-' + class_number : "");
      let title = td[idx["課程名稱"]].innerText.trim();
      let credit = parseInt(td[idx["學分"]].innerText, 10);
      let score = td[idx["成績"]].innerText.trim();
      if (course_id_regex.test(course_id) && score_regex.test(score) && !isNaN(credit)) {
        courses[course_id] = {
          "score": score,
          "title": title
        };
      }
    }
  }
  enrollment = {
    "university": "NTU",
    "student": student_id,
    "courses": courses
  };
  return enrollment;
}

async function getHTMLDoc(uri) {
  let ASPSESSIONIDQCTRBDCS = '';
  let TS011fd52e = '';
  var output = [];
  chrome.cookies.getAll({
    url  : 'https://ifsel3.aca.ntu.edu.tw/'
  }, function(cookies){
    console.log("cookies",cookies);
    for (var i = 0; i < cookies.length; i++) {
      var name   = cookies[i].name;
      var value  = cookies[i].value;
      if(name == 'ASPSESSIONIDQCTRBDCS') ASPSESSIONIDQCTRBDCS = value;
      if(name == 'TS011fd52e') TS011fd52e = value;
      console.log(name,value);
    }
  });
  let response = await fetch(uri, {
  headers: {'Content-Type': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9','Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7','User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36','Accept-Encoding': 'gzip, deflate, br','Cache-Control': 'max-age=0','Connection': 'keep-alive','Host': 'ifsel3.aca.ntu.edu.tw','Referer': 'https://ifsel3.aca.ntu.edu.tw/hissco/index.asp','sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"','sec-ch-ua-mobile': '?0','Sec-Fetch-Dest': 'document','Sec-Fetch-Mode': 'navigate','Sec-Fetch-Site': 'same-origin','Sec-Fetch-User': '?1','Upgrade-Insecure-Requests': '1','Cookie':"ASPSESSIONIDQCTRBDCS:"+ASPSESSIONIDQCTRBDCS+";"+"TS011fd52e:"+TS011fd52e},
  credentials: "same-origin"});
  let buffer = await response.arrayBuffer();
  let decoder = new TextDecoder("utf-8");// big5
  let text = decoder.decode(buffer);
  let parser = new DOMParser();
  return parser.parseFromString(text, "text/html");
}

async function getScoreNtu() {

  let doc = await getHTMLDoc(`https://ifsel3.aca.ntu.edu.tw/hissco/main_stu.asp`);
  console.log(doc);
  console.log(parseTranscript(doc));
  return parseTranscript(doc);
}
//let response=await fetch(`https://ifsel3.aca.ntu.edu.tw/hissco/main_stu.asp`, {credentials: "same-origin"});