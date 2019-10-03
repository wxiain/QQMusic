<script>
    import { mapState, mapMutations } from 'vuex';
    import tooFn from '@static/js/tooFn';
    import Audio from '@static/js/Audio';
    export default {
        name: 'player',
        data() {
            return {
                audio: {}
            };
        },
        render() {
            if (!(this.player.album_big)) return;
            return (
                <div class="player">
                    <ul class="row justify-content-between">
                        <li class="col-7 row align-items-center" onClick={this.showPlayerPage}>
                            <div class="avatar"><img src={this.player.album_big || ''} width="100%" height="100%"/></div>
                            <div class="song-msg">
                                <p class="text-truncate">{this.player.songname || ''}</p>
                                <p class="text-truncate">{tooFn.codeSinger(this.player)}</p>
                            </div>
                        </li>
                        <li class="col-4 button">
                            <span class={['iconfont', this.playButtonType, 'd-inline-block']} onClick={this.playPaused}></span>
                            <span class="iconfont icon-icqueuemusicpx d-inline-block" onClick={this.songPlayerPages}></span>
                        </li>
                    </ul>
                </div>
            );
        },
        methods: {
            ...mapMutations([
                'changePlayer',
                'changePlayButtonType',
                'changeSongPlayerPages',
                'changeShowSearchPages'
            ]),
            showPlayerPage() {
                this.changePlayer(false);
                this.changeShowSearchPages(false);
            },
            playPaused() {
                let paused = this.audio.playPaused();
                this.changePlayButtonType(paused.isPaused);
            },
            songPlayerPages() {
                this.changeSongPlayerPages(true);
            }
        },
        computed: {
            ...mapState({
                player: state => state.player,
                playButtonType: state => state.playButtonType
            })
        },
        mounted() {
            this.audio = new Audio().getAudio();
        }
    };
</script>

<style scoped lang="scss">
    .player{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 115px;
        padding: 10px;
        background: #fff;
        ul {
            li {
                .avatar{
                    width: 100px;
                    height: 100px;
                    padding: 10px;
                    img{
                        border-radius: 50%;
                    }
                }
                .song-msg{
                    margin-left: 10px;
                    line-height: 30px;
                    font-size: 30px;
                    p{
                        height: 30px;
                    }
                    p:nth-child(2){
                        font-size: 20px;
                        color: #31C27C;
                    }
                }
            }
            li.button{
                span:nth-child(1) {
                    margin-left: 20px;
                }
                span{
                    padding: 0 10px;
                    color: #31C27C;
                    font-size: 80px;
                    text-align: center;
                    line-height: 1.4;
                }
            }
        }
    }
</style>
