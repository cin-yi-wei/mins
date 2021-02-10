'use strict';
/*
chrome.runtime.onInstalled.addListener(function(install) {
  //code for installation
  chrome.tabs.create({
      "url": "https://sites.google.com/view/mins-policy/home"
  }, function(tab) {
    window.alert("當您使用我們的服務，即表示您同意本條款，因此請務必詳閱本條款內容。")
  });
});
*/
/*
async function doSomethingWith(message, sender, sendResponse) {
  let handler = Object.create(Handler);
  var response = await handler[message.action](message, sender, sendResponse).then( v =>{return v;} );
  console.log(response);
  return response;
}
*/
function asChromeListener(listener) {
  return (message, sender, sendResponse) => {
    const returnValue = listener(message, sender);
    if (isPromise(returnValue)) {
      returnValue.then( (v) => {sendResponse(v)} );
      return true;
    }
    else {
      if (typeof returnValue !== 'undefined') {
        sendResponse(returnValue);
      }
      return false;
    }
  };
}

function isPromise(value) {
  return typeof value === 'object' && value !== null && 'then' in value && 'catch' in value;
}

chrome.runtime.onMessage.addListener(asChromeListener(async (message) => {
  let handler = Object.create(Handler);
  return await handler[message.action](message);
}));

/*
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) =>{
  //let handler = new Handler();
  //let response = await handler[message.action](message, sender, sendResponse);

  let handler = Object.create(Handler);
  var response = await handler[message.action](message, sender, sendResponse); //.then(sendResponse)
  sendResponse(response);
  return true;
});
*/
