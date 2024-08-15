import { EditFilled, EditOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row } from 'antd';
import userProPic from '../assets/User.png';
import Loader from '../components/Loader';
import { useGetSelfProfileQuery } from '../redux/features/authApi';
import { profileKeys } from '../constant/profile';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { data, isLoading } = useGetSelfProfileQuery(undefined);

  if (isLoading) return <Loader />;

  return (
    <>
      <Flex vertical style={{ minHeight: 'calc(100vh - 10rem)' }}>
        <Flex justify='center' style={{ width: '100%' }}>
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
        </Flex>

        <Flex justify='center' style={{ margin: '1rem' }}>
          <Flex gap={16} wrap='wrap' justify='center'>
            <Link to='/edit-profile'>
              <Button type='primary'>
                <EditOutlined />
                Edit Profile
              </Button>
            </Link>
            <Link to='/change-password'>
              <Button type='primary'>
                <EditFilled />
                Change Password
              </Button>
            </Link>
          </Flex>
        </Flex>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 4 }}></Col>
          <Col
            xs={{ span: 24 }}
            lg={{ span: 16 }}
            style={{
              maxWidth: '700px',
              border: '1px solid gray',
              padding: '1rem 2rem',
              borderRadius: '1rem',
            }}
          >
            {profileKeys.map((key) => (
              <ProfileInfoItems keyName={key.keyName} value={data?.data[key.keyName]} />
            ))}
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 4 }}></Col>
        </Row>
      </Flex>
    </>
  );
};

export default ProfilePage;

const ProfileInfoItems = ({ keyName, value }: { keyName: string; value: string }) => {
  return (
    <Flex style={{ width: '100%' }} gap={24}>
      <h2 style={{ flex: 1, fontWeight: '700', textTransform: 'capitalize' }}>{keyName}</h2>
      <h3 style={{ flex: 4, fontWeight: '500' }}>{value}</h3>
    </Flex>
  );
};
