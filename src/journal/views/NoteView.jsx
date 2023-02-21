import { CancelOutlined, MoreVertRounded } from "@mui/icons-material";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import { Box, CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";
import { getDateString } from "../helpers/getDateString";
import { ImageGallery } from "../components/ImageGallery";
import { startUpdateNote } from "../../store/journal/thunks";
import ReactImageUploading from "react-images-uploading";

export const NoteView = () => {

    const { isLoading } = useSelector(state => state.journal);
    const {
        title: defaultTitle,
        description: defaultDescription,
        time,
        imgURLs,
        id
    } = useSelector(state => state.journal.active);    
    
    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [imagesLoading, setImagesLoading] = useState(imgURLs.length ? true : false);
    
    const dateString = getDateString(time);

    const titleRef = useRef();
    const descriptionRef = useRef();
    const moreRef = useRef();
    const imagesLoadedCount = useRef(0);

    useEffect(() => {

        const images = imgURLs.map(image => {
            return {
                data_url: image
            }
        })
      
        setImages(images);
        
    }, [id]);

    const setImageLoaded = () => {

        imagesLoadedCount.current++;
        setImagesLoading(!(imgURLs.length <= imagesLoadedCount.current));

    }
    

    const saveNote = async() => {

        const [ title, description ] = [ titleRef.current.value, descriptionRef.current.value ];

        const oldImages = images.filter(image => !image.file);
        const newImages = images.filter(image => image.file);

        await dispatch(startUpdateNote({
            title,
            description,
            oldImages,
            newImages
        }));

    }

    const cancelNote = () => {

        dispatch( setActiveNote(null) );

    }

    const handleChange = (imageList, addUpdateIndex) => {

        setImages(imageList);

    }

    return (
        <Grid
            key={ time }
            className="animate__animated animate__fadeIn animate__fast"
            container
            direction="column"
            alignItems="center"
            spacing={3}
            sx={{
                flexGrow: 1
            }}
        >
            <Grid
                item
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                wrap="nowrap"
            >
                <Typography sx={{flexGrow: 1}} variant="h4" component="p">
                    { dateString }
                </Typography>
                <Box sx={{ display: "flex", gap: { sm: 0, md: 3 } }}>
                    <Button disabled={ isLoading } onClick={ () => saveNote() } sx={{p: 2 }}>
                        <SaveOutlined sx={{mr: { xs: 0, md: 2 }}} />
                        {
                            <Typography display={{ xs: "none", md: "block" }}>Save</Typography>
                        }
                    </Button>
                    <Button disabled={ isLoading } onClick={ () => cancelNote() } sx={{p: 2 }}>
                        <CancelOutlined sx={{mr: { xs: 0, md: 2 }}} />
                        {
                            <Typography display={{ xs: "none", md: "block" }}>Cancel</Typography>
                        }
                    </Button>
                </Box>
            </Grid>
            <ReactImageUploading
                multiple
                value={images}
                dataURLKey="data_url"
                onChange={ handleChange }
                maxNumber={ 25 }
            >
                {
                    ({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                    }) => (
                        <>
                            <Grid
                                item
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <TextField
                                    inputProps={{
                                        maxLength: 1024
                                    }}
                                    key={ id+"-title" }
                                    defaultValue={ defaultTitle }
                                    sx={{mb: 2}}
                                    inputRef={ titleRef }
                                    autoComplete="off"
                                    variant="filled"
                                    label="Title"
                                    placeholder="Title"
                                    fullWidth
                                />

                                <Box
                                    sx={{
                                        width: "100%",
                                        position: "relative"
                                    }}
                                >
                                    <TextField
                                        inputProps={{
                                            maxLength: 8192
                                        }}
                                        key={ id+"-description" }
                                        defaultValue={ defaultDescription }
                                        inputRef={ descriptionRef }
                                        variant="filled"
                                        autoComplete="off"
                                        label="Description"
                                        placeholder="What happened today?"
                                        minRows={8}
                                        multiline
                                        fullWidth
                                    />
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignitems: "center",
                                            justifyContent: "center",
                                            gap: 1,
                                            position: "absolute",
                                            right: 9,
                                            top: 9
                                        }}
                                    >
                                        <IconButton
                                            ref={ moreRef }
                                            sx={{ backgroundColor: "white !important", boxShadow: "2px 6px 6px rgba(0, 0, 0, .07)" }}
                                            onClick={ () => setMenuOpen(true) }
                                        >
                                            <MoreVertRounded />
                                        </IconButton>
                                        <Menu
                                            anchorEl={ moreRef.current }
                                            open={ menuOpen }
                                            onClose={ () => setMenuOpen(false) }
                                            anchorOrigin={{horizontal: "left", vertical: "top"}}
                                            PaperProps={{
                                                elevation: 2
                                            }}
                                        >
                                            <MenuItem
                                                onClick={() => {
                                                    onImageUpload();
                                                    setMenuOpen(false);
                                                }}
                                                sx={{
                                                    fontSize: 15
                                                }}
                                            >
                                                Add images
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    onImageRemoveAll();
                                                    setMenuOpen(false);
                                                }}
                                                sx={{
                                                    fontSize: 15
                                                }}
                                            >
                                                Delete images
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid
                                item
                                container
                                justifyContent="center"
                                alignItems="center"
                            >

                                {
                                    imagesLoading && <CircularProgress />
                                }

                                <ImageGallery setImageLoaded={ setImageLoaded } allImagesLoaded={ !imagesLoading } images={ images } deleteImage={ onImageRemove } />

                            </Grid>
                        </>
                    )
                }
            </ReactImageUploading>
            
        </Grid>
    )
}