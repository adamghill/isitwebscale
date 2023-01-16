let data = {};
const emptySpaces = ["Black holes aren't", "The void isn't"];

function search(term) {
  var $spinner = document.getElementById("spinner");
  $spinner.style.display = "inline-block";

  setTimeout(() => {
    $spinner.style.display = "none";
  }, 500);

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

  (function () {
    fetch("/data.json")
      .then((response) => response.json())
      .then((_) => {
        data = _;

        if (location.hash) {
          const searchTerm = location.hash.slice(1);
          $search.value = searchTerm;
          const result = search(searchTerm);

          if (result) {
            $result.innerHTML = result;
            $result.style.color = "var(--success-color)";
          }
        }
      });
  })();

  $search.addEventListener("input", function () {
    const searchTerm = $search.value;
    $result.style.color = "#666";

    if (searchTerm.trim()) {
      const result = search(searchTerm);

      if (result) {
        $result.innerHTML = result;
        $result.style.color = "var(--success-color)";

        history.pushState({}, "", `#${searchTerm}`);
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
