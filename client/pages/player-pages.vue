<script>
    import {mapState, mapMutations} from 'vuex';
    import tooFn from '@static/js/tooFn';
    import Audio from '@static/js/Audio';
    export default {
        name: 'player-pages',
        data() {
            return {
                audio: {},
                src: [],
                durationTime: '0',
                playing: '0',
                playBarWidth: 0,
                progressWidth: 0,
                clickWidth: 0,
                lyricArr: [],
                showLyric: false,
                lyricIndex: 0,
                lyricHeight: 0,
                scrollIndex: 0,
                addTop: 0
            };
        },
        render() {
            if (!(this.player.songname)) return false;
            return (
                <section class="player-pages">
                    <song-player-pages v-show={this.isShowSongPlayerPage}></song-player-pages>
                    <header>
                        <ul class="title row justify-content-between">
                            <li class="col-2 text-center" onClick={this.onBack}>
                                <span class="iconfont icon-icon-array_left d-block"></span>
                            </li>
                            <li class="col-8">
                                <span class="text-center d-block">{this.player.songname}</span>
                            </li>
                            <li class="col-2 text-center">
                                <span class="iconfont icon-menu d-block"></span>
                            </li>
                        </ul>
                        <div class="singer text-center m-auto text-truncate">--{tooFn.codeSinger(this.player)}--</div>
                    </header>
                    <div class={{'bg': true, 'd-none': this.showLyric}}><img src={this.player.album_big} width="100%" height="100%" class="rounded-circle" onClick={this.handleShowLyric}/></div>
                    <div class={['lyrics', {'d-none': !this.showLyric}, 'position-relative']}>
                        <ul class="position-absolute">
                            {this.lyricArr.map((item, i) => <li class={{'text-center': true, 'active': this.lyricIndex === i}}>{item.text || '-----------------------'}</li>)}
                        </ul>
                    </div>
                    <ul class="bar row  align-items-center justify-content-around">
                        <li class="col-2">{tooFn.codeTime(this.playing)}</li>
                        <li class="col-7 progress"  onClick={this.changeBar.bind(this, true, 0)} ref="playProgress">
                            <div class="progress-bar bg-success rounded-pill" role="progressbar" style={{width: tooFn.barWidth(this.playBarWidth, this.playing/this.durationTime) +'px'}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" onClick={this.changeBar.bind(this, false, 0)}></div>
                        </li>
                        <li class="col-2">{tooFn.codeTime(this.durationTime)}</li>
                    </ul>
                    <ul class="operate row justify-content-around text-center align-items-center">
                        <li class="col-2" onClick={this.loop}>
                            <span class={['iconfont', this.playerLoopIcon]}></span>
                        </li>
                        <li class="col-2" onClick={this.preSong}>
                            <span class="iconfont icon-previous"></span>
                        </li>
                        <li class="col-3" onClick={this.musicPlay}>
                            <span class={['iconfont',this.playButtonType]}></span>
                        </li>
                        <li class="col-2" onClick={this.nextSong}>
                            <span class="iconfont icon-next1"></span>
                        </li>
                        <li class="col-2" onClick={this.songPlayerPages}>
                            <span class="iconfont icon-icqueuemusicpx"></span>
                        </li>
                    </ul>
                    <ul class="row justify-content-around option">
                        <li class="col-1">
                            <span class="iconfont icon-like"></span>
                        </li>
                        <li class="col-1">
                            <span class="iconfont icon-xiazai"></span>
                        </li>
                        <li class="col-1">
                            <span class="iconfont icon-fenxiang1"></span>
                        </li>
                        <li class="col-1">
                            <span class="iconfont icon-liuyan"></span>
                        </li>
                    </ul>
                    <div class="lyric row align-items-center">
                        <div class="col-3 sound iconfont icon-shengyinyinliangmianxing"></div>
                        <div class="col-8 progress" onClick={this.changeBar.bind(this, true, 1)}>
                            <div class="progress-bar bg-success rounded-pill" role="progressbar" style="width: 100%" aria-valuemin="0" aria-valuemax="100" onClick={this.changeBar.bind(this, false, 1)}></div>
                        </div>
                    </div>
                </section>
            );
        },
        watch: {
            src(val) {
                // 歌曲的相关参数, 来到此页面才会开始播放则触发
                this.src = val;
                this.audio.create(val[0]);
                this.changePlayButtonType(true);
                // 获取歌曲时长, 需要playing监听, 否则可能在为加载完成获取, 返回的是NaN, 播放中不会触发playing事件
                this.audio.getDuration((a) => {
                    this.durationTime = Math.floor(a);
                });
                // 动态加载实时播放的时间
                this.audio.onPlaying((a) => {
                    this.playing = a;
                });
                // 监听播放结束, 有个问题, 就是在歌曲没播放完离开, 这个监听函数会一直存在
                this.audio.autoNextNextSong(({ended}) => {
                    this.changeIsEnded(ended);
                    tooFn.next.call(this, true, this.isLoop);
                    this.requestLyric();
                });
            },
            durationTime(val) {
                // 歌曲时长
                this.durationTime = val;
            },
            playing(val) {
                // 实时播放时间
                this.playing = val;
                const current = val*1000;
                let n = this.lyricArr.findIndex(item => {
                    return Math.abs(item.millisecond - current) <= 600;
                });
                if (n !== -1){
                    this.lyricIndex = n;
                    const $lyric = this.$('.lyrics');
                    const $ul = $lyric.find('ul');
                    let $ulHeight = $ul.height();
                    const $lyricItem = $ul.find('.active');
                    const $lyricLi = $ul.find('li').eq(this.scrollIndex).height();
                    const $lyricItemTop = $lyricItem.offset().top;
                    if ($lyricItemTop > this.lyricHeight ) {
                        this.addTop += $lyricLi;
                        $ulHeight += $lyricLi;
                        $ul.css({
                            top: -this.addTop,
                            height: $ulHeight
                        });
                        this.scrollIndex++;
                    }
                }

            },
            playBarWidth(val) {
                // 歌曲播放进度条总长度
                this.playBarWidth = val;
            },
            clickWidth(val) {
                // 改变歌曲播放的时间
                this.clickWidth = val;
            },
            player() {
                this.requestSongSrc();
            },
            lyricIndex(val) {
                this.lyricIndex = val;
            }
        },
        methods: {
            ...mapMutations([
                'changePlayer',
                'changePlayButtonType',
                'assignmentPlayer',
                'changeIndex',
                'changeSongPlayerPages',
                'changeIsEnded',
                'changeIsLoop',
                'changePlayerLoopIcon',
                'changeVolume'
            ]),
            onBack() {// 返回, 页面会重载
                this.changePlayer(true);
            },
            changeBar(boo, volume, e) {// 改变歌曲进度
                const $ = this.$;
                const ele = $(e.target);
                if (boo) {
                    let offsetLeft = $(e.target.offsetLeft)[0];
                    this.clickWidth = e.clientX - offsetLeft;
                    ele.children(0).width(this.clickWidth);
                } else {
                    e.stopPropagation();
                    let offsetLeft = $(e.target.parentNode.offsetLeft)[0];
                    this.clickWidth = e.clientX-offsetLeft;
                    ele.width(this.clickWidth);
                }
                if (volume) {
                    // 音量
                    const num = tooFn.codeVolume(this.playBarWidth, this.clickWidth);
                    this.audio.getAndSetVolume(num);
                } else {
                    // 歌曲播放时间改变的实现
                    this.audio.audio.currentTime = tooFn.seekBeforePlay(this.clickWidth*this.durationTime, this.playBarWidth);
                }
            },
            musicPlay() {// 播放按钮
                let {isPaused} = this.audio.playPaused();
                this.changePlayButtonType(isPaused);
            },
            loop() {// 循环播放
                const boolean = !this.isLoop;
                this.changeIsLoop(boolean);
                this.changePlayerLoopIcon(boolean);
            },
            nextSong() {// 下一曲
                tooFn.next.call(this, true);
            },
            preSong() {// 上一曲
                tooFn.next.call(this, false);
            },
            requestSongSrc() {// 获取src
                tooFn.requestSong(`/music?songid=226989116&songmid=${this.player.songmid}`).then(({data}) => {
                    if (data.isPath) {
                        this.src = data.path;
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            requestLyric() {
                tooFn.requestSong(`/lyric?lyrics=${this.player.songmid}`).then(({data}) => {
                    this.lyricArr = data.lyric;
                }).catch(error => {
                    console.log(error);
                });
            },
            handleShowLyric() {// 显示歌词
                this.showLyric = true;
            },
            songPlayerPages() {// 显示歌单
                this.changeSongPlayerPages(true);
            },
        },
        computed: {
            ...mapState({
                isShow: state => state.isShow,
                player: state => state.player,
                playButtonType: state => state.playButtonType,
                originalSongList: state => state.originalSongList,
                songListArr: state => state.songListArr,
                index: state => state.index,
                isShowSongPlayerPage: state => state.isShowSongPlayerPage,
                isLoop: state => state.isLoop,
                playerLoopIcon: state => state.playerLoopIcon
            })
        },
        mounted() {
            this.$('.player-pages').slideDown(600);
            this.playBarWidth = this.$(this.$refs.playProgress).width();
            this.lyricHeight = this.$('.bg').height()/2;
            this.audio = new Audio().getAudio();
            // 这里为什么要判断是否已经开始播放
            // 因为这个页面被两个组件的切换页面, 需要从player-bar和songlistitem切换过来
            // 然而一个是从播放状态过来的, 一个是从未播放过来的
            // 所以这两个的需求不一样, 未播放的需要获取歌曲src, 已播放的不需要
            this.requestLyric();
            let paused = this.audio.paused();
            if (paused){
                this.requestSongSrc();
            } else {
                this.durationTime = Math.floor(this.audio.audio.duration);
                this.audio.onPlaying((a) => {
                    this.playing = a;
                });
                this.requestLyric();
            }
        }
    };
</script>

<style scoped lang="scss">
    .player-pages{
        font-size: 40px;
        span{
            font-size: inherit;
        }
        header {
            .singer {
                width: 300px;
            }
        }
        .bg{
            width: 750px;
            height: 750px;
            padding: 10px;
            margin: 100px 0;
        }
        .lyrics{
            width: 750px;
            height: 750px;
            margin: 100px 0;
            overflow: hidden;
            ul {
                width: 100%;
                height: 100%;
                overflow-y: scroll;
                line-height: 1.9;
            }
            .active{
                color: #f86496;
            }
        }
        .bar {
            .progress{
                height: 15px;
            }
        }
        .operate{
            height: 120px;
            margin: 50px 0;
            line-height: 1.5;
            span{
                font-size: 70px;
            }
            li:nth-child(3) {
                height: 130px;
                span{
                    font-size: 90px;
                }
            }
        }
        .option{
            padding-bottom: 20px;
            span{
                font-size: 70px;
            }
        }
        .lyric {
            width: 50%;
            height: 155px;
            margin: auto;
            font-size: 70px;
            div{
                font-size: inherit;
            }
            .progress{
                height: 10px;
            }
        }
    }
</style>
