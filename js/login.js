var txtLoginIdVali = new FieldValidator("txtLoginId", (val) => {
  if (!val) {
    return "账号不能为空";
  }
});

var txtLoginPwdVali = new FieldValidator("txtLoginPwd", (val) => {
  if (!val) {
    return "密码不能为空";
  }
});

const form = $(".user-form");
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = FieldValidator.validate(txtLoginIdVali, txtLoginPwdVali);
  if (!result) {
    // 登录失败
    return;
  }

  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData.entries());
  const resp = await API.login(formObj);
  console.log(resp);
  if (resp.code === 0) {
    alert("登录成功，点击确定进入");
    location.href = "./index.html";
  } else {
    alert("账号或密码错误");
  }
};
