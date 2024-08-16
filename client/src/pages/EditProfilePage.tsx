import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row } from 'antd';
import userProPic from '../assets/User.png';
import CustomInput from '../components/CustomInput';
import { useForm } from 'react-hook-form';
import { profileInputFields } from '../constant/profile';
import { useGetSelfProfileQuery, useUpdateProfileMutation } from '../redux/features/authApi';
import Loader from '../components/Loader';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { config } from '../utils/config';

const EditProfilePage = () => {
  const { data, isLoading } = useGetSelfProfileQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const toastId = toast.loading('Uploading Image...');

    const image = e.target.files?.[0] as any;
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', config.VITE_CLOUDINARY_UPLOAD_PRESET as string);
    data.append('cloud_name', config.VITE_CLOUDINARY_CLOUD_NAME as string);
    data.append('folder', 'inventory');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${config.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      );
      const res = await response.json();

      if (res.secure_url) {
        const imgUploadRes = await updateProfile({ avatar: res.secure_url }).unwrap();

        if (imgUploadRes.success) {
          toast.success('Profile updated successfully', { id: toastId });
        }
        toast.success('Image Uploaded Successfully, now save update!', { id: toastId });
      } else {
        toast.error('Failed to Upload Image', { id: toastId });
      }
    } catch (error) {
      toast.error('Failed to Upload Image', { id: toastId });
    }
  };

  return (
    <Row>
      <Col xs={{ span: 24 }} lg={{ span: 8 }}>
        <Flex align='center' vertical style={{ margin: '1rem 0' }}>
          <Flex
            justify='center'
            style={{
              width: '250px',
              height: '250px',
              border: '2px solid gray',
              padding: '.5rem',
              borderRadius: '50%',
            }}
          >
            <img
              src={data?.data?.avatar || userProPic}
              alt='user'
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          </Flex>
          <Flex style={{ padding: '1rem' }}>
            <input
              type='file'
              name='avatar'
              id='avatar'
              placeholder='Change Profile Picture'
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label
              htmlFor='avatar'
              style={{
                background: '#164863',
                color: '#fff',
                padding: '.5rem 1rem',
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
                fontSize: '1rem',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              <UploadOutlined />
              Change Profile Picture
            </label>
          </Flex>
        </Flex>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 16 }}>
        <Flex justify='end' style={{ margin: '1rem 0' }}>
          <Button type='default' onClick={() => navigate('/profile')}>
            <ArrowLeftOutlined /> Go Back
          </Button>
        </Flex>
        <EditProfileForm data={data?.data} />
      </Col>
    </Row>
  );
};

export default EditProfilePage;

const EditProfileForm = ({ data }: { data: any }) => {
  const navigate = useNavigate();
  const [updateProfile] = useUpdateProfileMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: data });

  const onSubmit = async (data: any) => {
    delete data._id;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.__v;

    for (const key in data) {
      if (data[key] === '' || data[key] === undefined || data[key] === null || !data[key]) {
        delete data[key];
      }
    }

    const toastId = toast.loading('Updating profile...');
    try {
      const res = await updateProfile(data).unwrap();

      if (res.success) {
        toast.success('Profile updated successfully', { id: toastId });
        navigate('/profile');
      }
    } catch (error) {
      toast.error('Failed to update profile', { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {profileInputFields.map((input) => (
        <CustomInput
          key={input.id}
          name={input.name}
          errors={errors}
          label={input.label}
          register={register}
          required={false}
        />
      ))}

      <Flex justify='center'>
        <Button
          htmlType='submit'
          type='primary'
          style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
        >
          Update Profile
        </Button>
      </Flex>
    </form>
  );
};
