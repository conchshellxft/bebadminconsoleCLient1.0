import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
//@ts-ignore
import ReactImageZoom from 'react-image-zoom';

export default function ActivationRequestImageCard({
  open,
  setOpen,
  data,
}: any) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '800px',
    bgcolor: 'background.paper',
    outline: 0,
    border: '1px solid #000',
    boxShadow: 24,
    p: 2,
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 10,
          }}
        >
          <CloseIcon
            onClick={() => setOpen(false)}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <Typography sx={{ mb: 4 }} textAlign={'center'} variant="h5">
          Activation Request Card
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {data?.card_images.map((item: any, index: number) => {
            return (
              <div
                key={index}
                style={{
                  border: '1px dotted black',
                  marginRight: 10,
                  padding: 2,
                  cursor: 'pointer',
                  maxWidth: 300,
                }}
              >
                {/* <Image
                  alt="doc-image"
                  onClick={() => setOpen(true)}
                  unoptimized
                  loader={() => item}
                  src={item}
                  width={248}
                  height={160}
                /> */}
                <ReactImageZoom
                  {...{ width: 290, height: 220, zoomWidth: 400, img: item, zoomPosition: 'top', offset: {vertical: 5 }  }}
                />
              </div>
            );
          })}
        </div>
        <div style={{ margin: '20px 0px', textAlign: 'center' }}>
          <Typography color="primary.100">{data.card_name}</Typography>
          <Typography color="primary.100">{data.card_number}</Typography>
        </div>
      </Box>
    </Modal>
  );
}
