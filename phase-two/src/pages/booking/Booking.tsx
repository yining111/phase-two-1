import { useState } from 'react';
import { Card, Form, DatePicker, TimePicker, Input, Button,  message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../stores/bookingStore';
import dayjs from 'dayjs';

interface BookingFormValues {
  date: dayjs.Dayjs;
  startTime: dayjs.Dayjs;
  endTime: dayjs.Dayjs;
  theme: string;
  name: string;
  team: string;
  participants: number;
}

const Booking: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const addBooking = useBookingStore(state => state.addBooking);

  //提交
  const handleSubmit = async (values: BookingFormValues) => {
    setLoading(true);
    try {
      // 提交
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // store
      addBooking({
        date: values.date.format('YYYY-MM-DD'),
        startTime: values.startTime.format('HH:mm'),
        endTime: values.endTime.format('HH:mm'),
        theme: values.theme,
        applicant: values.name,
        team: values.team,
        participants: values.participants,
        status: 'upcoming',
      });
      
      message.success('预约成功！');
      
      // 重置
      form.resetFields();
      
      // 跳转到首页
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      message.error('预约失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', width: 1000, height: 1000 }}>
      <Card title="活动室预约" bordered={false} style={{ maxWidth: 800, margin: '0 auto' }}>
        <Form form={form}  layout="vertical" onFinish={handleSubmit}
          initialValues={{
            date: dayjs(),
            startTime: dayjs('09:00', 'HH:mm'),
            endTime: dayjs('10:00', 'HH:mm'),
            room: '430活动室',
          }}>
  
          <Form.Item name="date" label="预约日期"
            rules={[{ required: true, message: '请选择预约日期' }]}>
            <DatePicker style={{ width: '100%' }}
              disabledDate={(current) => current && current < dayjs().startOf('day')}
            />
          </Form.Item>

          
          <div style={{ display: 'flex', gap: 12 }}>
            <Form.Item
              name="startTime" label="开始时间"
              rules={[{ required: true, message: '请选择开始时间' }]}
              style={{ flex: 1 }}>
              <TimePicker style={{ width: '100%' }} format="HH:mm" />
            </Form.Item>
            <Form.Item
              name="endTime" label="结束时间"
              rules={[{ required: true, message: '请选择结束时间' }]}
              style={{ flex: 1 }}>
              <TimePicker style={{ width: '100%' }} format="HH:mm" />
            </Form.Item>
          </div> 

          
          <Form.Item
            name="theme"
            label="活动主题"
            rules={[{ required: true, message: '请填写活动主题' }]}
          >
            <Input placeholder="请输入活动主题" />
          </Form.Item>

          {/* 预约人信息 */}
          <div style={{ display: 'flex', gap: 12 }}>
            <Form.Item
              name="name"
              label="预约人姓名"
              rules={[{ required: true, message: '请填写姓名' }]}
              style={{ flex: 1 }}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item
              name="team"
              label="预约团队"
              rules={[{ required: true, message: '请填写预约团队' }]}
              style={{ flex: 1 }}
            >
              <Input placeholder="请输入预约团队" />
            </Form.Item>
          </div>

          {/* 活动人数 */}
          <Form.Item
            name="participants"
            label="活动人数"
            rules={[{ required: true, message: '请填写活动人数' }]}
          >
            <Input 
              type="number" 
              placeholder="请输入活动人数"
              min={1}
            />
          </Form.Item>

          {/* 提交按钮 */}
          <Form.Item style={{ textAlign: 'center', marginTop: 24 }}>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: 200 }}>
              提交预约
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export { Booking };