import { Flex } from 'antd';
import loader from '../assets/loading.gif';

const Loader = () => (
  <Flex
    gap='small'
    justify='center'
    align='center'
    style={{
      height: 'calc(100vh - 10rem)',
    }}
  >
    <Flex gap='small' justify='center' align='center'>
      <img src={loader} alt='loader' />
    </Flex>
  </Flex>
);

export default Loader;
