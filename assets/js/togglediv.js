function togglediv(id) {
  var div = document.getElementById(id);
  div.style.display = div.style.display == 'block' ? 'none' : 'block';
  console.log("Togglediv: Div '" + id + "' set to '" + div.style.display + "'");
}
