import { Button, Pagination, Table, Tabs } from 'antd';
import { TableProps } from 'antd/es/table';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'
import { commissionList, decodeJWT, getCaptainBeeStatics, getUserWallets } from '../../../services/api'
import { useNavigate, useParams } from 'react-router-dom';
import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment, { Moment } from 'moment';

const { RangePicker } = DatePicker;
interface DataType {
  beeType?: string; // Made it optional since the response doesn't have this
  captainBeeEmail: string;
  created: Date;
  rank: string;
  finalCommissionAmountInUSD: number;
  finalCommissionAmountInINEX: number;
  commissionPercentage: number;
  orderAmount: number;
  name?: string;  // Added this based on the response
}

type CommissionTableProps = {
  leaderEmail: string;
};


const CommissionTable: React.FC<CommissionTableProps> = ({ leaderEmail }) => {
  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => { };

  const { id } = useParams();

  const [captainbeesEmail, setCaptainbeeEmail] = useState();

  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'beeType',
      title: 'Type',
      sorter: (a, b) => (a.beeType || "Captain").localeCompare(b.beeType || "Captain"),
      render: (_, record) => {
        return record.beeType ? record.beeType : "Captain";
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => {
        if (a.name && b.name) {
          return a.name.localeCompare(b.name);
        } else {
          return a.captainBeeEmail.localeCompare(b.captainBeeEmail);
        }
      },
      render: (_, record) => {
        return record.name || record.captainBeeEmail.split('@')[0];
      },
    },
    {
      dataIndex: 'created',
      title: 'Date',
      sorter: (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime(),
      render: (_, record) => {
        return new Date(record.created).toLocaleDateString();
      },
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      sorter: (a, b) => a.rank.localeCompare(b.rank),
      render: (_, record) => {
        return record.rank;  // Adjusted based on actual rank data
      },
    },
    {
      title: 'Commission',
      dataIndex: 'finalCommissionAmountInUSD',
      sorter: (a, b) => a.finalCommissionAmountInUSD - b.finalCommissionAmountInUSD,
      //render: (_, record) => formatCurrency(record.finalCommissionAmountInUSD),
      render: (_, record) => {
        // Assuming you want to format it as "USD: $amount, INEX: $amount"
        return `USD: $${record.finalCommissionAmountInUSD.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} + INEX: ${record.finalCommissionAmountInINEX.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      },
    },
    {
      title: 'Commission Percentage',
      dataIndex: 'commissionPercentage',
      sorter: (a, b) => a.commissionPercentage - b.commissionPercentage,
      render: (_, record) => {
        return typeof record.commissionPercentage === 'number'
          ? record.commissionPercentage.toFixed(2) + '%'
          : '0.00%';
      }
    },
    {
      title: 'Order Total',
      dataIndex: 'orderAmount',
      sorter: (a, b) => a.orderAmount - b.orderAmount,
      render: (_, record) => {
        return "$" + parseFloat(String(record.orderAmount)).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      },
    },
  ];

  interface CommissionDataType {
    _id: string;
    totalCommissionEarned: {
      amountInINEX: number;
      amountInUSD: number;
    };
    totalHoneyBeeCommissionEarned: {
      amountInINEX: number;
      amountInUSD: number;
    };
    totalCommissionToBePaid: {
      amountInINEX: number;
      amountInUSD: number;
    };
    totalHoneyBeeCommissionToBePaid: {
      amountInINEX: number;
      amountInUSD: number;
    };
    commissionPercentage: number;
    rank: string;
  };


  // Provide a fallback for the currency formatting
  const formatCurrency = (amount: number | undefined) => {
    // Handle undefined amounts by returning a default string
    if (typeof amount === 'undefined') {
      return "$0.00";
    }
    return `$${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const topcolumns: ColumnsType<CommissionDataType> = [
    {
      dataIndex: 'totalCommissionEarned',
      title: 'Commission Earned',
      align: "center",
      render: (_, record) => {
        const totalEarnedUSD = (record.totalCommissionEarned?.amountInUSD || 0) + (record.totalHoneyBeeCommissionEarned?.amountInUSD || 0);
        const totalEarnedINEX = (record.totalCommissionEarned?.amountInINEX || 0) + (record.totalHoneyBeeCommissionEarned?.amountInINEX || 0);
        return `${formatCurrency(totalEarnedUSD)} / INEX: ${formatCurrency(totalEarnedINEX)}`;
      },
    },
    {
      dataIndex: 'totalCommissionToBePaid',
      title: 'Commission Due',
      align: "center",
      render: (_, record) => {
        const totalDueUSD = (record.totalCommissionToBePaid?.amountInUSD || 0) + (record.totalHoneyBeeCommissionToBePaid?.amountInUSD || 0);
        const totalDueINEX = (record.totalCommissionToBePaid?.amountInINEX || 0) + (record.totalHoneyBeeCommissionToBePaid?.amountInINEX || 0);
        return `${formatCurrency(totalDueUSD)} / INEX: ${formatCurrency(totalDueINEX)}`;
      },
    },
    {
      dataIndex: 'commissionPaid',
      title: 'Commission Paid',
      align: "center",
      render: (_, record) => {
        // Calculate the total earned and due for both USD and INEX
        const totalEarnedUSD = (record.totalCommissionEarned?.amountInUSD ?? 0) + (record.totalHoneyBeeCommissionEarned?.amountInUSD ?? 0);
        const totalEarnedINEX = (record.totalCommissionEarned?.amountInINEX ?? 0) + (record.totalHoneyBeeCommissionEarned?.amountInINEX ?? 0);
        const totalDueUSD = (record.totalCommissionToBePaid?.amountInUSD ?? 0) + (record.totalHoneyBeeCommissionToBePaid?.amountInUSD ?? 0);
        const totalDueINEX = (record.totalCommissionToBePaid?.amountInINEX ?? 0) + (record.totalHoneyBeeCommissionToBePaid?.amountInINEX ?? 0);

        // Calculate the total commission paid for both USD and INEX
        const paidUSD = totalEarnedUSD - totalDueUSD;
        const paidINEX = totalEarnedINEX - totalDueINEX;

        return `${formatCurrency(paidUSD)} / INEX: ${formatCurrency(paidINEX)}`;
      },
    },
    {
      dataIndex: 'commissionPercentage',
      title: 'Commission Percentage',
      align: "center",
      render: (_, record) => {
        return typeof record?.commissionPercentage === 'number'
          ? record?.commissionPercentage.toFixed(2) + '%'
          : '0.00%';
      },
    },
  ];

  const [selectedDateRange, setSelectedDateRange] = useState<[Moment | null, Moment | null]>([null, null]);
  const handleDateChange = (dates: any) => {
    setSelectedDateRange(dates);
    console.log('Selected Date Range:', dates);
  };

  const filterDataByDate = (data: DataType[]): DataType[] => {
    return selectedDateRange
      ? data.filter((record) => {
        const recordDate = new Date(record.created);
        const startDate = selectedDateRange[0]?.startOf('day').toDate(); // Convert Moment to Date
        const endDate = selectedDateRange[1]?.endOf('day').toDate(); // Convert Moment to Date
        return startDate && endDate
          ? recordDate >= startDate && recordDate <= endDate
          : true;
      })
      : data;
  };


  const [sortedData, setSortedData] = useState<DataType[]>([]);
  const [commissionPaidData, setCommissionPaidData] = useState<CommissionDataType[]>([]);
  const pageSize = 10;
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    getCommissionHistory();
  }, [selectedDateRange]);

  useEffect(() => {
    if (id) {
      getCaptainBeeStatics(String(id)).then((data) => {
        console.log("Data2", data?.data?.userFullData?.email);
        setCaptainbeeEmail(data?.data?.userFullData?.email);
      });
    }
  }, [captainbeesEmail])

  const getCommissionHistory = async () => {
    if (id) {
      let idResults = await getCaptainBeeStatics(String(id));
      let userEmail = (idResults?.data?.userFullData?.email);
      let commissionHistory = await commissionList(userEmail);
      const results = commissionHistory?.data?.getAllCommissionRecordsData;
      const reversedResults = [...results].reverse(); // Create a copy and reverse the order
      // Set default values if the fetch returns undefined
      setCommissionPaidData(commissionHistory?.data?.commissionPaidAndDueData || []);
      setSortedData(reversedResults || []);
    } else if (leaderEmail === undefined || leaderEmail === null) {
      let access_token = String(localStorage.getItem('access_token'));
      let decoded: any = decodeJWT(access_token);
      let commissionHistory = await commissionList(decoded.email);
      const results = commissionHistory?.data?.getAllCommissionRecordsData;
      const reversedResults = [...results].reverse(); // Create a copy and reverse the order
      setCommissionPaidData(commissionHistory?.data?.commissionPaidAndDueData || []);
      setSortedData(reversedResults || []);
    } else {
      let commissionHistory = await commissionList(leaderEmail);
      const results = commissionHistory?.data?.getAllCommissionRecordsData;
      const reversedResults = [...results].reverse(); // Create a copy and reverse the order
      setCommissionPaidData(commissionHistory?.data?.commissionPaidAndDueData || []);
      setSortedData(reversedResults || []);
    }
  }

  // const getData = (current: number, pageSize: number) => {
  //   // Normally you should get the data from the server
  //   const xx =
  //     sortedData &&
  //     sortedData.slice((current - 1) * pageSize, current * pageSize);

  //   return xx;
  // };

  const getData = (current: number, pageSize: number) => {
    // Normally you should get the data from the server
    const filteredData = filterDataByDate(sortedData);
    const paginatedData =
      filteredData && filteredData.slice((current - 1) * pageSize, current * pageSize);

    return paginatedData;
  };

  // const MyPagination = ({ total, onChange, current }: any) => {
  //   return (
  //     <Pagination
  //       onChange={onChange}
  //       total={total}
  //       current={current}
  //       pageSize={pageSize}
  //       // responsive={true}
  //       style={{
  //         padding: '5px',
  //         textAlign: 'center',
  //       }}
  //     />
  //   );
  // };

  const MyPagination: React.FC<{ total: number; onChange: (page: number) => void; current: number }> = ({
    total,
    onChange,
    current,
  }) => {
    const totalPageCount = Math.ceil(total / pageSize);

    return (
      <Pagination
        onChange={onChange}
        total={totalPageCount * pageSize} // Adjust the total based on the number of pages
        current={current}
        pageSize={pageSize}
        style={{
          padding: '5px',
          textAlign: 'center',
        }}
      />
    );
  };

  const navigate = useNavigate();


  const disabledDate = (current: Moment) => {
    return current && current > moment().endOf('day');
  };

  const handlePaginationChange = (page: number) => {
    setCurrent(page);
  };

  return (
    <div>
      <div
        className="font_17x fw-bold pt-3 d-flex justify-content-center" style={{ color: "#393939" }}>
        Affiliate Report / Commission Report
      </div>
      <div className='d-flex mt-2' style={{ gap: 10 }}>
        <div className='d-flex flex-direction-column w-50' style={{ color: "#333336" }}>
          Date Range
          <RangePicker disabledDate={disabledDate} style={{ height: "40px" }}
            onChange={handleDateChange}
            // className="createDateRangePicker"
            // dropdownClassName= "createDateRangePicker"
            className="createDateRangePicker dark-mode"
            dropdownClassName="createDateRangePicker dark-mode"
          />
        </div>
        <div className='d-flex w-50 align-items-end'>
          <Button className='margin-r-1x com-btn ' onClick={() => navigate("/indexx-exchange/buy-sell/withdraw-crypto")}>
            Withdraw INEX
          </Button>
          <Button className='com-btn' onClick={() => navigate("/withdraw-add-information")}>
            Withdraw USD
          </Button>

        </div>
      </div>
      <div className="margin-b-2x pt-3">
        <Table<CommissionDataType>
          className="custom_table"
          style={{ maxWidth: "94vw" }}
          columns={topcolumns}
          dataSource={commissionPaidData}
          scroll={{ x: true }}
        />
        <Table
          className="custom_table"
          style={{ maxWidth: "94vw" }}
          columns={columns}
          dataSource={getData(current, pageSize)}
          onChange={onChange}
          scroll={{ x: true }}
        />
        {/* <MyPagination
          total={sortedData && sortedData.length}
          current={current}
          onChange={setCurrent}
        /> */}
        <MyPagination total={filterDataByDate(sortedData).length} onChange={handlePaginationChange} current={current} />
      </div>
    </div>
  );
};

export default CommissionTable;
