import React from 'react'
import { Row,Col,Card } from 'antd';
import ProfileCard from './ProfileCard/card';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config"
import { useContext,useState } from 'react';
import {AuthContext} from "../../routes/Auth"
import PostForm from './postForm/PostFrom';
import PostCard from './PostCard/PostCard';
import { collection ,query,where} from 'firebase/firestore';

const { Meta } = Card;
const Profile = () => {
    const [imageUrl,setImageUrl] = useState()
    const [userName,setUserName] = useState()
    const [userBio,setuserBio] = useState()
    const [AllPost,setAllPost] = useState()
    const [PostimageUrl,setPostimageUrl] = useState()
    const [PostDetails,setPostDetails] = useState()
    
const User = useContext(AuthContext);


const user = onSnapshot(doc(db, "usersData", User.currentUser.uid), (doc) => {
    const data=doc.data();
    setImageUrl(data.imageUrl)
    setUserName(data.name)
    setuserBio(data.bio)

});

//  const q = query(collection(db, "postData"), where("userId", "==", User.currentUser.uid));
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   const cities = [];
//   querySnapshot.forEach((doc) => {
//       cities.push(doc.data());
//   });
//   console.log("Current post: ", cities);
// });

// const post =    onSnapshot(collection(db, "postData"), (snapshot) => {

//       //   setAllPost(snapshot.docs.map(doc => doc.data()))
//       //  console.log(post)
// });


    return (
        <div>
                  <Row type="flex" justify="center"  style={{minHeight: '100vh'}}>
                    <Col offset={18} >
                      <ProfileCard image={imageUrl}  UserName={userName} Bio={userBio} ></ProfileCard>
                      <hr/>
                      <h2> Post here</h2>
                      <PostForm/>
                    </Col>
                    <PostCard image={PostimageUrl} Details={PostDetails} ></PostCard>
                 
                  </Row>
        </div>
    )
}

export default Profile





