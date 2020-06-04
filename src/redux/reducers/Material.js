const Material = (state = {}, action) => {
	switch (action.type) {
		case 'updateMaterial':
			state = { ...action.payload };
			break;
	}
	return state;
};

export default Material;
