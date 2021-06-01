import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import {createDeleteUserInfoAction} from "../../redux/action_creators/login_action"

@connect(
  state=>({userInfo:state.userInfo}),
  {
    deleteUserInfo:createDeleteUserInfoAction
  }
)
class Admin extends Component{
//在render里，若想实现跳转，最好用<Redirect></Redirect>
logout =()=>{
     this.props.deleteUserInfo();
}
  render(){
    const {user,isLogin}=this.props.userInfo;
     if(!isLogin){
          // this.props.history.replace("/login")
          // return null
          return <Redirect to="/login"/>
     }else{
      return (
        <>
      <div>我是{user.username}</div>
      <button onClick={this.logout}>退出登录</button>
      </>
      )
     }
  }
}

export default Admin;
// export default connect(
//   state=>({userInfo:state.userInfo}),
//   {
//     deleteUserInfo:createDeleteUserInfoAction
//   }
// )(Admin)