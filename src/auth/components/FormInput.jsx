import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Controller } from "react-hook-form";

export const FormInput = ({ controllerProps, textFieldProps, passwordInput }) => {

    const [revealPassword, setRevealPassword] = useState(false);

    const textInputProps = {
        type: "text"
    };

    const passwordInputProps = {

        type: revealPassword ? "text" : "password",
        InputProps: {
            endAdornment: (
                <InputAdornment sx={{mr: "0.5rem"}} position="end">
                    <IconButton
                        onClick={ () => setRevealPassword(rp => !rp) }
                        edge="end"
                    >
                        { revealPassword ? <Visibility /> : <VisibilityOff /> }
                    </IconButton>
                </InputAdornment>
            )
        }
    };

    Object.assign(textFieldProps, passwordInput ? passwordInputProps : textInputProps);

    return (
        <Controller
            {...controllerProps}
            render={ ({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    {...textFieldProps}
                    error={ !!error }
                    helperText={ error ? error.message : null }
                    onChange={ onChange }
                    value={ value }
                    inputProps={{autoComplete: "off"}}
                    fullWidth
                />
            ) }
        />
    )
}
