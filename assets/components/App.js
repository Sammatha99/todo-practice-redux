import html from "../redux/core.js";
import { attach, connect } from "../redux/store.js";
import Footer from "./Footer.js";

import Header from "./Header.js";
import TodoList from "./TodoList.js";

const connector = connect();

function App({ todos }) {
  return html`
    <section class="todoapp">
      ${Header()} 
      ${todos.length > 0 && TodoList()}
      ${todos.length > 0 && Footer()}
    </section>
  `;
}

export default connector(App);
