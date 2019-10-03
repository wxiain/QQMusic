// npm
import Vue from 'vue';
import Jquery from 'jquery';
import 'lib-flexible/flexible.js';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min';
import 'popper.js/dist/popper.js';

// js
import router from './router/router';
import store from './store/store';
// vue
import App from './App';

// vue => component
import Header from '@/header';
import Banner from '@/banner';
import SongList from '@/song-list';
import Recommend from '@/recommend';
import PlayerPages from './pages/player-pages';
import SearchPages from './pages/search-pages';
import Sidebar from '@/sidebar';

// vue => component => common
import SongListItem from '@/common/song-list-item';
import SearchInput from '@/common/search-input';
import BackHeader from '@/common/back-header';
import LabelList from '@/common/label';
import Loading from '@/common/loading';
import PlayerBar from '@/common/player-bar';
import SongPlayerPages from '@/songPlayer';

// css
import '@static/fonts/iconfont/iconfont.css';
import '@static/css/clear_default.css';
import '@static/css/bootstrap.mixin.css';

Vue.component('mHeader', Header);
Vue.component('banner', Banner);
Vue.component('songList', SongList);
Vue.component('Recommend', Recommend);
Vue.component('songListItem', SongListItem);
Vue.component('SearchInput', SearchInput);
Vue.component('BackHeader', BackHeader);
Vue.component('LabelList', LabelList);
Vue.component('Loading', Loading);
Vue.component('PlayerBar', PlayerBar);
Vue.component('PlayerPages', PlayerPages);
Vue.component('Sidebar', Sidebar);
Vue.component('SongPlayerPages', SongPlayerPages);
Vue.component('SearchPages', SearchPages);

// vue prototype
Vue.prototype.$ = Jquery;

new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App)
});
