// Record time loading began
var start_load = new Date();

// Settings for loading bar
NProgress.configure({
  showSpinner: false,
  parent: '#progressBar'
  //trickleSpeed: 100,
  //easing: 'ease', speed: 1000,
});

// Start the loading bar
NProgress.start();
console.log('==== Loading content... ====');

// Once the page has loaded
window.onload = function() {

  // Make the page content div visible once the page has fully loaded
  // Hiding whilst page is loading prevents messy half-loaded content from being visible
  // This also means the page content would never become visible if javascript was disabled

  // Disabled to enable compatibility with NoScript
  // document.getElementById('all-content').style.display = 'block';
  
  // Stop the loading bar
  NProgress.done();

  // Record time loading ended
  var end_load = new Date();

  // Calculate duration taken to load page
  var duration = end_load - start_load;

  console.log('==== Content loading complete in ' + duration + 'ms ====');
};