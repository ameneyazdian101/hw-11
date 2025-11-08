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