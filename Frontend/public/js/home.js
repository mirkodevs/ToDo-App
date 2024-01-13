const date = new Date()
const today = date.toDateString();
document.getElementById("todayDate").innerHTML = today;

document.addEventListener("DOMContentLoaded", () => {

const tasks = document.querySelectorAll(".oneTask");
tasks.forEach(oneTask => {
  oneTask.addEventListener("click", () => {
oneTask.classList.toggle("strike")
console.log("clicked")

  })
})
})
