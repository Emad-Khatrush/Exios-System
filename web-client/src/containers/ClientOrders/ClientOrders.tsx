import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Card from '../../components/Card/Card';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import Tabs from '../../components/Tabs/Tabs';
import TextInput from '../../components/TextInput/TextInput';

type Props = {}

const data = [
  {
    label: 'طلبياتي',
    value: 'myOrders',
  },
  {
    label: 'وصلت الى المخزن',
    value: 'arrived',
  },
  {
    label: 'جاهزه للتسليم',
    value: 'readyForPickup',
  },
  {
    label: 'تم التسليم',
    value: 'finished',
    disable: true
  }
]

type ActiveTabs = 'myOrders' | 'arrived' | 'readyForPickup' | 'finished';

const ClientOrders = (props: Props) => {
  const [ activeTab, setActiveTab ] = useState<ActiveTabs>('myOrders');

  const tabOnChange = (tab: ActiveTabs) => {
    setActiveTab(tab);
  }

  return (
    <div className="container mx-auto py-10 h-64 w-11/12 px-6">
      <Card>
        <Tabs 
          data={data}
          activeTab={activeTab}
          tabOnChange={tabOnChange}
        />

        <div className=' flex justify-end'>
          <div className='grid w-100 lg:w-1/3 my-5 mb-1'>
            <TextInput 
              type='search'
              buttonLabel={'ابحث'}
              placeholder="ابحث عن طلبيتك بواسطه رقم التتبع"
              icon={<AiOutlineSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-5'>
          <OrderDetails />
          <OrderDetails />
          <OrderDetails />

        </div>

      </Card>
    </div>
  )
}

export default ClientOrders;