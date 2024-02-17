import { Flex, Pagination } from 'antd';
import Loader from '../../components/Loader';
import PurchaseTable from '../../components/tables/PurchaseTable';
import { useGetAllPurchasesQuery } from '../../redux/features/purchaseApi';

const ManagePurchase = () => {
  const { data, isLoading } = useGetAllPurchasesQuery(undefined);

  if (isLoading) return <Loader />;
  else
    return (
      <div style={{ width: '100%', overflow: 'auto' }}>
        {data?.data && <PurchaseTable data={data?.data} />}
        {data?.data <= 0 && (
          <h1 style={{ textAlign: 'center', margin: '3rem', color: 'red' }}>No Sale found!</h1>
        )}
        <Flex justify='center' style={{ marginTop: '1rem' }}>
          <Pagination
          // current={current}
          // onChange={onChange}
          // defaultPageSize={limit}
          // total={data?.meta?.total}
          />
        </Flex>
      </div>
    );
};

export default ManagePurchase;
