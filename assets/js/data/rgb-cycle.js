// RGB Cycle for LCD Image retention Repair
// This script creates a fullscreen overlay that cycles through red, green, and blue colours
// to help reduce LCD image retention effects

document.addEventListener('DOMContentLoaded', function () {
  // Get the buttons that trigger the RGB cycle and Black Pattern
  const rgbButton = document.getElementById('start-rgb-cycle');
  const blackButton = document.getElementById('start-black-pattern');

  // If the buttons don't exist (not on the RGB page), exit
  if (!rgbButton && !blackButton) return;

  // Create the overlay element
  const overlay = document.createElement('div');
  overlay.id = 'rgb-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: none;
    background-color: #ff0000; /* Start with red */
    cursor: none;
    opacity: 1;
  `;

  // Create text instructions
  const instructions = document.createElement('div');
  instructions.className = 'instructions';
  instructions.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 24px;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    pointer-events: none;
    transition: opacity 0.5s ease;
  `;
  instructions.textContent = 'Tap anywhere to exit fullscreen';

  // Append elements to the body
  overlay.appendChild(instructions);
  document.body.appendChild(overlay);

  // Setup colour cycling variables
  let colourIndex = 0;
  let rgbColours = ['#ff0000', '#00ff00', '#0000ff']; // RGB cycle colours
  let blackColour = ['#000000']; // Black Pattern
  let colours = rgbColours; // Default to RGB cycle
  let intervalId;

  function cycleColours() {
    colourIndex = (colourIndex + 1) % colours.length;
    overlay.style.backgroundColor = colours[colourIndex];
  }

  // Function to request fullscreen
  function requestFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      /* Safari */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE11 */
      element.msRequestFullscreen();
    }
  }

  // Function to exit fullscreen
  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }

  // Function to start fullscreen mode with specified colours
  function startFullscreen(coloursToUse) {
    colours = coloursToUse;
    colourIndex = 0;
    
    // Set initial colour
    overlay.style.backgroundColor = colours[0];
    overlay.style.display = 'block';
    instructions.style.opacity = '1';
    
    // Hide instructions after 3 seconds
    setTimeout(() => {
      instructions.style.opacity = '0';
    }, 3000);
    
    // Request fullscreen
    requestFullscreen(document.documentElement);
    
    // Start colour cycling with a 1-second interval if multiple colours
    if (colours.length > 1) {
      intervalId = setInterval(cycleColours, 1000);
    } else {
      // No need for interval for single colour
      intervalId = null;
    }
  }

  // Event listener for the RGB button
  if (rgbButton) {
    rgbButton.addEventListener('click', function (e) {
      e.preventDefault();
      startFullscreen(rgbColours);
    });
  }

  // Event listener for the Black Pattern button
  if (blackButton) {
    blackButton.addEventListener('click', function (e) {
      e.preventDefault();
      startFullscreen(blackColour);
    });
  }

  // Event listener to exit the fullscreen mode
  overlay.addEventListener('click', function () {
    if (intervalId) clearInterval(intervalId);
    overlay.style.display = 'none';
    // Exit fullscreen
    exitFullscreen();
  });

  // Also exit on ESC key press
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.style.display === 'block') {
      if (intervalId) clearInterval(intervalId);
      overlay.style.display = 'none';
    }
  });
});
