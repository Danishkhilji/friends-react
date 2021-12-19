import React from 'react'
import { Card,Col,Row } from 'antd';
import SettingForm from '../../setting/settingForm/SettingForm';

const { Meta } = Card;
const ProfileCard = (props) => {

    console.log(props.image);

    return (
        <div>
        
                <h1>User Profile</h1>    
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src={`${props.image}`} />}
                    >
                        
                        <Meta title={'Name : ' + props.UserName} description={'Bio : ' + props.Bio} />
                    </Card>
                
        </div>
    )
}

export default ProfileCard