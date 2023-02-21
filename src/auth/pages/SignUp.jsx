import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { Link } from "react-router-dom"
import { FormInput } from "../components/FormInput"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { startEmailPasswordSignUp } from "../../store/auth/thunks"
import { Alert } from "@mui/material"

export const SignUp = () => {

  const dispatch = useDispatch();
  const { errorMessage } = useSelector(state => state.auth);
  

  const { watch, control, handleSubmit: onSubmit } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleSubmit = () => {

    const { email, password, name } = watch();

    dispatch( startEmailPasswordSignUp(email, password, name) );

  }

  return (
    <AuthLayout title="Sign up">
        <form onSubmit={ onSubmit( handleSubmit ) }>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInput
                controllerProps={{
                  rules: {
                    required: {
                      value: true,
                      message: "The name is required."
                    },
                    pattern: {
                      value: /^[a-z0-9_.]+$/,
                      message: "The name can only have numbers and lowercase letters."
                    },
                    maxLength: {
                      value: 15,
                      message: "The name must have at most 15 characters."
                    }
                  },
                  name: "name",
                  control: control
                }}

                textFieldProps={{
                  label: "Name",
                  placeholder: "Your name"
                }}
              />
            </Grid>

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
                  label: "E-mail",
                  placeholder: "email@gmail.com"
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

              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>Sign up</Button>
              </Grid>
        
            </Grid>

            <Grid
              container
              item
              direction="row"
              justifyContent="end"
              alignItems="center"
            >
              
              <small>You have an account? <Link to="/auth/login">Log in</Link></small>
            </Grid>

          </Grid>
        </form>
    </AuthLayout>
  )
}
