/**
 * lấy và lưu dữ liệu vào local storage
 */
const TODOS_STOREAGE_KEY = "MINE-TODOS";
export default {
  get() {
    return JSON.parse(localStorage.getItem(TODOS_STOREAGE_KEY)) || [];
  },
  set(todos) {
    localStorage.setItem(TODOS_STOREAGE_KEY, JSON.stringify(todos));
  },
};
