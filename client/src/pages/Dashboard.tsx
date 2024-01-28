import { Col, Row } from 'antd';
import Loader from '../components/Loader';
import { useCountProductsQuery } from '../redux/features/productApi';
import { useYearlySaleQuery } from '../redux/features/saleApi';

const Dashboard = () => {
  const { data: products, isLoading } = useCountProductsQuery(undefined);
  const { data: yearlyData, isLoading: isLoading1 } = useYearlySaleQuery(undefined);

  if (isLoading && isLoading1) return <Loader />;
  else
    return (
      <Row gutter={0}>
        <Col xs={{ span: 24 }} lg={{ span: 7 }} className='number-card'>
          <h3>Total Stock (Flowers)</h3>
          <h1>{products?.data?.totalQuantity || 0}</h1>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 7 }} className='number-card'>
          <h3>Total Sell (Flowers)</h3>
          <h1>
            {yearlyData?.data.reduce(
              (acc: number, cur: { totalQuantity: number }) => (acc += cur.totalQuantity),
              0
            )}
          </h1>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 7 }} className='number-card'>
          <h3>Total Revenue</h3>
          <h1>
            {yearlyData?.data.reduce(
              (acc: number, cur: { totalRevenue: number }) => (acc += cur.totalRevenue),
              0
            )}
          </h1>
        </Col>
      </Row>
    );
};

export default Dashboard;
