jQuery.browser = {};
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

// Hover time out
!function (n) {
	n.fn.hoverTimeout = function (t, u, e, i) {
		return this.each(function () {
			var o = null,
			c = n(this);
			c.hover(function () {
				clearTimeout(o),
				o = setTimeout(function () {
						u.call(c)
					}, t)
			}, function () {
				clearTimeout(o),
				o = setTimeout(function () {
						i.call(c)
					}, e)
			})
		})
	}
}
(jQuery);

//Isotope
(function (a, b, c) {
	function f(a) {
		var b = document.documentElement.style,
		c;
		if (typeof b[a] == "string")
			return a;
		a = d(a);
		for (var f = 0, g = e.length; f < g; f++) {
			c = e[f] + a;
			if (typeof b[c] == "string")
				return c
		}
	}
	function d(a) {
		return a.charAt(0).toUpperCase() + a.slice(1)
	}
	var e = "Moz Webkit Khtml O Ms".split(" "),
	g = f("transform"),
	h = {
		csstransforms : function () {
			return !!g
		},
		csstransforms3d : function () {
			var a = !!f("perspective");
			if (a) {
				var c = " -o- -moz- -ms- -webkit- -khtml- ".split(" "),
				d = "@media (" + c.join("transform-3d),(") + "modernizr)",
				e = b("<style>" + d + "{#modernizr{height:3px}}" + "</style>").appendTo("head"),
				g = b('<div id="modernizr" />').appendTo("html");
				a = g.height() === 3,
				g.remove(),
				e.remove()
			}
			return a
		},
		csstransitions : function () {
			return !!f("transitionProperty")
		}
	};
	if (a.Modernizr)
		for (var i in h)
			Modernizr.hasOwnProperty(i) || Modernizr.addTest(i, h[i]);
	else
		a.Modernizr = function () {
			var a = {
				_version : "1.6ish: miniModernizr for Isotope"
			},
			c = " ",
			d,
			e;
			for (e in h)
				d = h[e](), a[e] = d, c += " " + (d ? "" : "no-") + e;
			b("html").addClass(c);
			return a
		}
	();
	if (Modernizr.csstransforms) {
		var j = Modernizr.csstransforms3d ? {
			translate : function (a) {
				return "translate3d(" + a[0] + "px, " + a[1] + "px, 0) "
			},
			scale : function (a) {
				return "scale3d(" + a + ", " + a + ", 1) "
			}
		}
		 : {
			translate : function (a) {
				return "translate(" + a[0] + "px, " + a[1] + "px) "
			},
			scale : function (a) {
				return "scale(" + a + ") "
			}
		},
		k = function (a, c, d) {
			var e = b.data(a, "isoTransform") || {},
			f = {},
			h,
			i = {},
			k;
			f[c] = d,
			b.extend(e, f);
			for (h in e)
				k = e[h], i[h] = j[h](k);
			var l = i.translate || "",
			m = i.scale || "",
			n = l + m;
			b.data(a, "isoTransform", e),
			a.style[g] = n
		};
		b.cssNumber.scale = !0,
		b.cssHooks.scale = {
			set : function (a, b) {
				k(a, "scale", b)
			},
			get : function (a, c) {
				var d = b.data(a, "isoTransform");
				return d && d.scale ? d.scale : 1
			}
		},
		b.fx.step.scale = function (a) {
			b.cssHooks.scale.set(a.elem, a.now + a.unit)
		},
		b.cssNumber.translate = !0,
		b.cssHooks.translate = {
			set : function (a, b) {
				k(a, "translate", b)
			},
			get : function (a, c) {
				var d = b.data(a, "isoTransform");
				return d && d.translate ? d.translate : [0, 0]
			}
		}
	}
	var l = b.event,
	m;
	l.special.smartresize = {
		setup : function () {
			b(this).bind("resize", l.special.smartresize.handler)
		},
		teardown : function () {
			b(this).unbind("resize", l.special.smartresize.handler)
		},
		handler : function (a, b) {
			var c = this,
			d = arguments;
			a.type = "smartresize",
			m && clearTimeout(m),
			m = setTimeout(function () {
					jQuery.event.handle.apply(c, d)
				}, b === "execAsap" ? 0 : 100)
		}
	},
	b.fn.smartresize = function (a) {
		return a ? this.bind("smartresize", a) : this.trigger("smartresize", ["execAsap"])
	},
	b.Isotope = function (a, c) {
		this.element = b(c),
		this._create(a),
		this._init()
	};
	var n = ["overflow", "position", "width", "height"];
	b.Isotope.settings = {
		resizable : !0,
		layoutMode : "masonry",
		containerClass : "isotope",
		itemClass : "isotope-item",
		hiddenClass : "isotope-hidden",
		hiddenStyle : Modernizr.csstransforms && !b.browser.opera ? {
			opacity : 0,
			scale : .001
		}
		 : {
			opacity : 0
		},
		visibleStyle : Modernizr.csstransforms && !b.browser.opera ? {
			opacity : 1,
			scale : 1
		}
		 : {
			opacity : 1
		},
		animationEngine : b.browser.opera ? "jquery" : "best-available",
		animationOptions : {
			queue : !1,
			duration : 800
		},
		sortBy : "original-order",
		sortAscending : !0,
		resizesContainer : !0,
		transformsEnabled : !0,
		itemPositionDataEnabled : !1
	},
	b.Isotope.prototype = {
		_create : function (c) {
			this.options = b.extend({}, b.Isotope.settings, c),
			this.styleQueue = [],
			this.elemCount = 0;
			var d = this.element[0].style;
			this.originalStyle = {};
			for (var e = 0, f = n.length; e < f; e++) {
				var g = n[e];
				this.originalStyle[g] = d[g] || null
			}
			this.element.css({
				overflow : "hidden",
				position : "relative"
			}),
			this._updateAnimationEngine(),
			this._updateUsingTransforms();
			var h = {
				"original-order" : function (a, b) {
					return b.elemCount
				},
				random : function () {
					return Math.random()
				}
			};
			this.options.getSortData = b.extend(this.options.getSortData, h),
			this.reloadItems();
			var i = b(document.createElement("div")).prependTo(this.element);
			this.offset = i.position(),
			i.remove();
			var j = this;
			setTimeout(function () {
				j.element.addClass(j.options.containerClass)
			}, 0),
			this.options.resizable && b(a).bind("smartresize.isotope", function () {
				j.resize()
			})
		},
		_getAtoms : function (a) {
			var b = this.options.itemSelector,
			c = b ? a.filter(b).add(a.find(b)) : a,
			d = {
				position : "absolute"
			};
			this.usingTransforms && (d.left = 0, d.top = 0),
			c.css(d).addClass(this.options.itemClass),
			this.updateSortData(c, !0);
			return c
		},
		_init : function (a) {
			this.$filteredAtoms = this._filter(this.$allAtoms),
			this._sort(),
			this.reLayout(a)
		},
		option : function (a) {
			if (b.isPlainObject(a)) {
				this.options = b.extend(!0, this.options, a);
				var c;
				for (var e in a)
					c = "_update" + d(e), this[c] && this[c]()
			}
		},
		_updateAnimationEngine : function () {
			var a = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, "");
			switch (a) {
			case "css":
			case "none":
				this.isUsingJQueryAnimation = !1;
				break;
			case "jquery":
				this.isUsingJQueryAnimation = !0;
				break;
			default:
				this.isUsingJQueryAnimation = !Modernizr.csstransitions
			}
			this._updateUsingTransforms()
		},
		_updateTransformsEnabled : function () {
			this._updateUsingTransforms()
		},
		_updateUsingTransforms : function () {
			this.usingTransforms = this.options.transformsEnabled && Modernizr.csstransforms && Modernizr.csstransitions && !this.isUsingJQueryAnimation,
			this.getPositionStyles = this.usingTransforms ? this._translate : this._positionAbs
		},
		_filter : function (a) {
			var b = this.options.filter === "" ? "*" : this.options.filter;
			if (!b)
				return a;
			var c = this.options.hiddenClass,
			d = "." + c,
			e = a.filter(d),
			f = e;
			if (b !== "*") {
				f = e.filter(b);
				var g = a.not(d).not(b).addClass(c);
				this.styleQueue.push({
					$el : g,
					style : this.options.hiddenStyle
				})
			}
			this.styleQueue.push({
				$el : f,
				style : this.options.visibleStyle
			}),
			f.removeClass(c);
			return a.filter(b)
		},
		updateSortData : function (a, c) {
			var d = this,
			e = this.options.getSortData,
			f,
			g;
			a.each(function () {
				f = b(this),
				g = {};
				for (var a in e)
					g[a] = e[a](f, d);
				b.data(this, "isotope-sort-data", g),
				c && d.elemCount++
			})
		},
		_sort : function () {
			var a = this.options.sortBy,
			b = this._getSorter,
			c = this.options.sortAscending ? 1 : -1,
			d = function (d, e) {
				var f = b(d, a),
				g = b(e, a);
				f === g && a !== "original-order" && (f = b(d, "original-order"), g = b(e, "original-order"));
				return (f > g ? 1 : f < g ? -1 : 0) * c
			};
			this.$filteredAtoms.sort(d)
		},
		_getSorter : function (a, c) {
			return b.data(a, "isotope-sort-data")[c]
		},
		_translate : function (a, b) {
			return {
				translate : [a, b]
			}
		},
		_positionAbs : function (a, b) {
			return {
				left : a,
				top : b
			}
		},
		_pushPosition : function (a, b, c) {
			b += this.offset.left,
			c += this.offset.top;
			var d = this.getPositionStyles(b, c);
			this.styleQueue.push({
				$el : a,
				style : d
			}),
			this.options.itemPositionDataEnabled && a.data("isotope-item-position", {
				x : b,
				y : c
			})
		},
		layout : function (a, b) {
			var c = this.options.layoutMode;
			this["_" + c + "Layout"](a);
			if (this.options.resizesContainer) {
				var d = this["_" + c + "GetContainerSize"]();
				this.styleQueue.push({
					$el : this.element,
					style : d
				})
			}
			this._processStyleQueue(),
			b && b.call(a),
			this.isLaidOut = !0
		},
		_processStyleQueue : function () {
			var a = this.isLaidOut ? this.isUsingJQueryAnimation ? "animate" : "css" : "css",
			c = this.options.animationOptions,
			d = this._isInserting && this.isUsingJQueryAnimation,
			e;
			b.each(this.styleQueue, function (b, f) {
				e = d && f.$el.hasClass("no-transition") ? "css" : a,
				f.$el[e](f.style, c)
			}),
			this.styleQueue = []
		},
		resize : function () {
			this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout()
		},
		reLayout : function (a) {
			this["_" + this.options.layoutMode + "Reset"](),
			this.layout(this.$filteredAtoms, a)
		},
		addItems : function (a, b) {
			var c = this._getAtoms(a);
			this.$allAtoms = this.$allAtoms.add(c),
			b && b(c)
		},
		insert : function (a, b) {
			this.element.append(a);
			var c = this;
			this.addItems(a, function (a) {
				var d = c._filter(a, !0);
				c._addHideAppended(d),
				c._sort(),
				c.reLayout(),
				c._revealAppended(d, b)
			})
		},
		appended : function (a, b) {
			var c = this;
			this.addItems(a, function (a) {
				c._addHideAppended(a),
				c.layout(a),
				c._revealAppended(a, b)
			})
		},
		_addHideAppended : function (a) {
			this.$filteredAtoms = this.$filteredAtoms.add(a),
			a.addClass("no-transition"),
			this._isInserting = !0,
			this.styleQueue.push({
				$el : a,
				style : this.options.hiddenStyle
			})
		},
		_revealAppended : function (a, b) {
			var c = this;
			setTimeout(function () {
				a.removeClass("no-transition"),
				c.styleQueue.push({
					$el : a,
					style : c.options.visibleStyle
				}),
				c._processStyleQueue(),
				delete c._isInserting,
				b && b(a)
			}, 10)
		},
		reloadItems : function () {
			this.$allAtoms = this._getAtoms(this.element.children())
		},
		remove : function (a) {
			this.$allAtoms = this.$allAtoms.not(a),
			this.$filteredAtoms = this.$filteredAtoms.not(a),
			a.remove()
		},
		shuffle : function () {
			this.updateSortData(this.$allAtoms),
			this.options.sortBy = "random",
			this._sort(),
			this.reLayout()
		},
		destroy : function () {
			var c = this.usingTransforms;
			this.$allAtoms.removeClass(this.options.hiddenClass + " " + this.options.itemClass).each(function () {
				this.style.position = null,
				this.style.top = null,
				this.style.left = null,
				this.style.opacity = null,
				c && (this.style[g] = null)
			});
			var d = this.element[0].style;
			for (var e = 0, f = n.length; e < f; e++) {
				var h = n[e];
				d[h] = this.originalStyle[h]
			}
			this.element.unbind(".isotope").removeClass(this.options.containerClass).removeData("isotope"),
			b(a).unbind(".isotope")
		},
		_getSegments : function (a) {
			var b = this.options.layoutMode,
			c = a ? "rowHeight" : "columnWidth",
			e = a ? "height" : "width",
			f = a ? "rows" : "cols",
			g = this.element[e](),
			h,
			i = this.options[b] && this.options[b][c] || this.$filteredAtoms["outer" + d(e)](!0) || g;
			h = Math.floor(g / i),
			h = Math.max(h, 1),
			this[b][f] = h,
			this[b][c] = i
		},
		_checkIfSegmentsChanged : function (a) {
			var b = this.options.layoutMode,
			c = a ? "rows" : "cols",
			d = this[b][c];
			this._getSegments(a);
			return this[b][c] !== d
		},
		_masonryReset : function () {
			this.masonry = {},
			this._getSegments();
			var a = this.masonry.cols;
			this.masonry.colYs = [];
			while (a--)
				this.masonry.colYs.push(0)
		},
		_masonryLayout : function (a) {
			var c = this,
			d = c.masonry;
			a.each(function () {
				var a = b(this),
				e = Math.ceil(a.outerWidth(!0) / d.columnWidth);
				e = Math.min(e, d.cols);
				if (e === 1)
					c._masonryPlaceBrick(a, d.colYs);
				else {
					var f = d.cols + 1 - e,
					g = [],
					h,
					i;
					for (i = 0; i < f; i++)
						h = d.colYs.slice(i, i + e), g[i] = Math.max.apply(Math, h);
					c._masonryPlaceBrick(a, g)
				}
			})
		},
		_masonryPlaceBrick : function (a, b) {
			var c = Math.min.apply(Math, b),
			d = 0;
			for (var e = 0, f = b.length; e < f; e++)
				if (b[e] === c) {
					d = e;
					break
				}
			var g = this.masonry.columnWidth * d,
			h = c;
			this._pushPosition(a, g, h);
			var i = c + a.outerHeight(!0),
			j = this.masonry.cols + 1 - f;
			for (e = 0; e < j; e++)
				this.masonry.colYs[d + e] = i
		},
		_masonryGetContainerSize : function () {
			var a = Math.max.apply(Math, this.masonry.colYs);
			return {
				height : a
			}
		},
		_masonryResizeChanged : function () {
			return this._checkIfSegmentsChanged()
		},
		_fitRowsReset : function () {
			this.fitRows = {
				x : 0,
				y : 0,
				height : 0
			}
		},
		_fitRowsLayout : function (a) {
			var c = this,
			d = this.element.width(),
			e = this.fitRows;
			a.each(function () {
				var a = b(this),
				f = a.outerWidth(!0),
				g = a.outerHeight(!0);
				e.x !== 0 && f + e.x > d && (e.x = 0, e.y = e.height),
				c._pushPosition(a, e.x, e.y),
				e.height = Math.max(e.y + g, e.height),
				e.x += f
			})
		},
		_fitRowsGetContainerSize : function () {
			return {
				height : this.fitRows.height
			}
		},
		_fitRowsResizeChanged : function () {
			return !0
		},
		_cellsByRowReset : function () {
			this.cellsByRow = {
				index : 0
			},
			this._getSegments(),
			this._getSegments(!0)
		},
		_cellsByRowLayout : function (a) {
			var c = this,
			d = this.cellsByRow;
			a.each(function () {
				var a = b(this),
				e = d.index % d.cols,
				f = ~~(d.index / d.cols),
				g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2,
				h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2;
				c._pushPosition(a, g, h),
				d.index++
			})
		},
		_cellsByRowGetContainerSize : function () {
			return {
				height : Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top
			}
		},
		_cellsByRowResizeChanged : function () {
			return this._checkIfSegmentsChanged()
		},
		_straightDownReset : function () {
			this.straightDown = {
				y : 0
			}
		},
		_straightDownLayout : function (a) {
			var c = this;
			a.each(function (a) {
				var d = b(this);
				c._pushPosition(d, 0, c.straightDown.y),
				c.straightDown.y += d.outerHeight(!0)
			})
		},
		_straightDownGetContainerSize : function () {
			return {
				height : this.straightDown.y
			}
		},
		_straightDownResizeChanged : function () {
			return !0
		},
		_masonryHorizontalReset : function () {
			this.masonryHorizontal = {},
			this._getSegments(!0);
			var a = this.masonryHorizontal.rows;
			this.masonryHorizontal.rowXs = [];
			while (a--)
				this.masonryHorizontal.rowXs.push(0)
		},
		_masonryHorizontalLayout : function (a) {
			var c = this,
			d = c.masonryHorizontal;
			a.each(function () {
				var a = b(this),
				e = Math.ceil(a.outerHeight(!0) / d.rowHeight);
				e = Math.min(e, d.rows);
				if (e === 1)
					c._masonryHorizontalPlaceBrick(a, d.rowXs);
				else {
					var f = d.rows + 1 - e,
					g = [],
					h,
					i;
					for (i = 0; i < f; i++)
						h = d.rowXs.slice(i, i + e), g[i] = Math.max.apply(Math, h);
					c._masonryHorizontalPlaceBrick(a, g)
				}
			})
		},
		_masonryHorizontalPlaceBrick : function (a, b) {
			var c = Math.min.apply(Math, b),
			d = 0;
			for (var e = 0, f = b.length; e < f; e++)
				if (b[e] === c) {
					d = e;
					break
				}
			var g = c,
			h = this.masonryHorizontal.rowHeight * d;
			this._pushPosition(a, g, h);
			var i = c + a.outerWidth(!0),
			j = this.masonryHorizontal.rows + 1 - f;
			for (e = 0; e < j; e++)
				this.masonryHorizontal.rowXs[d + e] = i
		},
		_masonryHorizontalGetContainerSize : function () {
			var a = Math.max.apply(Math, this.masonryHorizontal.rowXs);
			return {
				width : a
			}
		},
		_masonryHorizontalResizeChanged : function () {
			return this._checkIfSegmentsChanged(!0)
		},
		_fitColumnsReset : function () {
			this.fitColumns = {
				x : 0,
				y : 0,
				width : 0
			}
		},
		_fitColumnsLayout : function (a) {
			var c = this,
			d = this.element.height(),
			e = this.fitColumns;
			a.each(function () {
				var a = b(this),
				f = a.outerWidth(!0),
				g = a.outerHeight(!0);
				e.y !== 0 && g + e.y > d && (e.x = e.width, e.y = 0),
				c._pushPosition(a, e.x, e.y),
				e.width = Math.max(e.x + f, e.width),
				e.y += g
			})
		},
		_fitColumnsGetContainerSize : function () {
			return {
				width : this.fitColumns.width
			}
		},
		_fitColumnsResizeChanged : function () {
			return !0
		},
		_cellsByColumnReset : function () {
			this.cellsByColumn = {
				index : 0
			},
			this._getSegments(),
			this._getSegments(!0)
		},
		_cellsByColumnLayout : function (a) {
			var c = this,
			d = this.cellsByColumn;
			a.each(function () {
				var a = b(this),
				e = ~~(d.index / d.rows),
				f = d.index % d.rows,
				g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2,
				h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2;
				c._pushPosition(a, g, h),
				d.index++
			})
		},
		_cellsByColumnGetContainerSize : function () {
			return {
				width : Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth
			}
		},
		_cellsByColumnResizeChanged : function () {
			return this._checkIfSegmentsChanged(!0)
		},
		_straightAcrossReset : function () {
			this.straightAcross = {
				x : 0
			}
		},
		_straightAcrossLayout : function (a) {
			var c = this;
			a.each(function (a) {
				var d = b(this);
				c._pushPosition(d, c.straightAcross.x, 0),
				c.straightAcross.x += d.outerWidth(!0)
			})
		},
		_straightAcrossGetContainerSize : function () {
			return {
				width : this.straightAcross.x
			}
		},
		_straightAcrossResizeChanged : function () {
			return !0
		}
	},
	b.fn.imagesLoaded = function (a) {
		var b = this.find("img"),
		c = [],
		d = this,
		e = b.length;
		if (!b.length) {
			a.call(this);
			return this
		}
		b.one("load error", function () {
			--e === 0 && (e = b.length, b.one("load error", function () {
					--e === 0 && a.call(d)
				}).each(function () {
					this.src = c.shift()
				}))
		}).each(function () {
			c.push(this.src),
			this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
		});
		return this
	};
	var o = function (a) {
		this.console && console.error(a)
	};
	b.fn.isotope = function (a) {
		if (typeof a == "string") {
			var c = Array.prototype.slice.call(arguments, 1);
			this.each(function () {
				var d = b.data(this, "isotope");
				if (!d)
					o("cannot call methods on isotope prior to initialization; attempted to call method '" + a + "'");
				else {
					if (!b.isFunction(d[a]) || a.charAt(0) === "_") {
						o("no such method '" + a + "' for isotope instance");
						return
					}
					d[a].apply(d, c)
				}
			})
		} else
			this.each(function () {
				var c = b.data(this, "isotope");
				c ? (c.option(a), c._init()) : b.data(this, "isotope", new b.Isotope(a, this))
			});
		return this
	}
})(window, jQuery);

