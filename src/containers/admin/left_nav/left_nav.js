import React, { Component } from 'react';
import { Menu, Icon} from 'antd';
import {Link,withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {createSaveTitleAction} from "../../../redux/action_creators/menu_action";
import menuList from '../../../config/menu_config';
import logo from "../../../static/img/logo.png"
import './left_nav.less';
const { SubMenu } = Menu;
@connect(
    state=>({}),
    {saveTitle:createSaveTitleAction}
)
@withRouter
class LeftNav extends Component {
    createMenu=(target)=>{
        // console.log(target)
        return target.map((item)=>{
            // console.log(item.children)
            if(!item.children){
                return (
                 <Menu.Item key={item.key} onClick={()=>{this.props.saveTitle(item.title)}}>
                  <Link to={item.path}>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                  </Link>
                </Menu.Item>
                )
            }else{
                return (
                <SubMenu
                key={item.key}
                title={
                  <span>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </span>
                }
              >
                  {this.createMenu(item.children)}
              </SubMenu>
                )
            }
        })
    }
    render() {
        return (
            <div>
                <header className="nav_header">
                    <img src={logo} alt="logo"/>
                    <h1>商品管理系统</h1>
                </header>
        <Menu
          selectedKeys={this.props.location.pathname.split("/").reverse()[0]}
          defaultOpenKeys={this.props.location.pathname.split("/").splice(2)}
          mode="inline"
          theme="dark"
        >
            {
                this.createMenu(menuList)
            }
        </Menu>
      </div>
        );
    }
}

export default LeftNav;
