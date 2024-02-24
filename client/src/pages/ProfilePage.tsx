import { Flex, Tag } from 'antd';
import Loader from '../components/Loader';
import { useGetSelfProfileQuery } from '../redux/features/authApi';

const ProfilePage = () => {
  const { data, isLoading } = useGetSelfProfileQuery(undefined);

  if (isLoading) return <Loader />;

  console.log(data);

  return (
    <Flex justify='center' align='center' style={{ minHeight: 'calc(100vh - 10rem)' }}>
      <Flex
        align='center'
        style={{
          minWidth: '400px',
          border: '1px solid gray',
          padding: '1rem',
          borderRadius: '1rem',
          gap: '1rem',
        }}
      >
        <Flex
          justify='center'
          align='center'
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: 'lightblue',
            borderRadius: '50%',
          }}
        >
          <h1>
            {data?.data?.name
              .split(' ')
              .map((item: string) => item.charAt(0).toUpperCase())
              .join('')}
          </h1>
        </Flex>
        <div>
          <h1 style={{ lineHeight: '1.2rem' }}>Name: {data?.data?.name}</h1>
          <h3> {data?.data?.email}</h3>
          {data?.data.status === 'BLOCK' && <Tag color='red'>{data?.data.status}</Tag>}
          {data?.data.status === 'ACTIVE' && <Tag color='green'>{data?.data.status}</Tag>}
        </div>
      </Flex>
    </Flex>
  );
};

export default ProfilePage;
