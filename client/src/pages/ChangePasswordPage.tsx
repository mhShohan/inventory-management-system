import { Button, Flex, Input } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';
import { useChangePasswordMutation } from '../redux/features/authApi';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ChangePasswordPage = () => {
  const [changePassword] = useChangePasswordMutation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must have 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Password and confirm password does not match');
      return;
    }

    const payload = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    try {
      const toastId = toast.loading('Changing password...');
      const res = await changePassword(payload).unwrap();

      if (res.success) {
        toast.success('Password changed successfully', { id: toastId });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        navigate('/profile');
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: error.data.statusCode });
    }
  };

  return (
    <Flex justify='center' align='center' style={{ height: 'calc(100vh - 10rem)' }}>
      <Flex
        vertical
        gap={6}
        style={{
          maxWidth: '500px',
          minWidth: '350px',
          border: '1px solid gray',
          padding: '2rem',
          borderRadius: '.4rem',
        }}
      >
        <Input.Password
          size='large'
          placeholder='Old Password'
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input.Password
          size='large'
          placeholder='New Password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input.Password
          size='large'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type='primary' onClick={handleSubmit} disabled={true}>
          Change Password
        </Button>
        <Button type='default' onClick={() => navigate('/profile')}>
          <ArrowLeftOutlined /> Go Back
        </Button>
      </Flex>
    </Flex>
  );
};

export default ChangePasswordPage;
