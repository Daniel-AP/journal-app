import Google from "@mui/icons-material/Google"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { startEmailPasswordSignIn, startGoogleSignIn } from "../../store/auth/thunks"
import { AuthLayout } from "../layout/AuthLayout"
import { Alert } from "@mui/material"
import { useForm } from "react-hook-form"
import { FormInput } from "../components/FormInput"

export const Login = () => {

  const dispatch = useDispatch();
  const errorMessage =  useSelector(state => state.auth.errorMessage);

  const { getValues, control, handleSubmit: onSubmit } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  
  const handleSubmit = () => {

      const { email, password } = getValues();

      dispatch( startEmailPasswordSignIn(email, password) );

  }

  const handleGoogleSignIn = () => {

      dispatch( startGoogleSignIn() );

  }

  return (
    <AuthLayout title="Login">
        <form onSubmit={ onSubmit( handleSubmit ) }>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <FormInput
                controllerProps={{
                  rules: {
                    required: {
                      value: true,
                      message: "The e-mail is required."
                    },
                    maxLength: {
                      value: 64,
                      message: "The e-mail must have at most 64 characters."
                    },
                    pattern: {
                      value: /^\w+([-+."]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                      message: "E-mail not valid. Please try again."
                    }
                  },
                  name: "email",
                  control: control
                }}

                textFieldProps={{
                  label: "Email",
                  placeholder: "email@gmail.com",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormInput                
                controllerProps={{
                  rules: { 
                    required: {
                      value: true,
                      message: "The password is required."
                    },
                    maxLength: {
                      value: 15,
                      message: "The password must have at most 15 characters."
                    },
                    minLength: {
                      value: 6,
                      message: "The password must have at least 6 characters."
                    },
                  },
                  name: "password",
                  control: control
                }}

                textFieldProps={{
                  label: "Password",
                  placeholder: "Password",
                }}

                passwordInput
              />
            </Grid>

            {
              errorMessage && (
                <Grid
                  item
                  xs={12}
                >
                  <Alert severity="error">{ errorMessage }</Alert>
                </Grid>
              )
            }

            <Grid
              container
              item
              spacing={2}
            >

              <Grid item xs={12} md={6}>
                <Button type="submit" variant="contained" fullWidth>Log in</Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button onClick={ handleGoogleSignIn } variant="contained" fullWidth>
                  <Google sx={{mr: 1}}/>
                  <span>Google</span>
                </Button>
              </Grid>

            </Grid>

            <Grid
              container
              item
              direction="row"
              justifyContent="end"
              alignItems="center"
            >
              <small>You don"t have an account? <Link to="/auth/signup">Sign up</Link></small>
            </Grid>

          </Grid>
        </form>
    </AuthLayout>
  )
}
