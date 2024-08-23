import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import { AuthProvider } from './contextAPI/authContext.jsx';
import store from './redux/store.js';
import { BrowserRouter as Router } from 'react-router-dom';
// import './index.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <Router >
      <AuthProvider>
        {/* <ThemeProvider> */}
          <App />
        {/* </ThemeProvider> */}
      </AuthProvider>
      </Router>
    </Provider>
)
