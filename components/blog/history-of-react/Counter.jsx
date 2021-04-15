import React, { useState } from "react";

export default function Counter({ withInput = false, initialValue = 0 }) {
  let [count, setCount] = useState(initialValue);

  return (
    <div>
      Counter was clicked {count} time{count !== 1 ? "s" : null}
      <br />
      <button onClick={() => setCount(count + 1)}>Increment 1</button>
      {withInput ? (
        <>
          <br />
          <input
            type="number"
            value={count}
            onChange={(event) => setCount(event.target.value)}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
