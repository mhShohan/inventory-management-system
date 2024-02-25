import { Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Flex justify='center' align='center' style={{ height: '100vh' }}>
      <Flex
        vertical
        gap={10}
        align='center'
        style={{ border: '1px solid #000', padding: '3rem', borderRadius: '.8rem' }}
      >
        <h1>404! Not Found...</h1>
        <h3>Your requested page does not exists...!!!</h3>
        <Button type='primary' onClick={handleClick}>
          Go Back
        </Button>
      </Flex>
    </Flex>
  );
};

export default NotFound;
