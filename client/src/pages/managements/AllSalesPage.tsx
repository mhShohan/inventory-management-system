import { Flex, Pagination, PaginationProps } from 'antd';
import { useState } from 'react';
import Loader from '../../components/Loader';
import SaleTable from '../../components/tables/SaleTable';
import { useGetAllSaleQuery } from '../../redux/features/saleApi';

const AllSalesPage = () => {
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const { isLoading, data } = useGetAllSaleQuery(query);

  const onChange: PaginationProps['onChange'] = (page) => {
    setQuery((prev) => ({ ...prev, limit: page }));
  };

  if (isLoading) return <Loader />;
  else
    return (
      <div style={{ width: '100%', overflow: 'auto' }}>
        {data?.data && <SaleTable data={data?.data} />}
        {data?.data <= 0 && (
          <h1 style={{ textAlign: 'center', margin: '3rem', color: 'red' }}>No Sale found!</h1>
        )}
        <Flex justify='center' style={{ marginTop: '1rem' }}>
          <Pagination
            current={query.page}
            onChange={onChange}
            defaultPageSize={query.limit}
            total={data?.meta?.total}
          />
        </Flex>
      </div>
    );
};

export default AllSalesPage;
