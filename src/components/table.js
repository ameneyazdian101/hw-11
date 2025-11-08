import {El} from "../utils/el.js"
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
