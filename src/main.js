import { El } from "./utils/el.js";
import { Header } from "./components/toolbar.js";
import { Modal } from "./components/modal.js";
import { renderTable, initSampleIfEmpty } from "./components/table.js";

const root = document.getElementById("app");

// اضافه کردن Toolbar
root.append(Header());

// اضافه کردن جدول
const tableContainer = El({
  element: "div",
  className: "container mx-auto mt-6 px-6",
});
root.append(tableContainer);
renderTable(tableContainer);

// اضافه کردن Modal
root.append(Modal());

// نمونه اولیه لوکال استوریج
initSampleIfEmpty();

// event برای باز کردن مودال روی دکمه + یا تصویر ۴
document.getElementById("openAdd")?.addEventListener("click", () => {
  document.getElementById("todoForm").reset();
  document.getElementById("modal").classList.remove("hidden");
});
