import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useBookingStore } from '../../stores/bookingStore';
import styles from './Calendar.module.css';


export const MonthCalendar: React.FC = () => {
  const { 
    currentMonth, 
    setCurrentMonth, 
    selectedDate, 
    setSelectedDate,
    getCalendarDays 
  } = useBookingStore();

  const calendarDays = getCalendarDays();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  // 切换月份
  const handlePrevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));

  return (
    <div className={styles.calendar} style={{width:400,height:360}}>
      {/* 日历头部：月份导航 */}
      <div className={styles.header}>
        <Button.Group>
          <Button icon={<LeftOutlined />} onClick={handlePrevMonth} />
          <Button icon={<RightOutlined />} onClick={handleNextMonth} />
        </Button.Group>
        <h3 className={styles.monthTitle}>
          {currentMonth.format('YYYY年MM月')}
        </h3>
      </div>

      {/* 星期标题 */}
      <div className={styles.weekDays}>
        {weekDays.map(day => (
          <div key={day} className={styles.weekDay} >{day}</div>
        ))}
      </div>

      {/* 日期网格 */}
      <div className={styles.daysGrid}>
        {calendarDays.map((day) => (
          <div
            key={day.date}
            className={`
              ${styles.dayCell}
              ${!day.isCurrentMonth ? styles.otherMonth : ''}
              ${day.isToday ? styles.today : ''}
              ${selectedDate === day.date ? styles.selected : ''}
            `}
            onClick={() => setSelectedDate(day.date)}
          >
            <span className={styles.dayNumber}>{day.dayOfMonth}</span>
            
            {/* 圆点标记：显示预约繁忙程度 */}
            {day.bookingCount > 0 && (
              <div className={styles.dots}>
                {/* 最多显示3个圆点 */}
                {Array.from({ length: Math.min(day.bookingCount, 3) }).map((_, i) => (
                  <div 
                    key={i} 
                    className={styles.dot}
                    style={{
                      backgroundColor: i === 0 ? '#91d5ff' : i === 1 ? '#40a9ff' : '#1890ff',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      display: 'inline-block'
                    }}
                  />
                ))}
                {day.bookingCount > 3 && (
                  <span className={styles.more}>+</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
