import React, { Component } from 'react'
import { Alert, Backdrop, Breadcrumbs, CircularProgress, Link, Snackbar, Typography } from '@mui/material'
import Card from '../../components/Card/Card';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import InvoiceForm from '../../components/InvoiceForm/InvoiceForm';
import { arrayRemoveByValue } from '../../utils/methods';
import { connect } from 'react-redux';
import { createInvoice, resetInvoice } from '../../actions/invoices';
import CustomButton from '../../components/CustomButton/CustomButton';
import { IInvoice } from '../../reducers/invoices';
import { NavigateFunction } from 'react-router-dom';
import withRouter from '../../utils/WithRouter/WithRouter';

type Props = {
  createInvoice: any,
  invoice: IInvoice
  resetInvoice: any
  router: {
    navigate: NavigateFunction
  }
}

type State = {
  invoiceFilesInput: any
  receiptsFilesInput: any
  previewInvoiceFiles: any
  previewReceiptsFiles: any
  formData: any
  paymentList: any
  showResponseMessage: boolean
}

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    Home
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="/invoices">
    Invoices
  </Link>,
  <Typography key="3" color='#28323C'>
    Add Invoice
  </Typography>,
];

class AddInvoice extends Component<Props, State> {
  state: any = {
    invoiceFilesInput: [],
    receiptsFilesInput: [],
    previewInvoiceFiles: [],
    previewReceiptsFiles: [],
    formData: [],
    paymentList: [{
      index: Math.floor(Math.random() * 1000),
      paymentLink: '',
      paid: false,
      arrived: false,
      note: '',
      deliveredPackages: {
        trackingNumber: '',
        weight: null,
        measureUnit: '',
        exiosPrice: null,
        originPrice: null
      }
    }],
    showResponseMessage: false
  }

  componentDidMount() {
    this.props.resetInvoice()
  }

  componentDidUpdate() {
    if (this.props.invoice.listStatus.isSuccess) {
      setTimeout(() => {
        this.props.router.navigate('/invoices');
      }, 1500)
    }
  }

  fileUploaderHandler = async (event: any) => {
    const files = event.target.files;
    
    const newFiles: any =[];
    
    for (const file of files) {
      file.category = event.target.id;
      newFiles.unshift(file)
    }

    const oldFiles = event.target.id === 'invoice' ? this.state.invoiceFilesInput : this.state.receiptsFilesInput;
    const filePath = event.target.id === 'invoice' ? 'invoiceFilesInput' : 'receiptsFilesInput';
    
    this.previewFile([...oldFiles, ...newFiles], event.target.id);
    this.setState<any>({ [filePath]:  [...oldFiles, ...newFiles]});
  }

