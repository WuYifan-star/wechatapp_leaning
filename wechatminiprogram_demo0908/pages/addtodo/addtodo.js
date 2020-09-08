// pages/addtodo/addtodo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    todolist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'todolist',
      //ES6箭头函数解决了this指向问题  ES5 JavaScript TypeScript
      success:res=>{
        console.log("--------------------onaddtodo")
        console.log(res.data)
        this.setData({
          todolist:res.data
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

  oncontentchange:function (e) {
    console.log(e.detail.value);
    this.setData({
      content: e.detail.value
    })
  },

  onsubmitcontent:function(){
    this.data.todolist.push({
      content: this.data.content,
      status:false
    })
    wx.setStorage({
      key: 'todolist',
      data: this.data.todolist
    })
    wx.redirectTo({
      url: '/pages/todolist/todolist'
    })
  }
})