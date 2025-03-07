import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import CustomSelectBox from './CustomSelectBox';
import { useTheme } from '@mui/material';
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

  useEffect(() => {
    setSelectedCountry(initialCountry);
    setInputValue(initialPersonalId);
  }, [initialCountry, initialPersonalId]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setInputValue(''); // Clear input when country changes
  };

  const validateInput = async () => {
    const { regex, label } = countryFormats[selectedCountry];
    if (!regex.test(inputValue)) {
      return;
    }

    let email = String(localStorage.getItem('email'));
    // Define the API endpoint and request payload
    const apiEndpoint =
      'https://api.indexx.ai/api/v1/inex/user/addpersonalinfo';
    const requestData = {
      email: email, // Replace with dynamic email if needed
      country: selectedCountry,
      personalIdNumber: inputValue,
    };

    try {
      setLoading(true); // Start loading
      // Make the POST request
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      // Parse the response
      if (response.ok) {
        const responseData = await response.json();
        console.log('API Response:', responseData);
      } else {
        const errorData = await response.json();
        console.error('Error Response:', errorData);
      }
    } catch (error) {
      console.error('Network Error:', error);
    } finally {
      setLoading(false); // Stop loading
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
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={validateInput} // Validate on blur
        placeholder={`Enter your ${currentFormat.label}`}
        id="idNumber"
        style={{
          display: 'block',
          margin: '10px 0 30px 0',
          padding: '10px',
          width: '100%',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: '8px',
          background: 'none',
        }}
      />
    </div>
  );
};

export default IdentificationInput;
