import React from 'react'
import { Card } from 'antd';
const { Meta } = Card;
const PostCard = (props) => {
    return (
        <div>
        
                    
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src={`${props.image}`} />}
                    >
                        
                        <Meta title={'Details : ' + props.Details} />
                    </Card>
                
        </div>
    )
}

export default PostCard