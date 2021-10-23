import html from "../redux/core.js";
import { connect } from "../redux/store.js";

import TodoItem from "./TodoItem.js";

const connector = connect();

function TodoList({ todos, filters, filter }) {
  console.log(filters);
  return html`
    <section class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        ${todos.every(filters.completed) && "checked"}
        onclick="dispatch('CHECK_TOGGLE_ALL', this.checked)"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        ${todos
          .map((todo, index) => ({ ...todo, index }))
          .filter(filters[filter])
          .map(function (todo) {
            const index = todo.index;
            return TodoItem({ todo, index });
          })}
      </ul>
    </section>
  `;
}

export default connector(TodoList);
