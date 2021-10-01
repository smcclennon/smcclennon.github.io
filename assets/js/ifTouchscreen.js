// Stackoverflow: "How to detect a mobile device"
// https://stackoverflow.com/questions/58153528

// Stackoverflow: "What's the best way to detect a 'touch screen' device using JavaScript?"
// https://stackoverflow.com/questions/4817029

// Stackoverflow: "How do you call a function to run specific code?"
// https://stackoverflow.com/questions/58770367

// 'isTouchscreen()' contains the js code which will be run if touchscreen is detected
// 'notTouchscreen()' contains the js code which will be run if touchscreen is NOT detected
// The appropriate function is run when 'ifTouchscreen()' is called

// Example usage:
//  LoadCSS('css/base-webpage.css');
//  ifTouchscreen(
//    () => LoadCSS('css/mobile-friendly.css'),
//    () => LoadCSS('css/desktop-rich.css')
//  );

function ifTouchscreen(isTouchscreen, notTouchscreen) {

  // Run this if touchscreen detected
  function touchCmds() {
    isTouchscreen();  // Commands passed to the ifTouchscreen() function
    console.log('Touchscreen device detected');
  }

  // Run this if touchscreen NOT detected
  function nonTouchCmds() {
    notTouchscreen(); // Commands passed to the ifTouchscreen() function
    console.log('Non-touchscreen device detected');
  }

  // Check if user agent matches that of of popular mobile phones
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {  // If user agent matched
    touchCmds();

    // Detect "touch capabilities"
  } else if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
    touchCmds();

    // Detect if a "coarse pointer" (usually a touch screen) is the primary input device
  } else if (window.matchMedia('(pointer: coarse)').matches) {
    touchCmds();

    // If user agent did not match
    // And other detection methods didn't detect a touchscreen
  } else {
    nonTouchCmds();
  }
}
