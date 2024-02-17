import generateDate from '../../utils/generateDate';
import generateId from '../../utils/generateId';

interface IData {
  day?: number;
  month?: number;
  week?: number;
  year: number;
  totalQuantity: number;
  totalRevenue: number;
}

const SaleHistoryTable = ({ data }: { data: IData[] }) => {
  return (
    <table className='custom-table'>
      <thead>
        <tr>
          <th>Date</th>
          <th>Total Sell (Quantity)</th>
          <th>Total Revenue</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((row) => (
            <SingleRow
              key={generateId({ year: row.year, week: row.week, month: row.month, day: row.day })}
              rowData={row}
            />
          ))}
      </tbody>
    </table>
  );
};

export default SaleHistoryTable;

const SingleRow = ({ rowData }: { rowData: IData }) => {
  return (
    <tr>
      <td>
        {generateDate({
          year: rowData?.year,
          week: rowData?.week,
          month: rowData?.month,
          day: rowData?.day,
        })}
      </td>
      <td>{rowData.totalQuantity}</td>
      <td>{rowData.totalRevenue}</td>
    </tr>
  );
};
