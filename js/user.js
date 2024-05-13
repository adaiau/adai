// 登录和注册框的通用验证

/**
 *  validatorFunc  表示验证规则
 */
class FieldValidator {
  constructor(idTxt, validatorFunc) {
    this.input = $("#" + idTxt);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;

    // 焦点事件
    this.input.onblur = () => {
      // 调用验证函数
      this.validate();
      // console.log(this.input, this.p, this.input.value);
    };
  }

  // 验证函数
  /**
   * 成功 返回true 失败 返回false
   * @returns
   */
  async validate() {
    const err = await this.validatorFunc(this.input.value);
    // console.log(err);
    // console.log("2");
    if (err) {
      // 有错误
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }

  // 静态方法  用于直接调用(表单提交)  不用new
  /**
   * 对传入的验证器统一的验证 如果全部通过 返回true 如果有一个为FALSE 则为false
   * @param  {FieldValidator[]} validators
   */
  static async validate(...validators) {
    const proms = validators.map((v) => v.validate());
    console.log(proms);
    const results = await Promise.all(proms);
    console.log(results);
    return results.every((r) => r);
  }
}

// const txtNickname = new FieldValidator("txtNickname");
// const txtLoginPwd = new FieldValidator("txtLoginPwd");
// const password = new FieldValidator("txtLoginPwdConfirm");

// function text() {
//   FieldValidator.validate(
//     txtLoginIdVali,
//     txtNicknameVali,
//     txtLoginPwdVali,
//     passwordVali
//   ).then((results) => {
//     console.log(results);
//     // return results;
//   });
// }
