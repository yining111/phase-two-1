import { Layout, Menu, Typography } from 'antd';
import { CalendarOutlined,  PlusCircleOutlined, HistoryOutlined} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Layout1.module.css';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
interface MainLayoutProps {
  children: React.ReactNode;
}

//主要
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
    <Layout className={styles.layout}>
      {/* 顶部*/}
      <Header className={styles.header} style={{width:200}}>
        <Title level={4} className={styles.title} style={{width:200}}>
          科协430活动室预约系统
        </Title>
      </Header>

      <Layout>
        {/* 侧边栏 */}
        <Sider width={200} className={styles.sider} theme="light" >
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            items={menuItems}
            onClick={({ key}) => navigate(key)}
            className={styles.menu}
          />
        </Sider>

        {/* 主内容区 */}
        <Content className={styles.content}>
          <div className={styles.mainContent}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};