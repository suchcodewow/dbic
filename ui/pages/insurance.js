import { Button, Link } from "@mui/material";
import Layout from "../components/layout";

export default function insurance() {
  return (
    <Layout>
      {" "}
      <h1>We sell insurance!</h1>
      <h1 className="title">
        <Link href="/insurance">Check out our insurance offering!</Link>
        <Button variant="contained">Click the Butt!</Button>
      </h1>
    </Layout>
  );
}
