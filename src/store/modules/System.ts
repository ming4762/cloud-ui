let state = {
  aside: {
    isCollapse: false
  }
}

const mutations = {
  // 设置宽度
  setAsideCollapse: (state, isCollapse: boolean) => {
    state.aside.isCollapse = isCollapse
  }
}

const getters = {
  asideCollapse: state => state.aside.isCollapse
}

export default {
  state,
  mutations,
  getters
}
