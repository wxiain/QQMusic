// import store from "../store/store";

import Index from '../pages/index';
// import PlayerPages from '../pages/player-pages';

export default [
    {
        path: '/item/:id',
        component: () => import(/* webpackChunkName: "avue" */ '@/common/song-list-item')
    },
    {
        path: '/',
        component: Index
    },
    {
        path: '/search',
        component: () => import(/* webpackChunkName: "avue" */ '../pages/search-pages')
    }
];