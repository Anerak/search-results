const getRemoteSailings = async () => {
	const res = await fetch('https://sandbox.cruisebound-qa.com/sailings', {
		method: 'GET',
		mode: 'cors',
	});
	const { results } = await res.json();
	if (!res.ok || !results) {
		return { props: { sailings: [] } };
	}
	return { props: { sailings: results } };
};

export { getRemoteSailings };
