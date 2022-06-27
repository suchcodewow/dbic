import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Button } from "@mui/material";
import { userService } from "services";

export default function MenuBar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  });
  function logout() {
    userService.logout();
  }
  return (
    <AppBar
      position="static"
      color="default"
      elevation={3}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          dynabankinsuracart.com
        </Typography>
        <nav>
          <Link
            variant="button"
            color="text.primary"
            href="/"
            sx={{ my: 1, mx: 1.5 }}
          >
            Home
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/insurance"
            sx={{ my: 1, mx: 1.5 }}
          >
            Insurance
          </Link>
        </nav>

        {user ? (
          <>
            <Link
              variant="button"
              color="text.secondary"
              href="/operations"
              sx={{ my: 1, mx: 1.5 }}
            >
              Operations
            </Link>
            <Button onClick={logout} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Logout: {user.username}
            </Button>
          </>
        ) : (
          <Button
            href="/account/login"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
