import  Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography"

export const AuthLayout = ({ children, title }) => {

    return (
        <Grid
            container
            spacing={ 0 }
            alignItems="center"
            justifyContent="center"
            sx={{minHeight: "100%", backgroundColor: "primary.main", padding: 4}}
        >
            <Grid
                item
                className="box-shadow animate__animated animate__fadeIn"
                xs={12}
                sm={8}
                md={6}
                lg={4}
                sx={{backgroundColor: "white", padding: 3, borderRadius: 1}}
            >
                <Typography variant="h5" sx={{mb: 2}}>{ title }</Typography>
                { children }
            </Grid>
        </Grid>
    )
}
