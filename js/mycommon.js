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
