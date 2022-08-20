import React, { useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import CustomButton from '../CustomButton/CustomButton';
import Card from '../Card/Card';
import { Office } from '../../models';

import './OfficesExpense.scss';

type Props = {
  offices: Office[]
  totalDebts: {
    totalDebts: number, 
    office: string, 
    currency: string
  }[]
}

const OfficesExpense = (props: Props) => {

  const [ currentOffice, setCurrentOffice ] = useState('tripoli');

  const office = props.offices.find((data: Office) => data.office === currentOffice);

  const debts = props.totalDebts.filter(debt => debt.office === currentOffice && debt.totalDebts > 0);
  const hasDebts = debts.length > 0;  
  
  return (
    <Card>
      <div className='offices-expense'>
        <div className='d-flex justify-content-between align-items-center'>
          <h6> {currentOffice} Office Current Balance </h6>
          <ToggleButtonGroup
            color="success"
            value={currentOffice}
            exclusive
            onChange={(event: any, value: string) => setCurrentOffice(value) }
            size="small"
          >
            <ToggleButton value="tripoli">Tripoli</ToggleButton>
            <ToggleButton value="benghazi">Benghazi</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <h3> ${office?.usaDollar.value} </h3>
        <div className='d-flex justify-content-between'>
          <p>US Dollar Current Balance</p>
          <p> ${office?.usaDollar.value} </p>
        </div>
        <div className='d-flex justify-content-between'>
          <p>Libyan Dinar Current Balance</p>
          <p>{office?.libyanDinar.value} LYD</p>
        </div>

        {hasDebts &&
          <div>
            <hr />
            <h6> Debts </h6>
            {debts.map(debt => (
              <div className='d-flex justify-content-between debt'>
                <p>Total Debts of {debt.currency}</p>
                <p> {debt.totalDebts} {debt.currency} </p>
              </div>
            ))}
          </div>
        }
        <CustomButton href='/expenses' background='rgb(0, 171, 85)' size='small'>
          Check All Expenses
        </CustomButton>
      </div>
    </Card>
  )
}

export default OfficesExpense;
