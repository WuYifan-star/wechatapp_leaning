// pages/todolist/todolist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todolist:[],
    items: [],
		startX: 0, //开始坐标
		startY: 0
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
    var that = this;
		for (var i = 0; i < 10; i++) {
		this.data.items.push({
			content: i + " 向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦",
			isTouchMove: false //默认隐藏删除
		})
	}
	this.setData({
		items: this.data.items
	});
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
  },




  // delete function  


	

	
	//手指触摸动作开始 记录起点X坐标
	touchstart: function (e) {
  //开始触摸时 重置所有删除
  console.log("-------------")
	this.data.items.forEach(function (v, i) {
		if (v.isTouchMove)//只操作为true的
		v.isTouchMove = false;
	})
	
	this.setData({
		startX: e.changedTouches[0].clientX,
		startY: e.changedTouches[0].clientY,
		items: this.data.items
	})
	},
	
	//滑动事件处理
	touchmove: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index,//当前索引
    startX = that.data.startX,//开始X坐
    startY = that.data.startY,//开始Y坐标
    touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
    touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
    //获取滑动角度
    angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.items.forEach(function (v, i) {
    v.isTouchMove = false
    //滑动超过30度角 return
    if (Math.abs(angle) > 30) return;
    if (i == index) {
    if (touchMoveX > startX) //右滑
    v.isTouchMove = false
    else //左滑
    v.isTouchMove = true
    }
	})
	
	//更新数据
	that.setData({
		items: that.data.items
	})
	},
	
	/**
	* 计算滑动角度
	* @param {Object} start 起点坐标
	* @param {Object} end 终点坐标
	*/
	
	angle: function (start, end) {
    var _X = end.X - start.X,
    _Y = end.Y - start.Y
    
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
	},
	
	//删除事件
	del: function (e) {
		this.data.items.splice(e.currentTarget.dataset.index, 1)
		this.setData({
			items: this.data.items
		})
	}



})