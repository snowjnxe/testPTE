function progress(timeleft, timetotal, $element) {
  var progressBarWidth = timeleft * $element.width() / timetotal;
  $element.find('div').animate({ width: progressBarWidth }, 500).html(Math.floor(timeleft/60) + ":"+ timeleft%60);
  if(timeleft > 0) {
    setTimeout(function() {
      progress(timeleft - 1, timetotal, $element);
    }, 1000);
  }
};

function progress01(timeleft01, timetotal01, $element) {
  var progressBarWidth = timeleft01 * $element.width() / timetotal01;
  $element.find('div').animate({ width: progressBarWidth }, 500).html(Math.floor(timeleft01/60) + ":"+ timeleft01%60);
  if(timeleft01 > 0) {
    setTimeout(function() {
      progress01(timeleft01 - 1, timetotal01, $element);
    }, 1000);
  }
};

progress(25, 25, $('#progressBar'));
setTimeout("progress01(40, 40, $('#progressBar01'));", 26000)
