import { Button, Divider, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
// import { ADMIN_API, API } from '../../constants/Api';
import { useSnackAlert } from '../../hooks/useSnackAlert';
import { useRouter } from 'next/router';
import { EditorComponent } from '../../components/RichTextEditor';

export const AddExtraGuide = ({
  open,
  setOpen,
  extraGuideToUpdate,
  setRefresh,
}: any) => {
  // console.log(extraGuideToUpdate);
  const [data, setData] = React.useState({
    heading: '',
    image: '',
    description: '',
    content: '',
  });

  const [contentData, setContentData] = useState('');
  const [updatedContentData, setUpdatedContentData] = useState('');

  const fileRef = React.useRef<any>(null);
  const [selectedImage, setSelectedImage] = React.useState<
    string | ArrayBuffer
  >('');
  const showSnackAlert = useSnackAlert();
  const router = useRouter();

  useEffect(() => {
    if (!extraGuideToUpdate) setSelectedImage('');
    setData({
      heading: extraGuideToUpdate ? extraGuideToUpdate.heading : '',
      image: extraGuideToUpdate ? extraGuideToUpdate.image : '',
      description: extraGuideToUpdate ? extraGuideToUpdate.description : '',
      content: extraGuideToUpdate ? extraGuideToUpdate.content : '',
    });
  }, [extraGuideToUpdate]);

  useEffect(() => {
    if (data?.content) {
      setContentData(data?.content);
    }
  }, [data?.content]);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '1200px',
    height: '680px',
    bgcolor: 'white',
    outline: 0,
    border: '1px solid #000',
    boxShadow: 24,
    p: 2,
    overflowY: 'scroll',
    borderRadius: 2,
  };

  const imageHandler = (e: any) => {
    // setFiles(e.target.files);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        console.log(reader.result);
        setSelectedImage(reader.result as string);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const uploadImage = async (id: string) => {
    const data = new FormData();
    data.append('extra_guide_id', id);
    data.append('image', fileRef.current.files[0]);
    // ADMIN_API.post(`admin/configuration/upload-extra-guide-image`, data, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    //   .then((res) => setRefresh((prevState: any) => !prevState))
    //   .catch((err) => console.log(err));
    // console.log(response);
    // filename = response.data.image_name
  };

  const updateExtraGuide = () => {
    const reqBody = {
      extra_guide_id: extraGuideToUpdate._id,
      heading: data.heading,
      description: data.description,
      content: updatedContentData,
    };
    // ADMIN_API.post('admin/configuration/update-extra-guide', reqBody)
    //   .then((res) => {
    //     if (fileRef.current.files[0]) uploadImage(extraGuideToUpdate._id);
    //     showSnackAlert('success', 'Extra guide updated successfully!');
    //     setOpen(false);
    //     setRefresh((prevState: any) => !prevState);
    //     setData({ heading: '', description: '', content: '', image: '' });
    //     setSelectedImage('');
    //   })
    //   .catch((res) => showSnackAlert('error', 'Failed updating extra guide!'));
  };

  const addExtraGuide = async () => {
    const reqBody = {
      heading: data.heading,
      content: updatedContentData,
      description: data.description,
    };
    // ADMIN_API.post(`admin/configuration/create-extra-guide`, reqBody)
    //   .then((res) => {
    //     if (fileRef.current.files[0]) uploadImage(res.data.extra_guide_id);
    //     showSnackAlert('success', 'Extra guide added successfully!');
    //     setOpen(false);
    //     setRefresh((prevState: any) => !prevState);
    //     setData({ heading: '', description: '', content: '', image: '' });
    //     setSelectedImage('');
    //   })
    //   .catch((res) => showSnackAlert('error', 'Failed adding extra guide!'));
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
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CloseIcon
            onClick={() => setOpen(false)}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div style={{ padding: '15px 30px' }}>
          <Typography variant="h5">
            {extraGuideToUpdate ? 'Update Extra Guide' : 'Add Extra Guide'}
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
            <Typography sx={{ width: 83 }}>Heading: </Typography>
            &nbsp;&nbsp;&nbsp;
            <TextField
              onChange={(e) => {
                setData({ ...data, heading: e.target.value });
              }}
              value={data?.heading}
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
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginBottom: 20,
            }}
          >
            <Typography sx={{ width: 83 }}>Description: </Typography>
            &nbsp;&nbsp;&nbsp;
            <TextField
              onChange={(e) => {
                setData({ ...data, description: e.target.value });
              }}
              value={data?.description}
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
              justifyContent: 'flex-start',
              marginBottom: 20,
            }}
          >
            <Typography>Content: </Typography>
            &nbsp;&nbsp;&nbsp;
            <EditorComponent
              {...{
                data: contentData,
                setData: setContentData,
                setUpdatedData: setUpdatedContentData,
                maxWidth: 600,
                showPreview: true,
              }}
            />
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
              extraGuideToUpdate ? updateExtraGuide() : addExtraGuide()
            }
          >
            {extraGuideToUpdate ? 'Update' : 'Add'}
          </Button>
          <Button
            onClick={() => {
              setData({ heading: '', description: '', content: '', image: '' });
              setContentData('');
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
