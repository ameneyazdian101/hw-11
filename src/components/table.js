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
  if (todos.length < 3) {
    const sample = [
      {
        name: "Walk the dog",
        priority: "low",
        status: "todo",
        deadline: new Date().toISOString().slice(0, 10),
      },
      {
        name: "Walk the dog1",
        priority: "medium",
        status: "doing",
        deadline: new Date().toISOString().slice(0, 10),
      },
      {
        name: "Walk the dog2",
        priority: "high",
        status: "done",
        deadline: new Date().toISOString().slice(0, 10),
      },
    ];
    saveTodos(sample);
    return sample;
  }
  return todos;
}

function getBadge(priority) {
  const span = El({
    element: "span",
    className: "badge px-3 py-1 rounded-3xl",
  });
  if (priority === "low") {
    span.style.background = "#ebebeb";
    span.style.color = "#333";
    span.textContent = "Low";
  }
  if (priority === "medium") {
    span.style.background = "#ffc107";
    span.style.color = "#000";
    span.textContent = "Medium";
  }
  if (priority === "high") {
    span.style.background = "#dc3545";
    span.style.color = "#fff";
    span.textContent = "High";
  }
  return span;
}

function getStatusBadge(status) {
  const span = El({
    element: "span",
    className: "badge px-3 py-1 rounded-3xl justify-center",
  });
  if (status === "todo") {
    span.style.background = "#dc3545";
    span.style.color = "#fff";
    span.textContent = "Todo";
  }
  if (status === "doing") {
    span.style.background = "#ffc107";
    span.style.color = "#000";
    span.textContent = "Doing";
  }
  if (status === "done") {
    span.style.background = "#2e7d32";
    span.style.color = "#fff";
    span.textContent = "Done";
  }
  return span;
}

export function renderTable(container) {
  container.innerHTML = "";

  const table = El({
    element: "table",
    className: "min-w-full border",
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
  // اضافه کردن بخش پایین جدول (pagination info)
  const footer = El({
    element: "div",
    className:
      "flex  gap-3 justify-end items-center text-sm text-gray-600 mt-3 px-2",
    children: [
      El({
        element: "div",
        children: [
          El({
            element: "span",
            textContent: "Rows per page: ",
          }),
          El({
            element: "select",
            className:
              "ml-1  border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500",
            children: [
              El({ element: "option", value: "all", textContent: "All" }),
              El({ element: "option", value: "5", textContent: "5" }),
              El({ element: "option", value: "10", textContent: "10" }),
            ],
          }),
        ],
      }),
      El({
        element: "div",
        className: "flex items-center gap-3",
        children: [
          El({ element: "span", textContent: "1–3 of 3" }),
          El({
            element: "button",
            className:
              "ml-4 gap-1 px-2 py-1  rounded hover:bg-gray-100 transition",
            textContent: "<",
          }),
          El({
            element: "button",
            className: "ml-1 px-2 py-1  rounded hover:bg-gray-100 transition",
            textContent: ">",
          }),
        ],
      }),
    ],
  });

  container.append(footer);

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
        className: "border px-6 py-4 text-center",
        children: [getBadge(t.priority)],
      }),
      El({
        element: "td",
        className: "border px-6 py-4 text-center",
        children: [getStatusBadge(t.status)],
      }),
      El({
        element: "td",
        className: "border px-6 py-4 text-center",
        // textContent: t.deadline,
        children: [
          El({
            element: "span",
            className: "px-2 py-1 rounded-3xl border-blue-400  border-2 ",
            textContent: t.deadline,
          }),
        ],
      }),
      El({
        element: "td",
        className: " px-6 py-4 flex gap-2 justify-center",
        children: [
          El({
            element: "button",
            className: "p-1 rounded bg-[#dc3545] text-white",
            title: "Delete",
            innerHTML:
              '<img src ="./public/delete-svgrepo-com (1).png" class="w-8 h-8">',
            eventListener: [
              {
                event: "click",
                callback: () => {
                  deleteTodo(idx);
                },
              },
            ],
          }),
          El({
            element: "button",
            className: "p-1 rounded bg-[#0d6efd] text-white",
            title: "Edit",
            innerHTML:
              '<img src ="./public/edit-svgrepo-com.png" class="w-8 h-8">',
            eventListener: [{ event: "click", callback: () => openModal(idx) }],
          }),
          El({
            element: "button",
            className: "p-1 rounded bg-[#6c757d] white",
            title: "View",
            innerHTML:
              '<img src ="./public/communication-eye-interaction-interface-show-ui-svgrepo-com (2).png" class="w-8 h-8">',
            eventListener: [{ event: "click", callback: () => openModal(idx) }],
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
