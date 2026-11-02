// node_modules/flatpickr/dist/esm/types/options.js
var e = [
	"onChange",
	"onClose",
	"onDayCreate",
	"onDestroy",
	"onKeyDown",
	"onMonthChange",
	"onOpen",
	"onParseConfig",
	"onReady",
	"onValueUpdate",
	"onYearChange",
	"onPreCalendarPosition"
], t = {
	_disable: [],
	allowInput: !1,
	allowInvalidPreload: !1,
	altFormat: "F j, Y",
	altInput: !1,
	altInputClass: "form-control input",
	animate: typeof window == "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
	ariaDateFormat: "F j, Y",
	autoFillDefaultTime: !0,
	clickOpens: !0,
	closeOnSelect: !0,
	conjunction: ", ",
	dateFormat: "Y-m-d",
	defaultHour: 12,
	defaultMinute: 0,
	defaultSeconds: 0,
	disable: [],
	disableMobile: !1,
	enableSeconds: !1,
	enableTime: !1,
	errorHandler: function(e) {
		return typeof console < "u" && console.warn(e);
	},
	getWeek: function(e) {
		var t = new Date(e.getTime());
		t.setHours(0, 0, 0, 0), t.setDate(t.getDate() + 3 - (t.getDay() + 6) % 7);
		var n = new Date(t.getFullYear(), 0, 4);
		return 1 + Math.round(((t.getTime() - n.getTime()) / 864e5 - 3 + (n.getDay() + 6) % 7) / 7);
	},
	hourIncrement: 1,
	ignoredFocusElements: [],
	inline: !1,
	locale: "default",
	minuteIncrement: 5,
	mode: "single",
	monthSelectorType: "dropdown",
	nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
	noCalendar: !1,
	now: /* @__PURE__ */ new Date(),
	onChange: [],
	onClose: [],
	onDayCreate: [],
	onDestroy: [],
	onKeyDown: [],
	onMonthChange: [],
	onOpen: [],
	onParseConfig: [],
	onReady: [],
	onValueUpdate: [],
	onYearChange: [],
	onPreCalendarPosition: [],
	plugins: [],
	position: "auto",
	positionElement: void 0,
	prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
	shorthandCurrentMonth: !1,
	showMonths: 1,
	static: !1,
	time_24hr: !1,
	weekNumbers: !1,
	wrap: !1
}, n = {
	weekdays: {
		shorthand: [
			"Sun",
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat"
		],
		longhand: [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		]
	},
	months: {
		shorthand: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		],
		longhand: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		]
	},
	daysInMonth: [
		31,
		28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	],
	firstDayOfWeek: 0,
	ordinal: function(e) {
		var t = e % 100;
		if (t > 3 && t < 21) return "th";
		switch (t % 10) {
			case 1: return "st";
			case 2: return "nd";
			case 3: return "rd";
			default: return "th";
		}
	},
	rangeSeparator: " to ",
	weekAbbreviation: "Wk",
	scrollTitle: "Scroll to increment",
	toggleTitle: "Click to toggle",
	amPM: ["AM", "PM"],
	yearAriaLabel: "Year",
	monthAriaLabel: "Month",
	hourAriaLabel: "Hour",
	minuteAriaLabel: "Minute",
	time_24hr: !1
}, r = function(e, t) {
	return t === void 0 && (t = 2), ("000" + e).slice(t * -1);
}, i = function(e) {
	return +(e === !0);
};
function a(e, t) {
	var n;
	return function() {
		var r = this, i = arguments;
		clearTimeout(n), n = setTimeout(function() {
			return e.apply(r, i);
		}, t);
	};
}
var o = function(e) {
	return e instanceof Array ? e : [e];
};
// node_modules/flatpickr/dist/esm/utils/dom.js
function s(e, t, n) {
	if (n === !0) return e.classList.add(t);
	e.classList.remove(t);
}
function c(e, t, n) {
	var r = window.document.createElement(e);
	return t ||= "", n ||= "", r.className = t, n !== void 0 && (r.textContent = n), r;
}
function l(e) {
	for (; e.firstChild;) e.removeChild(e.firstChild);
}
function u(e, t) {
	if (t(e)) return e;
	if (e.parentNode) return u(e.parentNode, t);
}
function d(e, t) {
	var n = c("div", "numInputWrapper"), r = c("input", "numInput " + e), i = c("span", "arrowUp"), a = c("span", "arrowDown");
	if (navigator.userAgent.indexOf("MSIE 9.0") === -1 ? r.type = "number" : (r.type = "text", r.pattern = "\\d*"), t !== void 0) for (var o in t) r.setAttribute(o, t[o]);
	return n.appendChild(r), n.appendChild(i), n.appendChild(a), n;
}
function f(e) {
	try {
		return typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
	} catch {
		return e.target;
	}
}
// node_modules/flatpickr/dist/esm/utils/formatting.js
var p = function() {}, m = function(e, t, n) {
	return n.months[t ? "shorthand" : "longhand"][e];
}, h = {
	D: p,
	F: function(e, t, n) {
		e.setMonth(n.months.longhand.indexOf(t));
	},
	G: function(e, t) {
		e.setHours((e.getHours() >= 12 ? 12 : 0) + parseFloat(t));
	},
	H: function(e, t) {
		e.setHours(parseFloat(t));
	},
	J: function(e, t) {
		e.setDate(parseFloat(t));
	},
	K: function(e, t, n) {
		e.setHours(e.getHours() % 12 + 12 * i(new RegExp(n.amPM[1], "i").test(t)));
	},
	M: function(e, t, n) {
		e.setMonth(n.months.shorthand.indexOf(t));
	},
	S: function(e, t) {
		e.setSeconds(parseFloat(t));
	},
	U: function(e, t) {
		return /* @__PURE__ */ new Date(parseFloat(t) * 1e3);
	},
	W: function(e, t, n) {
		var r = parseInt(t), i = new Date(e.getFullYear(), 0, 2 + (r - 1) * 7, 0, 0, 0, 0);
		return i.setDate(i.getDate() - i.getDay() + n.firstDayOfWeek), i;
	},
	Y: function(e, t) {
		e.setFullYear(parseFloat(t));
	},
	Z: function(e, t) {
		return new Date(t);
	},
	d: function(e, t) {
		e.setDate(parseFloat(t));
	},
	h: function(e, t) {
		e.setHours((e.getHours() >= 12 ? 12 : 0) + parseFloat(t));
	},
	i: function(e, t) {
		e.setMinutes(parseFloat(t));
	},
	j: function(e, t) {
		e.setDate(parseFloat(t));
	},
	l: p,
	m: function(e, t) {
		e.setMonth(parseFloat(t) - 1);
	},
	n: function(e, t) {
		e.setMonth(parseFloat(t) - 1);
	},
	s: function(e, t) {
		e.setSeconds(parseFloat(t));
	},
	u: function(e, t) {
		return new Date(parseFloat(t));
	},
	w: p,
	y: function(e, t) {
		e.setFullYear(2e3 + parseFloat(t));
	}
}, g = {
	D: "",
	F: "",
	G: "(\\d\\d|\\d)",
	H: "(\\d\\d|\\d)",
	J: "(\\d\\d|\\d)\\w+",
	K: "",
	M: "",
	S: "(\\d\\d|\\d)",
	U: "(.+)",
	W: "(\\d\\d|\\d)",
	Y: "(\\d{4})",
	Z: "(.+)",
	d: "(\\d\\d|\\d)",
	h: "(\\d\\d|\\d)",
	i: "(\\d\\d|\\d)",
	j: "(\\d\\d|\\d)",
	l: "",
	m: "(\\d\\d|\\d)",
	n: "(\\d\\d|\\d)",
	s: "(\\d\\d|\\d)",
	u: "(.+)",
	w: "(\\d\\d|\\d)",
	y: "(\\d{2})"
}, _ = {
	Z: function(e) {
		return e.toISOString();
	},
	D: function(e, t, n) {
		return t.weekdays.shorthand[_.w(e, t, n)];
	},
	F: function(e, t, n) {
		return m(_.n(e, t, n) - 1, !1, t);
	},
	G: function(e, t, n) {
		return r(_.h(e, t, n));
	},
	H: function(e) {
		return r(e.getHours());
	},
	J: function(e, t) {
		return t.ordinal === void 0 ? e.getDate() : e.getDate() + t.ordinal(e.getDate());
	},
	K: function(e, t) {
		return t.amPM[i(e.getHours() > 11)];
	},
	M: function(e, t) {
		return m(e.getMonth(), !0, t);
	},
	S: function(e) {
		return r(e.getSeconds());
	},
	U: function(e) {
		return e.getTime() / 1e3;
	},
	W: function(e, t, n) {
		return n.getWeek(e);
	},
	Y: function(e) {
		return r(e.getFullYear(), 4);
	},
	d: function(e) {
		return r(e.getDate());
	},
	h: function(e) {
		return e.getHours() % 12 ? e.getHours() % 12 : 12;
	},
	i: function(e) {
		return r(e.getMinutes());
	},
	j: function(e) {
		return e.getDate();
	},
	l: function(e, t) {
		return t.weekdays.longhand[e.getDay()];
	},
	m: function(e) {
		return r(e.getMonth() + 1);
	},
	n: function(e) {
		return e.getMonth() + 1;
	},
	s: function(e) {
		return e.getSeconds();
	},
	u: function(e) {
		return e.getTime();
	},
	w: function(e) {
		return e.getDay();
	},
	y: function(e) {
		return String(e.getFullYear()).substring(2);
	}
}, v = function(e) {
	var r = e.config, i = r === void 0 ? t : r, a = e.l10n, o = a === void 0 ? n : a, s = e.isMobile, c = s !== void 0 && s;
	return function(e, t, n) {
		var r = n || o;
		return i.formatDate !== void 0 && !c ? i.formatDate(e, t, r) : t.split("").map(function(t, n, a) {
			return _[t] && a[n - 1] !== "\\" ? _[t](e, r, i) : t === "\\" ? "" : t;
		}).join("");
	};
}, y = function(e) {
	var r = e.config, i = r === void 0 ? t : r, a = e.l10n, o = a === void 0 ? n : a;
	return function(e, n, r, a) {
		if (e === 0 || e) {
			var s = a || o, c, l = e;
			if (e instanceof Date) c = new Date(e.getTime());
			else if (typeof e != "string" && e.toFixed !== void 0) c = new Date(e);
			else if (typeof e == "string") {
				var u = n || (i || t).dateFormat, d = String(e).trim();
				if (d === "today") c = /* @__PURE__ */ new Date(), r = !0;
				else if (i && i.parseDate) c = i.parseDate(e, u);
				else if (/Z$/.test(d) || /GMT$/.test(d)) c = new Date(e);
				else {
					for (var f = void 0, p = [], m = 0, _ = 0, v = ""; m < u.length; m++) {
						var y = u[m], b = y === "\\", x = u[m - 1] === "\\" || b;
						if (g[y] && !x) {
							v += g[y];
							var S = new RegExp(v).exec(e);
							S && (f = !0) && p[y === "Y" ? "unshift" : "push"]({
								fn: h[y],
								val: S[++_]
							});
						} else b || (v += ".");
					}
					c = !i || !i.noCalendar ? new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)), p.forEach(function(e) {
						var t = e.fn, n = e.val;
						return c = t(c, n, s) || c;
					}), c = f ? c : void 0;
				}
			}
			if (!(c instanceof Date && !isNaN(c.getTime()))) i.errorHandler(/* @__PURE__ */ Error("Invalid date provided: " + l));
			else return r === !0 && c.setHours(0, 0, 0, 0), c;
		}
	};
};
function b(e, t, n) {
	return n === void 0 && (n = !0), n === !1 ? e.getTime() - t.getTime() : new Date(e.getTime()).setHours(0, 0, 0, 0) - new Date(t.getTime()).setHours(0, 0, 0, 0);
}
var x = function(e, t, n) {
	return e > Math.min(t, n) && e < Math.max(t, n);
}, S = function(e, t, n) {
	return e * 3600 + t * 60 + n;
}, ee = function(e) {
	var t = Math.floor(e / 3600), n = (e - t * 3600) / 60;
	return [
		t,
		n,
		e - t * 3600 - n * 60
	];
}, te = { DAY: 864e5 };
function C(e) {
	var t = e.defaultHour, n = e.defaultMinute, r = e.defaultSeconds;
	if (e.minDate !== void 0) {
		var i = e.minDate.getHours(), a = e.minDate.getMinutes(), o = e.minDate.getSeconds();
		t < i && (t = i), t === i && n < a && (n = a), t === i && n === a && r < o && (r = e.minDate.getSeconds());
	}
	if (e.maxDate !== void 0) {
		var s = e.maxDate.getHours(), c = e.maxDate.getMinutes();
		t = Math.min(t, s), t === s && (n = Math.min(c, n)), t === s && n === c && (r = e.maxDate.getSeconds());
	}
	return {
		hours: t,
		minutes: n,
		seconds: r
	};
}
// node_modules/flatpickr/dist/esm/utils/polyfills.js
typeof Object.assign != "function" && (Object.assign = function(e) {
	var t = [...arguments].slice(1);
	if (!e) throw TypeError("Cannot convert undefined or null to object");
	for (var n = function(t) {
		t && Object.keys(t).forEach(function(n) {
			return e[n] = t[n];
		});
	}, r = 0, i = t; r < i.length; r++) {
		var a = i[r];
		n(a);
	}
	return e;
});
// node_modules/flatpickr/dist/esm/index.js
var w = function() {
	return w = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, w.apply(this, arguments);
}, ne = function() {
	for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
	for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++) r[i] = a[o];
	return r;
}, re = 300;
function ie(p, h) {
	var _ = {
		config: w(w({}, t), E.defaultConfig),
		l10n: n
	};
	_.parseDate = y({
		config: _.config,
		l10n: _.l10n
	}), _._handlers = [], _.pluginElements = [], _.loadedPlugins = [], _._bind = j, _._setHoursFromDate = k, _._positionCalendar = q, _.changeMonth = B, _.changeYear = U, _.clear = we, _.close = Te, _.onMouseOver = K, _._createElement = c, _.createDay = P, _.destroy = Ee, _.isEnabled = W, _.jumpToDate = M, _.updateValue = $, _.open = Ae, _.redraw = Le, _.set = ze, _.setDate = Ve, _.toggle = qe;
	function ie() {
		_.utils = { getDaysInMonth: function(e, t) {
			return e === void 0 && (e = _.currentMonth), t === void 0 && (t = _.currentYear), e === 1 && (t % 4 == 0 && t % 100 != 0 || t % 400 == 0) ? 29 : _.l10n.daysInMonth[e];
		} };
	}
	function T() {
		_.element = _.input = p, _.isOpen = !1, Me(), Pe(), We(), Ue(), ie(), _.isMobile || me(), fe(), (_.selectedDates.length || _.config.noCalendar) && (_.config.enableTime && k(_.config.noCalendar ? _.latestSelectedDateObj : void 0), $(!1)), se();
		var e = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		!_.isMobile && e && q(), X("onReady");
	}
	function ae() {
		return (_.calendarContainer?.getRootNode()).activeElement || document.activeElement;
	}
	function oe(e) {
		return e.bind(_);
	}
	function se() {
		var e = _.config;
		(e.weekNumbers !== !1 || e.showMonths !== 1) && e.noCalendar !== !0 && window.requestAnimationFrame(function() {
			if (_.calendarContainer !== void 0 && (_.calendarContainer.style.visibility = "hidden", _.calendarContainer.style.display = "block"), _.daysContainer !== void 0) {
				var t = (_.days.offsetWidth + 1) * e.showMonths;
				_.daysContainer.style.width = t + "px", _.calendarContainer.style.width = t + (_.weekWrapper === void 0 ? 0 : _.weekWrapper.offsetWidth) + "px", _.calendarContainer.style.removeProperty("visibility"), _.calendarContainer.style.removeProperty("display");
			}
		});
	}
	function D(e) {
		if (_.selectedDates.length === 0) {
			var t = _.config.minDate === void 0 || b(/* @__PURE__ */ new Date(), _.config.minDate) >= 0 ? /* @__PURE__ */ new Date() : new Date(_.config.minDate.getTime()), n = C(_.config);
			t.setHours(n.hours, n.minutes, n.seconds, t.getMilliseconds()), _.selectedDates = [t], _.latestSelectedDateObj = t;
		}
		e !== void 0 && e.type !== "blur" && Qe(e);
		var r = _._input.value;
		O(), $(), _._input.value !== r && _._debouncedChange();
	}
	function ce(e, t) {
		return e % 12 + 12 * i(t === _.l10n.amPM[1]);
	}
	function le(e) {
		switch (e % 24) {
			case 0:
			case 12: return 12;
			default: return e % 12;
		}
	}
	function O() {
		if (_.hourElement !== void 0 && _.minuteElement !== void 0) {
			var e = (parseInt(_.hourElement.value.slice(-2), 10) || 0) % 24, t = (parseInt(_.minuteElement.value, 10) || 0) % 60, n = _.secondElement === void 0 ? 0 : (parseInt(_.secondElement.value, 10) || 0) % 60;
			_.amPM !== void 0 && (e = ce(e, _.amPM.textContent));
			var r = _.config.minTime !== void 0 || _.config.minDate && _.minDateHasTime && _.latestSelectedDateObj && b(_.latestSelectedDateObj, _.config.minDate, !0) === 0, i = _.config.maxTime !== void 0 || _.config.maxDate && _.maxDateHasTime && _.latestSelectedDateObj && b(_.latestSelectedDateObj, _.config.maxDate, !0) === 0;
			if (_.config.maxTime !== void 0 && _.config.minTime !== void 0 && _.config.minTime > _.config.maxTime) {
				var a = S(_.config.minTime.getHours(), _.config.minTime.getMinutes(), _.config.minTime.getSeconds()), o = S(_.config.maxTime.getHours(), _.config.maxTime.getMinutes(), _.config.maxTime.getSeconds()), s = S(e, t, n);
				if (s > o && s < a) {
					var c = ee(a);
					e = c[0], t = c[1], n = c[2];
				}
			} else {
				if (i) {
					var l = _.config.maxTime === void 0 ? _.config.maxDate : _.config.maxTime;
					e = Math.min(e, l.getHours()), e === l.getHours() && (t = Math.min(t, l.getMinutes())), t === l.getMinutes() && (n = Math.min(n, l.getSeconds()));
				}
				if (r) {
					var u = _.config.minTime === void 0 ? _.config.minDate : _.config.minTime;
					e = Math.max(e, u.getHours()), e === u.getHours() && t < u.getMinutes() && (t = u.getMinutes()), t === u.getMinutes() && (n = Math.max(n, u.getSeconds()));
				}
			}
			A(e, t, n);
		}
	}
	function k(e) {
		var t = e || _.latestSelectedDateObj;
		t && t instanceof Date && A(t.getHours(), t.getMinutes(), t.getSeconds());
	}
	function A(e, t, n) {
		_.latestSelectedDateObj !== void 0 && _.latestSelectedDateObj.setHours(e % 24, t, n || 0, 0), _.hourElement && _.minuteElement && !_.isMobile && (_.hourElement.value = r(_.config.time_24hr ? e : (12 + e) % 12 + 12 * i(e % 12 == 0)), _.minuteElement.value = r(t), _.amPM !== void 0 && (_.amPM.textContent = _.l10n.amPM[i(e >= 12)]), _.secondElement !== void 0 && (_.secondElement.value = r(n)));
	}
	function ue(e) {
		var t = f(e), n = parseInt(t.value) + (e.delta || 0);
		(n / 1e3 > 1 || e.key === "Enter" && !/[^\d]/.test(n.toString())) && U(n);
	}
	function j(e, t, n, r) {
		if (t instanceof Array) return t.forEach(function(t) {
			return j(e, t, n, r);
		});
		if (e instanceof Array) return e.forEach(function(e) {
			return j(e, t, n, r);
		});
		e.addEventListener(t, n, r), _._handlers.push({ remove: function() {
			return e.removeEventListener(t, n, r);
		} });
	}
	function de() {
		X("onChange");
	}
	function fe() {
		if (_.config.wrap && [
			"open",
			"close",
			"toggle",
			"clear"
		].forEach(function(e) {
			Array.prototype.forEach.call(_.element.querySelectorAll("[data-" + e + "]"), function(t) {
				return j(t, "click", _[e]);
			});
		}), _.isMobile) Ke();
		else {
			var e = a(ke, 50);
			_._debouncedChange = a(de, re), _.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && j(_.daysContainer, "mouseover", function(e) {
				_.config.mode === "range" && K(f(e));
			}), j(_._input, "keydown", Oe), _.calendarContainer !== void 0 && j(_.calendarContainer, "keydown", Oe), !_.config.inline && !_.config.static && j(window, "resize", e), window.ontouchstart === void 0 ? j(window.document, "mousedown", H) : j(window.document, "touchstart", H), j(window.document, "focus", H, { capture: !0 }), _.config.clickOpens === !0 && (j(_._input, "focus", _.open), j(_._input, "click", _.open)), _.daysContainer !== void 0 && (j(_.monthNav, "click", Ze), j(_.monthNav, ["keyup", "increment"], ue), j(_.daysContainer, "click", Re)), _.timeContainer !== void 0 && _.minuteElement !== void 0 && _.hourElement !== void 0 && (j(_.timeContainer, ["increment"], D), j(_.timeContainer, "blur", D, { capture: !0 }), j(_.timeContainer, "click", pe), j([_.hourElement, _.minuteElement], ["focus", "click"], function(e) {
				return f(e).select();
			}), _.secondElement !== void 0 && j(_.secondElement, "focus", function() {
				return _.secondElement && _.secondElement.select();
			}), _.amPM !== void 0 && j(_.amPM, "click", function(e) {
				D(e);
			})), _.config.allowInput && j(_._input, "blur", De);
		}
	}
	function M(e, t) {
		var n = e === void 0 ? _.latestSelectedDateObj || (_.config.minDate && _.config.minDate > _.now ? _.config.minDate : _.config.maxDate && _.config.maxDate < _.now ? _.config.maxDate : _.now) : _.parseDate(e), r = _.currentYear, i = _.currentMonth;
		try {
			n !== void 0 && (_.currentYear = n.getFullYear(), _.currentMonth = n.getMonth());
		} catch (e) {
			e.message = "Invalid date supplied: " + n, _.config.errorHandler(e);
		}
		t && _.currentYear !== r && (X("onYearChange"), z()), t && (_.currentYear !== r || _.currentMonth !== i) && X("onMonthChange"), _.redraw();
	}
	function pe(e) {
		var t = f(e);
		~t.className.indexOf("arrow") && N(e, t.classList.contains("arrowUp") ? 1 : -1);
	}
	function N(e, t, n) {
		var r = e && f(e), i = n || r && r.parentNode && r.parentNode.firstChild, a = Z("increment");
		a.delta = t, i && i.dispatchEvent(a);
	}
	function me() {
		var e = window.document.createDocumentFragment();
		if (_.calendarContainer = c("div", "flatpickr-calendar"), _.calendarContainer.tabIndex = -1, !_.config.noCalendar) {
			if (e.appendChild(ye()), _.innerContainer = c("div", "flatpickr-innerContainer"), _.config.weekNumbers) {
				var t = Ce(), n = t.weekWrapper, r = t.weekNumbers;
				_.innerContainer.appendChild(n), _.weekNumbers = r, _.weekWrapper = n;
			}
			_.rContainer = c("div", "flatpickr-rContainer"), _.rContainer.appendChild(xe()), _.daysContainer || (_.daysContainer = c("div", "flatpickr-days"), _.daysContainer.tabIndex = -1), R(), _.rContainer.appendChild(_.daysContainer), _.innerContainer.appendChild(_.rContainer), e.appendChild(_.innerContainer);
		}
		_.config.enableTime && e.appendChild(be()), s(_.calendarContainer, "rangeMode", _.config.mode === "range"), s(_.calendarContainer, "animate", _.config.animate === !0), s(_.calendarContainer, "multiMonth", _.config.showMonths > 1), _.calendarContainer.appendChild(e);
		var i = _.config.appendTo !== void 0 && _.config.appendTo.nodeType !== void 0;
		if ((_.config.inline || _.config.static) && (_.calendarContainer.classList.add(_.config.inline ? "inline" : "static"), _.config.inline && (!i && _.element.parentNode ? _.element.parentNode.insertBefore(_.calendarContainer, _._input.nextSibling) : _.config.appendTo !== void 0 && _.config.appendTo.appendChild(_.calendarContainer)), _.config.static)) {
			var a = c("div", "flatpickr-wrapper");
			_.element.parentNode && _.element.parentNode.insertBefore(a, _.element), a.appendChild(_.element), _.altInput && a.appendChild(_.altInput), a.appendChild(_.calendarContainer);
		}
		!_.config.static && !_.config.inline && (_.config.appendTo === void 0 ? window.document.body : _.config.appendTo).appendChild(_.calendarContainer);
	}
	function P(e, t, n, r) {
		var i = W(t, !0), a = c("span", e, t.getDate().toString());
		return a.dateObj = t, a.$i = r, a.setAttribute("aria-label", _.formatDate(t, _.config.ariaDateFormat)), e.indexOf("hidden") === -1 && b(t, _.now) === 0 && (_.todayDateElem = a, a.classList.add("today"), a.setAttribute("aria-current", "date")), i ? (a.tabIndex = -1, Je(t) && (a.classList.add("selected"), _.selectedDateElem = a, _.config.mode === "range" && (s(a, "startRange", _.selectedDates[0] && b(t, _.selectedDates[0], !0) === 0), s(a, "endRange", _.selectedDates[1] && b(t, _.selectedDates[1], !0) === 0), e === "nextMonthDay" && a.classList.add("inRange")))) : a.classList.add("flatpickr-disabled"), _.config.mode === "range" && Ye(t) && !Je(t) && a.classList.add("inRange"), _.weekNumbers && _.config.showMonths === 1 && e !== "prevMonthDay" && r % 7 == 6 && _.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + _.config.getWeek(t) + "</span>"), X("onDayCreate", a), a;
	}
	function F(e) {
		e.focus(), _.config.mode === "range" && K(e);
	}
	function I(e) {
		for (var t = e > 0 ? 0 : _.config.showMonths - 1, n = e > 0 ? _.config.showMonths : -1, r = t; r != n; r += e) for (var i = _.daysContainer.children[r], a = e > 0 ? 0 : i.children.length - 1, o = e > 0 ? i.children.length : -1, s = a; s != o; s += e) {
			var c = i.children[s];
			if (c.className.indexOf("hidden") === -1 && W(c.dateObj)) return c;
		}
	}
	function he(e, t) {
		for (var n = e.className.indexOf("Month") === -1 ? e.dateObj.getMonth() : _.currentMonth, r = t > 0 ? _.config.showMonths : -1, i = t > 0 ? 1 : -1, a = n - _.currentMonth; a != r; a += i) for (var o = _.daysContainer.children[a], s = n - _.currentMonth === a ? e.$i + t : t < 0 ? o.children.length - 1 : 0, c = o.children.length, l = s; l >= 0 && l < c && l != (t > 0 ? c : -1); l += i) {
			var u = o.children[l];
			if (u.className.indexOf("hidden") === -1 && W(u.dateObj) && Math.abs(e.$i - l) >= Math.abs(t)) return F(u);
		}
		_.changeMonth(i), L(I(i), 0);
	}
	function L(e, t) {
		var n = ae(), r = G(n || document.body), i = e === void 0 ? r ? n : _.selectedDateElem !== void 0 && G(_.selectedDateElem) ? _.selectedDateElem : _.todayDateElem !== void 0 && G(_.todayDateElem) ? _.todayDateElem : I(t > 0 ? 1 : -1) : e;
		i === void 0 ? _._input.focus() : r ? he(i, t) : F(i);
	}
	function ge(e, t) {
		for (var n = (new Date(e, t, 1).getDay() - _.l10n.firstDayOfWeek + 7) % 7, r = _.utils.getDaysInMonth((t - 1 + 12) % 12, e), i = _.utils.getDaysInMonth(t, e), a = window.document.createDocumentFragment(), o = _.config.showMonths > 1, s = o ? "prevMonthDay hidden" : "prevMonthDay", l = o ? "nextMonthDay hidden" : "nextMonthDay", u = r + 1 - n, d = 0; u <= r; u++, d++) a.appendChild(P("flatpickr-day " + s, new Date(e, t - 1, u), u, d));
		for (u = 1; u <= i; u++, d++) a.appendChild(P("flatpickr-day", new Date(e, t, u), u, d));
		for (var f = i + 1; f <= 42 - n && (_.config.showMonths === 1 || d % 7 != 0); f++, d++) a.appendChild(P("flatpickr-day " + l, new Date(e, t + 1, f % i), f, d));
		var p = c("div", "dayContainer");
		return p.appendChild(a), p;
	}
	function R() {
		if (_.daysContainer !== void 0) {
			l(_.daysContainer), _.weekNumbers && l(_.weekNumbers);
			for (var e = document.createDocumentFragment(), t = 0; t < _.config.showMonths; t++) {
				var n = new Date(_.currentYear, _.currentMonth, 1);
				n.setMonth(_.currentMonth + t), e.appendChild(ge(n.getFullYear(), n.getMonth()));
			}
			_.daysContainer.appendChild(e), _.days = _.daysContainer.firstChild, _.config.mode === "range" && _.selectedDates.length === 1 && K();
		}
	}
	function z() {
		if (!(_.config.showMonths > 1 || _.config.monthSelectorType !== "dropdown")) {
			var e = function(e) {
				return _.config.minDate !== void 0 && _.currentYear === _.config.minDate.getFullYear() && e < _.config.minDate.getMonth() ? !1 : !(_.config.maxDate !== void 0 && _.currentYear === _.config.maxDate.getFullYear() && e > _.config.maxDate.getMonth());
			};
			_.monthsDropdownContainer.tabIndex = -1, _.monthsDropdownContainer.innerHTML = "";
			for (var t = 0; t < 12; t++) if (e(t)) {
				var n = c("option", "flatpickr-monthDropdown-month");
				n.value = new Date(_.currentYear, t).getMonth().toString(), n.textContent = m(t, _.config.shorthandCurrentMonth, _.l10n), n.tabIndex = -1, _.currentMonth === t && (n.selected = !0), _.monthsDropdownContainer.appendChild(n);
			}
		}
	}
	function _e() {
		var e = c("div", "flatpickr-month"), t = window.document.createDocumentFragment(), n;
		_.config.showMonths > 1 || _.config.monthSelectorType === "static" ? n = c("span", "cur-month") : (_.monthsDropdownContainer = c("select", "flatpickr-monthDropdown-months"), _.monthsDropdownContainer.setAttribute("aria-label", _.l10n.monthAriaLabel), j(_.monthsDropdownContainer, "change", function(e) {
			var t = f(e), n = parseInt(t.value, 10);
			_.changeMonth(n - _.currentMonth), X("onMonthChange");
		}), z(), n = _.monthsDropdownContainer);
		var r = d("cur-year", { tabindex: "-1" }), i = r.getElementsByTagName("input")[0];
		i.setAttribute("aria-label", _.l10n.yearAriaLabel), _.config.minDate && i.setAttribute("min", _.config.minDate.getFullYear().toString()), _.config.maxDate && (i.setAttribute("max", _.config.maxDate.getFullYear().toString()), i.disabled = !!_.config.minDate && _.config.minDate.getFullYear() === _.config.maxDate.getFullYear());
		var a = c("div", "flatpickr-current-month");
		return a.appendChild(n), a.appendChild(r), t.appendChild(a), e.appendChild(t), {
			container: e,
			yearElement: i,
			monthElement: n
		};
	}
	function ve() {
		l(_.monthNav), _.monthNav.appendChild(_.prevMonthNav), _.config.showMonths && (_.yearElements = [], _.monthElements = []);
		for (var e = _.config.showMonths; e--;) {
			var t = _e();
			_.yearElements.push(t.yearElement), _.monthElements.push(t.monthElement), _.monthNav.appendChild(t.container);
		}
		_.monthNav.appendChild(_.nextMonthNav);
	}
	function ye() {
		return _.monthNav = c("div", "flatpickr-months"), _.yearElements = [], _.monthElements = [], _.prevMonthNav = c("span", "flatpickr-prev-month"), _.prevMonthNav.innerHTML = _.config.prevArrow, _.nextMonthNav = c("span", "flatpickr-next-month"), _.nextMonthNav.innerHTML = _.config.nextArrow, ve(), Object.defineProperty(_, "_hidePrevMonthArrow", {
			get: function() {
				return _.__hidePrevMonthArrow;
			},
			set: function(e) {
				_.__hidePrevMonthArrow !== e && (s(_.prevMonthNav, "flatpickr-disabled", e), _.__hidePrevMonthArrow = e);
			}
		}), Object.defineProperty(_, "_hideNextMonthArrow", {
			get: function() {
				return _.__hideNextMonthArrow;
			},
			set: function(e) {
				_.__hideNextMonthArrow !== e && (s(_.nextMonthNav, "flatpickr-disabled", e), _.__hideNextMonthArrow = e);
			}
		}), _.currentYearElement = _.yearElements[0], Q(), _.monthNav;
	}
	function be() {
		_.calendarContainer.classList.add("hasTime"), _.config.noCalendar && _.calendarContainer.classList.add("noCalendar");
		var e = C(_.config);
		_.timeContainer = c("div", "flatpickr-time"), _.timeContainer.tabIndex = -1;
		var t = c("span", "flatpickr-time-separator", ":"), n = d("flatpickr-hour", { "aria-label": _.l10n.hourAriaLabel });
		_.hourElement = n.getElementsByTagName("input")[0];
		var a = d("flatpickr-minute", { "aria-label": _.l10n.minuteAriaLabel });
		if (_.minuteElement = a.getElementsByTagName("input")[0], _.hourElement.tabIndex = _.minuteElement.tabIndex = -1, _.hourElement.value = r(_.latestSelectedDateObj ? _.latestSelectedDateObj.getHours() : _.config.time_24hr ? e.hours : le(e.hours)), _.minuteElement.value = r(_.latestSelectedDateObj ? _.latestSelectedDateObj.getMinutes() : e.minutes), _.hourElement.setAttribute("step", _.config.hourIncrement.toString()), _.minuteElement.setAttribute("step", _.config.minuteIncrement.toString()), _.hourElement.setAttribute("min", _.config.time_24hr ? "0" : "1"), _.hourElement.setAttribute("max", _.config.time_24hr ? "23" : "12"), _.hourElement.setAttribute("maxlength", "2"), _.minuteElement.setAttribute("min", "0"), _.minuteElement.setAttribute("max", "59"), _.minuteElement.setAttribute("maxlength", "2"), _.timeContainer.appendChild(n), _.timeContainer.appendChild(t), _.timeContainer.appendChild(a), _.config.time_24hr && _.timeContainer.classList.add("time24hr"), _.config.enableSeconds) {
			_.timeContainer.classList.add("hasSeconds");
			var o = d("flatpickr-second");
			_.secondElement = o.getElementsByTagName("input")[0], _.secondElement.value = r(_.latestSelectedDateObj ? _.latestSelectedDateObj.getSeconds() : e.seconds), _.secondElement.setAttribute("step", _.minuteElement.getAttribute("step")), _.secondElement.setAttribute("min", "0"), _.secondElement.setAttribute("max", "59"), _.secondElement.setAttribute("maxlength", "2"), _.timeContainer.appendChild(c("span", "flatpickr-time-separator", ":")), _.timeContainer.appendChild(o);
		}
		return _.config.time_24hr || (_.amPM = c("span", "flatpickr-am-pm", _.l10n.amPM[i((_.latestSelectedDateObj ? _.hourElement.value : _.config.defaultHour) > 11)]), _.amPM.title = _.l10n.toggleTitle, _.amPM.tabIndex = -1, _.timeContainer.appendChild(_.amPM)), _.timeContainer;
	}
	function xe() {
		_.weekdayContainer ? l(_.weekdayContainer) : _.weekdayContainer = c("div", "flatpickr-weekdays");
		for (var e = _.config.showMonths; e--;) {
			var t = c("div", "flatpickr-weekdaycontainer");
			_.weekdayContainer.appendChild(t);
		}
		return Se(), _.weekdayContainer;
	}
	function Se() {
		if (_.weekdayContainer) {
			var e = _.l10n.firstDayOfWeek, t = ne(_.l10n.weekdays.shorthand);
			e > 0 && e < t.length && (t = ne(t.splice(e, t.length), t.splice(0, e)));
			for (var n = _.config.showMonths; n--;) _.weekdayContainer.children[n].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + t.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
		}
	}
	function Ce() {
		_.calendarContainer.classList.add("hasWeeks");
		var e = c("div", "flatpickr-weekwrapper");
		e.appendChild(c("span", "flatpickr-weekday", _.l10n.weekAbbreviation));
		var t = c("div", "flatpickr-weeks");
		return e.appendChild(t), {
			weekWrapper: e,
			weekNumbers: t
		};
	}
	function B(e, t) {
		t === void 0 && (t = !0);
		var n = t ? e : e - _.currentMonth;
		n < 0 && _._hidePrevMonthArrow === !0 || n > 0 && _._hideNextMonthArrow === !0 || (_.currentMonth += n, (_.currentMonth < 0 || _.currentMonth > 11) && (_.currentYear += _.currentMonth > 11 ? 1 : -1, _.currentMonth = (_.currentMonth + 12) % 12, X("onYearChange"), z()), R(), X("onMonthChange"), Q());
	}
	function we(e, t) {
		if (e === void 0 && (e = !0), t === void 0 && (t = !0), _.input.value = "", _.altInput !== void 0 && (_.altInput.value = ""), _.mobileInput !== void 0 && (_.mobileInput.value = ""), _.selectedDates = [], _.latestSelectedDateObj = void 0, t === !0 && (_.currentYear = _._initialDate.getFullYear(), _.currentMonth = _._initialDate.getMonth()), _.config.enableTime === !0) {
			var n = C(_.config), r = n.hours, i = n.minutes, a = n.seconds;
			A(r, i, a);
		}
		_.redraw(), e && X("onChange");
	}
	function Te() {
		_.isOpen = !1, _.isMobile || (_.calendarContainer !== void 0 && _.calendarContainer.classList.remove("open"), _._input !== void 0 && _._input.classList.remove("active")), X("onClose");
	}
	function Ee() {
		_.config !== void 0 && X("onDestroy");
		for (var e = _._handlers.length; e--;) _._handlers[e].remove();
		if (_._handlers = [], _.mobileInput) _.mobileInput.parentNode && _.mobileInput.parentNode.removeChild(_.mobileInput), _.mobileInput = void 0;
		else if (_.calendarContainer && _.calendarContainer.parentNode) {
			if (_.config.static && _.calendarContainer.parentNode) {
				var t = _.calendarContainer.parentNode;
				if (t.lastChild && t.removeChild(t.lastChild), t.parentNode) {
					for (; t.firstChild;) t.parentNode.insertBefore(t.firstChild, t);
					t.parentNode.removeChild(t);
				}
			} else _.calendarContainer.parentNode.removeChild(_.calendarContainer);
		}
		_.altInput && (_.input.type = "text", _.altInput.parentNode && _.altInput.parentNode.removeChild(_.altInput), delete _.altInput), _.input && (_.input.type = _.input._type, _.input.classList.remove("flatpickr-input"), _.input.removeAttribute("readonly")), (/* @__PURE__ */ "_showTimeInput.latestSelectedDateObj._hideNextMonthArrow._hidePrevMonthArrow.__hideNextMonthArrow.__hidePrevMonthArrow.isMobile.isOpen.selectedDateElem.minDateHasTime.maxDateHasTime.days.daysContainer._input._positionElement.innerContainer.rContainer.monthNav.todayDateElem.calendarContainer.weekdayContainer.prevMonthNav.nextMonthNav.monthsDropdownContainer.currentMonthElement.currentYearElement.navigationCurrentMonth.selectedDateElem.config".split(".")).forEach(function(e) {
			try {
				delete _[e];
			} catch {}
		});
	}
	function V(e) {
		return _.calendarContainer.contains(e);
	}
	function H(e) {
		if (_.isOpen && !_.config.inline) {
			var t = f(e), n = V(t), r = !(t === _.input || t === _.altInput || _.element.contains(t) || e.path && e.path.indexOf && (~e.path.indexOf(_.input) || ~e.path.indexOf(_.altInput))) && !n && !V(e.relatedTarget), i = !_.config.ignoredFocusElements.some(function(e) {
				return e.contains(t);
			});
			r && i && (_.config.allowInput && _.setDate(_._input.value, !1, _.config.altInput ? _.config.altFormat : _.config.dateFormat), _.timeContainer !== void 0 && _.minuteElement !== void 0 && _.hourElement !== void 0 && _.input.value !== "" && _.input.value !== void 0 && D(), _.close(), _.config && _.config.mode === "range" && _.selectedDates.length === 1 && _.clear(!1));
		}
	}
	function U(e) {
		if (!(!e || _.config.minDate && e < _.config.minDate.getFullYear() || _.config.maxDate && e > _.config.maxDate.getFullYear())) {
			var t = e, n = _.currentYear !== t;
			_.currentYear = t || _.currentYear, _.config.maxDate && _.currentYear === _.config.maxDate.getFullYear() ? _.currentMonth = Math.min(_.config.maxDate.getMonth(), _.currentMonth) : _.config.minDate && _.currentYear === _.config.minDate.getFullYear() && (_.currentMonth = Math.max(_.config.minDate.getMonth(), _.currentMonth)), n && (_.redraw(), X("onYearChange"), z());
		}
	}
	function W(e, t) {
		t === void 0 && (t = !0);
		var n = _.parseDate(e, void 0, t);
		if (_.config.minDate && n && b(n, _.config.minDate, t === void 0 ? !_.minDateHasTime : t) < 0 || _.config.maxDate && n && b(n, _.config.maxDate, t === void 0 ? !_.maxDateHasTime : t) > 0) return !1;
		if (!_.config.enable && _.config.disable.length === 0) return !0;
		if (n === void 0) return !1;
		for (var r = !!_.config.enable, i = _.config.enable ?? _.config.disable, a = 0, o = void 0; a < i.length; a++) {
			if (o = i[a], typeof o == "function" && o(n) || o instanceof Date && n !== void 0 && o.getTime() === n.getTime()) return r;
			if (typeof o == "string") {
				var s = _.parseDate(o, void 0, !0);
				return s && s.getTime() === n.getTime() ? r : !r;
			}
			if (typeof o == "object" && n !== void 0 && o.from && o.to && n.getTime() >= o.from.getTime() && n.getTime() <= o.to.getTime()) return r;
		}
		return !r;
	}
	function G(e) {
		return _.daysContainer !== void 0 && e.className.indexOf("hidden") === -1 && e.className.indexOf("flatpickr-disabled") === -1 && _.daysContainer.contains(e);
	}
	function De(e) {
		var t = e.target === _._input, n = _._input.value.trimEnd() !== Xe();
		t && n && !(e.relatedTarget && V(e.relatedTarget)) && _.setDate(_._input.value, !0, e.target === _.altInput ? _.config.altFormat : _.config.dateFormat);
	}
	function Oe(e) {
		var t = f(e), n = _.config.wrap ? p.contains(t) : t === _._input, r = _.config.allowInput, i = _.isOpen && (!r || !n), a = _.config.inline && n && !r;
		if (e.keyCode === 13 && n) {
			if (r) return _.setDate(_._input.value, !0, t === _.altInput ? _.config.altFormat : _.config.dateFormat), _.close(), t.blur();
			_.open();
		} else if (V(t) || i || a) {
			var o = !!_.timeContainer && _.timeContainer.contains(t);
			switch (e.keyCode) {
				case 13:
					o ? (e.preventDefault(), D(), J()) : Re(e);
					break;
				case 27:
					e.preventDefault(), J();
					break;
				case 8:
				case 46:
					n && !_.config.allowInput && (e.preventDefault(), _.clear());
					break;
				case 37:
				case 39:
					if (!o && !n) {
						e.preventDefault();
						var s = ae();
						if (_.daysContainer !== void 0 && (r === !1 || s && G(s))) {
							var c = e.keyCode === 39 ? 1 : -1;
							e.ctrlKey ? (e.stopPropagation(), B(c), L(I(1), 0)) : L(void 0, c);
						}
					} else _.hourElement && _.hourElement.focus();
					break;
				case 38:
				case 40:
					e.preventDefault();
					var l = e.keyCode === 40 ? 1 : -1;
					_.daysContainer && t.$i !== void 0 || t === _.input || t === _.altInput ? e.ctrlKey ? (e.stopPropagation(), U(_.currentYear - l), L(I(1), 0)) : o || L(void 0, l * 7) : t === _.currentYearElement ? U(_.currentYear - l) : _.config.enableTime && (!o && _.hourElement && _.hourElement.focus(), D(e), _._debouncedChange());
					break;
				case 9: if (o) {
					var u = [
						_.hourElement,
						_.minuteElement,
						_.secondElement,
						_.amPM
					].concat(_.pluginElements).filter(function(e) {
						return e;
					}), d = u.indexOf(t);
					if (d !== -1) {
						var m = u[d + (e.shiftKey ? -1 : 1)];
						e.preventDefault(), (m || _._input).focus();
					}
				} else !_.config.noCalendar && _.daysContainer && _.daysContainer.contains(t) && e.shiftKey && (e.preventDefault(), _._input.focus());
			}
		}
		if (_.amPM !== void 0 && t === _.amPM) switch (e.key) {
			case _.l10n.amPM[0].charAt(0):
			case _.l10n.amPM[0].charAt(0).toLowerCase():
				_.amPM.textContent = _.l10n.amPM[0], O(), $();
				break;
			case _.l10n.amPM[1].charAt(0):
			case _.l10n.amPM[1].charAt(0).toLowerCase(): _.amPM.textContent = _.l10n.amPM[1], O(), $();
		}
		(n || V(t)) && X("onKeyDown", e);
	}
	function K(e, t) {
		if (t === void 0 && (t = "flatpickr-day"), !(_.selectedDates.length !== 1 || e && (!e.classList.contains(t) || e.classList.contains("flatpickr-disabled")))) {
			for (var n = e ? e.dateObj.getTime() : _.days.firstElementChild.dateObj.getTime(), r = _.parseDate(_.selectedDates[0], void 0, !0).getTime(), i = Math.min(n, _.selectedDates[0].getTime()), a = Math.max(n, _.selectedDates[0].getTime()), o = !1, s = 0, c = 0, l = i; l < a; l += te.DAY) W(new Date(l), !0) || (o ||= l > i && l < a, l < r && (!s || l > s) ? s = l : l > r && (!c || l < c) && (c = l));
			Array.from(_.rContainer.querySelectorAll("*:nth-child(-n+" + _.config.showMonths + ") > ." + t)).forEach(function(t) {
				var i = t.dateObj.getTime(), a = s > 0 && i < s || c > 0 && i > c;
				a ? (t.classList.add("notAllowed"), [
					"inRange",
					"startRange",
					"endRange"
				].forEach(function(e) {
					t.classList.remove(e);
				})) : (!o || a) && ([
					"startRange",
					"inRange",
					"endRange",
					"notAllowed"
				].forEach(function(e) {
					t.classList.remove(e);
				}), e !== void 0 && (e.classList.add(n <= _.selectedDates[0].getTime() ? "startRange" : "endRange"), r < n && i === r ? t.classList.add("startRange") : r > n && i === r && t.classList.add("endRange"), i >= s && (c === 0 || i <= c) && x(i, r, n) && t.classList.add("inRange")));
			});
		}
	}
	function ke() {
		_.isOpen && !_.config.static && !_.config.inline && q();
	}
	function Ae(e, t) {
		if (t === void 0 && (t = _._positionElement), _.isMobile === !0) {
			if (e) {
				e.preventDefault();
				var n = f(e);
				n && n.blur();
			}
			_.mobileInput !== void 0 && (_.mobileInput.focus(), _.mobileInput.click()), X("onOpen");
		} else if (!(_._input.disabled || _.config.inline)) {
			var r = _.isOpen;
			_.isOpen = !0, r || (_.calendarContainer.classList.add("open"), _._input.classList.add("active"), X("onOpen"), q(t)), _.config.enableTime === !0 && _.config.noCalendar === !0 && (_.config.allowInput !== !1 || e !== void 0 && _.timeContainer.contains(e.relatedTarget) || setTimeout(function() {
				return _.hourElement.select();
			}, 50));
		}
	}
	function je(e) {
		return function(t) {
			var n = _.config["_" + e + "Date"] = _.parseDate(t, _.config.dateFormat), r = _.config["_" + (e === "min" ? "max" : "min") + "Date"];
			n !== void 0 && (_[e === "min" ? "minDateHasTime" : "maxDateHasTime"] = n.getHours() > 0 || n.getMinutes() > 0 || n.getSeconds() > 0), _.selectedDates && (_.selectedDates = _.selectedDates.filter(function(e) {
				return W(e);
			}), !_.selectedDates.length && e === "min" && k(n), $()), _.daysContainer && (Le(), n === void 0 ? _.currentYearElement.removeAttribute(e) : _.currentYearElement[e] = n.getFullYear().toString(), _.currentYearElement.disabled = !!r && n !== void 0 && r.getFullYear() === n.getFullYear());
		};
	}
	function Me() {
		var n = [
			"wrap",
			"weekNumbers",
			"allowInput",
			"allowInvalidPreload",
			"clickOpens",
			"time_24hr",
			"enableTime",
			"noCalendar",
			"altInput",
			"shorthandCurrentMonth",
			"inline",
			"static",
			"enableSeconds",
			"disableMobile"
		], r = w(w({}, JSON.parse(JSON.stringify(p.dataset || {}))), h), i = {};
		_.config.parseDate = r.parseDate, _.config.formatDate = r.formatDate, Object.defineProperty(_.config, "enable", {
			get: function() {
				return _.config._enable;
			},
			set: function(e) {
				_.config._enable = He(e);
			}
		}), Object.defineProperty(_.config, "disable", {
			get: function() {
				return _.config._disable;
			},
			set: function(e) {
				_.config._disable = He(e);
			}
		});
		var a = r.mode === "time";
		if (!r.dateFormat && (r.enableTime || a)) {
			var s = E.defaultConfig.dateFormat || t.dateFormat;
			i.dateFormat = r.noCalendar || a ? "H:i" + (r.enableSeconds ? ":S" : "") : s + " H:i" + (r.enableSeconds ? ":S" : "");
		}
		if (r.altInput && (r.enableTime || a) && !r.altFormat) {
			var c = E.defaultConfig.altFormat || t.altFormat;
			i.altFormat = r.noCalendar || a ? "h:i" + (r.enableSeconds ? ":S K" : " K") : c + (" h:i" + (r.enableSeconds ? ":S" : "") + " K");
		}
		Object.defineProperty(_.config, "minDate", {
			get: function() {
				return _.config._minDate;
			},
			set: je("min")
		}), Object.defineProperty(_.config, "maxDate", {
			get: function() {
				return _.config._maxDate;
			},
			set: je("max")
		});
		var l = function(e) {
			return function(t) {
				_.config[e === "min" ? "_minTime" : "_maxTime"] = _.parseDate(t, "H:i:S");
			};
		};
		Object.defineProperty(_.config, "minTime", {
			get: function() {
				return _.config._minTime;
			},
			set: l("min")
		}), Object.defineProperty(_.config, "maxTime", {
			get: function() {
				return _.config._maxTime;
			},
			set: l("max")
		}), r.mode === "time" && (_.config.noCalendar = !0, _.config.enableTime = !0), Object.assign(_.config, i, r);
		for (var u = 0; u < n.length; u++) _.config[n[u]] = _.config[n[u]] === !0 || _.config[n[u]] === "true";
		e.filter(function(e) {
			return _.config[e] !== void 0;
		}).forEach(function(e) {
			_.config[e] = o(_.config[e] || []).map(oe);
		}), _.isMobile = !_.config.disableMobile && !_.config.inline && _.config.mode === "single" && !_.config.disable.length && !_.config.enable && !_.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		for (var u = 0; u < _.config.plugins.length; u++) {
			var d = _.config.plugins[u](_) || {};
			for (var f in d) e.indexOf(f) > -1 ? _.config[f] = o(d[f]).map(oe).concat(_.config[f]) : r[f] === void 0 && (_.config[f] = d[f]);
		}
		r.altInputClass || (_.config.altInputClass = Ne().className + " " + _.config.altInputClass), X("onParseConfig");
	}
	function Ne() {
		return _.config.wrap ? p.querySelector("[data-input]") : p;
	}
	function Pe() {
		typeof _.config.locale != "object" && E.l10ns[_.config.locale] === void 0 && _.config.errorHandler(/* @__PURE__ */ Error("flatpickr: invalid locale " + _.config.locale)), _.l10n = w(w({}, E.l10ns.default), typeof _.config.locale == "object" ? _.config.locale : _.config.locale === "default" ? void 0 : E.l10ns[_.config.locale]), g.D = "(" + _.l10n.weekdays.shorthand.join("|") + ")", g.l = "(" + _.l10n.weekdays.longhand.join("|") + ")", g.M = "(" + _.l10n.months.shorthand.join("|") + ")", g.F = "(" + _.l10n.months.longhand.join("|") + ")", g.K = "(" + _.l10n.amPM[0] + "|" + _.l10n.amPM[1] + "|" + _.l10n.amPM[0].toLowerCase() + "|" + _.l10n.amPM[1].toLowerCase() + ")", w(w({}, h), JSON.parse(JSON.stringify(p.dataset || {}))).time_24hr === void 0 && E.defaultConfig.time_24hr === void 0 && (_.config.time_24hr = _.l10n.time_24hr), _.formatDate = v(_), _.parseDate = y({
			config: _.config,
			l10n: _.l10n
		});
	}
	function q(e) {
		if (typeof _.config.position == "function") _.config.position(_, e);
		else if (_.calendarContainer !== void 0) {
			X("onPreCalendarPosition");
			var t = e || _._positionElement, n = Array.prototype.reduce.call(_.calendarContainer.children, (function(e, t) {
				return e + t.offsetHeight;
			}), 0), r = _.calendarContainer.offsetWidth, i = _.config.position.split(" "), a = i[0], o = i.length > 1 ? i[1] : null, c = t.getBoundingClientRect(), l = window.innerHeight - c.bottom, u = a === "above" || a !== "below" && l < n && c.top > n, d = window.pageYOffset + c.top + (u ? -n - 2 : t.offsetHeight + 2);
			if (s(_.calendarContainer, "arrowTop", !u), s(_.calendarContainer, "arrowBottom", u), !_.config.inline) {
				var f = window.pageXOffset + c.left, p = !1, m = !1;
				o === "center" ? (f -= (r - c.width) / 2, p = !0) : o === "right" && (f -= r - c.width, m = !0), s(_.calendarContainer, "arrowLeft", !p && !m), s(_.calendarContainer, "arrowCenter", p), s(_.calendarContainer, "arrowRight", m);
				var h = window.document.body.offsetWidth - (window.pageXOffset + c.right), g = f + r > window.document.body.offsetWidth, v = h + r > window.document.body.offsetWidth;
				if (s(_.calendarContainer, "rightMost", g), !_.config.static) {
					if (_.calendarContainer.style.top = d + "px", !g) _.calendarContainer.style.left = f + "px", _.calendarContainer.style.right = "auto";
					else if (!v) _.calendarContainer.style.left = "auto", _.calendarContainer.style.right = h + "px";
					else {
						var y = Fe();
						if (y === void 0) return;
						var b = window.document.body.offsetWidth, x = Math.max(0, b / 2 - r / 2), S = ".flatpickr-calendar.centerMost:before", ee = ".flatpickr-calendar.centerMost:after", te = y.cssRules.length, C = "{left:" + c.left + "px;right:auto;}";
						s(_.calendarContainer, "rightMost", !1), s(_.calendarContainer, "centerMost", !0), y.insertRule(S + "," + ee + C, te), _.calendarContainer.style.left = x + "px", _.calendarContainer.style.right = "auto";
					}
				}
			}
		}
	}
	function Fe() {
		for (var e = null, t = 0; t < document.styleSheets.length; t++) {
			var n = document.styleSheets[t];
			if (n.cssRules) {
				try {
					n.cssRules;
				} catch {
					continue;
				}
				e = n;
				break;
			}
		}
		return e ?? Ie();
	}
	function Ie() {
		var e = document.createElement("style");
		return document.head.appendChild(e), e.sheet;
	}
	function Le() {
		_.config.noCalendar || _.isMobile || (z(), Q(), R());
	}
	function J() {
		_._input.focus(), window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0 ? setTimeout(_.close, 0) : _.close();
	}
	function Re(e) {
		e.preventDefault(), e.stopPropagation();
		var t = u(f(e), function(e) {
			return e.classList && e.classList.contains("flatpickr-day") && !e.classList.contains("flatpickr-disabled") && !e.classList.contains("notAllowed");
		});
		if (t !== void 0) {
			var n = t, r = _.latestSelectedDateObj = new Date(n.dateObj.getTime()), i = (r.getMonth() < _.currentMonth || r.getMonth() > _.currentMonth + _.config.showMonths - 1) && _.config.mode !== "range";
			if (_.selectedDateElem = n, _.config.mode === "single") _.selectedDates = [r];
			else if (_.config.mode === "multiple") {
				var a = Je(r);
				a ? _.selectedDates.splice(parseInt(a), 1) : _.selectedDates.push(r);
			} else _.config.mode === "range" && (_.selectedDates.length === 2 && _.clear(!1, !1), _.latestSelectedDateObj = r, _.selectedDates.push(r), b(r, _.selectedDates[0], !0) !== 0 && _.selectedDates.sort(function(e, t) {
				return e.getTime() - t.getTime();
			}));
			if (O(), i) {
				var o = _.currentYear !== r.getFullYear();
				_.currentYear = r.getFullYear(), _.currentMonth = r.getMonth(), o && (X("onYearChange"), z()), X("onMonthChange");
			}
			if (Q(), R(), $(), !i && _.config.mode !== "range" && _.config.showMonths === 1 ? F(n) : _.selectedDateElem !== void 0 && _.hourElement === void 0 && _.selectedDateElem && _.selectedDateElem.focus(), _.hourElement !== void 0 && _.hourElement !== void 0 && _.hourElement.focus(), _.config.closeOnSelect) {
				var s = _.config.mode === "single" && !_.config.enableTime, c = _.config.mode === "range" && _.selectedDates.length === 2 && !_.config.enableTime;
				(s || c) && J();
			}
			de();
		}
	}
	var Y = {
		locale: [Pe, Se],
		showMonths: [
			ve,
			se,
			xe
		],
		minDate: [M],
		maxDate: [M],
		positionElement: [Ge],
		clickOpens: [function() {
			_.config.clickOpens === !0 ? (j(_._input, "focus", _.open), j(_._input, "click", _.open)) : (_._input.removeEventListener("focus", _.open), _._input.removeEventListener("click", _.open));
		}]
	};
	function ze(t, n) {
		if (typeof t == "object" && t) for (var r in Object.assign(_.config, t), t) Y[r] !== void 0 && Y[r].forEach(function(e) {
			return e();
		});
		else _.config[t] = n, Y[t] === void 0 ? e.indexOf(t) > -1 && (_.config[t] = o(n)) : Y[t].forEach(function(e) {
			return e();
		});
		_.redraw(), $(!0);
	}
	function Be(e, t) {
		var n = [];
		if (e instanceof Array) n = e.map(function(e) {
			return _.parseDate(e, t);
		});
		else if (e instanceof Date || typeof e == "number") n = [_.parseDate(e, t)];
		else if (typeof e == "string") switch (_.config.mode) {
			case "single":
			case "time":
				n = [_.parseDate(e, t)];
				break;
			case "multiple":
				n = e.split(_.config.conjunction).map(function(e) {
					return _.parseDate(e, t);
				});
				break;
			case "range": n = e.split(_.l10n.rangeSeparator).map(function(e) {
				return _.parseDate(e, t);
			});
		}
		else _.config.errorHandler(/* @__PURE__ */ Error("Invalid date supplied: " + JSON.stringify(e)));
		_.selectedDates = _.config.allowInvalidPreload ? n : n.filter(function(e) {
			return e instanceof Date && W(e, !1);
		}), _.config.mode === "range" && _.selectedDates.sort(function(e, t) {
			return e.getTime() - t.getTime();
		});
	}
	function Ve(e, t, n) {
		if (t === void 0 && (t = !1), n === void 0 && (n = _.config.dateFormat), e !== 0 && !e || e instanceof Array && e.length === 0) return _.clear(t);
		Be(e, n), _.latestSelectedDateObj = _.selectedDates[_.selectedDates.length - 1], _.redraw(), M(void 0, t), k(), _.selectedDates.length === 0 && _.clear(!1), $(t), t && X("onChange");
	}
	function He(e) {
		return e.slice().map(function(e) {
			return typeof e == "string" || typeof e == "number" || e instanceof Date ? _.parseDate(e, void 0, !0) : e && typeof e == "object" && e.from && e.to ? {
				from: _.parseDate(e.from, void 0),
				to: _.parseDate(e.to, void 0)
			} : e;
		}).filter(function(e) {
			return e;
		});
	}
	function Ue() {
		_.selectedDates = [], _.now = _.parseDate(_.config.now) || /* @__PURE__ */ new Date();
		var e = _.config.defaultDate || ((_.input.nodeName === "INPUT" || _.input.nodeName === "TEXTAREA") && _.input.placeholder && _.input.value === _.input.placeholder ? null : _.input.value);
		e && Be(e, _.config.dateFormat), _._initialDate = _.selectedDates.length > 0 ? _.selectedDates[0] : _.config.minDate && _.config.minDate.getTime() > _.now.getTime() ? _.config.minDate : _.config.maxDate && _.config.maxDate.getTime() < _.now.getTime() ? _.config.maxDate : _.now, _.currentYear = _._initialDate.getFullYear(), _.currentMonth = _._initialDate.getMonth(), _.selectedDates.length > 0 && (_.latestSelectedDateObj = _.selectedDates[0]), _.config.minTime !== void 0 && (_.config.minTime = _.parseDate(_.config.minTime, "H:i")), _.config.maxTime !== void 0 && (_.config.maxTime = _.parseDate(_.config.maxTime, "H:i")), _.minDateHasTime = !!_.config.minDate && (_.config.minDate.getHours() > 0 || _.config.minDate.getMinutes() > 0 || _.config.minDate.getSeconds() > 0), _.maxDateHasTime = !!_.config.maxDate && (_.config.maxDate.getHours() > 0 || _.config.maxDate.getMinutes() > 0 || _.config.maxDate.getSeconds() > 0);
	}
	function We() {
		_.input = Ne(), _.input ? (_.input._type = _.input.type, _.input.type = "text", _.input.classList.add("flatpickr-input"), _._input = _.input, _.config.altInput && (_.altInput = c(_.input.nodeName, _.config.altInputClass), _._input = _.altInput, _.altInput.placeholder = _.input.placeholder, _.altInput.disabled = _.input.disabled, _.altInput.required = _.input.required, _.altInput.tabIndex = _.input.tabIndex, _.altInput.type = "text", _.input.setAttribute("type", "hidden"), !_.config.static && _.input.parentNode && _.input.parentNode.insertBefore(_.altInput, _.input.nextSibling)), _.config.allowInput || _._input.setAttribute("readonly", "readonly"), Ge()) : _.config.errorHandler(/* @__PURE__ */ Error("Invalid input element specified"));
	}
	function Ge() {
		_._positionElement = _.config.positionElement || _._input;
	}
	function Ke() {
		var e = _.config.enableTime ? _.config.noCalendar ? "time" : "datetime-local" : "date";
		_.mobileInput = c("input", _.input.className + " flatpickr-mobile"), _.mobileInput.tabIndex = 1, _.mobileInput.type = e, _.mobileInput.disabled = _.input.disabled, _.mobileInput.required = _.input.required, _.mobileInput.placeholder = _.input.placeholder, _.mobileFormatStr = e === "datetime-local" ? "Y-m-d\\TH:i:S" : e === "date" ? "Y-m-d" : "H:i:S", _.selectedDates.length > 0 && (_.mobileInput.defaultValue = _.mobileInput.value = _.formatDate(_.selectedDates[0], _.mobileFormatStr)), _.config.minDate && (_.mobileInput.min = _.formatDate(_.config.minDate, "Y-m-d")), _.config.maxDate && (_.mobileInput.max = _.formatDate(_.config.maxDate, "Y-m-d")), _.input.getAttribute("step") && (_.mobileInput.step = String(_.input.getAttribute("step"))), _.input.type = "hidden", _.altInput !== void 0 && (_.altInput.type = "hidden");
		try {
			_.input.parentNode && _.input.parentNode.insertBefore(_.mobileInput, _.input.nextSibling);
		} catch {}
		j(_.mobileInput, "change", function(e) {
			_.setDate(f(e).value, !1, _.mobileFormatStr), X("onChange"), X("onClose");
		});
	}
	function qe(e) {
		if (_.isOpen === !0) return _.close();
		_.open(e);
	}
	function X(e, t) {
		if (_.config !== void 0) {
			var n = _.config[e];
			if (n !== void 0 && n.length > 0) for (var r = 0; n[r] && r < n.length; r++) n[r](_.selectedDates, _.input.value, _, t);
			e === "onChange" && (_.input.dispatchEvent(Z("change")), _.input.dispatchEvent(Z("input")));
		}
	}
	function Z(e) {
		var t = document.createEvent("Event");
		return t.initEvent(e, !0, !0), t;
	}
	function Je(e) {
		for (var t = 0; t < _.selectedDates.length; t++) {
			var n = _.selectedDates[t];
			if (n instanceof Date && b(n, e) === 0) return "" + t;
		}
		return !1;
	}
	function Ye(e) {
		return _.config.mode !== "range" || _.selectedDates.length < 2 ? !1 : b(e, _.selectedDates[0]) >= 0 && b(e, _.selectedDates[1]) <= 0;
	}
	function Q() {
		_.config.noCalendar || _.isMobile || !_.monthNav || (_.yearElements.forEach(function(e, t) {
			var n = new Date(_.currentYear, _.currentMonth, 1);
			n.setMonth(_.currentMonth + t), _.config.showMonths > 1 || _.config.monthSelectorType === "static" ? _.monthElements[t].textContent = m(n.getMonth(), _.config.shorthandCurrentMonth, _.l10n) + " " : _.monthsDropdownContainer.value = n.getMonth().toString(), e.value = n.getFullYear().toString();
		}), _._hidePrevMonthArrow = _.config.minDate !== void 0 && (_.currentYear === _.config.minDate.getFullYear() ? _.currentMonth <= _.config.minDate.getMonth() : _.currentYear < _.config.minDate.getFullYear()), _._hideNextMonthArrow = _.config.maxDate !== void 0 && (_.currentYear === _.config.maxDate.getFullYear() ? _.currentMonth + 1 > _.config.maxDate.getMonth() : _.currentYear > _.config.maxDate.getFullYear()));
	}
	function Xe(e) {
		var t = e || (_.config.altInput ? _.config.altFormat : _.config.dateFormat);
		return _.selectedDates.map(function(e) {
			return _.formatDate(e, t);
		}).filter(function(e, t, n) {
			return _.config.mode !== "range" || _.config.enableTime || n.indexOf(e) === t;
		}).join(_.config.mode === "range" ? _.l10n.rangeSeparator : _.config.conjunction);
	}
	function $(e) {
		e === void 0 && (e = !0), _.mobileInput !== void 0 && _.mobileFormatStr && (_.mobileInput.value = _.latestSelectedDateObj === void 0 ? "" : _.formatDate(_.latestSelectedDateObj, _.mobileFormatStr)), _.input.value = Xe(_.config.dateFormat), _.altInput !== void 0 && (_.altInput.value = Xe(_.config.altFormat)), e !== !1 && X("onValueUpdate");
	}
	function Ze(e) {
		var t = f(e), n = _.prevMonthNav.contains(t), r = _.nextMonthNav.contains(t);
		n || r ? B(n ? -1 : 1) : _.yearElements.indexOf(t) >= 0 ? t.select() : t.classList.contains("arrowUp") ? _.changeYear(_.currentYear + 1) : t.classList.contains("arrowDown") && _.changeYear(_.currentYear - 1);
	}
	function Qe(e) {
		e.preventDefault();
		var t = e.type === "keydown", n = f(e), a = n;
		_.amPM !== void 0 && n === _.amPM && (_.amPM.textContent = _.l10n.amPM[i(_.amPM.textContent === _.l10n.amPM[0])]);
		var o = parseFloat(a.getAttribute("min")), s = parseFloat(a.getAttribute("max")), c = parseFloat(a.getAttribute("step")), l = parseInt(a.value, 10), u = l + c * (e.delta || (t ? e.which === 38 ? 1 : -1 : 0));
		if (a.value !== void 0 && a.value.length === 2) {
			var d = a === _.hourElement, p = a === _.minuteElement;
			u < o ? (u = s + u + i(!d) + (i(d) && i(!_.amPM)), p && N(void 0, -1, _.hourElement)) : u > s && (u = a === _.hourElement ? u - s - i(!_.amPM) : o, p && N(void 0, 1, _.hourElement)), _.amPM && d && (c === 1 ? u + l === 23 : Math.abs(u - l) > c) && (_.amPM.textContent = _.l10n.amPM[i(_.amPM.textContent === _.l10n.amPM[0])]), a.value = r(u);
		}
	}
	return T(), _;
}
function T(e, t) {
	for (var n = Array.prototype.slice.call(e).filter(function(e) {
		return e instanceof HTMLElement;
	}), r = [], i = 0; i < n.length; i++) {
		var a = n[i];
		try {
			if (a.getAttribute("data-fp-omit") !== null) continue;
			a._flatpickr !== void 0 && (a._flatpickr.destroy(), a._flatpickr = void 0), a._flatpickr = ie(a, t || {}), r.push(a._flatpickr);
		} catch (e) {
			console.error(e);
		}
	}
	return r.length === 1 ? r[0] : r;
}
typeof HTMLElement < "u" && typeof HTMLCollection < "u" && typeof NodeList < "u" && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(e) {
	return T(this, e);
}, HTMLElement.prototype.flatpickr = function(e) {
	return T([this], e);
});
var E = function(e, t) {
	return typeof e == "string" ? T(window.document.querySelectorAll(e), t) : e instanceof Node ? T([e], t) : T(e, t);
};
E.defaultConfig = {}, E.l10ns = {
	en: w({}, n),
	default: w({}, n)
}, E.localize = function(e) {
	E.l10ns.default = w(w({}, E.l10ns.default), e);
}, E.setDefaults = function(e) {
	E.defaultConfig = w(w({}, E.defaultConfig), e);
}, E.parseDate = y({}), E.formatDate = v({}), E.compareDates = b, typeof jQuery < "u" && jQuery.fn !== void 0 && (jQuery.fn.flatpickr = function(e) {
	return T(this, e);
}), Date.prototype.fp_incr = function(e) {
	return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof e == "string" ? parseInt(e, 10) : e));
}, typeof window < "u" && (window.flatpickr = E);
export { E as default };
