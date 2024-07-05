import { Button, Divider, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
// import { ADMIN_API, API } from '../../constants/Api';
import { useSnackAlert } from '../../hooks/useSnackAlert';
import { useRouter } from 'next/router';
import { EditorComponent } from '../RichTextEditor';

export const AddPromotion = ({
  open,
  setOpen,
  promotionToUpdate,
  refresh,
  setRefresh,
}: any) => {
  const [data, setData] = React.useState({
    name: '',
    image: '',
    description: '',
  });
  const fileRef = React.useRef<any>(null);
  const [selectedImage, setSelectedImage] = React.useState<
    string | ArrayBuffer
  >('');
  const showSnackAlert = useSnackAlert();
  const router = useRouter();

  const [promotionData, setPromotionData] = useState('');
  const [updatedContentData, setUpdatedContentData] = useState('');

  useEffect(() => {
    if (!promotionToUpdate) setSelectedImage('');
    setData({
      name: promotionToUpdate ? promotionToUpdate.name : '',
      image: promotionToUpdate ? promotionToUpdate.image : '',
      description: promotionToUpdate ? promotionToUpdate.description : '',
    });
  }, [promotionToUpdate]);

  useEffect(() => {
    if (data?.description) {
      setPromotionData(data?.description);
    }
  }, [data?.description]);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '1200px',
    height: '620px',
    bgcolor: 'white',
    outline: 0,
    border: '1px solid #000',
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
    overflowY: 'scroll',
  };

  const imageHandler = (e: any) => {
    // setFiles(e.target.files);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedImage(reader.result as string);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const uploadImage = async (id: string) => {
    const data = new FormData();
    data.append('promotion_id', id);
    data.append('image', fileRef.current.files[0]);
    // ADMIN_API.post(`admin/configuration/upload-promotion-image`, data, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    //   .then((res) => setRefresh((prevState: any) => !prevState))
    //   .catch((err) => console.log(err));
  };

  const updatePromotion = () => {
    console.log(promotionData);
    const reqBody = {
      promotion_id: promotionToUpdate._id,
      name: data.name,
      description: updatedContentData,
    };
    // ADMIN_API.post('admin/configuration/update-promotion', reqBody)
    //   .then((res) => {
    //     if (fileRef.current.files[0]) uploadImage(promotionToUpdate._id);
    //     showSnackAlert('success', 'Promotion updated successfully!');
    //     setOpen(false);
    //     setRefresh((prevState: any) => !prevState);
    //     setSelectedImage('');
    //   })
    //   .catch((res) => showSnackAlert('error', 'Failed updating promotion!'));
  };

  const addPromotion = async () => {
    const reqBody = {
      name: data.name,
      description: promotionData,
    };
    // ADMIN_API.post(`admin/configuration/create-promotion`, reqBody)
    //   .then((res) => {
    //     // console.log("line 100", res.data);
    //     if (fileRef.current.files[0]) uploadImage(res.data.promotion_id);
    //     showSnackAlert('success', 'Promotion added successfully!');
    //     setOpen(false);
    //     setRefresh((prevState: any) => !prevState);
    //     setData({ name: '', description: '', image: '' });
    //     setSelectedImage('');
    //   })
    //   .catch((res) => showSnackAlert('error', 'Failed adding promotion!'));
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="add impacct"
      aria-describedby="adding iimmpact to the wallet"
    >
      <Box sx={style}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CloseIcon
            onClick={() => setOpen(false)}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div style={{ padding: '15px 30px' }}>
          <Typography variant="h5">
            {promotionToUpdate ? 'Update Promotion' : 'Add Promotion'}
          </Typography>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginBottom: 20,
              marginTop: 30,
            }}
          >
            <Typography sx={{ width: 83 }}>Name: </Typography>
            &nbsp;&nbsp;&nbsp;
            <TextField
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
              value={data?.name}
              defaultValue={0}
              style={{ width: 280 }}
              size="small"
              id="outlined-basic"
              variant="outlined"
            />
          </div>
          <div
            style={{
              display: 'flex',
              //   alignItems: "center",
              justifyContent: 'flex-start',
            }}
          >
            <Typography sx={{ width: 83 }}>Image: </Typography>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={(e) => imageHandler(e)}
              name="fileUpload"
              id="fileUpload"
              hidden
            />
            &nbsp;&nbsp;&nbsp;
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 260,
                width: 280,
                cursor: 'pointer',
                // background: "#FFFFFF 0% 0% no-repeat padding-box",
                // boxShadow: "0px 0px 5px #0000004D",
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: 10,
                marginBottom: 20,
              }}
              onClick={() => fileRef.current.click()}
            >
              {data?.image || selectedImage ? (
                <img
                  src={selectedImage ? (selectedImage as string) : data?.image}
                  style={{ height: '100%', width: '100%' }}
                />
              ) : (
                <Image src="/Svg/Solid.svg" width={25} height={25} />
              )}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              marginBottom: 20,
            }}
          >
            <Typography>Description: </Typography>
            &nbsp;&nbsp;&nbsp;
            <EditorComponent
              {...{
                data: promotionData,
                setData: setPromotionData,
                setUpdatedData: setUpdatedContentData,
                maxWidth: 600,
                showPreview: true,
              }}
            />
            {/* <TextField
              onChange={(e) => {
                setData({ ...data, description: e.target.value });
              }}
              value={data?.description}
              defaultValue={0}
              style={{ width: 280 }}
              size="small"
              id="outlined-basic"
              variant="outlined"
            /> */}
          </div>
        </div>
        <Divider />

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 20,
            paddingRight: 20,
          }}
        >
          <Button
            onClick={() =>
              promotionToUpdate ? updatePromotion() : addPromotion()
            }
          >
            {promotionToUpdate ? 'Update' : 'Add'}
          </Button>
          <Button
            onClick={() => {
              setData({ name: '', description: '', image: '' });
              setPromotionData('');
              setUpdatedContentData('');
            }}
            style={{
              backgroundColor: '#EFEFEF',
              color: 'black',
              marginLeft: 10,
            }}
          >
            Reset
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
