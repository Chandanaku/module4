let add = document.getElementById("additem");
let rm = document.getElementById("removelasitem");
// Task1
var shoppingLis = [];
add.addEventListener("click", function () {
  let inpt = document.getElementById("input").value;
  if (inpt !== "" && !shoppingLis.includes(inpt)) {
    shoppingLis.push(inpt);
    let li = document.createElement("li");
    li.textContent = inpt;
    document.querySelector("ul").appendChild(li);
    document.getElementById("input").value = "";
  }
});
rm.addEventListener("click", function () {
  shoppingLis.pop();
  let ul = document.querySelector("ul");
  ul.removeChild(ul.lastChild);
});
function displayList() {
  return Object.keys(shoppingLis);
}

// Task 2
function filterItems(a) {
  let b;
  for (let i = 0; i < shoppingLis.length; i++) {
    if (shoppingLis[i] === a) {
      b = a;
    }
  }
  return b;
}
