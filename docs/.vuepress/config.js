// const sidebar = require('./configs/sidebar');
const plugins = require('./configs/plugin');
module.exports = {
    title: '面向对象Coding',
    description: 'oopCoding',
    base:'/oop-coding/',
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
                    {text:'vue',link:'https://www.vue.org',target:'_blank'},
                    {text:'Lodash',link:'https://lodash.com/',target:'_blank'},
                    {text:'Underscore.js',link:'https://underscorejs.org/',target:'_blank'},
                    {text:'Ramda',link:'https://ramdajs.com/',target:'_blank'},
                    {text:'Collect.js',link:'https://collect.js.org/',target:'_blank'},
                    {text:'date-fns',link:'https://date-fns.org/',target:'_blank'},
                    {text:'Moment.js',link:'https://momentjs.com/',target:'_blank'},
                    {text:'Day.js',link:'https://day.js.org/',target:'_blank'},
                    {text:'Chance.js',link:'https://chancejs.com/',target:'_blank'},
                    {text:'UUID',link:'https://github.com/uuidjs/uuid',target:'_blank'},
                    {text:'nanoid',link:'https://zelark.github.io/nano-id-cc/',target:'_blank'},
                    {text:'Math.js',link:'https://mathjs.org/',target:'_blank'},
                    {text:'Numeral.js',link:'http://numeraljs.com/',target:'_blank'},
                    {text:'Accounting.js',link:'http://openexchangerates.github.io/accounting.js',target:'_blank'},
                    {text:'Voca.js',link:'https://vocajs.com/',target:'_blank'},
                    {text:'js-cookie.js',link:'https://github.com/js-cookie/js-cookie',target:'_blank'},
                    {text:'Fontastic 字体图标',link:' http://fontastic.me/',target:'_blank'},
                    {text:'Voca.js',link:' https://vocajs.com/',target:'_blank'}
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