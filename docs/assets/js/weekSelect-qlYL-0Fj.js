import { t as e } from "./rolldown-runtime-QGRDbDUS.js";
// node_modules/flatpickr/dist/plugins/weekSelect/weekSelect.js
var t = /* @__PURE__ */ e(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self, n.weekSelect = r());
	})(n, (function() {
		function e(e) {
			try {
				return typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
			} catch {
				return e.target;
			}
		}
		function t() {
			return function(t) {
				function n(n) {
					var r = e(n);
					if (r.classList.contains("flatpickr-day")) for (var i = t.days.childNodes, a = r.$i / 7, o = i[7 * Math.floor(a)].dateObj, s = i[7 * Math.ceil(a + .01) - 1].dateObj, c = i.length; c--;) {
						var l = i[c], u = l.dateObj;
						u > s || u < o ? l.classList.remove("inRange") : l.classList.add("inRange");
					}
				}
				function r() {
					var e = t.latestSelectedDateObj;
					e !== void 0 && e.getMonth() === t.currentMonth && e.getFullYear() === t.currentYear && (t.weekStartDay = t.days.childNodes[7 * Math.floor(t.selectedDateElem.$i / 7)].dateObj, t.weekEndDay = t.days.childNodes[7 * Math.ceil(t.selectedDateElem.$i / 7 + .01) - 1].dateObj);
					for (var n = t.days.childNodes, r = n.length; r--;) {
						var i = n[r].dateObj;
						i >= t.weekStartDay && i <= t.weekEndDay && n[r].classList.add("week", "selected");
					}
				}
				function i() {
					for (var e = t.days.childNodes, n = e.length; n--;) e[n].classList.remove("inRange");
				}
				function a() {
					t.daysContainer !== void 0 && t.daysContainer.addEventListener("mouseover", n);
				}
				function o() {
					t.daysContainer !== void 0 && t.daysContainer.removeEventListener("mouseover", n);
				}
				return {
					onValueUpdate: r,
					onMonthChange: r,
					onYearChange: r,
					onOpen: r,
					onClose: i,
					onParseConfig: function() {
						t.config.mode = "single", t.config.enableTime = !1, t.config.dateFormat = t.config.dateFormat ? t.config.dateFormat : "\\W\\e\\e\\k #W, Y", t.config.altFormat = t.config.altFormat ? t.config.altFormat : "\\W\\e\\e\\k #W, Y";
					},
					onReady: [
						a,
						r,
						function() {
							t.loadedPlugins.push("weekSelect");
						}
					],
					onDestroy: o
				};
			};
		}
		return t;
	}));
}));
export default t();
