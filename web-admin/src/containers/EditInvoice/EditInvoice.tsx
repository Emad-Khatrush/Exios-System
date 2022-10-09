import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Alert, Autocomplete, Backdrop, Breadcrumbs, CircularProgress, Link, Snackbar, TextField, Typography } from '@mui/material'
import Card from '../../components/Card/Card'
import ImageUploader from '../../components/ImageUploader/ImageUploader'
import InvoiceForm from '../../components/InvoiceForm/InvoiceForm'
import CustomButton from '../../components/CustomButton/CustomButton'
import api from '../../api'
import { Invoice, OrderActivity } from '../../models'
import withRouter from '../../utils/WithRouter/WithRouter'
import { RouteMatch } from 'react-router-dom'
import { getOrderSteps } from '../../utils/methods'

import './EditInvoice.scss';

type Props = {
  router: RouteMatch
  isEmployee: boolean
}

type State = {
  formData: Invoice | any
  changedFields: Invoice | any
  isInvoicePending: boolean
  paymentList: any[]
  activity: OrderActivity,
  isError: boolean
  isUpdating: boolean
  isFinished: boolean
  resMessage: string | null
}

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    Home
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="/invoices">
    Invoices
  </Link>,
  <Typography key="3" color='#28323C'>
    Edit Invoice
  </Typography>,
];

const countries = ['الصين', 'امريكا', 'بريطانيا', 'تركيا', 'الامارات'];
const orderActions = [
  'تم شراء المنتجات، الان في مرحلة انتظار البضائع للوصول الى مخزننا',
  'وصلت البضائع الى المخزن، الان في مرحلة التجهيز والشحن الى ليبيا',
  '...وصل طرد ينتهي رقم التتبع الصيني ب',
  'وصلت البضائع الى مخازن طرابلس، يرجى تواصل مع الشركة للاستلام',
  'وصلت البضاعة الى طرابلس، والان متجهه الى بنغازي',
  'وصلت البضائع الى مخازن بنغازي، يرجى تواصل مع الشركة للاستلام',
  'تم استلام البضائع من طرف السيد ... شكرا لتعاملكم معنا'
];

export class EditInvoice extends Component<Props, State> {

  state: State = {
    formData: null,
    changedFields: [],
    isInvoicePending: true,
    paymentList: [],
    activity: {
      country: '',
      description: ''
    },
    isError: false,
    isUpdating: false,
    isFinished: false,
    resMessage: null
  }

  componentDidMount() {    
    api.get(`order/${this.props.router.params.id}`)
      .then((res) => this.setState({ formData: res.data, paymentList: res.data.paymentList, isInvoicePending: false }))
      .catch((err) => {
        console.log(err);
        console.log("error");
      })
  }

  addNewPaymentField = () => {
    const newLink = {
      index: Math.floor(Math.random() * 1000),
      link: '',
      status: {
        paid: false,
        arrived: false,
        arrivedLibya: false,
      },
      note: '',
      deliveredPackages: {
        trackingNumber: '',
        weight: {
          total: null,
          measureUnit: null
        }
      }
    };
    
    this.setState((prevState: any) => ({
      formData: {
        ...prevState.formData,
        paymentList: [...prevState.formData.paymentList, newLink]
      },
      changedFields: {
        ...this.state.changedFields,
        paymentList: [...prevState.formData.paymentList, newLink]
      },
      paymentList: [...prevState.paymentList, newLink]
    }));
  }

  deteteRow = () => {
    const { paymentList } = this.state;
    // delete last row of the list
    // in v2, I will delete rows depending on his index
    if (paymentList?.length > 1) {
      paymentList.pop();
      this.setState({
        paymentList,
        formData: {
          ...this.state.formData,
          paymentList
        },
        changedFields: {
          ...this.state.changedFields,
          paymentList
        }
      });
    }
  }

