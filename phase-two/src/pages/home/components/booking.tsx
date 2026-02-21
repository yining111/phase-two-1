import React from 'react';
import { Tag, Typography } from 'antd';
import { ClockCircleOutlined, UserOutlined, CheckCircleOutlined, SyncOutlined} from '@ant-design/icons';
import { useBookingStore } from '../../../stores/bookingStore';
import { formatDate, getWeekDay } from '../../../utils/dateUtils';

const { Title, Text } = Typography;
//预约
export const BookingDetails: React.FC = () => {
  const { 
    selectedDate, 
    getSelectedDateBookings 
  } = useBookingStore();

  const bookings = getSelectedDateBookings();

  // 状态标签配置
  const statusConfig = {
    ongoing: { 
      color: 'processing', 
      icon: <SyncOutlined spin />, 
      text: '进行中',
      tagColor: 'blue'
    },
    upcoming: { 
      color: 'default', 
      icon: <ClockCircleOutlined />, 
      text: '未开始',
      tagColor: 'green'
    },
    ended: { 
      color: 'success', 
      icon: <CheckCircleOutlined />, 
      text: '已结束',
      tagColor: 'default'
    },
  };

  if (!selectedDate) {
    return <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>请选择日期</div>;
  }

  return (
    <div>
      {/* 日期标题 */}
      <div style={{ marginBottom: 16 ,width:300,height:50}}>
        <Title level={5} style={{ margin: 0 }}>
          {formatDate(selectedDate)} {getWeekDay(selectedDate)}
        </Title>
        <Text type="secondary">
          共 {bookings.length} 个预约
        </Text>
      </div>

      {bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#999' ,width:400,height:50}}>
          今日无预约
        </div>
      ) : (
        <div style={{ paddingLeft: '24px',width:400,height:50 }}>
          {bookings.map((booking, index) => {
            const status = statusConfig[booking.status];
            const isLast = index === bookings.length - 1;
            
            return (
              <div key={booking.id} style={{ position: 'relative', marginBottom: '24px' ,width:400,height:60}}>
                {/* 时间轴点 */}
                <div 
                  style={{
                    position: 'absolute',
                    left: '-24px',
                    top: '4px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: booking.status === 'ongoing' ? '#1890ff' : 
                                   booking.status === 'ended' ? '#8c8c8c' : '#52c41a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '10px',
                    zIndex: 1
                  }}
                >
                  {status.icon}
                </div>
                
                {/* 时间轴线 */}
                {!isLast && (
                  <div 
                    style={{
                      position: 'absolute',
                      left: '-16px',
                      top: '20px',
                      width: '2px',
                      height: '40px',
                      backgroundColor: '#e8e8e8'
                    }}
                  />
                )}
                
                <div style={{ marginLeft: '8px' ,width:400,height:40}}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <Tag color={status.tagColor} style={{ marginRight: '8px' }}>{status.text}</Tag>
                    <Text strong>{booking.theme}</Text>
                    <Text type="secondary" style={{ marginLeft: '12px' }}>
                      {booking.startTime} - {booking.endTime}
                    </Text>
                  </div>
                  
                  <div style={{ color: '#666', fontSize: '14px' ,width:400,height:40}}>
                    <div style={{ marginBottom: '2px' }}>
                      <UserOutlined style={{ marginRight: '6px', fontSize: '14px' }} />
                      {booking.applicant} ({booking.team})
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};