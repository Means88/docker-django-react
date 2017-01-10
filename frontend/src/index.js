/* global __PRODUCTION__:true */
import './index.html';
import './index.less';
import dva from 'dva';
import { browserHistory, hashHistory } from 'dva/router';
import createLogger from 'redux-logger';

let config = {
};

if (__PRODUCTION__) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};
  config = {
    history: browserHistory,
  };
} else {
  config = {
    history: hashHistory,
    onAction: createLogger()
  };
  console.log('__PRODUCTION__: %s', __PRODUCTION__);
}

// 1. Initialize
const app = dva(config);

// 2. Plugins
//app.use({});

// 3. Model
//app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
