import * as  ReactDOM from 'react-dom';
import routes from './routes';
import 'antd/dist/antd.css';
import './common/style';

const container = document.getElementById('app');
ReactDOM.render(routes, container);
