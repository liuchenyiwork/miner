
const getters = {
  subHeaderTitle: state => state.styles.subHeaderTitle,
  asideMenuActivePath: state => state.styles.asideMenuActivePath,
  userInfo: state => state.users,
  gainStatisticsDuration: state => state.gain.statisticsDuration
}

export default getters;

