import { Button, Flex } from 'antd';
import { useState } from 'react';
import { useCreateCategoryMutation } from '../../redux/features/management/categoryApi';
import toastMessage from '../../lib/toastMessage';
import { SpinnerIcon } from '@phosphor-icons/react';

const CreateCategory = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [category, setCategory] = useState('');

  const handleClick = async () => {
    try {
      const res = await createCategory({ name: category }).unwrap();
      if (res.statusCode === 201) {
        toastMessage({ icon: 'success', text: res.message });
        setCategory('');
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
        Create New Category
      </h3>
      <input
        type='text'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className='input-field'
        placeholder='Category Name'
      />
      <Button
        htmlType='button'
        onClick={handleClick}
        type='primary'
        disabled={isLoading}
        style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
      >
        {isLoading && <SpinnerIcon className='spin' weight='bold' />}
        Create Category
      </Button>
    </Flex>
  );
};

export default CreateCategory;
