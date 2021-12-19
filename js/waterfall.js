function waterFall(id) {
  var $boxs = $(`#${id}>div`);
  var w = $boxs.eq(0).outerWidth();
  var cols = 2;
  var hArr = [];
  $boxs.each(function (index, value) {
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
  $(`#${id}`).height(Math.max.apply(null, hArr) + "px");
}
// 绑定事件
function bindingEvent({ id, callback1 }) {
  // 商品列表切换
  $(`#${id} #tabSwitch>.tab`).click(function () {
    // 防止重复点击
    if ($(this).hasClass("active")) {
      console.log("重复点击");
    } else {
      $(this).addClass("active");
      $(this).siblings(".tab").removeClass("active");
      // 每一次切换都重新请求列表数据
      $(`#${id} #loading`).show();
      $(`#${id} .shop_lists_box`).hide();
      $("#cnt_loading").hide();
      // 这里模拟请求数据
      setTimeout(function () {
        $(`#${id} #loading`).hide();
        $(`#${id} .shop_lists_box`).show();
        $("#cnt_loading").show();
        // 重新执行瀑布流函数
        waterFall("shop_box_content");
      }, 1000);
    }
  });
  // 商品列表点击购物车按钮
  $(`#shop_box_content .shop_cart_btn`).click(function () {
    var childId = $(this).parents(".box").attr("id");
    var $addCut = $(this).parent().siblings(".add_cut_btn");
    $(this).hide();
    $addCut.css("display", "flex");
    $addCut.find(".num").html(1);
    // 重新执行瀑布流函数
    waterFall("shop_box_content");
    callback1({ childId, num: 1 });
    return false;
  });
  // 增加与减少购物车数量
  $(`#${id} #shop_box_content .add_cut_btn>.cut`).click(function () {
    var childId = $(this).parents(".box").attr("id");
    var num = $(this).siblings(".num").html();
    var $addCut = $(this).parent();
    var $cart = $(this)
      .parent()
      .siblings(".price_num_cart")
      .find(".shop_cart_btn");
    var finalNum = Number(num) - 1;
    if (finalNum < 1) {
      $addCut.hide();
      $cart.show();
    } else {
      $(this).siblings(".num").html(finalNum);
    }
    // 重新执行瀑布流函数
    waterFall("shop_box_content");
    callback1({ childId, num: finalNum });
    return false;
  });
  $(`#${id} #shop_box_content .add_cut_btn>.add`).click(function () {
    var childId = $(this).parents(".box").attr("id");
    var num = $(this).siblings(".num").html();
    var finalNum = Number(num) + 1;
    $(this).siblings(".num").html(finalNum);
    // 重新执行瀑布流函数
    waterFall("shop_box_content");
    callback1({ childId, num: finalNum });
    return false;
  });
}
