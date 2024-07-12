import { useState } from 'react';
import './App.css';
import UtilityDataGrid from './components/UtilityDataGrid';
import { MockData } from './utils/MockData';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
function App() {
  const [selectedRow, setSelectedRow] = useState({});
  const [showSelected, setShowSelected] = useState({
    row :false
  })

  const columnHeaders = Object.keys(MockData[0]);
  console.log({ columnHeaders })

  console.log(selectedRow)
  const handleRowClick = (row) => {
    setSelectedRow(row);
  }

  const handleToggle = () => {
    setShowSelected({
      ...showSelected,
      row: !showSelected.row
    })
  }

  return (
    <div className="App" >
      <div className='flex bg-green-400 items-center justify-center p-2'>
      <TableChartRoundedIcon fontSize='small' /> &nbsp; <h1 className='font-mono font-bold ml-1 mr-1' >React Utility DataGrid </h1> &nbsp;<TableChartRoundedIcon fontSize='small' />
      </div>
      <UtilityDataGrid onRowClick={handleRowClick} pageSize={10} columnHeaders={columnHeaders} rows={MockData} />
      <button className='p-2  bg-gray-300 border rounded disabled:opacity-50' onClick={handleToggle}>{ showSelected.row ? 'Hide' : 'Show' } Selected Row</button> 
      <div>
        
        {/* showing selected row in json format */}
        {showSelected.row && <pre className='text-left'>{JSON.stringify(selectedRow, null, 2)}</pre>}
      </div>
      <footer>
      <div className=' bottom-0 top-[90%]  flex bg-green-400 items-center justify-center p-2'>
      <TableChartRoundedIcon fontSize='small' /> &nbsp; <h1 > </h1> &nbsp;<TableChartRoundedIcon fontSize='small' />
      </div>
      </footer>
    </div>
  );
}

export default App;
