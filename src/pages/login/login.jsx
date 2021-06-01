import React, { Component } from 'react'
import './css/login.less'
import logo from './images/logo.png'
import { Form, Icon, Input, Button } from 'antd';
const {Item} = Form;
class Login extends Component {
  handleSubmit = (event) => {
    //点击登录按钮的回调
    event.preventDefault();//阻止默认事件--禁止form表单提交---提供ajax发送请求
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  pwdValidator=(rule,value,callback)=>{
    if(!value){
      callback('密码必须输入')
    }else if(value.length<4){
      callback('密码必须大于等于4位')
    }else if(value.length>12){
      callback('密码必须小于等于12位')
    }else if(!(/^\w+$/).test(value)){
      callback('密码必须是英文、数字或下划线组成')
    }else{
      callback()
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="login">
        <header>
          <img src={logo} alt="login" />
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          {/* 以后会加上antd的form组件 */
             /*
        用户名/密码的的合法性要求
        1). 必须输入
        2). 必须大于等于4位
        3). 必须小于等于12位
        4). 必须是英文、数字或下划线组成
       */
          }
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
              getFieldDecorator('username', {
             rules: [
                  { required: true, message: '用户名必须输入！' },
                  { min: 4, message: '必须大于等于4位！' },
                  { max: 12, message: '必须小于等于12位！' },
                  { pattern: /^\w+$/, message: '必须是英文、数字或下划线组成！' },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />
              )}
            </Item>
            <Item>
              {
              getFieldDecorator('password', {
                rules: [{ validator:this.pwdValidator}],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
          </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}
export default Form.create()(Login)