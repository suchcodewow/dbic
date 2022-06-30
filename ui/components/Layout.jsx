//export { Layout };

import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box padding={2}>
      <div>{children}</div>
    </Box>
  );
}
