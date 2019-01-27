$(document).ready(function () {
  M.AutoInit();
  var startnum = 0;
  var str = "";
  var ranking = 1;

  function getData() {
    $(`#table-content`).html(`<h4 class="grey-text text-darken-2">載入中...</h4>`);
    $.ajax({
      url: `https://testsite.staging.seekrtech.com/forest_rankings?n=19&last_pos=${startnum}`,
      type: "GET",
      success: function (result) {
        console.log(result);
        render(result);
      },
      error: function (error) {
        console.log("error:", error);
        $(`#table-content`).html(`<h4 class="red-text text-darken-2">伺服器發生錯誤，請稍後再試</h4>`);
      }
    });
  }
  getData();

  function render(result) {
    const element = result["ranking"];
    for (const inner_key in element) {
      const inner_element = element[inner_key];
      if (inner_element.avatar != null) {
        str += `
        <div id="badge">
          <img src="./icon/leaderboard_badge.png" >
          <h id="ranking">${ranking}</h>
        </div>
        <div class="card">
        <table>
            <tr>
              <td rowspan="2" class="td-align"><img src="${inner_element.avatar}"></td>
              <td colspan="3">${inner_element.name}</td>
            </tr>
            <tr>
              <td><img src="./icon/tree_icon_healthy.png" class="icon">&nbsp${inner_element.health_count}</td>
              <td><img src="./icon/tree_icon_dead.png" class="icon">&nbsp${inner_element.dead_count}</td>
              <td>${inner_element.total_minutes}分鐘</td>
            </tr>
        </table>
        </div>
        `;
      } else {
        str += `
        <div id="badge">
          <img src="./icon/leaderboard_badge.png" >
          <h id="ranking">${ranking}</h>
        </div>
        <div class="card">
        <table>
            <tr>
              <td rowspan="2" class="td-align"><img src="./icon/icon_120.png"></td>
              <td colspan="3">${inner_element.name}</td>
            </tr>
            <tr>
            <td><img src="./icon/tree_icon_healthy.png" class="icon">&nbsp${inner_element.health_count}</td>
            <td><img src="./icon/tree_icon_dead.png" class="icon">&nbsp${inner_element.dead_count}</td>
              <td>${inner_element.total_minutes}分鐘</td>
            </tr>
        </table>
        </div>
        `;
      }
      ranking += 1;
    }
    $(`#table-content`).html(str);
  }

  var scrollTimer;
  $(window).scroll(function () {
    if (scrollTimer) {
      clearTimeout(scrollTimer);
      scrollTimer = undefined;
    }
    scrollTimer = setTimeout(function () {
      if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
        startnum = startnum + 20;
        console.log(startnum);
        getData();
      }
    }, 300);
  });

  // $(window).scroll(function () {
  //   //下面这句主要是获取网页的总高度，主要是考虑兼容性所以把Ie支持的documentElement也写了，这个方法至少支持IE8
  //   var htmlHeight = $(document).height();
  //   //clientHeight是网页在浏览器中的可视高度，
  //   var clientHeight = $(window).height();
  //   //scrollTop滚动条到顶部的垂直高度
  //   var scrollTop = $(document).scrollTop();
  //   //通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
  //   var he = scrollTop + clientHeight;
  //   if (he >= htmlHeight * 0.7) {
  //     addListMore();
  //   }
  //   //console.log("滚动条位置：" + scrollTop);
  //   //console.log("可视高度：" + clientHeight);
  //   //console.log("网页总高度" + htmlHeight);
  // });
  // function addListMore() {
  //   console.log("加载更多");
  //   startnum = startnum + 20;
  //   console.log(startnum);
  //   getData();
  // }

});