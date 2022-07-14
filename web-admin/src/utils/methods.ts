import { Invoice } from "../models";

// General Methods
export const arrayRemoveByValue = (arr: any[], value: string) => { 
    
  return arr.filter(function(ele){ 
      return ele !== value; 
  });
}

export const arrayRemoveByIndex = (arr: any[], index: number) => { 
    
  return arr.splice(index, 1);
}

// order methods

export const getOrderSteps = (order: Invoice | null | undefined) => {
  const steps = [
    {
      label: 'تجهيز طلبية',
      value: 'prepareOrder',
    },
    {
      label: 'وصلت الى المخزن',
      value: 'arrived',
    },
    {
      label: 'شحنت الى ليبيا',
      value: 'shippedToLibya',
    },
    {
      label: 'وصلت البضائع',
      value: 'goodsArrived',
    },
    {
      label: 'تم الاستلام',
      value: 'signed',
    }
  ]
  if (order?.isPayment) {
    steps.splice(1, 0, {
      label: 'تم الشراء',
      value: 'paid',
    });
  }
  return steps;
}