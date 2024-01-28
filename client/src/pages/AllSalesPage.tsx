import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import SaleTable from '../components/SaleTable';
import { useGetAllSaleQuery } from '../redux/features/saleApi';
import { Flex, Pagination, PaginationProps } from 'antd';

const AllSalesPage = () => {
  const limit = 10;
  const [current, setCurrent] = useState(1);
  const { isLoading, data, refetch } = useGetAllSaleQuery({ page: current, limit });

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    refetch();
  }, [current]);

  if (isLoading) return <Loader />;
  else
    return (
      <div>
        {data?.data && <SaleTable data={data?.data} />}
        {data?.data <= 0 && (
          <h1 style={{ textAlign: 'center', margin: '3rem', color: 'red' }}>No Sale found!</h1>
        )}
        <Flex justify='center' style={{ marginTop: '1rem' }}>
          <Pagination
            current={current}
            onChange={onChange}
            defaultPageSize={limit}
            total={data?.meta?.total}
          />
        </Flex>
      </div>
    );
};

export default AllSalesPage;
