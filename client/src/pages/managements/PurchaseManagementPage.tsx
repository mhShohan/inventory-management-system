import { DeleteFilled, EditFilled } from '@ant-design/icons';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Flex, Modal, Pagination, Table } from 'antd';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import {
  useDeletePurchaseMutation,
  useGetAllPurchasesQuery,
} from '../../redux/features/management/purchaseApi';
import { IProduct } from '../../types/product.types';
import { IPurchase } from '../../types/purchase.types';
import formatDate from '../../utils/formatDate';
import toastMessage from '../../lib/toastMessage';
import SearchInput from '../../components/SearchInput';

const PurchaseManagementPage = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: '',
  });

  const { data, isFetching } = useGetAllPurchasesQuery(query);

  const onChange: PaginationProps['onChange'] = (page) => {
    setQuery((prev) => ({ ...prev, page: page }));
  };

  const tableData = data?.data?.map((purchase: IPurchase) => ({
    key: purchase._id,
    sellerName: purchase.sellerName,
    productName: purchase.productName,
    price: purchase.unitPrice,
    quantity: purchase.quantity,
    totalPrice: purchase.totalPrice,
    due: purchase.totalPrice - purchase.paid,
    date: formatDate(purchase.createdAt),
  }));

  const columns: TableColumnsType<any> = [
    {
      title: 'Seller Name',
      key: 'sellerName',
      dataIndex: 'sellerName',
    },
    {
      title: 'Product Name',
      key: 'productName',
      dataIndex: 'productName',
    },
    {
      title: 'Price(per unit)',
      key: 'price',
      dataIndex: 'price',
      align: 'center',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: 'Total Price',
      key: 'totalPrice',
      dataIndex: 'totalPrice',
      align: 'center',
    },
    {
      title: 'Due',
      key: 'due',
      dataIndex: 'due',
      align: 'center',
    },
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'x',
      align: 'center',
      render: (item) => {
        return (
          <div style={{ display: 'flex' }}>
            <UpdateModal product={item} />
            <DeleteModal id={item.key} />
          </div>
        );
      },
      width: '1%',
    },
  ];

  return (
    <>
      <Flex justify='end' style={{ margin: '5px' }}>
        <SearchInput setQuery={setQuery} placeholder='Search Purchase...' />
      </Flex>
      <Table
        size='small'
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
      <Flex justify='center' style={{ marginTop: '1rem' }}>
        <Pagination
          current={query.page}
          onChange={onChange}
          defaultPageSize={query.limit}
          total={data?.meta?.total}
        />
      </Flex>
    </>
  );
};

/**
 * Update Modal
 */
const UpdateModal = ({ product }: { product: IProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log({ data, product });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // ! This is not complete, need to complete this to make it work
  return;
  return (
    <>
      <Button
        onClick={showModal}
        type='primary'
        className='table-btn-small'
        style={{ backgroundColor: 'green' }}
      >
        <EditFilled />
      </Button>
      <Modal title='Update Product Info' open={isModalOpen} onCancel={handleCancel} footer={null}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Working on it...!!!</h1>
          <Button htmlType='submit'>Submit</Button>
        </form>
      </Modal>
    </>
  );
};

/**
 * Delete Modal
 */
const DeleteModal = ({ id }: { id: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePurchase] = useDeletePurchaseMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deletePurchase(id).unwrap();
      if (res.statusCode === 200) {
        toastMessage({ icon: 'success', text: res.message });
        handleCancel();
      }
    } catch (error: any) {
      handleCancel();
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        type='primary'
        className='table-btn-small'
        style={{ backgroundColor: 'red' }}
      >
        <DeleteFilled />
      </Button>
      <Modal title='Delete Product' open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Are you want to delete this product?</h2>
          <h4>You won't be able to revert it.</h4>
          <div
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}
          >
            <Button
              onClick={handleCancel}
              type='primary'
              style={{ backgroundColor: 'lightseagreen' }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(id)}
              type='primary'
              style={{ backgroundColor: 'red' }}
            >
              Yes! Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PurchaseManagementPage;
