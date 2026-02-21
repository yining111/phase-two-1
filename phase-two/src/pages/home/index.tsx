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
    <div className={styles.container}>
      {/* 信息公示区 */}
      <InfoNotice />
      {/* 数据看板 */}
      <Dashboard />
      <Divider />
      
      {/* 底部 */}
      <Row gutter={[16, 16]} >
        {/* 左侧：日历 */}
        <Col span={12}>
          <Card
            title=" 预约日历" 
            bordered={false}  style={{width:450,height:450}}  className={styles.card}
          >
            <MonthCalendar />
          </Card>
        </Col>
        
        {/* 右侧：预约详情 */}
        <Col span={12}>
          <Card
            title=" 预约详情" 
            bordered={false}  style={{width:400,height:400}}  className={styles.card}
          >
            <BookingDetails />
          </Card>
        </Col >
      </Row>
    </div>
  );
};

export default HomePage;