import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Table, TableColumnsType, Tag, Select, InputNumber, Input, DatePicker, message } from 'antd';
import { useState, useMemo } from 'react';
import { useGetAllProductsQuery } from '../../redux/features/management/productApi';
import { useCreateSaleMutation } from '../../redux/features/management/saleApi';
import { IProduct } from '../../types/product.types';
import { IStockInsufficientItem, ISaleItem } from '../../types/sale.type';
import dayjs from 'dayjs';

interface SelectedProduct extends IProduct {
  selectedQuantity: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateSaleOrderModal = ({ open, onClose }: Props) => {
  const { data: productsData, isFetching: isLoadingProducts } = useGetAllProductsQuery({ limit: 100 });
  const [createSale, { isLoading: isCreating }] = useCreateSaleMutation();
  
  const [buyerName, setbuyerName] = useState('');
  const [saleDate, setSaleDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [insufficientItems, setInsufficientItems] = useState<IStockInsufficientItem[] | null>(null);
  const [showInsufficientTable, setShowInsufficientTable] = useState(false);

  const availableProducts = useMemo(() => {
    const selectedIds = selectedProducts.map(p => p._id);
    return (productsData?.data || []).filter((p: IProduct) => !selectedIds.includes(p._id) && p.stock > 0);
  }, [productsData?.data, selectedProducts]);

  const addProduct = () => {
    if (!selectedProductId) return;
    
    const product = (productsData?.data || []).find((p: IProduct) => p._id === selectedProductId);
    if (product) {
      setSelectedProducts(prev => [...prev, { ...product, selectedQuantity: 1 }]);
      setSelectedProductId(null);
    }
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setSelectedProducts(prev => 
      prev.map(p => 
        p._id === productId ? { ...p, selectedQuantity: Math.max(1, quantity) } : p
      )
    );
  };

  const resetForm = () => {
    setbuyerName('');
    setSaleDate(dayjs().format('YYYY-MM-DD'));
    setSelectedProducts([]);
    setSelectedProductId(null);
    setInsufficientItems(null);
    setShowInsufficientTable(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!buyerName.trim()) {
      message.error('请输入客户名称');
      return;
    }
    if (selectedProducts.length === 0) {
      message.error('请至少选择一个商品');
      return;
    }

    const items: ISaleItem[] = selectedProducts.map(p => ({
      product: p._id,
      productName: p.name,
      productPrice: p.price,
      quantity: p.selectedQuantity,
      totalPrice: p.price * p.selectedQuantity
    }));

    const payload = {
      items,
      buyerName: buyerName.trim(),
      date: saleDate
    };

    try {
      const res = await createSale(payload).unwrap();
      if (res.statusCode === 201) {
        message.success(res.message || '销售订单创建成功');
        handleClose();
      }
    } catch (error: any) {
      if (error?.data?.insufficientItems && error.data.insufficientItems.length > 0) {
        setInsufficientItems(error.data.insufficientItems);
        setShowInsufficientTable(true);
        message.error(error.data.message || '部分商品库存不足');
      } else {
        message.error(error.data?.message || '创建销售订单失败');
      }
    }
  };

  const selectedColumns: TableColumnsType<SelectedProduct> = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '当前库存',
      dataIndex: 'stock',
      key: 'stock',
      align: 'center',
      render: (stock: number) => (
        <Tag color={stock > 10 ? 'green' : stock > 0 ? 'orange' : 'red'}>
          {stock}
        </Tag>
      ),
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (price: number) => `¥${price}`,
    },
    {
      title: '销售数量',
      key: 'quantity',
      align: 'center',
      render: (_, record) => (
        <InputNumber
          min={1}
          max={record.stock}
          value={record.selectedQuantity}
          onChange={(value) => updateQuantity(record._id, value || 1)}
          style={{ width: 100 }}
        />
      ),
    },
    {
      title: '小计',
      key: 'subtotal',
      align: 'center',
      render: (_, record) => `¥${(record.price * record.selectedQuantity).toFixed(2)}`,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeProduct(record._id)}
        />
      ),
    },
  ];

  const insufficientColumns: TableColumnsType<IStockInsufficientItem> = [
    {
      title: '商品名称',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '请求数量',
      dataIndex: 'requestedQuantity',
      key: 'requestedQuantity',
      align: 'center',
    },
    {
      title: '当前库存',
      dataIndex: 'currentStock',
      key: 'currentStock',
      align: 'center',
      render: (stock: number) => (
        <Tag color="red">{stock}</Tag>
      ),
    },
    {
      title: '错误原因',
      dataIndex: 'reason',
      key: 'reason',
    },
  ];

  const totalAmount = selectedProducts.reduce((sum, p) => sum + p.price * p.selectedQuantity, 0);

  return (
    <Modal
      title="创建销售订单"
      open={open}
      onCancel={handleClose}
      width={900}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          loading={isCreating}
          disabled={selectedProducts.length === 0}
        >
          创建订单
        </Button>,
      ]}
    >
      <Flex vertical gap={16} style={{ marginTop: 16 }}>
        <Flex gap={16} wrap>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label className="label">客户名称 *</label>
            <Input
              placeholder="请输入客户名称"
              value={buyerName}
              onChange={(e) => setbuyerName(e.target.value)}
            />
          </div>
          <div style={{ width: 200 }}>
            <label className="label">销售日期</label>
            <DatePicker
              style={{ width: '100%' }}
              value={dayjs(saleDate)}
              onChange={(date) => date && setSaleDate(date.format('YYYY-MM-DD'))}
            />
          </div>
        </Flex>

        <div>
          <label className="label">选择商品</label>
          <Flex gap={8} align="end">
            <Select
              style={{ flex: 1 }}
              placeholder="选择商品（仅显示库存大于0的商品）"
              value={selectedProductId}
              onChange={setSelectedProductId}
              loading={isLoadingProducts}
              optionFilterProp="children"
              showSearch
              filterOption={(input, option) =>
                (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
              }
              options={availableProducts.map((p: IProduct) => ({
                value: p._id,
                label: `${p.name} (库存: ${p.stock}, 单价: ¥${p.price})`,
              }))}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addProduct}
              disabled={!selectedProductId}
            >
              添加
            </Button>
          </Flex>
        </div>

        {selectedProducts.length > 0 && (
          <div>
            <label className="label">已选商品</label>
            <Table
              size="small"
              columns={selectedColumns}
              dataSource={selectedProducts}
              rowKey="_id"
              pagination={false}
              bordered
            />
            <Flex justify="end" style={{ marginTop: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 'bold' }}>
                订单总金额: ¥{totalAmount.toFixed(2)}
              </div>
            </Flex>
          </div>
        )}

        {showInsufficientTable && insufficientItems && (
          <div>
            <div style={{ color: 'red', marginBottom: 8, fontWeight: 'bold' }}>
              ⚠️ 以下商品库存不足，订单创建失败：
            </div>
            <Table
              size="small"
              columns={insufficientColumns}
              dataSource={insufficientItems}
              rowKey="product"
              pagination={false}
              bordered
            />
          </div>
        )}
      </Flex>
    </Modal>
  );
};

export default CreateSaleOrderModal;
