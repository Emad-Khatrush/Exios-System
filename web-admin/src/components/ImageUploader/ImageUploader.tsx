import React, { Component } from 'react'
import { Backdrop, Box, Modal } from '@mui/material';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';

import './ImageUploader.scss';

type Props = {
  id?: 'invoice' | 'receipts'
  inputFileRef?: any
  fileUploaderHandler?: any
  deleteImage?: any
  previewFiles?: any
}

type State = {
  openModal: boolean,
  selectedImg: string
}

class ImageUploader extends Component<Props, State> {
  state: State = {
    openModal: false,
    selectedImg: ''
  }

  render() {
    const { inputFileRef, fileUploaderHandler, previewFiles, id } = this.props;
    const { openModal, selectedImg } = this.state;

    const hasPreviewFiles = previewFiles?.length > 0;
    
    return (
      <div>
        <input id={id} multiple className='d-none' accept="image/*" onChange={fileUploaderHandler} ref={inputFileRef} type="file" />
        <div className='circle-border' onClick={() => inputFileRef.current.click()}>
          <div className='upload-section'>
            <BiImageAdd className='icon' />
            <span> Upload Photo </span>
          </div>
        </div>
        <p className='allow-format mb-2'> Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB </p>
        
        {hasPreviewFiles && 
          <div className="row uploaded-photos mt-3">
            {previewFiles.map((file: any, index: number) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
                <AiFillCloseCircle onClick={() => this.props.deleteImage(file) } className='close-icon' />
                <img style={{ cursor: 'pointer' }} onClick={(event: any) => this.setState({ openModal: true, selectedImg: event.target.src }) } src={file?.path || file} alt='' />
              </div>
            ))}
          </div>
        }
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal}
          onClose={ () => this.setState({ openModal: false })}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
            <Box className='image-previewer' style={{ height: '80%' }}>
              <img src={selectedImg} width={'100%'} height={'100%'} alt="" />
            </Box>
          </Box>
      </Modal>
      </div>
    )
  }
}

export default ImageUploader