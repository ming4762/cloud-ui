import Layout from '@/page/index/'

export default [{
  path: '/system',
  name: '系统',
  component: Layout,
  redirect: '/system/menu_v2',
  children: [{
    // 菜单
    path: 'menu_v2',
    name: '菜单管理',
    component: () =>
      import('@/page/system/menu/MenuTable.vue')
  }, {
    // 角色
    path: 'role',
    name: '角色管理',
    component: () =>
      import('@/page/system/role/RoleTable.vue')
  }]
}]
