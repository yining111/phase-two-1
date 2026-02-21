import type { BookingRecord, DashboardStats } from '@/components/types';
import dayjs from 'dayjs';

export const generateMockBookings= (): BookingRecord[] => {
  const bookings: BookingRecord[] = [];
  
  // 模拟
  bookings.push({
    id: 'booking-1',
    date: '2026-02-18',
    startTime: '14:00',
    endTime: '16:00',
    applicant: '张三',
    team: '前端组',
    participants: 5,
    theme: '学习',
    status: 'ended',
    createdAt: '2026-02-18T10:00:00Z',
  });
  bookings.push({
    id: 'booking-2',
    date: '2026-02-17',
    startTime: '09:00',
    endTime: '11:00',
    applicant: '李四',
    team: '后端组',
    participants: 8,
    theme: '学习',
    status: 'ended',
    createdAt: '2026-02-17T08:00:00Z',
  });
  

  return bookings.sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
};

//计数器
export const calculateStats =(bookings: BookingRecord[]): DashboardStats => {
  const now =dayjs();
  const weekStart =now.startOf('week');
  const weekEnd =now.endOf('week');
  
  // 本周预约
  const weeklyBookings =bookings.filter(b => {
    const d =dayjs(b.date);
    return d.isAfter(weekStart) && d.isBefore(weekEnd);
  }).length;
  
  // 今日剩余
  const todayBookings=bookings.filter(b => b.date === now.format('YYYY-MM-DD'));
  const usedHours =todayBookings.reduce((sum, b) => {
    const start=parseInt(b.startTime.split(':')[0]);
    const end=parseInt(b.endTime.split(':')[0]);
    return sum + (end - start);
  }, 0);
  const todayRemainingHours =Math.max(0, 14 - usedHours);
  
  // 累计
  const totalParticipants =bookings
    .filter(b => b.status !== 'upcoming')
    .reduce((sum, b) => sum + b.participants, 0);
  
  return {
    weeklyBookings,
    todayRemainingHours,
    totalParticipants,
  };
};




export const MOCK_BOOKINGS = generateMockBookings();