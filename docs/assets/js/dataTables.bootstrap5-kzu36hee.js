// node_modules/datatables.net/js/dataTables.mjs
var e = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi, t = /<([^>]*>)/g, n = /* @__PURE__ */ RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"), r = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	isoTimezone: /[T\s]\d{2}.*?(Z|[+-]\d{2}(?::?\d{2})?)$/,
	reDate: /^\d{2,4}[./-]\d{1,2}[./-]\d{1,2}([T ]{1}\d{1,2}[:.]\d{2}([.:]\d{2})?)?$/,
	reFormattedNumeric: e,
	reHtml: t,
	reNewLines: /[\r\n\u2028]/g,
	reRegexCharacters: n
}), i = 2 ** 28, a = function(e, t) {
	if (typeof e != "string") return e;
	var n = e.normalize ? e.normalize("NFD") : e;
	return n.length === e.length ? n : (t === !0 ? e + " " : "") + n.replace(/[\u0300-\u036f]/g, "");
}, o = function(e, n = "") {
	if (!e || typeof e != "string") return e;
	if (e.length > i) throw Error("Exceeded max str len");
	let r, a = e.replace(t, n);
	do
		r = a, a = a.replace(/<script/i, "");
	while (a !== r);
	return r;
}, s = function(e) {
	let t = Array.isArray(e) ? e.join(",") : e;
	return typeof t == "string" ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : t;
};
function c(e) {
	return e.replace(n, "\\$1");
}
function l(e) {
	var t = typeof e;
	if (t === "function") s = e;
	else return t === "string" || Array.isArray(e) ? s(e) : e;
}
function u(e, t) {
	if (typeof e != "function") return a(e, t);
	a = e;
}
function d(e, t) {
	let n = typeof e;
	if (n === "function") o = e;
	else return n === "string" ? o(e, t) : e;
}
var f = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	escapeHtml: l,
	escapeRegex: c,
	normalize: u,
	stripHtml: d
}), p = {};
function m(e) {
	var t = parseInt(e, 10);
	return !isNaN(t) && isFinite(e) ? t : null;
}
function h(e, t) {
	return p[t] || (p[t] = new RegExp(c(t), "g")), typeof e == "string" && t !== "." ? e.replace(/\./g, "").replace(p[t], ".") : e;
}
var g = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	intVal: m,
	numToDecimal: h
});
function _(e) {
	return e && typeof e != "string" && e.length !== void 0 && e.nodeType === void 0;
}
function v(e) {
	return e && typeof e == "object" && e._isDom;
}
function y(e) {
	return e && typeof e == "object" && e.nodeName;
}
function b(e) {
	return !e || e === !0 || e === "-";
}
function x(e) {
	return b(e) || typeof e == "string";
}
function ee(e, t, n, r) {
	return r && b(e) ? !0 : typeof e == "string" && e.match(/<(input|select)/i) ? null : x(e) && C(d(e), t, n, r) ? !0 : null;
}
function S(e) {
	return e && typeof e.jquery == "string";
}
function C(t, n, r, i) {
	let a = typeof t;
	return a === "number" || a === "bigint" || i && b(t) ? !0 : (n && a === "string" && (t = h(t, n)), r && a === "string" && (t = t.replace(e, "")), !isNaN(parseFloat(t)) && isFinite(t));
}
function w(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t === null || t === Object.prototype;
}
var te = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	arrayLike: _,
	dom: v,
	element: y,
	empty: b,
	html: x,
	htmlNum: ee,
	jquery: S,
	num: C,
	plainObject: w
});
function T(e, t) {
	if (!e) return;
	let n = Object.keys(e);
	for (let r = 0; r < n.length; r++) {
		let i = n[r];
		t(i, e[i], r);
	}
}
function E(e, ...t) {
	let n = Object(e);
	for (let e = 0; e < t.length; e++) {
		let r = t[e];
		if (r != null) for (let e in r) {
			let t = r[e];
			e !== "__proto__" && n !== t && t !== void 0 && (n[e] = t);
		}
	}
	return n;
}
function ne(e, ...t) {
	if (!e) return {};
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (r) for (let [t, n] of Object.entries(r)) t !== "__proto__" && (Array.isArray(n) ? (Array.isArray(e[t]) || (e[t] = []), ne(e[t], n)) : w(n) ? (w(e[t]) || (e[t] = {}), ne(e[t], n)) : r[t] !== void 0 && (e[t] = r[t]));
	}
	return e;
}
function re(e, t, n = !1) {
	let r;
	for (let i in t) i !== "__proto__" && Object.prototype.hasOwnProperty.call(t, i) && (r = t[i], w(r) ? (w(e[i]) || (e[i] = {}), re(e[i], r, n)) : e[i] = n && i !== "data" && i !== "aaData" && Array.isArray(r) ? r.slice() : r);
	return e;
}
function ie(e, t) {
	let n = [];
	return T(e, (e, r) => {
		n.push(t(e, r));
	}), n;
}
var ae = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	assign: E,
	assignDeep: ne,
	assignDeepObjects: re,
	each: T,
	map: ie
}), oe, se, ce, le, ue, de, D, O;
function fe() {
	return oe || (typeof globalThis < "u" && globalThis.window ? globalThis.window : typeof window < "u" ? window : {});
}
function k(e, t) {
	var n = typeof e == "string" ? t : e, r = typeof t == "string" ? t : e;
	if (n === void 0 && typeof r == "string") switch (r) {
		case "lib":
		case "jq":
			if (O) return O;
			let e = fe().jQuery;
			return e && e.fn ? e : null;
		case "win": return fe();
		case "doc": return fe().document;
		case "datatable": return D;
		case "datetime": return de;
		case "luxon": return le || fe().luxon || null;
		case "moment": return ue || fe().moment || null;
		case "bootstrap": return se || fe().bootstrap || null;
		case "foundation": return ce || fe().Foundation || null;
		default: return null;
	}
	r === "lib" || r === "jq" || n && n.fn && n.fn.jquery ? (O = n, pe()) : r === "datatable" || n && n.isDataTable ? D = n : r === "win" || n && n.document ? oe = n : r === "datetime" || n && n.type === "DateTime" ? de = n : r === "luxon" || n && n.FixedOffsetZone ? le = n : r === "moment" || n && n.isMoment ? ue = n : r === "bootstrap" || n && n.Modal && n.Modal.NAME === "modal" ? se = n : (r === "foundation" || n && n.Reveal) && (ce = n);
}
function pe() {
	D && O && (D.$ = O, O.fn.dataTable = D, O.fn.DataTable = function(e) {
		return new D(this.toArray(), e);
	}, O.fn.dataTableSettings = D.ext.settings, O.fn.dataTableExt = D.ext, T(D, function(e, t) {
		O.fn.DataTable[e] = t;
	}));
}
var me = {
	cache: !0,
	contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	headers: {},
	traditional: !1,
	url: ""
};
function he(e) {
	let t = new XMLHttpRequest(), n = E({}, me, e), r = be(n), i = ye(n), a = null;
	return n.submitAs === "json" && n.data && (n.data = JSON.stringify(n.data), n.contentType ||= "application/json; charset=utf-8"), t.open(i, n.url + (r ? (n.url.includes("?") ? "&" : "?") + r : ""), !0, n.username || null, n.password || null), n.contentType && !(n.data instanceof FormData) && t.setRequestHeader("Content-Type", n.contentType), n.headers && !n.headers["X-Requested-With"] && !ve(n.url) && (n.headers["X-Requested-With"] = "XMLHttpRequest"), n.dataType === "json" && n.headers && !n.headers.accepts && (n.headers.Accept = "application/json, text/javascript, */*; q=0.01"), T(n.headers, (e, n) => {
		t.setRequestHeader(e, n);
	}), n.data instanceof FormData ? a = n.data : i !== "GET" && n.data && (typeof n.data == "string" ? a = n.data : (a = xe(n.data, n.traditional), a = _e(a, n), n.data = a)), t.onreadystatechange = function() {
		if (t.readyState != 4) return;
		let e = t.responseText, r = "success";
		if (t.status !== 0) {
			if (t.status === 204 || i === "HEAD" ? r = "nocontent" : t.status === 304 ? r = "notmodified" : t.status >= 400 && (r = "error"), n.dataType === "json") try {
				e = JSON.parse(e);
			} catch {
				r = "parsererror";
			}
			else if (!n.dataType) try {
				e = JSON.parse(e);
			} catch {}
			r === "success" || r === "nocontent" ? ge(n.success, e, r, t) : ge(n.error, t, r, t.statusText), ge(n.complete, t, r);
		}
	}, n.beforeSend && n.beforeSend.call(n, t, n) === !1 ? (t.abort(), t) : (t.send(a), t);
}
he.defaults = me, he.serialize = xe;
function ge(e, t, n, r) {
	if (!e) return;
	let i = Array.isArray(e) ? e : [e];
	for (let e = 0; e < i.length; e++) i[e](t, n, r);
}
function _e(e, t) {
	return (t.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 ? e.replace(/%20/g, "+") : e;
}
function ve(e) {
	let t = k("win");
	return new URL(e, t.location.origin).origin !== t.location.origin;
}
function ye(e) {
	let t = "GET";
	return e.type && (t = e.type), e.method && (t = e.method), t.toUpperCase();
}
function be(e) {
	let t = [];
	return ye(e) === "GET" && t.push(xe(e.data, e.traditional)), ye(e) === "DELETE" && (e.deleteBody === void 0 || e.deleteBody === !0) && (t.push(xe(e.data, e.traditional)), delete e.data), e.cache === !1 && t.push(xe({ _: +/* @__PURE__ */ new Date() })), _e(t.filter((e) => !!e).join("&"), e);
}
function xe(e, t = !1) {
	var n = [];
	return e == null ? "" : (Se(n, e, t), n.join("&"));
}
function Se(e, t, n, r = "") {
	let i = Array.isArray(t);
	for (let a in t) {
		let o = t[a], s = Array.isArray(o) || !n && w(o);
		if (r) {
			let e = !i || s ? a : "";
			a = n ? r : r + "[" + e + "]";
		}
		!r && i ? Ce(e, o.name, o.value) : s ? Se(e, o, n, a) : Ce(e, a, o);
	}
}
function Ce(e, t, n) {
	let r = typeof n == "function" ? n() : n;
	e.push(encodeURIComponent(t) + "=" + encodeURIComponent(r === null ? "" : r));
}
function we(e) {
	if (e.length < 2) return !0;
	for (var t = e.slice().sort(), n = t[0], r = 1, i = t.length; r < i; r++) {
		if (t[r] === n) return !1;
		n = t[r];
	}
	return !0;
}
function Te(e, t) {
	if (Array.isArray(t) || _(t)) for (var n = 0; n < t.length; n++) Te(e, t[n]);
	else e.push(t);
	return e;
}
function Ee(e, t) {
	return e.filter((e) => t.includes(e));
}
function A(e, t, n) {
	let r = [], i = 0, a = e.length;
	if (n !== void 0) for (; i < a; i++) e[i] && e[i][t] && r.push(e[i][t][n]);
	else for (; i < a; i++) e[i] && r.push(e[i][t]);
	return r;
}
function De(e, t, n, r) {
	let i = [], a = 0, o = t.length;
	if (r !== void 0) for (; a < o; a++) e[t[a]] && e[t[a]][n] && i.push(e[t[a]][n][r]);
	else for (; a < o; a++) e[t[a]] && i.push(e[t[a]][n]);
	return i;
}
function j(e, t) {
	var n = [], r;
	t === void 0 ? (t = 0, r = e) : (r = t, t = e);
	for (var i = t; i < r; i++) n.push(i);
	return n;
}
function Oe(e) {
	for (var t = [], n = 0, r = e.length; n < r; n++) e[n] && t.push(e[n]);
	return t;
}
function ke(e, t) {
	if (typeof t == "number") return "" + e[t];
	if (t.length === 0) return "";
	let n = "" + e[t[0]];
	for (let r = 1; r < t.length; r++) n += "  " + e[t[r]];
	return n;
}
function Ae(e) {
	if (Array.from && Set) return Array.from(new Set(e));
	if (we(e)) return e.slice();
	var t = [], n, r, i = e.length, a, o = 0;
	again: for (r = 0; r < i; r++) {
		for (n = e[r], a = 0; a < o; a++) if (t[a] === n) continue again;
		t.push(n), o++;
	}
	return t;
}
var je = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	flatten: Te,
	intersection: Ee,
	pluck: A,
	pluckOrder: De,
	range: j,
	removeEmpty: Oe,
	selectiveJoin: ke,
	unique: Ae
}), Me = /\[.*?\]$/, Ne = /\(\)$/;
function Pe(e) {
	return (e.match(/(\\.|[^.])+/g) || [""]).map(function(e) {
		return e.replace(/\\\./g, ".");
	});
}
function Fe(e) {
	if (e === null) return function(e) {
		return e;
	};
	if (typeof e == "function") return function(t, n, r, i) {
		return e(t, n, r, i);
	};
	if (typeof e == "string" && (e.indexOf(".") !== -1 || e.indexOf("[") !== -1 || e.indexOf("(") !== -1)) {
		let t = function(e, n, r) {
			let i, a, o, s;
			if (r !== "") {
				let c = Pe(r);
				for (let r = 0, l = c.length; r < l; r++) {
					if (i = c[r].match(Me), a = c[r].match(Ne), i) {
						if (c[r] = c[r].replace(Me, ""), c[r] !== "" && (e = e[c[r]]), o = [], c.splice(0, r + 1), s = c.join("."), Array.isArray(e)) for (let r = 0, i = e.length; r < i; r++) o.push(t(e[r], n, s));
						let a = i[0].substring(1, i[0].length - 1);
						e = a === "" ? o : o.join(a);
						break;
					}
					if (a) c[r] = c[r].replace(Ne, ""), e = e[c[r]]();
					else {
						if (e === null || e[c[r]] === null) return null;
						if (e === void 0 || e[c[r]] === void 0) return;
						e = e[c[r]];
					}
				}
			}
			return e;
		};
		return function(n, r) {
			return t(n, r, e);
		};
	}
	if (w(e)) {
		let t = {};
		return T(e, function(e, n) {
			n && (t[e] = Fe(n));
		}), function(e, n, r, i) {
			let a = t[n] || t._;
			return a === void 0 ? e : a(e, n, r, i);
		};
	}
	return function(t) {
		return t[e];
	};
}
function Ie(e) {
	if (e === null) return function() {};
	if (typeof e == "function") return function(t, n, r) {
		e(t, "set", n, r);
	};
	if (typeof e == "string" && (e.indexOf(".") !== -1 || e.indexOf("[") !== -1 || e.indexOf("(") !== -1)) {
		let t = function(e, n, r) {
			let i = Pe(r), a, o = i[i.length - 1], s, c, l, u;
			for (let r = 0, o = i.length - 1; r < o; r++) {
				if (i[r] === "__proto__" || i[r] === "constructor") throw Error("Cannot set prototype values");
				if (s = i[r].match(Me), c = i[r].match(Ne), s) {
					if (i[r] = i[r].replace(Me, ""), e[i[r]] = [], a = i.slice(), a.splice(0, r + 1), u = a.join("."), Array.isArray(n)) for (let a = 0, o = n.length; a < o; a++) l = {}, t(l, n[a], u), e[i[r]].push(l);
					else e[i[r]] = n;
					return;
				}
				c && (i[r] = i[r].replace(Ne, ""), e = e[i[r]](n)), (e[i[r]] === null || e[i[r]] === void 0) && (e[i[r]] = {}), e = e[i[r]];
			}
			o.match(Ne) ? e = e[o.replace(Ne, "")](n) : e[o.replace(Me, "")] = n;
		};
		return function(n, r) {
			return t(n, r, e);
		};
	}
	return w(e) ? Ie(e._) : function(t, n) {
		t[e] = n;
	};
}
var Le = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	get: Fe,
	set: Ie
});
function Re(e, t = 250) {
	let n;
	return function(...r) {
		clearTimeout(n), n = setTimeout(() => {
			e.call(this, ...r);
		}, t);
	};
}
function ze(e, t = 200) {
	let n, r;
	return function(...i) {
		let a = +/* @__PURE__ */ new Date();
		n && a < n + t ? (clearTimeout(r), r = setTimeout(() => {
			n = void 0, e.call(this, ...i);
		}, t)) : (n = a, e.call(this, ...i));
	};
}
var Be = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	debounce: Re,
	throttle: ze
});
function Ve(e, t) {
	let n = k("datatable");
	for (var r = t ? t.split(".") : n.ext.version.split("."), i = e.split("."), a, o, s = 0, c = i.length; s < c; s++) if (a = parseInt(r[s], 10) || 0, o = parseInt(i[s], 10) || 0, a !== o) return a > o;
	return !0;
}
var M = {
	ajax: he,
	array: je,
	conv: g,
	data: Le,
	debounce: Re,
	diacritics: u,
	escapeHtml: l,
	escapeRegex: c,
	external: k,
	get: Fe,
	is: te,
	object: ae,
	regex: r,
	set: Ie,
	string: f,
	stripHtml: d,
	throttle: ze,
	timer: Be,
	unique: Ae,
	version: /* @__PURE__ */ Object.freeze({
		__proto__: null,
		check: Ve
	})
}, He = 1, Ue = [];
function We(e) {
	return e._event_uid ||= He++, e._event_uid;
}
function Ge(e) {
	let t = e._event_uid;
	return !t || !Ue[t] ? null : Ue[t];
}
function Ke(e, t) {
	let n = We(e);
	Ue[n] === void 0 && (Ue[n] = []), Ue[n].push(t);
}
function qe(e, t) {
	let n = Ge(e);
	if (!n) return;
	let r = n.indexOf(t);
	r !== -1 && n.splice(r, 1);
}
var Je = [
	"click",
	"dblclick",
	"mousedown",
	"mouseenter",
	"mouseleave",
	"mousemove",
	"mouseout",
	"mouseover",
	"mouseup"
];
function N(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return n;
		}
	});
}
function Ye(e, t, n) {
	let r = Array.from(e.querySelectorAll(t)), i = n.target;
	for (; i && i !== this; i = i.parentNode) for (let e of r) if (e === i) return i;
}
function Xe(e) {
	if (!e) return {
		eventName: null,
		namespaces: []
	};
	let t = e.split("."), n = t.shift(), r = !1, i = !1;
	return n === "mouseenter" ? (n = "mouseover", r = !0) : n === "mouseleave" ? (n = "mouseout", r = !0) : n === "focus" ? (n = "focusin", i = !0) : n === "blur" ? (n = "focusout", i = !0) : n === "ready" && (n = "DOMContentLoaded"), {
		eventName: n,
		isFocus: i,
		isHover: r,
		namespaces: t
	};
}
function Ze(e, t, n, r, i) {
	let a = k("jq"), o = k("doc");
	if (a && e.constructor !== EventTarget) {
		let o = i ? "one" : "on";
		r ? a(e)[o](t, r, n) : a(e)[o](t, n);
		return;
	}
	let { eventName: s, namespaces: c, isFocus: l, isHover: u } = Xe(t);
	if (!s) return;
	if (e === o && s === "DOMContentLoaded" && t.includes("ready") && o.readyState === "complete") {
		n(new Event("DOMContentLoaded"));
		return;
	}
	let d = function(t) {
		let a = e;
		if (t.namespace && !Ee(c, t.namespace.split(".")).length || !r && (l && t.target !== e || u && t.relatedTarget && e.contains(t.relatedTarget))) return;
		if (r) {
			let n = Ye(e, r, t);
			if (!n || u && t.relatedTarget && n.contains(t.relatedTarget)) return;
			a = n;
		}
		N(t, "currentTarget", a), N(t, "delegateTarget", e), N(t, "relatedTarget", t.relatedTarget);
		let o = n.apply(a, [t, ...t._args || []]);
		i && Qe(e, s, n, r), o === !1 && (t.preventDefault(), t.stopPropagation()), t.result = o;
	};
	d.delegateSelector = r, d.original = n, d.one = i, d.type = s, d.namespaces = c, Ke(e, d), e.addEventListener(s, d);
}
function Qe(e, t, n, r) {
	let i = k("jq");
	if (i && e.constructor !== EventTarget) {
		r ? i(e).off(t, r, n) : i(e).off(t, n);
		return;
	}
	let { eventName: a, namespaces: o } = Xe(t), s = [], c = Ge(e);
	c !== null && (s = a && r && n ? c.filter((e) => e.type === a && e.delegateSelector === r && e.original === n) : a && r ? c.filter((e) => e.type === a && e.delegateSelector === r) : a && n ? c.filter((e) => e.type === a && e.original === n) : a ? c.filter((e) => e.type === a) : c, o.length && (s = s.filter((e) => e.namespaces.filter((e) => o.includes(e)).length === o.length)), s.forEach((t) => {
		qe(e, t), e.removeEventListener(t.type, t);
	}));
}
function $e(e, t, n = !1, r = [], i = null, a = !1) {
	let o = k("jq"), s = k("win");
	if (o && e.constructor !== EventTarget) {
		let s = n ? "trigger" : "triggerHandler", c = o.Event(t);
		return T(i, (e, t) => {
			N(c, e, t);
		}), o(e)[s](c, r || []), a ? (c.defaultPrevented = c.isDefaultPrevented(), c) : !c.isDefaultPrevented();
	}
	let { eventName: c, namespaces: l } = Xe(t);
	if (!c) return !1;
	let u;
	return u = e.constructor === EventTarget ? new Event(c, {
		bubbles: n,
		cancelable: !0
	}) : Je.includes(c.toLowerCase()) ? new s.MouseEvent(c, {
		bubbles: n,
		cancelable: !0
	}) : new s.Event(c, {
		bubbles: n,
		cancelable: !0
	}), N(u, "namespace", l.join(".")), N(u, "_args", r || []), T(i, (e, t) => N(u, e, t)), e.dispatchEvent(u), a ? u : !u.defaultPrevented;
}
var et = {
	height() {
		return k("doc").querySelector("html")?.clientHeight || 0;
	},
	off(e, t = null) {
		Qe(window, e, t, null);
	},
	on(e, t) {
		Ze(window, e, t, null, !1);
	},
	one(e, t) {
		Ze(window, e, t, null, !0);
	},
	scrollLeft(e) {
		return e !== void 0 && (window.scrollX = e), window.scrollX;
	},
	scrollTop(e) {
		return e !== void 0 && (window.scrollY = e), window.scrollY;
	},
	width() {
		return k("doc").querySelector("html")?.clientWidth || 0;
	}
};
function tt(e) {
	return new P(k("doc").createElement(e));
}
function nt(e) {
	return new P(e);
}
var rt = new EventTarget(), P = class e {
	constructor(e) {
		this.length = 0, this._isDom = !0, e && this.add(e);
	}
	add(t, n = !0) {
		if (t) {
			if (typeof t == "string") {
				let e = Array.from(k("doc").querySelectorAll(t));
				ct(this, e);
			} else if (t instanceof e) ct(this, t.get());
			else if (typeof t == "object" && !t.nodeName && t.length !== void 0) {
				let e = t;
				for (let t = 0; t < e.length; t++) ct(this, e[t]);
				n = !1;
			} else ct(this, t);
		}
		return n && this.sort(), this;
	}
	append(e) {
		if (!e) return this;
		_(e) || (e = [e]);
		let t = Te([], e).filter((e) => !!e);
		return t.find((e) => typeof e == "string") ? this.each((e) => {
			for (let n = 0; n < t.length; n++) typeof t[n] == "string" ? e.insertAdjacentHTML("beforeend", t[n]) : e.append(t[n]);
		}) : this.each((e) => {
			let n = new DocumentFragment();
			for (let e = 0; e < t.length; e++) n.append(t[e]);
			e.append(n);
		});
	}
	appendTo(t) {
		return (t instanceof e ? t : new e(t)).append(this), this;
	}
	attr(e, t) {
		return typeof e == "string" && t === void 0 ? this.count() ? this[0].getAttribute(e) : null : this.each((n) => {
			typeof e == "string" ? t != null && n.setAttribute(e, typeof t == "string" ? t : t.toString()) : T(e, (e, t) => {
				t != null && n.setAttribute(e, t);
			});
		});
	}
	attrRemove(e) {
		return this.each((t) => t.removeAttribute(e));
	}
	blur() {
		return this.each((e) => e.blur());
	}
	children(e) {
		return this.map((t) => {
			let n = Array.from(t.children);
			return e ? n.filter((t) => t.matches(e)) : n;
		});
	}
	classAdd(e) {
		if (!e) return this;
		let t = lt(e);
		return this.each((e) => {
			t.filter((e) => e).forEach((t) => e.classList.add(t));
		});
	}
	classHas(e) {
		return this.count() ? this[0].classList.contains(e) : !1;
	}
	classRemove(e) {
		if (!e) return this;
		let t = lt(e);
		return this.each((e) => {
			t.filter((e) => e).forEach((t) => e.classList.remove(t));
		});
	}
	classToggle(e, t) {
		let n = Array.isArray(e) ? e : e.split(" ");
		return this.each((e) => {
			n.filter((e) => e).forEach((n) => e.classList.toggle(n, t));
		});
	}
	clone(e = !1) {
		return this.map((t) => t.cloneNode(e));
	}
	closest(e) {
		return typeof e == "string" ? this.map((t) => t.closest(e)) : this.map((t) => {
			for (; t.parentElement;) {
				if (t.parentElement === e) return e;
				t = t.parentElement;
			}
			return null;
		});
	}
	contains(e) {
		return this.find(e).count() !== 0;
	}
	count() {
		return this.length;
	}
	css(e, t) {
		return typeof e == "string" && t === void 0 ? this.length ? getComputedStyle(this[0])[e] : null : this.each((n) => {
			typeof e == "string" ? n.style[e] = t : Object.assign(n.style, e);
		});
	}
	data(e, t) {
		if (!e) {
			let e = {};
			return this.count() && M.object.each(this[0].dataset, (t, n) => {
				e[t] = it(n);
			}), e;
		}
		return typeof e == "string" && t === void 0 ? this.length ? it(this[0].dataset[e]) : null : (typeof e == "string" ? this.each((n) => n.dataset[e] = JSON.stringify(t)) : T(e, (e, t) => {
			this.each((n) => n.dataset[e] = JSON.stringify(t));
		}), this);
	}
	detach() {
		return this.each((e) => e.remove());
	}
	detachChildren() {
		return this.each((e) => {
			e.replaceChildren();
		});
	}
	each(e) {
		for (let t = 0; t < this.length; t++) {
			let n = this[t];
			e.call(n, n, t);
		}
		return this;
	}
	eachReverse(e) {
		for (let t = this.length - 1; t >= 0; t--) {
			let n = this[t];
			e.call(n, n, t);
		}
		return this;
	}
	empty() {
		return this.each((e) => {
			var t;
			if (e.replaceChildren) e.replaceChildren();
			else for (; e.childNodes.length;) (t = e.firstChild) == null || t.remove();
		});
	}
	eq(t) {
		return t < this.count() ? new e(this.get(t)) : new e();
	}
	get(e) {
		return e === void 0 ? Array.from(this) : this[e];
	}
	focus() {
		return this.each((e) => e.focus());
	}
	filter(e) {
		return this.map((t) => e === void 0 ? t : typeof e == "function" ? e(t) ? t : null : typeof e == "string" ? !t.matches(e) || !t.parentNode && (e.match(/:\w+-child/) || e.match(/:\w+-of-type/)) ? null : t : _(e) ? Array.from(e).includes(t) ? t : null : e === t ? t : null);
	}
	find(t) {
		if (t === null) return new e();
		if (typeof t == "string") return this.map((e) => Array.from(e.querySelectorAll(t)));
		let n = t instanceof e ? t.get() : t, r = !1;
		return this.each((t) => {
			new e(n).closest(t).count() && (r = !0);
		}), new e(r ? n : []);
	}
	first() {
		return new e(this.length ? this[0] : null);
	}
	height(e) {
		if (!this.count()) return 0;
		if (e === void 0 || e === "withPadding" || e === "withBorder" || e === "withMargin" || e === "inner" || e === "outer") {
			let t = this[0], n = k("win").getComputedStyle(this[0]), r = t.getBoundingClientRect().height;
			if (!e || e === "content") {
				let e = t.offsetHeight - parseFloat(n.borderTop) - parseFloat(n.borderBottom) - t.clientHeight;
				return r - parseFloat(n.paddingTop) - parseFloat(n.paddingBottom) - parseFloat(n.borderTop) - parseFloat(n.borderBottom) - e;
			}
			return e === "withPadding" || e === "inner" ? r - parseFloat(n.borderTop) - parseFloat(n.borderBottom) : e === "withBorder" ? r : r + parseFloat(n.marginTop) + parseFloat(n.marginBottom);
		}
		return this.each((t) => t.style.height = typeof e == "string" ? e : e + "px");
	}
	hide() {
		return this.each((e) => {
			e.style.display = "none";
		});
	}
	html(e) {
		return e === void 0 ? this.count() ? this[0].innerHTML : null : this.each((t) => {
			t.innerHTML = e;
		});
	}
	is(e) {
		return this.filter(e).count() > 0;
	}
	isAttached() {
		return this.count() !== 0 && k("doc").body.contains(this[0]);
	}
	isVisible() {
		if (this.count() === 0) return !1;
		let e = this[0];
		return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
	}
	index() {
		if (this.count()) {
			let e = this[0];
			return Array.from(e.parentNode.children).indexOf(e);
		}
		return -1;
	}
	insertAfter(e) {
		let t = st(e);
		return this.eachReverse((e) => {
			t.forEach((t) => (t?.parentNode)?.insertBefore(e, t.nextSibling));
		});
	}
	insertBefore(e) {
		let t = st(e);
		return this.each((e) => {
			t.forEach((t) => (t?.parentNode)?.insertBefore(e, t));
		});
	}
	last() {
		let t = this;
		return new e(t.length ? t[t.length - 1] : null);
	}
	map(t) {
		let n = new e();
		return this.each((e) => {
			n.add(t(e), !1);
		}), n;
	}
	mapTo(e) {
		let t = [];
		return this.each((n, r) => t.push(e(n, r))), t;
	}
	off(e, t, n) {
		let { handler: r, names: i, selector: a } = at(e, t, n);
		return this.each((e) => {
			i.forEach((t) => {
				Qe(e, t, r, a);
			});
		});
	}
	offset() {
		if (!this.count()) return {
			top: 0,
			left: 0
		};
		let e = this[0].getBoundingClientRect(), t = k("doc").documentElement;
		return {
			top: e.top + k("win").pageYOffset - t.clientTop,
			left: e.left + k("win").pageXOffset - t.clientLeft
		};
	}
	offsetParent() {
		return this.map((e) => e.offsetParent || k("doc").body);
	}
	on(e, t, n) {
		let { handler: r, names: i, selector: a } = at(e, t, n);
		return this.each((e) => {
			i.filter((e) => e !== null).forEach((t) => {
				Ze(e, t, r, a, !1);
			});
		});
	}
	one(e, t, n) {
		let { handler: r, names: i, selector: a } = at(e, t, n);
		return this.each((e) => {
			i.filter((e) => e !== null).forEach((t) => {
				Ze(e, t, r, a, !0);
			});
		});
	}
	parent(e) {
		return this.map((t) => {
			let n = t.parentElement;
			return e ? n?.matches(e) ? n : null : n;
		});
	}
	position() {
		if (!this.count()) return {
			top: 0,
			left: 0
		};
		let e = this[0], { marginTop: t, marginLeft: n } = getComputedStyle(e);
		return {
			top: e.offsetTop - parseInt(t),
			left: e.offsetLeft - parseInt(n)
		};
	}
	prepend(e) {
		return this.each((t) => {
			_(e) || v(e) ? Array.from(e).reverse().forEach((e) => t.prepend(e)) : typeof e == "string" ? t.insertAdjacentHTML("afterbegin", e) : t.prepend(e);
		});
	}
	prependTo(t) {
		return t instanceof e ? t.prepend(this) : new e(t).prepend(this), this;
	}
	prop(e, t) {
		return typeof e == "string" && t === void 0 ? this.count() ? this[0][e] : null : this.each((n) => {
			n[e] = t;
		});
	}
	propRemove(e) {
		return this.each((t) => {
			delete t[e];
		});
	}
	remove() {
		return this.each((e) => e.remove());
	}
	replaceWith(t) {
		return this.each((n) => {
			t instanceof e ? n.replaceWith(...t.get()) : n.replaceWith(t);
		});
	}
	scrollLeft(e) {
		return e === void 0 ? this.count() ? this[0].scrollLeft : 0 : this.each((t) => t.scrollLeft = e);
	}
	scrollTop(e) {
		return e === void 0 ? this.count() ? this[0].scrollTop : 0 : this.each((t) => t.scrollTop = e);
	}
	siblings() {
		return this.map((e) => e.parentElement ? Array.from(e.parentElement.children).filter((t) => t !== e) : []);
	}
	show() {
		return this.each((e) => {
			e.style.display = "block";
		});
	}
	sort() {
		return Array.prototype.sort.call(this, ot), this;
	}
	text(e) {
		return e === void 0 ? this.count() ? this[0].textContent : null : this.each((t) => {
			t.textContent = e;
		});
	}
	transition(t, n, r, i) {
		if (!this.count()) return this;
		if (!n && n !== 0 && (n = 400), r ||= "", i ||= () => {}, e.transitions && n !== 0) {
			let e = this[0];
			e._dom_tra && (clearTimeout(e._dom_tra), delete e._dom_tra), setTimeout(() => {
				this.css("transition", "all " + n + "ms " + r), this.css(t);
			}, 0), e._dom_tra = setTimeout(() => {
				delete e._dom_tra, this.css("transition", ""), i.call(this);
			}, n);
		} else this.css(t), i.call(this);
		return this;
	}
	trigger(e, t = !0, n = null, r = null, i = !1) {
		let { names: a } = at(e), o = [];
		return this.each((e) => {
			a.filter((e) => e !== null).forEach((a) => {
				o.push($e(e, a, t, n, r, i));
			});
		}), o;
	}
	val(e) {
		if (e === void 0) {
			if (!this.count()) return null;
			let e = this[0];
			return e.options && e.multiple ? Array.from(e.options).filter((e) => e.selected).map((e) => e.value) : e.value;
		}
		return this.each((t) => {
			if (t.options && t.multiple) {
				let n = Array.isArray(e) ? e : [e];
				Array.from(t.options).forEach((e) => e.selected = n.includes(e.value));
			} else t.value = e;
		});
	}
	width(e) {
		if (!this.count()) return 0;
		if (e === void 0 || e === "withPadding" || e === "withBorder" || e === "withMargin" || e === "inner" || e === "outer") {
			let t = this[0], n = k("win").getComputedStyle(t), r = t.getBoundingClientRect().width;
			if (!e || e === "content") {
				let e = t.offsetWidth - parseFloat(n.borderLeft) - parseFloat(n.borderRight) - t.clientWidth;
				return r - parseFloat(n.paddingLeft) - parseFloat(n.paddingRight) - parseFloat(n.borderLeft) - parseFloat(n.borderRight) - e;
			}
			return e === "withPadding" || e === "inner" ? r - parseFloat(n.borderLeft) - parseFloat(n.borderRight) : e === "withBorder" ? r : r + parseFloat(n.marginLeft) + parseFloat(n.marginRight);
		}
		return this.each((t) => t.style.width = typeof e == "string" ? e : e + "px");
	}
};
P.c = tt, P.create = tt, P.on = function(e, t) {
	Ze(rt, e, t, null, !1);
}, P.s = nt, P.select = nt, P.transitions = !0, P.trigger = function(e, t, n) {
	$e(rt, e, !0, t, n);
}, P.w = et, P.prototype.addClass = P.prototype.classAdd, P.prototype.hasClass = P.prototype.classHas, P.prototype.removeClass = P.prototype.classRemove;
function it(e) {
	if (e === void 0) return null;
	try {
		return JSON.parse(e);
	} catch {
		return e;
	}
}
function at(e, t, n) {
	let r, i, a = e ? e.split(" ").map((e) => e.trim()) : [null];
	return typeof t == "string" ? (r = t, i = n) : (r = null, i = t), {
		handler: i,
		names: a,
		selector: r
	};
}
function ot(e, t) {
	if (e === t) return 0;
	let n = e.compareDocumentPosition(t);
	return n & Node.DOCUMENT_POSITION_DISCONNECTED ? k("doc").body.contains(e) ? -1 : +!!k("doc").body.contains(t) : n & Node.DOCUMENT_POSITION_FOLLOWING || n & Node.DOCUMENT_POSITION_CONTAINED_BY ? -1 : n & Node.DOCUMENT_POSITION_PRECEDING || n & Node.DOCUMENT_POSITION_CONTAINS ? 1 : 0;
}
function st(e) {
	return v(e) ? e.get() : Array.isArray(e) ? e : [e];
}
function ct(e, t) {
	if (M.is.arrayLike(t)) for (var n = 0; n < t.length; n++) {
		let r = t[n];
		r != null && (e[e.length] = r, e.length++);
	}
	else t != null && (e[e.length] = t, e.length++);
}
function lt(e) {
	let t = [], n = function(e) {
		t.push.apply(t, e.split(" "));
	};
	return Array.isArray(e) ? e.forEach((e) => n(e)) : n(e), t;
}
var ut = {}, dt = [];
function ft(e, t, n = "") {
	ut[e] = t, n && dt.push({
		cFeature: n,
		fnInit: t
	});
}
var pt = {
	container: "dt-container",
	empty: { row: "dt-empty" },
	info: { container: "dt-info" },
	layout: {
		row: "dt-layout-row",
		cell: "dt-layout-cell",
		tableRow: "dt-layout-table",
		tableCell: "",
		start: "dt-layout-start",
		end: "dt-layout-end",
		full: "dt-layout-full"
	},
	length: {
		container: "dt-length",
		select: "dt-input"
	},
	order: {
		canAsc: "dt-orderable-asc",
		canDesc: "dt-orderable-desc",
		isAsc: "dt-ordering-asc",
		isDesc: "dt-ordering-desc",
		none: "dt-orderable-none",
		position: "sorting_"
	},
	processing: { container: "dt-processing" },
	scrolling: {
		body: "dt-scroll-body",
		container: "dt-scroll",
		footer: {
			self: "dt-scroll-foot",
			inner: "dt-scroll-footInner"
		},
		header: {
			self: "dt-scroll-head",
			inner: "dt-scroll-headInner"
		}
	},
	search: {
		container: "dt-search",
		input: "dt-input"
	},
	table: "dataTable",
	tbody: {
		cell: "",
		row: ""
	},
	thead: {
		cell: "",
		row: ""
	},
	tfoot: {
		cell: "",
		row: ""
	},
	paging: {
		active: "current",
		button: "dt-paging-button",
		container: "dt-paging",
		disabled: "disabled",
		nav: ""
	}
};
function mt(e, t, n, r) {
	let i = [], a = Math.floor(n / 2), o = r ? 2 : 1, s = +!!r;
	return t <= n ? i = j(0, t) : n === 1 ? i = [e] : n === 3 ? e <= 1 ? i = [
		0,
		1,
		"ellipsis"
	] : e >= t - 2 ? (i = j(t - 2, t), i.unshift("ellipsis")) : i = [
		"ellipsis",
		e,
		"ellipsis"
	] : e <= a ? (i = j(0, n - o), i.push("ellipsis"), r && i.push(t - 1)) : e >= t - 1 - a ? (i = j(t - (n - o), t), i.unshift("ellipsis"), r && i.unshift(0)) : (i = j(e - a + o, e + a - s), i.push("ellipsis"), i.unshift("ellipsis"), r && (i.push(t - 1), i.unshift(0))), i;
}
var ht = {
	simple: function() {
		return ["previous", "next"];
	},
	full: function() {
		return [
			"first",
			"previous",
			"next",
			"last"
		];
	},
	numbers: function() {
		return ["numbers"];
	},
	simple_numbers: function() {
		return [
			"previous",
			"numbers",
			"next"
		];
	},
	full_numbers: function() {
		return [
			"first",
			"previous",
			"numbers",
			"next",
			"last"
		];
	},
	first_last: function() {
		return ["first", "last"];
	},
	first_last_numbers: function() {
		return [
			"first",
			"numbers",
			"last"
		];
	},
	_numbers: mt,
	numbers_length: 7
}, gt = {
	addedClasses: [],
	cells: [],
	data: [],
	details: void 0,
	detailsShow: void 0,
	displayData: null,
	idx: -1,
	orderCache: null,
	searchCellCache: null,
	searchRowCache: null,
	src: "dom",
	tr: null
};
function _t(e = {}) {
	return M.object.assignDeep({}, gt, e);
}
function vt(e, t, n, r) {
	var i = e.data.length, a = _t({
		src: n ? "dom" : "data",
		idx: i
	});
	a.data = t, e.data.push(a);
	for (var o = e.columns, s = 0, c = o.length; s < c; s++) o[s].type = null;
	e.displayMaster.push(i);
	var l = e.rowIdFn(t);
	return l !== void 0 && (e.ids[l] = a), (n || !e.features.deferRender) && Tn(e, i, n, r), i;
}
function yt(e, t) {
	return t.mapTo((t) => {
		let n = Et(e, t);
		return vt(e, n.data, t, n.cells);
	});
}
function F(e, t, n, r) {
	r === "search" ? r = "filter" : r === "order" && (r = "sort");
	var i = e.data[t];
	if (i) {
		var a = e.drawCount, o = e.columns[n], s = i.data, c = o.defaultContent, l = o.dataGet(s, r, {
			settings: e,
			row: t,
			col: n
		});
		if (r !== "display" && l && typeof l == "object" && l.nodeName && (l = l.innerHTML), l === void 0) return e.drawError != a && c === null && (z(e, 0, "Requested unknown parameter " + (typeof o.data == "function" ? "{function}" : "'" + o.data + "'") + " for row " + t + ", column " + n, 4), e.drawError = a), c;
		if ((l === s || l === null) && c !== null && r !== void 0) l = c;
		else if (typeof l == "function") return l.call(s);
		if (l === null && r === "display") return "";
		if (r === "filter") {
			var u = q.type.search;
			o.type && u[o.type] && (l = u[o.type](l));
		}
		return l;
	}
}
function bt(e, t, n, r) {
	let i = e.data[t];
	if (i) {
		let a = e.columns[n], o = i.data;
		a.dataSet(o, r, {
			settings: e,
			row: t,
			col: n
		});
	}
}
function xt(e, t) {
	let n = P.s(e);
	t && typeof t == "object" && t.nodeName ? n.empty().append(t) : n.html(t);
}
function St(e) {
	return M.array.pluck(e.data, "data");
}
function Ct(e) {
	e.data.length = 0, e.displayMaster.length = 0, e.display.length = 0, e.ids = {};
}
function wt(e, t, n, r) {
	var i = e.data[t], a, o;
	if (i) {
		if (i.orderCache = null, i.searchCellCache = null, i.displayData = null, n === "dom" || (!n || n === "auto") && i.src === "dom") i.data = Dt(e, i, r).data;
		else {
			var s = i.cells, c = wn(e, t);
			if (s.length) {
				if (r !== void 0) xt(s[r], c[r]);
				else for (a = 0, o = s.length; a < o; a++) xt(s[a], c[a]);
			}
		}
		Tt(e, r), En(e, i), H(e, null, "rowInvalidate", [
			e,
			t,
			r
		], !1);
	}
}
function Tt(e, t) {
	var n = e.columns;
	if (t !== void 0) n[t].type = null, n[t].wideStrings = null;
	else for (let e = 0, t = n.length; e < t; e++) n[e].type = null, n[e].wideStrings = null;
	e.containerWidth = -1;
}
function Et(e, t) {
	let n = e.rowReadObject ? {} : [], r = P.s(t).children("th, td"), i = t.getAttribute("id");
	return r.each((t, r) => {
		Ot(e, t, n, r);
	}), i && M.set(e.rowId)(n, i), {
		data: n,
		cells: r.get()
	};
}
function Dt(e, t, n) {
	let r = t.cells;
	for (let i = 0; i < r.length; i++) (n === void 0 || n === i) && Ot(e, r[i], t.data, i);
	if (t.tr) {
		let n = t.tr.getAttribute("id");
		n && M.set(e.rowId)(t.data, n);
	}
	return {
		data: t.data,
		cells: r
	};
}
function Ot(e, t, n, r) {
	let i = e.columns[r], a = t.innerHTML.trim();
	if (i.attrSrc) {
		let e = i.data, r = M.set(e._), o = function(e, t) {
			if (typeof e == "string") {
				let r = e.indexOf("@");
				if (r !== -1) {
					let i = e.substring(r + 1);
					M.set(e)(n, t.getAttribute(i));
				}
			}
		};
		r(n, a), o(e.sort, t), o(e.type, t), o(e.filter, t);
	} else i.setter ||= M.set(i.data), i.setter(n, a);
}
function kt(e) {
	var t = e.table, n = e.scroll.x !== "" || e.scroll.y !== "";
	if (e.features.processing) {
		var r = P.c("div").attr("id", e.tableId + "_processing").attr("role", "status").classAdd(e.classes.processing.container).html(e.language.processing).append(P.c("div").append(P.c("div")).append(P.c("div")).append(P.c("div")).append(P.c("div")));
		n ? r.prependTo(P.s(e.tableWrapper).find("div.dt-scroll").get(0)) : r.insertBefore(t), P.s(t).on("processing.dt.DT", (e, t, n) => {
			r.css("display", n ? "block" : "none");
		});
	}
}
function I(e, t) {
	e.doingDraw && t === !1 || H(e, null, "processing", [e, t]);
}
function At(e, t, n) {
	t ? (I(e, !0), setTimeout(function() {
		n(), I(e, !1);
	}, 0)) : n();
}
function jt(e, t) {
	var n = e.renderer, r = q.renderer[t];
	return w(n) && n[t] ? r[n[t]] || r._ : typeof n == "string" && r[n] || r._;
}
function Mt(e) {
	e.columns.map((e) => e.wideStrings).includes(null) && Nt(e);
}
function Nt(e) {
	if (e.features.autoWidth) {
		var t = e.table, n = e.columns, r = e.scroll, i = r.y, a = r.x, o = Sr(e, "visible"), s = t.getAttribute("width"), c = t.parentElement, l, u, d, f, p = t.style.width, m = Pt(e);
		if (m === e.containerWidth) return !1;
		e.containerWidth = m, !p && !s && (t.style.width = "100%", p = "100%"), p && p.indexOf("%") !== -1 && (s = p), H(e, null, "column-calc", [{ visible: o }], !1);
		var h = P.s(t.cloneNode()).css("visibility", "hidden").css("margin", "0").attrRemove("id");
		h.append(P.c("tbody")), h.append(e.thead.cloneNode(!0)).append(e.tfoot.cloneNode(!0)), h.find("tfoot th, tfoot td").css("width", ""), h.find("thead th, thead td").each((t) => {
			var n = Or(e, t, !0);
			n ? (t.style.width = n, a && (t.style.minWidth = n, P.s(t).append(P.c("div").css({
				width: n,
				margin: "0",
				padding: "0",
				border: "0",
				height: "1px"
			})))) : t.style.width = "";
		});
		var g = [];
		for (l = 0; l < o.length; l++) g.push(Ft(e, o[l]));
		if (g.length) for (l = 0; l < g[0].length; l++) {
			var _ = P.c("tr").appendTo(h.children("tbody"));
			for (u = 0; u < o.length; u++) {
				f = o[u], d = n[f];
				var v = g[u][l] || "", y = q.type.className[d.type], b = v + (d.contentPadding || (a ? "-" : "")), x = P.c("td").classAdd(y).classAdd(d.className).appendTo(_);
				v.indexOf("<") === -1 && v.indexOf("&") === -1 ? x.text(b) : x.html(b);
			}
		}
		h.find("[name]").attrRemove("name");
		var ee = P.c("div").css(a || i ? {
			position: "absolute",
			top: "0",
			left: "0",
			height: "1px",
			right: "0",
			overflow: "hidden"
		} : {}).append(h).appendTo(c);
		a ? (h.css("width", "auto").attrRemove("width"), h.width() < c.clientWidth && s && h.width(c.clientWidth)) : i ? h.width(c.clientWidth) : s && h.width(s);
		var S = 0, C = h.find("tbody tr").eq(0).children();
		for (l = 0; l < o.length; l++) {
			var w = C.get(l).getBoundingClientRect().width;
			S += w, n[o[l]].width = L(w);
		}
		if (t.style.width = L(S), ee.remove(), s && (t.style.width = L(s)), (s || a) && !e.reszEvt) {
			var te = M.throttle(function() {
				var t = Pt(e);
				!e.destroying && t !== 0 && _r(e);
			});
			if (window.ResizeObserver) {
				var T = P.s(e.tableWrapper).isVisible(), E = P.c("div").css({
					width: "100%",
					height: "0"
				}).classAdd("dt-autosize").appendTo(e.tableWrapper);
				e.resizeObserver = new ResizeObserver(function(e) {
					T ? T = !1 : te();
				}), e.resizeObserver.observe(E.get(0));
			} else window.addEventListener("resize", te), e.windowResizeCb = te;
			e.reszEvt = !0;
		}
	}
}
function Pt(e) {
	let t = P.s(e.tableWrapper);
	return t.isVisible() ? t.width() : 0;
}
function Ft(e, t) {
	var n = e.columns[t];
	if (!n.wideStrings || n.widthCalc === "display") {
		var r = [], i = [];
		let d = e.displayMaster;
		n.widthCalc === "display" && (d = e.display.slice(e.displayStart, e.displayStart + e.pageLength));
		for (var a = 0, o = d.length; a < o; a++) {
			var s = d[a], c = wn(e, s, t), l = c && typeof c == "object" && c.nodeType ? c.innerHTML : c + "";
			l = l.replace(/id=".*?"/g, "").replace(/name=".*?"/g, ""), l = l.replace(/<script[\s\S]*?<\/script(?:\s[^>]*)?>/gi, " ").replace(/<dialog[\s\S]*?<\/dialog(?:\s[^>]*)?>/gi, " ").replace(/<template[\s\S]*?<\/template(?:\s[^>]*)?>/gi, " ");
			var u = M.string.stripHtml(l, " ").replace(/&nbsp;/g, " ");
			i.push({
				str: l,
				len: u.length
			}), r.push(u);
		}
		i.sort(function(e, t) {
			return t.len - e.len;
		}).splice(3), n.wideStrings = i.map(function(e) {
			return e.str;
		});
		let f = r.join(" ").split(" ");
		f.sort(function(e, t) {
			return t.length - e.length;
		}), f.length && n.wideStrings.push(f[0]), f.length > 1 && n.wideStrings.push(f[1]), f.length > 2 && n.wideStrings.push(f[3]);
	}
	return n.wideStrings;
}
function L(e) {
	return e === null ? "0px" : typeof e == "number" ? e < 0 ? "0px" : e + "px" : e.match(/\d$/) ? e + "px" : e;
}
function It(e) {
	var t = e.columns;
	e.colgroup.empty();
	for (var n = 0; n < t.length; n++) t[n].visible && e.colgroup.append(t[n].colEl);
}
function Lt(e) {
	let t = P.s(e.table), n = e.scroll, r = n.x, i = n.y;
	if (i === "" && r === "") return t.get(0);
	let a = e.classes.scrolling, o = e.captionNode, s = o ? o._captionSide : null, c = t.clone(!1), l = t.clone(!1), u = t.children("tfoot"), d = function(e) {
		return e ? L(e) : "100%";
	}, f = P.c("div").classAdd(a.container).attr("role", "table").append(P.c("div").classAdd(a.header.self).css({
		overflow: "hidden",
		position: "relative",
		border: "0",
		width: r ? d(r) : "100%"
	}).attr("role", "none").append(P.c("div").classAdd(a.header.inner).css({
		"box-sizing": "content-box",
		width: n.xInner || "100%"
	}).attr("role", "none").append(c.attrRemove("id").css("margin-left", "0").append(s === "top" ? o : null).append(t.children("thead"))))).append(P.c("div").classAdd(a.body).css({
		position: "relative",
		overflow: "auto",
		width: d(r)
	}).attr("role", "none").append(t));
	u.count() && f.append(P.c("div").classAdd(a.footer.self).css({
		overflow: "hidden",
		border: "0",
		width: r ? d(r) : "100%"
	}).attr("role", "none").append(P.c("div").classAdd(a.footer.inner).attr("role", "none").append(l.attrRemove("id").css("margin-left", "0").append(s === "bottom" ? o : null).append(t.children("tfoot")))));
	let p = f.children(), m = p.eq(0), h = p.eq(1), g = p.eq(2);
	h.on("scroll.DT", () => {
		let e = h.scrollLeft();
		m.scrollLeft(e), g.scrollLeft(e);
	}), m.on("focusin.DT", () => {
		let e = m.scrollLeft();
		h.scrollLeft(e), g.scrollLeft(e);
	}), g.on("focusin.DT", () => {
		let e = g.scrollLeft();
		m.scrollLeft(e), h.scrollLeft(e);
	}), h.css("max-height", d(i)), n.collapse || h.css("height", d(i)), e.scrollHead = m, e.scrollBody = h, e.scrollFoot = g, e.callbacks.draw.push(Rt), t.attr("role", "none"), t.find("tbody").attr("role", "rowgroup"), c.attr("role", "none"), l.attr("role", "none"), e.colgroup.find("colgroup").attr("role", "none");
	let _ = t.attr("aria-describedby");
	return _ && (f.attr("aria-describedby", _), t.attrRemove("aria-describedby")), f.get(0);
}
function Rt(e) {
	let t = e.scroll, n = t.barWidth, r = e.scrollHead.children("div"), i = r.children("table"), a = e.scrollBody, o = a, s = e.scrollFoot.children("div"), c = s.children("table"), l = P.s(e.thead), u = P.s(e.table), d = P.s(e.tfoot), f = e.browser, p, m, h = a.get(0).scrollHeight > a.get(0).clientHeight;
	if (e.scrollBarVis !== h && e.scrollBarVis !== void 0) {
		e.scrollBarVis = h, _r(e);
		return;
	}
	if (e.scrollBarVis = h, l.find("thead").attr("role", "rowgroup"), d.find("tfoot").attr("role", "rowgroup"), u.children("thead, tfoot").remove(), p = l.clone(!0).prependTo(u), p.find("th, td").attrRemove("tabindex"), p.find("[id]").attrRemove("id"), d.count() && (m = d.clone(!0).prependTo(u), m.find("[id]").attrRemove("id")), e.display.length) {
		let n = null, r = U(e) === "ssp" ? 0 : e.displayStart;
		for (let t = r; t < r + e.display.length; t++) {
			let r = e.display[t], i = e.data[r];
			if (i) {
				let e = i.tr;
				if (e) {
					n = e;
					break;
				}
			}
		}
		if (n) {
			let r = P.s(n).children("th, td").mapTo(function(t, n) {
				return {
					idx: yr(e, n),
					width: P.s(t).width("outer")
				};
			});
			for (let n = 0; n < r.length; n++) {
				let i = e.columns[r[n].idx].colEl;
				i.css("width", r[n].width + "px"), t.x && i.css("minWidth", r[n].width + "px");
			}
		}
	}
	i.find("colgroup").remove(), i.append(e.colgroup.clone(!0)), d && (c.find("colgroup").remove(), c.append(e.colgroup.clone(!0))), p.find("th, td").each(function(e) {
		P.c("div").classAdd("dt-scroll-sizing").append(Array.from(e.childNodes)).appendTo(e);
	}), m && m.find("th, td").each(function(e) {
		P.c("div").classAdd("dt-scroll-sizing").append(Array.from(e.childNodes)).appendTo(e);
	});
	let g = Math.floor(u.height()) > a.get(0).clientHeight || o.css("overflow-y") == "scroll", _ = "padding" + (f.scrollbarLeft ? "Left" : "Right"), v = u.width("withPadding");
	i.css("width", L(v)), r.css("width", L(v)).css(_, g ? n + "px" : "0px"), d.count() && (c.css("width", L(v)), s.css("width", L(v)).css(_, g ? n + "px" : "0px")), u.children("colgroup").prependTo(u), u.find("thead, tfoot").find("[tabindex]").attrRemove("tabindex"), u.find("thead, tfoot").attr("role", "none").find("[role]").attrRemove("role"), u.find("tbody tr:not([role])").attr("role", "row"), u.find("tbody td:not([role]), tbody th:not([role])").attr("role", "cell"), zt(p), zt(m), o.trigger("scroll"), (e.wasOrdered || e.wasFiltered) && !e.drawHold && a.scrollTop(0);
}
function zt(e) {
	e && (e.find("tfoot:not([role])").attr("role", "rowgroup"), e.find("tr:not([role])").attr("role", "row"), e.find("th:not([role])").attr("role", "columnheader"), e.find("td:not([role])").attr("role", "cell"));
}
function Bt(e) {
	var t = e.classes, n = P.c("div").attr("id", e.tableId + "_wrapper").classAdd(t.container).insertBefore(e.table);
	if (e.tableWrapper = n.get(0), e.dom) Gt(e, e.dom, n);
	else {
		var r = Ut(e, e.layout, "top"), i = Ut(e, e.layout, "bottom"), a = jt(e, "layout");
		r.forEach(function(t) {
			a(e, n, t);
		}), a(e, n, { full: {
			contents: [Lt(e)],
			items: [],
			table: !0
		} }), i.forEach(function(t) {
			a(e, n, t);
		});
	}
	kt(e);
}
function Vt(e, t, n) {
	if (Array.isArray(n)) for (var r = 0; r < n.length; r++) Vt(e, t, n[r]);
	else {
		var i = e[t];
		M.is.plainObject(n) ? n.features ? (n.rowId && (e.id = n.rowId), n.rowClass && (e.className = n.rowClass), i.id = n.id, i.className = n.className, Vt(e, t, n.features)) : M.object.each(n, (e, t) => {
			i.items.push({
				feature: e,
				opts: t
			});
		}) : i.items.push(n);
	}
}
function Ht(e, t, n) {
	for (var r, i = 0; i < e.length; i++) if (r = e[i], r.rowNum === t && (n === "full" && r.full || (n === "start" || n === "end") && (r.start || r.end))) return r[n] || (r[n] = {
		contents: [],
		items: []
	}), r;
	return r = { rowNum: t }, r[n] = {
		contents: [],
		items: []
	}, e.push(r), r;
}
function Ut(e, t, n) {
	var r = [];
	M.object.each(t, function(e, t) {
		var i = e.match(/^([a-z]+)([0-9]*)([A-Za-z]*)$/);
		if (t !== null && i) {
			var a = i[2] ? parseInt(i[2]) : 0, o = i[3] ? i[3].toLowerCase() : "full";
			i[1] === n && (o === "full" || o === "start" || o === "end") && Vt(Ht(r, a, o), o, t);
		}
	}), r.sort(function(e, t) {
		var r = e.rowNum || 0, i = t.rowNum || 0;
		if (r === i) {
			var a = e.full && !t.full ? -1 : 1;
			return n === "bottom" ? a * -1 : a;
		}
		return i - r;
	}), n === "bottom" && r.reverse();
	for (var i = 0; i < r.length; i++) delete r[i].rowNum, Wt(e, r[i]);
	return r;
}
function Wt(e, t) {
	var n = function(t, n) {
		return q.features[t] || z(e, 0, "Unknown feature: " + t), q.features[t].apply(this, [e, n]);
	}, r = function(r) {
		t[r] && (t[r].contents = t[r].items.filter((e) => !!e).map((t) => {
			if (typeof t == "string") return n(t, null);
			if (M.is.plainObject(t)) return n(t.feature, t.opts);
			if (typeof t.node == "function") return t.node(e);
			if (typeof t == "function") {
				var r = t(e);
				return typeof r.node == "function" ? r.node() : r;
			}
			if (t.nodeName) return t;
			if (t instanceof P) return t.get(0);
			if (t.length) return t[0];
		}));
	};
	r("start"), r("end"), r("full");
}
function Gt(e, t, n) {
	let r = t.match(/(".*?")|('.*?')|./g), i, a, o, s, c;
	if (r) for (let t = 0; t < r.length; t++) {
		if (i = null, a = r[t], a == "<") {
			if (o = P.c("div"), s = r[t + 1], s[0] == "'" || s[0] == "\"") {
				c = s.replace(/['"]/g, "");
				let e = "", n;
				if (c.indexOf(".") != -1) {
					let t = c.split(".");
					e = t[0], n = t[1];
				} else c[0] == "#" ? e = c : n = c;
				o.attr("id", e.substring(1)).classAdd(n), t++;
			}
			n.append(o.get()), n = o;
		} else a == ">" ? n = n.parent() : a == "t" ? i = Lt(e) : q.feature.forEach(function(t) {
			a == t.cFeature && (i = t.fnInit(e));
		});
		i && n.append(i instanceof P ? i.get() : i);
	}
}
function Kt(e) {
	e.orderHandler && jr(e, ":not([data-dt-order=\"disable\"]):not([data-dt-order=\"icon-only\"])").each((t) => {
		qt(e, t, "");
	});
	var t = [];
	Yt(e, t, e.order), e.order = t;
}
function qt(e, t, n, r, i) {
	Rn(t, n, function(t) {
		var n = !1, a = r === void 0 ? kr(t.target) : typeof r == "function" ? r() : Array.isArray(r) ? r : [r];
		if (a.length) {
			for (var o = 0, s = a.length; o < s && (Qt(e, a[o], o, t.shiftKey) !== !1 && (n = !0), e.order.length !== 1 || e.order[0][1] !== ""); o++);
			n && At(e, !0, function() {
				Zt(e), Jt(e, e.display), jn(e, !1, !1), i && i();
			});
		}
	});
}
function Jt(e, t) {
	if (!(t.length < 2)) {
		for (var n = e.displayMaster, r = {}, i = {}, a = 0; a < n.length; a++) r[n[a]] = a;
		for (a = 0; a < t.length; a++) i[t[a]] = r[t[a]];
		t.sort(function(e, t) {
			return i[e] - i[t];
		});
	}
}
function Yt(e, t, n) {
	var r = function(n) {
		if (w(n)) {
			let i = n, a = n;
			if (i.idx !== void 0) t.push([i.idx, i.dir]);
			else if (a.name) {
				var r = A(e.columns, "name").indexOf(a.name);
				r !== -1 && t.push([r, a.dir]);
			}
		} else t.push(n);
	};
	if (w(n)) r(n);
	else if (Array.isArray(n) && typeof n[0] == "number") r(n);
	else if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r(n[i]);
}
function Xt(e) {
	var t, n, r, i = [], a = q.type.order, o = e.columns, s, c, l, u, d = e.orderFixed, f = w(d), p = [];
	if (!e.features.ordering) return i;
	for (Array.isArray(d) && Yt(e, p, d), f && d.pre && Yt(e, p, d.pre), Yt(e, p, e.order), f && d.post && Yt(e, p, d.post), t = 0; t < p.length; t++) if (u = p[t][0], o[u]) for (s = o[u].orderData, n = 0, r = s.length; n < r; n++) c = s[n], l = o[c].type || "string", p[t]._idx === void 0 && (p[t]._idx = o[c].orderSequence.indexOf(p[t][1])), p[t][1] && i.push({
		src: u,
		col: c,
		dir: p[t][1],
		index: p[t]._idx,
		type: l,
		formatter: a[l + "-pre"],
		sorter: a[l + "-" + p[t][1]]
	});
	return i;
}
function Zt(e, t, n) {
	var r, i, a = [], o = q.type.order, s = e.data, c, l = e.displayMaster, u;
	if (wr(e), t !== void 0) {
		var d = e.columns[t];
		u = [{
			src: t,
			col: t,
			dir: n || "",
			index: 0,
			type: d.type,
			formatter: o[d.type + "-pre"],
			sorter: o[d.type + "-" + n]
		}], l = l.slice();
	} else u = Xt(e);
	for (r = 0, i = u.length; r < i; r++) c = u[r], en(e, c.col);
	if (U(e) != "ssp" && u.length !== 0) {
		for (r = 0, i = l.length; r < i; r++) a[r] = r;
		u.length && u[0].dir === "desc" && e.orderDescReverse && a.reverse(), l.sort(function(e, t) {
			var n, r, i, o, c, l = u.length, d = s[e]?.orderCache, f = s[t]?.orderCache;
			for (i = 0; i < l; i++) if (c = u[i], n = d[c.col], r = f[c.col], c.sorter) {
				if (o = c.sorter(n, r), o !== 0) return o;
			} else if (o = n < r ? -1 : +(n > r), o !== 0) return c.dir === "asc" ? o : -o;
			return n = a[e], r = a[t], n < r ? -1 : +(n > r);
		});
	} else u.length === 0 && l.sort(function(e, t) {
		return e < t ? -1 : +(e > t);
	});
	return t === void 0 && (e.wasOrdered = !0, e.sortDetails = u, H(e, null, "order", [e, u])), l;
}
function Qt(e, t, n, r) {
	var i = e.columns[t], a = e.order, o = i.orderSequence, s, c = function(e, t) {
		var n = e._idx;
		return n === void 0 && (n = o.indexOf(e[1])), n + 1 < o.length ? n + 1 : t ? null : 0;
	};
	if (!i.orderable) return !1;
	if (typeof a[0] == "number" && (a = e.order = [a]), (r || n) && e.features.orderMulti) {
		var l = A(a, "0").indexOf(t);
		l === -1 ? r ? (a.push([
			t,
			o[0],
			0
		]), a[a.length - 1]._idx = 0) : (a.push([
			t,
			a[0][1],
			0
		]), a[a.length - 1]._idx = 0) : (s = c(a[l], !0), s === null && a.length === 1 && (s = 0), s === null || o[s] === "" ? a.splice(l, 1) : (a[l][1] = o[s], a[l]._idx = s));
	} else a.length && a[0][0] == t ? (s = c(a[0]), s ? (a.length = 1, a[0][1] = o[s], a[0]._idx = s) : (a.length = 1, a[0][1] = o[0], a[0]._idx = 0)) : (a.length = 0, a.push([t, o[0]]), a[0]._idx = 0);
}
function $t(e) {
	var t = e.lastOrder, n = e.classes.order.position, r = Xt(e), i = e.features, a, o, s;
	if (i.ordering && i.orderClasses) {
		for (a = 0, o = t.length; a < o; a++) s = t[a].src, P.s(A(e.data, "cells", s)).classRemove(n + (a < 2 ? a + 1 : 3));
		for (a = 0, o = r.length; a < o; a++) s = r[a].src, P.s(A(e.data, "cells", s)).classAdd(n + (a < 2 ? a + 1 : 3));
	}
	e.lastOrder = r;
}
function en(e, t) {
	var n = e.columns[t], r = q.order[n.orderDataType], i;
	r && (i = r.call(e.instance, e, t, br(e, t)));
	for (var a, o, s = q.type.order[n.type + "-pre"], c = e.data, l = 0; l < c.length; l++) c[l] && (a = c[l], a && !a.orderCache && (a.orderCache = []), a && (!a.orderCache[t] || r) && (o = r ? i[l] : F(e, l, t, "sort"), a.orderCache[t] = s ? s(o, e) : o));
}
var tn = {
	boundary: !1,
	caseInsensitive: !0,
	columns: null,
	exact: !1,
	regex: !1,
	return: !1,
	search: "",
	smart: !0
};
function R(e = {}) {
	return M.object.assignDeep({}, tn, e);
}
function nn(e, t, n) {
	var r = e.displayStart, i = e.pageLength, a = In(e);
	if (a === 0 || i === -1) r = 0;
	else if (typeof t == "number") r = t * i, r > a && (r = 0);
	else if (t == "first") r = 0;
	else if (t == "previous") r = i >= 0 ? r - i : 0, r < 0 && (r = 0);
	else if (t == "next") r + i < a && (r += i);
	else if (t == "last") r = Math.floor((a - 1) / i) * i;
	else if (t === "ellipsis") return;
	else z(e, 0, "Unknown paging action: " + t, 5);
	var o = e.displayStart !== r;
	return e.displayStart = r, H(e, null, o ? "page" : "page-nc", [e]), o && n && An(e), o;
}
function rn(e) {
	if (!e.loadingState) {
		var t = [];
		Yt(e, t, e.order);
		var n = e.columns, r = {
			columns: e.columns.map(function(t, n) {
				return {
					name: t.name,
					visible: t.visible,
					search: Object.assign({}, e.searches[n])
				};
			}),
			length: e.pageLength,
			order: t.map(function(e) {
				return n[e[0]] && n[e[0]].name ? [n[e[0]].name, e[1]] : e.slice();
			}),
			search: Object.assign({}, e.searches["*"]),
			searchGroups: Object.keys(e.searches).filter((e) => e.includes(",")).map((t) => Object.assign({}, e.searches[t])),
			start: e.displayStart,
			time: +/* @__PURE__ */ new Date()
		};
		e.stateSaved = r, H(e, "stateSaveParams", "stateSaveParams", [e, r]), e.features.stateSave && !e.destroying && e.stateSaveCallback.call(e.instance, e, r);
	}
}
function an(e, t) {
	if (!e.features.stateSave) t();
	else {
		var n = e.stateLoadCallback.call(e.instance, e, function(n, r = !1) {
			on(e, n, r, t);
		});
		return n !== void 0 && on(e, n, !1, t), !0;
	}
}
function on(e, t, n, r) {
	var i, a, o = e.columns, s = A(e.columns, "name");
	e.loadingState = !0;
	var c = e.initDone ? new Y(e) : null;
	if (!n) {
		if (!t || !t.time) {
			e.loadingState = !1, r();
			return;
		}
		var l = e.stateDuration;
		if (l > 0 && t.time < +/* @__PURE__ */ new Date() - l * 1e3) {
			e.loadingState = !1, r();
			return;
		}
	}
	if (H(e, "stateLoadParams", "stateLoadParams", [e, t]).indexOf(!1) !== -1) e.loadingState = !1, r();
	else {
		if (e.stateLoaded = ne({}, t), H(e, null, "stateLoadInit", [e, t], !0), t.length !== void 0 && (c ? c.page.len(t.length) : e.pageLength = t.length), t.start !== void 0 && (c === null ? (e.displayStart = t.start, e.displayStartInit = t.start) : nn(e, t.start / e.pageLength)), t.order !== void 0) {
			e.order = [];
			for (let n = 0; n < t.order.length; n++) {
				let r = t.order[n], i = [r[0], r[1]];
				if (typeof r[0] == "string") {
					let e = s.indexOf(r[0]);
					if (e < 0) continue;
					i[0] = e;
				} else if (i[0] >= o.length) continue;
				e.order.push(i);
			}
		}
		if (t.search !== void 0 && Object.assign(e.searches["*"], t.search), t.searchGroups && t.searchGroups.forEach((t) => {
			if (t.columns) {
				let n = t.columns.join(",");
				e.searches[n] = R(t);
			}
		}), t.columns) {
			var u = t.columns, d = A(t.columns, "name");
			if (d.join("").length && d.join("") !== s.join("")) for (u = [], i = 0; i < s.length; i++) if (s[i] != "") {
				var f = d.indexOf(s[i]);
				f >= 0 ? u.push(t.columns[f]) : u.push({});
			} else u.push({});
			if (u.length === o.length) {
				for (i = 0, a = u.length; i < a; i++) {
					var p = u[i];
					p.visible !== void 0 && (c ? c.column(i).visible(p.visible, !1) : o[i].visible = p.visible), p.search !== void 0 && (Object.assign(e.searches[i], p.search), e.searches[i].columns = [i]);
				}
				c && c.one("draw", function() {
					c.columns.adjust();
				});
			}
		}
		e.loadingState = !1, H(e, "stateLoaded", "stateLoaded", [e, t]), r();
	}
}
function sn(e) {
	var t, n = e.init, r = e.deferLoading, i = U(e);
	e.initialised ? (Dn(e, "header"), Dn(e, "footer"), an(e, function() {
		kn(e, e.header), kn(e, e.footer);
		var a = e.displayStartInit;
		if (n && n.data) for (t = 0; t < n.data.length; t++) vt(e, n.data[t]);
		else (r || i == "dom") && yt(e, P.s(e.tbody).children("tr"));
		e.display = e.displayMaster.slice(), Bt(e), Kt(e), It(e), I(e, !0), H(e, null, "preInit", [e], !0), jn(e), (i != "ssp" || r) && (i == "ajax" ? ln(e, {}, function(n) {
			var r = mn(e, n, !1);
			for (t = 0; t < r.length; t++) vt(e, r[t]);
			e.displayStartInit = a, jn(e), I(e, !1), cn(e);
		}) : (cn(e), I(e, !1)));
	})) : setTimeout(function() {
		sn(e);
	}, 200);
}
function cn(e) {
	if (e.initDone) return;
	var t = [e, e.json];
	e.initDone = !0;
	let n = P.s(e.tfoot);
	n.children().count() === 0 && n.remove(), _r(e), H(e, null, "plugin-init", t, !0), H(e, "init", "init", t, !0);
}
function ln(e, t, n) {
	var r, i = e.ajax, a = e.instance, o = function(t) {
		var r = e.jqXHR ? e.jqXHR.status : null;
		(t === null || typeof r == "number" && r == 204) && (t = {}, mn(e, t, []));
		var i = t.error || t.sError;
		if (i && z(e, 0, i), t.d && typeof t.d == "string") try {
			t = JSON.parse(t.d);
		} catch {}
		e.json = t, Tt(e), H(e, null, "xhr", [
			e,
			t,
			e.jqXHR
		], !0), n(t);
	};
	if (M.is.plainObject(i) && i.data) {
		r = i.data;
		var s = typeof r == "function" ? r(t, e) : r;
		t = typeof r == "function" && s ? s : M.object.assignDeep(t, s), delete i.data;
	}
	var c = {
		url: typeof i == "string" ? i : "",
		data: t,
		success: o,
		dataType: "json",
		cache: !1,
		type: e.serverMethod,
		error: function(t, n) {
			H(e, null, "xhr", [
				e,
				null,
				e.jqXHR
			], !0).indexOf(!1) === -1 && (n == "parsererror" ? z(e, 0, "Invalid JSON response", 1) : t.readyState === 4 && z(e, 0, "Ajax error", 7)), I(e, !1);
		}
	};
	if (M.is.plainObject(i) && M.object.assign(c, i), e.ajaxData = t, H(e, null, "preXhr", [
		e,
		t,
		c
	], !0), typeof i == "function") e.jqXHR = i.call(a, t, o, e);
	else if (i && typeof i != "string" && i.url === "") {
		var l = {};
		mn(e, l, []), o(l);
	} else e.jqXHR = M.ajax(c);
	r && (i.data = r);
}
function un(e) {
	e.drawCount++, I(e, !0), ln(e, fn(e), function(t) {
		pn(e, t);
	});
}
function dn(e) {
	return typeof e == "function" ? "function" : e.toString();
}
function fn(e) {
	var t = e.columns, n = e.features, r = e.searches, i = e.searchesFixed, a = function(e, n) {
		return typeof t[e][n] == "function" ? "function" : t[e][n];
	};
	return {
		draw: e.drawCount,
		columns: t.map(function(e, t) {
			return {
				data: a(t, "data"),
				name: e.name,
				searchable: e.searchable,
				orderable: e.orderable,
				search: {
					value: r[t] ? dn(r[t].search) : "",
					regex: r[t] ? r[t].regex : !1,
					fixed: i[t] ? Object.keys(i[t]).map((e) => ({
						name: e,
						term: dn(i[t][e].search)
					})) : []
				}
			};
		}),
		order: Xt(e).map(function(e) {
			return {
				column: e.col,
				dir: e.dir,
				name: a(e.col, "name")
			};
		}),
		start: e.displayStart,
		length: n.paging ? e.pageLength : -1,
		search: {
			value: dn(r["*"].search),
			regex: r["*"].regex,
			fixed: Object.keys(e.searchesFixed["*"]).map((t) => ({
				name: t,
				term: dn(e.searchesFixed["*"][t].search)
			})),
			groups: Object.keys(e.searches).filter((e) => e.includes(",")).map((t) => ({
				columns: e.searches[t].columns || [],
				term: dn(e.searches[t].search)
			})),
			groupsFixed: Object.keys(e.searchesFixed).filter((e) => e.includes(",")).map((t) => {
				let n = e.searchesFixed[t];
				return Object.keys(n).map((e) => ({
					columns: n[e].columns || [],
					name: e,
					term: dn(n[e].search)
				}));
			}).flat()
		}
	};
}
function pn(e, t) {
	var n = mn(e, t, !1), r = hn(e, "draw", t), i = hn(e, "recordsTotal", t), a = hn(e, "recordsFiltered", t), o = e.columns.map((e) => e.type).join(",");
	if (r !== void 0) {
		if (r * 1 < e.drawCount) return;
		e.drawCount = r * 1;
	}
	n ||= [], Ct(e), e.recordsTotal = parseInt(i, 10), e.recordsDisplay = parseInt(a, 10);
	for (var s = 0, c = n.length; s < c; s++) vt(e, n[s]);
	e.display = e.displayMaster.slice(), wr(e, o), An(e, !0), cn(e), I(e, !1);
}
function mn(e, t, n) {
	var r = "data";
	if (M.is.plainObject(e.ajax) && e.ajax.dataSrc !== void 0) {
		var i = e.ajax.dataSrc;
		typeof i == "string" || typeof i == "function" ? r = i : i.data !== void 0 && (r = i.data);
	}
	if (!n) return r === "data" ? t.aaData || t[r] : r === "" ? t : M.get(r)(t);
	M.set(r)(t, n);
}
function hn(e, t, n) {
	var r = M.is.plainObject(e.ajax) ? e.ajax.dataSrc : null;
	if (r && r[t]) return M.data.get(r[t])(n);
	var i = "";
	return t === "draw" ? i = "sEcho" : t === "recordsTotal" ? i = "iTotalRecords" : t === "recordsFiltered" && (i = "iTotalDisplayRecords"), n[i] === void 0 ? n[t] : n[i];
}
var gn, _n;
function vn() {
	gn = P.c("div").get(0), _n = gn.textContent !== void 0;
}
function yn(e) {
	e.columns, U(e) != "ssp" && (Cn(e), e.display = e.displayMaster.slice(), M.object.each(e.searches, (t, n) => {
		xn(e.display, e, n.search, n);
	}), M.object.each(e.searchesFixed, function(t) {
		M.object.each(e.searchesFixed[t], function(t, n) {
			xn(e.display, e, n.search, n);
		});
	}), bn(e)), e.wasFiltered = !0, H(e, null, "search", [e]);
}
function bn(e) {
	let t = q.search, n = e.display, r, i;
	for (let a = 0, o = t.length; a < o; a++) {
		let o = [];
		for (let s = 0, c = n.length; s < c; s++) i = n[s], r = e.data[i], r && t[a](e, r.searchCellCache, i, r.data, s) && o.push(i);
		n.length = 0, Vn(n, o);
	}
}
function xn(e, t, n, r) {
	if (n === "") return;
	let i = 0, a = [], o = typeof n == "function" ? n : null, s = n instanceof RegExp ? n : o ? null : Sn(n, r), c = r.columns ? r.columns : M.array.range(t.columns.length);
	for (i = 0; i < e.length; i++) {
		let n = t.data[e[i]];
		if (n) {
			let t = M.array.selectiveJoin(n.searchCellCache, c);
			(o && o(t, n.data, e[i], c.length === 1 ? c[0] : c) || s && typeof t == "string" && s.test(t)) && a.push(e[i]);
		}
	}
	for (e.length = a.length, i = 0; i < a.length; i++) e[i] = a[i];
}
function Sn(e, t) {
	let n = [], r = Object.assign({}, {
		boundary: !1,
		caseInsensitive: !0,
		exact: !1,
		regex: !1,
		smart: !0
	}, t), i = typeof e == "string" ? e : e.toString();
	if (i = M.diacritics(i), r.exact) return RegExp("^" + M.escapeRegex(i) + "$", r.caseInsensitive ? "i" : "");
	if (i = r.regex ? i : M.escapeRegex(i), r.smart) {
		let e = (i.match(/!?["\u201C][^"\u201D]+["\u201D]|[^ ]+/g) || [""]).map(function(e) {
			let t = !1, r;
			return e.charAt(0) === "!" && (t = !0, e = e.substring(1)), e.charAt(0) === "\"" ? (r = e.match(/^"(.*)"$/), e = r ? r[1] : e) : e.charAt(0) === "“" && (r = e.match(/^\u201C(.*)\u201D$/), e = r ? r[1] : e), t && (e.length > 1 && n.push("(?!" + e + ")"), e = ""), e.replace(/"/g, "");
		}), t = n.length ? n.join("") : "", a = r.boundary ? "\\b" : "";
		i = "^(?=.*?" + a + e.join(")(?=.*?" + a) + ")(" + t + ".)*$";
	}
	return new RegExp(i, r.caseInsensitive ? "i" : "");
}
function Cn(e) {
	let t = e.columns, n = e.data, r, i, a, o, s, c = !1;
	gn || vn();
	for (let l = 0; l < n.length; l++) if (n[l] && (s = n[l], s && !s.searchCellCache)) {
		let n = [];
		for (i = 0, a = t.length; i < a; i++) r = t[i], r.searchable ? (o = F(e, l, i, "filter"), o === null && (o = ""), typeof o != "string" && o.toString && (o = o.toString())) : o = "", o.indexOf && o.indexOf("&") !== -1 && (gn.innerHTML = o, o = _n ? gn.textContent : gn.innerText), o.replace && (o = o.replace(/[\r\n\u2028]/g, "")), n.push(o);
		s.searchCellCache = n, s.searchRowCache = n.join("  "), c = !0;
	}
	return c;
}
function wn(e, t, n = null) {
	var r = e.data[t], i = e.columns;
	if (!r) return [];
	r.displayData ||= [];
	let a = r.displayData;
	if (!a._complete) {
		if (n !== null) a[n] || (a[n] = F(e, t, n, "display"));
		else for (var o = 0, s = i.length; o < s; o++) a[o] || (a[o] = F(e, t, o, "display"), a._complete = !0);
	}
	return n === null ? a : a[n];
}
function Tn(e, t, n, r) {
	var i = e.data[t], a = [], o, s, c, l, u, d, f = e.classes.tbody.row, p = k("doc");
	if (i && i.tr === null) {
		let h = i.data;
		for (o = n || p.createElement("tr"), i.tr = o, i.cells = a, P.s(o).classAdd(f), o._DT_RowIndex = t, En(e, i), l = 0, u = e.columns.length; l < u; l++) {
			c = e.columns[l], d = !(n && r && r[l]), s = d ? p.createElement(c.cellType) : r[l], s || z(e, 0, "Incorrect column count", 18), s._DT_CellIndex = {
				row: t,
				column: l
			}, a.push(s);
			var m = wn(e, t);
			(d || (c.render || c.data !== l) && (!M.is.plainObject(c.data) || c.data && c.data._ !== l + ".display")) && xt(s, m[l]), P.s(s).classAdd(c.className), c.visible && d ? o.appendChild(s) : !c.visible && !d && s.parentNode.removeChild(s), c.createdCell && c.createdCell.call(e.instance, s, F(e, t, l), h, t, l);
		}
		H(e, "rowCreated", "row-created", [
			o,
			h,
			t,
			a
		]);
	} else i && P.s(i.tr).classAdd(f);
}
function En(e, t) {
	var n = t.tr, r = t.data;
	if (n) {
		var i = e.rowIdFn(r);
		if (i && (n.id = i), r.DT_RowClass) {
			var a = r.DT_RowClass.split(" ");
			t.addedClasses = t.addedClasses ? M.unique(t.addedClasses.concat(a)) : a, P.s(n).classRemove(t.addedClasses.join(" ")).classAdd(r.DT_RowClass);
		}
		r.DT_RowAttr && P.s(n).attr(r.DT_RowAttr), r.DT_RowData && P.s(n).data(r.DT_RowData);
	}
}
function Dn(e, t) {
	let n = e.classes, r = e.columns, i, a, o, s = P.s(t === "header" ? e.thead : e.tfoot), c = t === "header" ? "title" : t;
	if (!s) return;
	if ((t === "header" || M.array.pluck(e.columns, c).join("")) && (o = s.find("tr"), o.count() || (o = P.c("tr").appendTo(s)), o.count() === 1)) {
		let e = 0;
		for (o.find("td, th").each((t) => {
			e += t.colSpan;
		}), i = e, a = r.length; i < a; i++) P.c("th").html(r[i][c] || "").appendTo(o);
	}
	let l = Nn(e, s.get(0), !0);
	t === "header" ? (e.header = l, s.find("tr").classAdd(n.thead.row)) : (e.footer = l, s.find("tr").classAdd(n.tfoot.row)), s.children("tr").children("th, td").each((r) => {
		(t === "header" ? jt(e, "header") : jt(e, "footer"))(e, P.s(r), n);
	});
}
function On(e, t, n) {
	var r, i, a, o = [], s = [], c = e.columns, l = c.length, u, d;
	if (t) {
		for (n ||= M.array.range(l).filter(function(e) {
			return c[e].visible;
		}), r = 0; r < t.length; r++) o[r] = t[r].slice().filter(function(e, t) {
			return n.includes(t);
		}), s.push([]);
		for (r = 0; r < o.length; r++) for (i = 0; i < o[r].length; i++) if (u = 1, d = 1, s[r][i] === void 0) {
			for (a = o[r][i].cell; o[r + u] !== void 0 && o[r][i].cell == o[r + u][i].cell;) s[r + u][i] = null, u++;
			for (; o[r][i + d] !== void 0 && o[r][i].cell == o[r][i + d].cell;) {
				for (var f = 0; f < u; f++) s[r + f][i + d] = null;
				d++;
			}
			var p = P.s(a).find(".dt-column-title");
			s[r][i] = {
				cell: a,
				colspan: d,
				rowspan: u,
				title: p.count() ? p.html() : P.s(a).html()
			};
		}
		return s;
	}
}
function kn(e, t) {
	let n = On(e, t), r;
	if (n) for (let e = 0; e < t.length; e++) {
		r = t[e].row, r && P.s(r).detachChildren();
		for (let t = 0; t < n[e].length; t++) {
			let i = n[e][t];
			i && P.s(i.cell).appendTo(r).attr("rowspan", i.rowspan).attr("colspan", i.colspan);
		}
	}
}
function An(e, t) {
	if (Pn(e), H(e, "preDraw", "preDraw", [e]).indexOf(!1) !== -1) I(e, !1);
	else {
		var n = [], r = 0, i = U(e) == "ssp", a = e.display, o = e.displayStart, s = Ln(e), c = e.columns, l = P.s(e.tbody);
		if (e.doingDraw = !0, e.deferLoading) e.deferLoading = !1, e.drawCount++, I(e, !1);
		else if (!i) e.drawCount++;
		else if (!e.destroying && !t) {
			e.drawCount === 0 && l.empty().append(Mn(e)), un(e);
			return;
		}
		if (a.length !== 0) for (var u = i ? 0 : o, d = i ? e.data.length : s, f = u; f < d; f++) {
			var p = a[f], m = e.data[p];
			if (m !== null) {
				m.tr === null && Tn(e, p);
				for (var h = m.tr, g = 0; g < c.length; g++) {
					var _ = c[g], v = m.cells[g];
					P.s(v).classAdd(_.type ? q.type.className[_.type] : null).classAdd(e.classes.tbody.cell);
				}
				H(e, "row", null, [
					h,
					m.data,
					r,
					f,
					p
				]), n.push(h), r++;
			}
		}
		else n[0] = Mn(e);
		H(e, "header", "header", [
			P.s(e.thead).children("tr").get(0),
			St(e),
			o,
			s,
			a
		]), H(e, "footer", "footer", [
			P.s(e.tfoot).children("tr").get(0),
			St(e),
			o,
			s,
			a
		]), l.detachChildren().append(n), P.s(e.tableWrapper).classToggle("dt-empty-footer", P.s(e.tfoot).find("tr").count() === 0), H(e, "draw", "draw", [e], !0), e.wasOrdered = !1, e.wasFiltered = !1, e.doingDraw = !1;
	}
}
function jn(e, t, n) {
	let r = e.features, i = r.ordering, a = r.searching;
	(n === void 0 || n === !0) && (wr(e), Mt(e), i && Zt(e), a ? yn(e) : e.display = e.displayMaster.slice()), t === !0 ? zn(e) : e.displayStart = 0, e.drawHold = t, An(e), e.api.one("draw", function() {
		e.drawHold = !1;
	});
}
function Mn(e) {
	let t = e.language, n = t.zeroRecords, r = U(e);
	return (r === "ssp" || r === "ajax") && !e.json ? n = t.loadingRecords : t.emptyTable && Fn(e) === 0 && (n = t.emptyTable), P.c("tr").append(P.c("td").attr("colSpan", xr(e)).classAdd(e.classes.empty.row).html(n)).get(0);
}
function Nn(e, t, n) {
	let r = e.columns, i = P.s(t).children("tr"), a, o, s, c, l, u, d, f, p, m, h = e.titleRow, g = t && t.nodeName.toLowerCase() === "thead", _ = [], v, y = function(e, t, n) {
		let r = e[t];
		for (; r[n];) n++;
		return n;
	};
	for (s = 0, u = i.count(); s < u; s++) _.push([]);
	for (s = 0, u = i.count(); s < u; s++) for (a = i.get(s), f = 0, o = a.firstChild; o;) {
		if (o.nodeName.toUpperCase() == "TD" || o.nodeName.toUpperCase() == "TH") {
			let t = P.s(o), u = [];
			if (p = parseInt(t.attr("colspan") || "1") || 1, m = parseInt(t.attr("rowspan") || "1") || 1, p = !p || p === 0 || p === 1 ? 1 : p, m = !m || m === 0 || m === 1 ? 1 : m, d = y(_, s, f), v = p === 1, n) {
				if (v) {
					gr(e, d, Un(t.data()));
					let n = r[d], a = t.attr("width") || null, o = t.get(0).style.width.match(/width:\s*(\d+[pxem%]+)/);
					o && (a = o[1]), n.widthOrig = n.width || a, g ? (n.title !== null && !n.autoTitle && (h === !0 && s === 0 || h === !1 && s === i.count() - 1 || h === s || h === null) && t.html(n.title), !n.title && v && (n.title = M.string.stripHtml(t.html()), n.autoTitle = !0)) : n.footer && t.html(n.footer), n.ariaTitle ||= t.attr("aria-label") || n.title, n.className && t.classAdd(n.className);
				}
				t.find("div.dt-column-title").count() === 0 && P.c("div").classAdd("dt-column-title").append(Array.from(t.get(0).childNodes)).appendTo(t), e.orderIndicators && g && t.filter(":not([data-dt-order=disable])").count() !== 0 && t.parent(":not([data-dt-order=disable])").count() !== 0 && t.find("div.dt-column-order").count() === 0 && P.c("div").classAdd("dt-column-order").appendTo(t);
				var b = g ? "header" : "footer";
				t.find("div.dt-column-" + b).count() === 0 && P.c("div").classAdd("dt-column-" + b).append(Array.from(t.get(0).childNodes)).appendTo(t);
			}
			for (l = 0; l < p; l++) {
				for (c = 0; c < m; c++) _[s + c][d + l] = {
					cell: t.get(0),
					unique: v
				}, _[s + c].row = a;
				u.push(d + l);
			}
			t.attr("data-dt-column", M.unique(u).join(","));
		}
		o = o.nextSibling;
	}
	return _;
}
function Pn(e) {
	var t = U(e) == "ssp", n = e.displayStartInit;
	n !== void 0 && n !== -1 && (e.displayStart = t ? n : n >= In(e) ? 0 : n, e.displayStartInit = -1);
}
function Fn(e) {
	return U(e) == "ssp" ? e.recordsTotal * 1 : e.displayMaster.length;
}
function In(e) {
	return U(e) == "ssp" ? e.recordsDisplay * 1 : e.display.length;
}
function Ln(e) {
	var t = e.pageLength, n = e.displayStart, r = n + t, i = e.display.length, a = e.features, o = a.paging;
	return a.serverSide ? o === !1 || t === -1 ? n + i : Math.min(n + t, e.recordsDisplay) : !o || r > i || t === -1 ? i : r;
}
function z(e, t, n, r) {
	n = "DataTables warning: " + (e ? "table id=" + e.tableId + " - " : "") + n, r && (n += ". For more information about this error, please see https://datatables.net/tn/" + r);
	var i = q.sErrMode || q.errMode;
	if (e && H(e, null, "dt-error", [
		e,
		r,
		n
	], !0), i == "alert") alert(n);
	else if (i == "throw") throw Error(n);
	else typeof i == "function" && i(e, r, n);
}
function B(e, t, n, r) {
	if (Array.isArray(n)) for (let r = 0; r < n.length; r++) {
		let i = n[r];
		Array.isArray(i) ? B(e, t, i[0], i[1]) : B(e, t, i);
	}
	else r === void 0 && (r = n), t[n] !== void 0 && (e[r] = t[n]);
}
function Rn(e, t, n) {
	P.s(e).on("click.DT", t, function(e) {
		n(e);
	}).on("keypress.DT", t, function(e) {
		e.which === 13 && (e.preventDefault(), n(e));
	}).on("selectstart.DT", t, function() {
		return !1;
	});
}
function V(e, t, n) {
	n && e.callbacks[t].push(n);
}
function H(e, t, n, r, i = !1) {
	var a = [];
	if (t && (a = e.callbacks[t].slice().reverse().map(function(t) {
		return t.apply(e.instance, r);
	})), n !== null) {
		i && P.trigger(n + ".dt", r, { dt: e.api });
		let t = P.s(e.table), o = t.trigger(n + ".dt", i, r, { dt: e.api });
		i && t.closest("body").count() === 0 && P.s("body").trigger(n + ".dt", i, r, { dt: e.api }), a.push(o[0]);
	}
	return a;
}
function zn(e) {
	var t = e.displayStart, n = Ln(e), r = e.pageLength;
	t >= n && (t = n - r), t -= t % r, (r === -1 || t < 0) && (t = 0), e.displayStart = t;
}
function U(e) {
	return e.features.serverSide ? "ssp" : e.ajax ? "ajax" : "dom";
}
function Bn(e, t, n) {
	var r = e.formatNumber, i = e.displayStart + 1, a = e.pageLength, o = In(e), s = Fn(e), c = a === -1;
	return t.replace(/_START_/g, r(i, e)).replace(/_END_/g, r(Ln(e), e)).replace(/_MAX_/g, r(s, e)).replace(/_TOTAL_/g, r(o, e)).replace(/_PAGE_/g, r(c ? 1 : Math.ceil(i / a), e)).replace(/_PAGES_/g, r(c ? 1 : Math.ceil(o / a), e)).replace(/_ENTRIES_/g, e.api.i18n("entries", "", n)).replace(/_ENTRIES-MAX_/g, e.api.i18n("entries", "", s)).replace(/_ENTRIES-TOTAL_/g, e.api.i18n("entries", "", o));
}
function Vn(e, t) {
	if (t) {
		if (t.length < 1e4) e.push.apply(e, t);
		else for (var n = 0; n < t.length; n++) e.push(t[n]);
	}
}
function Hn(e, t, n) {
	let r = Array.isArray(n) ? n : [n];
	for (var i = 0; i < r.length; i++) e.on(t + ".dt.DT", r[i]);
}
function Un(e) {
	return q.escape.attributes && T(e, function(t, n) {
		e[t] = l(n);
	}), e;
}
var W = {
	className: {},
	detect: [],
	render: {},
	search: {},
	order: {}
};
function Wn(e, t) {
	return function(t) {
		return M.is.empty(t) || typeof t != "string" || (t = t.replace(M.regex.reNewLines, " "), e && (t = M.stripHtml(t)), t = M.diacritics(t, !1)), t;
	};
}
function Gn(e, t, n, r) {
	return e !== 0 && (!e || e === "-") ? -Infinity : typeof e == "number" || typeof e == "bigint" ? e : (t && (e = M.conv.numToDecimal(e, t)), typeof e == "string" && (n && (e = e.replace(n, "")), r && (e = e.replace(r, ""))), e * 1);
}
function G(e, t, n) {
	if (!t) return {
		className: W.className[e],
		detect: W.detect.find(function(t) {
			return t._name === e;
		}),
		order: {
			pre: W.order[e + "-pre"],
			asc: W.order[e + "-asc"],
			desc: W.order[e + "-desc"]
		},
		render: W.render[e],
		search: W.search[e]
	};
	var r = function(t, n) {
		W[t][e] = n;
	}, i = function(t) {
		Object.defineProperty(t, "_name", { value: e });
		var n = W.detect.findIndex(function(t) {
			return t._name === e;
		});
		n === -1 ? W.detect.unshift(t) : W.detect.splice(n, 1, t);
	}, a = function(t) {
		W.order[e + "-pre"] = t.pre, W.order[e + "-asc"] = t.asc, W.order[e + "-desc"] = t.desc;
	};
	n === void 0 && (n = t, t = void 0), t === "className" ? r("className", n) : t === "detect" ? i(n) : t === "order" ? a(n) : t === "render" ? r("render", n) : t === "search" ? r("search", n) : t || (n.className && r("className", n.className), n.detect !== void 0 && i(n.detect), n.order && a(n.order), n.render !== void 0 && r("render", n.render), n.search !== void 0 && r("search", n.search));
}
function Kn() {
	return W.detect.map(function(e) {
		return e._name;
	});
}
var qn = function(e, t) {
	return e = e == null ? "" : e.toString().toLowerCase(), t = t == null ? "" : t.toString().toLowerCase(), e.localeCompare(t, navigator.languages[0] || navigator.language, {
		numeric: !0,
		ignorePunctuation: !0
	});
}, Jn = function(e, t) {
	return e = M.stripHtml(e), t = M.stripHtml(t), qn(e, t);
};
G("string", {
	detect: function() {
		return "string";
	},
	order: { pre: function(e) {
		return M.is.empty(e) && typeof e != "boolean" ? "" : typeof e == "string" ? e.toLowerCase() : e.toString ? e.toString() : "";
	} },
	search: Wn(!1)
}), G("string-utf8", {
	detect: {
		allOf: function() {
			return !0;
		},
		oneOf: function(e) {
			return !M.is.empty(e) && navigator.languages && typeof e == "string" && !!e.match(/[^\x00-\x7F]/);
		}
	},
	order: {
		asc: qn,
		desc: function(e, t) {
			return qn(e, t) * -1;
		}
	},
	search: Wn(!1)
}), G("html", {
	detect: {
		allOf: function(e) {
			return M.is.empty(e) || typeof e == "string" && e.indexOf("<") !== -1;
		},
		oneOf: function(e) {
			return !M.is.empty(e) && typeof e == "string" && e.indexOf("<") !== -1;
		}
	},
	order: { pre: function(e) {
		return M.is.empty(e) ? "" : e.replace ? M.stripHtml(e).trim().toLowerCase() : e + "";
	} },
	search: Wn(!0)
}), G("html-utf8", {
	detect: {
		allOf: function(e) {
			return M.is.empty(e) || typeof e == "string" && e.indexOf("<") !== -1;
		},
		oneOf: function(e) {
			return navigator.languages && !M.is.empty(e) && typeof e == "string" && e.indexOf("<") !== -1 && typeof e == "string" && !!e.match(/[^\x00-\x7F]/);
		}
	},
	order: {
		asc: Jn,
		desc: function(e, t) {
			return Jn(e, t) * -1;
		}
	},
	search: Wn(!0)
}), G("date", {
	className: "dt-type-date",
	detect: {
		allOf: function(e) {
			if (e && !(e instanceof Date) && !M.regex.reDate.test(e)) return null;
			var t = Date.parse(e);
			return t !== null && !isNaN(t) || M.is.empty(e);
		},
		oneOf: function(e) {
			return e instanceof Date || typeof e == "string" && M.regex.reDate.test(e);
		}
	},
	order: { pre: function(e) {
		var t = Date.parse(e);
		return isNaN(t) ? -Infinity : t;
	} }
}), G("html-num-fmt", {
	className: "dt-type-numeric",
	detect: {
		allOf: function(e, t) {
			var n = t.language.decimal;
			return M.is.htmlNum(e, n, !0, !1);
		},
		oneOf: function(e, t) {
			var n = t.language.decimal;
			return M.is.htmlNum(e, n, !0, !1);
		}
	},
	order: { pre: function(e, t) {
		var n = t.language.decimal;
		return Gn(e, n, M.regex.reHtml, M.regex.reFormattedNumeric);
	} },
	search: Wn(!0)
}), G("html-num", {
	className: "dt-type-numeric",
	detect: {
		allOf: function(e, t) {
			var n = t.language.decimal;
			return M.is.htmlNum(e, n, !1, !0);
		},
		oneOf: function(e, t) {
			var n = t.language.decimal;
			return M.is.htmlNum(e, n, !1, !1);
		}
	},
	order: { pre: function(e, t) {
		var n = t.language.decimal;
		return Gn(e, n, M.regex.reHtml);
	} },
	search: Wn(!0)
}), G("num-fmt", {
	className: "dt-type-numeric",
	detect: {
		allOf: function(e, t) {
			var n = t.language.decimal;
			return M.is.num(e, n, !0, !0);
		},
		oneOf: function(e, t) {
			var n = t.language.decimal;
			return M.is.num(e, n, !0, !1);
		}
	},
	order: { pre: function(e, t) {
		var n = t.language.decimal;
		return Gn(e, n, M.regex.reFormattedNumeric);
	} }
}), G("num", {
	className: "dt-type-numeric",
	detect: {
		allOf: function(e, t) {
			var n = t.language.decimal;
			return M.is.num(e, n, !1, !0);
		},
		oneOf: function(e, t) {
			var n = t.language.decimal;
			return M.is.num(e, n, !1, !1);
		}
	},
	order: { pre: function(e, t) {
		var n = t.language.decimal;
		return Gn(e, n);
	} }
});
function Yn(e, t, n, r, i) {
	return Qn ? e[t](i) : Zn ? e[n](i) : r ? e[r](i) : e;
}
var Xn = !1, Zn, Qn;
function $n() {
	Zn = M.external("luxon"), Qn = M.external("moment");
}
function er(e, t, n) {
	var r;
	if ($n(), Qn) {
		if (r = Qn(e, t, n, !0), !r.isValid()) return null;
	} else if (Zn) {
		if (r = t && typeof e == "string" ? Zn.DateTime.fromFormat(e, t) : Zn.DateTime.fromISO(e), !r.isValid) return null;
		r = r.setLocale(n);
	} else t ? (Xn || alert("DataTables warning: Formatted date without Moment.js or Luxon - https://datatables.net/tn/17"), Xn = !0) : r = new Date(e);
	return r;
}
function tr(e) {
	return function(t, n, r, i) {
		arguments.length === 0 ? (r = "en", n = null, t = null) : arguments.length === 1 ? (r = "en", n = t, t = null) : arguments.length === 2 && (r = n, n = t, t = null);
		var a = "datetime" + (n ? "-" + n : "");
		return W.order[a + "-pre"] || G(a, {
			detect: function(e) {
				return e === a && a;
			},
			order: { pre: function(e) {
				return e.valueOf();
			} }
		}), W.className[a] || (W.className[a] = "dt-right"), function(o, s) {
			if (o == null) {
				if (i === "--now") {
					var c = /* @__PURE__ */ new Date();
					o = new Date(Date.UTC(c.getFullYear(), c.getMonth(), c.getDate(), c.getHours(), c.getMinutes(), c.getSeconds()));
				} else o = "";
			}
			if (s === "type") return a;
			if (o === "") return s === "sort" ? er("0000-01-01 00:00:00", null, r) : "";
			if (n !== null && t === n && s !== "sort" && s !== "type" && !(o instanceof Date)) return o;
			let l = {}, u = typeof o == "string" ? o.match(M.regex.isoTimezone) : null;
			u && (l.timeZone = u[1] === "Z" ? "UTC" : u[1]);
			var d = er(o, t, r);
			if (d === null) return o;
			if (s === "sort") return d;
			var f = n === null ? Yn(d, "toDate", "toJSDate", "")[e](navigator.language, l) : Yn(d, "format", "toFormat", "toISOString", n);
			return s === "display" ? M.escapeHtml(f) : f;
		};
	};
}
var nr, rr;
function ir() {
	let e = $.use("win");
	if (nr = ",", rr = ".", e.Intl !== void 0) try {
		for (var t = new Intl.NumberFormat().formatToParts(100000.1), n = 0; n < t.length; n++) t[n].type === "group" ? nr = t[n].value : t[n].type === "decimal" && (rr = t[n].value);
	} catch {}
}
function ar(e, t) {
	var n = "datetime-" + e;
	t ||= "en", W.order[n] || G(n, {
		detect: function(r) {
			var i = er(r, e, t);
			return r === "" || i ? n : !1;
		},
		order: { pre: function(n) {
			return er(n, e, t) || 0;
		} }
	}), W.className[n] || (W.className[n] = "dt-right");
}
var or = {
	date: tr("toLocaleDateString"),
	datetime: tr("toLocaleString"),
	time: tr("toLocaleTimeString"),
	number: function(e, t, n, r, i) {
		return !nr && !rr && ir(), e ??= nr, t ??= rr, { display: function(a) {
			if (typeof a != "number" && typeof a != "string" || a === "" || a === null) return a;
			var o = typeof a == "number" ? a : parseFloat(a), s = o < 0 ? "-" : "", c = Math.abs(o);
			if (c >= 1e11 || c < 1e-4 && c !== 0) {
				var l = o.toExponential(n).split(/e\+?/);
				return l[0] + " x 10<sup>" + l[1] + "</sup>";
			}
			if (isNaN(o)) return M.escapeHtml(a);
			o = o.toFixed(n);
			var u = Math.abs(o), d = Math.abs(parseInt(o, 10)), f = n ? t + (u - d).toFixed(n).substring(2) : "";
			return d === 0 && parseFloat(f) === 0 && (s = ""), s + (r || "") + d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, e) + f + (i || "");
		} };
	},
	text: function() {
		return {
			display: M.escapeHtml,
			filter: M.escapeHtml
		};
	}
}, sr = {
	ariaTitle: "",
	cellType: "td",
	className: "",
	contentPadding: "",
	createdCell: null,
	data: null,
	defaultContent: null,
	footer: null,
	name: "",
	orderable: !0,
	orderData: null,
	orderDataType: "std",
	orderSequence: [
		"asc",
		"desc",
		""
	],
	render: null,
	search: null,
	searchable: !0,
	title: null,
	type: null,
	visible: !0,
	width: null,
	widthCalc: "all"
}, cr = class {
	constructor() {
		this.attrSrc = !1, this.ariaTitle = "", this.className = null, this.contentPadding = null, this.data = null, this.defaultContent = null, this.name = null, this.orderData = [], this.orderDataType = "std", this.orderingClass = null, this.orderSequence = [], this.render = null, this.title = null, this.typeManual = null, this.wideStrings = null, this.width = null, this.widthCalc = "all", this.widthOrig = null;
	}
}, lr = {
	barWidth: -1,
	scrollbarLeft: !1
}, ur = /^(a|aa|ai|ao|as|b|fn|i|m|o|s)([A-Z])([a-z].*$)/;
function dr(e) {
	if (!e) return e;
	let t = Object.keys(e), n = e;
	for (let r = 0; r < t.length; r++) {
		let i = t[r], a = i.match(ur);
		a && (e[a[2].toLowerCase() + a[3]] = n[i]), M.is.plainObject(n[i]) && dr(n[i]);
	}
	return e;
}
function K(e, t, n) {
	e[n] !== void 0 && (e[t] = e[n]);
}
function fr(e, t = !1) {
	dr(e), K(e, "ordering", "sort"), K(e, "orderMulti", "sortMulti"), K(e, "orderClasses", "sortClasses"), K(e, "orderCellsTop", "sortCellsTop"), K(e, "order", "sorting"), K(e, "orderFixed", "sortingFixed"), K(e, "paging", "paginate"), K(e, "pagingType", "paginationType"), K(e, "pageLength", "displayLength"), K(e, "searching", "filter"), K(e, "stateDuration", "cookieDuration"), typeof e.scrollX == "boolean" && (e.scrollX = e.scrollX ? "100%" : ""), typeof e.ordering == "object" ? (e.orderIndicators = e.ordering.indicators === void 0 || e.ordering.indicators, e.orderHandler = e.ordering.handler === void 0 || e.ordering.handler, t || (e.ordering = !0)) : e.ordering === !1 ? (e.orderIndicators = !1, e.orderHandler = !1) : e.ordering === !0 && (e.orderIndicators = !0, e.orderHandler = !0), typeof e.orderCellsTop == "boolean" && (e.titleRow = e.orderCellsTop);
	var n = e.searchCols;
	if (n) for (var r = 0, i = n.length; r < i; r++) n[r] && dr(n[r]);
	e.serverSide && !e.searchDelay && (e.searchDelay = 400), e.language && e.language.url && !e.language.ajax && (e.language.ajax = e.language.url);
}
function pr(e) {
	dr(e), K(e, "orderable", "sortable"), K(e, "orderData", "dataSort"), K(e, "orderSequence", "sorting"), K(e, "orderDataType", "sortDataType"), K(e, "className", "class");
	var t = e.aDataSort, n = e.orderData;
	typeof t == "number" && (e.orderData = [t]), typeof n == "number" && (e.orderData = [n]), e.dataProp !== void 0 && !e.data && (e.data = e.dataProp);
}
function mr(e) {
	if (lr.barWidth === -1) {
		var t = P.c("div").css({
			position: "fixed",
			top: "0",
			left: -1 * k("win").pageXOffset + "px",
			height: "1px",
			width: "1px",
			overflow: "hidden"
		}).append(P.c("div").css({
			position: "absolute",
			top: "1px",
			left: "1px",
			width: "100px",
			overflow: "scroll"
		}).append(P.c("div").css({
			width: "100%",
			height: "10px"
		}))).appendTo("body"), n = t.children(), r = n.children();
		lr.barWidth = n.get(0).offsetWidth - n.get(0).clientWidth, lr.scrollbarLeft = Math.round(r.offset().left) !== 1, t.remove();
	}
	Object.assign(e.browser, lr), e.scroll.barWidth = lr.barWidth;
}
function hr(e) {
	let t = e.columns.length, n = M.object.assign({}, new cr(), sr, {
		orderData: sr.orderData ? sr.orderData : [t],
		data: sr.data ? sr.data : t,
		idx: t,
		searchFixed: {},
		colEl: P.c("col").attr("data-dt-column", t)
	});
	e.columns.push(n);
	let r = e.searchCols;
	e.searches[t] = R(r[t] ? dr(r[t]) : {}), e.searches[t].columns = [t];
}
function gr(e, t, n) {
	var r = e.columns[t];
	if (n != null) {
		pr(n), n.type && (r.typeManual = n.type), n.className && !n.className && (n.className = n.className);
		var i = r.className;
		M.object.assign(r, n), B(r, n, "width", "widthOrig"), i !== r.className && (r.className = i + " " + r.className), B(r, n, "orderData"), n.search && M.object.assign(e.searches[t], n.search);
	}
	var a = r.data, o = M.get(a);
	if (r.render && Array.isArray(r.render)) {
		var s = r.render.slice();
		r.render = or[s.shift()].apply(window, s);
	}
	r.renderer = r.render ? M.get(r.render) : null;
	var c = function(e) {
		return typeof e == "string" && e.indexOf("@") !== -1;
	};
	r.attrSrc = !!a && M.is.plainObject(a) && (c(a.sort) || c(a.type) || c(a.filter)), r.setter = null, r.dataGet = function(e, t, n) {
		var i = o(e, t, void 0, n);
		return r.renderer && t ? r.renderer(i, t, e, n) : i;
	}, r.dataSet = function(e, t, n) {
		return M.set(a)(e, t, n);
	}, typeof a != "number" && !r._isArrayHost && (e.rowReadObject = !0), e.features.ordering || (r.orderable = !1);
}
function _r(e) {
	Nt(e), vr(e);
	let t = e.scroll;
	(t.y !== "" || t.x !== "") && Rt(e), H(e, null, "column-sizing", [e]);
}
function vr(e) {
	let t = e.columns;
	for (let n = 0; n < t.length; n++) {
		let r = Or(e, [n], !1);
		r && (t[n].colEl.css("width", r), e.scroll.x && t[n].colEl.css("min-width", r));
	}
}
function yr(e, t) {
	let n = Sr(e, "visible");
	return typeof n[t] == "number" ? n[t] : null;
}
function br(e, t) {
	let n = Sr(e, "visible").indexOf(t);
	return n === -1 ? null : n;
}
function xr(e) {
	let t = e.header, n = e.columns, r = 0;
	if (t.length) for (let e = 0, i = t[0].length; e < i; e++) n[e].visible && P.s(t[0][e].cell).css("display") !== "none" && r++;
	return r;
}
function Sr(e, t) {
	let n = [];
	return e.columns.map(function(e, r) {
		e[t] && n.push(r);
	}), n;
}
function Cr(e, t) {
	return t === !0 ? e._name : t;
}
function wr(e, t = "") {
	var n = e.columns, r = e.data, i = q.type.detect, a, o, s, c, l, u, d, f, p;
	for (t ||= n.map((e) => e.type).join(","), a = 0, o = n.length; a < o; a++) {
		if (d = n[a], p = [], !d.type && d.typeManual) d.type = d.typeManual;
		else if (!d.type) {
			if (!e.typeDetect) return;
			for (s = 0, c = i.length; s < c; s++) {
				let t = i[s], n, o, c, m = !1;
				if (typeof t == "function" ? o = t : (n = t.oneOf, o = t.allOf, c = t.init), f = null, c && (f = Cr(t, c(e, d, a)), f)) {
					d.type = f;
					break;
				}
				for (l = 0, u = r.length; l < u && !(r[l] && (p[l] === void 0 && (p[l] = F(e, l, a, "type")), n && !m && (m = Cr(t, n(p[l], e))), f = Cr(t, o(p[l], e)), !f && s !== i.length - 3 || f === "html" && !M.is.empty(p[l]))); l++);
				if (n && m && f || !n && f) {
					d.type = f;
					break;
				}
			}
			d.type || (d.type = "string");
		}
		var m = q.type.className[d.type];
		m && (Er(e.header, a, m), Er(e.footer, a, m));
		var h = q.type.render[d.type];
		h && !d.renderer && (d.renderer = M.get(h), Tr(e, a));
	}
	n.map((e) => e.type).join(",") !== t && H(e, null, "columnTypes", [e], !1);
}
function Tr(e, t) {
	let n = e.data;
	for (let r = 0; r < n.length; r++) {
		let i = n[r];
		if (i && i.tr) {
			let n = F(e, r, t, "display");
			i.displayData[t] = n, xt(i.cells[t], n);
		}
	}
}
function Er(e, t, n) {
	e.forEach(function(e) {
		e[t] && e[t].unique && P.s(e[t].cell).classAdd(n);
	});
}
function Dr(e, t, n, r, i) {
	var a, o, s, c, l, u, d = e.columns;
	if (n) for (a = 0, o = n.length; a < o; a++) n[a] && n[a].name && (d[a].name = n[a].name);
	if (t) for (a = t.length - 1; a >= 0; a--) {
		let n = t[a], o = n.target === void 0 ? n.targets === void 0 ? n.aTargets : n.targets : n.target;
		for (Array.isArray(o) || (o = [o]), s = 0, c = o.length; s < c; s++) {
			var f = o[s];
			if (typeof f == "number" && f >= 0) {
				for (; d.length <= f;) hr(e);
				i(f, n);
			} else if (typeof f == "number" && f < 0) i(d.length + f, n);
			else if (typeof f == "string") for (l = 0, u = d.length; l < u; l++) f === "_all" ? i(l, n) : f.indexOf(":name") === -1 ? r.forEach(function(e) {
				if (e[l]) {
					var t = e[l].cell;
					f.match(/^[a-z][\w-]*$/i) && (f = "." + f), t.matches(f) && i(l, n);
				}
			}) : d[l].name === f.replace(":name", "") && i(l, n);
		}
	}
	if (n) for (a = 0, o = n.length; a < o; a++) i(a, n[a]);
}
function Or(e, t, n, r) {
	Array.isArray(t) || (t = kr(t));
	let i = 0, a = "px", o = e.columns;
	for (let e = 0, r = t.length; e < r; e++) {
		let r = o[t[e]], s = n ? r.widthOrig : r.width;
		if (r.visible !== !1) {
			if (s == null) return null;
			if (typeof s == "number") i += s;
			else {
				let e = s.match(/([\d\.]+)([^\d]*)/);
				e && (i += parseFloat(e[1]), a = e.length === 3 ? e[2] : "px");
			}
		}
	}
	return i + a;
}
function kr(e) {
	let t = P.s(e).closest("[data-dt-column]").attr("data-dt-column");
	return t ? t.split(",").map(function(e) {
		return parseInt(e);
	}) : [];
}
function Ar(e, t = null, n = null) {
	for (var r = [], i = [], a = 0; a < e.length; a++) if (t === null || t === a) for (var o = 0; o < e[a].length; o++) {
		var s = e[a][o].cell;
		n !== null && n !== o || i.includes(s) || (i.push(s), r.push({
			cell: s,
			row: e[a].row
		}));
	}
	return r;
}
function jr(e, t) {
	let n = [], r = e.titleRow;
	n = r === !0 ? Ar(e.header, 0) : r === !1 ? Ar(e.header, e.header.length - 1) : r === null ? Ar(e.header) : Ar(e.header, r);
	let i = n.map((e) => e.cell), a = n.map((e) => e.row);
	return P.s(i).filter("th" + t + ", td" + t).filter((e) => {
		let n = i.indexOf(e);
		return n >= 0 ? P.s(a[n]).filter(t).length !== 0 : !0;
	});
}
var Mr = (e, t, n) => {
	t.classAdd(n.tfoot.cell);
}, Nr = (e, t, n) => {
	t.classAdd(n.thead.cell), e.features.ordering || t.classAdd(n.order.none), jr(e, ":not([data-dt-order=\"disable\"])").get().includes(t[0]) && P.s(e.table).on("order.dt.DT column-visibility.dt.DT", function(r, i, a) {
		if (e === i) {
			var o = i.sortDetails;
			if (o) {
				var s = A(o, "col");
				if (r.type !== "column-visibility" || s.includes(a)) {
					var c, l = n.order, u = i.api.columns(t), d = e.columns[u.flatten()[0]], f = u.orderable().includes(!0), p = "", m = u.indexes(), h = u.orderable(!0).flatten(), g = e.tabIndex, _ = i.orderHandler && f;
					t.classRemove(l.isAsc + " " + l.isDesc).classToggle(l.none, !f).classToggle(l.canAsc, _ && h.includes("asc")).classToggle(l.canDesc, _ && h.includes("desc"));
					var v = !0;
					for (c = 0; c < m.length; c++) s.includes(m[c]) || (v = !1);
					if (v) {
						var y = u.order();
						t.classAdd((y.includes("asc") ? l.isAsc : "") + (y.includes("desc") ? l.isDesc : ""));
					}
					var b = -1;
					for (c = 0; c < s.length; c++) if (e.columns[s[c]].visible) {
						b = s[c];
						break;
					}
					if (m[0] == b) {
						var x = o[0], ee = d.orderSequence;
						t.attr("aria-sort", x.dir === "asc" ? "ascending" : "descending"), p = ee && !ee[x.index + 1] ? "Remove" : "Reverse";
					} else t.attrRemove("aria-sort");
					if (f) {
						var S = t.find(".dt-column-order");
						S.attr("role", "button").attr("aria-label", f ? d.ariaTitle + i.api.i18n("aria.orderable" + p) : d.ariaTitle), g !== -1 && S.attr("tabindex", g);
					}
				}
			}
		}
	});
}, Pr = (e, t, n) => {
	let r = e.classes.layout, i = P.c("div").attr("id", n.id || null).classAdd(n.className || r.row).appendTo(t);
	Lr(n, function(e, t) {
		var n = "";
		t.table && (i.classAdd(r.tableRow), n += r.tableCell + " "), n += e === "start" ? r.start : e === "end" ? r.end : r.full, P.c("div").attr({
			id: t.id || null,
			class: t.className ? t.className : r.cell + " " + n
		}).append(t.contents).appendTo(i);
	});
}, Fr = (e, t, n, r, i) => {
	var a = e.classes.paging, o = [a.button], s;
	return r && o.push(a.active), i && o.push(a.disabled), s = t === "ellipsis" ? P.c("span").classAdd("ellipsis").html(n).get(0) : P.c("button").classAdd(o.join(" ")).attr("role", "link").attr("type", "button").html(n).get(0), {
		display: s,
		clicker: s
	};
}, Ir = (e, t) => t;
function Lr(e, t) {
	e.start && t("start", e.start), e.end && t("end", e.end), e.full && t("full", e.full);
}
var q = {
	builder: "-source-",
	buttons: {},
	ccContent: {},
	classes: pt,
	errMode: "alert",
	escape: { attributes: !1 },
	feature: dt,
	features: ut,
	search: [],
	selector: {
		cell: [],
		column: [],
		row: []
	},
	settings: [],
	legacy: { ajax: null },
	pager: ht,
	renderer: {
		footer: { _: Mr },
		header: { _: Nr },
		layout: { _: Pr },
		pagingButton: { _: Fr },
		pagingContainer: { _: Ir }
	},
	rendererDisplayRowCells: Lr,
	order: {},
	type: W,
	_unique: 0,
	version: "3.1.5"
};
Object.assign(q, {
	afnFiltering: q.search,
	aTypes: q.type.detect,
	ofnSearch: q.type.search,
	oSort: q.type.order,
	afnSortData: q.order,
	aoFeatures: q.feature,
	oStdClasses: q.classes,
	oPagination: q.pager,
	sVersion: q.version,
	fnVersionCheck: Ve
});
function Rr(e, t, n, r, i) {
	var a = [], o, s, c, l = typeof t;
	for (t instanceof P && (t = t.get()), t && l !== "string" && l !== "function" && t.length !== void 0 || (t = [t]), s = 0, c = t.length; s < c; s++) o = n(typeof t[s] == "string" ? t[s].trim() : t[s]), o = o.filter(function(e) {
		return e != null;
	}), o && o.length && (a = a.concat(o));
	var u = q.selector[e];
	if (u.length) for (s = 0, c = u.length; s < c; s++) a = u[s](r, i, a);
	return Ae(a);
}
function zr(e) {
	return e ||= {}, e.filter && e.search === void 0 && (e.search = e.filter), E({}, {
		columnOrder: "implied",
		search: "none",
		order: "current",
		page: "all"
	}, e);
}
function Br(e) {
	var t = e.inst(e.context[0], null, e._newClass.replace(/s$/, ""));
	return e.length && t.push(e[0]), t.selector = e.selector, t.length && t[0].length > 1 && t[0].splice(1), t;
}
function Vr(e, t) {
	var n, r, i, a = [], o = e.display, s = e.displayMaster, c = t.search, l = t.order, u = t.page;
	if (U(e) == "ssp") return c === "removed" ? [] : j(0, s.length);
	if (u == "current") for (n = e.displayStart, r = Ln(e); n < r; n++) a.push(o[n]);
	else if (l == "current" || l == "applied") {
		if (c == "none") a = s.slice();
		else if (c == "applied") a = o.slice();
		else if (c == "removed") {
			var d = {};
			for (n = 0, r = o.length; n < r; n++) d[o[n]] = null;
			s.forEach(function(e) {
				Object.prototype.hasOwnProperty.call(d, e) || a.push(e);
			});
		}
	} else if (l == "index" || l == "original") for (n = 0, r = e.data.length; n < r; n++) e.data[n] && (c == "none" ? a.push(n) : (i = o.indexOf(n), (i === -1 && c == "removed" || i >= 0 && c == "applied") && a.push(n)));
	else if (typeof l == "number") {
		var f = Zt(e, l, "asc");
		if (c === "none") a = f;
		else for (n = 0; n < f.length; n++) i = o.indexOf(f[n]), (i === -1 && c == "removed" || i >= 0 && c == "applied") && a.push(f[n]);
	}
	return a;
}
var J = Array.prototype, Y = function(e, t) {
	if (!(this instanceof Y)) return new Y(e, t);
	this.context = Jr(e), Vn(this, t), Gr(this, "Api");
};
M.object.assign(Y.prototype, {
	_newClass: "Api",
	isDataTableApi: !0,
	any() {
		return this.count() !== 0;
	},
	context: [],
	count() {
		return this.flatten().length;
	},
	each(e) {
		for (var t = 0, n = this.length; t < n; t++) e.call(this, this[t], t, this);
		return this;
	},
	eq(e) {
		var t = this.context;
		return t.length > e ? this.inst(t[e], this[e], "Api") : null;
	},
	filter(e) {
		var t = J.filter.call(this, e, this);
		return this.inst(this.context, t);
	},
	flatten() {
		var e = [];
		return this.inst(this.context, e.concat.apply(e, this.toArray()));
	},
	get(e) {
		return this[e];
	},
	join: J.join,
	includes(e) {
		return this.indexOf(e) !== -1;
	},
	indexOf: J.indexOf,
	inst(e, t, n) {
		let r = n || this._newClass, i = Y;
		return Ur[r] && (i = Ur[r]), new i(e, t);
	},
	iterator(e, t, n, r) {
		var i = [], a, o, s, c, l, u = this.context, d, f, p, m = this.selector;
		for (typeof e == "string" && (r = n, n = t, t = e, e = !1), o = 0, s = u.length; o < s; o++) {
			var h = this.inst(u[o]);
			if (t === "table") a = n.call(h, u[o], o), a !== void 0 && i.push(a);
			else if (t === "columns" || t === "rows") a = n.call(h, u[o], this[o], o), a !== void 0 && i.push(a);
			else if (t === "every" || t === "column" || t === "column-rows" || t === "row" || t === "cell") for (f = this[o], t === "column-rows" && (d = Vr(u[o], m.opts)), c = 0, l = f.length; c < l; c++) p = f[c], a = t === "cell" ? n.call(h, u[o], p.row, p.column, o, c) : n.call(h, u[o], p, o, c, d), a !== void 0 && i.push(a);
		}
		if (i.length || r) {
			var g = this.inst(u, e ? i.concat.apply([], i) : i), _ = g.selector;
			return _ && (_.rows = m.rows, _.cols = m.cols, _.opts = m.opts), g;
		}
		return this;
	},
	lastIndexOf: J.lastIndexOf,
	length: 0,
	map(e) {
		var t = J.map.call(this, e, this);
		return this.inst(this.context, t);
	},
	pluck(e) {
		var t = M.get(e);
		return this.map((e) => t(e));
	},
	pop: J.pop,
	push: J.push,
	reduce: J.reduce,
	reduceRight: J.reduceRight,
	reverse: J.reverse,
	selector: {
		rows: void 0,
		cols: void 0,
		opts: void 0
	},
	shift: J.shift,
	slice() {
		return this.inst(this.context, this);
	},
	sort: J.sort,
	splice: J.splice,
	toArray() {
		return J.slice.call(this);
	},
	to$() {
		return M.external("jq")(this);
	},
	toDom() {
		return new P(this.toArray());
	},
	toJQuery: function() {
		return M.external("jq")(this);
	},
	unique: function() {
		return this.inst(this.context, M.array.unique(this.toArray()));
	},
	unshift: J.unshift
});
function X(e, t) {
	if (Array.isArray(e)) {
		for (let n = 0; n < e.length; n++) Y.register(e[n], t);
		return;
	}
	let n = Kr(e);
	if (Ur[n.hostClass] || Wr(n.hostClass), n.property) Hr[n.propertyHost] || (Hr[n.propertyHost] = []), Hr[n.propertyHost].push({
		couldReturn: n.couldReturn,
		property: n.property,
		method: n.methodName,
		fn: t
	});
	else {
		let e = function() {
			let e = this._newClass;
			this._newClass = n.couldReturn;
			let r = t.apply(this, arguments);
			return this._newClass = e, r;
		};
		Ur[n.hostClass].prototype[n.methodName] = e, n.hostClass === "Api" && M.object.each(Ur, (t, r) => {
			r.prototype[n.methodName] || (r.prototype[n.methodName] = e);
		});
	}
}
function Z(e, t, n) {
	Y.register(e, n), Y.register(t, function() {
		var e = n.apply(this, arguments);
		return e === this ? this : e && e.isDataTableApi ? e.length ? Array.isArray(e[0]) ? this.inst(e.context, e[0]) : e[0] : void 0 : e;
	});
}
Y.register = X, Y.registerPlural = Z;
var Hr = {}, Ur = { Api: Y };
function Wr(e) {
	let t = function(e, t) {
		this.context = Jr(e), Vn(this, t), Gr(this, "Api"), Gr(this, this._newClass);
	};
	t.prototype = Object.create(Y.prototype), Object.defineProperty(t, "name", {
		value: e,
		writable: !1
	}), t.prototype._newClass = e, Ur[e] = t;
}
function Gr(e, t) {
	let n = Hr[t];
	if (n) for (let t = 0; t < n.length; t++) {
		let r = n[t];
		if (!e[r.property]) e[r.property] = {};
		else if (!e.hasOwnProperty(r.property)) {
			let t = e[r.property];
			e[r.property] = function() {
				return t.apply(e, arguments);
			};
		}
		e[r.property][r.method] = function() {
			let t = e._newClass;
			e._newClass = r.couldReturn;
			let n = r.fn.apply(e, arguments);
			return e._newClass = t, n;
		};
	}
}
function Kr(e) {
	let t = e.split("."), n = null, r = "Api", i = "Api", a = "", o = "", s = "";
	for (let e = 0; e < t.length; e++) {
		let c = t[e], l = c.replace("()", "");
		r = i, i += l.charAt(0).toUpperCase() + l.slice(1).toLowerCase(), c.includes("()") ? (a = l, s.includes("()") && (n = null, o = "")) : (n = c, o = r), s = c;
	}
	return {
		couldReturn: i,
		hostClass: r,
		property: n,
		propertyHost: o,
		methodName: a
	};
}
function qr(e) {
	var t = e, n, r = null, i = q.settings, a = M.array.pluck(i, "table");
	if (!t) return [];
	if (t.table && t.features) return [t];
	if (t.nodeName && t.nodeName.toLowerCase() === "table") return n = a.indexOf(t), n === -1 ? null : [i[n]];
	if (t && typeof t.settings == "function") return t.settings().toArray();
	if (typeof t == "string" ? r = P.s(t).get() : (M.is.jquery(t) || M.is.dom(t)) && (r = t.get()), r) return i.filter(function(e, t) {
		return r.includes(a[t]);
	});
}
function Jr(e) {
	var t, n = [], r = function(e) {
		var t = qr(e);
		t && n.push.apply(n, t);
	};
	if (Array.isArray(e)) for (t = 0; t < e.length; t++) r(e[t]);
	else r(e);
	return n.length > 1 ? M.unique(n) : n;
}
X("$()", function(e, t) {
	let n = M.external("jq");
	n || z(this.context[0], 0, "No jQuery available. Use `.dom()` or register jQuery");
	let r = n(this.rows(t).nodes());
	return n([].concat(r.filter(e).toArray(), r.find(e).toArray()));
}), [
	"on",
	"one",
	"off"
].forEach((e) => {
	X(e + "()", function() {
		var t = Array.prototype.slice.call(arguments);
		t[0] = t[0].split(/\s/).map(function(e) {
			return e.match(/\.dt\b/) ? e : e + ".dt";
		}).join(" ");
		var n = P.s(this.tables().nodes());
		return n[e].apply(n, t), this;
	});
}), X("clear()", function() {
	return this.iterator("table", function(e) {
		Ct(e);
	});
}), X("error()", function(e) {
	return this.iterator("table", function(t) {
		z(t, 0, e);
	});
}), X("settings()", function() {
	return new Y(this.context, this.context);
}), X("init()", function() {
	var e = this.context;
	return e.length ? e[0].init : null;
}), X("data()", function() {
	return this.iterator("table", function(e) {
		return M.array.pluck(e.data, "data");
	}).flatten();
}), X("trigger()", function(e, t, n) {
	return this.iterator("table", function(r) {
		return H(r, null, e, t, n);
	}).flatten();
}), X("ready()", function(e) {
	var t = this.context;
	return e ? this.tables().every(function() {
		var n = this;
		this.context[0].initDone ? e.call(n) : this.on("init.dt.DT", function(r, i) {
			t.includes(i) && e.call(n);
		});
	}) : t.length && t[0].initDone || !1;
}), X("destroy()", function(e) {
	return e ||= !1, this.iterator("table", function(t) {
		var n = t.classes, r = t.table, i = t.tbody, a = t.thead, o = t.tfoot, s = P.s(r), c = P.s(i), l = P.s(t.tableWrapper), u = t.data.map(function(e) {
			return e ? e.tr : null;
		}).filter((e) => !!e), d = n.order;
		t.destroying = !0, H(t, "destroy", "destroy", [t], !0), e || new Y(t).columns().visible(!0), t.resizeObserver && t.resizeObserver.disconnect(), l.off(".DT").find(":not(tbody *)").off(".DT"), t.windowResizeCb && window.removeEventListener("resize", t.windowResizeCb), r != a.parentNode && (s.children("thead").detach(), s.append(a)), o && r != o.parentNode && (s.children("tfoot").detach(), s.append(o)), Yr(a, "header"), Yr(o, "footer"), t.colgroup.remove(), t.order = [], t.orderFixed = [], $t(t), s.find("th, td").classRemove(Object.values(q.type.className).join(" ")), P.s(a).find("th, td").classRemove(d.none + " " + d.canAsc + " " + d.canDesc + " " + d.isAsc + " " + d.isDesc).css("width", "").attrRemove("aria-sort"), c.children().detach(), c.append(u);
		var f = t.tableWrapper.parentNode, p = t.tableWrapper.nextSibling, m = e ? "remove" : "detach";
		s[m](), l[m](), !e && f && (f.insertBefore(r, p), s.css("width", t + "px").classRemove(n.table));
		var h = q.settings.indexOf(t);
		h !== -1 && q.settings.splice(h, 1);
	});
}), X("i18n()", function(e, t, n) {
	var r = this.context[0], i = M.get(e)(r.language);
	return i === void 0 && (i = t), M.is.plainObject(i) && n !== !1 && (i = n !== void 0 && i[n] !== void 0 ? i[n] : i._), typeof i == "string" ? i.replace("%d", n) : i;
});
function Yr(e, t) {
	let n = P.s(e);
	n.find(".dt-column-order").remove(), n.find(".dt-column-title").each(function(e) {
		let t = P.s(e);
		var n = t.html();
		t.parent().parent().html(n), t.remove();
	}), n.find("div.dt-column-" + t).remove(), n.find("th, td").attrRemove("data-dt-column");
}
var Xr = function(e, t, n) {
	if (n) {
		var r = new Y(e);
		r.one("draw", function() {
			n(r.ajax.json());
		});
	}
	if (U(e) == "ssp") jn(e, t);
	else {
		I(e, !0);
		var i = e.jqXHR;
		i && i.readyState !== 4 && typeof i.abort == "function" && i.abort(), ln(e, {}, function(n) {
			Ct(e);
			for (var r = mn(e, n, !1), i = 0, a = r.length; i < a; i++) vt(e, r[i]);
			jn(e, t), cn(e), I(e, !1);
		});
	}
};
X("ajax.json()", function() {
	var e = this.context;
	if (e.length > 0) return e[0].json;
}), X("ajax.params()", function() {
	var e = this.context;
	if (e.length > 0) return e[0].ajaxData;
}), X("ajax.reload()", function(e, t) {
	return this.iterator("table", function(n) {
		Xr(n, t === !1, e);
	});
}), X("ajax.url()", function(e) {
	var t = this.context;
	if (e === void 0) {
		if (t.length === 0) return;
		let e = t[0];
		return M.is.plainObject(e.ajax) ? e.ajax.url : e.ajax;
	}
	return this.iterator("table", function(t) {
		M.is.plainObject(t.ajax) ? t.ajax.url = e : t.ajax = e;
	}, !0);
}), X("ajax.url().load()", function(e, t) {
	return this.iterator("table", function(n) {
		Xr(n, t === !1, e);
	});
});
function Zr(e, t, n) {
	var r = e.data, i = Vr(e, n), a, o, s = e.columns.length, c, l, u, d, f, p;
	return Rr("cell", t, function(t) {
		var n = typeof t == "function";
		if (t == null || n) {
			for (c = [], l = 0, u = i.length; l < u; l++) for (o = i[l], d = 0; d < s; d++) f = {
				row: o,
				column: d
			}, n ? (p = r[o], t(f, F(e, o, d), p && p.cells ? p.cells[d] : null) && c.push(f)) : c.push(f);
			return c;
		}
		if (w(t)) return t.column !== void 0 && t.row !== void 0 && i.indexOf(t.row) !== -1 ? [t] : [];
		if (!a) {
			let e = Oe(De(r, i, "cells"));
			a = P.s(Te([], e));
		}
		let m = a.filter(t).mapTo((e) => ({
			row: e._DT_CellIndex.row,
			column: e._DT_CellIndex.column
		}));
		if (m.length || !t.nodeName) return m;
		let h = P.s(t).closest("*[data-dt-row]"), g = P.s(t).closest("*[data-dt-column]");
		return h.count() ? [{
			row: parseInt(h.attr("data-dt-row")),
			column: parseInt(g.attr("data-dt-column"))
		}] : [];
	}, e, n);
}
X("cells()", function(e, t, n) {
	let r = null, i = null, a, o;
	if (w(e) ? e.row === void 0 ? o = e : (a = e, o = t) : w(t) || t === void 0 ? (a = e, o = t) : e !== void 0 && (r = e, i = t, o = n), i === null) return this.iterator("table", function(e) {
		return Zr(e, a, zr(o));
	});
	let s = o ? {
		page: o.page,
		order: o.order,
		search: o.search
	} : {}, c = this.columns(i, s), l = this.rows(r, s), u, d, f, p, m = this.iterator("table", function(e, t) {
		let n = [];
		for (u = 0, d = l[t].length; u < d; u++) for (f = 0, p = c[t].length; f < p; f++) n.push({
			row: l[t][u],
			column: c[t][f]
		});
		return n;
	}, !0), h = o && o.selected ? this.cells(m.toArray(), o) : m;
	return E(h.selector, {
		cols: i,
		rows: r,
		opts: o
	}), h;
}), X("cells().every()", function(e) {
	var t = this.selector.opts, n = 0;
	return this.iterator("every", (r, i, a) => {
		let o = this.cell(i, t);
		e.call(o, o[0][0].row, o[0][0].column, a, n), n++;
	});
}), Z("cells().nodes()", "cell().node()", function() {
	return this.iterator("cell", function(e, t, n) {
		var r = e.data[t];
		return r && r.cells ? r.cells[n] : void 0;
	}, !0);
}), X("cells().data()", function() {
	return this.iterator("cell", function(e, t, n) {
		return F(e, t, n);
	}, !0);
}), Z("cells().render()", "cell().render()", function(e) {
	return this.iterator("cell", function(t, n, r) {
		return F(t, n, r, e);
	}, !0);
}), Z("cells().indexes()", "cell().index()", function() {
	return this.iterator("cell", function(e, t, n) {
		return {
			row: t,
			column: n,
			columnVisible: br(e, n)
		};
	}, !0);
}), Z("cells().invalidate()", "cell().invalidate()", function(e) {
	return this.iterator("cell", function(t, n, r) {
		wt(t, n, e, r);
	});
}), X("cell()", function(e, t, n) {
	return Br(this.cells(e, t, n));
}), X("cell().data()", function(e) {
	var t = this.context, n = this[0];
	return e === void 0 ? t.length && n.length ? F(t[0], n[0].row, n[0].column) : void 0 : (bt(t[0], n[0].row, n[0].column, e), wt(t[0], n[0].row, "data", n[0].column), this);
});
var Qr = /^(.*?):(name|title|visIdx|visible)$/;
function $r(e, t, n, r, i, a) {
	let o = [];
	for (let n = 0, r = i.length; n < r; n++) o.push(F(e, i[n], t, a));
	return o;
}
function ei(e, t, n) {
	var r = e.header, i = e.titleRow, a = 0;
	if (n !== void 0) a = n;
	else if (i === !0) a = 0;
	else if (i === !1) a = r.length - 1;
	else if (i !== null) a = i;
	else {
		for (var o = 0; o < r.length; o++) r[o][t].unique && P.s(r[o][t].cell).find(".dt-column-title").text() && (a = o);
		a === null && (a = 0);
	}
	return r[a][t].cell;
}
function ti(e, t, n) {
	var r = e.columns, i, a, o = Rr("column", t, function(t) {
		var o = m(t);
		if (t === "") return j(r.length);
		if (o !== null) return [o >= 0 ? o : r.length + o];
		if (typeof t == "function") {
			var s = Vr(e, n);
			return r.map(function(n, r) {
				return t(r, $r(e, r, 0, 0, s), ei(e, r)) ? r : null;
			});
		}
		var c = typeof t == "string" ? t.match(Qr) : "";
		if (c) switch (c[2]) {
			case "visIdx":
			case "visible":
				if (c[1] && c[1].match(/^\d+$/)) {
					var l = parseInt(c[1], 10);
					if (l < 0) {
						var u = r.map(function(e, t) {
							return e.visible ? t : null;
						});
						return [u[u.length + l]];
					}
					return [yr(e, l)];
				}
				return r.map(function(t, n) {
					if (!t.visible || t.responsiveVisible === !1) return null;
					if (c && c[1]) {
						let r = Ar(e.header, null, t.idx).map((e) => e.cell);
						return P.s(r).filter(c[1]).count() > 0 ? n : null;
					}
					return n;
				});
			case "name": return i ||= A(r, "name"), i.map(function(e, t) {
				return c && e === c[1] ? t : null;
			});
			case "title": return a ||= A(r, "title"), a.map(function(e, t) {
				return c && e === c[1] ? t : null;
			});
			default: return [];
		}
		if (t.nodeName && t._DT_CellIndex) return [t._DT_CellIndex.column];
		var d = P.s(Ar(e.header).map((e) => e.cell)).filter(t).mapTo((e) => kr(e)).flat().sort(function(e, t) {
			return e - t;
		});
		if (d.length || !t.nodeName) return d;
		var f = P.s(t).closest("*[data-dt-column]");
		return f.count() ? [parseInt(f.attr("data-dt-column"))] : [];
	}, e, n);
	return n.columnOrder && n.columnOrder === "index" ? o.sort(function(e, t) {
		return e - t;
	}) : o;
}
function ni(e, t, n) {
	var r = e.columns, i = r[t], a = e.data, o, s, c, l;
	if (n === void 0) return i.visible;
	if (i.visible === n) return !1;
	if (n) {
		var u = A(r, "visible").indexOf(!0, t + 1);
		for (s = 0, c = a.length; s < c; s++) {
			let e = a[s];
			e && (l = e.tr, o = e.cells, l && l.insertBefore(o[t], o[u] || null));
		}
	} else P.s(Oe(A(e.data, "cells", t))).detach();
	return i.visible = n, It(e), !0;
}
X("columns()", function(e, t) {
	let n, r;
	e === void 0 ? n = "" : w(e) ? (n = "", t = e) : n = e, r = zr(t);
	let i = this.iterator("table", (e) => ti(e, n, r), !0);
	return i.selector.cols = n, i.selector.opts = r, i;
}), X("columns().every()", function(e) {
	var t = this.selector.opts, n = 0;
	return this.iterator("every", (r, i, a) => {
		let o = this.column(i, t);
		e.call(o, i, a, n), n++;
	});
}), Z("columns().header()", "column().header()", function(e) {
	return this.iterator("column", function(t, n) {
		return ei(t, n, e);
	}, !0);
}), Z("columns().footer()", "column().footer()", function(e) {
	return this.iterator("column", function(t, n) {
		return t.footer.length ? t.footer[e === void 0 ? 0 : e][n].cell : null;
	}, !0);
}), Z("columns().data()", "column().data()", function() {
	return this.iterator("column-rows", $r, !0);
}), Z("columns().render()", "column().render()", function(e) {
	return this.iterator("column-rows", function(t, n, r, i, a) {
		return $r(t, n, r, i, a, e);
	}, !0);
}), Z("columns().dataSrc()", "column().dataSrc()", function() {
	return this.iterator("column", function(e, t) {
		return e.columns[t].data;
	}, !0);
}), Z("columns().init()", "column().init()", function() {
	return this.iterator("column", function(e, t) {
		return e.columns[t];
	}, !0);
}), Z("columns().names()", "column().name()", function() {
	return this.iterator("column", function(e, t) {
		return e.columns[t].name;
	}, !0);
}), Z("columns().nodes()", "column().nodes()", function() {
	return this.iterator("column-rows", function(e, t, n, r, i) {
		return Oe(De(e.data, i, "cells", t));
	}, !0);
}), Z("columns().titles()", "column().title()", function(e, t) {
	return this.iterator("column", function(n, r) {
		typeof e == "number" && (t = e, e = void 0);
		var i = P.s(this.column(r).header(t)).find(".dt-column-title");
		return e === void 0 ? i.html() : (i.html(e), this);
	}, !0);
}), Z("columns().types()", "column().type()", function() {
	return this.iterator("column", function(e, t) {
		var n = e.columns[t], r = n.type;
		return r ||= (wr(e), n.type), r;
	}, !0);
}), Z("columns().visible()", "column().visible()", function(e, t) {
	var n = this, r = [], i = this.iterator("column", function(t, n) {
		if (e === void 0) return t.columns[n].visible;
		ni(t, n, e) && r.push(n);
	});
	return e !== void 0 && this.iterator("table", function(i) {
		kn(i, i.header), kn(i, i.footer), i.display.length || P.s(i.tbody).find("td[colspan]").attr("colspan", xr(i)), rn(i), n.iterator("column", function(n, i) {
			r.includes(i) && H(n, null, "column-visibility", [
				n,
				i,
				e,
				t
			]);
		}), r.length && (t === void 0 || t) && n.columns.adjust();
	}), i;
}), Z("columns().widths()", "column().width()", function() {
	let e = this.columns(":visible"), t = P.c("tr");
	for (let n = 0; n < e.count(); n++) P.c("td").appendTo(t);
	P.s(this.table().body()).append(t);
	let n = [], r = e.indexes();
	return t.children().each((e, t) => {
		n[r[t]] = P.s(e).width("outer");
	}), t.remove(), this.iterator("column", (e, t) => n[t] || 0, !0);
}), Z("columns().indexes()", "column().index()", function(e) {
	return this.iterator("column", function(t, n) {
		return e === "visible" ? br(t, n) : n;
	}, !0);
}), X("columns.adjust()", function() {
	return this.iterator("table", function(e) {
		e.containerWidth = -1, _r(e);
	}, !0);
}), X("column.index()", function(e, t) {
	if (this.context.length !== 0) {
		var n = this.context[0];
		if (e === "fromVisible" || e === "toData") return yr(n, t);
		if (e === "fromData" || e === "toVisible") return br(n, t);
	}
	return -1;
}), X("column()", function(e, t) {
	return Br(this.columns(e, t));
}), Y.register("draw()", function(e) {
	return this.iterator("table", function(t) {
		e === "page" ? An(t) : (typeof e == "string" && (e = e !== "full-hold"), jn(t, e === !1));
	});
}), X("order()", function(e, t) {
	let n = this.context, r = Array.prototype.slice.call(arguments);
	return e === void 0 ? n.length === 0 ? void 0 : n[0].order : (typeof e == "number" && typeof t == "string" ? e = [[e, t]] : r.length > 1 && (e = r), this.iterator("table", function(t) {
		let n = [];
		Yt(t, n, e), t.order = n;
	}));
}), X("order.listener()", function(e, t, n) {
	return this.iterator("table", function(r) {
		qt(r, e, "", t, n);
	});
}), X("order.fixed()", function(e) {
	if (!e) {
		var t = this.context, n = t.length ? t[0].orderFixed : void 0;
		return Array.isArray(n) ? { pre: n } : n;
	}
	return this.iterator("table", function(t) {
		t.orderFixed = ne({}, e);
	});
}), X(["columns().order()", "column().order()"], function(e) {
	var t = this;
	return e ? this.iterator("table", function(n, r) {
		n.order = t[r].map(function(t) {
			return [t, e];
		});
	}) : this.iterator("column", function(e, t) {
		for (var n = Xt(e), r = 0, i = n.length; r < i; r++) if (n[r].col === t) return n[r].dir;
		return null;
	}, !0);
}), Z("columns().orderable()", "column().orderable()", function(e) {
	return this.iterator("column", function(t, n) {
		var r = t.columns[n];
		return e ? r.orderSequence : r.orderable;
	}, !0);
});
function ri(e, t) {
	let n = typeof t == "string" ? parseInt(t, 10) : t;
	e.pageLength = n, zn(e), H(e, null, "length", [e, n]);
}
X("page()", function(e) {
	return e === void 0 ? this.page.info().page : this.iterator("table", function(t) {
		nn(t, e);
	});
}), X("page.info()", function() {
	var e = this.context[0], t = e.displayStart, n = e.features.paging ? e.pageLength : -1, r = In(e), i = n === -1;
	return {
		page: i ? 0 : Math.floor(t / n),
		pages: i ? 1 : Math.ceil(r / n),
		start: t,
		end: Ln(e),
		length: n,
		recordsTotal: Fn(e),
		recordsDisplay: r,
		serverSide: U(e) === "ssp"
	};
}), X("page.len()", function(e) {
	return e == null ? this.context.length === 0 ? void 0 : this.context[0].pageLength : this.iterator("table", function(t) {
		ri(t, e);
	});
}), X("processing()", function(e) {
	return this.iterator("table", (t) => I(t, e));
}), P.on("preInit.dt", function(e, t) {
	var n = new Y(t);
	n.on("stateSaveParams.DT", function(e, t, n) {
		for (var r = t.rowIdFn, i = t.displayMaster, a = [], o = 0; o < i.length; o++) {
			var s = i[o], c = t.data[s];
			c.detailsShow && a.push("#" + r(c.data));
		}
		n.childRows = a;
	}), n.on("stateLoaded.DT", function(e, t, r) {
		ii(n, r);
	});
}), P.on("plugin-init.dt", function(e, t) {
	var n = t.api;
	ii(n, n.state.loaded());
});
function ii(e, t) {
	t && t.childRows && e.rows(t.childRows.map(function(e) {
		return e.replace(/([^:\\]*(?:\\.[^:\\]*)*):/g, "$1\\:");
	})).every(function() {
		H(e.settings()[0], null, "requestChild", [this]);
	});
}
function ai(e, t, n, r) {
	if (t) {
		var i = [], a = function(n, r) {
			if (Array.isArray(n) || M.is.jquery(n)) for (var o = 0, s = n.length; o < s; o++) a(n[o], r);
			else if (n.nodeName && n.nodeName.toLowerCase() === "tr") n.setAttribute("data-dt-row", t.idx), i.push(n);
			else {
				let a = P.c("td").classAdd(r), o = P.c("tr").append(a).attr("data-dt-row", t.idx).classAdd(r);
				n.nodeName ? a.append(n) : a.html(n), a.get(0).colSpan = xr(e), i.push(o.get(0));
			}
		};
		a(n, r), t.details && t.details.detach(), t.details = P.s(i), t.detailsShow && t.tr && t.details.insertAfter(t.tr);
	}
}
var oi = M.throttle(function(e) {
	rn(e[0]);
}, 500);
function si(e, t) {
	var n = e.context;
	if (n.length) {
		var r = n[0].data[t === void 0 ? e[0] : t];
		r && r.details && (r.details.detach(), r.detailsShow = void 0, r.details = void 0, P.s(r.tr).classRemove("dt-hasChild"), oi(n));
	}
}
function ci(e, t) {
	var n = e.context;
	if (n.length && e.length) {
		var r = n[0].data[e[0]];
		r && r.details && (r.detailsShow = t, t && r.tr ? (r.details.insertAfter(r.tr), P.s(r.tr).classAdd("dt-hasChild")) : t || (r.details.detach(), P.s(r.tr).classRemove("dt-hasChild")), H(n[0], null, "childRow", [t, e.row(e[0])]), li(n[0]), oi(n));
	}
}
function li(e) {
	var t = new Y(e), n = ".dt.DT_details", r = "draw" + n, i = "column-sizing" + n, a = "destroy" + n, o = e.data;
	t.off(r + " " + i + " " + a), M.array.pluck(o, "details").length > 0 && (t.on(r, function(n, r) {
		e === r && t.rows({ page: "current" }).eq(0).each(function(e) {
			var t = o[e];
			t && t.detailsShow && t.details && t.tr && t.details.insertAfter(t.tr);
		});
	}), t.on(i, function(t, n) {
		if (e === n) for (var r, i = xr(n), a = 0, s = o.length; a < s; a++) r = o[a], r && r.details && r.details.each(function(e) {
			var t = P.s(e).children("td");
			t.count() == 1 && t.attr("colspan", i);
		});
	}), t.on(a, function(n, r) {
		if (e === r) for (var i = 0, a = o.length; i < a; i++) {
			let e = o[i];
			e && e.details && si(t, i);
		}
	}));
}
var ui = "row().child", di = ui + "()";
Y.register(di, function(e, t) {
	var n = this.context;
	return e === void 0 ? n.length && this.length && n[0].data[this[0]] ? n[0].data[this[0]]?.details : void 0 : (e === !0 ? this.child.show() : e === !1 ? si(this) : n.length && this.length && ai(n[0], n[0].data[this[0]], e, t), this.inst(this.context, this));
}), Y.register([ui + ".show()", di + ".show()"], function() {
	return ci(this, !0), this;
}), Y.register([ui + ".hide()", di + ".hide()"], function() {
	return ci(this, !1), this;
}), Y.register([ui + ".remove()", di + ".remove()"], function() {
	return si(this), this;
}), Y.register(ui + ".isShown()", function() {
	var e = this.context;
	return e.length && this.length && e[0].data[this[0]] && e[0].data[this[0]].detailsShow || !1;
});
function fi(e, t, n) {
	var r, i = Rr("row", t, function(t) {
		var i = M.conv.intVal(t), a = e.data;
		if (i !== null && !n || (r ||= Vr(e, n), i !== null && r.indexOf(i) !== -1)) return [i];
		if (t == null || t === "") return r;
		if (typeof t == "function") return r.map(function(e) {
			var n = a[e];
			return n && t(e, n.data, n.tr) ? e : null;
		});
		if (t.nodeName) {
			var o = t._DT_RowIndex, s = t._DT_CellIndex, c;
			if (o !== void 0) return c = a[o], c && c.tr === t ? [o] : [];
			if (s) return c = a[s.row], c && c.tr === t.parentNode ? [s.row] : [];
			var l = P.s(t).closest("*[data-dt-row]");
			return l.count() ? [parseInt(l.attr("data-dt-row"))] : [];
		}
		if (typeof t == "string") {
			if (t.charAt(0) === "#") {
				var u = e.ids[t.replace(/^#/, "")];
				if (u !== void 0) return [u.idx];
				if (t.match(/^#[a-zA-Z0-9_-]*$/)) return [];
			} else if (t.match(/^(tr)?:eq\(\d+\)$/)) {
				let e = parseInt(t.replace(/[^\d]/g, ""));
				return r[e] === void 0 ? [] : [r[e]];
			}
		}
		var d = M.array.removeEmpty(M.array.pluckOrder(e.data, r, "tr"));
		return P.s(d).filter(t).mapTo((e) => e._DT_RowIndex);
	}, e, n);
	return (n.order === "current" || n.order === "applied") && Jt(e, i), i;
}
X("rows()", function(e, t) {
	let n, r;
	e === void 0 ? r = "" : M.is.plainObject(e) ? (r = "", n = e) : (r = e, n = t), n = zr(n);
	var i = this.iterator("table", function(e) {
		return fi(e, r, n);
	}, !0);
	return i.selector.rows = r, i.selector.opts = n, i;
}), X("rows().every()", function(e) {
	var t = this.selector.opts, n = 0;
	return this.iterator("every", (r, i, a) => {
		let o = this.row(i, t);
		e.call(o, i, a, n), n++;
	});
}), X("rows().nodes()", function() {
	return this.iterator("row", function(e, t) {
		return e.data[t]?.tr || void 0;
	}, !0);
}), X("rows().data()", function() {
	return this.iterator(!0, "rows", function(e, t) {
		return M.array.pluckOrder(e.data, t, "data");
	}, !0);
}), Z("rows().invalidate()", "row().invalidate()", function(e) {
	return this.iterator("row", function(t, n) {
		wt(t, n, e);
	});
}), Z("rows().indexes()", "row().index()", function() {
	return this.iterator("row", function(e, t) {
		return t;
	}, !0);
}), Z("rows().ids()", "row().id()", function(e) {
	for (var t = [], n = this.context, r = 0, i = n.length; r < i; r++) for (var a = 0, o = this[r].length; a < o; a++) {
		var s = n[r].rowIdFn(n[r].data[this[r][a]]?.data);
		t.push((e === !0 ? "#" : "") + s);
	}
	return this.inst(n, t);
}), Z("rows().remove()", "row().remove()", function() {
	return this.iterator("row", function(e, t) {
		var n = e.data, r = n[t], i = e.displayMaster.indexOf(t);
		i !== -1 && e.displayMaster.splice(i, 1), e.recordsDisplay > 0 && e.recordsDisplay--, zn(e);
		var a = e.rowIdFn(r?.data);
		a !== void 0 && delete e.ids[a], n[t] = null;
	}), this;
}), X("rows.add()", function(e) {
	var t = this.iterator("table", function(t) {
		var n, r, i, a = [];
		for (r = 0, i = e.length; r < i; r++) n = e[r], n.nodeName && n.nodeName.toUpperCase() === "TR" ? a.push(yt(t, P.s(n))[0]) : a.push(vt(t, n));
		return a;
	}, !0), n = this.rows(-1);
	return n.pop(), Vn(n, t), n;
}), X("row()", function(e, t) {
	return Br(this.rows(e, t));
}), X("row().data()", function(e) {
	var t = this.context;
	if (e === void 0) return t.length && this.length && this[0].length ? t[0].data[this[0]]?.data : void 0;
	var n = t[0].data[this[0]];
	return n.data = e, Array.isArray(e) && n.tr && n.tr.id && M.set(t[0].rowId)(e, n.tr.id), wt(t[0], this[0][0], "data"), this;
}), X("row().node()", function() {
	var e = this.context;
	if (e.length && this.length && this[0].length) {
		var t = e[0].data[this[0]];
		if (t && t.tr) return t.tr;
	}
	return null;
}), X("row.add()", function(e) {
	e && e.fn && e.length && (e = e[0]);
	var t = this.iterator("table", function(t) {
		return Tt(t), e.nodeName && e.nodeName.toUpperCase() === "TR" ? yt(t, P.s(e))[0] : vt(t, e);
	});
	return this.row(t[0]);
}), X("search()", function(e, t, n, r) {
	if (e === void 0) {
		let e = this.context;
		return e.length === 0 ? void 0 : e[0].searches["*"].search;
	}
	return this.iterator("table", function(i) {
		if (!i.features.searching) return;
		let a = i.searches["*"];
		a ||= R(), typeof t == "object" ? E(a, t) : E(a, {
			regex: t !== null && t,
			smart: n === null || n,
			caseInsensitive: r === null || r
		}), a.search = e, i.searches["*"] = a, yn(i);
	});
}), X("search.fixed()", function(e, t, n) {
	var r = this.iterator(!0, "table", function(r) {
		var i = r.searchesFixed["*"];
		if (!e) return Object.keys(i);
		if (t === void 0) return i[e]?.search;
		if (t === null) delete i[e];
		else {
			let r = i[e];
			r && M.is.plainObject(r) || (r = R()), n && E(r, n), r.search = t, i[e] = r;
		}
		return this;
	});
	return e !== void 0 && t === void 0 ? r[0] : r;
}), X(["columns().search()", "column().search()"], function(e, t, n, r) {
	if (e === void 0) {
		let e = this[0].join(",");
		return this.context.length && this.context[0].searches[e]?.search || "";
	}
	return this.iterator("columns", function(i, a) {
		let o = a.join(","), s = i.searches[o];
		s ||= R(), (e === "" || e === null) && a.length > 1 ? delete i.searches[o] : (typeof t == "object" ? E(s, t) : E(s, {
			regex: t !== null && t,
			smart: n === null || n,
			caseInsensitive: r === null || r
		}), s.search = e, s.columns = a.slice(), i.searches[o] = s, yn(i));
	});
}), X(["columns().search.fixed()", "column().search.fixed()"], function(e, t, n) {
	if (!e) return this.iterator(!0, "columns", function(e, t) {
		let n = t.join(","), r = e.searchesFixed[n];
		return r ? Object.keys(r) : [];
	});
	if (t === void 0) {
		if (this.context.length) {
			let t = this[0].join(","), n = this.context[0].searchesFixed[t];
			return n && n[e] ? n[e].search : void 0;
		}
	} else return this.iterator(!0, "columns", function(r, i) {
		let a = i.join(","), o = r.searchesFixed[a];
		if (o || (o = {}, r.searchesFixed[a] = o), t === null) delete o[e];
		else {
			let r = o[e];
			r && M.is.plainObject(r) || (r = R()), n && E(r, n), r.search = t, r.columns = i, o[e] = r;
		}
		return this;
	});
}), X("state()", function(e, t = !0) {
	if (!e) return this.context.length ? this.context[0].stateSaved : null;
	let n = ne({}, e);
	return this.iterator("table", function(e) {
		on(e, n, t, function() {});
	});
}), X("state.clear()", function() {
	return this.iterator("table", function(e) {
		e.stateSaveCallback.call(e.instance, e, {});
	});
}), X("state.loaded()", function() {
	return this.context.length ? this.context[0].stateLoaded : null;
}), X("state.save()", function() {
	return this.iterator("table", function(e) {
		rn(e);
	});
});
function pi(e, t) {
	if (Array.isArray(e)) {
		var n = [];
		return e.forEach(function(e) {
			Vn(n, pi(e, t));
		}), n.filter((e) => !!e);
	}
	if (typeof e == "number") return [t[e]];
	var r = t.map(function(e) {
		return e.table;
	});
	return P.s(r).filter(e).mapTo((e) => t[r.indexOf(e)]);
}
X("tables()", function(e) {
	return e == null ? this.inst(this.context) : this.inst(pi(e, this.context));
}), X("table()", function(e) {
	return Br(this.tables(e));
}), [
	[
		"nodes",
		"node",
		"table"
	],
	[
		"body",
		"body",
		"tbody"
	],
	[
		"header",
		"header",
		"thead"
	],
	[
		"footer",
		"footer",
		"tfoot"
	]
].forEach(function(e) {
	Z("tables()." + e[0] + "()", "table()." + e[1] + "()", function() {
		return this.iterator("table", (t) => t[e[2]], !0);
	});
}), ["header", "footer"].forEach(function(e) {
	X("table()." + e + ".structure()", function(t) {
		var n = this.columns(t).indexes().flatten().toArray(), r = this.context[0], i = On(r, r[e], n), a = n.slice().sort(function(e, t) {
			return e - t;
		});
		return i.map(function(e) {
			return n.map(function(t) {
				return e[a.indexOf(t)];
			});
		});
	});
}), Z("tables().containers()", "table().container()", function() {
	return this.iterator("table", function(e) {
		return e.tableWrapper;
	}, !0);
}), X("tables().every()", function(e) {
	return this.iterator("table", (t, n) => {
		e.call(this.table(n), n);
	});
}), X("caption()", function(e, t) {
	var n = this.context;
	if (e === void 0) {
		var r = n[0].captionNode;
		return r && n.length ? r.innerHTML : null;
	}
	return this.iterator("table", function(n) {
		var r = P.s(n.table), i = P.s(n.captionNode), a = P.s(n.tableWrapper);
		if (i.count() || (i = P.c("caption").html(e), n.captionNode = i.get(0), t ||= (r.prepend(i), i.css("caption-side"))), i.html(e), t && (i.css("caption-side", t), i.get(0)._captionSide = t), a.find("div.dt-scroll").count()) {
			var o = t === "top" ? "head" : "foot";
			a.find("div.dt-scroll-" + o + " table").prepend(i);
		} else r.prepend(i);
	}, !0);
}), X("caption.node()", function() {
	var e = this.context;
	return e.length ? e[0].captionNode : null;
});
var mi = !1, hi, gi = !1, _i = null, vi = null, Q = {
	developers: 0,
	type: null,
	expires: null,
	valid: null
}, yi, bi = "BE1A9w9D9U/4s4/TogY+1sW/dLJ8IquzK1PmV70J93ZTIvXMZ0eV2NAb52ntpgwVFySSB2fOI7geLNO737rQAyo=";
function xi(e) {
	return Uint8Array.from(atob(e), (e) => e.charCodeAt(0));
}
function Si(e, t) {
	let n = Q.expires;
	if (!ki()) Ti("Unable to validate license key"), Ei();
	else if (Q.valid === !1) Ti("Invalid license key"), Ei();
	else if (Q.type === "trial") {
		let e = n ? Math.ceil((n.getTime() - (/* @__PURE__ */ new Date()).getTime()) / 864e5) : -1;
		return e < 0 ? (Ci("Your trial has now expired. Please visit https://datatables.net/plus to purchase a license", "warn"), Ti("Trial expired"), Ei(), !1) : (Ci("Your trial expires in " + e + " day" + (e === 1 ? "" : "s")), !0);
	} else if (t === null) return !0;
	else if (Q.type === "plus" || Q.type === "editor" && t === "editor") return !n || new Date(e) > n ? (Ti("Upgrade required for this version"), Ei(), !1) : !0;
	else if (Q.type === "editor" && t !== "editor") return Ti("License for Editor only. Upgrade for Plus"), Ei(), !1;
	return Ti(), Ei(), !1;
}
function Ci(e, t = "log") {
	(t === "log" ? console.log : console.warn)("%cDataTables Plus%c " + e, "background: #007bff; color: #fff; padding: 2px 5px;", "color: inherit;");
}
var wi = function(e) {
	gi = !0, Di(e).then((e) => {
		gi = !1, Si(_i, vi);
	}).catch(() => {
		gi = !1, Si(_i, vi);
	});
};
function Ti(e) {
	if (!mi) {
		if (!mi) {
			yi ||= P.c("div");
			let e = yi[0].attachShadow({ mode: "closed" }), t = P.c("div").css({
				position: "fixed",
				bottom: "1em",
				right: "1em",
				border: "1px solid #ffc107",
				background: "#fff3cd",
				color: "#856404",
				padding: "0.5em 1em",
				"font-family": "sans-serif",
				"font-size": "12px",
				"line-height": "1.4em",
				"text-align": "center",
				"border-radius": "4px",
				"z-index": "10000",
				"box-shadow": "1px 3px 5px rgba(0, 0, 0, 0.333)"
			});
			e.appendChild(t[0]), hi = t, mi = !0;
		}
		hi.empty(), e ? hi.append(P.c("span").text("DataTables Plus")).append(P.c("br")).append(P.c("span").text(e + " - ")).append(P.c("a").attr("href", "https://datatables.net/tn/25").attr("target", "_blank").css({ color: "inherit" }).html("learn more &#187;")) : hi.append(P.c("span").text("DataTables Plus - Evaluation Mode")).append(P.c("br")).append(P.c("a").attr("href", "https://datatables.net/plus/trial").attr("target", "_blank").css({ color: "inherit" }).text("Start a Free Trial")).append(P.c("span").text(" - ")).append(P.c("a").attr("href", "https://datatables.net/plus").attr("target", "_blank").css({ color: "inherit" }).text("Purchase a License"));
	}
}
function Ei() {
	let e = k("doc");
	!gi && e.body && !e.body.contains(yi[0]) && e.body.appendChild(yi[0]);
}
function Di(e) {
	return new Promise(function(t) {
		try {
			var n = e.split(":");
			if (n.length !== 2) return Q.valid = !1, t();
			var r = n[0], i = n[1], a = r.match(/(plus|trial|editor)_(\d+)_(\d{4})(\d{2})(\d{2})/);
			if (!a || a.length !== 6) return Q.valid = !1, t();
			Q.type = a[1], Q.developers = parseInt(a[2]), Q.expires = /* @__PURE__ */ new Date(a[3] + "-" + a[4] + "-" + a[5]);
			var o = ki(), s = xi(bi), c = xi(i), l = new TextEncoder().encode(r);
			if (!o) {
				Q.valid = !1, t();
				return;
			}
			o.importKey("raw", s, {
				name: "ECDSA",
				namedCurve: "P-256"
			}, !1, ["verify"]).then(function(e) {
				return o.verify({
					name: "ECDSA",
					hash: { name: "SHA-256" }
				}, e, c, l);
			}).then(function(e) {
				Q.valid = e, t();
			}).catch(function() {
				Q.valid = !1, t();
			});
		} catch {
			Q.valid = !1, t();
		}
	});
}
function Oi(e) {
	Object.defineProperty(e, "plus", {
		value: function(e, t = "") {
			let n = k("win").location.hostname;
			return n === "192.168.234.234" || n.endsWith(".datatables.net") || n === "datatables.net" ? !0 : gi ? (_i = e, vi = t, !0) : Si(e, t);
		},
		configurable: !1,
		enumerable: !1,
		writable: !1
	});
}
function ki() {
	let e = k("win"), t = e.crypto || e.msCrypto;
	return t.subtle || t.webkitSubtle;
}
function Ai(e, t) {
	var n = !1;
	return e && e.document && (window = e, document = e.document), t && t.fn && t.fn.jquery && (n = !0), n;
}
var ji = function(e) {
	if (e instanceof Y) return !0;
	_(e) && (e = Array.from(e));
	var t = P.s(e).get(0), n = !1;
	for (let e = 0; e < q.settings.length; e++) {
		let a = q.settings[e];
		var r = a.scrollHead ? a.scrollHead.find("table").get(0) : null, i = a.scrollFoot ? a.scrollFoot.find("table").get(0) : null;
		(a.table === t || r === t || i === t) && (n = !0);
	}
	return n;
}, Mi = function(e) {
	var t = !1;
	e && typeof e != "boolean" && (t = e.api || !1, e = e.visible || !1);
	var n = q.settings.filter(function(t) {
		return !!(!e || e && P.s(t.table).isVisible());
	}).map(function(e) {
		return e.table;
	});
	return t ? new Y(n) : n;
};
function Ni(e, t, n) {
	n && (e[t] = n);
}
ft("div", function(e, t) {
	var n = P.c("div").get(0);
	return t && (Ni(n, "className", t.className), Ni(n, "id", t.id), Ni(n, "innerHTML", t.html), Ni(n, "textContent", t.text)), n;
}), ft("info", function(e, t) {
	if (!e.features.info) return null;
	let n = e.language, r = e.tableId, i = P.c("div").classAdd(e.classes.info.container), a = Object.assign({
		callback: n.infoCallback,
		empty: n.infoEmpty,
		postfix: n.infoPostFix,
		search: n.infoFiltered,
		text: n.info
	}, t);
	return e.callbacks.draw.push(function(e) {
		Pi(e, a, i);
	}), e.infoEl ||= (i.attr({
		"aria-live": "polite",
		id: r + "_info",
		role: "status"
	}), P.s(e.table).attr("aria-describedby", r + "_info"), i), i;
}, "i");
function Pi(e, t, n) {
	var r = e.displayStart + 1, i = Ln(e), a = Fn(e), o = In(e), s = o ? t.text : t.empty;
	o !== a && (s += " " + t.search), s += t.postfix, s = Bn(e, s), t.callback && (s = t.callback.call(e.instance, e, r, i, a, o, s)), n.html(s), H(e, null, "info", [
		e,
		n.get(0),
		s
	]);
}
ft("paging", function(e, t) {
	if (!e.features.paging) return null;
	let n = Object.assign({
		buttons: q.pager.numbers_length,
		type: e.pagingType,
		boundaryNumbers: !0,
		firstLast: !0,
		previousNext: !0,
		numbers: !0
	}, t), r = P.c("div").classAdd(e.classes.paging.container + (n.type ? " paging_" + n.type : "")).append(P.c("nav").attr("aria-label", "pagination").classAdd(e.classes.paging.nav)), i = function() {
		Ii(e, r.children(), n);
	};
	return e.callbacks.draw.push(i), P.s(e.table).on("column-sizing.dt.DT", i), r;
}, "p");
function Fi(e) {
	let t = [];
	return e.numbers && t.push("numbers"), e.previousNext && (t.unshift("previous"), t.push("next")), e.firstLast && (t.unshift("first"), t.push("last")), t;
}
function Ii(e, t, n) {
	if (!e.initDone) return;
	let r = n.type ? q.pager[n.type] : Fi, i = e.language.aria.paginate || {}, a = e.displayStart, o = e.pageLength, s = In(e), c = o === -1, l = c ? 0 : Math.ceil(a / o), u = c ? +!!s : Math.ceil(s / o), d = [], f = [], p = r(n).map(function(e) {
		return e === "numbers" ? mt(l, u, n.buttons, n.boundaryNumbers) : e;
	});
	d = d.concat.apply(d, p);
	for (let t = 0; t < d.length; t++) {
		let n = d[t], r = Li(e, n, l, u), a = jt(e, "pagingButton")(e, n, r.display, r.active, r.disabled), o = typeof n == "string" ? i[n] : i.number ? i.number + (n + 1) : null;
		P.s(a.clicker).attr({
			"aria-controls": e.tableId,
			"aria-disabled": r.disabled ? "true" : null,
			"aria-current": r.active ? "page" : null,
			"aria-label": o,
			"data-dt-idx": n,
			tabIndex: r.disabled ? -1 : e.tabIndex && a.clicker.nodeName.toLowerCase() !== "span" ? e.tabIndex : null
		}), typeof n != "number" && P.s(a.clicker).classAdd(n), Rn(a.clicker, "", function(t) {
			t.preventDefault(), nn(e, n, !0);
		}), f.push(a.display);
	}
	let m = jt(e, "pagingContainer")(e, f), h = t.find(k("doc").activeElement).attr("data-dt-idx");
	if (t.empty().append(m), h && t.find("[data-dt-idx=\"" + h + "\"]").trigger("focus"), f.length) {
		let r = P.s(f[0]).height("withBorder");
		n.buttons > 1 && r > 0 && t.height() >= r * 2 - 10 && Ii(e, t, Object.assign({}, n, { buttons: n.buttons - 2 }));
	}
}
function Li(e, t, n, r) {
	let i = e.language.paginate, a = {
		display: "",
		active: !1,
		disabled: !1
	};
	switch (t) {
		case "ellipsis":
			a.display = "&#x2026;";
			break;
		case "first":
			a.display = i.first, n === 0 && (a.disabled = !0);
			break;
		case "previous":
			a.display = i.previous, n === 0 && (a.disabled = !0);
			break;
		case "next":
			a.display = i.next, (r === 0 || n === r - 1) && (a.disabled = !0);
			break;
		case "last":
			a.display = i.last, (r === 0 || n === r - 1) && (a.disabled = !0);
			break;
		default: typeof t == "number" && (a.display = e.formatNumber(t + 1, e), n === t && (a.active = !0));
	}
	return a;
}
var Ri = 0;
ft("pageLength", function(e, t) {
	var n = e.features;
	if (!n.paging || !n.lengthChange) return null;
	let r = Object.assign({
		menu: e.lengthMenu,
		text: e.language.lengthMenu
	}, t), i = e.classes.length, a = e.tableId, o = r.menu, s = [], c = [], l;
	if (Array.isArray(o[0])) s = o[0], c = o[1];
	else for (l = 0; l < o.length; l++) w(o[l]) ? (s.push(o[l].value), c.push(o[l].label)) : (s.push(o[l]), c.push(o[l]));
	var u = r.text.match(/_MENU_$/), d = r.text.match(/^_MENU_/), f = r.text.replace(/_MENU_/, ""), p = "<label>" + r.text + "</label>";
	d ? p = "_MENU_<label>" + f + "</label>" : u && (p = "<label>" + f + "</label>_MENU_");
	var m = "tmp-" + +/* @__PURE__ */ new Date(), h = P.c("div").classAdd(i.container).html(p.replace("_MENU_", "<span id=\"" + m + "\"></span>")), g = [];
	Array.prototype.slice.call(h.find("label").get(0).childNodes).forEach(function(e) {
		e.nodeType === Node.TEXT_NODE && g.push({
			el: e,
			text: e.textContent
		});
	});
	var _ = function(t) {
		g.forEach(function(n) {
			n.el.textContent = Bn(e, n.text, t);
		});
	}, v = P.c("select").attr("aria-controls", a).attr("autocomplete", "off").classAdd(i.select);
	for (l = 0; l < s.length; l++) {
		var y = e.api.i18n("lengthLabels." + s[l], null);
		y === null && (y = typeof c[l] == "number" ? e.formatNumber(c[l], e) : c[l]), v.get(0)[l] = new Option(y, s[l]);
	}
	return h.find("#" + m).replaceWith(v), h.find("select").attr("id", "dt-length-" + Ri).val(e.pageLength).on("change.DT", function() {
		ri(e, v.val()), An(e);
	}), h.find("label").attr("for", "dt-length-" + Ri), Ri++, P.s(e.table).on("length.dt.DT", function(t, n, r) {
		if (e === n) {
			let e = h.find("select");
			if (e.find("option[data-dt-len-tmp]").remove(), !e.find("option[value=\"" + r + "\"]").length) {
				let t = zi(v, r), n = P.c("option").val(r).text(r).attr("data-dt-len-tmp", !0);
				t && t.length ? n.insertBefore(t) : e.append(n);
			}
			e.val(r), _(r);
		}
	}), _(e.pageLength), h;
}, "l");
function zi(e, t) {
	let n = e.find("option"), r = n.mapTo((e) => parseInt(e.value)).findIndex((e) => e > t);
	return r < -1 ? null : n.eq(r);
}
var Bi = 0;
ft("search", function(e, t) {
	if (!e.features.searching) return null;
	let n = e.classes.search, r = e.tableId, i = e.language, a = "<input type=\"search\" class=\"" + n.input + "\" autocomplete=\"off\"/>", o = M.object.assignDeep({
		columns: "*",
		placeholder: i.searchPlaceholder,
		processing: !1,
		text: i.search
	}, t);
	o.text.indexOf("_INPUT_") === -1 && (o.text += "_INPUT_"), o.text = Bn(e, o.text);
	let s = e.api.columns(o.columns).indexes().toArray(), c = o.columns === "*" ? "*" : s.join(","), l = e.searches[c];
	l || (l = R(), e.searches[c] = l), l.columns = s;
	let u = o.text.match(/_INPUT_$/), d = o.text.match(/^_INPUT_/), f = o.text.replace(/_INPUT_/, ""), p = "<label>" + o.text + "</label>";
	d ? p = "_INPUT_<label>" + f + "</label>" : u && (p = "<label>" + f + "</label>_INPUT_");
	let m = P.c("div").classAdd(n.container).html(p.replace(/_INPUT_/, a));
	m.find("label").attr("for", "dt-search-" + Bi), m.find("input").attr("id", "dt-search-" + Bi), Bi++;
	let h = function(t) {
		let n = this.value;
		l.return && t.key !== "Enter" || n != l.search && At(e, o.processing, function() {
			l.search = n, yn(e), e.displayStart = 0, An(e);
		});
	}, g = e.searchDelay, _ = m.find("input").val(Vi(l.search)).attr("placeholder", o.placeholder).on("keyup.DT search.DT input.DT paste.DT cut.DT", g ? M.debounce(h, g) : h).on("mouseup.DT", function(e) {
		setTimeout(function() {
			h.call(_.get(0), e);
		}, 10);
	}).on("keypress.DT", function(e) {
		if (e.keyCode == 13) return !1;
	}).attr("aria-controls", r);
	return P.s(e.table).on("search.dt.DT", function(t, n) {
		if (e === n && _.get(0) !== document.activeElement) {
			let t = e.searches[c];
			_.val(Vi(t.search));
		}
	}), m;
}, "f");
function Vi(e) {
	return e instanceof RegExp ? e.toString() : typeof e == "function" ? "" : e;
}
var Hi = {
	ajax: null,
	ajaxDataGet: !1,
	api: null,
	browser: {
		barWidth: 0,
		scrollbarLeft: !1
	},
	callbacks: {
		destroy: [],
		draw: [],
		footer: [],
		header: [],
		init: [],
		preDraw: [],
		row: [],
		rowCreated: [],
		stateLoadParams: [],
		stateLoaded: [],
		stateSaveParams: []
	},
	caption: "",
	captionNode: null,
	classes: {},
	columns: [],
	containerWidth: -1,
	data: [],
	deferLoading: !1,
	destroyWidth: 0,
	destroying: !1,
	display: [],
	displayMaster: [],
	displayStart: 0,
	displayStartInit: -1,
	doingDraw: !1,
	dom: null,
	drawCount: 0,
	drawError: -1,
	drawHold: !1,
	features: {
		autoWidth: !1,
		deferRender: !1,
		info: !1,
		lengthChange: !1,
		orderClasses: !1,
		orderMulti: !1,
		ordering: !1,
		paging: !1,
		processing: !1,
		searching: !1,
		serverSide: !1,
		stateSave: !1
	},
	footer: [],
	header: [],
	ids: {},
	init: {},
	initDone: !1,
	initialised: !1,
	language: {
		ajax: "",
		aria: {
			orderable: "",
			orderableRemove: "",
			orderableReverse: "",
			paginate: {
				first: "",
				last: "",
				next: "",
				number: "",
				previous: ""
			}
		},
		decimal: "",
		emptyTable: "",
		entries: { _: "" },
		info: "",
		infoEmpty: "",
		infoFiltered: "",
		infoPostFix: "",
		lengthMenu: "",
		lengthLabels: {},
		loadingRecords: "",
		paginate: {
			first: "",
			last: "",
			next: "",
			previous: ""
		},
		processing: "",
		search: "",
		searchPlaceholder: "",
		thousands: "",
		url: "",
		zeroRecords: ""
	},
	lastOrder: [],
	layout: {},
	loadingState: !1,
	order: [],
	orderCellsTop: null,
	orderDescReverse: !1,
	orderFixed: [],
	orderHandler: !0,
	orderIndicators: !0,
	pageLength: 10,
	pagingControls: 0,
	pagingType: "two_button",
	searchCols: [],
	recordsDisplay: 0,
	recordsTotal: 0,
	renderer: null,
	resizeObserver: null,
	reszEvt: !1,
	rowId: "",
	rowReadObject: !1,
	scroll: {
		barWidth: 0,
		collapse: null,
		x: "",
		xInner: "",
		y: ""
	},
	scrollBarVis: !1,
	searchDelay: 0,
	searches: {},
	searchesFixed: { "*": {} },
	serverMethod: null,
	sortDetails: [],
	stateDuration: 0,
	stateLoadCallback: () => ({}),
	stateLoaded: null,
	stateSaveCallback: () => {},
	stateSaved: null,
	tabIndex: 0,
	tableId: "",
	titleRow: null,
	typeDetect: !0,
	unique: "",
	wasFiltered: !1,
	wasOrdered: !1,
	windowResizeCb: () => {}
};
function Ui(e = {}) {
	return M.object.assignDeep({}, Hi, e);
}
var Wi = {
	Column: cr,
	Row: _t,
	Search: R,
	Settings: Ui
}, Gi = {
	ajax: null,
	autoWidth: !0,
	caption: "",
	classes: {},
	column: sr,
	columnDefs: null,
	columns: null,
	createdRow: null,
	data: null,
	deferLoading: null,
	deferRender: !0,
	destroy: !1,
	displayStart: 0,
	dom: null,
	drawCallback: null,
	footerCallback: null,
	formatNumber: function(e, t) {
		return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, t.language.thousands);
	},
	headerCallback: null,
	info: !0,
	infoCallback: null,
	initComplete: null,
	language: {
		ajax: "",
		aria: {
			orderable: ": Activate to sort",
			orderableRemove: ": Activate to remove sorting",
			orderableReverse: ": Activate to invert sorting",
			paginate: {
				first: "First",
				last: "Last",
				next: "Next",
				number: "",
				previous: "Previous"
			}
		},
		decimal: "",
		emptyTable: "No data available in table",
		entries: {
			_: "entries",
			1: "entry"
		},
		info: "Showing _START_ to _END_ of _TOTAL_ _ENTRIES-TOTAL_",
		infoEmpty: "Showing 0 to 0 of 0 _ENTRIES-TOTAL_",
		infoFiltered: "(filtered from _MAX_ total _ENTRIES-MAX_)",
		infoPostFix: "",
		lengthLabels: { "-1": "All" },
		lengthMenu: "_MENU_ _ENTRIES_ per page",
		loadingRecords: "Loading...",
		paginate: {
			first: "«",
			last: "»",
			next: "›",
			previous: "‹"
		},
		processing: "",
		search: "Search:",
		searchPlaceholder: "",
		thousands: ",",
		url: "",
		zeroRecords: "No matching records found"
	},
	layout: {
		bottomEnd: "paging",
		bottomStart: "info",
		topEnd: "search",
		topStart: "pageLength"
	},
	lengthChange: !0,
	lengthMenu: [
		10,
		25,
		50,
		100
	],
	on: {},
	order: [[0, "asc"]],
	orderCellsTop: null,
	orderClasses: !0,
	orderDescReverse: !0,
	orderFixed: [],
	orderMulti: !0,
	ordering: !0,
	pageLength: 10,
	paging: !0,
	pagingType: "",
	preDrawCallback: null,
	processing: !1,
	renderer: null,
	retrieve: !1,
	rowCallback: null,
	rowId: "DT_RowId",
	scrollCollapse: !1,
	scrollX: "",
	scrollY: "",
	search: tn,
	searchCols: [],
	searchDelay: 0,
	searching: !0,
	serverMethod: "GET",
	serverSide: !1,
	stateDuration: 7200,
	stateLoadCallback: function(e) {
		try {
			let t = (e.stateDuration === -1 ? sessionStorage : localStorage).getItem("DataTables_" + e.unique + "_" + k("win").location.pathname);
			return t ? JSON.parse(t) : {};
		} catch {
			return {};
		}
	},
	stateLoadParams: null,
	stateLoaded: null,
	stateSave: !1,
	stateSaveCallback: function(e, t) {
		try {
			(e.stateDuration === -1 ? sessionStorage : localStorage).setItem("DataTables_" + e.unique + "_" + k("win").location.pathname, JSON.stringify(t));
		} catch {}
	},
	stateSaveParams: null,
	tabIndex: 0,
	titleRow: null,
	typeDetect: !0
}, $ = function(e, t) {
	if (Ai(e, t)) return $;
	if (typeof this.jquery == "string") {
		let t = this.toArray();
		return new $(t, e), this.api = () => new Y(t), this;
	}
	this.api = () => new Y(e);
	var n = t === void 0;
	let r = P.s(e), i = r.count();
	return n && (t = {}), r.each((e) => {
		var r = i > 1 ? M.object.assignDeepObjects({}, t, !0) : t, a = 0, o, s = e.getAttribute("id"), c = P.s(e);
		if (e.nodeName.toLowerCase() != "table") {
			z(null, 0, "Non-table node initialisation (" + e.nodeName + ")", 2);
			return;
		}
		r.on && r.on.options && Hn(c, "options", r.on.options), P.trigger("options.dt", [r]), c.trigger("options.dt", !0, [r]), fr(Gi, !0), pr(sr), M.object.assign(r, Un(c.data())), fr(r);
		var l = q.settings;
		for (a = 0, o = l.length; a < o; a++) {
			var u = l[a];
			if (u.table == e || u.thead && u.thead.parentNode == e || u.tfoot && u.tfoot.parentNode == e) {
				var d = r.retrieve || !1, f = r.destroy || !1;
				if (n || d) return u.instance;
				if (f) {
					new Y(u).destroy();
					break;
				}
				z(u, 0, "Cannot reinitialise DataTable", 3);
				return;
			}
			if (u.tableId == e.id) {
				l.splice(a, 1);
				break;
			}
		}
		(s === null || s === "") && (s = "DataTables_Table_" + q._unique++, e.id = s), c.children("colgroup").remove();
		var p = Ui({
			destroyWidth: c.width(),
			unique: s,
			tableId: s,
			colgroup: P.c("colgroup"),
			fastData: function(e, t, n) {
				return F(p, e, t, n);
			}
		});
		p.table = e, p.init = r, l.push(p), p.api = new Y(p), p.instance = P.s(e), p.instance.api = () => p.api, r.lengthMenu && !r.pageLength && (r.pageLength = typeof r.lengthMenu[0] == "number" ? r.lengthMenu[0] : Array.isArray(r.lengthMenu[0]) ? r.lengthMenu[0][0] : r.lengthMenu[0].value);
		let m = M.object.assignDeepObjects(M.object.assignDeep({}, Gi), r);
		B(p.features, m, [
			"autoWidth",
			"deferRender",
			"info",
			"lengthChange",
			"orderClasses",
			"ordering",
			"orderMulti",
			"paging",
			"processing",
			"searching",
			"serverSide"
		]), B(p, m, [
			"ajax",
			"formatNumber",
			"serverMethod",
			"order",
			"orderFixed",
			"lengthMenu",
			"pagingType",
			"stateDuration",
			"orderCellsTop",
			"tabIndex",
			"dom",
			"stateLoadCallback",
			"stateSaveCallback",
			"renderer",
			"searchDelay",
			"rowId",
			"caption",
			"layout",
			"orderDescReverse",
			"orderIndicators",
			"orderHandler",
			"titleRow",
			"typeDetect",
			"pageLength",
			"searchCols"
		]), B(p.scroll, m, [
			["scrollX", "x"],
			["scrollY", "y"],
			["scrollCollapse", "collapse"]
		]), B(p.language, m, "infoCallback"), p.searches["*"] = R(m.search), V(p, "draw", m.drawCallback), V(p, "stateSaveParams", m.stateSaveParams), V(p, "stateLoadParams", m.stateLoadParams), V(p, "stateLoaded", m.stateLoaded), V(p, "row", m.rowCallback), V(p, "rowCreated", m.createdRow), V(p, "header", m.headerCallback), V(p, "footer", m.footerCallback), V(p, "init", m.initComplete), V(p, "preDraw", m.preDrawCallback), p.rowIdFn = M.get(p.rowId), m.on && Object.keys(m.on).forEach(function(e) {
			Hn(c, e, m.on[e]);
		}), mr(p);
		var h = p.classes;
		M.object.assignDeep(h, q.classes, m.classes), c.classAdd(h.table), p.features.paging || (m.displayStart = 0), p.displayStartInit === -1 && (p.displayStartInit = m.displayStart, p.displayStart = m.displayStart);
		var g = m.deferLoading;
		g !== null && (p.deferLoading = !0, Array.isArray(g) ? (p.recordsDisplay = g[0], p.recordsTotal = g[1]) : (p.recordsDisplay = g, p.recordsTotal = g));
		var _ = [], v = c.children("thead"), y = Nn(p, v.get(0), !1);
		if (m.columns) _ = m.columns;
		else if (y.length) for (a = 0, o = y[0].length; a < o; a++) _.push(null);
		for (a = 0, o = _.length; a < o; a++) hr(p);
		Dr(p, m.columnDefs, _, y, function(e, t) {
			gr(p, e, t);
		});
		var b = c.children("tbody").find("tr:first-child").eq(0);
		if (b.count()) {
			var x = function(e, t) {
				return e.getAttribute("data-" + t) === null ? null : t;
			};
			b.eq(0).children("th, td").each(function(e, t) {
				var n = p.columns[t];
				if (n || z(p, 0, "Incorrect column count", 18), n.data === t) {
					var r = x(e, "sort") || x(e, "order"), i = x(e, "filter") || x(e, "search");
					(r !== null || i !== null) && (n.data = {
						_: t + ".display",
						sort: r === null ? void 0 : t + ".@data-" + r,
						type: r === null ? void 0 : t + ".@data-" + r,
						filter: i === null ? void 0 : t + ".@data-" + i
					}, n._isArrayHost = !0, gr(p, t));
				}
			});
		}
		V(p, "draw", rn);
		var ee = p.features;
		if (m.stateSave && (ee.stateSave = !0), m.order === void 0) {
			var S = p.order;
			for (a = 0, o = S.length; a < o; a++) S[a][1] = p.columns[a].orderSequence[0];
		}
		$t(p), V(p, "draw", function() {
			(p.wasOrdered || U(p) === "ssp" || ee.deferRender) && $t(p);
		});
		var C = c.children("caption");
		p.caption && (C.count() === 0 && (C = P.c("caption").prependTo(c)), C.html(p.caption)), C.count() && (C.get(0)._captionSide = C.css("caption-side"), p.captionNode = C.get(0)), C.count() ? p.colgroup.insertAfter(C.get(0)) : p.colgroup.prependTo(e), v.count() === 0 && (v = P.c("thead").appendTo(c)), p.thead = v.get(0);
		var w = c.children("tbody");
		w.count() === 0 && (w = P.c("tbody").insertAfter(v.get(0))), p.tbody = w.get(0);
		var te = c.children("tfoot");
		te.count() === 0 && (te = P.c("tfoot").appendTo(e)), p.tfoot = te.get(0), p.display = p.displayMaster.slice(), p.initialised = !0;
		var T = p.language;
		if (m.language && M.object.assignDeep(T, m.language), T.ajax) {
			let e = function(e) {
				dr(e), M.object.assignDeep(T, e, p.init.language), H(p, null, "i18n", [p], !0), sn(p);
			};
			if (typeof T.ajax == "function") T.ajax(p, e);
			else {
				let t = {
					dataType: "json",
					url: "",
					success: e,
					error: function() {
						z(p, 0, "i18n file loading error", 21), sn(p);
					}
				};
				typeof T.ajax == "string" ? t.url = T.ajax : t = M.object.assign(t, T.ajax), M.ajax(t);
			}
		} else H(p, null, "i18n", [p], !0), sn(p);
	}), this.api();
};
$.type = G, $.types = Kn, $.render = or, $.ext = q, $.use = M.external, $.factory = Ai, $.versionCheck = M.version.check, $.version = q.version, $.isDataTable = ji, $.tables = Mi, $.util = M, $.Api = Y, $.datetime = ar, $.__browser = lr, $.Dom = P, $.ajax = M.ajax, $.key = wi, Oi($), $.settings = q.settings, $.models = Wi, $.defaults = Gi, $.feature = { register: ft }, M.external($), typeof window < "u" && window.jQuery && M.external(window.jQuery), $.util.object.assignDeep($.defaults, { renderer: "bootstrap" }), $.util.object.assignDeep($.ext.classes, {
	container: "dt-container dt-bootstrap5",
	search: { input: "form-control form-control-sm" },
	length: { select: "form-select form-select-sm" },
	processing: { container: "dt-processing card" },
	layout: {
		row: "row mt-2 justify-content-between",
		cell: "d-md-flex justify-content-between align-items-center",
		tableCell: "col-12",
		start: "dt-layout-start col-md-auto me-auto",
		end: "dt-layout-end col-md-auto ms-auto",
		full: "dt-layout-full col-md"
	}
}), $.ext.renderer.pagingButton.bootstrap = function(e, t, n, r, i) {
	var a = ["dt-paging-button", "page-item"];
	r && a.push("active"), i && a.push("disabled");
	var o = $.Dom.c("li").classAdd(a.join(" ")), s = $.Dom.c("button").classAdd("page-link").attr("role", "link").attr("type", "button").html(n).appendTo(o);
	return {
		display: o.get(0),
		clicker: s.get(0)
	};
}, $.ext.renderer.pagingContainer.bootstrap = function(e, t) {
	return $.Dom.c("ul").classAdd("pagination").append(t).get(0);
};
var Ki = $;
export { Y as Api, $ as DataTable, P as Dom, Ki as default, M as util };
