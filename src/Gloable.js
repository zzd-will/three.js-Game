export var COLORS = {
	red: 0xCC463D,
	pureRed: 0xff0000,
	white: 0xd8d0d1,
	brown: 0x59332e,
	pink: 0xf39ab7,
	brownDark: 0x23190f,
	blue: 0x009FF7,
	yellow: 0xFFBE00,
	pureWhite: 0xffffff,
	orange: 0xf7aa6c,
	orangeDark: 0xFF8C00,
	black: 0x000000,
	cream: 0xF5F5F5,
	green: 0x2C9F67,
	lightBlue: 0xD1EEEE,
	cyan: 0x93e4ce,
	yellowBrown: 0xffcf8b,
	purple: 0x8a9ad6
};
export var BOTTLE = {
	// bodyWidth: 2.8,
	// bodyDepth: 2.8,
	headRadius: 0.945,
	bodyWidth: 2.34,
	bodyDepth: 2.34,

	bodyHeight: 3.2,

	reduction: 0.005,
	minScale: 0.5,
	velocityYIncrement: 15,
	velocityY: 135,
	velocityZIncrement: 70
};
export var BLOCK = {
	radius: 5,
	width: 10,
	minRadiusScale: 0.8,
	maxRadiusScale: 1,
	height: 5.5,
	radiusSegments: [4, 50],
	floatHeight: 0,
	minDistance: 1,
	maxDistance: 17,
	minScale: BOTTLE.minScale,
	reduction: BOTTLE.reduction,
	moveDownVelocity: 0.07,
	fullHeight: 5.5 / 21 * 40
};