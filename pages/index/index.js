const WXAPI = require('apifm-wxapi')

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    banPicList:[],
    catalogList:[],
    seckillList:[]
    
  },

  getBannerData:function(){
    var that  = this
    WXAPI.banners({
      type:'app'
    }).then(function(res){
      // console.log(res)
      if(res.code==0){
        that.setData({
          banPicList : res.data
        })
      }

    }).catch(function(e){
      console.error(e)
    })

  },
  getCatalog(){
    var that  = this
    WXAPI.goodsCategory({

    }).then(function(res){
      // console.debug(res)
      that.setData({
        catalogList:res.data
      })   
    }).catch(function(e){
      console.error(e)
    })
  },
  getMiaoShaGoods(){
    var that = this
    WXAPI.goods({
      miaosha: true
    }).then(function(res){
      console.debug(res)
      that.setData({
        seckillList:res.data
      })


    }).catch(function(e){
      console.error(e)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getBannerData();
    this. getCatalog();
    this.getMiaoShaGoods();
  },
  

  
})