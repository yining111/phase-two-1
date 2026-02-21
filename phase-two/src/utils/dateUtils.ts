import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import isToday from 'dayjs/plugin/isToday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
// dayjs
dayjs.locale('zh-cn');
dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export { dayjs };

//日期
export const formatDate =(date: string, format = 'MM月DD日') => {
  return dayjs(date).format(format);
};

//星期
export const getWeekDay =(date: string) => {
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return days[dayjs(date).day()];
};
//检查日期
export const isBookableDate =(date: string) => {
  const target =dayjs(date);
  const minDate =dayjs().add(1, 'day').startOf('day');
  const maxDate =dayjs().add(7, 'day').endOf('day');
  return target.isSameOrAfter(minDate) && target.isSameOrBefore(maxDate);
};