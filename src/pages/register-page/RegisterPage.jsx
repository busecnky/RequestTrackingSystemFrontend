import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { register } from "../../service/authService"

const RegisterPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Required"),
      username: Yup.string().required("Required"),
      password: Yup.string().min(6, "At least 6 character.")
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .required('Password is required')
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await register(values);
        navigate("/login");
      } catch (error) {
        setErrors({ general: "Registration failed." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <Typography variant="h5" mb={2}>REGISTER</Typography>
      <form onSubmit={formik.handleSubmit}>
          <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
                    sx={{
            '& input:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 100px inset !important',
              WebkitTextFillColor: 'black !important',
            },
          }}
        />
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
              WebkitBoxShadow: '0 0 0 100px inset !important',
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
          REGISTER
        </Button>
      </form>
        <p>
          If you already have an account{" "}
          <Link to="/login">Sign in</Link>
        </p>
    </Box>

  );
};

export default RegisterPage;
