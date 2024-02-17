import { Button, Flex } from 'antd';
import CreateSellerModal from '../modal/CreateSellerModal';
import { useState } from 'react';

const CreateSeller = () => {
  const [createSellerModalOpen, setCreateSellerModalOpen] = useState(false);

  return (
    <>
      <Flex
        vertical
        style={{
          padding: '1rem 2rem',
          border: '1px solid #b6cbd7',
          borderRadius: '.6rem',
          marginBottom: '1rem',
        }}
      >
        <h3
          style={{
            textAlign: 'center',
            marginBottom: '.6rem',
            fontWeight: '900',
            textTransform: 'uppercase',
          }}
        >
          Create New Seller
        </h3>

        <Button
          htmlType='submit'
          type='primary'
          style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
          onClick={() => setCreateSellerModalOpen(true)}
        >
          Create Seller
        </Button>
      </Flex>

      <CreateSellerModal
        openModal={createSellerModalOpen}
        setOpenModal={setCreateSellerModalOpen}
      />
    </>
  );
};

export default CreateSeller;
