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
  console.log('==== Content loading complete ====');
};
