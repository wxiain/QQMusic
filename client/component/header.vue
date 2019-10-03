<script>
    export default {
        name: 'm-header',
        render() {
            return (
               <header class="header container position-fixed">
                   <ul class="row">
                       <li class="menu col-2" onClick={this.showMenu}><i class="iconfont icon-menu"></i></li>
                       <li class="my col-8 row">
                           <router-link to="/my" class="col-4 text-center">我的</router-link>
                           <router-link to="/music" class="col-4 text-center">音乐馆</router-link>
                           <router-link to="/find" class="col-4 text-center">发现</router-link>
                       </li>
                       <li class="more col-2 text-right">
                           <i class="iconfont icon-hao "></i>
                       </li>
                   </ul>
                   <search-input></search-input>
               </header>
            );
        },
        methods: {
            showMenu() {
                this.$emit('change', true);
            }
        }
    };
</script>

<style scoped lang="scss">
    .header{
        top: 0;
        left: 0;
        width: 100%;
        background: #31c27c;
        color: #fff;
        z-index: 10000;
        ul.row {
            width: 100%;
            height: 62px;
            margin: 0;
            li {
                font-size: 40px;
                line-height: 62px;
                a {
                    color: inherit;
                }
            }
            .menu, .more{
                i {
                    font-size: 30px;
                }
            }
        }
        .col-2, .col-8, .col-4{
            padding: 0;
            margin: 0;
        }
    }
</style>
