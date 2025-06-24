// Task1
function formatFullName(firstName, lastName) {
  if (typeof firstName != "string" && typeof lastName != "string") {
    console.log("Invalid input ! Function Takes only String as input ");
  }
  return firstName + " " + lastName;
}

// Task2
function calculateTotalCost(price, quantity, taxRate, discount) {
  if (
    typeof price === "number" &&
    typeof quantity === "number" &&
    typeof taxRate === "number" &&
    typeof discount === "number"
  ) {
    var totalCost = price * quantity * (1 + taxRate);
    if (discount !== 0) {
      totalCost = price * quantity * (1 + taxRate) - discount;
    }
  }

  return totalCost;
}

// Task3

function checkEligibility(age, isEmployed) {
  if (age !== "number" && isEmployed !== "boolean") {
    console.log("input type age is number and isEmployed String");
  }
  let st;
  if (age > 18 && isEmployed === true) {
    st = "Person is Eligible";
  } else if (age > 18 && isEmployed === false) {
    st = "Person is conditionally Eligible";
  } else {
    st = "Younger! Not Eligible ";
  }
  return st;
}

console.log("firstName, lastName" + " " + formatFullName("abc", "xyz"));
console.log(
  "price, quantity, taxRate" + " " + calculateTotalCost(5, 10, 1.25, 10)
);
console.log("age, isEmployed" + " " + checkEligibility(28, true));
