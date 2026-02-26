import React from 'react';
import { Row, Col, Divider, Card } from 'antd';
import { MonthCalendar } from '@/components/calendar/Calendar';
import { InfoNotice } from './components/InfoNotice';
import { Dashboard } from '@/pages/home/components/board';
import { BookingDetails } from './components/booking';
import styles from './index.module.css';

//首页
const HomePage: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col max-w-1200 mx-auto px-4">
      {/* 信息公示区 */}
      <InfoNotice />
      {/* 数据看板 */}
      <Dashboard />
      <Divider />
      
      {/* 底部 */}
      <Row gutter={[24, 24]} justify="center">
        {/* 左侧：日历 */}
        <Col span={12} style={{ maxWidth: 450 }}>
          <Card
            title=" 预约日历" 
            bordered={false}  className={styles.card}
          >
            <MonthCalendar />
          </Card>
        </Col>
        
        {/* 右侧：预约详情 */}
        <Col span={12} style={{ maxWidth: 450 }}>
          <Card
            title=" 预约详情" 
            bordered={false}  className={styles.card}
          >
            <BookingDetails />
          </Card>
        </Col >
      </Row>
    </div>
  );
};

export default HomePage;