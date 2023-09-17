import React, { Component } from 'react'
import { Box, Breadcrumbs, Button, CircularProgress, Dialog, DialogActions, DialogContent, IconButton, Link, TextField, Typography } from '@mui/material';
import Card from '../../components/Card/Card'
import TextInput from '../../components/TextInput/TextInput'
import CustomButton from '../../components/CustomButton/CustomButton';

import { AiOutlineSearch, AiOutlinePlus, AiOutlineClear } from 'react-icons/ai';
import StatusDataWidget from '../../components/StatusDataWidget/StatusDataWidget';
import InfoTable from '../../components/InfoTable/InfoTable';
import { defaultColumns, generateDataToListType } from './generateData';
import { connect } from 'react-redux';
import { getAllInvoices } from '../../actions/invoices';
import { IInvoice } from '../../reducers/invoices';

import { FaFileInvoiceDollar } from 'react-icons/fa';
import { AiFillCheckCircle } from 'react-icons/ai';
import { IoIosTime } from 'react-icons/io';
import { GiShipBow } from 'react-icons/gi';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker from '@mui/lab/DateRangePicker';
import moment from 'moment-timezone';
import SwipeableTextMobileStepper from '../../components/SwipeableTextMobileStepper/SwipeableTextMobileStepper';
import withRouter from '../../utils/WithRouter/WithRouter';
import Badge from '../../components/Badge/Badge';
import { Invoice, LocalTabs } from '../../models';
import { GridColDef } from '@mui/x-data-grid';

interface InvoiceDetails {
  title: string,
  countInvoices: number,
  total: number
  color: string
  borderColor: string
  icon: React.ElementType
}

type Props = {
  getAllInvoices: () => void,
  listData: IInvoice
  router: any
}

type State = {
  searchValue: string
  dateFilterValue: any
  selectedRowImages: any
  openImagesModal: boolean
  activeTabValue: string
}

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    Home
  </Link>,
  <Typography key="2" color='#28323C'>
    Invoices
  </Typography>,
];

class Invoices extends Component<Props, State> {
  state: State = {
    searchValue: '',
    activeTabValue: 'all',
    dateFilterValue: null,
    selectedRowImages: null,
    openImagesModal: false
  }

  componentDidMount() {
    this.props.getAllInvoices();
    const id = new URLSearchParams(this.props.router.location?.search).get('id') || '';
    this.setState({ searchValue: id });
  }

  findOrdersForSelectedTab = (order: Invoice) => {
    const { activeTabValue } = this.state;

    switch (activeTabValue) {
      case 'all':
        // display all active orders
        return !order.unsureOrder;
      
      case 'shipment':
      // display shipment orders only
      return order.isShipment && !order.isPayment && !order.unsureOrder && !order.isFinished;

      case 'paid':
      // display paid orders only
      return !order.isShipment && order.isPayment && !order.unsureOrder && !order.isFinished;

      case 'finished':
      // display finished orders only      
      return order.isFinished;

      case 'unsure':
      // display unsure orders only
      return order.unsureOrder && !order.isFinished;
    
      default:
        // default
        return !order.isFinished && !order.unsureOrder;
    }
  }

  filterList = (list: any[]) => {
    const { dateFilterValue }: any = this.state;
    let filteredList = list;

    let allOrderCount = 0;
    let shipmentOrderCount = 0;
    let finishedOrderCount = 0;
    let paidOrderCount = 0;
    let unsureOrderCount = 0;

    if (dateFilterValue && dateFilterValue[0] && dateFilterValue[1]) {
      filteredList = list.filter(a => {
        const dataDate = moment(a.createdAt)
        const startDate = moment(dateFilterValue[0])
        const endDate = moment(dateFilterValue[1])
        return startDate <= dataDate && dataDate <= endDate;
      })
    }

    filteredList = filteredList.filter(order => {      
      const displayOrdersTab = this.findOrdersForSelectedTab(order);      

      // count every tab
      if (!order.unsureOrder) allOrderCount++;
      if (order.isFinished) finishedOrderCount++;
      if (!order.isShipment && order.isPayment && !order.unsureOrder && !order.isFinished) paidOrderCount++;
      if (order.unsureOrder && !order.isFinished) unsureOrderCount++;
      if (order.isShipment && !order.isPayment && !order.unsureOrder && !order.isFinished) shipmentOrderCount++;

      return (
      ((order.customerInfo.fullName || "").toLocaleLowerCase().indexOf(this.state.searchValue.toLocaleLowerCase()) > -1 ||
      (order.orderId || "").toLocaleLowerCase().indexOf(this.state.searchValue.toLocaleLowerCase()) > -1 ||
      (order?._id || "").toLocaleLowerCase().indexOf(this.state.searchValue.toLocaleLowerCase()) > -1) &&
      displayOrdersTab
    )})

    return {
      filteredList,
      allOrderCount,
      shipmentOrderCount,
      finishedOrderCount,
      paidOrderCount,
      unsureOrderCount
    };
  }

