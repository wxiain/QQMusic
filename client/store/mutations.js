export default {
    assignmentPlayer(state, data) {
        state.player = data;
    },
    changePlayer(state, boolean) {
        state.isShow = boolean;
    },
    changePlayButtonType(state, boolean) {
        state.playButtonType = boolean? 'icon-zanting1': 'icon-bofang';
    },
    songListData(state, arr) {
        state.songListArr = arr;
    },
    saveQQMusicMsg(state, arr) {
        state.qqMusicMsg = arr;
    },
    saveOriginalSongList(state, arr) {
        state.originalSongList = arr;
    },
    changeSongPlayerPages(state, boolean) {
        state.isShowSongPlayerPage = boolean;
    },
    changeIndex(state, num) {
        state.index = num;
    },
    changeIsEnded(state, boolean) {
        state.isEnded = boolean;
    },
    changeIsLoop(state, boolean) {
        state.isLoop = boolean;
    },
    changePlayerLoopIcon(state, boolean) {
        state.playerLoopIcon = boolean? 'icon-danquxunhuan': 'icon-xunhuan';
    },
    changeShowSearchPages(state, boolean) {
        state.showSearch = boolean;
    },
    changeVolume(state, num) {
        if (num>1) throw new Error('音量值不可以大于1');
        state.volume = num;
    }
};
