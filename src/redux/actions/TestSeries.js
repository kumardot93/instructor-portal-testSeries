export function updateMaterial(data) {
	return {
		type: 'updateMaterial',
		payload: data
	};
}

export function deleteTestSeries(index) {
	console.log('delete called');
	return {
		type: 'deleteTest',
		payload: index
	};
}
