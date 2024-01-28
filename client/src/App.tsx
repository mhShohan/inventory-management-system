import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { ConfigProvider } from 'antd';

const App = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Nunito',
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
};

export default App;
