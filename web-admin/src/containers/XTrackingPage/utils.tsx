import Badge from "../../components/Badge/Badge";
import { LocalTabs } from "../../models";

export const generateTabs = (tabs: any): any => {
  return [
    {
      label: 'Active',
      value: 'active',
      icon: <Badge style={{ marginLeft: '8px'}} text={String(tabs.activeOrderCount)} color="sky" />
    },
    {
      label: 'Only Shipment',
      value: 'shipment',
      icon: <Badge style={{ marginLeft: '8px'}} text={String(tabs.shipmentOrderCount)} color="primary" />
    },
    {
      label: `Arriving`,
      value: 'arriving',
      icon: <Badge style={{ marginLeft: '8px'}} text={String(tabs.arrivingOrderCount)} color="primary" />
    },
    {
      label: 'UnPaid',
      value: 'unpaid',
      icon: <Badge style={{ marginLeft: '8px'}} text={String(tabs.unpaidOrderCount)} color="warning" />
    },
    {
      label: 'Finished',
      value: 'finished',
      icon: <Badge style={{ marginLeft: '8px'}} text={String(tabs.finishedOrderCount)} color="success" />
    },
    {
      label: 'Unsure Orders',
      value: 'unsure',
      icon: <Badge style={{ marginLeft: '8px'}} text={String(tabs.unsureOrderCount)} color="danger" />
    }
  ] as LocalTabs;
}