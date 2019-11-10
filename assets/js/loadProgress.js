NProgress.configure({
  showSpinner: false,
  parent: '#progressBar'
  //trickleSpeed: 100,
  //easing: 'ease', speed: 1000,
});

NProgress.start();
console.log('Page Load: Started...');
window.onload = function() {
  document.getElementById('loadOverlay').style.display = 'none';
  NProgress.done();
  console.log('Page Load: Complete');
};
