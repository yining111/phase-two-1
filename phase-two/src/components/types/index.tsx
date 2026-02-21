
export interface BookingRecord {
  id: string;                    // 唯一标识
  date: string;                  // 日期 (YYYY-MM-DD)
  startTime: string;             // 开始时间 (HH:mm)
  endTime: string;               // 结束时间 (HH:mm)
  applicant: string;             // 姓名
  team: string;                  // 所属团队
  participants: number;          // 参与人数
  theme: string;                 // 活动主题
  status: 'ongoing' | 'ended' | 'upcoming'; // 状态
  createdAt: string;             // 时间
}

//首页日历联动
export interface CalendarDay {
  date: string;          // 日期字符串
  dayOfMonth: number;    // 当月第几天
  isCurrentMonth: boolean; // 是否当前月份
  isToday: boolean;      // 是否今天
  bookingCount: number;  // 当天预约数量（用于圆点显示）
  bookings: BookingRecord[]; // 当天预约列表
}

//首页看板联动
export interface DashboardStats {
  weeklyBookings: number;    // 本周预约数
  todayRemainingHours: number; // 今日剩余时长（小时）
  totalParticipants: number;  // 累计人次
}