import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useMonthlySaleQuery } from '../../redux/features/management/saleApi';
import { months } from '../../utils/generateDate';
import { Flex } from 'antd';
import Loader from '../Loader';

const MonthlyChart = () => {
  const { data: monthlyData, isLoading } = useMonthlySaleQuery(undefined);

  if (isLoading)
    return (
      <Flex>
        <Loader />
      </Flex>
    );

  const data = monthlyData?.data.map(
    (item: { month: number; year: number; totalRevenue: number }) => ({
      name: `${months[item.month - 1]}, ${item.year}`,
      revenue: item.totalRevenue,
    })
  );

  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='revenue' fill='#164863' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyChart;
