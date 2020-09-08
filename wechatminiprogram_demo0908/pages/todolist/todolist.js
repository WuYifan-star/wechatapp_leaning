// pages/todolist/todolist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
        console.log("--------------------")
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
  
  onaddtodo: function () {
    wx.redirectTo({
      url: '/pages/addtodo/addtodo'
    })
  },
  onchangestatus: function (e) {
    if(this.data.todolist[e.currentTarget.id].status == false){
      this.data.todolist[e.currentTarget.id].status = true
    }
    else{
      this.data.todolist[e.currentTarget.id].status = false
    }
      
    this.setData({
      todolist:this.data.todolist
    })
    wx.setStorage({
      key: 'todolist',
      data: this.data.todolist
    })
  }

})