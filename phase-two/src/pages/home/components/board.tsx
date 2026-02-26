import React from 'react';
import { useEffect,useState } from 'react';
import { Col, Row,Statistic,Badge } from 'antd';
import { RiseOutlined,FieldTimeOutlined,TeamOutlined} from '@ant-design/icons';
import type { DashboardStats } from '@/components/types';
import { useBookingStore } from '@/stores/bookingStore';
import Card from 'antd/es/card/Card';

//实时数据
export const Dashboard: React.FC = () => {
  const getDashboardStats = useBookingStore(state => state.getDashboardStats);
  const [stats, setStats] = useState<DashboardStats>({
    weeklyBookings: 0,
    todayRemainingHours: 14,
    totalParticipants: 0,
  });

  // 模拟实时数据
useEffect(() => {
    const updateStats = () => {
      setStats(getDashboardStats());
    };
    
    updateStats();
    const timer = setInterval(updateStats, 30000); // 刷新
    
    return () => clearInterval(timer);
  }, [getDashboardStats]);

  return (
    <Row gutter={[24,24]} style={{ marginBottom: 24, width:'100%',height:150 }}>
      {/* 本周预约数 */}
      <Col span={8}>
        <Card    style={{width:250,height:150}}>
          <Statistic
            title="本周预约数"
            value={stats.weeklyBookings}
            prefix={<RiseOutlined />}
            valueStyle={{ color: '#38c2e0ff' }}
          />
          <Badge status="processing" text="实时更新" style={{ marginTop: 8 ,width:200,height:50 }} />
        </Card>
      </Col>
      
      {/* 今日剩余时长 */}
      <Col span={8}>
        <Card    style={{width:250,height:150}}>
          <Statistic
            title="今日剩余时长"
            value={stats.todayRemainingHours}
            suffix="小时"
            prefix={<FieldTimeOutlined />}
            valueStyle={{ 
              color: stats.todayRemainingHours < 4 ? '#ff4d4f' : '#52c41a' 
            }}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#999' ,width:200,height:50}}>
            总开放时长：14小时（8:00-22:00）
          </div>
        </Card>
      </Col>
      
      {/* 累计人次 */}
      <Col span={8}>
        <Card   className="dashboard-card" style={{width:250,height:150}}>
          <Statistic
            title="累计参与人次"
            value={stats.totalParticipants}
            prefix={<TeamOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#999' ,width:200,height:50}}>
            仅统计已结束和进行中的活动
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
