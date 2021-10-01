// Stackoverflow: "How to detect a mobile device"
// https://stackoverflow.com/questions/58153528

// Stackoverflow: "What's the best way to detect a 'touch screen' device using JavaScript?"
// https://stackoverflow.com/questions/4817029

// Stackoverflow: "How do you call a function to run specific code?"
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
