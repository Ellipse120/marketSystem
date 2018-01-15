const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  permission_routers: state => state.permission.routers,
  isShowDialog: state => state.bloomConfig.isShowDialog,
  appRouter: state => state.app.appRouter,
  errorLogs: state => state.errorLog.logs
}
export default getters
