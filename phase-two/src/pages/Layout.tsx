import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { CalendarOutlined, PlusCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
interface MainLayoutProps {
  children: React.ReactNode;
}

//主要
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 菜单项配置
  const menuItems = [
    {
      key: '/',
      icon: <CalendarOutlined />,
      label: '首页',
    },
    {
      key: '/booking',
      icon: <PlusCircleOutlined />,
      label: '我要预约',
    },
    {
      key: '/history',
      icon: <HistoryOutlined />,
      label:'历史记录',
    },
  ];
  const selectedKeys = [location.pathname];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 顶部导航栏 - 固定在顶部 */}
      <Header style={{ 
        background: 'linear-gradient(135deg, rgb(40, 160, 230))', 
        padding: '0 16px', 
        display: 'flex', 
        alignItems: 'center', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 100,
        height: '64px'
      }}>
        <Title level={4} style={{ color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
          科协430活动室预约系统
        </Title>
      </Header>

      {/* 主体布局 */}
      <Layout style={{ marginTop: '64px', minHeight: 'calc(100vh - 64px)', display: 'flex' }}>
        {/* 侧边栏 - 固定在左侧 */}
        <Sider 
          width={200}
          collapsed={isMobile ? true : collapsed}
          collapsedWidth={0}
          style={{ 
            background: 'white', 
            boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
            position: 'fixed',
            left: 0,
            top: '64px',
            bottom: 0,
            zIndex: 90
          }}
          theme="light"
        >
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            style={{ height: '100%', borderRight: 0, paddingTop: '16px' }}
          />
        </Sider>

        {/* 主内容区 - 可滚动 */}
        <Content style={{ marginLeft: isMobile ? 0 : 200, minHeight: 'calc(100vh - 64px)', padding: 0, overflow: 'auto' }}>
          <div style={{ padding: '16px', width: '100%' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};