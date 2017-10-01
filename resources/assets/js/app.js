
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');
require('./utils/brreg');

import 'react-toastify/dist/ReactToastify.min.css';
/**
 * Next, include all page-root views to use throughout the application
 */
/*
require('./components/client/clients-view.jsx'); // views.client.index
require('./components/order/orders-view.jsx'); // views.order.index
require('./components/project/projects-view.jsx'); // views.project.index
require('./components/order/create-order-project-form.jsx');
*/


// Main Container
require('./components/containers/root.jsx');


