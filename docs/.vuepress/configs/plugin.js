/**
 * 引入插件
 */
const plugins=[
    '@vuepress/back-to-top', // 返回到到顶部插件
    '@vuepress/nprogress', // 进度条插件
    'reading-progress', // 阅读进度插件
    'img-lazy', // 图片的懒加载
    'vuepress-plugin-element-tabs', // tab切换
  ['@vuepress/active-header-links',{
      // 页面滚动时自动激活侧边栏链接的插件配置
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor',
    },
  ],
  ["vuepress-plugin-auto-sidebar",{
       // 标题模式
      title:{
          mode:'titlecase'
      },
      collapse: {
        open: true,
        collapseList: [
        // 折叠的路由列表
        ],
        uncollapseList: [
        // 不折叠的路由列表
        ],
      }, // 设置为true,开启折叠
      sidebarDepth: 2, // 标题的深度 默认为1,只有1和2
     
    },
  ],
  ['@vuepress/medium-zoom', {
    selector: 'img.zoom-custom-imgs',
    // medium-zoom options here
    // See: https://github.com/francoischalifour/medium-zoom#options
    options: {
      margin: 16
    }
  }]
]
module.exports = plugins;