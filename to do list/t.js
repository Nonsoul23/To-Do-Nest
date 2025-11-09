const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const uploadPopup = document.getElementById("uploadPopup");
const photoInput = document.getElementById("photoInput");
const captionInput = document.getElementById("captionInput");
const saveMemoryBtn = document.getElementById("saveMemory");
const gallery = document.getElementById("gallery");
const styles = ["style1", "style2", "style3", "style4"];

let currentTask = null;
let taskId = 0;
const taskMemoryMap = {};

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const id = "task-" + (++taskId);
  const li = document.createElement("li");
  li.dataset.id = id;
  li.innerHTML = `${taskText} 
    <div>
      <button class="complete">✔</button>
      <button class="delete">✖</button>
    </div>`;
  taskList.appendChild(li);
  taskInput.value = "";
  taskMemoryMap[id] = [];

  li.querySelector(".complete").addEventListener("click", () => {
    li.classList.toggle("completed");
    if (li.classList.contains("completed")) {
      currentTask = id;
      uploadPopup.style.display = "flex";
    }
  });

  li.querySelector(".delete").addEventListener("click", () => {
    const linked = taskMemoryMap[id] || [];
    linked.forEach(card => {
      card.style.animation = "fadeOut 0.6s ease";
      setTimeout(() => card.remove(), 600);
    });
    delete taskMemoryMap[id];
    li.remove();
  });
});

saveMemoryBtn.addEventListener("click", () => {
  const files = Array.from(photoInput.files);
  const caption = captionInput.value || "No caption";
  if (files.length === 0 || !currentTask)
    return alert("Please select images and complete a task!");

  const card = document.createElement("div");
  card.className = "memory-card";
  card.dataset.taskId = currentTask;

  const collage = document.createElement("div");
  collage.className = "collage " + styles[Math.floor(Math.random() * styles.length)];

  files.forEach(f => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(f);
    collage.appendChild(img);
  });

  const cap = document.createElement("p");
  cap.className = "memory-caption";
  cap.textContent = caption;

  card.appendChild(collage);
  card.appendChild(cap);
  gallery.appendChild(card);

  taskMemoryMap[currentTask].push(card);

  uploadPopup.style.display = "none";
  photoInput.value = "";
  captionInput.value = "";
});

uploadPopup.addEventListener("click", e => {
  if (e.target === uploadPopup) uploadPopup.style.display = "none";
});
