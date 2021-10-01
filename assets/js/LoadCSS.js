// Stackoverflow: "How to load up CSS files using Javascript?"
// https://stackoverflow.com/questions/574944

// 'cssURL' is the stylesheet's path, i.e. /css/styles.css
function LoadCSS(cssURL) {

  return new Promise(function(resolve, reject) {
    var link = document.createElement('link');

    link.rel = 'stylesheet';

    link.href = cssURL;

    document.head.appendChild(link);

    link.onload = function() {
      resolve();

      console.log('CSS loaded: ' + cssURL);
    };
  });
}