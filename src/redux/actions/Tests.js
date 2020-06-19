export function updateMaterial(data) {
	return {
		type: 'updateMaterial',
		payload: data
	};
}

export function deleteTest(index) {
	console.log('delete called');
	return {
		type: 'deleteTest',
		payload: index
	};
}
