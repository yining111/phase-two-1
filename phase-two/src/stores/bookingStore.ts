import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { BookingRecord, DashboardStats, CalendarDay } from '@/components/types';
import { MOCK_BOOKINGS, calculateStats } from '../utils/mockData';
import dayjs from 'dayjs';

// 预约状态存储接口
interface BookingState {
  // 数据
  bookings: BookingRecord[];// 所有预约记录
  selectedDate: string | null;// 日期
  currentMonth: dayjs.Dayjs;// 当前的月份
  
  // 计算 getters
  getCalendarDays: () => CalendarDay[]; // 获取日历数据
  getSelectedDateBookings: () => BookingRecord[]; // 获取选中日期的预约
  getDashboardStats: () => DashboardStats; // 获取统计数据
  
  // 操作
  setSelectedDate: (date: string) => void;
  setCurrentMonth: (month: dayjs.Dayjs) => void;
  addBooking: (booking: Omit<BookingRecord, 'id' | 'createdAt'>) => void;
  cancelBooking: (id: string) => void;
  refreshData: () => void; // 刷新
}

//创建预约状态
export const useBookingStore = create<BookingState>()(
  devtools(
    persist(
      (set, get) => ({
        // 初始状态
        bookings: MOCK_BOOKINGS,
        selectedDate: dayjs().format('YYYY-MM-DD'),
        currentMonth: dayjs(),

        //日历数据
        getCalendarDays: () => {
          const { bookings, currentMonth } = get();
          const startOfMonth = currentMonth.startOf('month');
          const endOfMonth = currentMonth.endOf('month');
          
          // 按周计数
          const startDate = startOfMonth.startOf('week');
          const endDate = endOfMonth.endOf('week');
          
          const days: CalendarDay[] = [];
          let current = startDate;
          
          while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
            const dateStr = current.format('YYYY-MM-DD');
            const dayBookings = bookings.filter(b => b.date === dateStr);
            
            days.push({
              date: dateStr,
              dayOfMonth: current.date(),
              isCurrentMonth: current.month() === currentMonth.month(),
              isToday: current.isSame(dayjs(), 'day'),
              bookingCount: dayBookings.length,
              bookings: dayBookings,
            });
            
            current = current.add(1, 'day');
          }
          
          return days;
        },

        /**
         * 获取选中日期的预约列表（按时间排序）
         */
        getSelectedDateBookings: () => {
          const { bookings, selectedDate } = get();
          if (!selectedDate) return [];
          return bookings
            .filter(b => b.date === selectedDate)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
        },

        /**
         * 计算数据看板统计
         */
        getDashboardStats: () => {
          return calculateStats(get().bookings);
        },

        /**
         * 设置选中日期
         */
        setSelectedDate: (date: string) => {
          set({ selectedDate: date });
        },

        /**
         * 切换月份
         */
        setCurrentMonth: (month: dayjs.Dayjs) => {
          set({ currentMonth: month });
        },

        /**
         * 添加新预约（实际项目中应调用API）
         */
        addBooking: (bookingData) => {
          const newBooking: BookingRecord = {
            ...bookingData,
            id: `booking-${Date.now()}`,
            createdAt: new Date().toISOString(),
          };
          set(state => ({
            bookings: [...state.bookings, newBooking].sort(
              (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
            ),
          }));
        },

        /**
         * 取消预约
         */
        cancelBooking: (id: string) => {
          set(state => ({
            bookings: state.bookings.filter(b => b.id !== id),
          }));
        },

        /**
         * 刷新数据（模拟API重新获取）
         */
        refreshData: () => {
          // 实际项目中这里会调用API
          set({ bookings: MOCK_BOOKINGS });
        },
      }),
      {
        name: 'booking-storage', // localStorage键名
        partialize: (state) => ({ 
          // 只持久化这些字段
          selectedDate: state.selectedDate,
          currentMonth: state.currentMonth.format(),
        }),
        onRehydrateStorage: () => (state) => {
          // 从 localStorage 恢复时，将字符串转换回 dayjs 对象
          if (state?.currentMonth && typeof state.currentMonth === 'string') {
            state.currentMonth = dayjs(state.currentMonth);
          }
        },
      }
    ),
    { name: 'BookingStore' }
  )
);