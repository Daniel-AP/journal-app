import useMediaQuery from "@mui/material/useMediaQuery";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { CancelOutlined, CloseRounded } from "@mui/icons-material";

export const ImageGallery = ({ allImagesLoaded, setImageLoaded, images, deleteImage }) => {

    const xs = useMediaQuery("(min-width: 450px)")
    const sm = useMediaQuery("(min-width: 600px)")
    const m = useMediaQuery("(min-width: 700px)")
    const md = useMediaQuery("(min-width: 900px)");
    const lg = useMediaQuery("(min-width: 1200px)");

    return (
        <ImageList sx={{width: "100%", display: allImagesLoaded ? "grid" : "none"}} cols={ lg ? 4 : md ? 3 : m ? 2 : sm ? 1 : xs ? 2 : 1 }>
            {
                images.map((image, index) => (

                    <ImageListItem className={`${ md ? "visible-icon-hover" : "" } animate__animated animate__fadeIn animate__fast`} key={image.data_url}>
                        <img style={{borderRadius: 1}} src={ image.data_url } alt="" onLoad={ () => setImageLoaded() } />
                        <IconButton
                            onClick={ () => deleteImage(index) }
                            sx={{
                                position: "absolute",
                                top: 3,
                                right: 3,
                                backgroundColor: "rgba(0, 0, 0, 0.6) !important",
                            }}
                        >
                            <CloseRounded color="secondary" />
                        </IconButton>
                    </ImageListItem>
                    
                ))
            }
        </ImageList>
    )
    
}