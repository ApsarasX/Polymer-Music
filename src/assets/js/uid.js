let uid = 0;

export default function getUid() {
    if (uid) {
        return uid;
    }
    if (!uid) {
        const t = new Date().getUTCMilliseconds();
        uid = (Math.round(2147483647 * Math.random()) * t) % 1e10;
    }
    return uid;
}
