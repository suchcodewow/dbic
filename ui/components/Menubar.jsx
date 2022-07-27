import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Button } from "@mui/material";
import { userService } from "services";

export default function MenuBar(props) {
  const [user, setUser] = useState(null);
  const { cartItems } = props;
  cartItems.total = 0;
  cartItems.map((item) => (cartItems.total += item.qty));
  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  });

  function logout() {
    userService.logout();
  }
  g;
  return (
    <AppBar position="static" color="" elevation={1} sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          DBIC
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
          <Link
            variant="button"
            color="text.primary"
            href="/store"
            sx={{ my: 1, mx: 1.5 }}
          >
            Store
          </Link>
          {cartItems.length > 0 && (
            <Link variant="button" color="text.primary" href="/cart">
              cart ({cartItems.total})
            </Link>
          )}
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
