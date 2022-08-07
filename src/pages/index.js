import {  Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import { debounce } from '../helpers'
import { saveState } from '../browser-storage';


store.subscribe(
    debounce(() => {
        saveState(store.getState());
    })
)

function Index() {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}

export default Index;