import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import CustomSelectBox from './CustomSelect';
import GenericButton from '../updated/shared/Button';
import PDFGenerator from './TransactionHistoryReport';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import indexxLogo from '../../assets/header-icons/indexx grey.438c3bb4.png';
import { getUserTransactionHistory, getUserWallets } from '../../services/api';

const useStyles = makeStyles((theme) => ({
  dataShow: {
    opacity: '1 !important',
    visibility: 'visible !important',
    '& .bnModalWrap': {
      transform: 'scale(1) !important',
    },
  },
  bidsFullModal: {},
  bnMask: {
    alignItems: 'center',
    backgroundColor: ' rgba(0, 0, 0, .5)',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1200,
    width: '100%',
    height: '100vh',
  },
  bnTrans: {
    opacity: 0,
    transitionDuration: '250ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-in-out',
    visibility: 'hidden',
  },
  bnModal: {
    '& .bnModalWrap': {
      backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1e2329',
      borderRadius: '16px',
      boxShadow: '0px 3px 6px rgba(0,0,0,.04)',
      maxWidth: '80vw',
      overflow: 'hidden',
      position: 'relative',
      transform: 'scale(.9)',
      transitionDuration: '250ms',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease-in-out',
      width: '560px',
    },
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    textAlign: 'center',
    color: `${theme.palette.text.primary} !important`,
    '& h3': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
      marginTop: '10px',
    },
    '& h4': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
      margin: '10px 0px 15px 0px',
    },
    '& p': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
    },
  },
  dropdownContainer: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    gap: '15px',
    marginTop: '25px',
  },
  cancelButton: {
    background:
      theme.palette.mode === 'light'
        ? '#EAECEF !important'
        : '#2B3139 !important',
    color: `${theme.palette.text.primary} !important`,
  },
}));

