// ** template engine
export default function html([first, ...strings], ...values) {
  return values
    .reduce((acc, cur) => acc.concat(cur, strings.shift()), [first])
    .filter((cur) => (cur && cur !== true) || cur === 0) //chỉ hiển trị truefy, nhưng ko hiển thị true và vẫn có thể hiện thị số 0 đc
    .join("");
}

// ** store
export function createStore(reducer) {
  // call back return state ban đầu cho store (init)
  let state = reducer();

  // chứa các gốc element để render ra view
  const roots = new Map();

  // lặp qua roots để render ra view
  function render() {
    for (const [root, component] of roots) {
      // component là function => chuỗi html
      const output = component();
      root.innerHTML = output;
    }
  }

  return {
    // hàm nhận view/dữ liệu vào roots để render ra
    attach(component, root) {
      roots.set(root, component);
      render();
    },
    // kết nối store và view (merge component() + prop + args + state truyền vào)
    // nhận vào đối số state => component, có nhận các đối số props, ...args  ===> merge lại thành component({...})
    // để tạo ra đoạn mã html trong view
    connect(selector = (state) => state) {
      return (component) =>
        (props, ...args) =>
          component(Object.assign({}, props, selector(state), ...args));
    },
    // kết nối view và action
    dispatch(action, ...args) {
      state = reducer(state, action, args); // lưu lại dô store
      render();
    },
  };
}
