import name from './mock.js'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}
$(function () {
  var str = "",
    len = 30,
    list = [],
    swiperWrap = $(".swiper-wrapper");

  /* 滚动数据 */
  new Swiper(".swiper-container", {
    direction: "vertical",
    speed: 700,
    loop: true,
    autoplay: 2000,
    autoplayDisableOnInteraction: false,
    observer: true,
    observerParent: true
  });
  for (var i = 0; i < len; i++) {
    list.push({
      name: name.name(),
      doing: name.doing(),
      time: name.time()
    });
  }
  $.each(list, function (index, item) {
    str +=
      '<div class="swiper-slide">' +
      item.name +
      ' <span class="m-l5">' +
      item.time +
      "</span>" +
      item.doing +
      "</div>";
  });
  swiperWrap.html(str);
});