  setFormState = (value: any, name: string, id: number, child?: any) => {    
    if (name === 'fullName' || name === 'email' || name === 'phone') {
      this.setState((oldValues) => ({
        changedFields: {
          ...oldValues.changedFields,
          customerInfo: {
            ...oldValues.changedFields?.customerInfo,
            [name]: value
          }
        }
      }))
    } else if (
        name === 'fromWhere' || 
        name === 'toWhere' || 
        name === 'packageCount' || 
        name === 'exiosShipmentPrice' || 
        name === 'method' || 
        name === 'originShipmentPrice' || 
        name === 'weight') 
      {
        this.setState((oldValues) => ({
          changedFields: {
            ...oldValues.changedFields,
            shipment: {
              ...oldValues.changedFields?.shipment,
              [name]: value
            }
          }
        }))
    } else if (name === 'debt' || name === 'currency') {
      this.setState((oldValues) => ({
        changedFields: {
          ...oldValues.changedFields,
          debt: {
            ...oldValues.changedFields?.debt,
            [name === 'debt' ? 'total' : name]: value
          }
        }
      }))
    } else if (name === 'netIncome') {
      const netIncome = [...this.state.formData.netIncome];
      // modify the payment income of the invoice
      // the first element of the income is the net invoice
      netIncome[0] = {
        nameOfIncome: 'payment',
        total: value
      };
      
      this.setState((oldValues) => ({
        changedFields: {
          ...oldValues.changedFields,
          netIncome
        }
      }))
    } else if (name === 'trackingNumber' || name === 'packageWeight' || name === 'measureUnit' || name === 'originPrice' || name === 'exiosPrice') {      
      const fieldName = name === 'packageWeight' ? 'weight' : name;
      const fieldId = child ? Number(child.props.id) : id; 
     
      let paymentList: any = [...this.state.paymentList!];
      if (fieldName === 'weight') {
        paymentList[fieldId]['deliveredPackages']['weight'].total = value;
      } else if (fieldName === 'measureUnit') {        
        paymentList[fieldId]['deliveredPackages']['weight'].measureUnit = value;
      } else {
        paymentList[fieldId]['deliveredPackages'][fieldName] = value;
      }            
      this.setState((oldValues) => ({
        changedFields: {
          ...oldValues.changedFields,
          paymentList
        }
      }))
    } else {      
      this.setState((oldValues) => ({
        changedFields: {
          ...oldValues.changedFields,
          [name]: value
        }
      }))
    }
  }

  handleChange = (event: any, checked?: any, child?: any) => {
    if (['paid', 'arrived', 'arrivedLibya', 'paymentLink', 'note'].includes(event.target.name)) {      
      let paymentList: any = [...this.state.paymentList!];
      let inputValue;
      if (event.target.name === 'paid' || event.target.name === 'arrived' || event.target.name === 'arrivedLibya') {
        inputValue = paymentList[event.target.id].status[event.target.name];
        paymentList[event.target.id].status[event.target.name] = !inputValue;
      } else if (event.target.name === 'paymentLink') {
        inputValue = paymentList[event.target.id]['link'];
        paymentList[event.target.id]['link'] = event.target.value;
      } else {
        inputValue = paymentList[event.target.id][event.target.name];
        paymentList[event.target.id][event.target.name] = event.target.value;
      }
      this.setState({ paymentList, changedFields: { ...this.state.changedFields, paymentList } });
    } else {
      let value = event.target.inputMode === 'numeric' ? Number(event.target.value) : event.target.value;
      // if checked has a value
      if (checked === false || checked === true) {
        value = checked;
      }      
      
      this.setFormState(value, event.target.name, event.target.id, child)
    }
  };

  deleteImage = (file: any) => {
    this.setState({ isUpdating: true });
    const foundImage = this.state.formData.images.find(((img: any) => file._id === img._id));
    
    api.delete('order/deleteFiles', { image: foundImage, id: String(this.props.router.params.id) })
      .then(res => {
        this.setState({
          formData: res.data,
          isFinished: true,
          isUpdating: false,
          resMessage: 'Image has been deleted successfully'
        })
      })
      .catch((err) => {
        this.setState({
          isError: true,
          isUpdating: false,
          resMessage: err.message
        })
      })
  }

