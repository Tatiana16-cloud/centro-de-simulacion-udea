import React, { useState, useRef, useEffect } from "react";
import { Button, CardMedia, makeStyles } from "@material-ui/core";
import DeviceService from "../../Services/device.service";
import Loader from "../LoaderV2/loader.component";

const useStyles = makeStyles({
  mediaContainer: {
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    background: `
      linear-gradient(45deg, #f5f5f5 25%, transparent 25%) -50px 0,
      linear-gradient(-45deg, #f5f5f5 25%, transparent 25%) -50px 0,
      linear-gradient(45deg, transparent 75%, #f5f5f5 75%) -50px 0,
      linear-gradient(-45deg, transparent 75%, #f5f5f5 75%) -50px 0
    `,
    backgroundColor: '#eaeaea',
    backgroundSize: '100px 100px',
  },
  button: {
    backgroundColor: '#294f07',
    color: '#fff',
    margin: '10px',
    '&:hover': {
      backgroundColor: '#1e3a05',  // Un poco más oscuro en hover
    }
  },
  media: {
    maxHeight: '100%',
    maxWidth: '100%',
  }
});

const ImageUpload = ({ initialImageUrl, onImageSelect, isEditable}) => {
  const [image, setImage] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const classes = useStyles();
  const deviceService = new DeviceService();

  useEffect(()=>{
    setImage(initialImageUrl)
  },[initialImageUrl])

  const handleImageChange = async(e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];

      // Create a FormData object and append the file
      let formData = new FormData();
      formData.append("image", img);

      setLoading(true);
      const {response, error} = await deviceService.uploadImage(formData);
      setImage(URL.createObjectURL(img));
      setLoading(false);
      if(response?.imageUrl) return onImageSelect(response.imageUrl)
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div>
        <input
            ref={inputRef}
            type="file"
            hidden
            onChange={handleImageChange}
        />
        {isEditable && (
            <Button variant="contained" className={classes.button} onClick={handleClick}>
                Cargar imagen
            </Button>
        )}
        {loading && <Loader message={'Cargando imagen'}/> }
        {image && (
            <div className={classes.mediaContainer}>
            <img className={classes.media} src={image} alt="Imagen seleccionada"/>
            </div>
        )}
    </div>
  );
};

export default ImageUpload;
