import { getLyric, getVKey } from '@/api/song';
import getUid from './uid';
import { ERR_OK } from '../../api/config';
import { Base64 } from 'js-base64';

const urlMap = {};

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
     * @param {Boolean} isPay 是否付费歌曲
     */
    constructor({
        id,
        mid,
        singer,
        name,
        album,
        duration,
        image,
        url,
        isPay = false
    }) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.isPay = isPay;
        this.filename = `C400${this.mid}.m4a`;
        // 确保一首歌曲的 id 只对应一个 url
        if (urlMap[this.id]) {
            this.url = urlMap[this.id];
        } else if (url) {
            this.url = url;
            urlMap[this.id] = url;
        } else {
            this._genUrl();
        }
    }
    getLyric() {
        // 如果歌词已存在
        if (this.lyric) {
            return Promise.resolve(this.lyric);
        }
        return new Promise((resolve, reject) => {
            getLyric(this.mid).then(res => {
                if (res.retcode === ERR_OK) {
                    // 对歌词记性base64解码
                    this.lyric = Base64.decode(res.lyric);
                    resolve(this.lyric);
                } else {
                    reject('no lyric');
                }
            });
        });
    }
    _genUrl() {
        if (this.url) {
            return;
        }
        getVKey(this.mid, this.filename).then(res => {
            if (res.code === ERR_OK) {
                const vkey = res.data.items[0].vkey;
                this.url = `http://dl.stream.qqmusic.qq.com/${
                    this.filename
                }?vkey=${vkey}&guid=${getUid()}&uin=0&fromtag=66`;
                urlMap[this.id] = this.url;
            }
        });
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
        isPay: musicData.pay.payplay === 1,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${
            musicData.albummid
        }.jpg?max_age=2592000`
    });
}

export function isValidMusic(musicData) {
    return (
        musicData.songid &&
        musicData.albummid &&
        (!musicData.pay || musicData.pay.payalbumprice === 0)
    );
}
