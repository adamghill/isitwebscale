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

window.addEventListener("load", () => {
  var $search = document.getElementById("search");
  var $result = document.getElementById("result");

  function getSearchTermFromHash() {
    let searchTerm = location.hash.slice(1);
    searchTerm = searchTerm.replace("%20", " ");

    return searchTerm;
  }

  function updateSearchFromHash() {
    let searchTerm = getSearchTermFromHash();

    $search.value = searchTerm;
    const result = search(searchTerm);

    if (result) {
      $result.innerHTML = result;
      $result.style.color = "var(--success-color)";
    }
  }

  function refreshExamples() {
    var randomExamples = [];
    var dataKeys = Object.keys(data);

    while (randomExamples.length < 3) {
      var key = dataKeys[Math.floor(Math.random() * dataKeys.length)];
      var included = false;

      for (var i = 0; i < randomExamples.length; i++) {
        if (randomExamples[i] == key) {
          included = true;
        }
      }

      if (location.hash) {
        let searchTerm = getSearchTermFromHash();

        if (searchTerm === key) {
          included = true;
        }
      }

      if (!included) {
        randomExamples.push(key);
      }
    }

    if (randomExamples) {
      var examplesHtml = "Some examples: ";

      randomExamples.forEach((key) => {
        examplesHtml += `<a href="#${key}">${key}</a>, `;
      });

      examplesHtml = examplesHtml.slice(0, -2);
      examplesHtml +=
        ". Add your own by <a href='https://github.com/adamghill/isitwebscale'>forking the repo</a>.";

      var $examples = document.getElementById("examples");
      $examples.innerHTML = examplesHtml;
    }
  }

  (function () {
    fetch("/data.json")
      .then((response) => response.json())
      .then((_) => {
        data = _;

        refreshExamples();

        if (location.hash) {
          updateSearchFromHash();
        }
      });
  })();

  $search.addEventListener("input", () => {
    const searchTerm = $search.value;
    $result.style.color = "#666";

    if (searchTerm.trim()) {
      const result = search(searchTerm);

      if (result) {
        $result.innerHTML = result;
        $result.style.color = "var(--success-color)";

        history.pushState({}, "", `#${searchTerm}`);

        refreshExamples();
      } else {
        $result.innerHTML = `<em>${searchTerm}</em> can't be web scale because I've never even heard of it.`;
      }
    } else {
      var emptySpace =
        emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
      $result.innerHTML = `${emptySpace} web scale and neither is an empty string.`;
    }
  });

  addEventListener("hashchange", () => {
    updateSearchFromHash();
    refreshExamples();
  });
});
