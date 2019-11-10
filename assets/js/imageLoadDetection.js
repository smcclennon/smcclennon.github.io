const images = document.querySelectorAll('img');
for (let i = 0, l = images.length; i < l; i++) {
  const image = images[i];
  image.onload = () => {
    console.log('Image loaded: ' + image.src);
    NProgress.inc();
  };
}
