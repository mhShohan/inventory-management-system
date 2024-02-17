import { DeleteFilled } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import Swal from 'sweetalert2';
import toastMessage from '../../lib/toastMessage';
import { IPurchase } from '../../types/purchase.types';
import formatDate from '../../utils/formatDate';

//   seller: string
//   product: string
//   sellerName: string
//   productName: string
//   quantity: number
//   unitPrice: number
//   totalPrice: number
//   paid: number
//   createdAt: string
const PurchaseTable = ({ data }: { data: IPurchase[] }) => {
  return (
    <table className='custom-table'>
      <thead>
        <tr>
          <th>Seller Name</th>
          <th>Product Name</th>
          <th>Price(unit)</th>
          <th>Quantity</th>
          <th>Total Price</th>
          <th>Due</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{data && data.map((row) => <SingleRow rowData={row} key={row._id} />)}</tbody>
    </table>
  );
};

export default PurchaseTable;

const SingleRow = ({ rowData }: { rowData: IPurchase }) => {
  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        toastMessage({
          title: 'Deleted!',
          text: 'Successfully deleted.',
          icon: 'success',
        });
      }
    } catch (error: any) {
      toastMessage({
        text: error.data.message,
        icon: 'error',
      });
    }
  };

  return (
    <tr>
      <td>{rowData.sellerName}</td>
      <td>{rowData.productName}</td>
      <td>{rowData.unitPrice}</td>
      <td>{rowData.quantity}</td>
      <td>{rowData.totalPrice}</td>
      <td>{rowData.totalPrice - rowData.paid}</td>
      <td>{formatDate(rowData.createdAt)}</td>
      <td>
        <Flex gap={2} justify='center'>
          <Button
            type='primary'
            onClick={() => handleDelete(rowData._id)}
            style={{ padding: '0 .5rem', backgroundColor: 'red', border: '1px solid red' }}
          >
            <DeleteFilled />
          </Button>
        </Flex>
      </td>
    </tr>
  );
};
