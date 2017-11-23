// 打乱数组
export function shuffle(arr) {
    const newArr = [...arr];
    for (let i = 0; i < newArr.length; i += 1) {
        const random = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[random]] = [newArr[random], newArr[i]];
    }
    return newArr;
}
// eslint占位
export function x() {}
