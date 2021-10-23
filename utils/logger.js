/**
 * chạy kèm song song với reducer
 * để test cách chạy của reducer
 * auto log ra preState và newState
 */
export default function logger(reducer) {
  return (prevState, action, args) => {
    console.group(action);
    console.log("prevState: ", prevState);
    console.log("action args: ", args);

    const nextState = reducer(prevState, action, args);

    console.log("nextState: ", nextState);
    console.groupEnd();

    return nextState;
  };
}
