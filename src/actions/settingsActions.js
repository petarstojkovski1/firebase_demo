import {
	DISABLE_BALANCE_ON_ADD,
	DISABLE_BALANCE_ON_EDIT,
	ALLOW_REGISTRATION,
} from './types';

export const setDisableBalanceOnAdd = () => {
	//get settings from localStorage
	const settings = JSON.parse(localStorage.getItem('settings'));

	settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

	//SET back to localStorage
	localStorage.setItem('settings', JSON.stringify(settings));

	return {
		type: DISABLE_BALANCE_ON_ADD,
		payload: settings.disableBalanceOnAdd,
	};
};

export const setDisableBalanceOnEdit = () => {
	//get settings from localStorage
	const settings = JSON.parse(localStorage.getItem('settings'));

	settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

	//SET back to localStorage
	localStorage.setItem('settings', JSON.stringify(settings));

	return {
		type: DISABLE_BALANCE_ON_EDIT,
		payload: settings.disableBalanceOnEdit,
	};
};

export const setAllowRegistration = () => {
	//get settings from localStorage
	const settings = JSON.parse(localStorage.getItem('settings'));

	settings.allowRegistration = !settings.allowRegistration;

	//SET back to localStorage
	localStorage.setItem('settings', JSON.stringify(settings));
	return {
		type: ALLOW_REGISTRATION,
		payload: settings.allowRegistration,
	};
};
