import { Button } from "@mui/material";
import Layout from "../components/Layout";

export default function insurance() {
  return (
    <Layout>
      {" "}
      <h1>We sell insurance!</h1>
      <h1 className="title">
        <Button variant="contained">Click the Butt!</Button>
      </h1>
    </Layout>
  );
}
