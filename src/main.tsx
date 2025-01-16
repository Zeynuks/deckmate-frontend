import './styles/index.css';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './App';
import { initHistory } from './utils/history.ts';
import store from './store/store';

const root = createRoot(document.getElementById('root')!);
//TODO: Придумать как убрать затычку as never
root.render(
    <Provider store={store}>
        <App history={initHistory(store as never)}/>
    </Provider>
);
