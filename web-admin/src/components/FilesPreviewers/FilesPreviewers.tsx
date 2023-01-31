import { Backdrop, Box, Modal } from '@mui/material';
import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import FilePreviewer from '../FilePreviewer/FilePreviewer';

import './FilesPreviewers.scss'

type Props = {
  previewFiles: any[]
  files: any[]
  deleteImage?: any
}

const FilesPreviewers = (props: Props) => {
  const { previewFiles, files } = props;
  
  const [openModal, setOpenModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState<any>(null);

  return (
    <div>
      <div className="row uploaded-photos mt-3">
        {previewFiles.map((file: any, index: number) => {
          const type = file.type || file.fileType;

          return (<div key={index} className="col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
            {!!props.deleteImage && <AiFillCloseCircle onClick={() => props.deleteImage(files[index]) } className='close-icon' />}
            {( !!type && (type !== 'image/jpeg' && type !== 'image/png')) ?
              <FilePreviewer 
                uploadedFile={{
                  path: file.path,
                  type: type
                }}
              />
              :
              <img 
                style={{ cursor: 'pointer' }} 
                src={files[index]?.path || files[index] || file}
                alt='' 
                onClick={(event: any) => {
                  setOpenModal(true);
                  setSelectedImg({
                    src: event.target.src,
                      ...file
                  });
                }}
              />
            }
          </div>
        )})}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={ () => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{ zIndex: 10000 }}
      >
        <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
          <Box className='image-previewer' style={{ height: '80%' }}>
              <img src={selectedImg?.src} width={'100%'} height={'100%'} alt="" />
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default FilesPreviewers;
