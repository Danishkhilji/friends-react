import PostCard from "./PostCard"
import { db,collection } from "../../../firebase/config"
import { useState,useEffect,useContext } from "react"
import { query,where,onSnapshot } from "firebase/firestore"
import { AuthContext } from "../../../routes/Auth"


const PostDisplay=()=>{

const [PostimageUrl,setPostimageUrl] = useState()
const [PostDetails,setPostDetails] = useState()                    
const [AllPost,setAllPost] = useState([])
const User = useContext(AuthContext);

    useEffect(()=>{
        const q = query(collection(db, "postData"), where("userId", "==", User.currentUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
              data.push(doc.data());
          });
          setAllPost(data);
        });
        
      },[])
      console.log("Current post: ", AllPost);
return(
<div>
{AllPost.map((elem)=>{
return (
        <PostCard image={elem.imageUrl} Details={elem.postText}></PostCard>
)

})}
</div>


)}

export default PostDisplay;