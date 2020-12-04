import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const roles = store.state.roles

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = permissionRoles.includes(roles)

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
