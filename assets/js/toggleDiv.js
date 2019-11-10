function toggleDiv(id) {
  var div = document.getElementById(id);
  div.style.display = div.style.display == 'block' ? 'none' : 'block';
  console.log("ToggleDiv: Element '" + id + "' set to '" + div.style.display + "'");
}