  fileUploaderHandler = async (event: any, type: string) => {
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
    data.append('type', type);
    this.setState({ isUpdating: true });
    try {
      await api.fetchFormData('order/uploadFiles', 'POST', data);
      const res = await api.get('order/' + String(this.props.router.params.id));
      this.setState({
        formData: res.data,
        isFinished: true,
        isUpdating: false,
        resMessage: 'Images has been updated successfully.'
      })
    } catch (error: any) {
      this.setState({
        isFinished: true,
        isUpdating: false,
        isError: true,
        resMessage: error.data.message
      })
    }
  }

  submit = (event: MouseEvent) => {
    event.preventDefault();    
    this.setState({ isUpdating: true })
    const order = {
      isPayment: this.state.formData.isPayment,
      orderStatus: this.state.formData.orderStatus,
      ...this.state.changedFields
    };    
    const steps = getOrderSteps(order);
    const isOrderFinished = steps?.length - 1 === order.orderStatus;
    order.isFinished = isOrderFinished;    

    api.update(`order/${this.props.router.params.id}`, order)
      .then((res) => {
        this.setState({
          formData: res.data,
          changedFields: [],
          isUpdating: false,
          isFinished: true,
          resMessage: 'Invoice has been updated successfully.'
        })
      })
      .catch((err) => {
        this.setState({
          isUpdating: false,
          isFinished: true,
          isError: true,
          resMessage: err.data?.message
        })
      })
  }
  
  submitNewActivity = (event: React.MouseEvent) => {
    event.preventDefault();    
    const { description, country } = this.state.activity;
    
    if (!description || !country) {
      return;
    }
    this.setState({ isUpdating: true })    

    api.post(`order/${this.props.router.params.id}/addActivity`, this.state.activity)
      .then(() => {
        this.setState({
          isUpdating: false,
          isFinished: true,
          resMessage: 'New activity has been added successfully',
          activity: {
            country: '',
            description: ''
          }
        })
      })
      .catch((err) => {
        this.setState({
          isUpdating: false,
          isFinished: true,
          isError: true,
          resMessage: err.data.message,
          activity: {
            country: '',
            description: ''
          }
        })
      })
  }

  render() {
    const { formData, isInvoicePending, isUpdating, isError, isFinished, resMessage } = this.state;    

    const invoiceFileRef = React.createRef();
    const receiptsFileRef = React.createRef();

    if (isInvoicePending) {
      return <CircularProgress color="inherit" />
    }

    const supplierDefaultMessage = `Hello, we placed the order, please write this on the package, 
      Exios39 - by ${formData.shipment.method}(${formData.orderId}) 
      it is our shipping mark 
                        
      also before shipping do not forget 
      to send us photos. 
      thanks 
    `
    
    return (
      <div className="m-4 edit-invoice">
        <div style={{ maxWidth: '1400px', margin: 'auto'}}>
          <div className="col-12 mb-3">
            <div className="d-flex justify-content-between">
              <h4 className='mb-2'> Edit Invoice</h4>
              <CustomButton 
                background='rgb(0, 171, 85)' 
                size="small"
                href={`https://www.exioslibya.com/xtracking/${formData.orderId}/ar`}
                target="_blank"
              >
                Preview
              </CustomButton>
            </div>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
          </div>

          <div
            className="row"
          >
            <div className="col-md-4">
              <Card>
                <h5> Admin Images </h5>
                <ImageUploader
                  id={'invoice'}
                  inputFileRef={invoiceFileRef}
                  fileUploaderHandler={(event: MouseEvent) => this.fileUploaderHandler(event, 'invoice')}
                  previewFiles={this.state.formData.images?.filter(((img: any) => img.category === 'invoice'))}
                  deleteImage={this.deleteImage}
                />
              </Card>

              <Card>
                <h5> Client Images </h5>
                <ImageUploader
                  id={'receipts'}
                  inputFileRef={receiptsFileRef}
                  fileUploaderHandler={(event: any) => this.fileUploaderHandler(event, 'receipts')}
                  previewFiles={this.state.formData.images?.filter(((img: any) => img.category === 'receipts'))}
                  deleteImage={this.deleteImage}
                />
              </Card>

              <form
                onSubmit={(event: any) => this.submitNewActivity(event)}
              >
                <Card>
                  <h5 className='mb-3'> Add Activity </h5>
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <Autocomplete
                        disablePortal
                        id="free-solo-demo"
                        freeSolo
                        options={countries}
                        onChange={(event: any) => (
                          this.setState({
                          activity: {
                            ...this.state.activity,
                            country: event.target.innerText
                          }
                        }))}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id={'outlined-helperText'}
                            name="country"
                            required={true}
                            label={'Country'}
                            defaultValue={this.state.activity.country}
                            onChange={(event: any) => (
                              this.setState({
                              activity: {
                                ...this.state.activity,
                                country: event.target.value
                              }
                            }))}
                            style={{ direction: 'rtl' }}
                          />
                        )}
                      />
                    </div>

