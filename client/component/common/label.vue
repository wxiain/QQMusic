<script>
    import Type from '@static/js/classification';
    export default {
        name: 'nav-label',
        props: {
            routerType: {
                type: String,
                require: true
            }
        },
        data() {
            return {
                activeNum: 0,
                initTime: new Date()
            };
        },
        render() {
            const arr = Type[this.routerType];
            if(!arr) return false;
            return (
                <ul class="nav nav-pills">
                    {
                        arr.map((item, i) => <li class="nav-item col-3 text-center" onClick={this.downloadMore.bind(this, item.id)}><p
                            class={['nav-link', {'active': i === this.activeNum}]}>{item.name}</p></li>)
                    }
                </ul>
            );
        },
        methods: {
            downloadMore(id) {
                if (new Date() - this.initTime >= 2e3) {
                    this.$emit('change', id);
                    if(id === '26') this.activeNum = 0;
                    if(id === '27') this.activeNum = 1;
                    if(id === '28') this.activeNum = 2;
                    if(id === '3') this.activeNum = 0;
                    if(id === '5') this.activeNum = 1;
                    if(id === '6') this.activeNum = 2;
                    if(id === '16') this.activeNum = 3;
                    if(id === '17') this.activeNum = 4;
                    this.initTime = new Date();
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .nav {
        .nav-item {
            padding-bottom: 20px;
            p.nav-link{
                /*background: #31C27C;*/
                padding: 7px;
            }
        }

    }
</style>