const DownloadReportPopup = ({ onClose }) => {
  const [dateFilter, setDateFilter] = useState('All time');
  const [assetType, setAssetType] = useState('All Asset');
  const [transactionType, setTransactionType] = useState('All Transactions');
  const [portfilioSumamryData, setPortfolioSummaryData] = useState([]);
  const [transactionHistoryData, setTransactionHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  function getDateRange(period) {
    const today = new Date();
    let fromDate, toDate;

    switch (period.toLowerCase()) {
      case 'today':
        fromDate = new Date(today);
        toDate = new Date(today);
        break;

      case 'yesterday':
        fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 1);
        toDate = new Date(fromDate);
        break;

      case 'last week':
        const dayOfWeek = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek - 7);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        fromDate = startOfWeek;
        toDate = endOfWeek;
        break;

      case 'this week':
        const startOfThisWeek = new Date(today);
        startOfThisWeek.setDate(today.getDate() - dayOfWeek);
        const endOfThisWeek = new Date(startOfThisWeek);
        endOfThisWeek.setDate(startOfThisWeek.getDate() + 6);

        fromDate = startOfThisWeek;
        toDate = endOfThisWeek;
        break;

      case 'last month':
        fromDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        toDate = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of the previous month
        break;

      case 'this month':
        fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
        toDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of this month
        break;

      case 'last year':
        fromDate = new Date(today.getFullYear() - 1, 0, 1);
        toDate = new Date(today.getFullYear() - 1, 11, 31);
        break;

      case 'this year':
        fromDate = new Date(today.getFullYear(), 0, 1);
        toDate = new Date(today.getFullYear(), 11, 31);
        break;

      default:
        throw new Error(
          'Invalid period. Use "today", "yesterday", "last week", etc.'
        );
    }

    // Format the dates as YYYY-MM-DD strings
    const formatDate = (date) => date.toISOString().split('T')[0];

    return {
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
    };
  }

  const theme = useTheme();
  const navigate = useNavigate();

  const generatePDF = (data) => {
    const doc = new jsPDF({
      orientation: 'l', // Landscape orientation
      unit: 'mm',
      format: [297, 210], // Custom page size with increased width
    });

    // Container with padding
    const padding = 10;
    doc.setFontSize(10);
    doc.text('', padding, padding);

    // Logo image using SVG
    const logo = new Image();
    logo.src = indexxLogo;

    logo.onload = () => {
      doc.addImage(logo, 'PNG', padding, padding, 55, 20);

      // Bold heading
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Transaction History Report', padding, 40);

      // Paragraph with reduced font size
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(
        'This is the transaction history report for the selected period.',
        padding,
        50
      );

      // First column
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Date', padding, 65);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Date: ${data.date}`, padding, 70);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Filter', padding + 60, 65);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Type: ${transactionType}`, padding + 60, 70);
      doc.text(`Asset: ${assetType}`, padding + 60, 75);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Customer', padding + 120, 65);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Email: ${data.customerEmail}`, padding + 120, 70);

      // Portfolio Summary
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Portfolio Summary', padding, 90);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(
        `Portfolio summary balances are as of ${data.toDate} 23:59:59 UTC`,
        padding,
        95
      );

      const portfolioSummary = [
        ['Asset', 'Quantity', 'Market Price', 'Market Value'],
        ...data.portfolioSummary.map((item) => [
          item.asset,
          item.quantity,
          item.marketPrice,
          item.marketValue,
        ]),
      ];

      doc.autoTable({
        startY: 100,
        head: [portfolioSummary[0]],
        body: portfolioSummary.slice(1),
        styles: {
          fontSize: 8, // Reduced column text size
        },
        headStyles: {
          fillColor: [211, 211, 211], // Light grey color
          textColor: 0,
          fontStyle: 'bold',
        },
        margin: { left: padding, right: padding }, // Align table with the content
      });

      // Transaction History
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(
        'Transaction History',
        padding,
        doc.autoTable.previous.finalY + 10
      );
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(
        `Transaction history data for ${data.date}`,
        padding,
        doc.autoTable.previous.finalY + 15
      );

      const transactionHistory = [
        [
          'Timestamp',
          'Transaction Type',
          'Asset',
          'Quantity Transacted',
          'Price at Transaction',
          'Subtotal',
          'Total',
          'Notes',
        ],
        ...data.transactionHistory.map((item) => [
          item.timestamp,
          item.transactionType,
          item.asset,
          item.quantityTransacted,
          item.priceAtTransaction,
          item.subtotal,
          item.total,
          item.notes,
        ]),
      ];

      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 20,
        head: [transactionHistory[0]],
        body: transactionHistory.slice(1),
        styles: {
          fontSize: 8, // Reduced column text size
        },
        headStyles: {
          fillColor: [211, 211, 211], // Light grey color
          textColor: 0,
          fontStyle: 'bold',
        },
        margin: { left: padding, right: padding }, // Align table with the content
      });

      doc.save('Transaction_History_Report.pdf');
    };
  };
  const fetchData = async () => {
    setLoading(true);

    try {
      let email = String(localStorage.getItem('email'));

      const userWallets = await getUserWallets(email);
      const portfolioSummaryData = userWallets.data.map((item) => {
        const coinBalance = Number(item.coinBalance);
        const coinPrice = Number(item.coinPrice);

        return {
          asset: item.coinName, // Assuming coinName represents the full name of the coin like 'Bitcoin'
          quantity: coinBalance.toString(),
          marketPrice: `$${coinPrice.toFixed(2)}`, // Format the price as a string with a dollar sign
          marketValue: `$${(coinBalance * coinPrice).toFixed(2)}`, // Calculate market value
        };
      });

      // Ensure unique rows by asset name
      const uniquePortfolioSummaryData = portfolioSummaryData.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.asset === value.asset)
      );
      setPortfolioSummaryData(uniquePortfolioSummaryData);
      let fromDate,
        toDate = undefined;
      if (dateFilter !== 'All time') {
        ({ fromDate, toDate } = getDateRange(dateFilter));
      } else {
        fromDate = undefined;
        toDate = undefined;
      }
      const transactionTypeParamenter =
        transactionType === 'All Transactions' ? 'Buy' : transactionType;
      const currency = assetType === 'All Asset' ? undefined : assetType;

      // Fetch Transaction History Data
      const { data: transactionHistoryData } = await getUserTransactionHistory(
        email,
        fromDate,
        toDate,
        transactionTypeParamenter,
        currency
      );
      const transactionHistory = transactionHistoryData
        .filter((el) => el.status.toLowerCase() === 'completed')
        .map((item) => ({
          timestamp: item?.orderCompletedOn,
          transactionType: item?.orderType,
          asset: item?.orderRate?.currency,
          quantityTransacted: item?.breakdown?.outAmount?.toFixed(2),
          priceAtTransaction: item?.orderRate?.rate,
          subtotal: (
            item?.breakdown?.outAmount * item?.orderRate?.rate
          ).toFixed(2),
          total: (item?.breakdown?.outAmount * item?.orderRate?.rate).toFixed(
            2
          ),
          notes: item.notes,
        }));
      setTransactionHistoryData(transactionHistory);
      const data = {
        date: dateFilter,
        customerEmail: 'customer@example.com',
        portfolioSummary: portfilioSumamryData?.filter(
          (el) => el.quantity !== '0'
        ),
        transactionHistory: transactionHistory,
      };
      generatePDF(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const classes = useStyles();
  return (
    <div
      className={`${classes.bnTrans} ${classes.dataShow} ${classes.bnMask} ${classes.bnModal}  ${classes.bidsFullModal}`}
    >
      <div className="bnModalWrap">
        <div className={classes.contentContainer}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div>Download Report</div>

            <div onClick={onClose} style={{ cursor: 'pointer' }}>
              <CloseIcon
                color={theme.palette.text.secondary}
                sx={{
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              />
            </div>
          </div>

          <h3 style={{ textAlign: 'left', margin: '20px 0px' }}>
            Select a report to download. The PDF acts as a printable statement
            for your records.
          </h3>
          <div className={classes.dropdownContainer}>
            <CustomSelectBox
              items={[
                { name: 'All time', value: 'All time' },
                { name: 'Today', value: 'Today' },
                { name: 'Yesterday', value: 'Yesterday' },
                { name: 'Last Week', value: 'Last Week' },
              ]}
              value={dateFilter}
              hasborder
              type={undefined}
              onChange={(e) => setDateFilter(e.target.value)}
              isCurrency={undefined}
              onCurrencyChange={undefined}
            />
            <CustomSelectBox
              items={[
                { name: 'All Asset', value: 'All Asset' },
                { name: 'BTC', value: 'BTC' },
                { name: 'INEX', value: 'INEX' },
              ]}
              value={assetType}
              hasborder
              type={undefined}
              onChange={(e) => setAssetType(e.target.value)}
              isCurrency={undefined}
              onCurrencyChange={undefined}
            />
            <CustomSelectBox
              items={[
                { name: 'All Transactions', value: 'All Transactions' },
                { name: 'Buy', value: 'Buy' },
                { name: 'Sell', value: 'Sell' },
              ]}
              hasborder
              value={transactionType}
              type={undefined}
              isCurrency={undefined}
              onChange={(e) => setTransactionType(e.target.value)}
              onCurrencyChange={undefined}
            />
          </div>

          <div className={classes.btnContainer}>
            <GenericButton text="Generate Report" onClick={() => fetchData()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadReportPopup;
