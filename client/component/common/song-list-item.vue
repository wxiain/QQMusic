<script>
    import tooFn from '@static/js/tooFn';
    import Audio from '@static/js/Audio';
    import {mapMutations, mapState} from 'vuex';
    export default {
        name: 'song-list-item',
        props: {
            loading: {
                type: Boolean,
                default: function() {
                    return true;
                }
            }
        },
        data() {
            return {
                defaultNum : 20,
                documentHeight: 0,
                scrollTop: 0,
                screenHeight: 0,
                qqMusic: {},
                qqMusicSongList: [],
                isShow: true,
                params: this.$route.params.id || '/',
                listOrSearch: false,
                isStartPlay: false,
                audio: {},
                src: [],
                searchArr: [],
                p: 1,
                searchQuery: this.$route.query.q,
                isRequest: true,
                songListId: '26',
                loaded: this.loading
            };
        },
        render() {
            let arr = this.sliceSongList.length > 0? this.sliceSongList: this.searchArr;
            return (
                <div class="box">
                    <header>
                        <back-header v-show={this.isShow} title={this.searchQuery || this.qqMusicMsg.listName}></back-header>
                        {
                            this.listOrSearch? <search-input></search-input>: <label-list routerType={this.params} onChange={this.changeSongListId}></label-list>
                        }
                    </header>
                    <ul class={[{'d-none': this.loaded}, 'row']}>
                        {arr.map((item, i) => <li class="col-12-39" onClick={this.enterPlayerPages.bind(this, item, i)}>
                            <div class="img position-relative">
                                <img src={this.codeImg(item)} width="100%" height="100%" />
                                <i class="iconfont icon-bofang position-absolute" onClick={this.startPlayer.bind(this, item, i)}></i>
                            </div>
                            <div class="msg">
                                <p class="text-truncate song-name">{item.songname}</p>
                                <p class="text-truncate singer" >{tooFn.codeSinger(item, i)}</p>
                            </div>
                        </li>)}
                    </ul>
                </div>
            );
        },
        watch: {
            scrollTop(val) {
                this.scrollTop = val;
            },
            documentHeight(val) {
                this.documentHeight = val;
            },
            screenHeight(val) {
                this.screenHeight = val;
            },
            qqMusicSongList(val) {
                this.qqMusicSongList = val;
                this.loaded = false;
            },
            songListId(val) {
                this.songListId = val;
                this.requestTop();
            },
            src(val) {
                this.src =val;
                this.audio.create(val[0]);
                this.changePlayButtonType(true);
                // 监听播放结束
                this.audio.autoNextNextSong(({ended}) => {
                    this.changeIsEnded(ended);
                    tooFn.next.call(this, true, this.isLoop);
                });
            },
            player() {
                this.requestSongSrc();
            },
            searchArr(val) {
                this.searchArr = val;
                this.loaded = false;
            }
        },
        methods: {
            ...mapMutations([
                'assignmentPlayer',
                'changePlayer',
                'changePlayButtonType',
                'saveOriginalSongList',
                'songListData',
                'changeIndex',
                'changeIsEnded',
                'changeShowSearchPages'
            ]),
            codeImg(a, i) {
                if (i > this.defaultNum) {
                    return '../../../static/images/lazyload/qqmusic.jpg';
                }
                const {album_big} = a;
                return album_big;

            },
            requestSearch(p=1) {
                console.log(2);
                this.changeShowSearchPages(true);
                this.changePlayer(false);
                tooFn.requestSong(`/query?s=${this.searchQuery}&page=${p}&num=30`).then(({data, curnum, curpage, totalnum}) => {
                    console.log(data);
                    this.searchArr.push(...data.data);
                    this.isRequest = !(curnum*curpage >= totalnum);
                }).catch(error => {
                    console.log(error);
                });
            },
            requestTop() {
                tooFn.requestSong(`/top?topidurl=${this.songListId}`).then(({data}) => {
                    this.searchArr.push(...data.songlist);
                }).catch(error => {
                    console.log(error);
                });
            },
            lazyLoad() {
                if (!this.isRequest) return false;
                this.scrollTop =  this.$(window).scrollTop();
                this.documentHeight = this.$(document).height();
                let boo = this.documentHeight - this.scrollTop <= this.screenHeight + 200;
                if (/\/search/.test(this.$route.path) && boo) {
                    this.requestSearch(++this.p);
                    this.isRequest = false;
                } else {
                    if (this.sliceSongList.length >= this.originalSongList.length - 1) return false;
                    if (boo) {
                        this.defaultNum += 9;
                    }
                }
            },
            changeSongListId(val) {
                this.songListId = val;
            },
            requestSongSrc() {
                tooFn.requestSong(`/music?songid=226989116&songmid=${this.player.songmid}`).then(({data}) => {
                    if (data.isPath) {
                        this.src = data.path;
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            enterPlayerPages(data, i) {
                // vuex传到播放页面
                this.changePlayer(false);
                this.assignmentPlayer(data);
                this.changeIndex(i);// 修改index, 保证下一曲的顺序不乱
                this.changeShowSearchPages(false);
                // 这里需要暂停, 不然可能会出现进入播放页面时还在播放上一曲, 而当前的歌曲不播放的问题
                if (!(this.audio.paused())) this.audio.pause();
            },
            startPlayer(data, i, e) {
                // 开始播放, 参数vuex传到底部播放条, 需要阻止冒泡
                e.stopPropagation();
                this.assignmentPlayer(data);
                this.requestSongSrc();
                this.changeIndex(i);// 修改index, 保证下一曲的顺序不乱
            }
        },
        computed: {
            ...mapState({
                player: state => state.player,
                songListArr: state => state.songListArr,
                originalSongList: state => state.originalSongList,
                isLoop: state => state.isLoop,
                index: state => state.index,
                qqMusicMsg: state => state.qqMusicMsg
            }),
            sliceSongList() {
                if (/\/search/.test(this.$route.path)) return [];
                let arr = [];
                arr = this.originalSongList.slice(0, Math.min(this.defaultNum, this.originalSongList.length - 1));
                this.songListData(arr);// 歌单
                return arr;
            }
        },
        beforeMount() {
            this.isShow = Boolean(this.$route.path[1]);
        },
        mounted(){
            this.screenHeight = this.$(window).height();
            this.audio = new Audio().getAudio();
            this.$(window).on('scroll', this.lazyLoad);
            if (/\/search/.test(this.$route.path)) {
                this.requestSearch();
                this.listOrSearch = true;
            } else {
                this.requestTop();
            }
            // 默认获取, 不然可能会切不了歌, 可以把它们全部改为创建, 然后再播放, 改变了一种方式, 可以使用
            // this.audio = new Audio();
        },
        updated() {
            let that = this;
            this.$(function() {
                that.documentHeight = that.$(document).height();
            });
        }
    };
</script>

<style scoped lang="scss">
    .box{
        header{
            background: #31c27c;
        }
        ul{
            padding-top: 20px;
            background: #d6f0f8;
            li{
                margin-bottom: 10px;
                .img{
                    i{
                        bottom: 0px;
                        left: 5px;
                        color: green;
                        font-size: 50px;
                    }
                }
                .msg {
                    .song-name {
                        font-size: 30px;
                    }
                    .singer{
                        font-size: 20px;
                    }
                }
            }
        }
    }
</style>
