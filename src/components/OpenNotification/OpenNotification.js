import { notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const OpenNotification = (type, message) => {
  const Icon =
    type === 'error' ? (
      <CloseCircleFilled />
    ) : (
      <CheckCircleFilled className="text_link" />
    );
  notification[type]({
    message: message,
    description: '',
    placement: 'top',
    icon: Icon,
    style: {
      border: '1px solid var(--primary-color)',
      boxShadow: 'none',
      borderRadius: 5,
      top: 100,
    },
    className: `theme-${localStorage.getItem('userlogged')}`,
  });
};

export default OpenNotification;
