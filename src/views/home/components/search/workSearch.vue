<template>
  <div
    :style="{color:$props.color,
             width:$props.width,
             display:'inline-block',margin:'5px'}"
  >
    <div class="box" v-if="isHidden">
      <span @click="showSearch">
        <svg-icon class="icon" size="20" :color="color" icon="search"></svg-icon>
      </span>
    </div>
    <xyz-transition xyz="out-left-100% in-right-100%">
      <div class="box" v-if="!isHidden">
        <a-input-group :style="{width:$props.width}" compact>
          <a-input-search
            :size="size"
            v-model="value"
            :placeholder="$props.placeholder"
            @search="handleSearch"
            @change="handleChange"
          >
            <a-select
              slot="addonBefore"
              default-value="work"
              v-model:value="searchType"
              v-if="isShowOption"
              :size="size"
            >
              <a-select-option v-for="option in $props.options" :value="option.value">
                <div class="options" :style="{color:$props.color}">{{ option.title }}</div>
              </a-select-option>
            </a-select>
            <a-button :color="color" slot="enterButton">
              <svg-icon style="display: inline" :color="color" icon="search"></svg-icon>
            </a-button>
          </a-input-search>
        </a-input-group>
      </div>

    </xyz-transition>

  </div>
</template>

<script>
import svgIcon from '@/components/svgIcon/svgIcon'

export default {
  name: 'WorkSearch',
  components: {
    svgIcon
  },
  props: {
    width: {
      type: String,
      default: '30em'
    },
    placeholder: {
      type: String,
      default: '请搜索内容'
    },
    options: {
      type: Array,
      default: () => {
        return [
          {
            title: '按照用户查找',
            value: '2'
          },
          {
            title: '按照作品查找',
            value: '1'
          }
        ]
      }
    },
    size: {
      type: String,
      default: 'default'
    },
    color: {
      type: String,
      default: '#9A77A3'
    },
    isShowOption: {
      type: Boolean,
      default: true
    },
    watchInput: {
      type: Boolean,
      default: false
    },
    isHiddenInput: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      searchType: '',
      isHidden: true,
      value: ''
    }
  },
  methods: {
    init () {
      const searchDom = document.getElementById('my-search-box')
      searchDom.addEventListener('mouseout', () => {
        console.log('隐藏search')
        this.isHidden = true
      })
    },
    handleChange (e) {
      if (this.$props.watchInput) {
        this.$emit('handleChange', { value: e.target.value, searchType: this.searchType })
      }
    },
    hiddenSearch () {
      this.isHidden = true
    },
    handleSearch (value) {
      this.$emit('handleSearch', { value: value, searchType: this.searchType })
    },
    showSearch () {
      this.isHidden = false
      console.log('点击')
    }
  },
  mounted () {
    this.isHidden = this.isHiddenInput
    this.searchType = this.$props.options[0].value
    // this.init()
  }
}
</script>

<style scoped>
.box {
  height: 40px;
}

.icon {
  margin: 10px;
}

.icon:hover {
  cursor: pointer;
}

.options {
  font-size: 12px;
  /*padding: 0 3px;*/
  /*border-radius: 0;*/
}
</style>
