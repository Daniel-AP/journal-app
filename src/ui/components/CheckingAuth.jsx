import { CircularProgress, Grid } from "@mui/material"
import React from "react"

export const CheckingAuth = () => {
  return (
    <Grid
        container
        spacing={ 0 }
        alignItems="center"
        justifyContent="center"
        sx={{minHeight: "100%", backgroundColor: "primary.main", padding: 4}}
    > 
        <CircularProgress size="4rem" color="secondary" />
    </Grid>
  )
}
