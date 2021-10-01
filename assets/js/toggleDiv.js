// 'id' is the div's identifier
// Example:
// <div id="example_identifier" style="display: none">
function toggleDiv(id) {

  var div = document.getElementById(id);

  // Toogle div display state between 'inline' and 'none'
  // Always toggles to the opposite state, regardless of which state it is to begin with
  div.style.display = div.style.display == 'inline' ? 'none' : 'inline';

  // Console log the div ID which was toggled, and to which state it was toggled to
  // Example:
  // ToggleDiv: Element 'example_identifier' set to 'inline'
  console.log("ToggleDiv: Element '" + id + "' set to '" + div.style.display + "'");
}