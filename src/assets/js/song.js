/**
 * @function filterSinger - 格式化歌手显示
 * @param {Array} singer - 歌手对象组成的数组
 * @return {String}
 */
function filterSinger(singer) {
    const ret = [];
    if (!singer) {
        return '';
    }
    for (let i = 0; i < singer.length; i += 1) {
        ret.push(singer[i].name);
    }
    return ret.join('/');
}

export default class Song {
    /**
     * @constructor
     * @param {*} id
     * @param {*} mid
     * @param {*} singer - 歌手
     * @param {*} name - 歌曲名
     * @param {*} album - 专辑
     * @param {*} duration - 时长
     * @param {*} image - 歌曲图片
     * @param {*} url - 歌曲URL
     */
    constructor({ id, mid, singer, name, album, duration, image, url }) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }
}

/**
 * @param {Object} - 歌曲数据
 * @return {Object} - 封装好的Song实例
 */
export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${
            musicData.albummid
        }.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/${
            musicData.songid
        }.m4a?fromtag=46`
    });
}
