import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/app";
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from "react-router-dom";
import { store } from "./store";

import ErrorBoundry from './components/error-boundry/error-boundry'
import ArticlesStoreServices from "./services/articles-store-services";
import { BlogServiceProvider } from "./components/blog-service-context/blog-service-context";

const articlesStoreServices = new ArticlesStoreServices()


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <ErrorBoundry>
      <BlogServiceProvider value={articlesStoreServices}>
        <Router>
          
            <App />
          
        </Router>
      </BlogServiceProvider>
    </ErrorBoundry>
  </Provider>
)