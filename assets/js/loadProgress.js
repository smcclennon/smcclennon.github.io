NProgress.configure({
showSpinner: false,
trickle: false,
//trickleSpeed: 100,
//easing: 'ease', speed: 1000,
});


const images = document.querySelectorAll('#images img');
for( let i = 0, l = images.length; i < l; i++ ){
  const image = images[i];
  image.onload = () => {
    console.log("image loaded");
  }
}



NProgress.start();
console.log('Progress bar started')
window.onload = function() {
    //NProgress.inc();
    NProgress.done();
    console.log('Progress bar completed')
}
