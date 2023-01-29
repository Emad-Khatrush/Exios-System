import { connect } from 'react-redux'
import React, { Component } from 'react'
import Card from '../../components/Card/Card'
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material'
import api from '../../api';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import CustomButton from '../../components/CustomButton/CustomButton';
import TaskForm from '../TaskForm/TaskForm';
import { RouteMatch } from 'react-router-dom';
import withRouter from '../../utils/WithRouter/WithRouter';

type Props = {
  router: RouteMatch
}

type State = {
  employees: any
  files: any
  form: any
  isLoading: boolean
  isUpdating: boolean
  responseMessage: string
  isSuccess: boolean
}

export class EditTask extends Component<Props, State> {
  state = {
    employees: [],
    files: [],
    form: {
      title: '',
      reviewers: [],
      description: '',
      label: '',
      limitedTime: new Date(),
      orderId: '',
      order: {
        orderId: ''
      },
      files: []
    },
    isLoading: false,
    isUpdating: false,
    responseMessage: '',
    isSuccess: false
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const task = (await api.get(`task/${this.props.router.params.id}`)).data;
      const employees = (await api.get(`employees`)).data?.results;
      this.setState({ form: task, employees, files: task.files, isLoading: false })
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
    }
  }

  fileUploaderHandler = async (event: any) => {
    const files = event.target.files;

    const newFiles: any = [];
    
    for (const file of files) {
      newFiles.unshift(file)
    }

    // upload it in the cloudinary
    const data = new FormData()
    if (newFiles) {
      newFiles.forEach((file: any) => {
        data.append('files', file);
      });
    }
    data.append('id', String(this.props.router.params.id));
    try {
      this.setState({ isUpdating: true });
      await api.fetchFormData('task/uploadFiles', 'POST', data);
      const res = await api.get('task/' + String(this.props.router.params.id));
      console.log(res);
      
      this.setState({
        form: res.data,
        files: res.data.files,
        isUpdating: false,
        isSuccess: true,
        responseMessage: 'file has been updated successfully.'
      })
    } catch (error: any) {
      this.setState({
        isUpdating: false,
        isSuccess: false,
        responseMessage: error.data.message
      })
    }
  }

  deleteImage = (file: any) => {
    this.setState({ isUpdating: true });
    const foundImage = this.state.form.files.find(((localFile: any) => file._id === localFile._id));
    
    api.delete('task/uploadFiles', { file: foundImage, id: String(this.props.router.params.id) })
      .then(res => {
        this.setState({
          form: res.data,
          files: res.data.files,
          isSuccess: true,
          isUpdating: false,
          responseMessage: 'File has been deleted successfully'
        })
      })
      .catch((err: any) => {
        this.setState({
          isSuccess: true,
          isUpdating: false,
          responseMessage: err.message
        })
      })
  }

  onChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState((prevState => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    })))
  }

  onSubmit = async (event: any) => {
    event.preventDefault();

    if (!this.state.form) {
      return;
    }
    
    try {
      this.setState({ isUpdating: true });
      const body = {
        ...this.state.form,
        orderId: this.state.form.orderId ? this.state.form.orderId : this.state.form.order.orderId
      }
      await api.update(`task/${this.props.router.params.id}`, body);
      this.setState({ isUpdating: false, responseMessage: 'تم تحديث البيانات بنجاح', isSuccess: true });
    } catch (error: any) {
      this.setState({ isUpdating: false, responseMessage: error.data.message, isSuccess: false });   
    }
  }

  render() {
    const { employees, files, isLoading, responseMessage, isSuccess, form, isUpdating} = this.state;

    const filesRef = React.createRef();

    if (isLoading) {
      return <CircularProgress color="inherit" />
    }    

    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <h4 className='mb-4'>Edit Task</h4>
            <Card>
              <form className="row" onSubmit={this.onSubmit}>
                <TaskForm 
                  onChange={this.onChange}
                  employees={employees}
                  task={form || null}
                />

                <div className='col-md-3 mt-3'>
                  <h6>Upload Files</h6>
                  <ImageUploader
                    id={'invoice'}
                    inputFileRef={filesRef}
                    fileUploaderHandler={this.fileUploaderHandler}
                    previewFiles={files}
                    deleteImage={this.deleteImage}
                  />
                </div>

                <div className="col-md-12 mb-2 text-end">
                  <CustomButton 
                    background='rgb(0, 171, 85)' 
                    size="small"
                  >
                    Update
                  </CustomButton>
                </div>
              </form>
            </Card>

            <Backdrop
              sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
              open={isUpdating}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <Snackbar 
              open={!!this.state.responseMessage} 
              autoHideDuration={6000}
              onClose={() => this.setState({ responseMessage: '' })}
            >
              <Alert 
                severity={isSuccess ? 'success' : 'error'}
                sx={{ width: '100%' }}
                onClose={() => this.setState({ responseMessage: '' })}
              >
                {responseMessage}
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditTask));
