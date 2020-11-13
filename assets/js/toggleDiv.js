function toggleDiv(id) {
  var div = document.getElementById(id);
  div.style.display = div.style.display == 'inline' ? 'none' : 'inline';
  console.log("ToggleDiv: Element '" + id + "' set to '" + div.style.display + "'");
}
