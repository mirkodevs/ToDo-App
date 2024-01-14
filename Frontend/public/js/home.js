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
const addButton = document.getElementById("addTask");
const closeDialog = document.getElementById("close-dialog")
const newTask = document.getElementById("newTask")
addButton.addEventListener("click",()=> {
newTask.showModal()
})
closeDialog.addEventListener("click",()=> {
newTask.close()
})


