<template>
    <div class="search-box">
        <i class="material-icons">search</i>
        <input ref="query" type="text" class="box" @focus="onfocus" @blur="onblur" v-model="query" :placeholder="placeholder">
        <i v-if="query" class="material-icons" @click="clear">clear</i>
    </div>
</template>
<script>
import { debounce } from '@/assets/js/util';

export default {
    props: {
        placeholder: {
            type: String,
            default: '搜索歌手、歌曲'
        }
    },
    data() {
        return {
            query: ''
        };
    },
    methods: {
        // 点击输入框右边的x, 输入框清空
        clear() {
            this.query = '';
        },
        // 便于从父组件设置query
        setQuery(query) {
            this.query = query;
        },
        blur() {
            this.$refs.query.blur();
        },
        onfocus() {
            this.$emit('focus');
        },
        onblur() {
            this.$emit('blur');
        }
    },
    created() {
        // 监听输入框
        this.$watch(
            'query',
            debounce(newQuery => {
                this.$emit('query', newQuery);
            }, 350)
        );
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';

.search-box {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 40px;
    background: $color-background;
    .material-icons {
        font-size: 24px;
        color: $color-text;
    }
    .box {
        flex: 1;
        margin: 0 5px;
        line-height: 18px;
        background: $color-background;
        color: $color-text;
        outline: none;
        font-size: $font-size-medium;
        &::placeholder {
            color: $color-text-d;
        }
    }
}
</style>
