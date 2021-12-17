import React from 'react'
import { Card } from 'antd';

const { Meta } = Card;
const ProfileCard = (props) => {

    console.log(props.image);

    return (
        <div>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src={`${props.image}`}/>}
                    >
                        <Meta title={'Name : ' + props.UserName} description={'Bio : ' + props.Bio} />
                    </Card>
        </div>
    )
}

export default ProfileCard