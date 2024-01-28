import { Button, Col, Flex, Row } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import toastMessage from '../lib/toastMessage';
import { useCreateNewProductMutation } from '../redux/features/productApi';

const CreateProduct = () => {
  const [createNewProduct] = useCreateNewProductMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const payload = { ...data };
    payload.price = Number(data.price);
    payload.quantity = Number(data.quantity);

    try {
      const res = await createNewProduct(payload).unwrap();
      if (res.statusCode === 201) {
        toastMessage({ icon: 'success', text: res.message });
        reset();
      }
    } catch (error: any) {
      console.log(error);
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <Flex justify='center' align='center'>
      <Flex
        vertical
        style={{
          width: '500px',
          margin: '1rem 0',
          padding: '1rem 3rem',
          border: '1px solid #164863',
          borderRadius: '.6rem',
        }}
      >
        <h1 style={{ marginBottom: '.7rem', textAlign: 'center' }}>Add New Flower</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput name='name' errors={errors} label='Name' register={register} />
          <CustomInput errors={errors} label='Color' name='color' register={register} />
          <CustomInput errors={errors} label='Type' name='type' register={register} />
          <CustomInput
            errors={errors}
            label='Price'
            type='number'
            name='price'
            register={register}
          />
          <CustomInput
            errors={errors}
            label='Quantity'
            type='number'
            name='quantity'
            register={register}
          />
          <CustomInput errors={errors} label='Fragrance' name='fragrance' register={register} />
          <CustomInput
            errors={errors}
            label='BloomDate'
            type='date'
            name='bloomDate'
            register={register}
          />
          <Row>
            <Col span={6}>
              <label htmlFor='Size' className='label'>
                Size
              </label>
            </Col>
            <Col span={18}>
              <select
                {...register('size', { required: true })}
                className={`input-field ${errors['size'] ? 'input-field-error' : ''}`}
              >
                <option value=''>Select Product Size*</option>
                <option value='SMALL'>Small</option>
                <option value='MEDIUM'>Medium</option>
                <option value='LARGE'>Large</option>
              </select>
            </Col>
          </Row>

          <Flex justify='center'>
            <Button
              htmlType='submit'
              type='primary'
              style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
            >
              Create Product
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default CreateProduct;
