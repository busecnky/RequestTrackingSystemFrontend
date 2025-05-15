import "./loginPage.scss"
import { useAuth } from "../../context/AuthProvider";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { login as loginRequest } from "../../service/authService"



const LoginPage = () => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
     validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await loginRequest(values);
        login(response.data.token);
      } catch (error) {
        if (error.response) {
          const message =
            error.response.data?.message || "Username or password is incorrect.";
          setErrors({ general: message });
        } else {
          setErrors({ general: "An unexpected error occurred. Please try again." });
          console.error("Login error:", error);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <Typography variant="h5" mb={2}>LOGIN</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          margin="normal"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          sx={{
            '& input:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 100px white inset !important',
              WebkitTextFillColor: 'black !important',
            },
          }}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          type="password"
          label="Password"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {formik.errors.general && (
          <Typography color="error">{formik.errors.general}</Typography>
        )}
        <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
          LOGIN
        </Button>
      </form>
        <p>
            If you don't have an account{" "}
        <Link
          to="/register"
          style={{ 
            textDecoration: 'none', fontWeight: 'bold', color: '#1976d2',
          }}
          sx={{
            '&:visited': {
              color: '#1976d2',
            },
          }}>Sign Up</Link>
        </p>

    </Box>
  );
};

export default LoginPage;
