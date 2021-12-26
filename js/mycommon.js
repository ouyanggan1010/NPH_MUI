// 计算在不同尺寸的屏幕下，下拉刷新的高度
const refreshH = (($(window).width() * 55) / 390).toFixed(4);
// 返回的方法
function backHtml() {
  location.back();
}
function backMui() {
  mui.back();
}
// 打开窗口的方法
function openWindow(params) {
  mui.openWindow({
    ...params,
  });
}
// html替换当前页面
function replaceHtml(url) {
  location.replace(url);
}
// 计算瀑布流
function waterFall(id) {
  var $boxs = $(`#${id}>div`);
  var w = $boxs.eq(0).outerWidth();
  var cols = 2;
  var hArr = [];
  $boxs.each(function (index) {
    var h = $(this).outerHeight();
    if (index < cols) {
      hArr[index] = h;
    } else {
      var minH = Math.min.apply(null, hArr);
      var minHIndex = $.inArray(minH, hArr);
      $(this).css({
        position: "absolute",
        top: minH + "px",
        left: minHIndex * w + "px",
      });
      hArr[minHIndex] += h;
    }
  });
  // 计算div的总高度
  $(`#${id}`).height(Math.min.apply(null, hArr) + 5 + "px");
}