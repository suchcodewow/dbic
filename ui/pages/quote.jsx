import Nav from "components/Nav";
import { useState } from "react";

export default function Quote() {
  const { startOpen, setStartopen } = useState(false);
  return (
    <div>
      <Nav />
      <div>hello</div>
    </div>
  );
}
