<script>
    export default {
        name: 'sidebar',
        data() {
            return {
                height: 0,
                isLogin: false,
                username: 1111111111
            };
        },
        render() {
            const src = '../../static/images/avatar/1.jpg';
            return (
                <section class="sidebar position-fixed" style={{'height': this.height + 'px'}}>
                    <ul>
                        <li class="text-center">
                            <router-link to={this.isLogin? '/login': '/changeData'} class="d-block">
                                {
                                    this.isLogin? <div>登录</div>: <div class="avatar m-auto"><img src={src} class="rounded-circle" width="100%" height="100%"/><p class="text-truncate text-center">{this.username}</p></div>
                                }
                            </router-link>
                        </li>
                        <li class="text-center">
                            <router-link to="/res" class="d-block">
                                注册
                            </router-link>
                        </li>
                        <li class="text-center">
                            <router-link to="/changeData" class="d-block">
                                修改资料
                            </router-link>
                        </li>
                        <li class="text-center">
                            <router-link to="/loginout" class="d-block">
                                退出
                            </router-link>
                        </li>
                    </ul>
                    <div class="right position-absolute" onClick={this.none} style={{'height': this.height + 'px'}}></div>
                </section>
            );
        },
        watch: {
            height(val) {
                this.height = val;
            }
        },
        methods: {
            none() {
                this.$emit('change', false);
            }
        },
        mounted() {
            this.height = this.$(document).height();
        }
    };
</script>

<style scoped lang="scss">
    .sidebar {
        top: 0;
        left: 0;
        width: 50%;
        background: #ddd;
        z-index: 100;
        ul {
            width: 100%;
            padding-top: 50px;
            li {
                width: 100%;
                height: 200px;
                font-size: 30px;
                color: #31C27C;
                .avatar {
                    width: 100px;
                    height: 140px;
                    img {
                        width: 100%;
                        height: 100px;
                    }
                    p {
                        width: 100%;
                        margin-top: 10px;
                        color: #1e2cd1;
                        font-size: 16px;
                    }
                }
            }
        }
        .right {
            top: 0;
            right: -100%;
            width: 100%;
            background: transparent;
        }
    }
</style>