  getIvoicesDetails = (list: any[]) => {
    const totalInvoices: InvoiceDetails = { title: 'Total', total: 0, countInvoices: 0, color: '#2596FF', borderColor: '#9DCDF9', icon: FaFileInvoiceDollar };
    const paidInvoices: InvoiceDetails = { title: 'Paid', total: 0, countInvoices: 0, color: '#36d600', borderColor: '#2eb8004c', icon: AiFillCheckCircle };
    const debtInvoices: InvoiceDetails = { title: 'Debt', total: 0, countInvoices: 0, color: '#f0cc00', borderColor: 'rgba(245, 208, 0, 0.3)', icon: IoIosTime };
    const shipmentInvoices: InvoiceDetails = { title: 'Shipment', total: 0, countInvoices: 0, color: '#2c2ff8', borderColor: '#8c8eff', icon: GiShipBow };
    const canceledInvoices: InvoiceDetails = { title: 'Canceled', total: 0, countInvoices: 0, color: '#ff4646', borderColor: '#fc9393', icon: FaFileInvoiceDollar };

    list.forEach((data: Invoice) => {
      if(data.isPayment) {        
        paidInvoices.total += data.totalInvoice;
        paidInvoices.countInvoices = paidInvoices.countInvoices + 1;
      }
      if(data.isShipment) {        
        shipmentInvoices.total += data.totalInvoice;
        shipmentInvoices.countInvoices = shipmentInvoices.countInvoices + 1;
      }
      if(data.debt?.total > 0 && data.debt?.currency === 'USD') {        
        debtInvoices.total += data.debt.total;
        debtInvoices.countInvoices = debtInvoices.countInvoices + 1;
      }
      if(data.isCanceled) {        
        canceledInvoices.total += data.totalInvoice;
        canceledInvoices.countInvoices = canceledInvoices.countInvoices + 1;
      }
      if (!data.unsureOrder) {
        totalInvoices.total += data.totalInvoice;
        totalInvoices.countInvoices = totalInvoices.countInvoices + 1;
      }
    })
    return [
      totalInvoices,
      shipmentInvoices,
      paidInvoices,
      debtInvoices,
      canceledInvoices
    ]
  }

  render() {
    const { listData } = this.props;
    
    if (listData.listStatus.isLoading) {
      return <CircularProgress />;
    }

    let { filteredList, allOrderCount, shipmentOrderCount, finishedOrderCount, paidOrderCount, unsureOrderCount} = this.filterList(listData.list);
    
    filteredList = generateDataToListType(filteredList);
    const invoicesDetails = this.getIvoicesDetails(listData.list);

    const columns: GridColDef[] = [...defaultColumns(this.setState.bind(this))] as any;

    const tabs: LocalTabs = [
      {
        label: 'All',
        value: 'all',
        icon: <Badge style={{ marginLeft: '8px'}} text={String(allOrderCount)} color="sky" />
      },
      {
        label: 'Shipment',
        value: 'shipment',
        icon: <Badge style={{ marginLeft: '8px'}} text={String(shipmentOrderCount)} color="primary" />
      },
      {
        label: 'Paid',
        value: 'paid',
        icon: <Badge style={{ marginLeft: '8px'}} text={String(paidOrderCount)} color="warning" />
      },
      {
        label: 'Finished',
        value: 'finished',
        icon: <Badge style={{ marginLeft: '8px'}} text={String(finishedOrderCount)} color="success" />
      },
      {
        label: 'Unsure Orders',
        value: 'unsure',
        icon: <Badge style={{ marginLeft: '8px'}} text={String(unsureOrderCount)} color="danger" />
      }
    ]
    
    return (
      <div className="container mt-4">
        <div className="row" style={{ maxWidth: '1300px', margin: 'auto'}}>
          <div className="col-12">
            <h4 className='mb-2'> Invoices Table</h4>
            <div className='mb-4 d-flex flex-column flex-lg-row justify-content-between'>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
              <div className='mt-3'>
                <CustomButton
                  background='rgb(0, 171, 85)' 
                  size="small" 
                  icon={<AiOutlinePlus />}
                  href={'/unsureOrder/add'}
                  style={{ marginRight: '10px' }}
                >
                  Add unsure order
                </CustomButton>

                <CustomButton 
                  background='rgb(0, 171, 85)' 
                  size="small" 
                  icon={<AiOutlinePlus />}
                  href={'/invoice/add'}
                >
                  Add Invoice
                </CustomButton>
              </div>
            </div>

            <StatusDataWidget 
              invoicesDetails={invoicesDetails}
              isLoading={listData.listStatus.isLoading}
            />

            <Card
              tabs={tabs}
              tabsOnChange={(value: string) => this.setState({ activeTabValue: value })}
            >
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                <TextInput
                  placeholder="Search User..." 
                  icon={<AiOutlineSearch />} 
                  onChange={(event: any) => this.setState({ searchValue: event.target.value })}
                />
                <div className='d-flex mt-2'>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      startText="Start Date"
                      endText="End Date"
                      value={this.state.dateFilterValue || [null, null]}
                      onChange={(newValue) => this.setState({ dateFilterValue: newValue }) }
                      renderInput={(startProps, endProps) => (
                        <React.Fragment>
                          <TextField size='small' {...startProps} />
                          <Box sx={{ mx: 2 }}> to </Box>
                          <TextField size='small' {...endProps} />
                        </React.Fragment>
                      )}
                    />
                    </LocalizationProvider>
                    <IconButton color="primary" aria-label="Filter" onClick={() => this.setState({ dateFilterValue: null })}>
                      <AiOutlineClear
                        size={30} 
                        color={'rgb(99, 115, 129)'} 
                        title="filter" 
                        style={{ cursor: 'pointer'}}
                      />
                    </IconButton>
                </div>
              </div>

              {listData && listData.listStatus.isLoading &&
                <div style={{ textAlign: 'center' }}>
                    <CircularProgress />
                </div>
              }

              <InfoTable 
                columns={columns} 
                data={filteredList.reverse()}
              />
              
            </Card>
          </div>
        </div>
        <Dialog 
          open={this.state.openImagesModal}
          onClose={() => this.setState({ openImagesModal: false })}
        >
          <DialogContent>
            <SwipeableTextMobileStepper data={this.state.selectedRowImages} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ openImagesModal: false })} >Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
	return {
		listData: state.invoice,
	};
}

const mapDispatchToProps = {
  getAllInvoices,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Invoices));
