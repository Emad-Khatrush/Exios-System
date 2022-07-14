import { CircularProgress } from "@mui/material";
import { Component } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { connect } from "react-redux";
import { getInvoices } from "../../actions/invoices";
import Card from "../../components/Card/Card";
import CustomButton from "../../components/CustomButton/CustomButton";
import OrderWidget from "../../components/OrderWidget/OrderWidget";
import { Invoice, LocalTabs } from "../../models";
import { IInvoice } from "../../reducers/invoices";
import { generateTabs } from "./utils";

type Props = {
  getInvoices: () => void
  listData: IInvoice
}

type State = {
  searchValue: string
  selectorValue: string
  activeTabValue: string
  activeOrderCount: number
  shipmentOrderCount: number
  finishedOrderCount: number
  unpaidOrderCount: number
  unsureOrderCount: number
}

const selectValues = [
  {
    label: 'Exios Id',
    value: 'orderId'
  },
  {
    label: 'Tracking Number',
    value: 'trackingNumber'
  }
]

class XTrackingPage extends Component<Props, State> {

  state: State = {
    searchValue: '',
    selectorValue: 'orderId',
    activeTabValue: 'active',
    activeOrderCount: 0,
    shipmentOrderCount: 0,
    finishedOrderCount: 0,
    unpaidOrderCount: 0,
    unsureOrderCount: 0,
  }

  componentDidMount() {
    this.props.getInvoices();
  }

  findOrdersForSelectedTab = (order: Invoice) => {
    const { activeTabValue } = this.state;

    switch (activeTabValue) {
      case 'active':
        // display active orders only
        return !order.isFinished && !order.unsureOrder;
      
      case 'shipment':
      // display shipment orders only
      return order.isShipment && !order.isPayment && !order.unsureOrder && !order.isFinished;

      case 'arriving':
      // display arriving orders only
      return order.isPayment && order.orderStatus === 1;

      case 'unpaid':
      // display unpaid orders only
      return order.orderStatus === 0 && !order.unsureOrder;

      case 'finished':
      // display finished orders only
      return order.isFinished;

      case 'unsure':
      // display unsure orders only
      return order.unsureOrder;
    
      default:
        // default
        return !order.isFinished;
    }
  }

  searchByTrackingNumber = (order: Invoice) => {
    const { searchValue } = this.state;

    let dataFound = false;
    for (let i = 0; i < order.paymentList.length; i++) {
      const isTrackingNumberValid = order?.paymentList[i]?.deliveredPackages?.trackingNumber.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) > -1;
      if (searchValue !== '' && isTrackingNumberValid) {
        dataFound = true;
        break;
      }
    }
    return dataFound;
  }

  filterList = (list: any[]) => {
    const { searchValue, selectorValue } = this.state;
    let filteredList = list;

    let activeOrderCount = 0;
    let shipmentOrderCount = 0;
    let finishedOrderCount = 0;
    let unpaidOrderCount = 0;
    let unsureOrderCount = 0;
    let arrivingOrderCount = 0;


    filteredList = filteredList.filter((order: Invoice) => {
      // if the search bar have a value, filter all the data
      const displayOrdersTab = searchValue ? true : this.findOrdersForSelectedTab(order);

      // count every tab
      if (!order.isFinished && !order.unsureOrder) activeOrderCount++;
      if (order.isFinished) finishedOrderCount++;
      if (order.orderStatus === 0 && !order.unsureOrder) unpaidOrderCount++;
      if (order.unsureOrder) unsureOrderCount++;
      if (order.isPayment && order.orderStatus === 1) arrivingOrderCount++;
      if (order.isShipment && !order.isPayment && !order.unsureOrder && !order.isFinished) shipmentOrderCount++;

      if (selectorValue === 'trackingNumber') {
        return(
          ((this.searchByTrackingNumber(order) && displayOrdersTab) || searchValue === '') &&
          displayOrdersTab
        )
      }

      return(
      ((order.customerInfo.fullName || "").toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1 ||
      (order.orderId || "").toLocaleLowerCase().indexOf(searchValue) > -1
      ) &&
      displayOrdersTab
    )})

    return {
      filteredList,
      activeOrderCount,
      shipmentOrderCount,
      finishedOrderCount,
      unpaidOrderCount,
      unsureOrderCount,
      arrivingOrderCount
    };
  }

  render() {
    const { listData } = this.props;

    const { filteredList, activeOrderCount, shipmentOrderCount, finishedOrderCount, unpaidOrderCount, unsureOrderCount, arrivingOrderCount} = this.filterList(listData.list);

    if (listData.listStatus.isLoading) {
      return <CircularProgress />
    }

    const tabs: LocalTabs = generateTabs({
      activeOrderCount,
      shipmentOrderCount,
      finishedOrderCount,
      unpaidOrderCount,
      unsureOrderCount,
      arrivingOrderCount
    });
    
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 mb-4 text-end">
            <CustomButton
              background='rgb(0, 171, 85)' 
              size="small" 
              icon={<AiOutlinePlus />}
              href={'/unsureOrder/add'}
              style={{ marginRight: '10px' }}
            >
              Add unsure order
            </CustomButton>
          </div>
          <div className="col-md-12">
            <Card
              tabs={tabs}
              showSearchInput={true}
              selectValues={selectValues}
              inputPlaceholder={'Search by User...'}
              bodyStyle={{
                height: '60vh',
                overflow: 'auto',
                marginTop: '20px'
              }}
              searchInputOnChange={(event: any) => this.setState({ searchValue: event.target.value })}
              selectorInputOnChange={(event: any) => this.setState({ selectorValue: event.target.value })}
              tabsOnChange={(value: string) => this.setState({ activeTabValue: value })}
            >
              {filteredList && filteredList.reverse().map((order, i) => (
                <OrderWidget
                  key={order.orderId}
                  order={order}
                  orderIndex={filteredList?.length - i}
                />
              ))}

              {filteredList.length <= 0 &&
                <p className="text-center"> No orders found </p>
              }
            </Card>
          </div>
        </div>
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
    getInvoices,
};

export default connect(mapStateToProps, mapDispatchToProps)(XTrackingPage);
