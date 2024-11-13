<template>
  <div id="app-cover" @click="toggleGender">
    <input type="checkbox" id="checkbox" :checked="checked" style="width: 0;height: 0" />
    <div id="path" ref="path"></div>
    <div id="knob">
      <div id="bow" ref="bow">
        <Bowtie rootClass="bowtie" :color="checked? '#e91e63':'#7aa0ff'"></Bowtie>
      </div>
    </div>
    <div id="gender">
      <div id="fe">FE</div>
      <div id="male" ref="male"><span>MALE</span></div>
    </div>
  </div>
</template>

<script>
import Bowtie from 'vue-ionicons/dist/md-bowtie'
import IosBicycleIcon from 'vue-ionicons/dist/ios-bicycle'

export default {
  name: 'GenderToggle',
  props: {
    gender: {
      type: Number,
      default: () => {
        return 1
      }
    }
  },
  components: {
    Bowtie,
    IosBicycleIcon
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    toggleGender () {
      this.checked = !this.checked
      this.animate()
      this.$emit('toggle', this.checked ? 2 : 1)
    },
    animate () {
      if (this.checked) {
        this.$refs.male.classList.remove('ma')
        setTimeout(() => {
          this.$refs.path.classList.add('fe')
          this.$refs.male.classList.add('fe')
          this.$refs.bow.classList.add('fe')
        }, 400)
      } else {
        this.$refs.male.classList.add('ma')
        setTimeout(() => {
          this.$refs.path.classList.remove('fe')
          this.$refs.male.classList.remove('fe')
          this.$refs.bow.classList.remove('fe')
        }, 400)
      }
    }
  },
  watch: {
    gender: {
      handler (val) {
        const _this = this
        this.checked = val !== 1
        setTimeout(() => {
          _this.animate()
        }, 300)
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
@import "./font-family.css";

#app-cover {
  position: relative;
  width: 7.6em;
  height: 3em;
}

#checkbox {
  height: 0;
  width: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  opacity: 0;
  z-index: 3;
}

#path {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f1f3f8;
  border-radius: 1.5em;
}

#knob {
  position: absolute;
  top: 0.3em;
  left: 0.3em;
  width: 2.4em;
  height: 2.4em;
  background-color: #c0dfff;
  border-radius: 50%;
  box-shadow: 0 0 6px #dae4ff;
  transition: 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) all;
  z-index: 1;
}

#bow {
  color: #2d8cf0;
  position: absolute;
  left: 0.55em;
  bottom: -1.4em;
  transition: 0.2s ease color;
}


#gender {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0.6em;
  width: 7em;
  font-size: 1em;
  font-family: Roboto, Helvetica;
  text-align: right;
  line-height: 1;
}

#fe {
  position: absolute;
  top: 0em;
  left: 0.6em;
  color: #e91e63;
  transition: 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) all;
}

#male {
  right: 0.2em;
}

#male,
#male span {
  position: relative;
}

#bow,
#male span {
  color: #7aa0ff;
}

#male span {
  z-index: 1;
  display: inline-block;
}

#male span:before {
  content: "MALE";
  position: absolute;
  top: 0;
  left: 0;
  vertical-align: center;
  display: inline-block;
  height: 100%;
  width: 0;
  color: #e91e63;
  white-space: pre;
  overflow: hidden;
  transition: 0.3s cubic-bezier(0.4, 0, 1, 1) all;
  z-index: 1;
}

#path.fe {
  background-color: #f8f1f7;
}

#checkbox:checked ~ #knob {
  background-color: #ffb7d3;
  transform: rotateZ(-135deg);
  box-shadow: 0 0 6px #ffe2fe;
}

#knob #bow .fe {
  color: #e91e63;
}

#knob #bow .bowtie {
  color: #7aa0ff;
}


#checkbox:checked ~ #gender #fe {
  left: 2.9em;
}


#male.fe span:before {
  width: 100%;
}

#checkbox:checked ~ #gender #male {
  animation: move 0.2s ease 0.4s;
}

#male.ma {
  animation: move_l 0.2s ease 0.1s;
}

@keyframes move {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(3px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes move_l {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(3px);
  }
  100% {
    transform: translateX(0);
  }
}

</style>
