import {useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {Button, Layout, Menu} from 'antd';
import {LogoutOutlined} from '@ant-design/icons';
import {sidebarItems} from '../../constant/sidebarItems';
import {useAppDispatch} from '../../redux/hooks';
import {logoutUser} from '../../redux/services/authSlice';

const {Content, Sider} = Layout;

const Sidebar = () => {
  const [showLogoutBtn, setShowLogoutBtn] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Layout style={{height: '100vh'}}>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        onCollapse={(collapsed, type) => {
          if (type === 'responsive') {
            setShowLogoutBtn(!collapsed);
          }
          if (type === 'clickTrigger') {
            setShowLogoutBtn(!collapsed);
          }
        }}
        width='220px'
        style={{
          backgroundColor: '#164863',
          position: 'relative',
        }}
      >
        <div className='demo-logo-vertical'>
          <h1 style={{color: '#fff', padding: '1rem', fontSize: '1.8rem', textAlign: 'center'}}>
            WELCOME
          </h1>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          style={{backgroundColor: '#164863', fontWeight: '700'}}
          defaultSelectedKeys={['Dashboard']}
          items={sidebarItems}
        />
        {showLogoutBtn && (
          <div
            style={{
              margin: 'auto',
              position: 'absolute',
              bottom: 0,
              padding: '1rem',
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Button
              type='primary'
              style={{
                width: '100%',
                backgroundColor: 'cyan',
                color: '#000',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
              onClick={handleClick}
            >
              <LogoutOutlined />
              Logout
            </Button>
          </div>
        )}
      </Sider>
      <Layout>
        <Content style={{padding: '2rem', background: '#BBE1FA'}}>
          <div
            style={{
              padding: '1rem',
              maxHeight: 'calc(100vh - 4rem)',
              minHeight: 'calc(100vh - 4rem)',
              background: '#fff',
              borderRadius: '1rem',
              overflow: 'auto',
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
