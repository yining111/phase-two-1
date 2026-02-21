import React from 'react';
import { Tooltip } from 'antd';
import styles from './Calendar.module.css';



interface DayIndicatorProps {
  /** 当天预约数量 */
  count: number;
  /** 当天预约列表（用于Tooltip显示详情） */
  bookings?: Array<{
    startTime: string;
    theme: string;
  }>;
}

export const DayIndicator: React.FC<DayIndicatorProps> = ({ 
  count, 
  bookings = [] 
}) => {
  // 无预约时不显示任何标记
  if (count === 0) return null;

  // 圆点颜色配置
  const dotColors = ['#31abf7ff', '#1664c4ff', '#171ae1ff']; 
  
  // 最多显示3个圆点，超过显示"+n"
  const displayCount = Math.min(count, 3);
  const hasMore = count > 3;

  // 生成Tooltip内容
  const tooltipContent = (
    <div className={styles.tooltipContent}>
      <div className={styles.tooltipTitle}>当天 {count} 个预约</div>
      {bookings.slice(0, 3).map((b, i) => (
        <div key={i} className={styles.tooltipItem}>
          <span className={styles.tooltipTime}>{b.startTime}</span>
          <span className={styles.tooltipTheme}>{b.theme}</span>
        </div>
      ))}
      {bookings.length > 3 && (
        <div className={styles.tooltipMore}>还有 {bookings.length - 3} 个...</div>
      )}
    </div>
  );

  return (
    <Tooltip title={tooltipContent} placement="bottom">
      <div className={styles.dotsContainer}>
        {/* 圆点组 */}
        <div className={styles.dots}>
          {Array.from({ length: displayCount }).map((_, index) => (
            <span
              key={index}
              className={styles.dot}
              style={{ 
                backgroundColor: dotColors[index],
              }}
            />
          ))}
        </div>
        
        {/* 超出标记 */}
        {hasMore && (
          <span className={styles.moreIndicator}>+{count - 3}</span>
        )}
      </div>
    </Tooltip>
  );
};

