import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../../context/AuthProvider";
import jwtDecode from "jwt-decode";

const Header = () => {
  const { token, logout } = useAuth();

  let username = "";
  try {
    if (token) {
      const decoded = jwtDecode(token);
      username = decoded?.sub || decoded?.username || ""; // backend'e göre sub veya username
    }
  } catch (e) {
    logout();
  }

  return (
    <div className="header-body">
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Welcome, {username}</Typography>
        <Box>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
    </div>

  );
};

export default Header;