import { Form, Input, Button, Checkbox,Row, Col,link  } from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { newUser ,auth,db,setDoc,doc} from '../../../firebase/config';
function SignUpForm() {



    const [UserName,setUserName]=useState();
    const [UserEmail,setUserEmail]=useState();
    const [UserPassword,setUserPassword]=useState();
    console.log(UserName , UserEmail ,UserPassword);
    const navigate=useNavigate();

    const onFinish = async () => {
       
           await newUser(auth, UserEmail, UserPassword)
            .then((userCredential)=>{
                let user = userCredential.user
                setDoc(doc( db, "usersData", user.uid), {
                  name: UserName,
                  email: UserEmail,
                  userUid: user.uid,
                })
                navigate('/login');
            })
            .catch((error) => {
              const errorMessage = error.message
              console.log(errorMessage)
            })
    
        }
        
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

  return (
    <div className="App">
<Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
<Col  >
        
<Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input onChange={(event) => {
             setUserName(event.target.value);
            }} />
      </Form.Item>

      <Form.Item
        label="Email"
        name="Email"
        rules={[{required: true, message: 'Please input your email !', },]}
      >
        <Input type="email" onChange={(event) => {
              setUserEmail(event.target.value);
            }} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password onChange={(event) => {
              setUserPassword(event.target.value);
            }}/>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 17,
          span: 18,
        }}
      >
        <Button type="primary" htmlType="submit">
          Signup
        </Button>
      </Form.Item>
      
      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 18,
        }}
      >
        <Button type="primary" htmlType="submit">
         <Link to="/login"> Already have account</Link>
        </Button>
      </Form.Item>

    </Form>

    </Col>
    </Row>

    </div>
  );
}

export default SignUpForm;
