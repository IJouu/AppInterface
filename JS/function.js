$(document).ready(function () {
  M.AutoInit();
  $(document).change(function () {
    var all = $("#test").serializeArray();
    console.log(all);
  });

  function getData() {
    $(`#table-content`).html(`<h4 class="grey-text text-darken-2">載入中...</h4>`);
    $.ajax({
      url: `https://testsite.staging.seekrtech.com/forest_rankings?n=10&last_pos=0`,
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
    var str = "";
    // var photo = "";
    for (const key in result) {
      const element = result[key];
      for (const inner_key in element) {
        const inner_element = element[inner_key];
        if (inner_element.avatar != null) {
          str += `
            <tr>
              <td><img src="${inner_element.avatar}"><td>
              <td>${inner_element.name}</td>
              <td>${inner_element.health_count}</td>
              <td>${inner_element.dead_count}</td>
              <td>${inner_element.total_minutes}</td>
            </tr>
        `;
        } else {
          str += `
            <tr>
              <td><img src="https://robohash.org/309125.jpg?size=200x200\u0026set=set1"><td>
              <td>${inner_element.name}</td>
              <td>${inner_element.health_count}</td>
              <td>${inner_element.dead_count}</td>
              <td>${inner_element.total_minutes}</td>
            </tr>
        `;
        }
      }
    }
    $(`#table-content`).html(str);
  }
});