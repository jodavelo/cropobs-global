function decimalAdjust(type: string, value: any, exp: number) {
	// Si el exp no está definido o es cero...
	if (typeof exp === 'undefined' || +exp === 0) {
		return Math[type](value);
	}

	value = +value;
	exp = +exp;
	// Si el valor no es un número o el exp no es un entero...
	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
		return NaN;
	}
	// Shift
	value = value.toString().split('e');
	value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
	// Shift back
	value = value.toString().split('e');
	return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

export const commarize = (value: number) => {
	// Alter numbers larger than 1k
	if (value >= 1e3) {
		var units = ["k", "M", "B", "T"];

		var order = Math.floor(Math.log(value) / Math.log(1000));

		var unitname = units[(order - 1)];
		var num = decimalAdjust('round', value / 1000 ** order, -1)

		// output number remainder + unitname
		return num + unitname
	}

	// return formatted original number
	return value.toFixed(2);
}