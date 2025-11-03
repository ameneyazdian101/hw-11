// FILE: components/toolbar.js
import { El } from "../utils/el.js";

export function Header() {
  return El({
    element: "div",
    className: "bg-[#6200ea] text-white px-6 py-6 flex items-center gap-3",
    children: [
      El({
        element: "img",
        src: "/1.png",
        alt: "icon",
        className: "w-6 h-6",
      }),
      El({
        element: "h1",
        className: "text-xl font-semibold",
        textContent: "My To-Do Tasks",
      }),
      El({
        element: "div",
        className: "flex items-center gap-3 ml-auto",
        children: [
          El({
            element: "div",
            className: "relative",
            children: [
              El({
                element: "img",
                src: "./2.png",
                alt: "search icon",
                className:
                  "w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none",
              }),
              El({
                element: "input",
                id: "search",
                type: "text",
                placeholder: "Search",
                className:
                  "rounded bg-[#7926ed] pl-8 pr-3 py-2 w-64 text-sm text-gray-800",
              }),
            ],
          }),
          El({
            element: "img",
            src: "./3.png",
            alt: "icon",
            className: "w-7 h-7",
          }),
          El({
            element: "img",
            src: "./4.png",
            alt: "icon",
            className: "w-7 h-7",
            id: "openAdd", // دکمه تصویر 4 برای باز شدن مودال
          }),
        ],
      }),
    ],
  });
}
