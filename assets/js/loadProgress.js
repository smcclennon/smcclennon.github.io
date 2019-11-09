NProgress.configure({
  showSpinner: false
  //trickleSpeed: 100,
  //easing: 'ease', speed: 1000,
});

const images = document.querySelectorAll('img');
for (let i = 0, l = images.length; i < l; i++) {
  const image = images[i];
  image.onload = () => {
    console.log('Image loaded: ' + image.src);
    NProgress.inc();
  };
}

NProgress.start();
console.log('Page Load: Started...');
window.onload = function() {
  document.getElementById('loadOverlay').style.display = 'none';
  NProgress.done();
  console.log('Page Load: Complete');
};
