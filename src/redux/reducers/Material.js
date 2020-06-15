const Material = (state = { tests: [] }, action) => {
	state = { ...state };
	switch (action.type) {
		case 'updateMaterial':
			state = { ...action.payload };
			break;
		case 'deleteTest':
			state.tests.splice(action.payload, 1);
			state.tests = [ ...state.tests ];
			console.log('state adter delete ', state.tests);
			break;
		default:
			break;
	}
	return state;
};

export default Material;
