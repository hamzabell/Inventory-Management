import Home from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TypesForm from './pages/TypesForm';
import Dashboard from './pages/Dashboard';
import Manage from './pages/Manage';
import './styles/global.scss';
import CustomForm from './pages/CustomForm';
import CustomDataList from './pages/CustomDataList';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="manage" element={<Manage />} />
          <Route path="types" element={<TypesForm />}>
              <Route index  element={<TypesForm />}/>
              <Route path=":id" element={<TypesForm />}/>
          </Route>
          <Route path="customform" element={<CustomForm />} />
          <Route path="customlist" element={<CustomDataList />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
