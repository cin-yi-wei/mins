'use strict'
//console.log(location.pathname == '/ccxp/INQUIRE/*',location.pathname == '/ccxp/INQUIRE/select_entry.php' );
//console.log(location.pathname);

  //"https://www.ccxp.nthu.edu.tw/ccxp/INQUIRE/*"

//if (location.pathname == '/ccxp/INQUIRE/*' || location.pathname == '/ccxp/INQUIRE/select_entry.php') {

const authMSG = '[NTHU_ScoreSharing]\n\n您是否同意傳送您的資料至 NTHU_ScoreSharing?';

if (location.pathname == '/ccxp/INQUIRE/top.php') {
  console.log("top.php",location.pathname);


  let params = new URLSearchParams(location.search);
  let ccxpAccount = params.get('account');
  let ccxpToken = params.get('ACIXSTORE');

  chrome.runtime.sendMessage({
    action: "SuccessLogin",
    ccxpAccount
  }, function (response) {
    let isAuth = response.agreeUpload;
    if (isAuth || confirm(authMSG)) {
      if (isAuth == false) {
        chrome.runtime.sendMessage({ action: "Auth", ccxpAccount });
      }
      chrome.runtime.sendMessage({ action: "SendScore", ccxpAccount, ccxpToken });
    }
  });

}



//}
