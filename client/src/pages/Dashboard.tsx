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
      <Row style={{ paddingRight: '1rem' }}>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: '.5rem' }}>
          <div className='number-card'>
            <h3>Total Stock</h3>
            <h1>{products?.data?.totalQuantity || 0}</h1>
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: '.5rem' }}>
          <div className='number-card'>
            <h3>Total Item Sell </h3>
            <h1>
              {yearlyData?.data.reduce(
                (acc: number, cur: { totalQuantity: number }) => (acc += cur.totalQuantity),
                0
              )}
            </h1>
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: '.5rem' }}>
          <div className='number-card'>
            <h3>Total Revenue</h3>
            <h1>
              {yearlyData?.data.reduce(
                (acc: number, cur: { totalRevenue: number }) => (acc += cur.totalRevenue),
                0
              )}
            </h1>
          </div>
        </Col>
      </Row>
    );
};

export default Dashboard;
