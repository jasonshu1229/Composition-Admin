/**
 * @description 生成随机数
 * @param num
 * @return number
 */
export function getRandomNum(num: number) {
	let randomNum = '';
	for (let i = 0; i < num; i++) {
		randomNum += Number(Math.floor(Math.random() * 10));
	}

	return randomNum;
}
