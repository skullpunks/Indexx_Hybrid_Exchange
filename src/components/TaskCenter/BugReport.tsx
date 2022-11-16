import Footer from "../Footer/Footer";
import { Button, Form, Input ,Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const BugReport = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    return (
         
        
        <>
        <div className="scan-container flex-direction-column text-left">
         <div className="row">
               <p className="opacity-75 " style={{textAlign:"left",fontSize:50,fontWeight:400,paddingLeft:60}}> Report a bug on  Indexx.ai <br/></p>
     <div style={{paddingLeft:60,width:700}}>
     <Form
      name="basic"
      layout="vertical"
      labelCol={{ span: 15 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    ><br/>
      <Form.Item
       required={true}
        label="Enter your Email:"
        name="email"
        rules={[{ message: 'Please enter your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item required={true} label="Give a brief description of the bug/problem you faced:">
          <TextArea rows={4} />
        </Form.Item>

        
        <Form.Item label="Upload screenshots of the bug:" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
     

      <Form.Item >
        <Button danger type="primary" htmlType="submit" style={{width:200}}>
          Submit
        </Button>
      </Form.Item>
    </Form>
     </div>
        
        </div>
        </div>
        <Footer></Footer>
        </>

    )
}


export default BugReport;
