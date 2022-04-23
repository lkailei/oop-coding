// const sidebar = require('./configs/sidebar');
const plugins = require('./configs/plugin');
module.exports = {
    title: '面向对象Coding',
    description: 'oopCoding',
    base:'/vue-press/',
    dest:'./dist',
    themeConfig:{
        // 导航栏
        nav:[
            {text:'指南',link:'/guide/',target:'_self',rel:''},
            {text:'面试宝典',link:'/interview/',target:'_self',rel:''},
            {text:'公号文章',link:'/wechat/',target:'_self',rel:''},
            {text:'后端工具',ariaLabel:'前端工具',
                items:[
                    {text:'vuepress',link:'https://www.vuepress.vuejs.org',target:'_blank'},
                    {text:'maven',link:'https://mvnrepository.com/',target:'_blank'}
                ]
            },
            {text:'前端工具',ariaLabel:'前端工具',
                items:[
                    {text:'vuepress',link:'https//www.vuepress.org',target:'_blank'},
                    {text:'vue',link:'https://www.vue.org',target:'_blank'}
                ]
            },
            {text:'changeLog',link:'/changeLog/',target:'_blank',rel:''}
        ],
        // 侧边栏
        sidebar:'auto',
        // 上一篇
        nextLinks:true,
        prevLinks:true,
        // 页面滚动
        smoothScroll: true,
        
    },
    // plugins 要与themeCinfig同级
    plugins,
    markdown:{
        extractHeaders:['h2','h3','h4','h5','h6']
    },
    head:[
            ["script",
            {},
            `
            var _hmt = _hmt || [];
            (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?634681ee52ddf5b1f6ff2c69397bda83";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
            })();
            
            `
        ]
    ]
}