// https://stackoverflow.com/questions/574944
// https://stackoverflow.com/questions/58770367
function ifTouchscreen(isTouchscreen, notTouchscreen) {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    isTouchscreen();
    console.log("Touchscreen device detected");
  } else if (window.matchMedia("(pointer: coarse)").matches) {
    isTouchScreen();
    console.log("Touchscreen device detected");
  } else {
    notTouchscreen();
    console.log("Non-touchscreen device detected");
  }
}
