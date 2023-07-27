import { useState, useEffect } from "react";
import { API_HOST } from "./constants/constants";

async function fetchData(setData, xx) {
  const url = `${API_HOST}/user/signin`;
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    provider: "facebook",
    access_token: `${xx.authResponse.accessToken}`,
    // 要傳遞的請求主體資料
  };

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetch(url, options);
  const data = await res.json();

  setData(data);
}

const useFacebookLogin = ({ appId, cookie, xfbml, version }) => {
  const [response, setResponse] = useState();
  const [data, setData] = useState(null);

  // 載入 Facebook SDK 並完成 init 的動作
  useEffect(() => {
    // SDK 載入完成時會立即呼叫 fbAsyncInit
    window.fbAsyncInit = function () {
      // 初始化 Facebook SDK
      window.FB.init({
        appId: process.env.REACT_APP_FB_APP_ID,
        cookie: true,
        xfbml: true,
        version: process.env.REACT_APP_FB_APP_VERSION,
      });

      // console.log('[fbAsyncInit] after window.FB.init');

      // 取得使用者登入狀態
      window.FB.getLoginStatus((response) => {
        // console.log('[getLoginStatus]', response);
        setResponse(response);
      });

      window.FB.AppEvents.logPageView();
    };

    // 載入 Facebook SDK
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, [appId, cookie, xfbml, version]);

  // 使用者點擊登入
  const handleFBLogin = () => {
    window.FB.login(
      function (response) {
        console.log("handleFBLogin", response);
        fetchData(setData, response);
        setResponse(response);
      },
      { scope: "public_profile,email" }
    );
  };

  // 使用者點擊登出
  const handleFBLogout = () => {
    window.FB.logout(function (response) {
      console.log("handleFBLogout", response);
      setResponse(response);
    });
  };

  return [data, response, handleFBLogin, handleFBLogout];
};

export default useFacebookLogin;
