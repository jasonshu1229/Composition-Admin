import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc); // dayjs 默认不支持utc格式转换，需要扩展一下

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * @description 将utc格式的时间字符串格式化成 'YYY-MMM-DDD'
 * @param utcString utc格式时间字符串
 * @param format 'YYY-MMM-DDD'
 */
export function formatUtcString(
	utcString: string,
	format: string = DATE_TIME_FORMAT
) {
	return dayjs.utc(utcString).format(format);
}
