import { Button, Col, Flex, Row } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import toastMessage from '../lib/toastMessage';
import { useCreateNewProductMutation } from '../redux/features/productApi';
import { useGetAllCategoriesQuery } from '../redux/features/categoryApi';
import { ICategory } from '../types/prduct.types';
import { useGetAllBrandsQuery } from '../redux/features/brandApi';

const CreateProduct = () => {
  const [createNewProduct] = useCreateNewProductMutation();
  const { data: categories } = useGetAllCategoriesQuery(undefined);
  const { data: brands } = useGetAllBrandsQuery(undefined);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const payload = { ...data };
    payload.price = Number(data.price);
    payload.stock = Number(data.stock);

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
          padding: '1rem 2rem',
          border: '1px solid #164863',
          borderRadius: '.6rem',
        }}
      >
        <h1 style={{ marginBottom: '.4rem', textAlign: 'center', textTransform: 'uppercase' }}>
          Add New Product
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            name='name'
            errors={errors}
            label='Name'
            register={register}
            required={true}
          />
          <CustomInput
            errors={errors}
            label='Price'
            type='number'
            name='price'
            register={register}
            required={true}
          />
          <CustomInput
            errors={errors}
            label='Stock'
            type='number'
            name='stock'
            register={register}
            required={true}
          />

          <Row>
            <Col xs={{ span: 23 }} lg={{ span: 6 }}>
              <label htmlFor='Size' className='label'>
                Category
              </label>
            </Col>
            <Col xs={{ span: 23 }} lg={{ span: 18 }}>
              <select
                {...register('category', { required: true })}
                className={`input-field ${errors['category'] ? 'input-field-error' : ''}`}
              >
                <option value=''>Select Category*</option>
                {categories?.data.map((item: ICategory) => (
                  <option value={item._id}>{item.name}</option>
                ))}
              </select>
            </Col>
          </Row>

          <Row>
            <Col xs={{ span: 23 }} lg={{ span: 6 }}>
              <label htmlFor='Size' className='label'>
                Brand
              </label>
            </Col>
            <Col xs={{ span: 23 }} lg={{ span: 18 }}>
              <select
                {...register('brand')}
                className={`input-field ${errors['brand'] ? 'input-field-error' : ''}`}
              >
                <option value=''>Select brand</option>
                {brands?.data.map((item: ICategory) => (
                  <option value={item._id}>{item.name}</option>
                ))}
              </select>
            </Col>
          </Row>

          <CustomInput label='Variant' name='variant' register={register} />

          <CustomInput label='Description' name='description' register={register} />

          <Row>
            <Col xs={{ span: 23 }} lg={{ span: 6 }}>
              <label htmlFor='Size' className='label'>
                Size
              </label>
            </Col>
            <Col xs={{ span: 23 }} lg={{ span: 18 }}>
              <select
                {...register('size', { required: true })}
                className={`input-field ${errors['size'] ? 'input-field-error' : ''}`}
              >
                <option value=''>Select Product Size</option>
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