                    <div className="col-md-12 mb-4">
                      <Autocomplete
                        disablePortal
                        id="free-solo-demo"
                        freeSolo
                        options={orderActions}
                        onChange={(event: any) => this.setState({
                          activity: {
                            ...this.state.activity,
                            description: event.target.innerText
                          }
                        })}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id={'outlined-helperText'}
                            name="description"
                            required={true}
                            label={'Description'}
                            defaultValue={this.state.activity.description}
                            onChange={(event: any) => ( 
                              this.setState({
                              activity: {
                                ...this.state.activity,
                                description: event.target.value
                              }
                            }))}
                            style={{ direction: 'rtl' }}
                          />
                        )}
                      />
                    </div>
                    <div className="col-md-12 mb-4 text-end">
                      <CustomButton 
                        background='rgb(0, 171, 85)' 
                        size="small"
                        disabled={isUpdating ? true : false}
                      >
                        Add Activity
                      </CustomButton>
                    </div>
                  </div>
                </Card>
              </form>

              <div className="col-md-12 mb-4">
                <textarea 
                  style={{ height: '300px' }} 
                  placeholder='Message' 
                  className='form-control' 
                  defaultValue={supplierDefaultMessage}
                >
                </textarea>
              </div>

            </div>

            <div className="col-md-8">
              <form
                onSubmit={(event: any ) => this.submit(event)}
              >
                <Card>
                  <InvoiceForm 
                    handleChange={this.handleChange}
                    paymentList={this.state.paymentList}
                    addNewPaymentField={this.addNewPaymentField}
                    deteteRow={this.deteteRow}
                    invoice={formData || null}
                    isEmployee={this.props.isEmployee}
                  />
                  <div className="col-md-12 mb-2 text-end">
                    <CustomButton 
                      background='rgb(0, 171, 85)' 
                      size="small"
                      disabled={isUpdating ? true : false}
                    >
                      Update Invoice
                    </CustomButton>
                  </div>
                </Card>
              </form>
            </div>
          </div>
        </div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
          open={isUpdating}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar 
          open={isFinished} 
          autoHideDuration={6000}
          onClose={() => this.setState({ isFinished: false, isError: false })}
        >
          <Alert 
            severity={isError ? 'error' : 'success'}
            sx={{ width: '100%' }}
            onClose={() => this.setState({ isFinished: false, isError: false })}
          >
            {resMessage}
          </Alert>
        </Snackbar>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
	return {
    isEmployee: state.session.account?.roles.isEmployee
	};
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditInvoice))