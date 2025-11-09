// import { El } from "./utils/el.js";
// import { Header } from "./components/toolbar.js";
// import { Modal } from "./components/modal.js";
// import { renderTable, initSampleIfEmpty } from "./components/table.js";

// const root = document.getElementById("app");

// // اضافه کردن Toolbar
// root.append(Header());

// // اضافه کردن جدول
// const tableContainer = El({
//   element: "div",
//   className: "container mx-auto mt-6 px-6",
// });
// root.append(tableContainer);
// renderTable(tableContainer);

// // اضافه کردن Modal
// root.append(Modal());

// // نمونه اولیه لوکال استوریج
// initSampleIfEmpty();

// // event برای باز کردن مودال روی دکمه + یا تصویر ۴
// document.getElementById("openAdd")?.addEventListener("click", () => {
//   document.getElementById("todoForm").reset();
//   document.getElementById("modal").classList.remove("hidden");
// });
// ///////////////////////////////////////////////////////////////
import { El } from "./utils/el.js";
import { Header } from "./components/toolbar.js";
import { Modal } from "./components/modal.js";
import {
  renderTable,
  initSampleIfEmpty,
  loadTodos,
  saveTodos,
} from "./components/table.js";

const root = document.getElementById("app");

// اضافه کردن Toolbar
root.append(Header());

// // رندر جدول اولیه
// renderTable(tableContainer);

initSampleIfEmpty();
// اضافه کردن جدول
const tableContainer = El({
  element: "div",
  className: "container mx-auto mt-6 px-6",
});
root.append(tableContainer);

// نمونه اولیه لوکال استوریج
// initSampleIfEmpty();

// اضافه کردن Modal
root.append(Modal());

// وضعیت برای Edit
let editIndex = null;

// تعریف openModal روی window قبل از رندر جدول
window.openModal = function (idx) {
  const todos = loadTodos();
  const item = todos[idx];
  if (!item) return;

  document.getElementById("taskName").value = item.name;
  document.getElementById("priority").value = item.priority;
  document.getElementById("status").value = item.status;
  document.getElementById("deadline").value = item.deadline;

  editIndex = idx;
  document.getElementById("modal").classList.remove("hidden");
};

// رندر جدول اولیه
renderTable(tableContainer);

// باز کردن مودال برای Add جدید
document.getElementById("openAdd")?.addEventListener("click", () => {
  const todoForm = document.getElementById("todoForm");
  todoForm.reset();
  editIndex = null; // حالت Add
  document.getElementById("modal").classList.remove("hidden");
});

// گرفتن فرم بعد از append کردن Modal
const todoForm = document.getElementById("todoForm");

// هندلر فرم Save / Edit
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("taskName").value.trim();
  const priority = document.getElementById("priority").value;
  const status = document.getElementById("status").value;
  const deadline = document.getElementById("deadline").value;

  if (!name) return;

  const todos = loadTodos();

  if (editIndex !== null) {
    // حالت Edit
    todos[editIndex] = { name, priority, status, deadline };
    editIndex = null;
  } else {
    // حالت Add
    todos.push({ name, priority, status, deadline });
  }

  saveTodos(todos);

  // رندر دوباره جدول
  renderTable(tableContainer);

  // بستن مودال و ریست فرم
  document.getElementById("modal").classList.add("hidden");
  todoForm.reset();
});
