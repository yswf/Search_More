// 搜索引擎网站
export const defaultSet = {
  baiduUrl: 'https://www.baidu.com/s?ie=utf-8&word=',
  bingUrl: 'https://cn.bing.com/search?q=',
  googleUrl: 'https://search.lib.edu.eu.org/search?q=',
  githubUrl: 'https://github.com/search?q=',
  youdaoUrl: 'https://dict.youdao.com/dictvoice?type=0&audio=',
  // 备份 youdaoUrl: 'http://tts.youdao.com/fanyivoice?word=',
  translationApi: 'https://m.yswf.xyz/test',
  quarkApi: 'https://m.yswf.xyz/api/quark_sug',
  bingApi: 'https://m.yswf.xyz/HPImageArchive.aspx',
  autoFocus: true
  // https://cn.bing.com/th?id=OHR.ToledoIldefonso_ZH-CN4507206651_1920x1080.jpg&amp;rf=LaDigue_1920x1080.jpg&amp;pid=hp
  // baiduKeysUrl:
  //     'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd='
  // bingImgUrl: 'https://cn.bing.com/ImageResolution.aspx?w=375&h=667'
}
export const defaultImagesInformation = {
  url: '',
  copyright: '',
  backGroundUrlStatus: true
}
export const base64Image = ''
// 中文正则
export const chinese = /^[\u4e00-\u9fa5]+$/
