<template>
    <div class="input">
        <input type="search" name="" @focus="this.showFn" @blur="this.showFn" @keydown.13="search"/>
        <i @click="this.showFn" :class="['iconfont','icon-sousuo',{'d-block':this.isShow},{'d-none':!this.isShow}]"><span>搜索</span>
        </i>
    </div>
</template>
<script>
    import {mapMutations} from 'vuex';
    export default {
        name: 'search-input',
        data() {
            return {
                isShow: true,
                queryData: [],
                resultData: []
            };
        },
        methods: {
            ...mapMutations([
                'changeShowSearchPages',
                'changePlayer'
            ]),
            showFn(e) {
                if (e.type === 'click'){
                    e.target.parentNode.parentNode.children[0].focus();
                } else {
                    this.isShow = !this.isShow;
                }
            },
            search(e) {
                this.$router.push({path:`/search?q=${e.target.value}`});
            }
        },
        watch: {
            isShow(val) {
                this.isShow = val;
            },
            queryData(val) {
                this.queryData = val;
                this.resultData.push(val.data);

            }
        }
    };
</script>

<style scoped lang="scss">
    .input{
        position: relative;
        width: 100%;
        height: 70px;
        input{
            width: 100%;
            height: 50px;
            border: 2px solid #eee;
            border-radius: 10px;
            background: #31c27c;
            margin-top: 10px;
            line-height: 50px;
            text-indent: 10px;
        }
        i{
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            width: 120px;
            height: 50px;
            font-size: 30px;
            line-height: 50px;
            text-align: center;
            span{
                margin-left: 5px;
            }
        }
    }
</style>
