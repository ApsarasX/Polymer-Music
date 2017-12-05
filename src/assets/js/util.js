// 打乱数组
export function shuffle(arr) {
    const newArr = [...arr];
    for (let i = 0; i < newArr.length; i += 1) {
        const random = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[random]] = [newArr[random], newArr[i]];
    }
    return newArr;
}
// 节流函数, 在规定时间内只执行一次
export function debounce(func, delay) {
    let timer;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
