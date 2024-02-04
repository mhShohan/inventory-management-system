import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { ChangeEvent, useState } from 'react';
import Swal from 'sweetalert2';
import { useBulkDeleteMutation, useDeleteProductMutation } from '../redux/features/productApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addAllToBulkDelete,
  addToBulkDelete,
  getBulkDelete,
  removeAllToBulkDelete,
  removeToBulkDelete,
  toggleCreateVariantModel,
  toggleSaleModel,
  toggleUpdateModel,
} from '../redux/services/modal.Slice';
import { IProduct } from '../types/prduct.types';
import toastMessage from '../lib/toastMessage';

const Table = ({ data }: { data: IProduct[] }) => {
  const dispatch = useAppDispatch();
  const [allSelected, setAllSelected] = useState(false);
  const bulkDeleteData = useAppSelector(getBulkDelete);
  const [bulkDelete] = useBulkDeleteMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAllSelected(e.target.checked);

    if (e.target.checked) {
      dispatch(addAllToBulkDelete(data.map((item) => item._id)));
    } else {
      dispatch(removeAllToBulkDelete());
    }
  };

  const handleBulkDelete = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete all selected products',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete!',
      });

      if (result.isConfirmed) {
        const res = await bulkDelete(bulkDeleteData).unwrap();
        dispatch(removeAllToBulkDelete());

        if (res.statusCode === 200) {
          toastMessage({ icon: 'success', text: res.message });
        }
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <div>
      <Button
        onClick={handleBulkDelete}
        type='primary'
        disabled={bulkDeleteData.length === 0}
        className='bulk-delete-btn'
      >
        Delete Selected
      </Button>
      <table className='custom-table'>
        <thead>
          <tr>
            <th>
              <input type='checkbox' checked={allSelected} onChange={handleChange} />
            </th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{data && data.map((row) => <SingleRow rowData={row} key={row._id} />)}</tbody>
      </table>
    </div>
  );
};

export default Table;

const SingleRow = ({ rowData }: { rowData: IProduct }) => {
  const [deleteProduct] = useDeleteProductMutation();
  const bulkDeleteData = useAppSelector(getBulkDelete);
  const dispatch = useAppDispatch();

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
        await deleteProduct(id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Product has been deleted.',
          icon: 'success',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addToBulkDelete(rowData._id));
    } else {
      dispatch(removeToBulkDelete(rowData._id));
    }
  };

  console.log(rowData);

  return (
    <tr>
      <td>
        <input
          type='checkbox'
          checked={bulkDeleteData.includes(rowData._id)}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>{rowData.name}</td>
      <td>{rowData.category.name}</td>
      <td>{rowData.price}</td>
      <td>{rowData.stock}</td>
      <td>{rowData?.brand?.name}</td>
      <td>
        <Flex gap={2} justify='center'>
          <Button
            type='primary'
            onClick={() =>
              dispatch(
                toggleSaleModel({
                  open: true,
                  data: { _id: rowData._id, price: rowData.price, name: rowData.name },
                })
              )
            }
            style={{
              padding: '0 .5rem',
              fontWeight: 600,
              backgroundColor: '#FF6565',
            }}
          >
            Sell
          </Button>
          <Button
            type='primary'
            onClick={() => dispatch(toggleCreateVariantModel({ open: true, data: rowData }))}
            style={{ padding: '0 .5rem', fontWeight: 600, backgroundColor: 'blue' }}
          >
            Create Variant
          </Button>

          <Button
            type='primary'
            onClick={() => dispatch(toggleUpdateModel({ open: true, data: rowData }))}
            style={{ padding: '0 .5rem', backgroundColor: 'green' }}
          >
            <EditFilled />
          </Button>

          <Button
            type='primary'
            onClick={() => handleDelete(rowData._id)}
            style={{ padding: '0 .5rem', backgroundColor: 'red' }}
          >
            <DeleteFilled />
          </Button>
        </Flex>
      </td>
    </tr>
  );
};
