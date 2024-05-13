const API = (function () {
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN = "token";

  // GET
  function get(path) {
    const headers = {};
    // 在localstorage中 有没有 token 有 就加入headers
    const token = localStorage.getItem(TOKEN);
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return (resp = fetch(BASE_URL + path, { headers }));
  }

  // POST
  function post(path, bodyObj) {
    const headers = {
      "Content-Type": "application/json",
    };
    // 在localstorage中 有没有 token 有 就加入headers
    const token = localStorage.getItem(TOKEN);
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(BASE_URL + path, {
      headers,
      method: "POST",
      body: JSON.stringify(bodyObj),
    });
  }

  // 注册
  async function reg(userInfo) {
    const resp = await post("/api/user/reg", userInfo);

    return await resp.json();
  }

  // 登录
  async function login(loginInfo) {
    const resp = await post("/api/user/login", loginInfo);
    const body = await resp.json();

    // 如果登录成功  将用户令牌 存放到 localstorage中
    if (body.code === 0) {
      // 获取 用户令牌
      const token = resp.headers.get("Authorization");
      localStorage.setItem(TOKEN, token);
    }
    // console.log(localStorage);

    return body;
  }

  // 账号验证
  async function exists(loginId) {
    const resp = await get("/api/user/exists?loginId=" + loginId);
    return await resp.json();
    // console.log(await resp.json());
  }

  // 当前用户信息
  async function profile() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }

  // 发送聊天消息
  async function sendChat(content) {
    const resp = await post("/api/chat", {
      content,
    });

    return resp.json();
  }

  // 获取聊天记录
  async function getHistory() {
    const resp = await get("/api/chat/history");

    return resp.json();
  }

  // 注销
  function loginOut() {
    localStorage.removeItem(TOKEN);
  }

  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
  };
})();
