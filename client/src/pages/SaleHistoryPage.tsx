import { Col, Row } from 'antd';
import Loader from '../components/Loader';
import SaleHistoryTable from '../components/SaleHistoryTable';
import {
  useDailySaleQuery,
  useMonthlySaleQuery,
  useWeeklySaleQuery,
  useYearlySaleQuery,
} from '../redux/features/saleApi';

const SaleHistoryPage = () => {
  const {
    data: yearlyData,
    isLoading: isLoading1,
    isFetching: isFetching1,
  } = useYearlySaleQuery(undefined);
  const {
    data: monthlyData,
    isLoading: isLoading2,
    isFetching: isFetching2,
  } = useMonthlySaleQuery(undefined);
  const {
    data: dailySale,
    isLoading: isLoading3,
    isFetching: isFetching3,
  } = useDailySaleQuery(undefined);
  const {
    data: weeklySale,
    isLoading: isLoading4,
    isFetching: isFetching4,
  } = useWeeklySaleQuery(undefined);

  if (isLoading1 && isLoading2 && isLoading3 && isLoading4) return <Loader />;
  else
    return (
      <Row
        style={{
          maxHeight: 'calc(100vh - 5rem)',
          overflow: 'auto',
        }}
      >
        {isFetching1 ? (
          <Loader />
        ) : (
          <Col xs={{ span: 23 }} lg={{ span: 11 }} className='sales'>
            <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Yearly Sale</h1>
            {yearlyData?.data && <SaleHistoryTable data={yearlyData?.data} />}
          </Col>
        )}
        {isFetching2 ? (
          <Loader />
        ) : (
          <Col xs={{ span: 23 }} lg={{ span: 11 }} className='sales'>
            <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Monthly Sale</h1>
            {monthlyData?.data && <SaleHistoryTable data={monthlyData?.data} />}
          </Col>
        )}
        {isFetching3 ? (
          <Loader />
        ) : (
          <Col xs={{ span: 23 }} lg={{ span: 11 }} className='sales'>
            <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Weekly Sale</h1>
            {weeklySale?.data && <SaleHistoryTable data={weeklySale?.data} />}
          </Col>
        )}
        {isFetching4 ? (
          <Loader />
        ) : (
          <Col xs={{ span: 23 }} lg={{ span: 11 }} className='sales'>
            <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Daily Sale</h1>
            {dailySale?.data && <SaleHistoryTable data={dailySale?.data} />}
          </Col>
        )}
      </Row>
    );
};

export default SaleHistoryPage;
