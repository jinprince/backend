import React, { Component } from 'react';
import { Button, Card,Icon,List } from 'antd';
import './detail.less'
const {Item} =List;
class Detail extends Component {
    render() {
        return (
            // <div>
            //     {/* 商品详情{this.props.match.params.id} */}
            // </div>
            <Card title=
            {<div>
                <Button type="link">
                <Icon type="arrow-left" style={{fontSize:"20px"}} />
                <span>商品列表</span>
                </Button>
            </div>}
            extra={<a href="#">More</a>}>
             <List>
                 <Item>
                     <span className="prod-name">商品名称: </span>
                     <span>Apple 2019新品 MacBook Pro 15.4	</span>
                 </Item>  
             </List>
            </Card>
        );
    }
}

export default Detail;
