var step = 1;
var livestatus = 'LIVE';
var refresh_delay = 1000;

function load_config() {
  $.get(window.location.href + "config", function(data) {
    // Set the title.
    $(".title-wrapper .left span").text(data.task_list_title);
	// Set the Live Status.
	$(".title-wrapper .right span").text(data.livestatus);
    // Set the title width.
    //$(".title-wrapper .left").width(data.task_list_title_width);

    // Set up the item list.
    var $this = $("ul.task-list").empty();
    items = data.task_list_items;
    for (x in items) {
      $("<li />").text(items[x]).appendTo($this);
    }
  });
}

function update_active_step() {
  $.get(window.location.href + "current", function(data) {
    // If the current step is changed, update list.
    if (data !== step) {
      $("ul.task-list li:nth-child(" + String(step) + ")").removeClass('active');
      step = Number(data);
      $("ul.task-list li:nth-child(" + String(step) + ")").addClass('active');
    }
    else {
      $("ul.task-list li:nth-child(" + String(step) + ")").addClass('active');
    }
  });
}

function update_live_status() {
	$.get(window.location.href + "status", function(data) {
		if (data !== livestatus) {
			livestatus = data;
			$(".title-wrapper .right span").text(data);
		}
	});
}

$(document).ready(function(e) {
  // Load configuration.
  load_config();

  // Set active step immediately, then update in loop.
  update_active_step();
  var interval = setInterval(update_active_step, refresh_delay);
  update_live_status();
  var statusinterval = setInterval(update_live_status, refresh_delay);
});
