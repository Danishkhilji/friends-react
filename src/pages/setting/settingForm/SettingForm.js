import { storage ,db,updateDoc,doc,getDownloadURL,ref,uploadBytesResumable,auth} from '../../../firebase/config';
import { Form, Input, Button,Col,Row } from 'antd';
import { useContext,useRef, useState } from "react"; 
import { AuthContext } from '../../../routes/Auth';

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



function SettingForm() {
  
  const currentUser = useContext(AuthContext)
  const Name = useRef(null);
    const bio = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress,setProgress]=useState(0);
    const [imageUrl,setImageUrl]=useState();
    // const [CurrentUser,setCurrentUser]=useState('');

    const CurrentUser= currentUser.currentUser.uid;
   
    console.log(CurrentUser)

     const formHandler = async (e) => {
      
      uploadFiles(selectedFile);        
   
      };

      const uploadFiles = (file) => {
        if (!file) return;
        const sotrageRef = ref(storage, `files/${file.name}`);
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
                    setImageUrl(downloadURL);
                    console.log("File available at", downloadURL);
                    const userName = (Name.current.input.value);
                    const userBio = (bio.current.input.value);            
                    const profileData = {
                      name: userName,
                      bio: userBio,
                      imageUrl:downloadURL
                    };
                    updateDoc(doc(db, "usersData", CurrentUser),profileData);

                    
                    // profileUpload();
                  });
                }
              );

        }; 
      // const profileUpload=async()=>{
      //   const userName = (Name.current.input.value);
      //   const userBio = (bio.current.input.value);
      //         // Add a new document in collection "cities"
                
      //         await updateDoc(doc(db, "usersData", CurrentUser), {
                 
      //         });
          

        // }
      
  return (
    <div >
        <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
<Col  >
    <Form onFinish={formHandler} >
   

     <Form.Item
        {...formItemLayout}
        name="image"
        label="Profile Picture"
      >
            
            <input type="file" className="input" onChange={(e)=>{
      setSelectedFile(e.target.files[0]);
    }} />
      </Form.Item> 
      <Form.Item
        {...formItemLayout}
        name="username"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input placeholder="Please input your name" ref={ Name } />
      </Form.Item>
      
      <Form.Item
        {...formItemLayout}
        name="bio"
        label="bio"
        rules={[
          {
            required: true,
            message: 'Write somting about you ',
          },
        ]}
      >
        <Input placeholder="Write somting about you"  ref={bio}/>
      </Form.Item>
      
      <Form.Item {...formTailLayout}>
        <Button type="primary" htmlType="submit">
          Save Details
        </Button>
      </Form.Item>
    </Form>
    <hr />
      <h2>Uploading done {progress}%</h2>
    </Col>
    </Row>
 
    </div>
  );
}

export default SettingForm;