  handleFileChosen = async (file: any) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
    });
  }

  previewFile = async (files: any, category: string) => {

    const results = await Promise.all(files.map(async (file: any) => {
      const fileContents = await this.handleFileChosen(file);
      return fileContents;
    }));

    this.setState<any>({ [category === 'invoice' ? 'previewInvoiceFiles' : 'previewReceiptsFiles']: results });
  };

  deleteImage = (file: never) => {    
    const invoiceFileIndex = this.state.previewInvoiceFiles.indexOf(file);
    const receiptFileIndex = this.state.previewReceiptsFiles.indexOf(file);
    const foundFile: any =  invoiceFileIndex !== -1 ? { index: invoiceFileIndex, previewFiles: 'previewInvoiceFiles', filesInput: 'invoiceFilesInput' } : { index: receiptFileIndex, previewFiles: 'previewReceiptsFiles', filesInput: 'receiptsFilesInput' };
    const filesInput = arrayRemoveByValue(this.state[foundFile.filesInput], this.state[foundFile.filesInput][foundFile.index]);    
    const previewFiles = arrayRemoveByValue(this.state[foundFile.previewFiles], file);    
    this.setState<any>({ [foundFile.previewFiles]: previewFiles, [foundFile.filesInput]: filesInput });
  }

  handleChange = (event: any, checked?: any, child?: any) => {
    const name = event.target.name;
    let paymentList: any = [...this.state.paymentList];
    if (['paid', 'arrived', 'paymentLink', 'note'].includes(name)) {            
      const inputValue = paymentList[event.target.id][name];
      paymentList[event.target.id][name] = name ===  'paymentLink' || name ===  'note' ? event.target.value : !inputValue;
      
      this.setState({ paymentList });
    } else if (name === 'trackingNumber' || name === 'packageWeight' || name === 'measureUnit' || name === 'originPrice' || name === 'exiosPrice') {
      console.log(event.target.value);
      
      const fieldName = name === 'packageWeight' ? 'weight' : name;
      const id = child ? Number(child.props.id) : event.target.id;
      paymentList[id]['deliveredPackages'][fieldName] = event.target.value;
      
      this.setState({ paymentList });
    } else {
      const value = event.target.inputMode === 'numeric' ? Number(event.target.value) : event.target.value;
      
      this.setState((oldValues) => ({
        formData: {
          ...oldValues.formData,
          [name]: value === 'on' ? checked : value
        }
      }))
    }
  };

  deteteRow = () => {
    const { paymentList } = this.state;
    // delete last row of the list
    // in v2, I will delete rows depending on his index
    if (paymentList.length > 1) {
      paymentList.pop();   
      this.setState({
        paymentList,
        formData:  {
          paymentList
        }
      });
    }
  }

  addNewPaymentField = () => {
    this.setState((prevState) => ({
      paymentList: [...prevState.paymentList, {
        index: Math.floor(Math.random() * 1000),
        paymentLink: '',
        paid: false,
        arrived: false,
        note: '',
        deliveredPackages: {
          trackingNumber: '',
          weight: 0,
          measureUnit: '',
          exiosPrice: 0,
          originPrice: 0
        }
      }],
    }));
  }

  submitForm = (event: any) => {
    event.preventDefault();
    const formData  = new FormData();
    let invoiceImagesCount = 0;
    
    for (const data in this.state.formData) {
      formData.append(data, this.state.formData[data]);
    }
    
    if (this.state.invoiceFilesInput) {
      this.state.invoiceFilesInput.forEach((file: any) => {
        formData.append('files', file);
        invoiceImagesCount++;
      });
    }

    if (this.state.receiptsFilesInput) {
      this.state.receiptsFilesInput.forEach((file: any) => {
        formData.append('files', file);
      });
    }

    formData.append('paymentList', JSON.stringify(this.state.paymentList));
    formData.append('invoicesCount', String(invoiceImagesCount));

    this.props.createInvoice(formData);
    this.setState({ showResponseMessage: true })
  };

  render() {
    const { invoice } = this.props;

    const invoiceFileRef = React.createRef();
    const receiptsFileRef = React.createRef();    
    
    return (
      <div className="m-4">
        <div style={{ maxWidth: '1400px', margin: 'auto'}}>
          <div className="col-12 mb-3">
            <h4 className='mb-2'> Create Invoice</h4>
              <Breadcrumbs separator="???" aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
          </div>
          <form
            className="row"
            onSubmit={(e) => this.submitForm(e)}
          >
            <div className="col-md-4">
              <Card>
                <h5> Admin Images </h5>
                <ImageUploader
                  id={'invoice'}
                  inputFileRef={invoiceFileRef}
                  fileUploaderHandler={this.fileUploaderHandler}
                  previewFiles={this.state.previewInvoiceFiles}
                  deleteImage={this.deleteImage}
                />
              </Card>

              <Card>
                <h5> Client Images </h5>
                <ImageUploader
                  id={'receipts'}
                  inputFileRef={receiptsFileRef}
                  fileUploaderHandler={this.fileUploaderHandler}
                  previewFiles={this.state.previewReceiptsFiles}
                  deleteImage={this.deleteImage}
                />
              </Card>

            </div>
            <div className="col-md-8">
              <Card>
                <InvoiceForm 
                  handleChange={this.handleChange}
                  paymentList={this.state.paymentList}
                  addNewPaymentField={this.addNewPaymentField}
                  deteteRow={this.deteteRow}
                />
                <div className="col-md-12 mb-2 text-end">
                  <CustomButton 
                    background='rgb(0, 171, 85)' 
                    size="small"
                    disabled={invoice.listStatus.isSuccess ? true : false}
                  >
                    Create Invoice
                  </CustomButton>
                </div>
              </Card>
            </div>
          </form>
        </div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
          open={invoice.listStatus.isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar 
          open={invoice.listStatus.isLoading ? false : this.state.showResponseMessage} 
          autoHideDuration={6000}
          onClose={() => this.setState({ showResponseMessage: false })}
        >
          <Alert 
            severity={invoice.listStatus.isSuccess ? 'success' : 'error'}
            sx={{ width: '100%' }}
            onClose={() => this.setState({ showResponseMessage: false })}
          >
            {invoice.listStatus.message}
          </Alert>
        </Snackbar>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
	return {
		invoice: state.invoice,
	};
}

const mapDispatchToProps = {
    createInvoice,
    resetInvoice
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddInvoice));
