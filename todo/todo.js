const state = {
  task: {
    title: "",
    checked: false
  }
};

const form = document.querySelector("form");
const input = document.querySelector("input");
const addButton = document.querySelector(".add__button");
const tasks = document.querySelector("ul");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const addTaskOnServer = async () => {
    const response = await axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: input.value,
        checked: state.task.checked
      })
      .then((response) => {
        state.task.title = input.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  addTaskOnServer();

  const task = input.value;
  const taskElement = document.createElement("li");
  taskElement.classList.add("tasks");
  taskElement.innerText = task;
  tasks.insertAdjacentElement("afterbegin", taskElement);

  input.value = "";

  taskElement.addEventListener("click", () => {
    if (state.task.checked) {
      state.task.checked = false;
      taskElement.style.textDecoration = "none";
    } else {
      state.task.checked = true;
      taskElement.style.textDecoration = "line-through";
    }
  });
});

input.onkeyup = () => {
  if (input.value.trim() <= 0) {
    addButton.classList.remove("active");
  } else {
    addButton.removeAttribute("disabled");
    addButton.classList.add("active");
  }
};

form.addEventListener("keydown", function(event) {
  if (event.keyCode === 13 && input.value.trim() <= 0) {
    event.preventDefault();
  }
});

const getPreviousTasks = async () => {
  const response = await axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => {
      let arr = response.data.slice(0, 6);
      for (let i = 0; i < 6; i++) {
        const previousTaskElement = document.createElement("li");
        const prevTasks = tasks.appendChild(previousTaskElement);
        const title = arr.map((el) => el.title);
        prevTasks.innerHTML = title[i];

        prevTasks.addEventListener("click", () => {
          if (state.task.checked) {
            state.task.checked = false;
            prevTasks.style.textDecoration = "none";
          } else {
            state.task.checked = true;
            prevTasks.style.textDecoration = "line-through";
          }
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
getPreviousTasks();