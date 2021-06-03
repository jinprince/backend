import React, { Component } from 'react';
import './css/header.less';
import {Icon,Button,Modal} from "antd";
import screenfull from 'screenfull';
import {connect} from "react-redux";
import dayjs from "dayjs";
import menuList from '../../../config/menu_config';
import {createDeleteUserInfoAction} from "../../../redux/action_creators/login_action";
import axios from 'axios';
import {withRouter} from "react-router-dom";
const { confirm } = Modal;

//在非路由组件中使用路由组件的api



@connect(
    state=>({userInfo:state.userInfo,title:state.title}),
    { deleteUserInfo:createDeleteUserInfoAction}
)
@withRouter
class Header extends Component {
    state={
        isFull:false,
        date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
        weather:[],
        title:''
    }
    getTitle=()=>{
        let pathKey=this.props.location.pathname.split("/").reverse()[0];
        let title='';
        menuList.forEach((item)=>{
            if(item.children instanceof Array){
                let temp=item.children.find((citem)=>{
                    return citem.key===pathKey;
                })
                if(temp) title=temp.title
            }else{
                if(pathKey===item.key) title=item.title
            }
        })
        this.setState({
            title
        })
    }




    fullscreen=()=>{
        // screenfull.request();
        //切换全屏按钮得回调
        screenfull.toggle();
        }
        componentDidMount(){
            // console.log(this.props)
            this.getTitle()
            //给screenfull绑定监听
           this.change=screenfull.on('change',()=>{
                this.setState({
                    isFull:!this.state.isFull
                })
            })
            this.timeID=setInterval(()=>{
             this.setState({
                 date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')
             })
            },1000)
            //获取天气数据
            // axios.get("https://api.apishop.net/common/weather/get15DaysWeatherByArea?apiKey=dKpDlIBfa027cdc216ac5b57dbdcee408698ea9d4f1e143&area=深圳").then(res=>{
            //     this.setState({
            //         weather:res.data.result.dayList[0]
            //     })
            //     // console.log(res.data.result.dayList[0])
            // })
            axios.get("https://api.apishop.net/common/weather/get14DaysWeatherByArea?apiKey=dKpDlIBfa027cdc216ac5b57dbdcee408698ea9d4f1e143&area=深圳").then(res=>{
                this.setState({
                    // weather:res.data.result.dayList[0]
                })
                // console.log(res.data.result.dayList[0])
            })
        }
        componentWillUnmount(){
            clearInterval(this.timeID);
        }

     //点击退出登录的回调
     logOut=()=>{
        confirm({
            title: '确定退出?',
            content: '若退出需要重新登录',
            cancelText:"取消",
            okText:"确认",
            onOk:()=>{
            this.props.deleteUserInfo();
            },
            onCancel() {},
          });
     }
    render() {
        let {user}=this.props.userInfo
        const {day_weather,day_weather_pic,day_air_temperature}=this.state.weather;
        return (
            <header className="header">
               <div className="header-top">
                   <Button size="small" onClick={this.fullscreen}>
                   <Icon type={this.state.isFull?"fullscreen-exit":"fullscreen"}/>
                   </Button>
                   <span className="username" >欢迎，{user.username}</span>
                   <Button type="link" onClick={this.logOut}>退出登录</Button>
               </div>
               <div className="header-bottom">
                   <div className="header-bottom-left">{this.props.title||this.state.title}</div>
                   <div className="header-bottom-right">{this.state.date}
                   <img src={day_weather_pic} alt="天气信息"/>天气:{day_weather}&nbsp;温度：{day_air_temperature}°
                   </div>
               </div>
            </header>
        );
    }
}

export default Header;
