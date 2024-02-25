import { Button, Col, Flex, Modal, Row } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import toastMessage from '../../lib/toastMessage';
import { useUpdateProductMutation } from '../../redux/features/management/productApi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getUpdateModal,
  getUpdateModalData,
  toggleUpdateModel,
} from '../../redux/services/modal.Slice';
import { IProduct } from '../../types/product.types';
import ModalInput from './ModalInput';

const EditModal = () => {
  const modalOpen = useAppSelector(getUpdateModal);
  const data = useAppSelector(getUpdateModalData);
  const [updateProduct] = useUpdateProductMutation();
  const dispatch = useAppDispatch();
  const [updateDate, setUpdateDate] = useState<Partial<IProduct>>();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUpdateDate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    const payload = { ...updateDate };
    payload.price = Number(updateDate?.price);
    payload.stock = Number(updateDate?.stock);

    try {
      const res = await updateProduct({ id: updateDate?._id, payload }).unwrap();

      if (res.statusCode === 200) {
        toastMessage({ icon: 'success', text: res.message });
        dispatch(toggleUpdateModel({ open: false, data: null }));
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  useEffect(() => {
    setUpdateDate(data!);
  }, [data]);

  return (
    <>
      <Modal
        title='Update Product'
        centered
        open={modalOpen}
        onOk={() => dispatch(toggleUpdateModel({ open: false, data: null }))}
        onCancel={() => dispatch(toggleUpdateModel({ open: false, data: null }))}
        footer={[
          <Button
            key='back'
            onClick={() => dispatch(toggleUpdateModel({ open: false, data: null }))}
          >
            Close
          </Button>,
        ]}
      >
        <form>
          <ModalInput
            handleChange={handleChange}
            name='name'
            defaultValue={updateDate?.name}
            label='Name'
          />
          <ModalInput
            handleChange={handleChange}
            label='Price'
            type='number'
            defaultValue={updateDate?.price}
            name='price'
          />
          <Row>
            <Col span={6}>
              <label htmlFor='Size' className='label'>
                Size
              </label>
            </Col>
            <Col span={18}>
              <select
                name='size'
                defaultValue={updateDate?.size}
                value={updateDate?.size}
                onChange={handleChange}
                className={`input-field`}
              >
                <option value=''>Select Product Size*</option>
                <option value='SMALL'>Small</option>
                <option value='MEDIUM'>Medium</option>
                <option value='LARGE'>Large</option>
              </select>
            </Col>
          </Row>
          <Flex justify='center' style={{ margin: '1rem' }}>
            <Button key='submit' type='primary' onClick={onSubmit}>
              Update
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;
