// https://stackoverflow.com/questions/574944
// https://stackoverflow.com/questions/58770367
function ifTouchscreen(isTouchscreen, notTouchscreen) {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    isTouchscreen();
  } else if (window.matchMedia("(pointer: coarse)").matches) {
    isTouchScreen();
  } else {
    notTouchscreen();
  }
}
