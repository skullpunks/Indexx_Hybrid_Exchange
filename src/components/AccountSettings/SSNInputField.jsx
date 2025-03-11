import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import CustomSelectBox from './CustomSelectBox';
import { useTheme } from '@mui/material';
import GenericButton from '../updated/shared/Button';
import OpenNotification from '../OpenNotification/OpenNotification';

import './Signup.css';
const countryFormats = {
  US: { label: 'SSN', mask: '999-99-9999', regex: /^\d{3}-\d{2}-\d{4}$/ },
  PK: { label: 'CNIC', mask: '99999-9999999-9', regex: /^\d{5}-\d{7}-\d{1}$/ },
  IN: {
    label: 'Aadhaar',
    mask: '9999-9999-9999',
    regex: /^\d{4}-\d{4}-\d{4}$/,
  },
  UK: {
    label: 'NINO',
    mask: 'AA-99-99-99-A',
    regex: /^[A-Z]{2}\d{2}\d{2}\d{2}[A-Z]$/,
  },
  CA: { label: 'SIN', mask: '999-999-999', regex: /^\d{3}-\d{3}-\d{3}$/ },
  DE: {
    label: 'Tax ID',
    mask: '999/999/99999',
    regex: /^\d{3}\/\d{3}\/\d{5}$/,
  },
  AU: { label: 'TFN', mask: '999-999-999', regex: /^\d{3}-\d{3}-\d{3}$/ },
  CN: {
    label: 'Resident ID',
    mask: '999999-99999999-9999',
    regex: /^\d{6}-\d{8}-\d{4}$/,
  },
  JP: {
    label: 'My Number',
    mask: '9999-9999-9999',
    regex: /^\d{4}-\d{4}-\d{4}$/,
  },
  FR: {
    label: 'INSEE',
    mask: '9-99-99-999-999-99',
    regex: /^\d-\d{2}-\d{2}-\d{3}-\d{3}-\d{2}$/,
  },
};

const IdentificationInput = ({
  initialCountry,
  initialPersonalId,
  setLoading,
}) => {
  const theme = useTheme();

  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [inputValue, setInputValue] = useState(initialPersonalId);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSelectedCountry(initialCountry);
    setInputValue(initialPersonalId);
  }, [initialCountry, initialPersonalId]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setInputValue('');
    setError('');
  };

  const validateInput = () => {
    const { regex, label } = countryFormats[selectedCountry];
    if (!inputValue.trim()) {
      setError(`${label} is required`);
      return false;
    }
    if (!regex.test(inputValue)) {
      setError(`Please enter a valid ${label}`);
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInput()) {
      OpenNotification('error', error);
      return;
    }

    setIsSubmitting(true);
    setLoading(true);

    const email = String(localStorage.getItem('email'));
    const apiEndpoint =
      'https://api.indexx.ai/api/v1/inex/user/addpersonalinfo';
    const requestData = {
      email,
      country: selectedCountry,
      personalIdNumber: inputValue,
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        OpenNotification('success', 'SSN verification submitted successfully');
        // You might want to trigger a refresh of the parent component here
      } else {
        OpenNotification(
          'error',
          data.message || 'Failed to submit SSN verification'
        );
      }
    } catch (error) {
      OpenNotification('error', 'Network error occurred');
      console.error('Network Error:', error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const currentFormat = countryFormats[selectedCountry];

  return (
    <div>
      <label htmlFor="country">Select Country:</label>
      <div style={{ margin: '10px 0px 30px 0px' }}>
        <CustomSelectBox
          items={Object.keys(countryFormats).map((countryCode) => ({
            name: countryCode,
            value: countryCode,
          }))}
          value={selectedCountry}
          onChange={handleCountryChange}
          hasborder
        />
      </div>

      <label htmlFor="idNumber">{currentFormat.label}:</label>
      <InputMask
        mask={countryFormats[selectedCountry].mask}
        value={inputValue}
        className="inputmaskfield"
        onChange={(e) => {
          setInputValue(e.target.value);
          setError('');
        }}
        placeholder={`Enter your ${currentFormat.label}`}
        id="idNumber"
        style={{
          display: 'block',
          margin: '10px 0 30px 0',
          padding: '10px',
          width: '100%',
          border: `1px solid ${error ? '#ff4d4f' : theme.palette.divider}`,
          borderRadius: '8px',
          background: 'none',
          color: theme.palette.text.primary,
        }}
      />
      {error && (
        <div
          style={{
            color: '#ff4d4f',
            marginTop: '-20px',
            marginBottom: '20px',
            fontSize: '12px',
          }}
        >
          {error}
        </div>
      )}

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <GenericButton
          text="Submit SSN Verification"
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          
        />
      </div>
    </div>
  );
};

export default IdentificationInput;
