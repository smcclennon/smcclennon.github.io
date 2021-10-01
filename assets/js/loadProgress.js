var start_load = new Date();

NProgress.configure({
  showSpinner: false,
  parent: '#progressBar'
  //trickleSpeed: 100,
  //easing: 'ease', speed: 1000,
});

NProgress.start();
console.log('==== Loading content... ====');
window.onload = function() {
  document.getElementById('all-content').style.display = 'block';
  NProgress.done();
  var end_load = new Date();
  var duration = end_load - start_load;
  console.log('==== Content loading complete in ' + duration + 'ms ====');
};
