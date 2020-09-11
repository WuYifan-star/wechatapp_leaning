// pages/playmusic/playmusic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    song:[],
    title:[],
    nowindex:0,
    count:0,
    isall:''
  },

  init:function(){

    wx.request({
      url: 'https://www.fastmock.site/mock/c7f2c1eccbe480e7268c74d281ba74d2/_listenmusic/getsongs',
      success:res=>{
        console.log("模拟数据"+res.data)
        console.log(res.data)
        this.data.title=[];
        for(var i =0;i<res.data.data[this.data.nowindex].songname.length;i++){
          this.data.title.push('');
        }
        this.setData({
          songs:res.data.data,
          count:res.data.data[this.data.nowindex].songname.length,
          title:this.data.title
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'isshow',
      success:res=>{
        console.log("引导页已经访问")
        this.init()
      },
      fail: function() {
        console.log("引导页没有访问")
        wx.redirectTo({
          url: '/pages/welcome/welcome',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getitem:function (e) {
    var word=this.data.songs[this.data.nowindex].keyword[e.target.id];
    console.log("当前点击的关键字"+word);

    for (var i = 0;i < this.data.count;i++){
      if(this.data.title[i] == ''){
        this.data.title[i] = word;
        break;
      }
    }

    if (i == this.data.title.length - 1)  {
      this.setData({
        isall:"all"
      })
    }


    this.setData({
      title:this.data.title
    })
    
    if (this.data.isall == 'all') {
      if (this.data.songs[this.data.nowindex].songname == this.data.title.join('')) {
        console.log("正确")
        wx.showModal({
          title: '提示',
          content: '恭喜你答题正确',
          showCancel:false,
          // cancelText: '取消',
          // cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#3CC51F',
          success: (res) => {
            if(res.confirm){
              this.setData({
                nowindex:this.data.nowindex + 1,
                isall:''
              })
              this.init()
            }
          },
        });
      }
      else{
        console.log("不正确")
        wx.showModal({
          title: '提示',
          content: '很遗憾，答题错误',
          showCancel: false,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#3CC51F',
          success: (result) => {
            if(result.confirm){
              
            }
          },
        });
       }
    }

  },

 
  cleartxt:function(event){
    this.data.title[event.target.id]='';
    this.setData({
      title:this.data.title
    })
  }
})