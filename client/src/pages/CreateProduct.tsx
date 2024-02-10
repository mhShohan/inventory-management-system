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

    if (payload.size === '') {
      delete payload.size;
    }

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
    <Row
      gutter={30}
      style={{
        height: 'calc(100vh - 6rem)',
        overflow: 'auto',
      }}
    >
      <Col
        xs={{ span: 24 }}
        lg={{ span: 14 }}
        style={{
          display: 'flex',
        }}
      >
        <Flex
          vertical
          style={{
            width: '100%',
            padding: '1rem 2rem',
            border: '1px solid #164863',
            borderRadius: '.6rem',
          }}
        >
          <h1
            style={{
              marginBottom: '.8rem',
              fontWeight: '900',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
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
                  {...register('brand', { required: true })}
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
                <select className={`input-field`}>
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
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 10 }}>
        <Flex
          vertical
          style={{
            width: '100%',
            height: '100%',
            padding: '1rem 2rem',
            border: '1px solid #164863',
            borderRadius: '.6rem',
            justifyContent: 'space-around',
          }}
        >
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
            <input type='text' className='input-field' placeholder='Category Name' />
            <Button
              htmlType='submit'
              type='primary'
              style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
            >
              Create Category
            </Button>
          </Flex>
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
            <input type='text' className='input-field' placeholder='Brand Name' />
            <Button
              htmlType='submit'
              type='primary'
              style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
            >
              Create Brand
            </Button>
          </Flex>
        </Flex>
      </Col>
    </Row>
  );
};

export default CreateProduct;
