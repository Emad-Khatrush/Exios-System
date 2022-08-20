import Badge from "../../components/Badge/Badge";
import { LocalTabs } from "../../models";

export const generateTabs = (tabs: any): any => {
  return [
    {
      label: 'Active',
      value: 'active',
      icon: <Badge style={{ marginLeft: '8px'}} text={String(tabs.activeOrdersCount)} color="sky" />
    },
    {
      label: 'Only Shipment',
      value: 'shipment',
      icon: <Badge style={{ marginLeft: '8px'}} text={String(tabs.shipmentOrdersCount)} color="primary" />
    },
    {
      label: `Arriving`,
      value: 'arriving',
      icon: <Badge style={{ marginLeft: '8px'}} text={String(tabs.arrivingOrdersCount)} color="primary" />
    },
    {
      label: 'UnPaid',
      value: 'unpaid',
      icon: <Badge style={{ marginLeft: '8px'}} text={String(tabs.unpaidOrdersCount)} color="warning" />
    },
    {
      label: 'Finished',
      value: 'finished',
      icon: <Badge style={{ marginLeft: '8px'}} text={String(tabs.finishedOrdersCount)} color="success" />
    },
    {
      label: 'Unsure Orders',
      value: 'unsure',
      icon: <Badge style={{ marginLeft: '8px'}} text={String(tabs.unsureOrdersCount)} color="danger" />
    }
  ] as LocalTabs;
}