<template>
    <div class="search-pages container">
        <songListItem :loading="false"></songListItem>
        <player-bar></player-bar>
        <song-player-pages v-if="isShowSongPlayerPage" :isSearch="isShowSongPlayerPage"></song-player-pages>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: 'search-pages',
        computed: {
            ...mapState({
                isShowSongPlayerPage: state => state.isShowSongPlayerPage
            })
        }
    };
</script>

<style scoped>
    .search-pages {
        background: #31C27C;
    }
</style>
