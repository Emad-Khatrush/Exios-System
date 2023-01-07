import { GridColDef } from '@mui/x-data-grid';
import moment from 'moment-timezone';

export const defaultColumns = (): GridColDef[] => ([
  {
    field: 'id',
    headerName: 'عدد',
    width: 100,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'createdAt',
    headerName: 'تاريخ',
    width: 200,
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'placedAt',
    headerName: 'مكان الحركة',
    width: 150,
    sortable: false,
    disableColumnMenu: true
  },
  {
    field: 'description',
    headerName: 'تفاصيل',
    width: 300,
    sortable: false,
    disableColumnMenu: true
  }
]);

export const generateDataToListType = (list: any[]) => {
  return list.map((data, i)=> ({
    id: i + 1,
    description: data.description,
    placedAt: data.placedAt,
    createdAt: moment(data.createdAt).format('DD-MM-YYYY hh:mm A')
  }));
}
