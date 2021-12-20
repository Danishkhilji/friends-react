import { storage ,db,setDoc,addDoc,collection,doc,getDownloadURL,ref,uploadBytesResumable,auth} from '../../../firebase/config';
import { Form, Input, Button,Switch, Col} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import { useContext,useEffect,useRef, useState } from "react"; 
import { AuthContext } from '../../../routes/Auth';
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const formTailLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 6,
    offset: 14,
  },
};



function PostForm() {
  
  const currentUser = useContext(AuthContext)

    const postText = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress,setProgress]=useState(0);
    const [IsPublic,setIsPublic]=useState(true)

    const CurrentUser= currentUser.currentUser.uid;
   
    console.log(CurrentUser)

     const formHandler = async (e) => {
      
      uploadFiles(selectedFile);        
   
      };

      const uploadFiles = (file) => {
        if (!file) return;
        const sotrageRef = ref(storage, `post/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);
          uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  setProgress(prog);
                },
                (error) => console.log(error),
                () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    const textPost = (postText.current.resizableTextArea.textArea.value);
           
                    const postData = {
                     postText: textPost,
                      imageUrl:downloadURL,
                      ispublic:IsPublic,
                      userId:CurrentUser
                    };
                    addDoc(collection(db, "postData"),postData);
                    
                  });
                }
              );

        }; 
        function switchHandler(checked) {
            console.log(`${checked}`);
            setIsPublic(checked)

          }

      
  return (
    <div >

    <Form onFinish={formHandler} >
         
      <Switch checkedChildren="Public" unCheckedChildren="Private" defaultChecked onChange={switchHandler} />  
     <Form.Item
        {...formItemLayout}
        name="image"
       
      >
            
            <input type="file" className="input" onChange={(e)=>{
      setSelectedFile(e.target.files[0]);
    }} />
      </Form.Item> 
      
      <Form.Item
        {...formItemLayout}
        name="bio"
    
        rules={[
          {
            required: true,
            message: 'Write somting about you ',
          },
        ]}
      >
          <TextArea rows={2} ref={postText} />
      </Form.Item>
     

      <Form.Item {...formTailLayout}>
        <Button type="primary" htmlType="submit">
          Post
        </Button>
      </Form.Item>
    </Form>
    <hr />
      <h3>Posting done {progress}%</h3>

    </div>
  );
}

export default PostForm;
