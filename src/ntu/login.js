if (location.pathname == '/' || location.pathname == '/Default.aspx') {
  chrome.runtime.sendMessage({ action: "SendScoreNtu" });
}
