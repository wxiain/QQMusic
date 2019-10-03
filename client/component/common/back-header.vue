<script>
    export default {
        name: 'back-header',
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        render() {
            return (
                <div class="header row">
                    <span onClick={this.back} class="back iconfont icon-icon-array_left col-1 text-center"></span>
                    <h3 class="title col-10 text-center">{this.title}</h3>
                </div>
            );
        },
        methods: {
            back() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style scoped lang="scss">
    .header{
        background: #31C27C;
        color: #fff;
        font-size: 40px;
        span{
            padding-left: 20px;
            font-size: inherit;
            line-height: 1.8;
        }
        h3{
            font-size: inherit;
            line-height: 1.8;
        }
    }
</style>
