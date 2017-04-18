"use strict";

app.factory("CounterFactory", function($q) {

	const getTime = () => {
		return Date.now();
	}

	return { getTime }

});
