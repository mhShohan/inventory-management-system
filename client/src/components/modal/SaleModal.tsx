import { Button, Flex, Modal } from 'antd';
import { ChangeEvent, useState } from 'react';
import toastMessage from '../../lib/toastMessage';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getSaleModal, getSaleModalData, toggleSaleModel } from '../../redux/services/modal.Slice';
import ModalInput from './ModalInput';
import { useCreateSaleMutation } from '../../redux/features/management/saleApi';

const SaleModal = () => {
  const modalOpen = useAppSelector(getSaleModal);
  const data = useAppSelector(getSaleModalData);
  const [createNewSale] = useCreateSaleMutation();
  const dispatch = useAppDispatch();
  const [updateDate, setUpdateDate] = useState({ buyerName: '', quantity: '', date: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUpdateDate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    const payload = {
      ...updateDate,
      product: data?._id as string,
      price: data?.price as number,
      productName: data?.name,
      productPrice: data?.price,
      quantity: Number(updateDate?.quantity),
    };

    try {
      const res = await createNewSale(payload).unwrap();

      if (res.statusCode === 201) {
        toastMessage({ icon: 'success', text: res.message });
        dispatch(toggleSaleModel({ open: false, data: null }));
        setUpdateDate({ buyerName: '', quantity: '', date: '' });
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <>
      <Modal
        title='New Product Sale'
        centered
        open={modalOpen}
        onOk={() => dispatch(toggleSaleModel({ open: false, data: null }))}
        onCancel={() => dispatch(toggleSaleModel({ open: false, data: null }))}
        footer={[
          <Button key='back' onClick={() => dispatch(toggleSaleModel({ open: false, data: null }))}>
            Close
          </Button>,
        ]}
      >
        <form>
          <ModalInput
            handleChange={handleChange}
            name='buyerName'
            defaultValue={updateDate?.buyerName}
            label='Buyer Name'
          />
          <ModalInput
            handleChange={handleChange}
            label='Quantity'
            type='number'
            name='quantity'
            defaultValue={updateDate?.quantity}
          />
          <ModalInput
            handleChange={handleChange}
            label='Selling Date'
            type='date'
            name='date'
            defaultValue={updateDate?.date}
          />

          <Flex justify='center' style={{ margin: '1rem' }}>
            <Button key='submit' type='primary' onClick={onSubmit}>
              Sell
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default SaleModal;
