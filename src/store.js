import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// Reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
	apiKey: 'AIzaSyDk_OS-7KP3-8ZDea5h2hUsPG9aGP-FTdI',
	authDomain: 'react-client-panel-4465f.firebaseapp.com',
	databaseURL: 'https://react-client-panel-4465f.firebaseio.com',
	projectId: 'react-client-panel-4465f',
	storageBucket: 'react-client-panel-4465f.appspot.com',
	messagingSenderId: '240679758904',
};

// react-redux-firebase config
const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

//Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
	reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	notify: notifyReducer,
	settings: settingsReducer,
});

// CHeck for settings in localStorage
if (localStorage.getItem('settings') == null) {
	//Default settings
	const defaultSettings = {
		disableBalanceOnAdd: false,
		disableBalanceOnEdit: false,
		allowRegistration: true,
	};

	//set to localStorage
	localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// Create initial state
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };

const store = createStoreWithFirebase(
	rootReducer,
	initialState,
	compose(
		reactReduxFirebase(firebase),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
