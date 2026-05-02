import { DeleteFilled, EditFilled, PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import type { PaginationProps, TableColumnsType, TableProps } from 'antd';
import { Button, Flex, Modal, Pagination, Table, Tag } from 'antd';
import { useState, useMemo } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import SearchInput from '../../components/SearchInput';
import CreateSaleOrderModal from '../../components/modal/CreateSaleOrderModal';
import toastMessage from '../../lib/toastMessage';
import { useDeleteSaleMutation, useGetAllSaleQuery } from '../../redux/features/management/saleApi';
import { IProduct } from '../../types/product.types';
import { ITableSale, ISaleItem } from '../../types/sale.type';
import formatDate from '../../utils/formatDate';

interface SaleTableItem {
  key: string;
  _id: string;
  buyerName: string;
  totalPrice: number;
  date: string;
  items?: ISaleItem[];
  productName?: string;
  productPrice?: number;
  quantity?: number;
}

interface SaleDetailItem {
  key: string;
  productName: string;
  productPrice: number;
  quantity: number;
  totalPrice: number;
}

const SaleManagementPage = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: '',
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isFetching } = useGetAllSaleQuery(query);

  const onChange: PaginationProps['onChange'] = (page) => {
    setQuery((prev) => ({ ...prev, page: page }));
  };

  const tableData: SaleTableItem[] = useMemo(() => {
    return (data?.data || []).map((sale: ITableSale) => ({
      key: sale._id,
      _id: sale._id,
      buyerName: sale.buyerName,
      totalPrice: sale.totalPrice,
      date: formatDate(sale.date),
      items: sale.items,
      productName: sale.productName,
      productPrice: sale.productPrice,
      quantity: sale.quantity,
    }));
  }, [data?.data]);

  const getDetailItems = (record: SaleTableItem): SaleDetailItem[] => {
    if (record.items && record.items.length > 0) {
      return record.items.map((item, index) => ({
        key: `${record.key}-${index}`,
        productName: item.productName,
        productPrice: item.productPrice,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      }));
    }
    
    if (record.productName) {
      return [{
        key: `${record.key}-0`,
        productName: record.productName,
        productPrice: record.productPrice || 0,
        quantity: record.quantity || 0,
        totalPrice: record.totalPrice,
      }];
    }
    
    return [];
  };

  const detailColumns: TableColumnsType<SaleDetailItem> = [
    {
      title: '商品名称',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '单价',
      dataIndex: 'productPrice',
      key: 'productPrice',
      align: 'center',
      render: (price: number) => `¥${price}`,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
    },
    {
      title: '小计',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      align: 'center',
      render: (price: number) => `¥${price}`,
    },
  ];

  const expandableConfig: TableProps<SaleTableItem>['expandable'] = {
    expandIcon: ({ expanded, onExpand, record }) => (
      <CaretRightOutlined
        rotate={expanded ? 90 : 0}
        onClick={(e) => onExpand(record, e)}
        style={{ cursor: 'pointer', color: '#1890ff' }}
      />
    ),
    expandedRowRender: (record) => {
      const detailItems = getDetailItems(record);
      return (
        <Table
          size="small"
          columns={detailColumns}
          dataSource={detailItems}
          pagination={false}
          showHeader={true}
        />
      );
    },
  };

  const getProductSummary = (record: SaleTableItem): React.ReactNode => {
    if (record.items && record.items.length > 0) {
      if (record.items.length === 1) {
        return (
          <span>
            {record.items[0].productName}
            <Tag color="blue" style={{ marginLeft: 8 }}>
              x{record.items[0].quantity}
            </Tag>
          </span>
        );
      }
      return (
        <span>
          {record.items[0].productName}
          <Tag color="blue" style={{ marginLeft: 8 }}>
            +{record.items.length - 1} 个商品
          </Tag>
        </span>
      );
    }
    
    if (record.productName) {
      return (
        <span>
          {record.productName}
          <Tag color="blue" style={{ marginLeft: 8 }}>
            x{record.quantity}
          </Tag>
        </span>
      );
    }
    
    return '-';
  };

  const columns: TableColumnsType<SaleTableItem> = [
    {
      title: '商品摘要',
      key: 'productSummary',
      render: (_, record) => getProductSummary(record),
    },
    {
      title: '客户名称',
      key: 'buyerName',
      dataIndex: 'buyerName',
      align: 'center',
    },
    {
      title: '订单总金额',
      key: 'totalPrice',
      dataIndex: 'totalPrice',
      align: 'center',
      render: (price: number) => <strong>¥{price}</strong>,
    },
    {
      title: '销售日期',
      key: 'date',
      dataIndex: 'date',
      align: 'center',
    },
    {
      title: '操作',
      key: 'x',
      align: 'center',
      render: (_, record) => {
        return (
          <div style={{ display: 'flex' }}>
            <UpdateModal product={record as unknown as IProduct} />
            <DeleteModal id={record.key} />
          </div>
        );
      },
      width: '1%',
    },
  ];

  // const onDateChange: DatePickerProps['onChange'] = (_date, dateString) => {
  //   setDate(dateString as string);
  // };

  return (
    <>
      <Flex justify='space-between' style={{ margin: '5px', gap: 4 }}>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          创建销售订单
        </Button>
        <Flex style={{ gap: 4 }}>
          <SearchInput setQuery={setQuery} placeholder='Search Sold Products...' />
        </Flex>
      </Flex>
      <Table
        size='small'
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        expandable={expandableConfig}
      />
      <Flex justify='center' style={{ marginTop: '1rem' }}>
        <Pagination
          current={query.page}
          onChange={onChange}
          defaultPageSize={query.limit}
          total={data?.meta?.total}
        />
      </Flex>
      <CreateSaleOrderModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
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
    console.log({ product, data });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // ! Remove the first return to work on this component
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
  const [deleteSale] = useDeleteSaleMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSale(id).unwrap();
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

export default SaleManagementPage;
