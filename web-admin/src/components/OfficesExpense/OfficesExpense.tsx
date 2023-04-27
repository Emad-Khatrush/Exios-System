import { useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import CustomButton from '../CustomButton/CustomButton';
import Card from '../Card/Card';
import { Account, Invoice, Office } from '../../models';
import { Link } from 'react-router-dom';

import './OfficesExpense.scss';

type Props = {
  offices: Office[]
  debts: Invoice[]
  account?: Account
}

const OfficesExpense = (props: Props) => {
  const [ currentOffice, setCurrentOffice ] = useState(props.account?.city || 'tripoli');

  const office = props.offices.find((data: Office) => data.office === currentOffice);

  let totalUsd = 0;
  let totalLyd = 0;
  const debts = props.debts.filter((invoice: Invoice) => {
    if (invoice.debt.currency === 'USD' && invoice.placedAt === currentOffice) {
      totalUsd += invoice.debt.total;
    } else if (invoice.debt.currency === 'LYD' && invoice.placedAt === currentOffice) {
      totalLyd += invoice.debt.total;
    }
    return invoice.placedAt === currentOffice;
  });

  const hasTotalDebtToDisplay = totalUsd > 0 || totalLyd > 0;
  const hasDebts = debts.length > 0;
  const totalDebts = [
    {
      currency: 'USD',
      total: totalUsd
    },
    {
      currency: 'LYD',
      total: totalLyd
    }
  ]  
  
  return (
    <Card>
      <div className='offices-expense'>
        {(props.account?._id === "62bb47b22aabe070791f8278" || props.account?.roles.isAdmin) &&
          <>
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
                {!props.account?.roles?.isEmployee && <ToggleButton value="benghazi">Benghazi</ToggleButton>}
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
          </>
        }

        {hasDebts &&
          <div>
            <hr />
            <h6> Debts </h6>
            {debts.map((invoice: Invoice) => (
              <div className='d-flex justify-content-between mb-2 debts'>
                <div className='d-flex gap-4'>
                  <Link style={{ textDecoration: 'none' }} to={`/invoice/${invoice._id}/edit`}>{invoice.orderId}</Link>
                  <p></p>
                  <p>{invoice.customerInfo.fullName}</p>
                </div>
                <p style={{ color: '#f53d3d' }}>{invoice.debt.total} {invoice.debt.currency}</p>
              </div>
            ))}
            <hr />
            {hasTotalDebtToDisplay && 
              <div className='mb-2'>
                {totalDebts.map(debt => {
                  // eslint-disable-next-line array-callback-return
                  if (debt.total <= 0) return;
                  return (
                    <div className='d-flex justify-content-between'>
                      <p>Total Debts of {debt.currency}</p>
                      <p style={{ color: '#f53d3d' }}>{debt.total} {debt.currency}</p>
                    </div>
                  )
                })}
              </div>
            }
          </div>
        }
        {props.account?.roles.isAdmin &&
          <CustomButton href='/expenses' background='rgb(0, 171, 85)' size='small'>
            Check All Expenses
          </CustomButton>
        }
      </div>
    </Card>
  )
}

export default OfficesExpense;
