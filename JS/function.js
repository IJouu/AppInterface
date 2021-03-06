$(document).ready(function () {
  M.AutoInit();
  var startnum = 0;
  var str = "";
  var ranking = 1;

  function getData() {
    $(`#table-content`).html(`<h4 class="grey-text text-darken-2">載入中...</h4>`);
    if (startnum < 100) {
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
    } else {
      alert("已經沒有排名了！");
      window.location.reload();
    }
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
          <h class="ranking">${ranking}</h>
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
          <h class="ranking">${ranking}</h>
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
  var scrolltimes = 1; // 捲動次數
  $(window).scroll(function () {
    if (scrollTimer) {
      clearTimeout(scrollTimer);
      scrollTimer = undefined;
    }
    scrollTimer = setTimeout(function () {
      if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
        startnum = startnum + 20;
        getData();
        $("html,body").animate({
          scrollTop: 3520 * scrolltimes
        }, 1000);
        scrolltimes += 1;
      }
    }, 1000);
  });
});