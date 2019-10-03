<script>
    export default {
        name: 'loading',
        props: {
            loading: {
                type: Boolean,
                default() {
                    return true;
                }
            }
        },
        watch: {
            loading(val) {
                this.loading = val;
            }
        },
        render() {
            return (
                <div class={[this.loading? 'd-flex': 'd-none', 'justify-content-center', 'loading', 'align-items-center', '$zindex-sticky']}>
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }
    };
</script>

<style scoped lang="scss">
    .loading{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .3);
        z-index: 100;
    }
</style>
