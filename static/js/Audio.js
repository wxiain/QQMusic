import Event from './Event';
class Audio extends Event{
    constructor() {
        super();
    }
    // 创建一个audio标签
    create(src) {
        this.audio.src = src;
        this.audio.setAttribute('autoplay', true);
        return this;
    }
    // 音量
    getAndSetVolume(n) {
        if (n) this.audio.volume = n;
        return this.audio.volume;
    }
    // 获取
    getAudio() {
        this.audio = document.getElementsByTagName('audio')[0];
        if (!this.audio) {
            this.audio = document.createElement('audio');
            document.body.appendChild(this.audio);
        }
        return this;
    }
    // 播放
    play() {
        this.audio.play();
        return this;
    }
    paused() {
        // 在播放这个值返回的是false, 否则true
        return this.audio.paused;
    }
    // 播放状态, 返回暂停时间与状态, 暂停为true
    playPaused() {
        let isPaused = this.audio.paused;
        isPaused? this.audio.play(): this.audio.pause();
        return {
            currentTime: this.audio.currentTime,
            isPaused
        };
    }
    // 播放歌曲时间
    getDuration(fn) {
        this.add(this.audio, 'playing', () => {
            fn(this.audio.duration);
        });
        return this;
    }
    // 获取播放的实时时间
    getCurrentTime() {
        return Math.floor(this.audio.currentTime);
    }
    // 播放获取的实时时间
    onPlaying(fn) {
        this.add(this.audio, 'timeupdate', () => {
            if (/function/i.test(typeof fn)) {
                fn(this.getCurrentTime());
            } else {
                throw new Error('请传入一个function');
            }
        });
        return this;
    }
    // 资源缓冲显示
    progress(fn) {
        this.add(this.audio, 'progress', () => {
            fn(this.audio.buffered);
        });
    }
    // 播放暂停
    pause() {
        this.audio.pause();
        return this;
    }
    // 播放结束时触发, 返回ended: true
    autoNextNextSong(fn) {
        this.add(this.audio, 'ended', () => {
            fn({ended: true});
        });
    }
}

export default Audio;
