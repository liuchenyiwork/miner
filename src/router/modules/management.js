/**
 *
 * @returns {Promise<*>}
 * @constructor
 */

const Dimension = () => import(/* webpackChunkName: "dimension" */ '@/views/management/dimension')
const Indicator = () => import(/* webpackChunkName: "indicator" */ '@/views/management/indicator')
const DataType = () => import(/* webpackChunkName: "data-type" */ '@/views/management/data-type')

export default [{
  name: 'Dimension',
  path: '/management/dimension',
  component: Dimension,
  meta: {
    title: 'management.dimension_config'
  }
},
  {
    name: 'Indicator',
    path: '/management/indicator',
    component: Indicator,
    meta: {
      title: 'management.indicator_config'
    }
  },
  {
    name: 'DataType',
    path: '/management/data-type',
    component: DataType,
    meta: {
      title: 'management.data_type'
    }
  },
]

