const TestSeries = (state = { testSeries: [] }, action) => {
	state = { ...state };
	switch (action.type) {
		case 'updateMaterial':
			state.testSeries = [ ...action.payload ];
			break;
		case 'deleteTest':
			state.testSeries.splice(action.payload, 1); //Removing a test
			state.testSeries = [ ...state.testSeries ];
			break;
		default:
			break;
	}
	console.log('reducer test:', state);
	return state;
};

export default TestSeries;
