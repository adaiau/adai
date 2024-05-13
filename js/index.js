// 判断是否有用户登录 如果没有 转到登录页面  有登陆就获取聊天历史

(async function () {
  const resp = await API.profile();
  //   console.log(resp);
  const user = resp.data;
  if (!user) {
    alert("未登录或登录已失效，请重新登录");
    location.href = "./login.html";
    return;
  }

  // 登陆成功后 的页面显示
  const doms = {
    aside: {
      nickname: $("#nickname"),
      loginId: $("#loginId"),
    },
    close: $(".close"),
  };

  setUserInfo();

  // 用户注销
  doms.close.onclick = function () {
    API.loginOut();
    location.href = "./login.html";
  };

  // 设置用户信息
  function setUserInfo() {
    doms.aside.nickname.innerText = user.nickname;
    doms.aside.loginId.innerText = user.loginId;
  }

  // 添加一条消息
})();
