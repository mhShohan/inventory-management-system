import { Button, Flex, Modal } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import CustomInput from '../CustomInput';
import { useCreateSellerMutation } from '../../redux/features/management/sellerApi';
import toastMessage from '../../lib/toastMessage';

interface CreateSellerModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSellerModal = ({ openModal, setOpenModal }: CreateSellerModalProps) => {
  const [createSeller] = useCreateSellerMutation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await createSeller(data).unwrap();
      if (res.statusCode === 201) {
        reset();
        toastMessage({ icon: 'success', text: res.message });
        setOpenModal(false);
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <>
      <Modal
        title='Create New Seller!'
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={[
          <Button key='back' onClick={() => setOpenModal(false)}>
            Close
          </Button>,
        ]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            name='name'
            errors={errors}
            register={register}
            label='Seller Name'
            required={true}
          />
          <CustomInput
            name='email'
            errors={errors}
            register={register}
            label='Seller Email'
            required={true}
          />
          <CustomInput
            name='contactNo'
            errors={errors}
            register={register}
            label='Contact No.'
            required={true}
          />
          <Flex justify='center' style={{ margin: '1rem' }}>
            <Button key='submit' type='primary' htmlType='submit'>
              Create Seller
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default CreateSellerModal;
