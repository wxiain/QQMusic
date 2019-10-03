import axios from 'axios';
export default {
    requestSong(router) {
        return new Promise((resolve, reject) => {
            axios(router).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    },
    codeSinger(a){
        if (!a) return '';
        const {singer} = a;
        let _singer = '';
        const len = singer.length -1;
        singer.forEach(item => {
            let until = '';
            if (len !== 0) until = '/';
            return _singer += item.name + until;
        });
        return _singer;
    },
    codeTime(num) {
        if (!num && !(num*1)) return '00:00';
        let minutes = Math.floor(num / 60);
        let seconds = num - minutes*60;
        return `${this.addZero(minutes)}:${this.addZero(seconds)}`;
    },
    addZero(num) {
        return num > 9? num: '0'+num;
    },
    barWidth(num, timeProp) {
        return num * timeProp;
    },
    seekBeforePlay(widthProp, num) {
        return Math.floor(widthProp/num);
    },
    next(boolean, isLoop) {
        this.changePlayButtonType(false);
        let num = this.index;
        if (!isLoop) {
            if (boolean) {
                num = num >= this.songListArr.length-1? 0: ++num;
            } else {
                num = num < 1? this.songListArr.length-1: --num;
            }
            this.changeIndex(num);
            this.assignmentPlayer(this.songListArr[num]);
        } else {
            this.audio.play();
            this.changePlayButtonType(true);
        }
    },
    codeVolume(w, w1) {
        return w1/w;
    },
    rounding(n) {
        let boo = n < (Math.floor(n) + 0.5);
        return boo? Math.floor(n) : Math.ceil(n);
    }
};
