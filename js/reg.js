var txtLoginIdVali = new FieldValidator("txtLoginId", async (val) => {
  // console.log("1");
  const resp = await API.exists(val);
  // console.log(val);

  // console.log(resp);
  // 如果 data 值为true  则账号已存在
  if (resp.data) {
    return "账号已存在";
  }

  if (!val) {
    return "账号不能为空";
  }
});

var txtNicknameVali = new FieldValidator("txtNickname", (val) => {
  if (!val) {
    return "昵称不能为空";
  }
});

var txtLoginPwdVali = new FieldValidator("txtLoginPwd", (val) => {
  if (!val) {
    return "密码不能为空";
  }
});

var passwordVali = new FieldValidator("txtLoginPwdConfirm", (val) => {
  if (val !== txtLoginPwdVali.input.value) {
    return "两次密码不一致";
  }
  if (!val) {
    return "还未确认密码";
  }
});

const form = $(".user-form");
// console.log(form[4]);
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validate(
    txtLoginIdVali,
    txtNicknameVali,
    txtLoginPwdVali,
    passwordVali
  );
  // console.log(result);
  if (!result) {
    // 验证未通过
    return;
  }
  // 得到表单里面的数据
  const formData = new FormData(form);
  const dataObj = Object.fromEntries(formData.entries());

  const resp = await API.reg(dataObj);
  // 如果 code === 0 响应成功
  if (resp.code === 0) {
    alert("注册成功，点击确认跳转到登录界面登录");
    location.href = "./login.html";
  }
};
// const formData = new FormData(form);
// console.log(Object.fromEntries(formData.entries()));
