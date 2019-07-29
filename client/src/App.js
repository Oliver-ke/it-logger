import React, { useEffect} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import m from 'materialize-css/dist/js/materialize.min.js';
import './App.css';
import SearchBar from './components/layouts/SearchBar';
import Logs from './components/logs/Logs';
import AddBtn from './components/layouts/AddBtn';
import AddLogModel from './components/logs/AddLogModel';
import EditLogModel from './components/logs/EditLogModel';
import AddTechModel from './components/techs/AddTechModal';
import TechListModal from './components/techs/TechListModel';
import { Provider } from 'react-redux';
import store from './store';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
const App = () => {
	const client = new ApolloClient({
		uri: '/graphql'
	})

	useEffect(() => {
		// materialize javascript
		m.AutoInit();
	});
	return (
		<ApolloProvider client={client}>
				<Provider store={store}>
			<SearchBar />
			<div className="container">
				<AddBtn />
				<AddLogModel />
				<EditLogModel />
				<AddTechModel />
				<TechListModal />
				<Logs />
			</div>
		</Provider>
		</ApolloProvider>
	);
};

export default App;
