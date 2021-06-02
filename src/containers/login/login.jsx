import React, { Component } from 'react'
import {connect} from "react-redux";
import {createSaveUserInfoAction} from "../../redux/action_creators/login_action"
import {reqLogin} from "../../api/index";
import './css/login.less';
import logo from './images/logo.png'
import { Form, Icon, Input, Button, message } from 'antd';
import { Redirect } from 'react-router';
const {Item} = Form;

@connect(
  state=>({isLogin:state.userInfo.isLogin}),
  {
    saveUserInfo:createSaveUserInfoAction,
  }
)
@Form.create()
class Login extends Component {
  handleSubmit = (event) => {
    //点击登录按钮的回调
    event.preventDefault();//阻止默认事件--禁止form表单提交---提供ajax发送请求
    this.props.form.validateFields(async(err,value) => {
      if (!err) {
        const {username,password}=value;
        // console.log(values)
        // const {username,password}=value;
        // console.log({username,password})
        let result=await reqLogin(username,password);
        const {status,msg,data}=result;
        if(status===0){
          console.log(data);
          this.props.saveUserInfo(data);
          this.props.history.replace("/admin/home")
         
        }else{
          message.warning(msg,1);
        }
        
        // console.log('Received values of form: ', values);
      }else{
        message.error("表单输入有误，请检查")
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
    const {getFieldDecorator} = this.props.form;
    const {isLogin} =this.props;
     if(isLogin){
      //  如果已经登录了
      return <Redirect to="/admin"/>
     }
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
              getFieldDecorator('username',{
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
              getFieldDecorator('password',{
                rules: [{validator:this.pwdValidator}],
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

export default Login;
// export default connect(
//   state=>({isLogin:state.userInfo.isLogin}),
//   {
//     saveUserInfo:createSaveUserInfoAction,
//   }
// )(Form.create()(Login))