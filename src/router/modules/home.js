/**
 * home pages
 */
import management from "@/router/modules/management";

const Home = () => import(/* webpackChunkName: "home" */ '@/views/home')
// const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard')
// const CustomQuery = () => import(/* webpackChunkName: "custom-query" */ '@/views/custom-query')
// const RulesDetail = () => import(/* webpackChunkName: "rules-config" */ '@/views/rules-detail')
const Issue = () => import(/* webpackChunkName: "issue" */ '@/views/issue-check')
// const IssueRecycle =() => import('@/views/issue-check/issue-recycle')
const GrindGain = () => import('@/views/grind-gain')
const IssueManage = () => import('@/views/issue-manage')

export default {
  name: 'Home',
  path: '/',
  redirect: '/grind-gain',
  component: Home,
  children: [
    // {
    //   name: 'Dashboard',
    //   path: '/dashboard',
    //   component: Dashboard,
    //   meta: {
    //     title: 'dashboard'
    //   }
    // },
    // {
    //   name: "CustomQuery",
    //   path: "/custom-query",
    //   component: CustomQuery,
    //   meta: {
    //     title: 'custom_query'
    //   }
    // },

    // {
    //   name: "RulesDetail",
    //   path: "/rules-detail",
    //   component: RulesDetail,
    //   meta: {
    //     title: 'rules_detail'
    //   }
    // },

    // {
    //   name: "Issue",
    //   path: "/issues",
    //   component: Issue,
    //   meta: {
    //     title: 'issue'
    //   },
    // },

    // {
    //   name: "IssueRecycle",
    //   path: "/issues/recycle",
    //   component: IssueRecycle,
    //   meta: {
    //     title: 'issue_to_check.issue_recycle',
    //     father_path: "/issues",
    //   },
    // },
    {
      name: "GrindGain",
      path: "/grind-gain",
      component: GrindGain,
      meta: {
        title: 'grind_gain'
      }
    },
    {
      name: "IssueManage",
      path: "/issue-manage",
      component: IssueManage,
      meta: {
        title: 'issue_manage'
      }
    },
    ...management,
  ]
}

