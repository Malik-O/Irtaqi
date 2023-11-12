export function vec2(x, y) {
	"worklet";
	return { x, y };
}
export function curve(c1, c2, to) {
	"worklet";
	return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
}
