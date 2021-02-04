
if (location.pathname == '/' || location.pathname == '/Default.aspx'|| location.pathname == '/hissco/main_stu.asp') {
  chrome.runtime.sendMessage({ action: "SendScoreNtu" });
}
