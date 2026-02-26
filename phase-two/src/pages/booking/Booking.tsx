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
  const isTimeSlotAvailable = useBookingStore(state => state.isTimeSlotAvailable);

  //提交
  const handleSubmit = async (values: BookingFormValues) => {
    setLoading(true);
    try {
      // 检查时间槽是否可用
      const date = values.date.format('YYYY-MM-DD');
      const startTime = values.startTime.format('HH:mm');
      const endTime = values.endTime.format('HH:mm');
      
      if (!isTimeSlotAvailable(date, startTime, endTime)) {
        message.error('该时间段已被占用，请选择其他时间');
        setLoading(false);
        return;
      }
      
      // 提交
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // store
      addBooking({
        date: date,
        startTime: startTime,
        endTime: endTime,
        theme: values.theme,
        applicant: values.name,
        team: values.team,
        participants: Number(values.participants),
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
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card title="活动室预约" bordered={false} style={{maxWidth: 800, width: '100%', margin: '0 auto' }}>
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

          
          <div className="flex gap-4 items-center justify-center ">
            <Form.Item
              name="startTime" 
              label="开始时间"
              rules={[{ required: true, message: '请选择开始时间' }]}
              style={{ flex: 1 }}
            >
              <TimePicker style={{ width: '100%' }} format="HH:mm" />
            </Form.Item>
            <Form.Item
              name="endTime" 
              label="结束时间"
              rules={[
                { required: true, message: '请选择结束时间' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const startTime = getFieldValue('startTime');
                    if (!startTime || !value || value.isAfter(startTime)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('结束时间不能早于开始时间'));
                  },
                }),
              ]}
              style={{ flex: 1 }}
            >
              <TimePicker 
                style={{ width: '100%' }} 
                format="HH:mm" 
                disabledHours={(selectedHour) => {
                  const startTime = form.getFieldValue('startTime');
                  if (!startTime) return [];
                  const startHour = startTime.hour();
                  return Array.from({ length: startHour }, (_, i) => i);
                }}
                disabledMinutes={(selectedHour, selectedMinute) => {
                  const startTime = form.getFieldValue('startTime');
                  if (!startTime) return [];
                  const startHour = startTime.hour();
                  const startMinute = startTime.minute();
                  if (selectedHour === startHour) {
                    return Array.from({ length: startMinute }, (_, i) => i);
                  }
                  return [];
                }}
              />
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
          <div className="flex justify-between items-center gap-4">
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