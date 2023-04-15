<template>
  <component
    :is="menuComponent"
    v-if="!route.hidden"
    :is-collapse="isCollapse"
    :theme="theme"
    :router-info="route"
  >
    <template v-if="routerInfo.children && routerInfo.children.length > 1">
      <AsideComponent
        v-for="item in routerInfo.children"
        :key="item.name"
        :is-collapse="false"
        :router-info="item"
        :theme="theme"
      />
    </template>
  </component>
</template>

<script>
export default {
  name: 'AsideComponent'
}
</script>

<script setup>
import MenuItem from './menuItem.vue'
import SubMenu from './submenu.vue'
import { computed } from 'vue'
const props = defineProps({
  routerInfo: {
    type: Object,
    default: () => null
  },
  isCollapse: {
    default: function () {
      return false
    },
    type: Boolean
  },
  theme: {
    default: function () {
      return {}
    },
    type: Object
  }
})

const route = computed(() => {
  if (
    props.routerInfo.children &&
    props.routerInfo.children.filter((item) => !item.hidden).length === 1
  ) {
    return props.routerInfo.children[0]
  }
  return props.routerInfo
})

const menuComponent = computed(() => {
  if (
    props.routerInfo.children &&
    props.routerInfo.children.filter((item) => !item.hidden).length > 1
  ) {
    return SubMenu
  } else {
    return MenuItem
  }
})
</script>
