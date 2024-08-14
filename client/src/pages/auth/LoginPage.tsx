import { Button, Flex } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import toastMessage from '../../lib/toastMessage';
import { useLoginMutation } from '../../redux/features/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/services/authSlice';
import decodeToken from '../../utils/decodeToken';

const LoginPage = () => {
  const [userLogin] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'visitor@gmail.com',
      password: 'pass123',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Logging...');
    try {
      const res = await userLogin(data).unwrap();

      if (res.statusCode === 200) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate('/');
        toast.success('Successfully Login!', { id: toastId });
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  // if (isLoading) <Loader />;
  // else
  return (
    <Flex justify='center' align='center' style={{ height: '100vh' }}>
      <Flex
        vertical
        style={{
          width: '400px',
          padding: '3rem',
          border: '1px solid #164863',
          borderRadius: '.6rem',
        }}
      >
        <h1 style={{ marginBottom: '.7rem', textAlign: 'center', textTransform: 'uppercase' }}>
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            {...register('email', { required: true })}
            placeholder='Your Name*'
            className={`input-field ${errors['email'] ? 'input-field-error' : ''}`}
          />
          <input
            type='password'
            placeholder='Your Password*'
            className={`input-field ${errors['password'] ? 'input-field-error' : ''}`}
            {...register('password', { required: true })}
          />
          <Flex justify='center'>
            <Button
              htmlType='submit'
              type='primary'
              style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
            >
              Login
            </Button>
          </Flex>
        </form>
        <p style={{ marginTop: '1rem' }}>
          Don't have any account? <Link to='/register'>Resister Here</Link>
        </p>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
