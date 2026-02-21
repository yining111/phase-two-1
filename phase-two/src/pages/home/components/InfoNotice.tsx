import React from 'react';
import { Alert,  Typography } from 'antd';
import Card from 'antd/es/card/Card';
import { ClockCircleOutlined, HourglassOutlined, CalendarOutlined,ExclamationCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

//顶部提示
export const InfoNotice: React.FC = () => {
  return (
    <Card className="info-card" style={{ marginBottom: 24 ,width:1000,height:300}}>
      <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
        活动室使用规范
      </Title>
      
      <div style={{ display: 'grid', gap: 15, gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {/* 开放时间 */}
        <div className="info-item" style={{width:250,height:50}}>
          <ClockCircleOutlined style={{ color: '#1890ff', fontSize: 20 }} />
          <div>
            <div style={{ fontWeight: 'bold', color: '#333' }}>开放时间</div>
            <div style={{ color: '#666' }}>每日 8:00 - 22:00</div>
          </div>
        </div>
        
        {/* 时长限制 */}
        <div className="info-item" style={{width:250,height:50}}>
          <HourglassOutlined style={{ color: '#52c41a', fontSize: 20 }} />
          <div>
            <div style={{ fontWeight: 'bold', color: '#333' }}>预约时长</div>
            <div style={{ color: '#666' }}>每次 1-4 小时</div>
          </div>
        </div>
        
        {/* 提前预约 */}
        <div className="info-item" style={{width:250,height:50}}>
          <CalendarOutlined style={{ color: '#fa8c16', fontSize: 20 }} />
          <div>
            <div style={{ fontWeight: 'bold', color: '#333' }}>提前预约</div>
            <div style={{ color: '#666' }}>需提前 1-7 天预约</div>
          </div>
        </div>
      </div>
      
      <Alert
        message="温馨提示"
        description="活动结束后请保持室内整洁，带走个人物品"
        type="warning"
        showIcon
        icon={<ExclamationCircleOutlined />}
        style={{ marginTop: 20 }}
      />
    </Card>
  );
};