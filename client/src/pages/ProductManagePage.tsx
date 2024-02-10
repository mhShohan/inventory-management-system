import { Col, Flex, Pagination, PaginationProps, Row, Slider } from 'antd';
import { useState } from 'react';
import Loader from '../components/Loader';
import Table from '../components/Table';
import CreateVariantModal from '../components/modal/CreateVariant';
import EditModal from '../components/modal/EditModal';
import SaleModal from '../components/modal/SaleModal';
import { useGetAllProductsQuery } from '../redux/features/productApi';
import { useGetAllCategoriesQuery } from '../redux/features/categoryApi';
import { useGetAllBrandsQuery } from '../redux/features/brandApi';

const ProductManagePage = () => {
  const limit = 10;
  const [current, setCurrent] = useState(1);
  const [query, setQuery] = useState({
    name: '',
    category: '',
    brand: '',
  });
  const { isLoading, data, isFetching } = useGetAllProductsQuery({
    ...query,
    page: current,
    limit,
  });
  const { data: categories } = useGetAllCategoriesQuery(undefined);
  const { data: brands } = useGetAllBrandsQuery(undefined);

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
            max={20000}
            defaultValue={[1000, 5000]}
            onChange={(value) => {
              setQuery((prev) => ({
                ...prev,
                minPrice: value[0],
                maxPrice: value[1],
              }));
            }}
          />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <label style={{ fontWeight: 700 }}>Search by product name</label>
          <input
            type='text'
            value={query.name}
            className={`input-field`}
            placeholder='Search by Product Name'
            onChange={(e) => setQuery((prev) => ({ ...prev, name: e.target.value }))}
          />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label style={{ fontWeight: 700 }}>Filter by Category</label>
          <select
            name='category'
            className={`input-field`}
            defaultValue={query.category}
            onChange={(e) => setQuery((prev) => ({ ...prev, category: e.target.value }))}
            onBlur={(e) => setQuery((prev) => ({ ...prev, category: e.target.value }))}
          >
            <option value=''>Filter by Category</option>
            {categories?.data?.map((category: { _id: string; name: string }) => (
              <option value={category._id}>{category.name}</option>
            ))}
          </select>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label style={{ fontWeight: 700 }}>Filter by Brand</label>
          <select
            name='Brand'
            className={`input-field`}
            defaultValue={query.category}
            onChange={(e) => setQuery((prev) => ({ ...prev, category: e.target.value }))}
            onBlur={(e) => setQuery((prev) => ({ ...prev, category: e.target.value }))}
          >
            <option value=''>Filter by Brand</option>
            {brands?.data?.map((brand: { _id: string; name: string }) => (
              <option value={brand._id}>{brand.name}</option>
            ))}
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
