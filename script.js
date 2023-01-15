let data = {};
const emptySpaces = ["Black holes aren't", "The void isn't"];

function loadData() {
  fetch("/data.json")
    .then((response) => response.json())
    .then((_data) => {
      data = _data;
    });
}
loadData();

function search(term) {
  term = term.toLowerCase();

  for (let key in data) {
    if (term === key) {
      return data[key];
    }
  }
}

window.addEventListener("load", function () {
  var $search = document.getElementById("search");
  var $result = document.getElementById("result");

  $search.addEventListener("input", function () {
    const searchTerm = $search.value;

    if (searchTerm.trim()) {
      const result = search(searchTerm);

      if (result) {
        $result.innerHTML = result;
      } else {
        $result.innerHTML = `<em>${searchTerm}</em> can't be web scale because I've never even heard of it.`;
      }
    } else {
      var emptySpace =
        emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
      $result.innerHTML = `${emptySpace} web scale and neither is an empty string.`;
    }
  });
});
