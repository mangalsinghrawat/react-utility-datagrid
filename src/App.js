import './App.css';
import UtilityDataGrid from './components/UtilityDataGrid';
import { MockData } from './utils/MockData';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
function App() {
  const columnHeaders = Object.keys(MockData[0]);
  console.log({ columnHeaders })
  return (
    <div className="App" >
      <div className='flex bg-green-400 items-center justify-center p-2'>
      <TableChartRoundedIcon fontSize='small' /> &nbsp; <h1 className='font-mono font-bold ml-1 mr-1' >React Utility DataGrid </h1> &nbsp;<TableChartRoundedIcon fontSize='small' />
      </div>
      <UtilityDataGrid pageSize={10} columnHeaders={columnHeaders} rows={MockData} />
      <footer>
      <div className=' bottom-0 top-[90%]  flex bg-green-400 items-center justify-center p-2'>
      <TableChartRoundedIcon fontSize='small' /> &nbsp; <h1 > </h1> &nbsp;<TableChartRoundedIcon fontSize='small' />
      </div>
      </footer>
    </div>
  );
}

export default App;
