import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography, CircularProgress } from '@mui/material';

const ConversionPreviewModal = ({
  open,
  onClose,
  fromToken,
  toToken,
  amount,
  totalAmountToPay,
  rateData1,
  rateData2,
  insufficientBalance,
  createProcessOrder,
  fromTokenImage,
  toTokenImage
}) => {
  const [loading, setLoading] = useState(false); 

  const handleConfirmConvert = async () => {
    setLoading(true);
    try {
      await createProcessOrder(); // Call the passed function to create order
      setLoading(false);
      onClose(); // Close modal on success
    } catch (error) {
      setLoading(false); // Stop loading on error
      // Display error message (can be a toast or a modal)
      console.error('Error during conversion:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Confirm
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <img src={fromTokenImage} alt={fromToken.title} style={{ width: 40, marginRight: 10 }} />
          <Typography variant="body1">{amount} {fromToken.title}</Typography>
          <Typography variant="body1">→</Typography>
          <img src={toTokenImage} alt={toToken.title} style={{ width: 40, marginRight: 10 }} />
          <Typography variant="body1">{totalAmountToPay} {toToken.title}</Typography>
        </div>
        
        <Typography variant="body2" gutterBottom>
          <strong>Rate:</strong> 1 {fromToken.title} = {rateData1.toFixed(2)} {toToken.title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Inverse Rate:</strong> 1 {toToken.title} = {(1 / rateData1).toFixed(8)} {fromToken.title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Transaction Fees:</strong> 0 {toToken.title}
        </Typography>

        {/* Insufficient balance warning */}
        {insufficientBalance && (
          <Typography color="error" variant="body2" gutterBottom>
            ⚠️ Your account has insufficient balance. Please fund your account.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        <Button
          onClick={handleConfirmConvert}
          color="primary"
          variant="contained"
          disabled={insufficientBalance || loading} // Disable if balance is insufficient or loading
          startIcon={loading ? <CircularProgress size={20} /> : null} // Show loading spinner
        >
          {loading ? 'Processing...' : 'Confirm Convert'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConversionPreviewModal;
