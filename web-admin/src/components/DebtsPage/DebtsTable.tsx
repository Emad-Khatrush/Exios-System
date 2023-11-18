import React, { useEffect, useState } from 'react'
import Card from '../Card/Card';
import { useSelector } from 'react-redux';
import { getTabsOfDebts } from './wrapper-util';
import { Account, Credit, Debt } from '../../models';
import DebtDetails from './DebtDetails';
import api from '../../api';
import { CircularProgress } from '@mui/material';

type Props = {
  setDialog: (state: any) => void
}

const DebtsTable = (props: Props) => {
  const account: Account = useSelector((state: any) => state.session?.account)

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState('open');
  const [debts, setDebts] = useState<Debt[]>();
  const [credits, setCredits] = useState<Credit[]>();
  const [countList, setCountList] = useState({
    openedDebtsCount: 0,
    closedDebtsCount: 0,
    overdueDebtsCount: 0,
    lostDebtsCount: 0
  });

  useEffect(() => {
    // Default Fetching
    fetchBalanceOfUsers('open');
  }, [])

  const fetchBalanceOfUsers = async (value?: string) => {
    const generatedValue = !!value ? value : currentTab;

    try {
      setIsLoading(true);
      const response = await api.get(`balances?tabType=${generatedValue}`);
      const { debts, credits, countList } = response.data;
      setDebts(debts);
      setCredits(credits);
      setCountList(countList);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const onTabChange = async (value: string) => {
    setCurrentTab(value);
    fetchBalanceOfUsers(value);
  }

  const { openedDebtsCount, closedDebtsCount, overdueDebtsCount, lostDebtsCount } = countList;
  const debtTabs = getTabsOfDebts({ openedDebtsCount, closedDebtsCount, overdueDebtsCount, lostDebtsCount }, (account.roles.isAdmin || account.roles?.accountant))
  
  return (
    <div className='col-12'>
      <Card
        leand
        tabs={debtTabs}
        style={{
          height: '0',
        }}
        bodyStyle={{
          marginTop: '20px',
        }}
        tabsOnChange={(value: string) => onTabChange(value)}
        // onScroll={this.onScroll}
      />

      {!isLoading ?
        <div className='row'>
          {(debts || []).length > 0 ? (debts || []).map((debt: Debt) => (
              <DebtDetails 
                debt={debt}
                setDialog={props.setDialog}
                fetchData={fetchBalanceOfUsers}
              />
            ))
            :
            <p>Debts Not Found</p>
          }
        </div>
        :
        <CircularProgress />
      }
    </div>
  )
}

export default DebtsTable;
