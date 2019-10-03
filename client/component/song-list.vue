<script>
    export default {
        name: 'song-list',
        render(){
            const msg = [{
                iconClass: 'icon-geshou',
                content: '歌手',
                href: '/item/search'
            }, {
                iconClass: 'icon-paihang',
                content: '排行',
                href: '/item/ranking'
            }, {
                iconClass: 'icon-leimupinleifenleileibie',
                content: '分类',
                href: '/item/area'
            }, {
                iconClass: 'icon-diantai',
                content: '电台',
                href: '/item/not'
            }, {
                iconClass: 'icon-shiping',
                content: '视频',
                href: '/item/not'
            }];
            return (
                <section class="container">
                    <ul class="row">
                        {msg.map(({iconClass, content, href}) => <li class="col-12-5 list">
                            <router-link to={href}>
                                <i class={['iconfont', 'd-block', iconClass, 'text-center']}></i>
                                <span class="d-block text-center">{content}</span>
                            </router-link>
                        </li>)}
                    </ul>
                </section>
            );
        }
    };
</script>

<style scoped lang="scss">
    .list{
        margin-top: 30px;
        font-size: 30px;
        a{
            color: inherit;
            i {
                color: #31C27C;
                font-size: 40px;
            }
        }
    }
</style>
