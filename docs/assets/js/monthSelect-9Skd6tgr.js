import { t as e } from "./rolldown-runtime-QGRDbDUS.js";
// node_modules/flatpickr/dist/plugins/monthSelect/index.js
var t = /* @__PURE__ */ e(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self, n.monthSelectPlugin = r());
	})(n, (function() {
		var e = function() {
			return e = Object.assign || function(e) {
				for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
				return e;
			}, e.apply(this, arguments);
		}, t = function(e, t, n) {
			return n.months[t ? "shorthand" : "longhand"][e];
		};
		function n(e) {
			for (; e.firstChild;) e.removeChild(e.firstChild);
		}
		function r(e) {
			try {
				return typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
			} catch {
				return e.target;
			}
		}
		var i = {
			shorthand: !1,
			dateFormat: "F Y",
			altFormat: "F Y",
			theme: "light"
		};
		function a(a) {
			var o = e(e({}, i), a);
			return function(e) {
				e.config.dateFormat = o.dateFormat, e.config.altFormat = o.altFormat;
				var i = { monthsContainer: null };
				function a() {
					if (e.rContainer) {
						n(e.rContainer);
						for (var t = 0; t < e.monthElements.length; t++) {
							var r = e.monthElements[t];
							r.parentNode && r.parentNode.removeChild(r);
						}
					}
				}
				function s() {
					e.rContainer && (i.monthsContainer = e._createElement("div", "flatpickr-monthSelect-months"), i.monthsContainer.tabIndex = -1, c(), e.rContainer.appendChild(i.monthsContainer), e.calendarContainer.classList.add("flatpickr-monthSelect-theme-" + o.theme));
				}
				function c() {
					if (i.monthsContainer) {
						n(i.monthsContainer);
						for (var r = document.createDocumentFragment(), a = 0; a < 12; a++) {
							var s = e.createDay("flatpickr-monthSelect-month", new Date(e.currentYear, a), 0, a);
							s.dateObj.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && s.dateObj.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() && s.classList.add("today"), s.textContent = t(a, o.shorthand, e.l10n), s.addEventListener("click", f), r.appendChild(s);
						}
						i.monthsContainer.appendChild(r), e.config.minDate && e.currentYear === e.config.minDate.getFullYear() ? e.prevMonthNav.classList.add("flatpickr-disabled") : e.prevMonthNav.classList.remove("flatpickr-disabled"), e.config.maxDate && e.currentYear === e.config.maxDate.getFullYear() ? e.nextMonthNav.classList.add("flatpickr-disabled") : e.nextMonthNav.classList.remove("flatpickr-disabled");
					}
				}
				function l() {
					e._bind(e.prevMonthNav, "click", function(t) {
						t.preventDefault(), t.stopPropagation(), e.changeYear(e.currentYear - 1), d(), c();
					}), e._bind(e.nextMonthNav, "click", function(t) {
						t.preventDefault(), t.stopPropagation(), e.changeYear(e.currentYear + 1), d(), c();
					}), e._bind(i.monthsContainer, "mouseover", function(t) {
						e.config.mode === "range" && e.onMouseOver(r(t), "flatpickr-monthSelect-month");
					});
				}
				function u() {
					if (e.rContainer && e.selectedDates.length) {
						for (var t = e.rContainer.querySelectorAll(".flatpickr-monthSelect-month.selected"), n = 0; n < t.length; n++) t[n].classList.remove("selected");
						var r = e.selectedDates[0].getMonth(), i = e.rContainer.querySelector(".flatpickr-monthSelect-month:nth-child(" + (r + 1) + ")");
						i && i.classList.add("selected");
					}
				}
				function d() {
					var t = e.selectedDates[0];
					t && (t = new Date(t), t.setFullYear(e.currentYear), e.config.minDate && t < e.config.minDate && (t = e.config.minDate), e.config.maxDate && t > e.config.maxDate && (t = e.config.maxDate), e.currentYear = t.getFullYear()), e.currentYearElement.value = String(e.currentYear), e.rContainer && e.rContainer.querySelectorAll(".flatpickr-monthSelect-month").forEach(function(t) {
						t.dateObj.setFullYear(e.currentYear), e.config.minDate && t.dateObj < e.config.minDate || e.config.maxDate && t.dateObj > e.config.maxDate ? t.classList.add("flatpickr-disabled") : t.classList.remove("flatpickr-disabled");
					}), u();
				}
				function f(t) {
					t.preventDefault(), t.stopPropagation();
					var n = r(t);
					if (n instanceof Element && !n.classList.contains("flatpickr-disabled") && !n.classList.contains("notAllowed") && (p(n.dateObj), e.config.closeOnSelect)) {
						var i = e.config.mode === "single", a = e.config.mode === "range" && e.selectedDates.length === 2;
						(i || a) && e.close();
					}
				}
				function p(t) {
					var n = new Date(e.currentYear, t.getMonth(), t.getDate()), r = [];
					switch (e.config.mode) {
						case "single":
							r = [n];
							break;
						case "multiple":
							r.push(n);
							break;
						case "range": e.selectedDates.length === 2 ? r = [n] : (r = e.selectedDates.concat([n]), r.sort(function(e, t) {
							return e.getTime() - t.getTime();
						}));
					}
					e.setDate(r, !0), u();
				}
				var m = {
					37: -1,
					39: 1,
					40: 3,
					38: -3
				};
				function h(t, n, r, a) {
					var o = m[a.keyCode] !== void 0;
					if ((o || a.keyCode === 13) && e.rContainer && i.monthsContainer) {
						var s = e.rContainer.querySelector(".flatpickr-monthSelect-month.selected"), c = Array.prototype.indexOf.call(i.monthsContainer.children, document.activeElement);
						if (c === -1) {
							var l = s || i.monthsContainer.firstElementChild;
							l.focus(), c = l.$i;
						}
						o ? i.monthsContainer.children[(12 + c + m[a.keyCode]) % 12].focus() : a.keyCode === 13 && i.monthsContainer.contains(document.activeElement) && p(document.activeElement.dateObj);
					}
				}
				function g() {
					e.config?.mode === "range" && e.selectedDates.length === 1 && e.clear(!1), e.selectedDates.length || c();
				}
				function _() {
					o._stubbedCurrentMonth = e._initialDate.getMonth(), e._initialDate.setMonth(o._stubbedCurrentMonth), e.currentMonth = o._stubbedCurrentMonth;
				}
				function v() {
					o._stubbedCurrentMonth && (e._initialDate.setMonth(o._stubbedCurrentMonth), e.currentMonth = o._stubbedCurrentMonth, delete o._stubbedCurrentMonth);
				}
				function y() {
					if (i.monthsContainer !== null) for (var e = i.monthsContainer.querySelectorAll(".flatpickr-monthSelect-month"), t = 0; t < e.length; t++) e[t].removeEventListener("click", f);
				}
				return {
					onParseConfig: function() {
						e.config.enableTime = !1;
					},
					onValueUpdate: u,
					onKeyDown: h,
					onReady: [
						_,
						a,
						s,
						l,
						u,
						function() {
							e.config.onClose.push(g), e.loadedPlugins.push("monthSelect");
						}
					],
					onDestroy: [
						v,
						y,
						function() {
							e.config.onClose = e.config.onClose.filter(function(e) {
								return e !== g;
							});
						}
					]
				};
			};
		}
		return a;
	}));
}));
export default t();
