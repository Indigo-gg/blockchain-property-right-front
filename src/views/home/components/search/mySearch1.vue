<template>
  <div id="wrap">
    <div class="search">
      <svg xmlns="http://www.w3.org/2000/svg" width="355.5" height="87.99">
        <path class="right" fill="none" :stroke="$props.color" stroke-width="4" stroke-miterlimit="10"
              d="M177.75 85.99h133.5c23.334 0 42.25-18.916 42.25-42.25C352.944 20.528 333.967 2 310.748 2H177.75"/>
        <path class="left" fill="none" :stroke="$props.color" stroke-width="4" stroke-miterlimit="10"
              d="M177.75 85.99H44.25C20.916 85.99 2 67.074 2 43.74 2.556 20.528 21.533 2 44.752 2H177.75"/>
      </svg>

      <p></p>
      <input type="text"/>
      <span>{{ $props.placeholder }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  props:{
    placeholder:
      {
        type:String,
        default:'请搜索内容'
      },
    color:{
      type:String,
      default: '#9A77A3'
    }
  },
  mounted() {
    let check;
    let input = document.querySelector('.search input');
    let text = document.querySelector('.search p');
    let search = document.querySelector('.search');
    let trigger = true;

    input.addEventListener('click', () => {
      if (trigger) {
        search.classList.add('active');

        check = () => {
          let cur, oldVal;
          cur = input.value;

          if (cur !== oldVal) {
            text.innerHTML = input.value;
          }

          return oldVal = cur;
        };

        let sentinel = setInterval(check, .1);
      }
    });

    input.addEventListener('blur', () => {
      trigger = false;
      input.style.pointerEvents = 'none';

      input.value = '';
      text.innerHTML = '';
      search.classList.add('remove');

      setTimeout(() => {
        search.classList.add('done');
        setTimeout(() => {
          search.classList.remove('active', 'remove');

          setTimeout(() => {
            search.classList.remove('done');
            trigger = true;
            input.style.pointerEvents = 'all';
          }, 100);
        }, 100);
      }, 800);
    });

  }
}
</script>

<style lang="less" scoped>


body {
  background: #530491;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Open Sans', sans-serif;
}

.search {
  position: relative;
  overflow: hidden;
  height: 88px;

  &.active {
    &::before {
      top: 14px;
      bottom: 14px;
      opacity: 0;
    }

    path {
      stroke-dashoffset: -400;
    }

    p {
      pointer-events: all;

      &::before,
      &::after {
        opacity: 1;
      }
    }

    span {
      transform: scale(0);
      opacity: 0;
    }

    &.remove {
      &::before {
        transition: all 200ms linear 200ms, opacity 0ms linear 0ms;
        top: 88px;
        bottom: 2px;
        opacity: 1;
      }

      p {
        &::before,
        &::after {
          transition: all 0ms;
          opacity: 0;
        }
      }

      path {
        stroke-dashoffset: -800;
        transition-delay: 400ms;
      }

      span {
        transform: scale(1);
        opacity: 1;
        transition-delay: 400ms;
      }

      &.done {
        &::before {
          top: 0;
          bottom: 88px;
          opacity: 1;
          transition: none;
        }

        path {
          stroke-dashoffset: 0;
          stroke-dasharray: 400;
          transition: none;
        }
      }
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-1px);
    width: 4px;
    background: #444164;
    bottom: 88px;
    border-radius: 50px;
    opacity: 1;
    transition: all 400ms ease-in-out 500ms, opacity 200ms linear 1000ms;
  }

  path {
    stroke-dashoffset: 0;
    stroke-dasharray: 400;
    transition: all 500ms ease-in-out;
  }

  span {
    position: absolute;
    top: 50%;
    left: 0;
    height: 80px;
    line-height: 80px;
    width: 100%;
    margin-top: -40px;
    vertical-align: middle;
    text-align: center;
    font-size: 34px;
    letter-spacing: 2px;
    color: #444164;
    pointer-events: none;
    user-select: none;
    transition: all 400ms ease-in-out;
    opacity: 1;
    transform: scale(1);
    text-transform: uppercase;
  }

  input,
  p {
    position: absolute;
    top: 50%;
    left: -9px;
    height: 80px;
    line-height: 80px;
    width: 100%;
    margin-top: -40px;
    vertical-align: middle;
    text-align: center;
    font-size: 40px;
  }

  input {
    color: transparent;
    background-color: transparent;
    border: 0;
    outline: none;
  }

  p {
    color: #444164;
    pointer-events: none;
    white-space: nowrap;

    &:after,
    &:before {
      content: '';
      opacity: 0;
      width: 4px;
      height: 60px;
      vertical-align: middle;
      border-radius: 20px;
      margin-top: 8px;
      transition: all .2s ease-in-out;
      transition-delay: 1000ms;
      display: inline-block;
    }

    &:after {
      position: relative;
      bottom: 8px;
      left: 8px;
      background: #444164;
      animation: blinky 450ms linear infinite alternate;
    }
  }
}

@keyframes blinky {
  0% {
    background: transparent;
  }
  100% {
    background: #444164;
  }
}

</style>