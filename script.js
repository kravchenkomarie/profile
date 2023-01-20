const state = {
  start: 0
};

const input = document.querySelector("input");
const result = document.querySelector(".result");
const plus = document.querySelector(".plus");
const reset = document.querySelector(".reset");

input.oninput = function() {
  if (input.value.length <= 0) {
    plus.setAttribute("disabled", true);
  } else {
    plus.removeAttribute("disabled");
  }
};

input.addEventListener("input", function(e) {
  this.value = this.value.replace(/[^\d.]/g, "");
});

const sum = () => {
  state.start += parseInt(input.value);
  result.textContent = `Текущая сумма: ${state.start}`;
  input.value = "";
  plus.setAttribute("disabled", true);
};

plus.addEventListener("click", sum);

reset.addEventListener("click", () => {
  state.start = 0;
  document.querySelector(".result").textContent = "";
});