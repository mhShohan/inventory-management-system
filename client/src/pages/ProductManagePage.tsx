import { Col, Flex, Pagination, PaginationProps, Row, Slider } from 'antd';
import { useState } from 'react';
import Loader from '../components/Loader';
import Table from '../components/Table';
import CreateVariantModal from '../components/modal/CreateVariant';
import EditModal from '../components/modal/EditModal';
import SaleModal from '../components/modal/SaleModal';
import { useGetAllProductsQuery } from '../redux/features/productApi';

const ProductManagePage = () => {
  const limit = 10;
  const [current, setCurrent] = useState(1);
  const [query, setQuery] = useState({
    size: '',
    color: '',
    type: '',
    bloomDate: '',
  });
  const { isLoading, data, isFetching } = useGetAllProductsQuery({
    ...query,
    page: current,
    limit,
  });

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };

  if (isLoading) return <Loader />;

  return (
    <Flex
      vertical
      justify='space-between'
      style={{
        maxHeight: 'calc(100vh - 5rem)',
        overflow: 'auto',
        padding: '1rem',
      }}
    >
      <Row gutter={2} style={{ marginBottom: '1rem' }}>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <label style={{ fontWeight: 700 }}>Price Range</label>
          <Slider
            range
            step={100}
            max={5000}
            defaultValue={[100, 2000]}
            onChange={(value) => {
              setQuery((prev) => ({
                ...prev,
                minPrice: value[0],
                maxPrice: value[1],
              }));
            }}
          />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label style={{ fontWeight: 700 }}>Filter by Bloom Date</label>
          <input
            type='date'
            value={query.bloomDate}
            className={`input-field`}
            placeholder='Filter by type'
            onChange={(e) => setQuery((prev) => ({ ...prev, bloomDate: e.target.value }))}
          />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label style={{ fontWeight: 700 }}>Filter by type</label>
          <input
            type='text'
            value={query.type}
            className={`input-field`}
            placeholder='Filter by type'
            onChange={(e) => setQuery((prev) => ({ ...prev, type: e.target.value }))}
          />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label style={{ fontWeight: 700 }}>Filter by color</label>
          <input
            type='text'
            value={query.color}
            className={`input-field`}
            placeholder='Filter by color'
            onChange={(e) => setQuery((prev) => ({ ...prev, color: e.target.value }))}
          />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label style={{ fontWeight: 700 }}>Filter by Size</label>
          <select
            name='size'
            className={`input-field`}
            defaultValue={query.size}
            onChange={(e) => setQuery((prev) => ({ ...prev, size: e.target.value }))}
            onBlur={(e) => setQuery((prev) => ({ ...prev, size: e.target.value }))}
          >
            <option value=''>Filter by Size*</option>
            <option value='SMALL'>Small</option>
            <option value='MEDIUM'>Medium</option>
            <option value='LARGE'>Large</option>
          </select>
        </Col>
      </Row>
      <div style={{ width: '100%', overflow: 'auto' }}>
        {isFetching ? <Loader /> : <Table data={data?.data} />}
        {data?.data <= 0 && (
          <h1 style={{ textAlign: 'center', margin: '3rem', color: 'red' }}>No Product found!</h1>
        )}
      </div>
      <Flex justify='center' style={{ marginTop: '1rem' }}>
        <Pagination
          current={current}
          onChange={onChange}
          defaultPageSize={limit}
          total={data?.meta?.total}
        />
      </Flex>
      <EditModal />
      <SaleModal />
      <CreateVariantModal />
    </Flex>
  );
};

export default ProductManagePage;
