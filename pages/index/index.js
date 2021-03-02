const WXAPI = require('apifm-wxapi')

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    banPicList:[],
    catalogList:[],
    seckillList:[],
    goodsRecommend:[],
    curPage:1,
    pageSize:10,
    goods:[]
    
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
    WXAPI.goodsCategory({//分类

    }).then(function(res){
      // console.debug(res)
      that.setData({
        catalogList:res.data
      })   
    }).catch(function(e){
      console.error(e)
    })
  },
  getMiaoShaGoods(){//限时秒杀
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
  },getRecomandData(){//爆品推荐
     var that = this
    WXAPI.goods({
      recommendStatus: 1
    }).then(function(res){
      that.setData({
        goodsRecommend:res.data
      })
    }).catch(function(e){
      console.debug(e)
    })
  },getGoodList(categoryId){
    var that =this
    WXAPI.goods({
      categoryId: categoryId,
      page: this.data.curPage,
      pageSize: this.data.pageSize
    }).then(function(res){
      console.debug(res)
      if(res.code!=0){
        wx.showToast({
          title: '暂无商品数据',
        })
        return
      }
     
      if(that.data.goods.length!=0){
        for (var i = 0; i < res.data.length; i++) {
          that.data.goods.push(res.data[i])
          that.setData({
            goods: that.data.goods
          })
        }
      }else{
        that.setData({
          goods:res.data
        })
      }
    
    }).catch(function(e){
      console.debug(e)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getBannerData();
    this. getCatalog();
    this.getMiaoShaGoods();
    this.getRecomandData();
    this.getGoodList(0)
  },
  

  onReachBottom:function(){
    this.data.curPage++
    this.getGoodList(0) 
  }
  
  
  
})