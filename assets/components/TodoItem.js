import html from "../redux/core.js";
import { attach, connect } from "../redux/store.js";

const connector = connect();

function TodoItem({ todo, index, editIndex }) {
  return html`
    <li
      class="
      ${todo.completed && "completed"} 
      ${editIndex === index && "editing"}"
    >
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          ${todo.completed && "checked"}
          onchange="dispatch('CHECK_TOGGLE', ${index})"
        />
        <label ondblclick="dispatch('START_EDIT', ${index})"
          >${todo.title}</label
        >
        <button class="destroy" onclick="dispatch('DELETE', ${index})"></button>
      </div>
      <input
        class="edit"
        value="${todo.title}"
        onkeyup="(event.keyCode === 13 && dispatch('END_EDIT', this.value.trim(), ${index}))
                || event.keyCode === 27 && dispatch('CANCEL_EDIT')"
        onblur="dispatch('END_EDIT', this.value.trim(), ${index})"
      />
    </li>
  `;
}

export default connector(TodoItem);
