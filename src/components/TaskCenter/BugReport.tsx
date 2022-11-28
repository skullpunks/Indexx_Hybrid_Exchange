import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Upload, notification, Table } from 'antd';
import AWS from 'aws-sdk';
import { useEffect, useState } from 'react';
import Footer from "../Footer/Footer";
import type { RcFile } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import {
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { createBug, decodeJWT, getUserCreatedBugs } from "../../services/api";
import { ColumnsType, TableProps } from 'antd/lib/table';

const { TextArea } = Input;

const S3_BUCKET = 'BUCKET-NAME';
const REGION = 'REGION-NAME';


AWS.config.update({
  accessKeyId: 'accessKeyId',
  secretAccessKey: 'secretAccessKey'
})

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
})

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface DataType {
  key: React.Key;
  bugStatus: string;
  bugComments: string;
  adminComments: string;
  created: string;
  modified: string;
  bugFiles: any[],
  bugDescription: string,
  bugTitle: string
}

const BugReport = () => {

  const [fileList, setFileList] = useState([{}]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const handleCancel = () => setPreviewOpen(false);
  const [bugsData, setBugsData] = useState([]);
  type NotificationType = "success" | "info" | "warning" | "error";
  const [loadings, setLoadings] = useState<boolean>(false);

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const [isLoading, setTableLoadings] = useState(true);

  const tableLoading = {
    spinning: isLoading,
    indicator: <img src={require(`../../assets/arts/loaderIcon.gif`).default} alt="loader" width="38" height="38" />,
  }
  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    const Icon =
      type === "error" ? (
        <CloseCircleFilled />
      ) : (
        <CheckCircleFilled className="text_link" />
      );
    notification[type]({
      message: message,
      description: "",
      icon: Icon,
      style: {
        border: "1px solid #F66036",
        boxShadow: "none",
        borderRadius: 5,
        top: 100,
      },
    });
  };

  useEffect(() => {
    const access_token = String(localStorage.getItem("access_token"));
    const decoded: any = decodeJWT(access_token);
    getUserCreatedBugs(String(decoded.email)).then((res: any) => {
      if (res.data) {
        setBugsData(res.data.data);
        setTableLoadings(false)
      }
    })
  }, []);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values: any) => {
    if (values.description === undefined || values.email === undefined || values.bugfiles === undefined ||
      !values.description || !values.email || !values.bugfiles) {
      alert("All fields are required");
    }
    else {
      console.log('I else')
      let res = await createBug(values.email, values.description, values.bugfiles);
      console.log('res', res);
      if (res.status === 200) {
        openNotificationWithIcon("success", "Bug Report Submitted");
      } else {
        openNotificationWithIcon("error", "Bug Report Failed");
      }
    }
    console.log('Success:', values);
  };


  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };



  const uploadFile = (file: any) => {
    setLoadings(true);
    console.log(file);
    let params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: 'indexx-user-bugs-list/' + file.name,
    };

    let newFile = {} as any;
    newFile.fileType = "Standard";
    newFile.fileMode = file.type;
    newFile.title = file.name;
    newFile.uniqueName = file.uid;
    newFile.original =  + file.name;
    let newList = fileList.concat(newFile);
    setFileList(newList);

    myBucket.putObject(params)
      .on('success', (evt) => {
        console.log(evt);
        setLoadings(false);
      })
      .send((err) => {
        if (err) console.log(err)
      })
  }

  const columns: ColumnsType<DataType> = [
    // {
    //     title: ' ',
    //     dataIndex: 'Favourite',
    //     render: (_, record) => {
    //         return (record?.Favourite === true) ? <StarOutlined className='color-warn font_20x' /> : <StarFilled className='font_20x' />;
    //     },
    //     responsive: ["sm"],
    // },
    {
      title: 'Description',
      dataIndex: 'bugDescription',
      render: (_, record) => {
        return record?.bugDescription;
      }
    },
    {
      title: 'Bug Title',
      dataIndex: 'bugTitle',
      render: (_, record) => {
        return record?.bugTitle;
      }
    },
    {
      title: 'Created on',
      dataIndex: 'created',
      render: (_, record) => {
        return record?.created;
      },

      responsive: ["sm"],
    },
    {
      title: 'Modified on',
      dataIndex: 'created',
      render: (_, record) => {
        return record?.modified;
      },
      responsive: ["sm"],
    },
    {
      title: 'Admin Comments',
      dataIndex: 'adminComments',
      render: (_, record) => {
        return record?.adminComments;
      },
      responsive: ["sm"],
    },
    {
      title: 'Bug status',
      dataIndex: 'bugStatus',
      render: (_, record) => {
        return record?.bugStatus;
      },
      responsive: ["sm"],
    }

  ];

  const removeFile = async (e: any) => {
    console.log(e);
    let newList = fileList.filter((file: any) => file.uniqueName !== e.uniqueName);
    setFileList(newList);
  }

  const getFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (

    <>
      <div className="scan-container flex-direction-column text-left">
        <div className="row">
          <p className="opacity-75 " style={{ textAlign: "left", fontSize: 50, fontWeight: 400, paddingLeft: 60 }}> Report a bug on  Indexx.ai <br /></p>
          <div style={{ paddingLeft: 60, width: 700 }}>
            <Form
              name="basic"
              layout="vertical"
              labelCol={{ span: 15 }}
              wrapperCol={{ span: 20 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            ><br />
              <Form.Item
                required={true}
                label="Enter your Email:"
                name="email"
                rules={[{ message: 'Please enter your email!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item required={true} label="Give a brief description of the bug/problem you faced:" name="description">
                <TextArea rows={4} />
              </Form.Item>



              <Form.Item label="Upload screenshots of the bug:" rules={[
                {
                  required: true,
                  message: 'Bug Screenshot is required',
                },
              ]}>
                <Form.Item name="bugfiles" valuePropName="fileList" getValueFromEvent={getFile} noStyle>
                  <Upload
                    listType="picture-card"
                    name="files"
                    onPreview={handlePreview}
                    showUploadList={{ showRemoveIcon: true, showPreviewIcon: true }} accept=".png,.jpeg,.jpg"
                    onRemove={removeFile} beforeUpload={(file) => {
                      uploadFile(file);
                      console.log(file);
                      return false;
                    }}>
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>

                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Form.Item>

              <Form.Item >
                <Button danger type="primary" htmlType="submit" style={{ width: 200 }} loading={loadings}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className='tab-body-container'>
            <Table columns={columns} dataSource={bugsData} onChange={onChange} loading={tableLoading} />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>

  )
}


export default BugReport;
