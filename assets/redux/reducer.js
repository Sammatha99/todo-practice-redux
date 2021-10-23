import storage from "../../utils/storage.js";

const init = {
  todos: storage.get(),
  filter: "all",
  filters: {
    all: () => true,
    active: (todo) => !todo.completed,
    completed: (todo) => todo.completed,
  },
  editIndex: null,
};

const actions = {
  ADD({ todos }, title) {
    if (title) {
      todos.push({ title, completed: false });
      storage.set(todos);
    }
  },
  CHECK_TOGGLE({ todos }, index) {
    const todo = todos[index];
    todo.completed = !todo.completed;
    storage.set(todos);
  },
  CHECK_TOGGLE_ALL({ todos }, checked) {
    todos.forEach((todo) => (todo.completed = checked));
    storage.set(todos);
  },
  DELETE({ todos }, index) {
    todos.splice(index, 1);
    storage.set(todos);
  },
  SWITCH_FILTER(state, type) {
    state.filter = type;
  },
  CLEAR_COMPLETED(state) {
    state.todos = state.todos.filter(state.filters.active);
    storage.set(state.todos);
  },
  START_EDIT(state, index) {
    state.editIndex = index;
  },
  END_EDIT(state, newTitle, index) {
    if (state.editIndex !== null) {
      if (newTitle) {
        state.todos[index].title = newTitle;
        storage.set(state.todos);
      } else {
        this.DELETE(state, index);
      }
    }
    state.editIndex = null;
  },
  CANCEL_EDIT(state) {
    state.editIndex = null;
  },
};

export default function reducer(state = init, action, args) {
  actions[action] && actions[action](state, ...args);
  return state;
}
