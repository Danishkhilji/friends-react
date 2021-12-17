import { Form, Input, Button, Checkbox } from 'antd';
import { Row, Col } from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import { useState,useContext } from 'react';
import { auth,signIn } from '../../../firebase/config';


function LoginForm() {

    const [Email,setEmail]=useState();
    const [Password,setPassword]=useState();
    const navigate=useNavigate();

    const onFinish = async () => {
        await signIn(auth, Email,Password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          if(user){
          navigate("/home");
        }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      };
    
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
        <Input onChange={(e)=>{
            setEmail(e.target.value);
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
        <Input.Password onChange={(e)=>{
            setPassword(e.target.value);
        }} />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 5,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 17,
          span: 18,
        }}
      >
        <Button type="primary" htmlType="submit">
          login
        </Button>
      </Form.Item>
      
      <Form.Item
        wrapperCol={{
          offset: 12,
          span: 18,
        }}
      >
        <Button type="primary" htmlType="submit">
          <Link to="/signup">Create account</Link>
        </Button>
      </Form.Item>

    </Form>

    </Col>
    </Row>

    </div>
  );
}

export default LoginForm;
