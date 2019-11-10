// https://stackoverflow.com/questions/574944
// https://stackoverflow.com/questions/58770367
function ifTouchscreen(isTouchscreen, notTouchscreen) {
  function touchCmds() {
    isTouchscreen();
    console.log('Touchscreen device detected');
  }
  function nonTouchCmds() {
    notTouchscreen();
    console.log('Non-touchscreen device detected');
  }

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    touchCmds();
  } else if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
    touchCmds();
  } else if (window.matchMedia('(pointer: coarse)').matches) {
    touchCmds();
  } else {
    nonTouchCmds();
  }
}
