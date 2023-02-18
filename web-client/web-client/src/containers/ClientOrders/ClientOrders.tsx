import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import api from '../../api';
import Card from '../../components/Card/Card';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import Tabs from '../../components/Tabs/Tabs';
import TextInput from '../../components/TextInput/TextInput';
import { OrderStatusType, Package } from '../../models';

const ClientOrders = () => {
  const account = useSelector((state: any) => state.session.account);

  const [activeTab, setActiveTab] = useState<OrderStatusType>('active');
  const [orders, setOrders] = useState<Package[]>([]);
  const [countList, setCountList] = useState({
    finishedOrders: 0,
    readyForReceivement: 0,
    warehouseArrived: 0,
    activeOrders: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  const tabOnChange = async (tab: OrderStatusType) => {
    setIsLoading(true);
    setActiveTab(tab);
    try {
      const response = await api.getOrdersForUser(tab);
      const orders = response.data.results.orders;
      setOrders(orders);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const response = await api.getOrdersForUser('all');
      const orders = response.data.results.orders;
      const countList = response.data.results.countList;
      setOrders(orders);
      setCountList(countList);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const searchInputChange = async (event: any) => {
    const value = event.target.value;
    try {
      let response;
      setIsLoading(true);
      if (!value) {
        response = await api.getOrdersForUser(activeTab);
      } else {
        response = await api.getOrdersBySearch(value);
      }
      const orders = response.data.results.orders;      
      setOrders(orders);      
    } catch (error) {
      console.log(error);
      
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getOrders();
  }, [])

  const hasOrders = orders.length > 0;

  const data = [
    {
      label: 'طلبياتي',
      value: 'active',
      count: countList.activeOrders
    },
    {
      label: 'وصلت الى المخزن',
      value: 'arrivedWarehouse',
      count: countList.warehouseArrived
    },
    {
      label: 'جاهزه للتسليم',
      value: 'readyForPickup',
      count: countList.readyForReceivement
    },
    {
      label: 'تم التسليم',
      value: 'finished',
      count: countList.finishedOrders
    }
  ]

  return (
    <div className="container mx-auto py-10 h-64 w-11/12 px-6">
      <Card>
        <Tabs 
          data={data as any}
          activeTab={activeTab}
          tabOnChange={tabOnChange}
        />

        <div className=' flex justify-end'>
          <div className='grid w-full lg:w-1/3 my-5 mb-1'>
            <TextInput 
              type='search'
              buttonLabel={'ابحث'}
              placeholder="ابحث عن طلبيتك بواسطه رقم التتبع"
              icon={<AiOutlineSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
              onChange={searchInputChange}
            />
          </div>
        </div>

        {!isLoading ?
          <div className={`${hasOrders && 'grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-5'}`}>
            {hasOrders ? orders.map((order: Package, i) => (
              <OrderDetails 
                key={order._id}
                order={order}
                index={i}
              />
              ))
              :
              <h3 className=' text-xl text-center my-10'> لا توجد اي طلبيات   </h3>
            }
          </div>
          :
          <Box className='h-full items-center justify-center' sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        }
      </Card>
    </div>
  )
}

export default ClientOrders;