import e, { Api as t, DataTable as n, Dom as r, util as i } from "./dataTables.bootstrap5-kzu36hee.js";
// node_modules/datatables.net-responsive/js/dataTables.responsive.mjs
n.util;
var a = function(e, t, n) {
	var i = r.s(e.node());
	if (t) {
		if (i.classHas("dtr-expanded")) return e.child(n(), "child").show(), !0;
	} else if (i.classHas("dtr-expanded")) e.child(!1);
	else {
		var a = n();
		return a !== !1 && (e.child(a, "child").show(), !0);
	}
	return !1;
}, o = function(e, t, n) {
	var i = r.s(e.node());
	if (!t && i.classHas("dtr-expanded") || !e.responsive.hasHidden()) return e.child(!1), !1;
	var a = n();
	return a !== !1 && (e.child(a, "child").show(), !0);
};
function s(e) {
	return function(t, n, i, a) {
		var o, s = i();
		if (s === !1) return !1;
		if (!n) {
			var c = function() {
				o.remove(), r.s(document).off("keypress.dtr"), r.s(t.node()).classRemove("dtr-expanded"), a();
			};
			o = r.c("div").classAdd("dtr-modal").append(r.c("div").classAdd("dtr-modal-display").append(r.c("div").classAdd("dtr-modal-content").data("dtrRowIdx", t.index()).append(s)).append(r.c("div").classAdd("dtr-modal-close").html("&times;").on("click", function() {
				c();
			}))).append(r.c("div").classAdd("dtr-modal-background").on("click", function() {
				c();
			})).appendTo("body"), r.s(t.node()).classAdd("dtr-expanded"), r.s(document).on("keyup.dtr", function(e) {
				e.keyCode === 27 && (e.stopPropagation(), c());
			});
		} else if (o = r.s("div.dtr-modal-content"), o.count() && t.index() === o.data("dtrRowIdx")) o.empty().append(s);
		else return !1;
		return e && e.header && r.s("div.dtr-modal-content").prepend(r.c("h2").html(e.header(t))), !0;
	};
}
function c() {
	let e = function(e, t, n) {
		let i = this, a = r.c("ul").attr("data-dtr-index", t).classAdd("dtr-details"), o = !1;
		return n.forEach(function(t) {
			t.hidden && (t.className && "" + t.className, r.c("li").classAdd(t.className).attr("data-dtr-index", t.columnIndex).attr("data-dt-row", t.rowIndex).attr("data-dt-column", t.columnIndex).append(r.c("span").classAdd("dtr-title").html(t.title)).append(r.c("span").classAdd("dtr-data").append(i.childNodes(e, t.rowIndex, t.columnIndex))).appendTo(a), o = !0);
		}), o ? a.get(0) : !1;
	};
	return e._responsiveMovesNodes = !0, e;
}
function l() {
	return function(e, t, n) {
		let i = r.c("ul").attr("data-dtr-index", t).classAdd("dtr-details");
		return n.forEach(function(e) {
			e.hidden && r.c("li").classAdd(e.className).attr("data-dtr-index", e.columnIndex).attr("data-dt-row", e.rowIndex).attr("data-dt-column", e.columnIndex).append(r.c("span").classAdd("dtr-title").html(e.title)).append(r.c("span").classAdd("dtr-data").html(e.data)).appendTo(i);
		}), i.children().count() ? i.get(0) : !1;
	};
}
function u(e = {}) {
	return e = n.util.object.assign({ tableClass: "" }, e), function(t, n, i) {
		let a = r.c("table").classAdd(e.tableClass).classAdd("dtr-details");
		return i.forEach(function(e) {
			e.hidden && r.c("tr").classAdd(e.className).attr("data-dt-row", e.rowIndex).attr("data-dt-column", e.columnIndex).append(r.c("td").html(e.title)).append(r.c("td").html(e.data)).appendTo(a);
		}), a.children().count() ? a.get(0) : !1;
	};
}
if (!n || !n.versionCheck || !n.versionCheck("3.1")) throw "DataTables Responsive requires DataTables 3.1 or newer";
var d = class e {
	constructor(t, r) {
		let a = { type: "inline" };
		r && typeof r.details == "string" ? a = { type: r.details } : r && r.details === !1 && (a = { type: !1 }), this.c = i.object.assignDeep({}, e.defaults, n.defaults.responsive, r), this.s = {
			childNodeStore: {},
			columns: [],
			current: [],
			details: i.is.plainObject(this.c.details) ? i.object.assign(a, this.c.details) : a,
			dt: new n.Api(t),
			timer: null
		};
		let o = this.s.dt.settings()[0];
		o._responsive || (o._responsive = this, this._init());
	}
	_init() {
		var e = this, t = this.s.dt, i = r.w.width();
		r.w.on("orientationchange.dtr", n.util.throttle(function() {
			var t = r.w.width();
			t !== i && (e._resize(), i = t);
		})), t.on("row-created.dtr", function(n, i, a, o) {
			e.s.current.includes(!1) && r.s(i).children("td, th").each(function(n, i) {
				var a = t.column.index("toData", i);
				e.s.current[a] === !1 && r.s(n).css("display", "none").classAdd("dtr-hidden");
			});
		}), t.on("rowInvalidate.dtr", (e, t, n) => {
			this._redrawChildren();
		}), t.on("destroy.dtr", function() {
			t.off(".dtr"), r.s(t.table().body()).off(".dtr"), r.w.off("resize.dtr orientationchange.dtr"), t.cells(".dtr-control").nodes().toDom().classRemove("dtr-control"), r.s(t.table().node()).classRemove("dtr-inline collapsed"), e.s.current.forEach((t, n) => {
				t === !1 && e._setColumnVis(n, !0);
			});
		}), this.c.breakpoints && this.c.breakpoints.sort((e, t) => e.width < t.width ? 1 : e.width > t.width ? -1 : 0), this._classLogic();
		var a = this.s.details;
		a.type !== !1 && (e._detailsInit(), t.on("column-visibility.dtr", function() {
			e.s.timer && clearTimeout(e.s.timer), e.s.timer = setTimeout(function() {
				e.s.timer = null, e._classLogic(), e._resizeAuto(), e._resize(!0), e._redrawChildren();
			}, 100);
		}), t.on("draw.dtr", function() {
			e._redrawChildren();
		}), r.s(t.table().node()).classAdd("dtr-" + a.type)), t.on("column-calc.dt", function(t, n) {
			for (var r = e.s.current, i = 0; i < r.length; i++) {
				var a = n.visible.indexOf(i);
				r[i] === !1 && a >= 0 && n.visible.splice(a, 1);
			}
		}), t.on("preXhr.dtr", function() {
			var n = [];
			t.rows().every(function() {
				this.child.isShown() && n.push(this.id(!0));
			}), t.one("draw.dtr", function() {
				e._resizeAuto(), e._resize(), t.rows(n).every(function() {
					e._detailsDisplay(this, !1);
				});
			});
		}), t.on("draw.dtr", function() {
			t.page.info().serverSide && (e.s.childNodeStore = {}), e._controlClass();
		}).ready(function() {
			e._resizeAuto(), e._resize(), t.on("column-sizing.dtr", function() {
				e._resizeAuto(), e._resize();
			});
		}), t.on("column-reorder.dtr", function(t, n, r) {
			e._classLogic(), e._resizeAuto(), e._resize(!0);
		});
	}
	childNodes(e, t, n) {
		var r = t + "-" + n;
		if (this.s.childNodeStore[r]) return this.s.childNodeStore[r];
		for (var i = [], a = e.cell(t, n).node().childNodes, o = 0, s = a.length; o < s; o++) i.push(a[o]);
		return this.s.childNodeStore[r] = i, i;
	}
	_colGroupAttach(e, t, n) {
		var r = null;
		if (t[n].get(0).parentNode !== e.get(0)) {
			for (var i = n + 1; i < t.length; i++) if (e.get(0) === t[i].get(0).parentNode) {
				r = i;
				break;
			}
			r === null ? e.append(t[n]) : t[n].insertBefore(t[r].get(0));
		}
	}
	_childNodesRestore(e, t, n) {
		var r = t + "-" + n;
		if (this.s.childNodeStore[r]) {
			var i = e.cell(t, n).node(), a = this.s.childNodeStore[r];
			if (a.length > 0) {
				for (var o = a[0].parentNode.childNodes, s = [], c = 0, l = o.length; c < l; c++) s.push(o[c]);
				for (var u = 0, d = s.length; u < d; u++) i.appendChild(s[u]);
			}
			delete this.s.childNodeStore[r];
		}
	}
	_columnsVisibility(e) {
		var t = this.s.dt, n = this.s.columns, r, i, a = n.map(function(e, t) {
			return {
				columnIdx: t,
				priority: e.priority
			};
		}).sort(function(e, t) {
			return e.priority === t.priority ? e.columnIdx - t.columnIdx : e.priority - t.priority;
		}), o = n.map((n, r) => t.column(r).visible() === !1 ? "not-visible" : n.auto && n.minWidth === null ? !1 : n.auto === !0 ? "-" : n.includeIn.includes(e)), s = 0;
		for (r = 0, i = o.length; r < i; r++) o[r] === !0 && (s += n[r].minWidth);
		var c = t.settings()[0].scroll, l = c.y || c.x ? c.barWidth : 0, u = t.table().container().offsetWidth - l - s;
		for (r = 0, i = o.length; r < i; r++) n[r].control && (u -= n[r].minWidth);
		var d = !1;
		for (r = 0, i = a.length; r < i; r++) {
			var f = a[r].columnIdx;
			o[f] === "-" && !n[f].control && n[f].minWidth && (d || u - n[f].minWidth < 0 ? (d = !0, o[f] = !1) : o[f] = !0, u -= n[f].minWidth);
		}
		var p = !1;
		for (r = 0, i = n.length; r < i; r++) if (!n[r].control && !n[r].never && o[r] === !1) {
			p = !0;
			break;
		}
		for (r = 0, i = n.length; r < i; r++) n[r].control && (o[r] = p), o[r] === "not-visible" && (o[r] = !1);
		return o.includes(!0) || (o[0] = !0), o;
	}
	_classLogic() {
		var e = this, t = this.c.breakpoints, n = this.s.dt, r = [];
		n.columns().every(function(e) {
			var t = this.column(e), n = t.header().className, i = t.init().responsivePriority, a = t.header().getAttribute("data-priority");
			i === void 0 && (i = a == null ? 1e4 : parseInt(a) * 1), r.push({
				className: n,
				includeIn: [],
				auto: !1,
				control: !1,
				never: !!n.match(/\b(dtr\-)?never\b/),
				priority: i,
				minWidth: 0
			});
		});
		var i = function(e, t) {
			var n = r[e].includeIn;
			n.includes(t) || n.push(t);
		}, a = function(n, a, o, s) {
			var c, l, u;
			let d = e._find(a);
			if (t) {
				if (!o) r[n].includeIn.push(a);
				else if (o === "max-") {
					if (d) for (c = d.width, l = 0, u = t.length; l < u; l++) t[l].width <= c && i(n, t[l].name);
				} else if (o === "min-") {
					if (d) for (c = d.width, l = 0, u = t.length; l < u; l++) t[l].width >= c && i(n, t[l].name);
				} else if (o === "not-") for (l = 0, u = t.length; l < u; l++) s && t[l].name.indexOf(s) === -1 && i(n, t[l].name);
			}
		};
		r.forEach(function(e, n) {
			for (var r = e.className.split(" "), i = !1, o = 0, s = r.length; o < s; o++) {
				var c = r[o].trim();
				if (c === "all" || c === "dtr-all") {
					i = !0, e.includeIn = t.map((e) => e.name);
					return;
				}
				if (c === "none" || c === "dtr-none" || e.never) {
					i = !0;
					return;
				}
				if (c === "control" || c === "dtr-control") {
					i = !0, e.control = !0;
					return;
				}
				t?.forEach((e) => {
					var t = e.name.split("-"), r = RegExp("(min\\-|max\\-|not\\-)?(" + t[0] + ")(\\-[_a-zA-Z0-9])?"), o = c.match(r);
					o && (i = !0, o[2] === t[0] && o[3] === "-" + t[1] ? a(n, e.name, o[1], o[2] + o[3]) : o[2] === t[0] && !o[3] && a(n, e.name, o[1], o[2]));
				});
			}
			i || (e.auto = !0);
		}), this.s.columns = r;
	}
	_controlClass() {
		if (this.s.details.type === "inline") {
			var e = this.s.dt, t = this.s.current.indexOf(!0);
			e.cells(null, function(e) {
				return e !== t;
			}, { page: "current" }).nodes().toDom().filter(".dtr-control").classRemove("dtr-control"), t >= 0 && e.cells(null, t, { page: "current" }).nodes().toDom().classAdd("dtr-control");
		}
		this._tabIndexes();
	}
	_detailsDisplay(t, n) {
		var i = this, a = this.s.dt, o = this.s.details, s = function(e) {
			r.s(t.node()).classToggle("dtr-expanded", e !== !1), r.s(a.table().node()).trigger("responsive-display.dt", !1, [
				a,
				t,
				e,
				n
			]);
		};
		if (o && o.type !== !1) {
			var c = typeof o.renderer == "string" ? e.renderer[o.renderer]() : o.renderer, l = o.display(t, n, function() {
				return c ? c.call(i, a, t[0][0], i._detailsObj(t[0])) : !1;
			}, function() {
				s(!1);
			});
			typeof l == "boolean" && s(l);
		}
	}
	_detailsInit() {
		var e = this, t = this.s.dt, n = this.s.details;
		n.type === "inline" && (n.target = "td.dtr-control, th.dtr-control"), r.s(t.table().body()).on("keyup.dtr", "td, th", function(e) {
			if (document.activeElement) {
				let t = document.activeElement.nodeName.toLowerCase();
				e.keyCode === 13 && r.s(this).data("dtrKeyboard") && (t === "td" || t === "th") && r.s(this).trigger("click");
			}
		});
		var i = n.target, a = typeof i == "string" ? i : "td, th";
		(i !== void 0 || i !== null) && r.s(t.table().body()).on("click.dtr mousedown.dtr mouseup.dtr", a, function(n) {
			if (r.s(t.table().node()).classHas("collapsed") && t.rows().nodes().toArray().includes(r.s(this).closest("tr").get(0))) {
				if (typeof i == "number") {
					var a = i < 0 ? t.columns().eq(0).length + i : i;
					if (t.cell(this).index().column !== a) return;
				}
				var o = t.row(r.s(this).closest("tr"));
				n.type === "click" ? e._detailsDisplay(o, !1) : n.type === "mousedown" ? r.s(this).css("outline", "none") : n.type === "mouseup" && r.s(this).css("outline", "").trigger("blur");
			}
		});
	}
	_detailsObj(e) {
		var t = this, n = this.s.dt, r = [];
		let i = n.settings()[0];
		return this.s.columns.map(function(a, o) {
			if (a.never || a.control) return !1;
			var s = i.columns[o];
			return r[o] || (r[o] = n.column(o)), {
				className: s.className,
				columnIndex: o,
				data: i.fastData(e, o, t.c.orthogonal),
				hidden: r[o].visible() && !t.s.current[o],
				rowIndex: e,
				title: r[o].title()
			};
		}).filter((e) => !!e);
	}
	_find(e) {
		var t = this.c.breakpoints;
		if (t) {
			for (var n = 0, r = t.length; n < r; n++) if (t[n].name === e) return t[n];
		}
	}
	_redrawChildren() {
		var e = this, t = this.s.dt;
		t.rows({ page: "current" }).iterator("row", function(n, r) {
			e._detailsDisplay(t.row(r), !0);
		});
	}
	_resize(e = !1) {
		var t = this, n = this.s.dt, i = r.w.width(), a = this.c.breakpoints, o = a[0].name, s = this.s.columns, c, l, u = this.s.current.slice();
		for (c = a.length - 1; c >= 0; c--) if (i <= a[c].width) {
			o = a[c].name;
			break;
		}
		var d = this._columnsVisibility(o);
		this.s.current = d;
		var f = !1;
		for (c = 0, l = s.length; c < l; c++) if (d[c] === !1 && !s[c].never && !s[c].control && n.column(c).visible()) {
			f = !0;
			break;
		}
		r.s(n.table().node()).classToggle("collapsed", f);
		var p = !1, m = 0, h = n.settings()[0], g = r.s(n.table().node()).children("colgroup"), _ = h.columns.map(function(e) {
			return e.colEl;
		});
		n.columns().eq(0).each(function(r, i) {
			n.column(r).visible() && (d[i] === !0 && m++, (e || d[i] !== u[i]) && (p = !0, t._setColumnVis(r, d[i])), d[i] ? t._colGroupAttach(g, _, i) : _[i].detach());
		}), p && (n.columns.adjust(), this._redrawChildren(), r.s(n.table().node()).trigger("responsive-resize.dt", !1, [n, this._responsiveOnlyHidden()]), n.page.info().recordsDisplay === 0 && r.s(n.table().body()).find("td").eq(0).attr("colspan", m)), t._controlClass();
	}
	_resizeAuto() {
		var e = this.s.dt, t = this.s.columns, n = this, i = e.columns().indexes().filter(function(t) {
			return e.column(t).visible();
		});
		if (!this.c.auto || !t.map((e) => e.auto).includes(!0)) return;
		var a = e.table().node().cloneNode(!1), o = r.s(e.table().header().cloneNode(!1)).appendTo(a), s = r.s(e.table().footer().cloneNode(!1)).appendTo(a), c = r.s(e.table().body()).clone(!0).empty().appendTo(a);
		a.style.width = "auto", e.table().header.structure(i).forEach((e) => {
			var t = e.filter(function(e) {
				return !!e;
			}).map(function(e) {
				return r.s(e.cell).clone(!0).css("display", "table-cell").css("width", "auto").css("min-width", "0").get(0);
			});
			r.c("tr").append(t).appendTo(o);
		});
		for (var l = r.c("tr").appendTo(c), u = 0; u < i.count(); u++) l.append(r.c("td"));
		let d = this.s.details.renderer;
		typeof d == "function" && d._responsiveMovesNodes ? e.rows({ page: "current" }).every(function(t) {
			var a = this.node();
			if (a) {
				var o = a.cloneNode(!1);
				e.cells(t, i).every(function(e, i) {
					var a = n.s.childNodeStore[t + "-" + i];
					a ? r.s(this.node().cloneNode(!1)).append(r.s(a).clone(!0)).appendTo(o) : r.s(this.node()).clone(!0).appendTo(o);
				}), c.append(o);
			}
		}) : c.append(e.rows({ page: "current" }).nodes().toDom().clone(!0)).find("th, td").css("display", ""), c.find("th, td").css("display", ""), e.table().footer.structure(i).forEach((e) => {
			var t = e.filter(function(e) {
				return !!e;
			}).map(function(e) {
				return r.s(e.cell).clone(!1).css("display", "table-cell").css("width", "auto").css("min-width", "0").get(0);
			});
			r.c("tr").append(t).appendTo(s);
		}), this.s.details.type === "inline" && r.s(a).classAdd("dtr-inline collapsed"), r.s(a).find("[name]").attrRemove("name"), r.s(a).css("position", "relative");
		var f = r.c("div").css({
			width: "1px",
			height: "1px",
			overflow: "hidden",
			clear: "both"
		}).append(a);
		f.insertBefore(e.table().node()), l.children().each(function(n, r) {
			var i = e.column.index("fromVisible", r);
			i !== null && (t[i].minWidth = n.offsetWidth || 0);
		}), f.remove();
	}
	_responsiveOnlyHidden() {
		var e = this.s.dt;
		return this.s.current.map(function(t, n) {
			return e.column(n).visible() === !1 || t;
		});
	}
	_setColumnVis(e, t) {
		var n = this, r = this.s.dt, i = t ? "" : "none";
		this._setHeaderVis(e, t, r.table().header.structure()), this._setHeaderVis(e, t, r.table().footer.structure()), r.column(e).nodes().toDom().css("display", i).classToggle("dtr-hidden", !t), r.settings()[0].columns[e].responsiveVisible = t, Object.keys(this.s.childNodeStore).length !== 0 && r.cells(null, e).indexes().each(function(e) {
			n._childNodesRestore(r, e.row, e.column);
		});
	}
	_setHeaderVis(e, t, n) {
		var i = this, a = t ? "" : "none";
		n.forEach(function(e, t) {
			for (var r = 0; r < e.length; r++) if (e[r] && e[r].rowspan > 1) for (var i = e[r].rowspan, a = 1; a < i; a++) n[t + a][r] = {};
		}), n.forEach(function(n) {
			if (n[e] && n[e].cell) r.s(n[e].cell).css("display", a).classToggle("dtr-hidden", !t);
			else for (var o = e; o >= 0;) {
				if (n[o] && n[o].cell) {
					r.s(n[o].cell).attr("colSpan", i._colspan(n, o));
					break;
				}
				o--;
			}
		});
	}
	_colspan(e, t) {
		for (var n = 1, r = t + 1; r < e.length; r++) if (e[r] === null && this.s.current[r]) n++;
		else if (e[r]) break;
		return n;
	}
	_tabIndexes() {
		var e = this.s.dt, t = e.cells({ page: "current" }).nodes().toDom(), n = e.settings()[0], r = this.s.details.target;
		if (t.filter("[data-dtr-keyboard]").attrRemove("data-dtr-keyboard"), typeof r == "number") e.cells(null, r, { page: "current" }).nodes().toDom().attr("tabIndex", n.tabIndex).data("dtrKeyboard", 1);
		else if (r) {
			r === "td:first-child, th:first-child" && (r = ">td:first-child, >th:first-child");
			var i = e.rows({ page: "current" }).nodes().toDom();
			(r === "tr" ? i : i.find(r)).attr("tabIndex", n.tabIndex).data("dtrKeyboard", 1);
		}
	}
};
d.breakpoints = [
	{
		name: "desktop",
		width: Infinity
	},
	{
		name: "tablet-l",
		width: 1024
	},
	{
		name: "tablet-p",
		width: 768
	},
	{
		name: "mobile-l",
		width: 480
	},
	{
		name: "mobile-p",
		width: 320
	}
], d.defaults = {
	breakpoints: d.breakpoints,
	auto: !0,
	details: {
		display: a,
		renderer: l(),
		target: 0,
		type: "inline"
	},
	orthogonal: "display"
}, d.display = {
	childRow: a,
	childRowImmediate: o,
	modal: s
}, d.renderer = {
	listHidden: l,
	listHiddenNodes: c,
	tableAll: u
}, d.version = "4.1.1", t.register("responsive()", function() {
	return this.inst(this.context);
}), t.register("responsive.index()", function(e) {
	return e = r.s(e), {
		column: e.data("dtr-index"),
		row: e.parent().data("dtr-index")
	};
}), t.register("responsive.rebuild()", function() {
	return this.iterator("table", function(e) {
		e._responsive && e._responsive._classLogic();
	});
}), t.register("responsive.recalc()", function() {
	return this.iterator("table", function(e) {
		e._responsive && (e._responsive._resizeAuto(), e._responsive._resize());
	});
}), t.register("responsive.hasHidden()", function() {
	var e = this.context[0];
	return e._responsive ? e._responsive._responsiveOnlyHidden().includes(!1) : !1;
}), t.registerPlural("columns().responsiveHidden()", "column().responsiveHidden()", function() {
	return this.iterator("column", function(e, t) {
		return e._responsive ? e._responsive._responsiveOnlyHidden()[t] : !1;
	}, !0);
}), n.Responsive = d, r.on("preInit.dt.dtr", function(e, t, a) {
	if (e.namespace === "dt" && (r.s(t.table).classHas("responsive") || r.s(t.table).classHas("dt-responsive") || t.init.responsive || n.defaults.responsive)) {
		var o = t.init.responsive;
		o !== !1 && new d(t, i.is.plainObject(o) ? o : {});
	}
});
// node_modules/datatables.net-responsive-bs5/js/responsive.bootstrap5.mjs
var f = e.Dom, p = e.Responsive.display, m = p.modal, h, g;
function _() {
	return h ||= f.c("div").classAdd("modal fade dtr-bs-modal").attr("role", "dialog").append(f.c("div").classAdd("modal-dialog").attr("role", "document").append(f.c("div").classAdd("modal-content").append(f.c("div").classAdd("modal-header").append(f.c("button").attr("type", "button").attr("data-bs-dismiss", "modal").attr("aria-label", "Close").classAdd("btn-close"))).append(f.c("div").classAdd("modal-body")))).append(f.c("div").classAdd("content")), h;
}
function v() {
	let t = e.use("bootstrap"), n = e.use("win");
	if (t) return t;
	if (n.bootstrap) return n.bootstrap;
	throw Error("No Bootstrap library. Set it with `DataTable.use(bootstrap);`");
}
p.modal = function(e) {
	let t = _(), n = v();
	return !g && n.Modal && (g = new n.Modal(t.get(0))), function(n, r, i, a) {
		if (g) {
			var o = i();
			if (o === !1) return !1;
			if (!r) {
				if (e && e.header) {
					var s = t.find("div.modal-header"), c = s.find("button").detach();
					s.empty().append(f.c("h4").classAdd("modal-title").html(e.header(n))).append(c);
				}
				t.find("div.modal-body").empty().append(o), t.attr("data-dtr-index", n.index()).appendTo("body"), t.get(0).addEventListener("hidden.bs.modal", a, { once: !0 }), g.show();
			} else if (t.isAttached() && n.index() === t.attr("data-dtr-index")) t.find("div.modal-body").empty().append(o);
			else return null;
			return !0;
		}
		return m(n, r, i, a);
	};
};
var y = e;
export { y as default };
