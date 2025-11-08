import { El } from "../utils/el.js";
export function modal() {
  return El({
    element: "div",
    id: "modal",
    className: "hidden fixed inset-0 z-50 items-center justify-center",
    children: [
      El({
        element: "div",
        className:
          "backdrop fixed inset-0 bg-gray-500 bg-opacity-40 flex items-center justify-center",
        children: [
          El({
            element: "div",
            className:
              "bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative",
            children: [
              El({
                element: "h2",
                className: "text-xl font-semibold mb-4",
                id: "modalTitle",
                textContent: "Add New Task",
              }),
              El({
                element: "form",
                id: "todoForm",
                className: "space-y-4",
                children: [
                  El({
                    element: "div",
                    children: [
                      El({
                        element: "label",
                        htmlFor: "taskName",
                        className: "block mb-1 text-gray-700",
                        textContent: "Task Name",
                      }),
                      El({
                        element: "input",
                        type: "text",
                        id: "taskName",
                        className:
                          "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500",
                        required: true,
                      }),
                    ],
                  }),
                  El({
                    element: "div",
                    children: [
                      El({
                        element: "label",
                        htmlFor: "priority",
                        className: "block mb-1 text-gray-700",
                        textContent: "Priority",
                      }),
                      El({
                        element: "select",
                        id: "priority",
                        className:
                          "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500",
                        children: [
                          El({
                            element: "option",
                            value: "low",
                            textContent: "Low",
                          }),
                          El({
                            element: "option",
                            value: "medium",
                            textContent: "Medium",
                          }),
                          El({
                            element: "option",
                            value: "high",
                            textContent: "High",
                          }),
                        ],
                      }),
                    ],
                  }),
                  El({
                    element: "div",
                    children: [
                      El({
                        element: "label",
                        htmlFor: "status",
                        className: "block mb-1 text-gray-700",
                        textContent: "Status",
                      }),
                      El({
                        element: "select",
                        id: "status",
                        className:
                          "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500",
                        children: [
                          El({
                            element: "option",
                            value: "todo",
                            textContent: "Todo",
                          }),
                          El({
                            element: "option",
                            value: "doing",
                            textContent: "Doing",
                          }),
                          El({
                            element: "option",
                            value: "done",
                            textContent: "Done",
                          }),
                        ],
                      }),
                    ],
                  }),
                  El({
                    element: "div",
                    children: [
                      El({
                        element: "label",
                        htmlFor: "deadline",
                        className: "block mb-1 text-gray-700",
                        textContent: "Deadline",
                      }),
                      El({
                        element: "input",
                        type: "date",
                        id: "deadline",
                        className:
                          "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500",
                      }),
                    ],
                  }),
                  El({
                    element: "div",
                    className: "flex justify-end gap-2 mt-4",
                    children: [
                      El({
                        element: "button",
                        type: "button",
                        id: "cancelBtn",
                        className:
                          "px-4 py-2 bg-gray-300 rounded hover:bg-gray-400",
                        textContent: "Cancel",
                      }),
                      El({
                        element: "button",
                        type: "submit",
                        className:
                          "px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700",
                        textContent: "Save",
                      }),
                    ],
                  }),
                ],
              }),
              El({
                element: "button",
                className:
                  "absolute top-2 right-2 text-gray-500 hover:text-gray-700",
                eventListener: [
                  {
                    event: "click",
                    callback: () =>
                      document.getElementById("modal").classList.add("hidden"),
                  },
                ],
                textContent: "✕",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
