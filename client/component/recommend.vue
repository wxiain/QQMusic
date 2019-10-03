<script>
    export default {
        name: 'recommend',
        props: {
            loading: {
                type: Boolean,
                default: function() {
                    return true;
                }
            }
        },
        render() {
            return (
                <section class="container">
                    <div class="header">
                        <router-link to="/item/ranking" class="row align-items-right">
                            <p class="col-8 offset-2 text-center">为你推荐歌单</p>
                            <p class="iconfont icon-zuoyoujiantou col-2 text-center"></p>
                        </router-link>
                    </div>
                    <songListItem loading={this.loading}></songListItem>
                </section>
            );
        }
    };
</script>

<style scoped lang="scss">
    section {
        margin-top: 30px;
        .header{
            a{
                font-size: 35px;
                p{
                    font-size: inherit;
                }
                p:nth-child(1) {
                    letter-spacing: 8px;
                }
            }
        }
    }
</style>
