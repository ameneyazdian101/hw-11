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