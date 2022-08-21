import { CircularProgress } from "@mui/material";
import { Component } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { connect } from "react-redux";
import { getCurrentTabInvoices, getDefualtInvoices, getInvoices, getInvoicesBySearch } from "../../actions/invoices";
import Card from "../../components/Card/Card";
import CustomButton from "../../components/CustomButton/CustomButton";
import OrderWidget from "../../components/OrderWidget/OrderWidget";
import { LocalTabs } from "../../models";
import { IInvoice } from "../../reducers/invoices";
import { getTabOrdersCount } from "../../utils/methods";
import { generateTabs } from "./utils";

type Props = {
  getInvoices: (config?: {
    skip?: number
    limit?: number
    tabType?: string
  }) => void
  getCurrentTabInvoices: (config?: {
    skip?: number
    limit?: number
    tabType?: string
  }) => void
  getDefualtInvoices: (config?: {
    skip?: number
    limit?: number
    tabType?: string
  }) => void
  getInvoicesBySearch: (query: { searchValue: string, selectorValue: string, tabType: string }) => void
  listData: IInvoice
}

type State = {
  searchValue: string
  selectorValue: string
  scrollReached: boolean
  filteredOrders: IInvoice[]
  searchForOrder: boolean
  isTabOrdersLoading: boolean
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
    scrollReached: false,
    filteredOrders: [],
    searchForOrder: false,
    isTabOrdersLoading: false
  }

  componentDidMount() {
    this.props.getDefualtInvoices({
      skip: 0,
      limit: 10
    });
  }

  onTabChange = (value: string) => {
    this.props.getCurrentTabInvoices({
      tabType: value,
      skip: 0,
      limit: 10
    });
  }

  onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollReached = event.currentTarget.scrollHeight - event.currentTarget.scrollTop <= event.currentTarget.clientHeight + 25;
    const limit = Number(this.props.listData?.query?.limit);
    const currentOrdersCount = getTabOrdersCount(this.props.listData.tabType, this.props.listData);
    
    if (scrollReached !== this.state.scrollReached && limit < currentOrdersCount) {
      this.props.getInvoices({
        skip: 0,
        limit: limit + 5,
        tabType: this.props.listData.tabType
      });
      this.setState({ scrollReached });
    }
  }

  filterList = (event: any) => {
    const eventName = event.target.name;
    const searchValue = eventName === 'searchValue' ? event.target.value : this.state.searchValue;
    const selectorValue = eventName === 'selectorValue' ? event.target.value : this.state.selectorValue;
    
    if (eventName === 'selectorValue' && searchValue === '') return;
    
    if (eventName === 'searchValue' && searchValue === '') {
      this.props.getInvoices({
        tabType: this.props.listData.tabType,
        skip: 0,
        limit: 10,
      });
    } else {
      this.props.getInvoicesBySearch({
        searchValue: searchValue,
        selectorValue: selectorValue,
        tabType: this.props.listData.tabType
      })
    }
  }


  render() {
    const { listData } = this.props;    
    const filteredList = listData.list.reverse();

    const tabs: LocalTabs = generateTabs({
      activeOrdersCount: listData.activeOrdersCount,
      shipmentOrdersCount: listData.shipmentOrdersCount,
      finishedOrdersCount: listData.finishedOrdersCount,
      unpaidOrdersCount: listData.unpaidOrdersCount,
      unsureOrdersCount: listData.unsureOrdersCount,
      arrivingOrdersCount: listData.arrivingOrdersCount
    });

    const currentOrdersCount = getTabOrdersCount(this.props.listData.tabType, this.props.listData);
    console.log(currentOrdersCount);
    
    
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
              searchInputOnChange={(event: any) => {
                this.setState({ searchValue: event.target.value });
                this.filterList(event);
              }}
              selectorInputOnChange={(event: any) => {
                this.setState({ selectorValue: event.target.value });
                this.filterList(event);
              }}
              tabsOnChange={(value: string) => this.onTabChange(value)}
              onScroll={this.onScroll}
            >
              {this.props.listData.listStatus.isSwitchingTab ?
                <div className="text-center">
                  <CircularProgress />
                </div>
                :
                <>
                  {filteredList && (filteredList || []).reverse().map((order: any, i: number) => (
                    <OrderWidget
                      key={order.orderId}
                      order={order}
                      orderIndex={currentOrdersCount - i}
                    />
                  ))}
                </>
              }
              
              {listData.listStatus.isLoading &&
                <div className="text-center">
                  <CircularProgress />
                </div>
              }

              {filteredList?.length <= 0 && !listData.listStatus.isLoading &&
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
    getInvoicesBySearch,
    getCurrentTabInvoices,
    getDefualtInvoices
};

export default connect(mapStateToProps, mapDispatchToProps)(XTrackingPage);
