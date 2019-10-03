<script>
    export default {
        name: 'banner',
        render() {
            return (
                <section id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        {[...'00000'].map((item, i) => <li data-target="#carouselExampleIndicators" data-slide-to={i} class={{active: i === 0}}></li>)}
                    </ol>
                    <div class="carousel-inner">
                        {[...'00000'].map((item, i) => <div class={{'carousel-item': true,  active: i === 0}}>
                            <router-link to={`/0${i}.jpg`}>
                                <img src={`../../static/images/banner/0${i}.jpg`} class="d-block w-100" alt="..."/>
                            </router-link>
                        </div>)}
                    </div>
                </section>
            );
        }
    };
</script>

<style scoped lang="scss">
    section {
        margin-top: 132px;
    }
</style>
