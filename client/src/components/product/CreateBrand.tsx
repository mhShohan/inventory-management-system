import { Button, Flex } from 'antd';
import { useState } from 'react';
import { useCreateBrandMutation } from '../../redux/features/management/brandApi';
import toastMessage from '../../lib/toastMessage';

const CreateBrand = () => {
  const [createCategory] = useCreateBrandMutation();
  const [brand, setBrand] = useState('');

  const handleClick = async () => {
    try {
      const res = await createCategory({ name: brand }).unwrap();
      if (res.statusCode === 201) {
        toastMessage({ icon: 'success', text: res.message });
        setBrand('');
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };
  return (
    <Flex
      vertical
      style={{
        padding: '1rem 2rem',
        border: '1px solid #b6cbd7',
        borderRadius: '.6rem',
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
        Create New Brand
      </h3>
      <input
        type='text'
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className='input-field'
        placeholder='Brand Name'
      />
      <Button
        htmlType='button'
        onClick={handleClick}
        type='primary'
        style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
      >
        Create Brand
      </Button>
    </Flex>
  );
};

export default CreateBrand;
