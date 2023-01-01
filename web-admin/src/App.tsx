import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import PrivateRoute from './routes/PrivateRoute';
import Login from './containers/Login/Login';
import AllowToAccessApp from './containers/AllowToAccessApp/AllowToAccessApp';
import AuthChecker from './utils/AuthChecker';
import { Session } from './models';

import './App.scss';

const Home = React.lazy(() => import('./containers/Home/Home'));
const EmployeeHomePage = React.lazy(() => import('./containers/EmployeeHomePage/EmployeeHomePage'));
const AddInvoice = React.lazy(() => import('./containers/AddInvoice/AddInvoice'));
const UnsureOrder = React.lazy(() => import('./containers/UnsureOrder/UnsureOrder'));
const Invoices = React.lazy(() => import('./containers/Invoices/Invoices'));
const Expenses = React.lazy(() => import('./containers/Expenses/Expenses'));
const Incomes = React.lazy(() => import('./containers/Incomes/Incomes'));
const Activities = React.lazy(() => import('./containers/Activities/Activities'));
const CreateExpense = React.lazy(() => import('./containers/CreateExpense/CreateExpense'));
const CreateIncome = React.lazy(() => import('./containers/CreateIncome/CreateIncome'));
const EditExpense = React.lazy(() => import('./containers/EditExpense/EditExpense'));
const EditIncome = React.lazy(() => import('./containers/EditIncome/EditIncome'));
const EditInvoice = React.lazy(() => import('./containers/EditInvoice/EditInvoice'));
const XTrackingPage = React.lazy(() => import('./containers/XTrackingPage/XTrackingPage'));

type MyProps = {
  session: Session
}

const getRoutesByRole = (roles: any) => {
  if (roles?.isEmployee) {
    return <>
      <Route path='/' element={<EmployeeHomePage />} />
      <Route path='/xtracking' element={<XTrackingPage />} />
      <Route path='/unsureOrder/add' element={<UnsureOrder />} />
      <Route path='/invoice/add' element={<AddInvoice />} />
      <Route path='/invoice/:id/edit' element={<EditInvoice />} />
      <Route path='/income/:id/edit' element={<EditIncome />} />
      <Route path='/expense/add' element={<CreateExpense />} />
      <Route path='/income/add' element={<CreateIncome />} />
    </>
  } else if (roles?.isAdmin) {
    return <>
      <Route path='/' element={<Home />} />
      <Route path='/activities' element={<Activities />} />
      <Route path='/expenses' element={<Expenses />} />
      <Route path='/expenses/add' element={<CreateExpense />} />
      <Route path='/expenses/:id/edit' element={<EditExpense />} />
      <Route path='/incomes' element={<Incomes />} />
      <Route path='/income/add' element={<CreateIncome />} />
      <Route path='/income/:id/edit' element={<EditIncome />} />
      <Route path='/invoices' element={<Invoices />} />
      <Route path='/invoice/add' element={<AddInvoice />} />
      <Route path='/invoice/:id/edit' element={<EditInvoice />} />
      <Route path='/unsureOrder/add' element={<UnsureOrder />} />
      <Route path='/xtracking' element={<XTrackingPage />} />
    </>
  }
}

class App extends React.Component<MyProps> {

  render() {
    const { session } = this.props;
    
    const routes = getRoutesByRole(session?.account?.roles);
    
      return (
          <Router>
            <AuthChecker />
            <Routes>
              <Route path='/shouldAllowToAccessApp' element={<AllowToAccessApp session={session} />} />
              <Route path='/login' element={<Login />} />;
              <Route element={<PrivateRoute session={session} />}>
                {routes}
              <Route path='*' element={<Navigate to='/' />} />;
              </Route>
            </Routes>
          </Router>
      );
  }
}

const mapStateToProps = (state: any) => {  
  return {
    session: state.session,
  };
}

export default connect(mapStateToProps)(App);
