import React from "react";
import { FaBoxOpen, FaEye, FaMoneyBillWave } from "react-icons/fa";
import EarningWidget from "../../components/EarningWidget/EarningWidget";
import InfoWidget from "../../components/InfoWidget/InfoWidget";
import OfficesExpense from "../../components/OfficesExpense/OfficesExpense";
import { HomeData } from "../../models";
import api from "../../api";
import { CircularProgress } from "@mui/material";

type State = {
  HomeData: HomeData | null
}

class Home extends React.Component<{}, State> {

  state: State = {
    HomeData: null
  }

  async componentDidMount() {
    const { data } = await api.get('home');
    this.setState({ HomeData: data });
  }
  render() {

    if (!this.state.HomeData) {
      return <CircularProgress />
    }
      
    return (
      <div className="m-3">
        <div className="row">
            <div className="col-md-4">
              <InfoWidget title="Active Orders" value={`${this.state.HomeData.activeOrdersCount}`} icon={<FaBoxOpen />} />
            </div>
            <div className="col-md-4">
              <InfoWidget title="Total Invoices" value={`$${this.state.HomeData.totalInvoices}`} icon={<FaMoneyBillWave />} />
            </div>
            <div className="col-md-4">
              <InfoWidget title="Website Views" value="3540" icon={<FaEye />} />
            </div>
        </div>
          
        <div className="row">
            <div className="col-md-5">
              <EarningWidget 
                earingData={this.state.HomeData}
              />
            </div>
            <div className="col-md-7">
              <OfficesExpense 
                offices={this.state.HomeData.offices}
                totalDebts={this.state.HomeData.totalDebts}
              />
            </div>
        </div>
      </div>
    ) 
  }
}
export default Home;