//Xử lý giao diện điều hướng
function actinave(e) {
	var h = window.location.href;
	e("#navi a").each(function () {
		if (this.href === h) {
			var a = e(this).parents("li").children("a").addClass("current")
		}
	});
	e("#navi ul").removeClass("hidden");
	e("#navi li").hoverTimeout(100, function () {
		e(this).parent("ul").css("overflow", "visible");
		e(this).children("ul").filter(":not(:animated)").slideDown()
	}, 500, function () {
		e(this).parent("ul").css("overflow", "visible");
		e(this).children("ul").slideUp(800, "easeInExpo")
	});
	e("#mobilenav").click(function () {
		e("#navi").slideToggle();
		e(this).toggleClass("active");
		return false
	});
	e("#top_mobilenav").click(function () {
		e("#PageList1 ul").slideToggle();
		e(this).toggleClass("active");
		return false
	});
	function f() {
		if (e(window).width() > 767) {
			e("#navi").css("display", "block").removeClass("suball")
		} else {
			if (e(window).width() <= 767 && e("#mobilenav").attr("class") === "active") {
				e("#navi").css("display", "block").addClass("suball")
			} else {
				if (e(window).width() <= 767 && e("#mobilenav").attr("class") !== "active") {
					e("#navi").css("display", "none").addClass("suball")
				}
			}
		}
	}
	function g() {
		if (e(window).width() > 767) {
			e("#PageList1 ul").css("display", "block")
		} else {
			if (e(window).width() <= 767 && e("#top_mobilenav").attr("class") === "active") {
				e("#PageList1 ul").css("display", "block")
			} else {
				if (e(window).width() <= 767 && e("#top_mobilenav").attr("class") !== "active") {
					e("#PageList1 ul").css("display", "none")
				}
			}
		}
	}
	f();
	g();
	e(window).resize(f);
	e(window).resize(g)
}
// Tìm kiếm
function seach(a) {
	(function (e) {
		var l = {
			blogURL : "",
			srcBlank : "",
			findText : "Search results for keyword",
			NotfindText : "No result!",
			Showthumb : true,
			LoadingText : "Searching...",
			scrthumbSize : 50,
			summaryLength : 100
		};
		l = e.extend({}, l, a);
		var b = e("#ajax-search-form"),
		f = b.find(":text");
		b.append('<div id="search-result"></div>');
		var d = e("#search-result");
		b.on("submit", function () {
			var g = f.val();
			d.show().html('<div class="load">' + l.LoadingText + "</div>");
			e.get((l.blogURL === "" ? window.location.protocol + "//" + window.location.host : l.blogURL) + "/feeds/posts/summary?alt=json-in-script&q=" + g + "&max-results=9999", function (z) {
				var q = z.feed.entry,
				o,
				n,
				h,
				p,
				k = "";
				if (q !== undefined) {
					k = "<h4>" + l.findText + " &quot;" + g + "&quot;</h4>";
					k += '<a class="close" href="/">&times;</a><ol>';
					for (var m = 0; m < q.length; m++) {
						var A = new RegExp(g, "ig"),
						h = q[m].title.$t.replace(A, "<mark>" + g + "</mark>");
						for (var y = 0; y < q[m].link.length; y++) {
							if (q[m].link[y].rel == "alternate") {
								p = q[m].link[y].href
							}
						}
						if (l.summaryLength > 0) {
							if ("content" in q[m]) {
								o = q[m].content.$t
							} else {
								if ("summary" in q[m]) {
									o = q[m].summary.$t
								} else {
									o = ""
								}
							}
							o = o.replace(/<\S[^>]*>/g, "");
							if (o.length > l.summaryLength) {
								o = o.substring(0, l.summaryLength) + "..."
							}
							o = o.replace(A, "<mark>" + g + "</mark>")
						}
						if (l.Showthumb === true) {
							if ("media$thumbnail" in q[m]) {
								n = q[m].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/s" + l.scrthumbSize + "-c")
							} else {
								n = l.srcBlank
							}
						}
						k += '<li><a href="' + p + '" >' + (l.Showthumb === true ? '<img width="' + l.scrthumbSize + '" height="' + l.scrthumbSize + '" src="' + n + '"/>' : "") + "<strong>" + h + "</strong></a>" + (l.summaryLength > 0 ? "<p>" + o + "</p>" : "") + "</li>"
					}
					k += "</ol>";
					d.html(k)
				} else {
					d.html('<a class="close" href="/">&times;</a><strong>' + l.NotfindText + "</strong>")
				}
			}, "jsonp");
			return false
		});
		b.on("click", ".close", function () {
			d.fadeOut();
			return false
		})
	})(jQuery)
}

