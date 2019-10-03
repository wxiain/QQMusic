<template>
    <div class="index" v-if="isShow">
        <m-header></m-header>
        <banner></banner>
        <loading :loading="loading"></loading>
        <song-list></song-list>
        <recommend :loading="loading"></recommend>
        <player-bar></player-bar>
        <sidebar v-if="showMenu" @change="changeMenu"></sidebar>
        <song-player-pages v-if="isShowSongPlayerPage"></song-player-pages>
    </div>
    <PlayerPages v-else-if="!isShow && !showSearch"></PlayerPages>
    <search-pages v-else></search-pages>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import tooFn from '@static/js/tooFn';
    import Audio from '@static/js/Audio';
    export default {
        name: 'index',
        data() {
            return {
                showMenu: false,
                qqMusic: [],
                qqMusicMsg: [],
                songListId: '26',
                loading: true
            };
        },
        watch: {
            qqMusic(val) {
                let {ListName, cur_song_num, update_time} = val;
                let songList = val['songlist'];
                this.saveQQMusicMsg({listName: ListName, cur_song_num: cur_song_num, update_time: update_time});
                this.saveOriginalSongList(songList);
                this.loading = false;
            },
            loading(val) {
                this.loading = val;
            }
        },
        methods: {
            ...mapMutations([
                'saveOriginalSongList',
                'saveQQMusicMsg'
            ]),
            changeMenu(val) {
                this.showMenu = val;
            },
            requestData() {
                if (!(this.audio.paused())) {
                    // this.qqMusicSongList = this.originalSongList;
                    return false;
                }
                tooFn.requestSong(`/top?topidurl=${this.songListId}`).then(data => {
                    this.qqMusic = data.data;
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        computed: {
            ...mapState({
                isShow: state => state.isShow,
                isShowSongPlayerPage: state => state.isShowSongPlayerPage,
                showSearch: state => state.showSearch,
                originalSongList: state => state.originalSongList
            })
        },
        mounted() {
            // showSearch  为true取反为false, 显示search-pages页面, 为false取反为true, 显示player-pages页面
            this.audio = new Audio().getAudio();
            this.requestData();

        }
    };
</script>
