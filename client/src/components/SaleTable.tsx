import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import Swal from 'sweetalert2';
import { ITableSale } from '../types/sale.type';
import formatDate from '../utils/formatDate';
import { useDeleteSaleMutation, useUpdateSaleMutation } from '../redux/features/saleApi';
import toastMessage from '../lib/toastMessage';

const SaleTable = ({ data }: { data: ITableSale[] }) => {
  return (
    <table className='custom-table'>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Buyer Name</th>
          <th>Quantity</th>
          <th>Total Price</th>
          <th>Sell Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{data && data.map((row) => <SingleRow rowData={row} key={row._id} />)}</tbody>
    </table>
  );
};

export default SaleTable;

const SingleRow = ({ rowData }: { rowData: ITableSale }) => {
  const [deleteSale] = useDeleteSaleMutation();
  const [updateSale] = useUpdateSaleMutation();

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
        await deleteSale(id);
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

  const handleUpdate = async (data: Partial<ITableSale>) => {
    const payload: any = { ...data };

    try {
      const { value: formValues } = await Swal.fire({
        title: 'Update Sale',
        showCancelButton: true,
        confirmButtonText: 'Update',
        html: `
          <div class="update-sale-modal">
            <div style='display:flex;'>
              <label style='flex:1;' htmlFor="buyerName">Buyer Name</label>
              <input style='flex:2;' id="buyerName" value=${data?.buyerName} class="input-field">
            </div>
            <div style='display:flex;'>
              <label style='flex:1'; htmlFor="quantity">Quantity</label>
              <input style='flex:2'; id="quantity" value=${data?.quantity} class="input-field">
            </div>
            <div style='display:flex;'>
              <label style='flex:1'; htmlFor="date">Date</label>
              <input style='flex:2'; id="date" type="date" value=${data?.date} class="input-field">
            </div>
          </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            (document.getElementById('buyerName') as HTMLInputElement)?.value,
            (document.getElementById('quantity') as HTMLInputElement)?.value,
            (document.getElementById('date') as HTMLInputElement)?.value,
          ];
        },
      });
      if (formValues) {
        payload.buyerName = formValues[0];
        payload.quantity = Number(formValues[1]);
        payload.date = formValues[2];
        delete payload.product;
        delete payload.updatedAt;
        delete payload.createdAt;
        delete payload.__v;
        delete payload.user;
        delete payload._id;

        Object.keys(payload).forEach((item) => {
          if (payload[item] === '') {
            delete payload[item];
          }
        });

        const res = await updateSale({ id: data._id, payload }).unwrap();

        if (res.statusCode === 200) {
          Swal.fire({ icon: 'success', text: 'Sale updated successfully!' });
        }
      }
    } catch (error: any) {
      Swal.fire({ icon: 'error', text: error.data.message });
    }
  };
  return (
    <tr>
      <td>{rowData.productName}</td>
      <td>{rowData.productPrice}</td>
      <td>{rowData.buyerName}</td>
      <td>{rowData.quantity}</td>
      <td>{rowData.totalPrice}</td>
      <td>{formatDate(rowData.date)}</td>
      <td>
        <Flex gap={2} justify='center'>
          <Button
            type='primary'
            onClick={() => handleUpdate(rowData)}
            style={{ padding: '0 .5rem', backgroundColor: 'green' }}
          >
            <EditFilled />
          </Button>
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
