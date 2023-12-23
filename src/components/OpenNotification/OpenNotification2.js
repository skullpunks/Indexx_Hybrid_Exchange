import { notification } from 'antd';
import React from 'react';
import { CloseCircleFilled } from '@ant-design/icons';

const OpenNotification2 = (type, message) => {
  notification[type]({
    message: message,
    description: '',
    placement: 'top',
    icon: <CloseCircleFilled />,
    style: {
      border: '1px solid var(--primary-color)',
      boxShadow: 'none',
      borderRadius: 5,
      top: 100,
    },
    className: `theme-${localStorage.getItem('userlogged')}`,
  });
};

export default OpenNotification2;
