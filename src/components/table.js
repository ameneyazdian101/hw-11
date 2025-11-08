// import {El} from "./utils/el.js"
// FILE: components/table.js
import { El } from "../utils/el.js";

const STORAGE_KEY = "my_todos_v1";

export function loadTodos() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}
export function saveTodos(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

export function initSampleIfEmpty() {
  const todos = loadTodos();
  if (todos.length === 0) {
    const sample = [
      {
        name: "Walk the dog",
        priority: "low",
        status: "todo",
        deadline: new Date().toISOString().slice(0, 10),
      },
    ];
    saveTodos(sample);
    return sample;
  }
  return todos;
}
function getBadge(priority) {
  const span = El({ element: "span", className: "badge px-2 py-1 rounded" });
  if (priority === "low") {
    span.style.background = "#e6e6e6";
    span.style.color = "#333";
    span.textContent = "Low";
  }
  if (priority === "medium") {
    span.style.background = "#FFD54D";
    span.style.color = "#000";
    span.textContent = "Medium";
  }
  if (priority === "high") {
    span.style.background = "#ef4444";
    span.style.color = "#fff";
    span.textContent = "High";
  }
  return span;
}

function getStatusBadge(status) {
  const span = El({ element: "span", className: "badge px-2 py-1 rounded" });
  if (status === "todo") {
    span.style.background = "#ef4444";
    span.style.color = "#fff";
    span.textContent = "Todo";
  }
  if (status === "doing") {
    span.style.background = "#FFD54D";
    span.style.color = "#000";
    span.textContent = "Doing";
  }
  if (status === "done") {
    span.style.background = "#10b981";
    span.style.color = "#fff";
    span.textContent = "Done";
  }
  return span;
}
export function renderTable(container) {
  container.innerHTML = "";

  const table = El({
    element: "table",
    className: "min-w-full border border-gray-200",
    children: [
      El({
        element: "thead",
        children: [
          El({
            element: "tr",
            children: [
              El({
                element: "th",
                className: "border px-6 py-3",
                textContent: "Task Name",
              }),
              El({
                element: "th",
                className: "border px-6 py-3",
                textContent: "Priority",
              }),
              El({
                element: "th",
                className: "border px-6 py-3",
                textContent: "Status",
              }),
              El({
                element: "th",
                className: "border px-6 py-3",
                textContent: "Deadline",
              }),
              El({
                element: "th",
                className: "border px-6 py-3",
                textContent: "Actions",
              }),
            ],
          }),
        ],
      }),
      El({ element: "tbody", id: "tbody" }),
    ],
  });

  container.append(table);

  renderRows();
}

function renderRows() {
  const tbody = document.getElementById("tbody");
  const todos = loadTodos();
  tbody.innerHTML = "";

  todos.forEach((t, idx) => {
    const tr = El({ element: "tr", className: "border-b" });

    tr.append(
      El({ element: "td", className: "border px-6 py-4", textContent: t.name }),
      El({
        element: "td",
        className: "border px-6 py-4",
        children: [getBadge(t.priority)],
      }),
      El({
        element: "td",
        className: "border px-6 py-4",
        children: [getStatusBadge(t.status)],
      }),
      El({
        element: "td",
        className: "border px-6 py-4",
        textContent: t.deadline,
      }),
      El({
        element: "td",
        className: "border px-6 py-4 flex gap-2",
        children: [
          El({
            element: "button",
            className: "p-2 rounded bg-gray-700 text-white",
            title: "View",
            innerHTML:
              '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>',
            eventListener: [{ event: "click", callback: () => openModal(idx) }],
          }),
          El({
            element: "button",
            className: "p-2 rounded bg-blue-600 text-white",
            title: "Edit",
            innerHTML:
              '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5h6M4 7v10a2 2 0 002 2h8l6-6V7"></path></svg>',
            eventListener: [{ event: "click", callback: () => openModal(idx) }],
          }),
          El({
            element: "button",
            className: "p-2 rounded bg-red-500 text-white",
            title: "Delete",
            innerHTML:
              '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>',
            eventListener: [
              {
                event: "click",
                callback: () => {
                  deleteTodo(idx);
                },
              },
            ],
          }),
        ],
      })
    );

    tbody.append(tr);
  });
}
function openModal(idx) {
  const todos = loadTodos();
  const item = todos[idx];
  if (!item) return;
  const modal = document.getElementById("modal");
  document.getElementById("taskName").value = item.name;
  document.getElementById("priority").value = item.priority;
  document.getElementById("status").value = item.status;
  document.getElementById("deadline").value = item.deadline;
  modal.classList.remove("hidden");
}

function deleteTodo(idx) {
  const todos = loadTodos();
  todos.splice(idx, 1);
  saveTodos(todos);
  renderRows();
}