function recentComments(k) {
	if (k.feed.entry == undefined)
		return;
	var w='<ul style="list-style:none">';
	for (var q = 0; q < 4; q++) {
		var o = k.feed.entry[q];
		var u;
		if (q == k.feed.entry.length) {
			break
		}
		for (var s = 0; s < o.link.length; s++) {
			if (o.link[s].rel == "alternate") {
				u = o.link[s].href;
				break
			}
		}
		u = u.replace("#", "#comment-");
		var i = u.split("#");
		i = i[0];
		var r = i.split("/");
		r = r[5];
		r = r.split(".html");
		r = r[0];
		var v = r.replace(/-/g, " ");
		v = v.link(i);
		if ("content" in o) {
			var p = o.content.$t
		} else {
			if ("summary" in o) {
				var p = o.summary.$t
			} else {
				var p = ""
			}
		}
		var n = /<\S[^>]*>>/g;
		p = p.replace(n, "");
		if (q == 0) {
			w += '<li style="clear:both">';
		} else {
			w += '<li style="clear:both">';
		}
		w += '<div style="display:inline;float:left;margin-right:10px;"><img class="align-left" width="35" height="35" src="' + o.author[0].gd$image.src + '"/></div><div style="margin-left:50px;">' + o.author[0].name.$t + " :<br/>  ";
		if (p.length < 70) {
			w += '<a href="' + u + '">' + p + '</a>';
		} else {
			p = p.substring(0, 70);
			var t = p.lastIndexOf(" ");
			p = p.substring(0, t);
			w += '<a href="' + u + '">' + p + '... </a>';
		}
	}
	w += '</div></li>';
	return w+'</ul>';
}
function sumposts(json) {
	return json.feed.openSearch$totalResults.$t;
}
function numcomments(json) {
	return json.feed.openSearch$totalResults.$t;
}
function removeHtmlTag(strx, chop) {
	var s = strx.split("<");
	for (var i = 0; i < s.length; i++) {
		if (s[i].indexOf(">") != -1) {
			s[i] = s[i].substring(s[i].indexOf(">") + 1, s[i].length);
		}
	}
	s = s.join("");
	s = s.substring(0, chop - 1);
	return s;
}
// Transfer mobile
function a() {
	var b = window.location.href,
	c = b.split("?");
	switch (c.length) {
	case 1:
		return b + "?m=1";
	case 2:
		return 0 <= c[1].search("(^|&)m=") ? null : b + "&m=1";
	default:
		return null
	}
}
var d = navigator.userAgent;
if (-1 != d.indexOf("Mobile") && -1 != d.indexOf("WebKit") && -1 == d.indexOf("iPad") || -1 != d.indexOf("Opera Mini") || -1 != d.indexOf("IEMobile")) {
	var e = a();
	e && window.location.replace(e)
};

