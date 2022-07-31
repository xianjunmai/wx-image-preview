Page({
  data: {
    imgData: {},
    currentNum: 1,
    totalCount: 1,
    isLoading: true,
    defaultData: {
      title: "",
    },
    isScaling: false,
    touchStartTime: 0,
    touchEndTime: 0,
    lastTapTime: 0,
    lastTapTimeoutFunc: null,
    scaleValueTmp: 0,
    defaultValue: 1,
    direction: "all",
    lastMovableScale: null,
    lastMovableScaleTime: null
  },
  onLoad: function (options) {
    let data = JSON.parse(decodeURIComponent(options.images));
    let current = data.current;
    let list = data.list;
    let currentNum = list.indexOf(current);
    this.setData({
      imgData: data,
      totalCount: data.list.length,
      currentNum: currentNum + 1,
      ["defaultData.title"]: currentNum + 1 + ' / ' + list.length
    })
  },
  imageBindChange(e) {
    var cuttent = e.detail.current + 1;
    var totalNum = this.data.totalCount;
    this.setData({
      currentNum: e.detail.current + 1,
      scaleValueTmp:1,
      ["defaultData.title"]: cuttent + '/' + totalNum
    })
  },
  imageLoad(e) {
    this.setData({
      isLoading: false
    });
  },
  /// 缩放事件
  movableScale(e) {
    this.lastMovableScale = e.detail
    if (this.lastMovableScaleTime) {
      clearTimeout(this.lastMovableScaleTime)
    }
    this.lastMovableScaleTime = setTimeout(() => {
      this.setData({
        scaleValueTmp: this.lastMovableScale.scale
      })
      this.lastMovableScaleTime = null
    }, 100)
  },
  touchStart: function (e) {
    this.touchStartTime = e.timeStamp
  },
  touchEnd: function (e) {
    this.touchEndTime = e.timeStamp
  },
  /// 单击、双击
  multipleTap: function (e) {
    var that = this
    // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
    if (that.touchEndTime - that.touchStartTime < 350) {
      var currentTime = e.timeStamp
      var lastTapTime = that.lastTapTime
      that.lastTapTime = currentTime
      // 如果两次点击时间在300毫秒内，则认为是双击事件
      if (currentTime - lastTapTime < 300) {
        console.log("double tap")
        that.setData({
          defaultValue: 1,
          isScaling: false
        })
        clearTimeout(that.lastTapTimeoutFunc);
      } else {
        that.lastTapTimeoutFunc = setTimeout(function () {
        }, 300);
      }
    }
  }
})