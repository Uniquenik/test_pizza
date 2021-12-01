import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

/*دع هذا الرمز محميًا من جميع أنواع الأخطاء ، واعمل بسرعة وبشكل مثالي. آمين*/



ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
