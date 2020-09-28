import {Select, Trans} from "@lingui/macro";
import {DateFormat} from "@lingui/react";
import React, {memo, useState} from "react";

const CounterApp = () => {
  const [count, setCount] = useState(0);
  console.log("rendering: Counter");
  const d = new Date();
  const gender = "female";

  return (
    <>
      <Select
        value={gender}
        male="His book"
        female="Her book"
        other="Their book"
      />
      <br />
      <Trans> today is: <DateFormat
        value={d}
      />
      </Trans>
      <br/>
      <p>Count: {count}</p>
      {/* <Plural */}
      {/*   render="p" */}
      {/*   id="counter" */}
      {/*   value={count} */}
      {/*   _0={<span>No item selected</span>} */}
      {/*   _1={<span>One item</span>} */}
      {/*   _2={<span>Two items</span>} */}
      {/*   other={<span>Multiple item</span>} */}
      {/* /> */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </>
  );
};
const Counter = memo(CounterApp);
export {Counter};