// Tiles
function isotope() {
	var a = jQuery(".blog-posts");
	a.isotope({
		itemSelector : ".item-list",
		resizable : true,
		masonry : {
			columnWidth : a.width() / 3
		}
	})
};

// Scroll to top
$(document).ready(function () {
	var offset = 220;
	var duration = 500;
	jQuery(window).scroll(function () {
		if (jQuery(this).scrollTop() > offset) {
			jQuery('.back-to-top').fadeIn(duration);
		} else {
			jQuery('.back-to-top').fadeOut(duration);
		}
	});
	jQuery('.back-to-top').click(function (event) {
		event.preventDefault();
		jQuery('html, body').animate({
			scrollTop : 0
		}, duration);
		return false;
	});
});
// Menu
(function (window) {
	'use strict';
	function classReg(className) {
		return new RegExp("(^|\\s+)" + className + "(\\s+|$)")
	}
	var hasClass,
	addClass,
	removeClass;
	if ('classList' in document.documentElement) {
		hasClass = function (elem, c) {
			return elem.classList.contains(c)
		};
		addClass = function (elem, c) {
			elem.classList.add(c)
		};
		removeClass = function (elem, c) {
			elem.classList.remove(c)
		}
	} else {
		hasClass = function (elem, c) {
			return classReg(c).test(elem.className)
		};
		addClass = function (elem, c) {
			if (!hasClass(elem, c)) {
				elem.className = elem.className + ' ' + c
			}
		};
		removeClass = function (elem, c) {
			elem.className = elem.className.replace(classReg(c), ' ')
		}
	}
	function toggleClass(elem, c) {
		var fn = hasClass(elem, c) ? removeClass : addClass;
		fn(elem, c)
	}
	var classie = {
		hasClass : hasClass,
		addClass : addClass,
		removeClass : removeClass,
		toggleClass : toggleClass,
		has : hasClass,
		add : addClass,
		remove : removeClass,
		toggle : toggleClass
	};
	if (typeof define === 'function' && define.amd) {
		define(classie)
	} else {
		window.classie = classie
	}
})(window);
(function () {
	function mobilecheck() {
		var check = false;
		(function (a) {
			if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
				check = true
		})(navigator.userAgent || navigator.vendor || window.opera);
		return check
	}
	function init() {
		var menu = document.getElementById('bt-menu'),
		trigger = menu.querySelector('a.bt-menu-trigger'),
		triggerPlay = document.querySelector('a.bt-menu-trigger-out'),
		eventtype = mobilecheck() ? 'touchstart' : 'click',
		resetMenu = function () {
			classie.remove(menu, 'bt-menu-open');
			classie.add(menu, 'bt-menu-close')
		},
		closeClickFn = function (ev) {
			resetMenu();
			overlay.removeEventListener(eventtype, closeClickFn)
		};
		var overlay = document.createElement('div');
		overlay.className = 'bt-overlay';
		menu.appendChild(overlay);
		trigger.addEventListener(eventtype, function (ev) {
			ev.stopPropagation();
			ev.preventDefault();
			if (classie.has(menu, 'bt-menu-open')) {
				resetMenu()
			} else {
				classie.remove(menu, 'bt-menu-close');
				classie.add(menu, 'bt-menu-open');
				overlay.addEventListener(eventtype, closeClickFn)
			}
		});
		if (triggerPlay) {
			triggerPlay.addEventListener(eventtype, function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				classie.remove(menu, 'bt-menu-close');
				classie.add(menu, 'bt-menu-open');
				overlay.addEventListener(eventtype, closeClickFn)
			})
		}
	}
	init()
})();

$(document).ready(function(e){
$('#popup_search,.btn_search').on('click', function() {
	$('.search_container').toggle("slide", {
		direction: "right"
	}, "0.5s", function() {
		$('#searchForm .query').focus()
	});
});
$('.user_bar').on('click', function() {
	$('.user_bar_detail').slideToggle(200);
	$('.avatar_container').toggleClass('active');
});
});
