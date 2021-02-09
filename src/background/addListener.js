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

async function doSomethingWith(message, sender, sendResponse) {
  let handler = new Handler();
  let response = await handler[message.action](message, sender, sendResponse);
  console.log(response);
  return response;
}

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

  /*let handler = Object.create(Handler);
  var response = handler[message.action](message, sender, sendResponse).then( v =>{return v;} );
*///sendResponse( "1" );
  //let handler = new Handler();
  //let response = await handler[message.action](message, sender, sendResponse);
  let wait = await doSomethingWith(message, sender, sendResponse)
  sendResponse(wait);

  //sendResponse(  response )
//  console.log(response);
  //sendResponse( "1" ); //{response: response}
  /*
  setTimeout(function(){
    console.log("2",response);
});
*/
  return true;
});
