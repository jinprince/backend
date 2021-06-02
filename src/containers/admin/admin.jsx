import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Redirect,Route,Switch} from 'react-router';
import {createDeleteUserInfoAction} from "../../redux/action_creators/login_action"
import "../admin/css/admin.less";
import Header from './header/header'
import Home from "../../components/home/home";
import Category from "../category/category";
import Product from "../product/product";
import User from '../user/user';
import Role from "../role/role";
import Bar from "../bar/bar"
import Pie from "../pie/pie";
import Line from "../line/line";
import LeftNav from "../admin/left_nav/left_nav";
import { Layout } from 'antd';
const {Footer, Sider, Content } = Layout;




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
    const {isLogin}=this.props.userInfo;
     if(!isLogin){
          // this.props.history.replace("/login")
          // return null
          return <Redirect to="/login"/>
     }else{
      return (
        <Layout className="admin">
          <Sider className="sider">
           <LeftNav/>
          </Sider>
            <Layout>
            <Header className="header">Header</Header>
            <Content className="content">
              <Switch>
              <Route path="/admin/home" component={Home}></Route>
              <Route path="/admin/prod_about/category" component={Category}></Route>
              <Route path="/admin/prod_about/product" component={Product}></Route>
              <Route path="/admin/user" component={User}></Route>
              <Route path="/admin/role" component={Role}></Route>
              <Route path="/admin/charts/bar" component={Bar}></Route>
              <Route path="/admin/charts/line" component={Line}></Route>
              <Route path="/admin/charts/pie" component={Pie}></Route>
              <Redirect to="/admin/home"/>
              </Switch>
            </Content>
            <Footer className="footer">
               推荐使用谷歌浏览器，获取最佳用户体验
            </Footer>
      </Layout>
    </Layout>
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