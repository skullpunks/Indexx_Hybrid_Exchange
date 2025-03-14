import axios from 'axios';

const REACT_API_URL = 'http://localhost:5000/api/v1';

interface S3PresignedPostData {
  url: string;
  fields: {
    bucket: string;
    key: string;
    'X-Amz-Algorithm': string;
    'X-Amz-Credential': string;
    'X-Amz-Date': string;
    Policy: string;
    'X-Amz-Signature': string;
    [key: string]: string;
  };
}

export const getS3Url = async (): Promise<S3PresignedPostData> => {
  const response = await axios.get(
    `${REACT_API_URL}/inex/basic/getS3PresignedUrl`
  );
  return response.data;
};

export const uploadToS3 = async (file: File): Promise<string> => {
  // Get the presigned URL data
  const presignedPostData = await getS3Url();
  
  const formData = new FormData();
  
  // Append all fields from the presigned post data
  Object.entries(presignedPostData.fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  
  // Append the file last
  formData.append('file', file);
  
  // Upload to S3 using the URL from the presigned post data
  await axios.post(presignedPostData.url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  // Construct and return the final URL to the uploaded file
  const region = 'ap-northeast-1';
  const bucket = presignedPostData.fields.bucket;
  const key = presignedPostData.fields.key;
  
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};