import html from "../redux/core.js";
import { attach, connect } from "../redux/store.js";

const connector = connect();

function Footer({ todos, filters, filter }) {
  return html`
    <footer class="footer">
      <span class="todo-count">
        <strong>${todos.filter(filters.active).length}</strong> item left
      </span>
      <ul class="filters">
        ${Object.keys(filters).map(
          (type) =>
            html`
              <li>
                <a
                  style="text-transform: capitalize"
                  class="${type === filter && "selected"}"
                  href="#/"
                  onclick="dispatch('SWITCH_FILTER', '${type}')"
                  >${type}</a
                >
              </li>
            `
        )}
      </ul>
      ${todos.filter(filters.completed).length > 0 &&
      html`
        <button class="clear-completed" onclick="dispatch('CLEAR_COMPLETED')">
          Clear completed
        </button>
      `}
    </footer>
  `;
}

export default connector(Footer);
