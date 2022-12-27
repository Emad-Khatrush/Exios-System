import { useState } from 'react';
import { Avatar, Button, ButtonGroup, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';

import { BiNote, BiPackage } from 'react-icons/bi';
import { BsCheck2Circle } from 'react-icons/bs';
import { Invoice, User } from '../../models';
import './InvoiceForm.scss';
import { getOrderSteps } from '../../utils/methods';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';

type Props = {
  handleChange?: any
  paymentList?: any
  addNewPaymentField?: any
  deteteRow?: any
  invoice?: Invoice | null
  isEmployee?: boolean
  employees?: User[]
}

const InvoiceForm = (props: Props) => {
  const [ note, setNote ] = useState({
    openNoteModal: false,
    note: '',
    id: ''
  });

  const [ deliveredPackages, setDeliveredPackages ] = useState<any>({
    openModal: false,
    trackingNumber: '',
    packageWeight: null,
    measureUnit: '',
    exiosShipmentPrice: '',
    originShipmentPrice: '',
    receivedShipmentLYD: 0,
    receivedShipmentUSD: 0,
    arrivedAt: null,
    id: ''
  });
  
  const [ debt, setDebt ] = useState<{total: number, currency: string}>({
    total: 0,
    currency: ''
  });
  
  const [ confirmRemoveLinkModal, setConfirmRemoveLinkModal ] = useState(false);
  
  const { invoice } = props;
  const steps = getOrderSteps(invoice);    

  return (
    <div className='row invoice-page'>
      <div className="col-md-12 mb-3">
        <h4> Invoice Details </h4>
      </div>

        {/* Contact Info Section */}
        <div className="col-md-12">
          <p className='title'> Contact Info </p>
        </div>

        <div className="col-md-6 mb-4">
          <TextField
            id={'outlined-helperText'}
            name="fullName"
            required={true}
            label={'Full Name'}
            onChange={props.handleChange}
            defaultValue={invoice?.customerInfo?.fullName}
          />
        </div>
        <div className="col-md-6 mb-4">
          <TextField
            name="email"
            id={'outlined-helperText'}
            label={'Email'}
            onChange={props.handleChange}
            defaultValue={invoice?.customerInfo?.email}
          />
        </div>
        <div className="col-md-6 mb-4">
          <TextField
            id={'outlined-helperText'}
            required={true}
            label={'Phone'}
            name="phone"
            onChange={props.handleChange}
            defaultValue={invoice?.customerInfo?.phone}
          />
        </div>

        <div className="col-md-6 mb-4">
          <FormControl style={{ width: '100%' }}>
            <InputLabel id="demo-select-small">Made By</InputLabel>
            <Select
              className='made-by-selector'
              style={{ display: 'flex' }}
              labelId={'Made By'}
              id={'madeBy'}
              defaultValue={invoice?.madeBy?._id}
              label={'Made By'}
              name="madeBy"
              onChange={(event) => {
                return props.handleChange(event);
              }}
            >
              {props.employees && props.employees.map(employee => (
                <MenuItem value={employee?._id}>
                  <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }} alt={`${employee.firstName} ${employee.lastName}`} src={employee.imgUrl} />
                  <em className='ml-2'> {`${employee.firstName} ${employee.lastName}`} </em>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Order Info Section  */}
        <div className="col-md-12">
          <p className='title'> Order Info </p>
        </div>

        <div className="col-md-6 mb-4">
          <TextField
            id={'outlined-helperText'}
            required={true}
            label={'Products Category'}
            name="productName"
            onChange={props.handleChange}
            defaultValue={invoice?.productName}
          />
        </div>

        <div className="col-md-6 mb-4">
          <TextField
            id={'outlined-helperText'}
            required={true}
            label={'Quentity'}
            name="quantity"
            type={'number'}
            inputProps={{ inputMode: 'numeric' }}
            onChange={props.handleChange}
            defaultValue={invoice?.quantity}
            onWheel={(event: any) => event.target.blur()}
          />
        </div>

        <div className="col-md-6 mb-4">
          <TextField
            id={'outlined-helperText'}
            required={true}
            label={'Shipment From Where'}
            name="fromWhere"
            onChange={props.handleChange}
            defaultValue={invoice?.shipment?.fromWhere}
          />
        </div>

        <div className="col-md-6 mb-4">
          <TextField
            id={'outlined-helperText'}
            required={true}
            label={'Shipment To Where'}
            name="toWhere"
            onChange={props.handleChange}
            defaultValue={invoice?.shipment?.toWhere}
          />
        </div>

        <div className="col-md-6 mb-4">
          <TextField
            id={'outlined-helperText'}
            required={true}
            label={'Total Invoice'}
            name="totalInvoice"
            type={'number'}
            inputProps={{ inputMode: 'numeric' }}
            onChange={props.handleChange}
            defaultValue={invoice?.totalInvoice}
            onWheel={(event: any) => event.target.blur()}
          />
        </div>

        {!props.isEmployee && 
          <div className="col-md-6 mb-4">
            <TextField
              label={'Net Income'}
              name="netIncome"
              inputProps={{ inputMode: 'numeric', step: .01 }}
              type={'number'}
              onChange={props.handleChange}
              defaultValue={invoice?.netIncome[0]?.total}
              onWheel={(event: any) => event.target.blur()}
            />
          </div>
        }

        <div className="col-md-6 mb-4">
          <FormControl style={{ width: '100%' }} required>
            <InputLabel id="demo-select-small">Select Office</InputLabel>
            <Select
              labelId={'Select Office'}
              id={'Select Office'}
              defaultValue={invoice?.placedAt}
              label={'Select Office'}
              name="placedAt"
              onChange={(event) => {
                return props.handleChange(event);
              }}
            >
              <MenuItem value={'tripoli'}>
                <em> Tripoli Office </em>
              </MenuItem>
              <MenuItem value={'benghazi'}>
                <em> Benghazi Office </em>
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="d-flex col-md-6 mb-4">
          <TextField
              className='connect-field-right'
              id={'outlined-helperText'}
              name="debt"
              type={'number'}
              inputProps={{ inputMode: 'numeric' }}
              label={'Debt'}
              required={!!debt.currency}
              onChange={(event) => {
                setDebt({
                  ...debt,
                  total: Number(event.target.value)
                })
                props.handleChange(event);
              }}
              defaultValue={invoice?.debt?.total}
              onWheel={(event: any) => event.target.blur()}
            />
            <FormControl 
              required={debt.total > 0 ? true : false} 
              style={{ width: '100%' }}
            >
              <InputLabel id="demo-select-small">Currency</InputLabel>
              <Select
                className='connect-field-left'
                labelId={'currency'}
                id={'currency'}
                defaultValue={invoice?.debt?.currency}
                label={'Currency'}
                name="currency"
                onChange={(event) => {
                  setDebt({
                    ...debt,
                    currency: String(event.target.value)
                  })
                  return props.handleChange(event);
                }}
              >
                <MenuItem value={'USD'}>
                  <em> USD </em>
                </MenuItem>
                <MenuItem value={'LYD'}>
                  <em> LYD </em>
                </MenuItem>
                <MenuItem value={'TRY'}>
                  <em> TRY </em>
                </MenuItem>
              </Select>
            </FormControl>
        </div>

        <div className="col-md-12 mb-4">
          <textarea 
            style={{ height: '100px' }} 
            placeholder='Order Note...' 
            className='form-control' 
            name={'orderNote'} 
            onChange={props.handleChange}
            defaultValue={invoice?.orderNote}
          >
          </textarea>
        </div>

        <div className="col-md-4 mb-4">
          <Checkbox 
            name='isPayment' 
            onChange={props.handleChange} 
            defaultChecked={invoice?.isPayment}
            color="success"
          /> 
          Payment
        </div>

        <div className="col-md-4 mb-4">
          <Checkbox 
            name='isShipment' 
            onChange={props.handleChange} 
            defaultChecked={invoice?.isShipment}
            color="success"
          />
          Shipment
        </div>
        <div className="col-md-4 mb-4">
          <Checkbox
            name='unsureOrder' 
            onChange={props.handleChange} 
            defaultChecked={invoice?.unsureOrder}
            color="success"
          />
          Unsure Order
        </div>

        {/* Received Money Section  */}
        <div className="col-md-12">
          <p className='title'> Received Money </p>
        </div>

        <div className="col-md-6 mb-4">
          <TextField
            label="Received Payment USD"
            name='receivedUSD'
            id={'outlined-helperText'}
            type={'number'}
            InputProps={{
              startAdornment: <InputAdornment position="start">USD</InputAdornment>,
              inputMode: 'numeric'
            }}
            defaultValue={invoice?.receivedUSD}
            onChange={props.handleChange}
            onWheel={(event: any) => event.target.blur()}
          />
        </div>

        <div className="col-md-6 mb-4">
          <TextField
            label="Received Payment LYD"
            id={'outlined-helperText'}
            name='receivedLYD'
            type={'number'}
            InputProps={{
              startAdornment: <InputAdornment position="start">LYD</InputAdornment>,
              inputMode: 'numeric'
            }}
            defaultValue={invoice?.receivedLYD}
            onChange={props.handleChange}
            onWheel={(event: any) => event.target.blur()}
          />
        </div>

        <div className="col-md-6 mb-4">
          <TextField
            label="Received Shipment USD"
            name='receivedShipmentUSD'
            id={'outlined-helperText'}
            type={'number'}
            InputProps={{
              startAdornment: <InputAdornment position="start">USD</InputAdornment>,
              inputMode: 'numeric'
            }}
            defaultValue={invoice?.receivedShipmentUSD}
            onChange={props.handleChange}
            onWheel={(event: any) => event.target.blur()}
          />
        </div>

        <div className="col-md-6 mb-4">
          <TextField
            label="Received Shipment LYD"
            id={'outlined-helperText'}
            name='receivedShipmentLYD'
            type={'number'}
            InputProps={{
              startAdornment: <InputAdornment position="start">LYD</InputAdornment>,
              inputMode: 'numeric'
            }}
            defaultValue={invoice?.receivedShipmentLYD}
            onChange={props.handleChange}
            onWheel={(event: any) => event.target.blur()}
          />
        </div>

        {/* Packages Info Section  */}
        <div className="col-md-12">
          <p className='title'> Packages Info </p>
        </div>

        <div className="col-md-6 mb-4">
          <TextField
            id={'outlined-helperText'}
            label={'Packages Count'}
            name="packageCount"
            type={'number'}
            inputProps={{ inputMode: 'numeric' }}
            onChange={props.handleChange}
            defaultValue={invoice?.shipment?.packageCount}
            onWheel={(event: any) => event.target.blur()}
          />
        </div>

        <div className="col-md-6 mb-4">
          <TextField
            id={'outlined-helperText'}
            label={'Weight'}
            name="weight"
            type={'number'}
            inputProps={{ inputMode: 'numeric' }}
            onChange={props.handleChange}
            defaultValue={invoice?.shipment?.weight}
            onWheel={(event: any) => event.target.blur()}
          />
        </div>

        <div className="col-md-6 mb-4">
          <TextField
            id={'outlined-helperText'}
            label={'Exios Shipment Price'}
            name="exiosShipmentPrice"
            required
            type={'number'}
            inputProps={{ inputMode: 'numeric', step: .01 }}
            onChange={props.handleChange}
            defaultValue={invoice?.shipment?.exiosShipmentPrice}
            onWheel={(event: any) => event.target.blur()}
          />
        </div>

        <div className="col-md-6 mb-4">
          <TextField
            id={'outlined-helperText'}
            label={'Origin Shipment Price'}
            name="originShipmentPrice"
            required
            type={'number'}
            inputProps={{ inputMode: 'decimal', step: .01 }}
            onChange={props.handleChange}
            defaultValue={invoice?.shipment?.originShipmentPrice}
            onWheel={(event: any) => event.target.blur()}
          />
        </div>

        <div className="col-md-12 mb-4">
          <FormControl style={{ width: '100%' }} required>
            <InputLabel id="demo-select-small">Shipment Method</InputLabel>
            <Select
              labelId={'Shipment Method'}
              id={'Shipment Method'}
              defaultValue={invoice?.shipment?.method}
              label={'Shipment Method'}
              name="method"
              onChange={(event) => {
                return props.handleChange(event);
              }}
            >
              <MenuItem value={'air'}>
                <em> By Air </em>
              </MenuItem>
              <MenuItem value={'sea'}>
                <em> By Sea </em>
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Order Status Section  */}
        <div className="col-md-12">
          <p className='title'> Order Status </p>
        </div>

        <div className="col-md-12 mb-4">
          <FormControl style={{ width: '100%' }} required>
            <InputLabel id="demo-select-small">Status</InputLabel>
            <Select
              labelId={'Status'}
              id={'orderStatus'}
              defaultValue={invoice?.orderStatus || 0}
              label={'Status'}
              name="orderStatus"
              onChange={(event) => {
                return props.handleChange(event);
              }}
            >
              {steps.map(((steps: any, i) => (
                <MenuItem key={i} value={i}>
                  <em> {steps.label} </em>
                </MenuItem>
              )))}
            </Select>
          </FormControl>
        </div>

        {/* Payment Links Section  */}
        <div className="col-md-12">
          <p className='title'> Payment Links </p>
        </div>
        

        {props.paymentList?.map((payment: any, i: number) => {   
          return(
            <div key={i} className="col-md-12 mb-4">
              <div className='d-flex'>
                <TextField
                  id={String(i)}
                  className='connect-field-right'
                  label={`Payment Link (${i + 1})`}
                  name="paymentLink"
                  onChange={props.handleChange}
                  defaultValue={payment?.link}
                />
                <ButtonGroup key={i} color='success' size="small" aria-label="small button group">
                  <Button id={String(i)} name="paid" onDoubleClick={props.handleChange} variant={payment.paid || payment?.status?.paid ? 'contained': 'outlined'} key="paid">Paid</Button>
                  <Button id={String(i)} name="arrived" onDoubleClick={props.handleChange} variant={payment.arrived || payment?.status?.arrived ? 'contained': 'outlined'} key="arrived">Arrived</Button>
                  <Button id={String(i)} name="arrivedLibya" onDoubleClick={props.handleChange} variant={payment.arrivedLibya || payment?.status?.arrivedLibya ? 'contained': 'outlined'} key="arrivedLibya">Libya</Button>
                  <Button id={String(i)} name="received" onDoubleClick={props.handleChange} variant={payment.received || payment?.status?.received ? 'contained': 'outlined'} key="received"><BsCheck2Circle /></Button>
                  <Button id={String(i)} name="note" key="note" onClick={() => { setNote({ openNoteModal: true, note: payment.note, id: String(i) }) }} variant={payment.note ? 'contained': 'outlined'} ><BiNote /></Button>
                  <Button id={String(i)} 
                    key="deliveredPackages" 
                    name="deliveredPackages" 
                    onClick={() => { 
                      setDeliveredPackages({
                      measureUnit: payment?.deliveredPackages?.measureUnit, 
                      packageWeight: payment?.deliveredPackages?.weight, 
                      trackingNumber: payment?.deliveredPackages?.trackingNumber, 
                      originPrice: payment?.deliveredPackages?.originPrice,  
                      exiosPrice: payment?.deliveredPackages?.exiosPrice,
                      receivedShipmentUSD: payment?.deliveredPackages?.receivedShipmentUSD,  
                      receivedShipmentLYD: payment?.deliveredPackages?.receivedShipmentLYD,
                      arrivedAt: payment?.deliveredPackages?.arrivedAt + '',
                      openModal: true, 
                      id: String(i)
                    }) }}
                    variant={payment?.deliveredPackages?.trackingNumber ? 'contained': 'outlined'}
                  >
                    <BiPackage />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
        )})}

        <Dialog open={note.openNoteModal} onClose={() => setNote({ ...note, openNoteModal: false })}>
          <DialogTitle>Note</DialogTitle>
          <DialogContent>
            <textarea style={{ width: '400px', height: '200px' }} placeholder='Leave a note here' className='form-control' name={'note'} onChange={props.handleChange} defaultValue={note.note} id={note.id}></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNote({ ...note, openNoteModal: false })} >Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog fullWidth={true} open={deliveredPackages.openModal} onClose={() => setDeliveredPackages({ ...deliveredPackages, openModal: false })}>
          <DialogTitle>Delivered Packages</DialogTitle>
          <DialogContent>
            <div className="row mt-1">
              <div className="col-md-6 mb-4 d-flex">
                <TextField
                  id={deliveredPackages.id}
                  label={'Tracking number'}
                  name="trackingNumber"
                  onChange={props.handleChange}
                  defaultValue={deliveredPackages?.trackingNumber}
                  onWheel={(event: any) => event.target.blur()}
                />
              </div>

              <div className="d-flex col-md-6 mb-4">
                <TextField
                  className='connect-field-right'
                  id={deliveredPackages.id}
                  name="packageWeight"
                  type={'number'}
                  inputProps={{ inputMode: 'numeric' }}
                  label={'Weight'}
                  onChange={props.handleChange}
                  defaultValue={deliveredPackages?.packageWeight?.total || deliveredPackages?.packageWeight}
                  onWheel={(event: any) => event.target.blur()}
                />
                <FormControl style={{ width: '100%' }}>
                  <InputLabel>Unit</InputLabel>
                  <Select
                    className='connect-field-left'
                    defaultValue={deliveredPackages?.packageWeight?.measureUnit || deliveredPackages?.measureUnit}
                    label={'Unit'}
                    name="measureUnit"
                    onChange={(event, child) => {
                      return props.handleChange(event, null, child);
                    }}
                  >
                    <MenuItem id={deliveredPackages.id} value={'KG'}>
                      <em> KG </em>
                    </MenuItem>
                    <MenuItem id={deliveredPackages.id} value={'CBM'}>
                      <em> CBM </em>
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="col-md-6 mb-4 d-flex">
                <TextField
                  id={deliveredPackages.id}
                  label={'Exios Price'}
                  name="exiosPrice"
                  type={'number'}
                  inputProps={{ inputMode: 'numeric' }}
                  onChange={props.handleChange}
                  defaultValue={deliveredPackages?.exiosPrice}
                  onWheel={(event: any) => event.target.blur()}
                />
              </div>

              <div className="col-md-6 mb-4 d-flex">
                <TextField
                  id={deliveredPackages.id}
                  label={'Original Price'}
                  name="originPrice"
                  type={'number'}
                  inputProps={{ inputMode: 'numeric' }}
                  onChange={props.handleChange}
                  defaultValue={deliveredPackages?.originPrice}
                  onWheel={(event: any) => event.target.blur()}
                />
              </div>

              <div className="col-md-6 mb-4 d-flex">
                <TextField
                  id={deliveredPackages.id}
                  label={'Received Shipment USD'}
                  name="receivedShipmentUSDPackage"
                  type={'number'}
                  inputProps={{ inputMode: 'numeric' }}
                  onChange={props.handleChange}
                  defaultValue={deliveredPackages?.receivedShipmentUSD}
                  onWheel={(event: any) => event.target.blur()}
                />
              </div>

              <div className="col-md-6 mb-4 d-flex">
                <TextField
                  id={deliveredPackages.id}
                  label={'Received Shipment LYD'}
                  name="receivedShipmentLYDPackage"
                  type={'number'}
                  inputProps={{ inputMode: 'numeric' }}
                  onChange={props.handleChange}
                  defaultValue={deliveredPackages?.receivedShipmentLYD}
                  onWheel={(event: any) => event.target.blur()}
                />
              </div>

              <div className="col-md-6 mb-4 d-flex">
                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DatePicker
                        label="Arrived Date"
                        inputFormat="dd/MM/yyyy"
                        value={new Date(deliveredPackages?.arrivedAt)}
                        renderInput={(params: any) => <TextField {...params} /> }                    
                        onChange={(value) => {
                          props.handleChange({ target: { value, id: deliveredPackages.id }}, undefined, undefined, 'arrivedAt');
                          setDeliveredPackages({ ...deliveredPackages, arrivedAt: value });
                        }}
                      />
                    </Stack>
                  </LocalizationProvider>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeliveredPackages({ ...deliveredPackages, openModal: false })} >Save</Button>
          </DialogActions>
        </Dialog>

        <div className='col-md-6 mb-4'>
          <Button style={{ marginRight: '10px' }} variant="contained" onClick={props.addNewPaymentField} type='button' size='small'>ADD</Button>
          <Button 
            color='error' 
            variant="contained" 
            type='button' 
            size='small'
            onClick={() => setConfirmRemoveLinkModal(true)} 
          >
            Remove
          </Button>
        </div>

        {/* show confirm remove link dialog */}
        <Dialog
          open={confirmRemoveLinkModal}
          onClose={() => setConfirmRemoveLinkModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className='text-end'>
            {"حذف رابط دفع"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" className='text-end'>
              هل انت متاكد من حذف رابط المنتج هذا؟
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmRemoveLinkModal(false)}>تراجع</Button>
            <Button
              color='error'
              onClick={() => {
                setConfirmRemoveLinkModal(false);
                props.deteteRow();
              }} 
              autoFocus
            >
              نعم، اريد حذفه
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  )
}

export default InvoiceForm;