import { Table, TableColumnsType } from 'antd';
import generateDate from '../../utils/generateDate';

interface IData {
  _id: string;
  day?: number;
  month?: number;
  week?: number;
  year: number;
  totalQuantity: number;
  totalRevenue: number;
}

const columns: TableColumnsType<any> = [
  {
    title: 'Date / Year',
    key: 'date',
    dataIndex: 'date',
  },
  {
    title: 'Total Sell (Quantity)',
    key: 'totalQuantity',
    dataIndex: 'totalQuantity',
    align: 'center',
  },
  {
    title: 'Total revenue',
    key: 'totalRevenue',
    dataIndex: 'totalRevenue',
    align: 'right',
  },
];

const HistoryTable = ({ data, isFetching }: { data: { data: IData[] }; isFetching: boolean }) => {
  const tableData = data?.data?.map((row: IData) => ({
    key: row._id,
    date: generateDate({ year: row.year, week: row.week, month: row.month, day: row.day }),
    totalQuantity: row.totalQuantity,
    totalRevenue: row.totalRevenue,
  }));

  return (
    <Table
      size='small'
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      pagination={false}
    />
  );
};

export default HistoryTable;
