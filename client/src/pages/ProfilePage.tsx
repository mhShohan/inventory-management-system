import { Flex } from 'antd';
import Loader from '../components/Loader';
import { useGetSelfProfileQuery } from '../redux/features/authApi';

const ProfilePage = () => {
  const { data, isLoading } = useGetSelfProfileQuery(undefined);

  if (isLoading) return <Loader />;

  return (
    <Flex justify='center' align='center' style={{ minHeight: 'calc(100vh - 10rem)' }}>
      <Flex vertical align='center'>
        <h1 style={{ fontSize: '3rem', textTransform: 'uppercase' }}>Welcome</h1>
        <h2 style={{ fontSize: '2rem' }}>Name: {data?.data?.name}</h2>
        <h2 style={{ fontSize: '1.5rem' }}> {data?.data?.email}</h2>
      </Flex>
    </Flex>
  );
};

export default ProfilePage;
