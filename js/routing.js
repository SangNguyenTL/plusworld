//<![CDATA[
var configSummary = {
	thumbnailSize : "s180-c", // Define the post thumbnail size
	summaryLength : 200, // Define the summary length
	slideffect : true, // Define to make image slide
	maxImage : 5, // Define Maximal Image to image slide
	slideSpeed : 3000, // Define Slideshow Speed in milisecond
	defaultNavigation : "LoadMore",
	defaultView : "grid", // Default view Mode
	postPerPage : 6, // Number post every Page (work with PageNavi)
	numshowpage : 3 // Number page Number (work with PageNavi)
};
var Alldefaultconfig = {
	MaxPost : 5,
	MoreText : "Load more posts",
	monthName : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	timemonthName : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	timeFormat : "12",
	viewMoreText : "View More About",
	BackupImage : "http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/s72-c/grey.gif",
	summaryLength : 100,
	FirstImageSize : "s220-p",
	ImageSize : "s70-p",
	slideshowSpeed : 5000,
	RandomTitle : "Random Posts",
	RecentTitle : "Recent Posts",
	RelatedTitle : "Related Posts",
	RelatedStyle : "carousel",
	CommentMode : "blogger",
	redirectMobile : true
};
if (Alldefaultconfig.redirectMobile) {
	var curl = window.location.href;
	if (curl.indexOf('m=1') != -1) {
		curl = curl.replace('m=1', 'm=0');
		window.location.href = curl;
	}
}
// Mousewheel v3.0.6 - jQuery Scroll Mouse Wheel
// Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
(function (d) {
	var b = ["DOMMouseScroll", "mousewheel"];
	if (d.event.fixHooks) {
		for (var a = b.length; a; ) {
			d.event.fixHooks[b[--a]] = d.event.mouseHooks
		}
	}
	d.event.special.mousewheel = {
		setup : function () {
			if (this.addEventListener) {
				for (var e = b.length; e; ) {
					this.addEventListener(b[--e], c, false)
				}
			} else {
				this.onmousewheel = c
			}
		},
		teardown : function () {
			if (this.removeEventListener) {
				for (var e = b.length; e; ) {
					this.removeEventListener(b[--e], c, false)
				}
			} else {
				this.onmousewheel = null
			}
		}
	};
	d.fn.extend({
		mousewheel : function (e) {
			return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
		},
		unmousewheel : function (e) {
			return this.unbind("mousewheel", e)
		}
	});
	function c(j) {
		var h = j || window.event,
		g = [].slice.call(arguments, 1),
		k = 0,
		i = true,
		f = 0,
		e = 0;
		j = d.event.fix(h);
		j.type = "mousewheel";
		if (h.wheelDelta) {
			k = h.wheelDelta / 120
		}
		if (h.detail) {
			k = -h.detail / 3
		}
		e = k;
		if (h.axis !== undefined && h.axis === h.HORIZONTAL_AXIS) {
			e = 0;
			f = -1 * k
		}
		if (h.wheelDeltaY !== undefined) {
			e = h.wheelDeltaY / 120
		}
		if (h.wheelDeltaX !== undefined) {
			f = -1 * h.wheelDeltaX / 120
		}
		g.unshift(j, k, f, e);
		return (d.event.dispatch || d.event.handle).apply(this, g)
	}
})(jQuery);

// jQuery FlexSlider v2.2.0 Copyright 2012 WooThemes Author: Tyler Smith
(function (e) {
	e.flexslider = function (t, n) {
		var r = e(t);
		r.vars = e.extend({}, e.flexslider.defaults, n);
		var i = r.vars.namespace,
		s = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
		o = ("ontouchstart" in window || s || window.DocumentTouch && document instanceof DocumentTouch) && r.vars.touch,
		u = "click touchend MSPointerUp",
		a = "",
		f,
		l = r.vars.direction === "vertical",
		c = r.vars.reverse,
		h = r.vars.itemWidth > 0,
		p = r.vars.animation === "fade",
		d = r.vars.asNavFor !== "",
		v = {},
		m = !0;
		e.data(t, "flexslider", r);
		v = {
			init : function () {
				r.animating = !1;
				r.currentSlide = parseInt(r.vars.startAt ? r.vars.startAt : 0);
				isNaN(r.currentSlide) && (r.currentSlide = 0);
				r.animatingTo = r.currentSlide;
				r.atEnd = r.currentSlide === 0 || r.currentSlide === r.last;
				r.containerSelector = r.vars.selector.substr(0, r.vars.selector.search(" "));
				r.slides = e(r.vars.selector, r);
				r.container = e(r.containerSelector, r);
				r.count = r.slides.length;
				r.syncExists = e(r.vars.sync).length > 0;
				r.vars.animation === "slide" && (r.vars.animation = "swing");
				r.prop = l ? "top" : "marginLeft";
				r.args = {};
				r.manualPause = !1;
				r.stopped = !1;
				r.started = !1;
				r.startTimeout = null;
				r.transitions = !r.vars.video && !p && r.vars.useCSS && function () {
					var e = document.createElement("div"),
					t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
					for (var n in t)
						if (e.style[t[n]] !== undefined) {
							r.pfx = t[n].replace("Perspective", "").toLowerCase();
							r.prop = "-" + r.pfx + "-transform";
							return !0
						}
					return !1
				}
				();
				r.vars.controlsContainer !== "" && (r.controlsContainer = e(r.vars.controlsContainer).length > 0 && e(r.vars.controlsContainer));
				r.vars.manualControls !== "" && (r.manualControls = e(r.vars.manualControls).length > 0 && e(r.vars.manualControls));
				if (r.vars.randomize) {
					r.slides.sort(function () {
						return Math.round(Math.random()) - .5
					});
					r.container.empty().append(r.slides)
				}
				r.doMath();
				r.setup("init");
				r.vars.controlNav && v.controlNav.setup();
				r.vars.directionNav && v.directionNav.setup();
				r.vars.keyboard && (e(r.containerSelector).length === 1 || r.vars.multipleKeyboard) && e(document).bind("keyup", function (e) {
					var t = e.keyCode;
					if (!r.animating && (t === 39 || t === 37)) {
						var n = t === 39 ? r.getTarget("next") : t === 37 ? r.getTarget("prev") : !1;
						r.flexAnimate(n, r.vars.pauseOnAction)
					}
				});
				r.vars.mousewheel && r.bind("mousewheel", function (e, t, n, i) {
					e.preventDefault();
					var s = t < 0 ? r.getTarget("next") : r.getTarget("prev");
					r.flexAnimate(s, r.vars.pauseOnAction)
				});
				r.vars.pausePlay && v.pausePlay.setup();
				r.vars.slideshow && r.vars.pauseInvisible && v.pauseInvisible.init();
				if (r.vars.slideshow) {
					r.vars.pauseOnHover && r.hover(function () {
						!r.manualPlay && !r.manualPause && r.pause()
					}, function () {
						!r.manualPause && !r.manualPlay && !r.stopped && r.play()
					});
					if (!r.vars.pauseInvisible || !v.pauseInvisible.isHidden())
						r.vars.initDelay > 0 ? r.startTimeout = setTimeout(r.play, r.vars.initDelay) : r.play()
				}
				d && v.asNav.setup();
				o && r.vars.touch && v.touch();
				(!p || p && r.vars.smoothHeight) && e(window).bind("resize orientationchange focus", v.resize);
				r.find("img").attr("draggable", "false");
				setTimeout(function () {
					r.vars.start(r)
				}, 200)
			},
			asNav : {
				setup : function () {
					r.asNav = !0;
					r.animatingTo = Math.floor(r.currentSlide / r.move);
					r.currentItem = r.currentSlide;
					r.slides.removeClass(i + "active-slide").eq(r.currentItem).addClass(i + "active-slide");
					if (!s)
						r.slides.click(function (t) {
							t.preventDefault();
							var n = e(this),
							s = n.index(),
							o = n.offset().left - e(r).scrollLeft();
							if (o <= 0 && n.hasClass(i + "active-slide"))
								r.flexAnimate(r.getTarget("prev"), !0);
							else if (!e(r.vars.asNavFor).data("flexslider").animating && !n.hasClass(i + "active-slide")) {
								r.direction = r.currentItem < s ? "next" : "prev";
								r.flexAnimate(s, r.vars.pauseOnAction, !1, !0, !0)
							}
						});
					else {
						t._slider = r;
						r.slides.each(function () {
							var t = this;
							t._gesture = new MSGesture;
							t._gesture.target = t;
							t.addEventListener("MSPointerDown", function (e) {
								e.preventDefault();
								e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
							}, !1);
							t.addEventListener("MSGestureTap", function (t) {
								t.preventDefault();
								var n = e(this),
								i = n.index();
								if (!e(r.vars.asNavFor).data("flexslider").animating && !n.hasClass("active")) {
									r.direction = r.currentItem < i ? "next" : "prev";
									r.flexAnimate(i, r.vars.pauseOnAction, !1, !0, !0)
								}
							})
						})
					}
				}
			},
			controlNav : {
				setup : function () {
					r.manualControls ? v.controlNav.setupManual() : v.controlNav.setupPaging()
				},
				setupPaging : function () {
					var t = r.vars.controlNav === "thumbnails" ? "control-thumbs" : "control-paging",
					n = 1,
					s,
					o;
					r.controlNavScaffold = e('<ol class="' + i + "control-nav " + i + t + '"></ol>');
					if (r.pagingCount > 1)
						for (var f = 0; f < r.pagingCount; f++) {
							o = r.slides.eq(f);
							s = r.vars.controlNav === "thumbnails" ? '<img src="' + o.attr("data-thumb") + '"/>' : "<a>" + n + "</a>";
							if ("thumbnails" === r.vars.controlNav && !0 === r.vars.thumbCaptions) {
								var l = o.attr("data-thumbcaption");
								"" != l && undefined != l && (s += '<span class="' + i + 'caption">' + l + "</span>")
							}
							r.controlNavScaffold.append("<li>" + s + "</li>");
							n++
						}
					r.controlsContainer ? e(r.controlsContainer).append(r.controlNavScaffold) : r.append(r.controlNavScaffold);
					v.controlNav.set();
					v.controlNav.active();
					r.controlNavScaffold.delegate("a, img", u, function (t) {
						t.preventDefault();
						if (a === "" || a === t.type) {
							var n = e(this),
							s = r.controlNav.index(n);
							if (!n.hasClass(i + "active")) {
								r.direction = s > r.currentSlide ? "next" : "prev";
								r.flexAnimate(s, r.vars.pauseOnAction)
							}
						}
						a === "" && (a = t.type);
						v.setToClearWatchedEvent()
					})
				},
				setupManual : function () {
					r.controlNav = r.manualControls;
					v.controlNav.active();
					r.controlNav.bind(u, function (t) {
						t.preventDefault();
						if (a === "" || a === t.type) {
							var n = e(this),
							s = r.controlNav.index(n);
							if (!n.hasClass(i + "active")) {
								s > r.currentSlide ? r.direction = "next" : r.direction = "prev";
								r.flexAnimate(s, r.vars.pauseOnAction)
							}
						}
						a === "" && (a = t.type);
						v.setToClearWatchedEvent()
					})
				},
				set : function () {
					var t = r.vars.controlNav === "thumbnails" ? "img" : "a";
					r.controlNav = e("." + i + "control-nav li " + t, r.controlsContainer ? r.controlsContainer : r)
				},
				active : function () {
					r.controlNav.removeClass(i + "active").eq(r.animatingTo).addClass(i + "active")
				},
				update : function (t, n) {
					r.pagingCount > 1 && t === "add" ? r.controlNavScaffold.append(e("<li><a>" + r.count + "</a></li>")) : r.pagingCount === 1 ? r.controlNavScaffold.find("li").remove() : r.controlNav.eq(n).closest("li").remove();
					v.controlNav.set();
					r.pagingCount > 1 && r.pagingCount !== r.controlNav.length ? r.update(n, t) : v.controlNav.active()
				}
			},
			directionNav : {
				setup : function () {
					var t = e('<ul class="' + i + 'direction-nav"><li><a class="' + i + 'prev" href="#">' + r.vars.prevText + '</a></li><li><a class="' + i + 'next" href="#">' + r.vars.nextText + "</a></li></ul>");
					if (r.controlsContainer) {
						e(r.controlsContainer).append(t);
						r.directionNav = e("." + i + "direction-nav li a", r.controlsContainer)
					} else {
						r.append(t);
						r.directionNav = e("." + i + "direction-nav li a", r)
					}
					v.directionNav.update();
					r.directionNav.bind(u, function (t) {
						t.preventDefault();
						var n;
						if (a === "" || a === t.type) {
							n = e(this).hasClass(i + "next") ? r.getTarget("next") : r.getTarget("prev");
							r.flexAnimate(n, r.vars.pauseOnAction)
						}
						a === "" && (a = t.type);
						v.setToClearWatchedEvent()
					})
				},
				update : function () {
					var e = i + "disabled";
					r.pagingCount === 1 ? r.directionNav.addClass(e).attr("tabindex", "-1") : r.vars.animationLoop ? r.directionNav.removeClass(e).removeAttr("tabindex") : r.animatingTo === 0 ? r.directionNav.removeClass(e).filter("." + i + "prev").addClass(e).attr("tabindex", "-1") : r.animatingTo === r.last ? r.directionNav.removeClass(e).filter("." + i + "next").addClass(e).attr("tabindex", "-1") : r.directionNav.removeClass(e).removeAttr("tabindex")
				}
			},
			pausePlay : {
				setup : function () {
					var t = e('<div class="' + i + 'pauseplay"><a></a></div>');
					if (r.controlsContainer) {
						r.controlsContainer.append(t);
						r.pausePlay = e("." + i + "pauseplay a", r.controlsContainer)
					} else {
						r.append(t);
						r.pausePlay = e("." + i + "pauseplay a", r)
					}
					v.pausePlay.update(r.vars.slideshow ? i + "pause" : i + "play");
					r.pausePlay.bind(u, function (t) {
						t.preventDefault();
						if (a === "" || a === t.type)
							if (e(this).hasClass(i + "pause")) {
								r.manualPause = !0;
								r.manualPlay = !1;
								r.pause()
							} else {
								r.manualPause = !1;
								r.manualPlay = !0;
								r.play()
							}
						a === "" && (a = t.type);
						v.setToClearWatchedEvent()
					})
				},
				update : function (e) {
					e === "play" ? r.pausePlay.removeClass(i + "pause").addClass(i + "play").html(r.vars.playText) : r.pausePlay.removeClass(i + "play").addClass(i + "pause").html(r.vars.pauseText)
				}
			},
			touch : function () {
				var e,
				n,
				i,
				o,
				u,
				a,
				f = !1,
				d = 0,
				v = 0,
				m = 0;
				if (!s) {
					t.addEventListener("touchstart", g, !1);
					function g(s) {
						if (r.animating)
							s.preventDefault();
						else if (window.navigator.msPointerEnabled || s.touches.length === 1) {
							r.pause();
							o = l ? r.h : r.w;
							a = Number(new Date);
							d = s.touches[0].pageX;
							v = s.touches[0].pageY;
							i = h && c && r.animatingTo === r.last ? 0 : h && c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : h && r.currentSlide === r.last ? r.limit : h ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : c ? (r.last - r.currentSlide + r.cloneOffset) * o : (r.currentSlide + r.cloneOffset) * o;
							e = l ? v : d;
							n = l ? d : v;
							t.addEventListener("touchmove", y, !1);
							t.addEventListener("touchend", b, !1)
						}
					}
					function y(t) {
						d = t.touches[0].pageX;
						v = t.touches[0].pageY;
						u = l ? e - v : e - d;
						f = l ? Math.abs(u) < Math.abs(d - n) : Math.abs(u) < Math.abs(v - n);
						var s = 500;
						if (!f || Number(new Date) - a > s) {
							t.preventDefault();
							if (!p && r.transitions) {
								r.vars.animationLoop || (u /= r.currentSlide === 0 && u < 0 || r.currentSlide === r.last && u > 0 ? Math.abs(u) / o + 2 : 1);
								r.setProps(i + u, "setTouch")
							}
						}
					}
					function b(s) {
						t.removeEventListener("touchmove", y, !1);
						if (r.animatingTo === r.currentSlide && !f && u !== null) {
							var l = c ? -u : u,
							h = l > 0 ? r.getTarget("next") : r.getTarget("prev");
							r.canAdvance(h) && (Number(new Date) - a < 550 && Math.abs(l) > 50 || Math.abs(l) > o / 2) ? r.flexAnimate(h, r.vars.pauseOnAction) : p || r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0)
						}
						t.removeEventListener("touchend", b, !1);
						e = null;
						n = null;
						u = null;
						i = null
					}
				} else {
					t.style.msTouchAction = "none";
					t._gesture = new MSGesture;
					t._gesture.target = t;
					t.addEventListener("MSPointerDown", w, !1);
					t._slider = r;
					t.addEventListener("MSGestureChange", E, !1);
					t.addEventListener("MSGestureEnd", S, !1);
					function w(e) {
						e.stopPropagation();
						if (r.animating)
							e.preventDefault();
						else {
							r.pause();
							t._gesture.addPointer(e.pointerId);
							m = 0;
							o = l ? r.h : r.w;
							a = Number(new Date);
							i = h && c && r.animatingTo === r.last ? 0 : h && c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : h && r.currentSlide === r.last ? r.limit : h ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : c ? (r.last - r.currentSlide + r.cloneOffset) * o : (r.currentSlide + r.cloneOffset) * o
						}
					}
					function E(e) {
						e.stopPropagation();
						var n = e.target._slider;
						if (!n)
							return;
						var r = -e.translationX,
						s = -e.translationY;
						m += l ? s : r;
						u = m;
						f = l ? Math.abs(m) < Math.abs(-r) : Math.abs(m) < Math.abs(-s);
						if (e.detail === e.MSGESTURE_FLAG_INERTIA) {
							setImmediate(function () {
								t._gesture.stop()
							});
							return
						}
						if (!f || Number(new Date) - a > 500) {
							e.preventDefault();
							if (!p && n.transitions) {
								n.vars.animationLoop || (u = m / (n.currentSlide === 0 && m < 0 || n.currentSlide === n.last && m > 0 ? Math.abs(m) / o + 2 : 1));
								n.setProps(i + u, "setTouch")
							}
						}
					}
					function S(t) {
						t.stopPropagation();
						var r = t.target._slider;
						if (!r)
							return;
						if (r.animatingTo === r.currentSlide && !f && u !== null) {
							var s = c ? -u : u,
							l = s > 0 ? r.getTarget("next") : r.getTarget("prev");
							r.canAdvance(l) && (Number(new Date) - a < 550 && Math.abs(s) > 50 || Math.abs(s) > o / 2) ? r.flexAnimate(l, r.vars.pauseOnAction) : p || r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0)
						}
						e = null;
						n = null;
						u = null;
						i = null;
						m = 0
					}
				}
			},
			resize : function () {
				if (!r.animating && r.is(":visible")) {
					h || r.doMath();
					if (p)
						v.smoothHeight();
					else if (h) {
						r.slides.width(r.computedW);
						r.update(r.pagingCount);
						r.setProps()
					} else if (l) {
						r.viewport.height(r.h);
						r.setProps(r.h, "setTotal")
					} else {
						r.vars.smoothHeight && v.smoothHeight();
						r.newSlides.width(r.computedW);
						r.setProps(r.computedW, "setTotal")
					}
				}
			},
			smoothHeight : function (e) {
				if (!l || p) {
					var t = p ? r : r.viewport;
					e ? t.animate({
						height : r.slides.eq(r.animatingTo).height()
					}, e) : t.height(r.slides.eq(r.animatingTo).height())
				}
			},
			sync : function (t) {
				var n = e(r.vars.sync).data("flexslider"),
				i = r.animatingTo;
				switch (t) {
				case "animate":
					n.flexAnimate(i, r.vars.pauseOnAction, !1, !0);
					break;
				case "play":
					!n.playing && !n.asNav && n.play();
					break;
				case "pause":
					n.pause()
				}
			},
			pauseInvisible : {
				visProp : null,
				init : function () {
					var e = ["webkit", "moz", "ms", "o"];
					if ("hidden" in document)
						return "hidden";
					for (var t = 0; t < e.length; t++)
						e[t] + "Hidden" in document && (v.pauseInvisible.visProp = e[t] + "Hidden");
					if (v.pauseInvisible.visProp) {
						var n = v.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
						document.addEventListener(n, function () {
							v.pauseInvisible.isHidden() ? r.startTimeout ? clearTimeout(r.startTimeout) : r.pause() : r.started ? r.play() : r.vars.initDelay > 0 ? setTimeout(r.play, r.vars.initDelay) : r.play()
						})
					}
				},
				isHidden : function () {
					return document[v.pauseInvisible.visProp] || !1
				}
			},
			setToClearWatchedEvent : function () {
				clearTimeout(f);
				f = setTimeout(function () {
						a = ""
					}, 3e3)
			}
		};
		r.flexAnimate = function (t, n, s, u, a) {
			!r.vars.animationLoop && t !== r.currentSlide && (r.direction = t > r.currentSlide ? "next" : "prev");
			d && r.pagingCount === 1 && (r.direction = r.currentItem < t ? "next" : "prev");
			if (!r.animating && (r.canAdvance(t, a) || s) && r.is(":visible")) {
				if (d && u) {
					var f = e(r.vars.asNavFor).data("flexslider");
					r.atEnd = t === 0 || t === r.count - 1;
					f.flexAnimate(t, !0, !1, !0, a);
					r.direction = r.currentItem < t ? "next" : "prev";
					f.direction = r.direction;
					if (Math.ceil((t + 1) / r.visible) - 1 === r.currentSlide || t === 0) {
						r.currentItem = t;
						r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide");
						return !1
					}
					r.currentItem = t;
					r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide");
					t = Math.floor(t / r.visible)
				}
				r.animating = !0;
				r.animatingTo = t;
				n && r.pause();
				r.vars.before(r);
				r.syncExists && !a && v.sync("animate");
				r.vars.controlNav && v.controlNav.active();
				h || r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide");
				r.atEnd = t === 0 || t === r.last;
				r.vars.directionNav && v.directionNav.update();
				if (t === r.last) {
					r.vars.end(r);
					r.vars.animationLoop || r.pause()
				}
				if (!p) {
					var m = l ? r.slides.filter(":first").height() : r.computedW,
					g,
					y,
					b;
					if (h) {
						g = r.vars.itemMargin;
						b = (r.itemW + g) * r.move * r.animatingTo;
						y = b > r.limit && r.visible !== 1 ? r.limit : b
					} else
						r.currentSlide === 0 && t === r.count - 1 && r.vars.animationLoop && r.direction !== "next" ? y = c ? (r.count + r.cloneOffset) * m : 0 : r.currentSlide === r.last && t === 0 && r.vars.animationLoop && r.direction !== "prev" ? y = c ? 0 : (r.count + 1) * m : y = c ? (r.count - 1 - t + r.cloneOffset) * m : (t + r.cloneOffset) * m;
					r.setProps(y, "", r.vars.animationSpeed);
					if (r.transitions) {
						if (!r.vars.animationLoop || !r.atEnd) {
							r.animating = !1;
							r.currentSlide = r.animatingTo
						}
						r.container.unbind("webkitTransitionEnd transitionend");
						r.container.bind("webkitTransitionEnd transitionend", function () {
							r.wrapup(m)
						})
					} else
						r.container.animate(r.args, r.vars.animationSpeed, r.vars.easing, function () {
							r.wrapup(m)
						})
				} else if (!o) {
					r.slides.eq(r.currentSlide).css({
						zIndex : 1
					}).animate({
						opacity : 0
					}, r.vars.animationSpeed, r.vars.easing);
					r.slides.eq(t).css({
						zIndex : 2
					}).animate({
						opacity : 1
					}, r.vars.animationSpeed, r.vars.easing, r.wrapup)
				} else {
					r.slides.eq(r.currentSlide).css({
						opacity : 0,
						zIndex : 1
					});
					r.slides.eq(t).css({
						opacity : 1,
						zIndex : 2
					});
					r.wrapup(m)
				}
				r.vars.smoothHeight && v.smoothHeight(r.vars.animationSpeed)
			}
		};
		r.wrapup = function (e) {
			!p && !h && (r.currentSlide === 0 && r.animatingTo === r.last && r.vars.animationLoop ? r.setProps(e, "jumpEnd") : r.currentSlide === r.last && r.animatingTo === 0 && r.vars.animationLoop && r.setProps(e, "jumpStart"));
			r.animating = !1;
			r.currentSlide = r.animatingTo;
			r.vars.after(r)
		};
		r.animateSlides = function () {
			!r.animating && m && r.flexAnimate(r.getTarget("next"))
		};
		r.pause = function () {
			clearInterval(r.animatedSlides);
			r.animatedSlides = null;
			r.playing = !1;
			r.vars.pausePlay && v.pausePlay.update("play");
			r.syncExists && v.sync("pause")
		};
		r.play = function () {
			r.playing && clearInterval(r.animatedSlides);
			r.animatedSlides = r.animatedSlides || setInterval(r.animateSlides, r.vars.slideshowSpeed);
			r.started = r.playing = !0;
			r.vars.pausePlay && v.pausePlay.update("pause");
			r.syncExists && v.sync("play")
		};
		r.stop = function () {
			r.pause();
			r.stopped = !0
		};
		r.canAdvance = function (e, t) {
			var n = d ? r.pagingCount - 1 : r.last;
			return t ? !0 : d && r.currentItem === r.count - 1 && e === 0 && r.direction === "prev" ? !0 : d && r.currentItem === 0 && e === r.pagingCount - 1 && r.direction !== "next" ? !1 : e === r.currentSlide && !d ? !1 : r.vars.animationLoop ? !0 : r.atEnd && r.currentSlide === 0 && e === n && r.direction !== "next" ? !1 : r.atEnd && r.currentSlide === n && e === 0 && r.direction === "next" ? !1 : !0
		};
		r.getTarget = function (e) {
			r.direction = e;
			return e === "next" ? r.currentSlide === r.last ? 0 : r.currentSlide + 1 : r.currentSlide === 0 ? r.last : r.currentSlide - 1
		};
		r.setProps = function (e, t, n) {
			var i = function () {
				var n = e ? e : (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo,
				i = function () {
					if (h)
						return t === "setTouch" ? e : c && r.animatingTo === r.last ? 0 : c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : r.animatingTo === r.last ? r.limit : n;
					switch (t) {
					case "setTotal":
						return c ? (r.count - 1 - r.currentSlide + r.cloneOffset) * e : (r.currentSlide + r.cloneOffset) * e;
					case "setTouch":
						return c ? e : e;
					case "jumpEnd":
						return c ? e : r.count * e;
					case "jumpStart":
						return c ? r.count * e : e;
					default:
						return e
					}
				}
				();
				return i * -1 + "px"
			}
			();
			if (r.transitions) {
				i = l ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)";
				n = n !== undefined ? n / 1e3 + "s" : "0s";
				r.container.css("-" + r.pfx + "-transition-duration", n)
			}
			r.args[r.prop] = i;
			(r.transitions || n === undefined) && r.container.css(r.args)
		};
		r.setup = function (t) {
			if (!p) {
				var n,
				s;
				if (t === "init") {
					r.viewport = e('<div class="' + i + 'viewport"></div>').css({
							overflow : "hidden",
							position : "relative"
						}).appendTo(r).append(r.container);
					r.cloneCount = 0;
					r.cloneOffset = 0;
					if (c) {
						s = e.makeArray(r.slides).reverse();
						r.slides = e(s);
						r.container.empty().append(r.slides)
					}
				}
				if (r.vars.animationLoop && !h) {
					r.cloneCount = 2;
					r.cloneOffset = 1;
					t !== "init" && r.container.find(".clone").remove();
					r.container.append(r.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).prepend(r.slides.last().clone().addClass("clone").attr("aria-hidden", "true"))
				}
				r.newSlides = e(r.vars.selector, r);
				n = c ? r.count - 1 - r.currentSlide + r.cloneOffset : r.currentSlide + r.cloneOffset;
				if (l && !h) {
					r.container.height((r.count + r.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
					setTimeout(function () {
						r.newSlides.css({
							display : "block"
						});
						r.doMath();
						r.viewport.height(r.h);
						r.setProps(n * r.h, "init")
					}, t === "init" ? 100 : 0)
				} else {
					r.container.width((r.count + r.cloneCount) * 200 + "%");
					r.setProps(n * r.computedW, "init");
					setTimeout(function () {
						r.doMath();
						r.newSlides.css({
							width : r.computedW,
							"float" : "left",
							display : "block"
						});
						r.vars.smoothHeight && v.smoothHeight()
					}, t === "init" ? 100 : 0)
				}
			} else {
				r.slides.css({
					width : "100%",
					"float" : "left",
					marginRight : "-100%",
					position : "relative"
				});
				t === "init" && (o ? r.slides.css({
						opacity : 0,
						display : "block",
						webkitTransition : "opacity " + r.vars.animationSpeed / 1e3 + "s ease",
						zIndex : 1
					}).eq(r.currentSlide).css({
						opacity : 1,
						zIndex : 2
					}) : r.slides.css({
						opacity : 0,
						display : "block",
						zIndex : 1
					}).eq(r.currentSlide).css({
						zIndex : 2
					}).animate({
						opacity : 1
					}, r.vars.animationSpeed, r.vars.easing));
				r.vars.smoothHeight && v.smoothHeight()
			}
			h || r.slides.removeClass(i + "active-slide").eq(r.currentSlide).addClass(i + "active-slide")
		};
		r.doMath = function () {
			var e = r.slides.first(),
			t = r.vars.itemMargin,
			n = r.vars.minItems,
			i = r.vars.maxItems;
			r.w = r.viewport === undefined ? r.width() : r.viewport.width();
			r.h = e.height();
			r.boxPadding = e.outerWidth() - e.width();
			if (h) {
				r.itemT = r.vars.itemWidth + t;
				r.minW = n ? n * r.itemT : r.w;
				r.maxW = i ? i * r.itemT - t : r.w;
				r.itemW = r.minW > r.w ? (r.w - t * (n - 1)) / n : r.maxW < r.w ? (r.w - t * (i - 1)) / i : r.vars.itemWidth > r.w ? r.w : r.vars.itemWidth;
				r.visible = Math.floor(r.w / r.itemW);
				r.move = r.vars.move > 0 && r.vars.move < r.visible ? r.vars.move : r.visible;
				r.pagingCount = Math.ceil((r.count - r.visible) / r.move + 1);
				r.last = r.pagingCount - 1;
				r.limit = r.pagingCount === 1 ? 0 : r.vars.itemWidth > r.w ? r.itemW * (r.count - 1) + t * (r.count - 1) : (r.itemW + t) * r.count - r.w - t
			} else {
				r.itemW = r.w;
				r.pagingCount = r.count;
				r.last = r.count - 1
			}
			r.computedW = r.itemW - r.boxPadding
		};
		r.update = function (e, t) {
			r.doMath();
			if (!h) {
				e < r.currentSlide ? r.currentSlide += 1 : e <= r.currentSlide && e !== 0 && (r.currentSlide -= 1);
				r.animatingTo = r.currentSlide
			}
			if (r.vars.controlNav && !r.manualControls)
				if (t === "add" && !h || r.pagingCount > r.controlNav.length)
					v.controlNav.update("add");
				else if (t === "remove" && !h || r.pagingCount < r.controlNav.length) {
					if (h && r.currentSlide > r.last) {
						r.currentSlide -= 1;
						r.animatingTo -= 1
					}
					v.controlNav.update("remove", r.last)
				}
			r.vars.directionNav && v.directionNav.update()
		};
		r.addSlide = function (t, n) {
			var i = e(t);
			r.count += 1;
			r.last = r.count - 1;
			l && c ? n !== undefined ? r.slides.eq(r.count - n).after(i) : r.container.prepend(i) : n !== undefined ? r.slides.eq(n).before(i) : r.container.append(i);
			r.update(n, "add");
			r.slides = e(r.vars.selector + ":not(.clone)", r);
			r.setup();
			r.vars.added(r)
		};
		r.removeSlide = function (t) {
			var n = isNaN(t) ? r.slides.index(e(t)) : t;
			r.count -= 1;
			r.last = r.count - 1;
			isNaN(t) ? e(t, r.slides).remove() : l && c ? r.slides.eq(r.last).remove() : r.slides.eq(t).remove();
			r.doMath();
			r.update(n, "remove");
			r.slides = e(r.vars.selector + ":not(.clone)", r);
			r.setup();
			r.vars.removed(r)
		};
		v.init()
	};
	e(window).blur(function (e) {
		focused = !1
	}).focus(function (e) {
		focused = !0
	});
	e.flexslider.defaults = {
		namespace : "flex-",
		selector : ".slides > li",
		animation : "fade",
		easing : "swing",
		direction : "horizontal",
		reverse : !1,
		animationLoop : !0,
		smoothHeight : !1,
		startAt : 0,
		slideshow : !0,
		slideshowSpeed : 7e3,
		animationSpeed : 600,
		initDelay : 0,
		randomize : !1,
		thumbCaptions : !1,
		pauseOnAction : !0,
		pauseOnHover : !1,
		pauseInvisible : !0,
		useCSS : !0,
		touch : !0,
		video : !1,
		controlNav : !0,
		directionNav : !0,
		prevText : "Previous",
		nextText : "Next",
		keyboard : !0,
		multipleKeyboard : !1,
		mousewheel : !1,
		pausePlay : !1,
		pauseText : "Pause",
		playText : "Play",
		controlsContainer : "",
		manualControls : "",
		sync : "",
		asNavFor : "",
		itemWidth : 0,
		itemMargin : 0,
		minItems : 1,
		maxItems : 0,
		move : 0,
		allowOneSlide : !0,
		start : function () {},
		before : function () {},
		after : function () {},
		end : function () {},
		added : function () {},
		removed : function () {}

	};
	e.fn.flexslider = function (t) {
		t === undefined && (t = {});
		if (typeof t == "object")
			return this.each(function () {
				var n = e(this),
				r = t.selector ? t.selector : ".slides > li",
				i = n.find(r);
				if (i.length === 1 && t.allowOneSlide === !0 || i.length === 0) {
					i.fadeIn(400);
					t.start && t.start(n)
				} else
					n.data("flexslider") === undefined && new e.flexslider(this, t)
			});
		var n = e(this).data("flexslider");
		switch (t) {
		case "play":
			n.play();
			break;
		case "pause":
			n.pause();
			break;
		case "stop":
			n.stop();
			break;
		case "next":
			n.flexAnimate(n.getTarget("next"), !0);
			break;
		case "prev":
		case "previous":
			n.flexAnimate(n.getTarget("prev"), !0);
			break;
		default:
			typeof t == "number" && n.flexAnimate(t, !0)
		}
	}
})(jQuery);

var shuffleArray = function (a) {
	var d = a.length,
	c,
	b;
	if (d === 0) {
		return false
	}
	while (--d) {
		c = Math.floor(Math.random() * (d + 1));
		b = a[d];
		a[d] = a[c];
		a[c] = b
	}
	return a
};
var getRandomInt = function (b, a) {
	return Math.floor(Math.random() * (a - b + 1)) + b
};

function changeimage() {
	setTimeout(function () {
		$(".thumbimage img").each(function () {
			$(this).removeAttr("style"),
			h = Number($(this).height()),
			w = Number($(this).width()),
			th = Number($(this).parents().height()),
			tw = Number($(this).parents().width()),
			new_w = w / h * th,
			new_h = th,
			left = $("#outer-wrapper").hasClass("rtl") ? "margin-right" : "margin-left",
			tw > new_w ? (new_w = tw, new_h = h / w * tw, margin_top =  - ((new_h - th) / 2), $(this).css("width", new_w + "px"), $(this).css("height", new_h + "px"), $(this).css("margin-top", margin_top + "px")) : (margin_left =  - ((new_w - tw) / 2), $(this).css("width", new_w + "px"), $(this).css("height", new_h + "px"), $(this).css(left, margin_left + "px"))
		})
	}, 1e3)
}
function createPostSummary(e, t, a) {
	var l,
	s,
	i,
	c = [],
	o = [],
	m = "",
	n = document,
	g = configSummary,
	r = n.getElementById(e).value,
	u = n.getElementById(t),
	p = a,
	h = jQuery("#" + e).parents(".post"),
	d = h.find(".post-title.entry-title a").text();
	if (null != (c = r.match(/src=(?:\"|\')?([^>]*[^\/].(?:jpg|bmp|gif|png))(?:\"|\')?/gi)))
		if (g.slideffect === !0 && c.length > 1) {
			for (var b = g.maxImage > c.length ? c.length : g.maxImage, f = 0; b > f; f++)
				m += '<li><div class="thumbimage imglatest"><a title="' + d + '" href="' + p + '"><img alt="' + d + '" src="' + c[f].replace("src=", "").replace(/"/g, "").replace(/'/g, "") + '"/></a></div></li>';
			s = '<div class="thumbimgslide"><div class="slideximg"><ul class="imgslide">' + m + "</ul></div></div>",
			setTimeout(function () {
				jQuery("#" + t + " .slideximg").flexslider({
					animation : "fade",
					selector : ".imgslide > li",
					slideshowSpeed : g.slideSpeed
				})
			}, 20)
		} else
			s = '<div class="thumbimage imglatest"><a class="thumbimgx" title="' + d + '" href="' + p + '"><img class="post-thumbnail" src="' + c[0].replace("src=", "").replace(/"/g, "").replace(/'/g, "") + '" alt="' + d + '">' + (-1 != c[0].indexOf("ytimg.googleusercontent.com") ? '<span class="youtubeplay"><i class="icon-youtube-play"></i></span>' : "") + "</a></div>";
	else if (null != (o = r.match(/(youtu.be\/|youtube.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&\"\'>]+)/gi))) {
		var v = o[0].match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
		v && 11 == v[7].length && (s = '<div class="thumbimage imglatest"><a class="thumbimgx" title="' + d + '" href="' + p + '"><img class="post-thumbnail" src="http://img.youtube.com/vi/' + v[7] + '/0.jpg" alt="' + d + '"><span class="youtubeplay"><i class="icon-youtube-play"></i></span></a></div>')
	} else
		s = '<div class="thumbimage imglatest"><a class="thumbimgx" title="' + d + '" href="' + p + '"><img class="post-thumbnail" src="' + Alldefaultconfig.BackupImage + '" alt="' + d + '"></a></div>';
	i = '<a target="_blank" title="Share to Facebook" class="facebook" href="http://www.facebook.com/share.php?u=' + encodeURIComponent(p) + "&t=" + encodeURIComponent(d) + '"><i class="icon-facebook"></i></a><a target="_blank" title="Share to Twitter" class="twitter" href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(d) + "&amp;url=" + encodeURIComponent(p) + '"><i class="icon-twitter"></i></a><a target="_blank" title="Share to Google Plus" class="google-plus" href="https://plus.google.com/share?url=' + encodeURIComponent(p) + '"><i class="icon-google-plus"></i></a>',
	l = r.replace(/<(.*?)>/g, "").replace(/[\n\r]+/g, " "),
	u.innerHTML = s + '<strong><a class="titlex" href="' + p + '">' + d + "</a></strong><p>" + l.substring(0, g.summaryLength) + '&hellip;</p><div class="socialpostshare">' + i + "</div>"
}

// JQuery easing 1.3
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
	def : "easeOutQuad",
	swing : function (e, f, a, h, g) {
		return jQuery.easing[jQuery.easing.def](e, f, a, h, g)
	},
	easeInQuad : function (e, f, a, h, g) {
		return h * (f /= g) * f + a
	},
	easeOutQuad : function (e, f, a, h, g) {
		return -h * (f /= g) * (f - 2) + a
	},
	easeInOutQuad : function (e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f + a
		}
		return -h / 2 * ((--f) * (f - 2) - 1) + a
	},
	easeInCubic : function (e, f, a, h, g) {
		return h * (f /= g) * f * f + a
	},
	easeOutCubic : function (e, f, a, h, g) {
		return h * ((f = f / g - 1) * f * f + 1) + a
	},
	easeInOutCubic : function (e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f * f + a
		}
		return h / 2 * ((f -= 2) * f * f + 2) + a
	},
	easeInQuart : function (e, f, a, h, g) {
		return h * (f /= g) * f * f * f + a
	},
	easeOutQuart : function (e, f, a, h, g) {
		return -h * ((f = f / g - 1) * f * f * f - 1) + a
	},
	easeInOutQuart : function (e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f * f * f + a
		}
		return -h / 2 * ((f -= 2) * f * f * f - 2) + a
	},
	easeInQuint : function (e, f, a, h, g) {
		return h * (f /= g) * f * f * f * f + a
	},
	easeOutQuint : function (e, f, a, h, g) {
		return h * ((f = f / g - 1) * f * f * f * f + 1) + a
	},
	easeInOutQuint : function (e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f * f * f * f + a
		}
		return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
	},
	easeInSine : function (e, f, a, h, g) {
		return -h * Math.cos(f / g * (Math.PI / 2)) + h + a
	},
	easeOutSine : function (e, f, a, h, g) {
		return h * Math.sin(f / g * (Math.PI / 2)) + a
	},
	easeInOutSine : function (e, f, a, h, g) {
		return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a
	},
	easeInExpo : function (e, f, a, h, g) {
		return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a
	},
	easeOutExpo : function (e, f, a, h, g) {
		return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
	},
	easeInOutExpo : function (e, f, a, h, g) {
		if (f == 0) {
			return a
		}
		if (f == g) {
			return a + h
		}
		if ((f /= g / 2) < 1) {
			return h / 2 * Math.pow(2, 10 * (f - 1)) + a
		}
		return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
	},
	easeInCirc : function (e, f, a, h, g) {
		return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a
	},
	easeOutCirc : function (e, f, a, h, g) {
		return h * Math.sqrt(1 - (f = f / g - 1) * f) + a
	},
	easeInOutCirc : function (e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a
		}
		return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a
	},
	easeInElastic : function (f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e
		}
		if ((h /= k) == 1) {
			return e + l
		}
		if (!j) {
			j = k * 0.3
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4
		} else {
			var i = j / (2 * Math.PI) * Math.asin(l / g)
		}
		return  - (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
	},
	easeOutElastic : function (f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e
		}
		if ((h /= k) == 1) {
			return e + l
		}
		if (!j) {
			j = k * 0.3
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4
		} else {
			var i = j / (2 * Math.PI) * Math.asin(l / g)
		}
		return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e
	},
	easeInOutElastic : function (f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e
		}
		if ((h /= k / 2) == 2) {
			return e + l
		}
		if (!j) {
			j = k * (0.3 * 1.5)
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4
		} else {
			var i = j / (2 * Math.PI) * Math.asin(l / g)
		}
		if (h < 1) {
			return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
		}
		return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e
	},
	easeInBack : function (e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158
		}
		return i * (f /= h) * f * ((g + 1) * f - g) + a
	},
	easeOutBack : function (e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158
		}
		return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
	},
	easeInOutBack : function (e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158
		}
		if ((f /= h / 2) < 1) {
			return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a
		}
		return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a
	},
	easeInBounce : function (e, f, a, h, g) {
		return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a
	},
	easeOutBounce : function (e, f, a, h, g) {
		if ((f /= g) < (1 / 2.75)) {
			return h * (7.5625 * f * f) + a
		} else {
			if (f < (2 / 2.75)) {
				return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a
			} else {
				if (f < (2.5 / 2.75)) {
					return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a
				} else {
					return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a
				}
			}
		}
	},
	easeInOutBounce : function (e, f, a, h, g) {
		if (f < g / 2) {
			return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a
		}
		return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a
	}
});

// hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
// @author Brian Cherne <brian(at)cherne(dot)net>
(function (a) {
	a.fn.hoverIntent = function (m, d, h) {
		var j = {
			interval : 100,
			sensitivity : 7,
			timeout : 0
		};
		if (typeof m === "object") {
			j = a.extend(j, m)
		} else {
			if (a.isFunction(d)) {
				j = a.extend(j, {
						over : m,
						out : d,
						selector : h
					})
			} else {
				j = a.extend(j, {
						over : m,
						out : m,
						selector : d
					})
			}
		}
		var l,
		k,
		g,
		f;
		var e = function (n) {
			l = n.pageX;
			k = n.pageY
		};
		var c = function (o, n) {
			n.hoverIntent_t = clearTimeout(n.hoverIntent_t);
			if ((Math.abs(g - l) + Math.abs(f - k)) < j.sensitivity) {
				a(n).off("mousemove.hoverIntent", e);
				n.hoverIntent_s = 1;
				return j.over.apply(n, [o])
			} else {
				g = l;
				f = k;
				n.hoverIntent_t = setTimeout(function () {
						c(o, n)
					}, j.interval)
			}
		};
		var i = function (o, n) {
			n.hoverIntent_t = clearTimeout(n.hoverIntent_t);
			n.hoverIntent_s = 0;
			return j.out.apply(n, [o])
		};
		var b = function (p) {
			var o = jQuery.extend({}, p);
			var n = this;
			if (n.hoverIntent_t) {
				n.hoverIntent_t = clearTimeout(n.hoverIntent_t)
			}
			if (p.type == "mouseenter") {
				g = o.pageX;
				f = o.pageY;
				a(n).on("mousemove.hoverIntent", e);
				if (n.hoverIntent_s != 1) {
					n.hoverIntent_t = setTimeout(function () {
							c(o, n)
						}, j.interval)
				}
			} else {
				a(n).off("mousemove.hoverIntent", e);
				if (n.hoverIntent_s == 1) {
					n.hoverIntent_t = setTimeout(function () {
							i(o, n)
						}, j.timeout)
				}
			}
		};
		return this.on({
			"mouseenter.hoverIntent" : b,
			"mouseleave.hoverIntent" : b
		}, j.selector)
	}
})(jQuery);

// Superfish v1.7.2 - jQuery menu widget
// Copyright (c) 2013 Joel Birch
(function (b) {
	var a = (function () {
		var p = {
			bcClass : "sf-breadcrumb",
			menuClass : "sf-js-enabled",
			anchorClass : "sf-with-ul",
			menuArrowClass : "sf-arrows"
		},
		f = /iPhone|iPad|iPod/i.test(navigator.userAgent),
		k = (function () {
			var c = document.documentElement.style;
			return ("behavior" in c && "fill" in c && /iemobile/i.test(navigator.userAgent))
		})(),
		d = (function () {
			if (f) {
				b(window).load(function () {
					b("body").children().on("click", b.noop)
				})
			}
		})(),
		m = function (s, t) {
			var c = p.menuClass;
			if (t.cssArrows) {
				c += " " + p.menuArrowClass
			}
			s.toggleClass(c)
		},
		r = function (c, s) {
			return c.find("li." + s.pathClass).slice(0, s.pathLevels).addClass(s.hoverClass + " " + p.bcClass).filter(function () {
				return (b(this).children("ul").hide().show().length)
			}).removeClass(s.pathClass)
		},
		n = function (c) {
			c.children("a").toggleClass(p.anchorClass)
		},
		g = function (c) {
			var s = c.css("ms-touch-action");
			s = (s === "pan-y") ? "auto" : "pan-y";
			c.css("ms-touch-action", s)
		},
		j = function (t, u) {
			var c = "li:has(ul)";
			if (b.fn.hoverIntent && !u.disableHI) {
				t.hoverIntent(l, h, c)
			} else {
				t.on("mouseenter.superfish", c, l).on("mouseleave.superfish", c, h)
			}
			var s = "MSPointerDown.superfish";
			if (!f) {
				s += " touchend.superfish"
			}
			if (k) {
				s += " mousedown.superfish"
			}
			t.on("focusin.superfish", "li", l).on("focusout.superfish", "li", h).on(s, "a", i)
		},
		i = function (t) {
			var s = b(this),
			c = s.siblings("ul");
			if (c.length > 0 && c.is(":hidden")) {
				s.one("click.superfish", false);
				if (t.type === "MSPointerDown") {
					s.trigger("focus")
				} else {
					b.proxy(l, s.parent("li"))()
				}
			}
		},
		l = function () {
			var c = b(this),
			s = o(c);
			clearTimeout(s.sfTimer);
			c.siblings().superfish("hide").end().superfish("show")
		},
		h = function () {
			var c = b(this),
			s = o(c);
			if (f) {
				b.proxy(q, c, s)()
			} else {
				clearTimeout(s.sfTimer);
				s.sfTimer = setTimeout(b.proxy(q, c, s), s.delay)
			}
		},
		q = function (c) {
			c.retainPath = (b.inArray(this[0], c.$path) > -1);
			this.superfish("hide");
			if (!this.parents("." + c.hoverClass).length) {
				c.onIdle.call(e(this));
				if (c.$path.length) {
					b.proxy(l, c.$path)()
				}
			}
		},
		e = function (c) {
			return c.closest("." + p.menuClass)
		},
		o = function (c) {
			return e(c).data("sf-options")
		};
		return {
			hide : function (s) {
				if (this.length) {
					var v = this,
					w = o(v);
					if (!w) {
						return this
					}
					var t = (w.retainPath === true) ? w.$path : "",
					c = v.find("li." + w.hoverClass).add(this).not(t).removeClass(w.hoverClass).children("ul"),
					u = w.speedOut;
					if (s) {
						c.show();
						u = 0
					}
					w.retainPath = false;
					w.onBeforeHide.call(c);
					c.stop(true, true).animate(w.animationOut, u, function () {
						var x = b(this);
						w.onHide.call(x)
					})
				}
				return this
			},
			show : function () {
				var t = o(this);
				if (!t) {
					return this
				}
				var s = this.addClass(t.hoverClass),
				c = s.children("ul");
				t.onBeforeShow.call(c);
				c.stop(true, true).animate(t.animation, t.speed, function () {
					t.onShow.call(c)
				});
				return this
			},
			destroy : function () {
				return this.each(function () {
					var s = b(this),
					t = s.data("sf-options"),
					c = s.find("li:has(ul)");
					if (!t) {
						return false
					}
					clearTimeout(t.sfTimer);
					m(s, t);
					n(c);
					g(s);
					s.off(".superfish").off(".hoverIntent");
					c.children("ul").attr("style", function (u, v) {
						return v.replace(/display[^;]+;?/g, "")
					});
					t.$path.removeClass(t.hoverClass + " " + p.bcClass).addClass(t.pathClass);
					s.find("." + t.hoverClass).removeClass(t.hoverClass);
					t.onDestroy.call(s);
					s.removeData("sf-options")
				})
			},
			init : function (c) {
				return this.each(function () {
					var t = b(this);
					if (t.data("sf-options")) {
						return false
					}
					var u = b.extend({}, b.fn.superfish.defaults, c),
					s = t.find("li:has(ul)");
					u.$path = r(t, u);
					t.data("sf-options", u);
					m(t, u);
					n(s);
					g(t);
					j(t, u);
					s.not("." + p.bcClass).superfish("hide", true);
					u.onInit.call(this)
				})
			}
		}
	})();
	b.fn.superfish = function (d, c) {
		if (a[d]) {
			return a[d].apply(this, Array.prototype.slice.call(arguments, 1))
		} else {
			if (typeof d === "object" || !d) {
				return a.init.apply(this, arguments)
			} else {
				return b.error("Method " + d + " does not exist on jQuery.fn.superfish")
			}
		}
	};
	b.fn.superfish.defaults = {
		hoverClass : "sfHover",
		pathClass : "overrideThisToUse",
		pathLevels : 1,
		delay : 800,
		animation : {
			opacity : "show"
		},
		animationOut : {
			opacity : "hide"
		},
		speed : "normal",
		speedOut : "fast",
		cssArrows : true,
		disableHI : false,
		onInit : b.noop,
		onBeforeShow : b.noop,
		onShow : b.noop,
		onBeforeHide : b.noop,
		onHide : b.noop,
		onIdle : b.noop,
		onDestroy : b.noop
	};
	b.fn.extend({
		hideSuperfishUl : a.hide,
		showSuperfishUl : a.show
	})
})(jQuery);

// JQUERY NEWS TICKER by Rhodimus
// http://github.com/rhodimus/jQuery-News-Ticker
(function (a) {
	a.fn.ticker = function (c) {
		var e = a.extend({}, a.fn.ticker.defaults, c);
		if (a(this).length == 0) {
			if (window.console && window.console.log) {
				window.console.log("Element does not exist in DOM!")
			} else {
				alert("Element does not exist in DOM!")
			}
			return false
		}
		var b = "#" + a(this).attr("id");
		var d = a(this).get(0).tagName;
		return this.each(function () {
			var g = o();
			var i = {
				position : 0,
				time : 0,
				distance : 0,
				newsArr : {},
				play : true,
				paused : false,
				contentLoaded : false,
				dom : {
					contentID : "#ticker-content-" + g,
					titleID : "#ticker-title-" + g,
					titleElem : "#ticker-title-" + g + " SPAN",
					tickerID : "#ticker-" + g,
					wrapperID : "#ticker-wrapper-" + g,
					revealID : "#ticker-swipe-" + g,
					revealElem : "#ticker-swipe-" + g + " SPAN",
					controlsID : "#ticker-controls-" + g,
					prevID : "#prev-" + g,
					nextID : "#next-" + g,
					playPauseID : "#play-pause-" + g
				}
			};
			if (d != "UL" && d != "OL" && e.htmlFeed === true) {
				q("Cannot use <" + d.toLowerCase() + "> type of element for this plugin - must of type <ul> or <ol>");
				return false
			}
			e.direction == "rtl" ? e.direction = "right" : e.direction = "left";
			f();
			function l(u) {
				var t = 0,
				s;
				for (s in u) {
					if (u.hasOwnProperty(s)) {
						t++
					}
				}
				return t
			}
			function o() {
				var s = new Date;
				return s.getTime()
			}
			function q(s) {
				if (e.debugMode) {
					if (window.console && window.console.log) {
						window.console.log(s)
					} else {
						alert(s)
					}
				}
			}
			function f() {
				m();
				a(b).wrap('<div id="' + i.dom.wrapperID.replace("#", "") + '"></div>');
				a(i.dom.wrapperID).children().remove();
				a(i.dom.wrapperID).append('<div id="' + i.dom.tickerID.replace("#", "") + '" class="ticker"><div id="' + i.dom.titleID.replace("#", "") + '" class="ticker-title"><span><!-- --></span></div><p id="' + i.dom.contentID.replace("#", "") + '" class="ticker-content"></p><div id="' + i.dom.revealID.replace("#", "") + '" class="ticker-swipe"><span><!-- --></span></div></div>');
				a(i.dom.wrapperID).removeClass("no-js").addClass("ticker-wrapper has-js " + e.direction);
				a(i.dom.tickerElem + "," + i.dom.contentID).hide();
				if (e.controls) {
					a(i.dom.controlsID).live("click mouseover mousedown mouseout mouseup", function (t) {
						var s = t.target.id;
						if (t.type == "click") {
							switch (s) {
							case i.dom.prevID.replace("#", ""):
								i.paused = true;
								a(i.dom.playPauseID).addClass("paused");
								n("prev");
								break;
							case i.dom.nextID.replace("#", ""):
								i.paused = true;
								a(i.dom.playPauseID).addClass("paused");
								n("next");
								break;
							case i.dom.playPauseID.replace("#", ""):
								if (i.play == true) {
									i.paused = true;
									a(i.dom.playPauseID).addClass("paused");
									j()
								} else {
									i.paused = false;
									a(i.dom.playPauseID).removeClass("paused");
									p()
								}
								break
							}
						} else {
							if (t.type == "mouseover" && a("#" + s).hasClass("controls")) {
								a("#" + s).addClass("over")
							} else {
								if (t.type == "mousedown" && a("#" + s).hasClass("controls")) {
									a("#" + s).addClass("down")
								} else {
									if (t.type == "mouseup" && a("#" + s).hasClass("controls")) {
										a("#" + s).removeClass("down")
									} else {
										if (t.type == "mouseout" && a("#" + s).hasClass("controls")) {
											a("#" + s).removeClass("over")
										}
									}
								}
							}
						}
					});
					a(i.dom.wrapperID).append('<ul id="' + i.dom.controlsID.replace("#", "") + '" class="ticker-controls"><li id="' + i.dom.playPauseID.replace("#", "") + '" class="jnt-play-pause controls"><a href=""><!-- --></a></li><li id="' + i.dom.prevID.replace("#", "") + '" class="jnt-prev controls"><a href=""><!-- --></a></li><li id="' + i.dom.nextID.replace("#", "") + '" class="jnt-next controls"><a href=""><!-- --></a></li></ul>')
				}
				if (e.displayType != "fade") {
					a(i.dom.contentID).mouseover(function () {
						if (i.paused == false) {
							j()
						}
					}).mouseout(function () {
						if (i.paused == false) {
							p()
						}
					})
				}
				if (!e.ajaxFeed) {
					r()
				}
			}
			function m() {
				if (i.contentLoaded == false) {
					if (e.ajaxFeed) {
						if (e.feedType == "xml") {
							a.ajax({
								url : e.feedUrl,
								cache : false,
								dataType : e.feedType,
								async : true,
								success : function (w) {
									count = 0;
									for (var t = 0; t < w.childNodes.length; t++) {
										if (w.childNodes[t].nodeName == "rss") {
											xmlContent = w.childNodes[t]
										}
									}
									for (var u = 0; u < xmlContent.childNodes.length; u++) {
										if (xmlContent.childNodes[u].nodeName == "channel") {
											xmlChannel = xmlContent.childNodes[u]
										}
									}
									for (var s = 0; s < xmlChannel.childNodes.length; s++) {
										if (xmlChannel.childNodes[s].nodeName == "item") {
											xmlItems = xmlChannel.childNodes[s];
											var z,
											v = false;
											for (var A = 0; A < xmlItems.childNodes.length; A++) {
												if (xmlItems.childNodes[A].nodeName == "title") {
													z = xmlItems.childNodes[A].lastChild.nodeValue
												} else {
													if (xmlItems.childNodes[A].nodeName == "link") {
														v = xmlItems.childNodes[A].lastChild.nodeValue
													}
												}
												if ((z !== false && z != "") && v !== false) {
													i.newsArr["item-" + count] = {
														type : e.titleText,
														content : '<a href="' + v + '">' + z + "</a>"
													};
													count++;
													z = false;
													v = false
												}
											}
										}
									}
									if (l(i.newsArr < 1)) {
										q("Couldn't find any content from the XML feed for the ticker to use!");
										return false
									}
									i.contentLoaded = true;
									r()
								}
							})
						} else {
							q("Code Me!")
						}
					} else {
						if (e.htmlFeed) {
							if (a(b + " LI").length > 0) {
								a(b + " LI").each(function (s) {
									i.newsArr["item-" + s] = {
										type : e.titleText,
										content : a(this).html()
									}
								})
							} else {
								q("Couldn't find HTML any content for the ticker to use!");
								return false
							}
						} else {
							q("The ticker is set to not use any types of content! Check the settings for the ticker.");
							return false
						}
					}
				}
			}
			function r() {
				i.contentLoaded = true;
				a(i.dom.titleElem).html(i.newsArr["item-" + i.position].type);
				a(i.dom.contentID).html(i.newsArr["item-" + i.position].content);
				if (i.position == (l(i.newsArr) - 1)) {
					i.position = 0
				} else {
					i.position++
				}
				distance = a(i.dom.contentID).width();
				time = distance / e.speed;
				h()
			}
			function h() {
				a(i.dom.contentID).css("opacity", "1");
				if (i.play) {
					var s = a(i.dom.titleID).width() + 20;
					a(i.dom.revealID).css(e.direction, s + "px");
					if (e.displayType == "fade") {
						a(i.dom.revealID).hide(0, function () {
							a(i.dom.contentID).css(e.direction, s + "px").fadeIn(e.fadeInSpeed, k)
						})
					} else {
						if (e.displayType == "scroll") {}
						else {
							a(i.dom.revealElem).show(0, function () {
								a(i.dom.contentID).css(e.direction, s + "px").show();
								animationAction = e.direction == "right" ? {
									marginRight : distance + "px"
								}
								 : {
									marginLeft : distance + "px"
								};
								a(i.dom.revealID).css("margin-" + e.direction, "0px").delay(20).animate(animationAction, time, "linear", k)
							})
						}
					}
				} else {
					return false
				}
			}
			function k() {
				if (i.play) {
					a(i.dom.contentID).delay(e.pauseOnItems).fadeOut(e.fadeOutSpeed);
					if (e.displayType == "fade") {
						a(i.dom.contentID).fadeOut(e.fadeOutSpeed, function () {
							a(i.dom.wrapperID).find(i.dom.revealElem + "," + i.dom.contentID).hide().end().find(i.dom.tickerID + "," + i.dom.revealID).show().end().find(i.dom.tickerID + "," + i.dom.revealID).removeAttr("style");
							r()
						})
					} else {
						a(i.dom.revealID).hide(0, function () {
							a(i.dom.contentID).fadeOut(e.fadeOutSpeed, function () {
								a(i.dom.wrapperID).find(i.dom.revealElem + "," + i.dom.contentID).hide().end().find(i.dom.tickerID + "," + i.dom.revealID).show().end().find(i.dom.tickerID + "," + i.dom.revealID).removeAttr("style");
								r()
							})
						})
					}
				} else {
					a(i.dom.revealElem).hide()
				}
			}
			function j() {
				i.play = false;
				a(i.dom.tickerID + "," + i.dom.revealID + "," + i.dom.titleID + "," + i.dom.titleElem + "," + i.dom.revealElem + "," + i.dom.contentID).stop(true, true);
				a(i.dom.revealID + "," + i.dom.revealElem).hide();
				a(i.dom.wrapperID).find(i.dom.titleID + "," + i.dom.titleElem).show().end().find(i.dom.contentID).show()
			}
			function p() {
				i.play = true;
				i.paused = false;
				k()
			}
			function n(s) {
				j();
				switch (s) {
				case "prev":
					if (i.position == 0) {
						i.position = l(i.newsArr) - 2
					} else {
						if (i.position == 1) {
							i.position = l(i.newsArr) - 1
						} else {
							i.position = i.position - 2
						}
					}
					a(i.dom.titleElem).html(i.newsArr["item-" + i.position].type);
					a(i.dom.contentID).html(i.newsArr["item-" + i.position].content);
					break;
				case "next":
					a(i.dom.titleElem).html(i.newsArr["item-" + i.position].type);
					a(i.dom.contentID).html(i.newsArr["item-" + i.position].content);
					break
				}
				if (i.position == (l(i.newsArr) - 1)) {
					i.position = 0
				} else {
					i.position++
				}
			}
		})
	};
	a.fn.ticker.defaults = {
		speed : 0.1,
		ajaxFeed : false,
		feedUrl : "",
		feedType : "xml",
		displayType : "reveal",
		htmlFeed : true,
		debugMode : true,
		controls : true,
		titleText : "Latest",
		direction : "ltr",
		pauseOnItems : 3000,
		fadeInSpeed : 600,
		fadeOutSpeed : 300
	}
})(jQuery);

//JS Cookie
function createCookie(c, d, e) {
	if (e) {
		var b = new Date();
		b.setTime(b.getTime() + (e * 24 * 60 * 60 * 1000));
		var a = "; expires=" + b.toGMTString()
	} else {
		var a = ""
	}
	document.cookie = c + "=" + d + a + "; path=/"
}
function readCookie(b) {
	var e = b + "=";
	var a = document.cookie.split(";");
	for (var d = 0; d < a.length; d++) {
		var f = a[d];
		while (f.charAt(0) == " ") {
			f = f.substring(1, f.length)
		}
		if (f.indexOf(e) == 0) {
			return f.substring(e.length, f.length)
		}
	}
	return null
}
function eraseCookie(a) {
	createCookie(a, "", -1)
};

/*
== malihu jquery custom scrollbars plugin ==
version: 2.8.2
author: malihu (http://manos.malihu.gr)
plugin home: http://manos.malihu.gr/jquery-custom-content-scroller
 */
(function (c) {
	var b = {
		init : function (e) {
			var f = {
				set_width : false,
				set_height : false,
				horizontalScroll : false,
				scrollInertia : 950,
				mouseWheel : true,
				mouseWheelPixels : "auto",
				autoDraggerLength : true,
				autoHideScrollbar : false,
				snapAmount : null,
				snapOffset : 0,
				scrollButtons : {
					enable : false,
					scrollType : "continuous",
					scrollSpeed : "auto",
					scrollAmount : 40
				},
				advanced : {
					updateOnBrowserResize : true,
					updateOnContentResize : false,
					autoExpandHorizontalScroll : false,
					autoScrollOnFocus : true,
					normalizeMouseWheelDelta : false
				},
				contentTouchScroll : true,
				callbacks : {
					onScrollStart : function () {},
					onScroll : function () {},
					onTotalScroll : function () {},
					onTotalScrollBack : function () {},
					onTotalScrollOffset : 0,
					onTotalScrollBackOffset : 0,
					whileScrolling : function () {}

				},
				theme : "light"
			},
			e = c.extend(true, f, e);
			return this.each(function () {
				var m = c(this);
				if (e.set_width) {
					m.css("width", e.set_width)
				}
				if (e.set_height) {
					m.css("height", e.set_height)
				}
				if (!c(document).data("mCustomScrollbar-index")) {
					c(document).data("mCustomScrollbar-index", "1")
				} else {
					var t = parseInt(c(document).data("mCustomScrollbar-index"));
					c(document).data("mCustomScrollbar-index", t + 1)
				}
				m.wrapInner("<div class='mCustomScrollBox mCS-" + e.theme + "' id='mCSB_" + c(document).data("mCustomScrollbar-index") + "' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_" + c(document).data("mCustomScrollbar-index"));
				var g = m.children(".mCustomScrollBox");
				if (e.horizontalScroll) {
					g.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");
					var k = g.children(".mCSB_h_wrapper");
					k.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({
						width : k.children().outerWidth(),
						position : "relative"
					}).unwrap()
				} else {
					g.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />")
				}
				var o = g.children(".mCSB_container");
				if (c.support.touch) {
					o.addClass("mCS_touch")
				}
				o.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");
				var l = g.children(".mCSB_scrollTools"),
				h = l.children(".mCSB_draggerContainer"),
				q = h.children(".mCSB_dragger");
				if (e.horizontalScroll) {
					q.data("minDraggerWidth", q.width())
				} else {
					q.data("minDraggerHeight", q.height())
				}
				if (e.scrollButtons.enable) {
					if (e.horizontalScroll) {
						l.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>")
					} else {
						l.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>")
					}
				}
				g.bind("scroll", function () {
					if (!m.is(".mCS_disabled")) {
						g.scrollTop(0).scrollLeft(0)
					}
				});
				m.data({
					mCS_Init : true,
					mCustomScrollbarIndex : c(document).data("mCustomScrollbar-index"),
					horizontalScroll : e.horizontalScroll,
					scrollInertia : e.scrollInertia,
					scrollEasing : "mcsEaseOut",
					mouseWheel : e.mouseWheel,
					mouseWheelPixels : e.mouseWheelPixels,
					autoDraggerLength : e.autoDraggerLength,
					autoHideScrollbar : e.autoHideScrollbar,
					snapAmount : e.snapAmount,
					snapOffset : e.snapOffset,
					scrollButtons_enable : e.scrollButtons.enable,
					scrollButtons_scrollType : e.scrollButtons.scrollType,
					scrollButtons_scrollSpeed : e.scrollButtons.scrollSpeed,
					scrollButtons_scrollAmount : e.scrollButtons.scrollAmount,
					autoExpandHorizontalScroll : e.advanced.autoExpandHorizontalScroll,
					autoScrollOnFocus : e.advanced.autoScrollOnFocus,
					normalizeMouseWheelDelta : e.advanced.normalizeMouseWheelDelta,
					contentTouchScroll : e.contentTouchScroll,
					onScrollStart_Callback : e.callbacks.onScrollStart,
					onScroll_Callback : e.callbacks.onScroll,
					onTotalScroll_Callback : e.callbacks.onTotalScroll,
					onTotalScrollBack_Callback : e.callbacks.onTotalScrollBack,
					onTotalScroll_Offset : e.callbacks.onTotalScrollOffset,
					onTotalScrollBack_Offset : e.callbacks.onTotalScrollBackOffset,
					whileScrolling_Callback : e.callbacks.whileScrolling,
					bindEvent_scrollbar_drag : false,
					bindEvent_content_touch : false,
					bindEvent_scrollbar_click : false,
					bindEvent_mousewheel : false,
					bindEvent_buttonsContinuous_y : false,
					bindEvent_buttonsContinuous_x : false,
					bindEvent_buttonsPixels_y : false,
					bindEvent_buttonsPixels_x : false,
					bindEvent_focusin : false,
					bindEvent_autoHideScrollbar : false,
					mCSB_buttonScrollRight : false,
					mCSB_buttonScrollLeft : false,
					mCSB_buttonScrollDown : false,
					mCSB_buttonScrollUp : false
				});
				if (e.horizontalScroll) {
					if (m.css("max-width") !== "none") {
						if (!e.advanced.updateOnContentResize) {
							e.advanced.updateOnContentResize = true
						}
					}
				} else {
					if (m.css("max-height") !== "none") {
						var s = false,
						r = parseInt(m.css("max-height"));
						if (m.css("max-height").indexOf("%") >= 0) {
							s = r,
							r = m.parent().height() * s / 100
						}
						m.css("overflow", "hidden");
						g.css("max-height", r)
					}
				}
				m.mCustomScrollbar("update");
				if (e.advanced.updateOnBrowserResize) {
					var i,
					j = c(window).width(),
					u = c(window).height();
					c(window).bind("resize." + m.data("mCustomScrollbarIndex"), function () {
						if (i) {
							clearTimeout(i)
						}
						i = setTimeout(function () {
								if (!m.is(".mCS_disabled") && !m.is(".mCS_destroyed")) {
									var w = c(window).width(),
									v = c(window).height();
									if (j !== w || u !== v) {
										if (m.css("max-height") !== "none" && s) {
											g.css("max-height", m.parent().height() * s / 100)
										}
										m.mCustomScrollbar("update");
										j = w;
										u = v
									}
								}
							}, 150)
					})
				}
				if (e.advanced.updateOnContentResize) {
					var p;
					if (e.horizontalScroll) {
						var n = o.outerWidth()
					} else {
						var n = o.outerHeight()
					}
					p = setInterval(function () {
							if (e.horizontalScroll) {
								if (e.advanced.autoExpandHorizontalScroll) {
									o.css({
										position : "absolute",
										width : "auto"
									}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
										width : o.outerWidth(),
										position : "relative"
									}).unwrap()
								}
								var v = o.outerWidth()
							} else {
								var v = o.outerHeight()
							}
							if (v != n) {
								m.mCustomScrollbar("update");
								n = v
							}
						}, 300)
				}
			})
		},
		update : function () {
			var n = c(this),
			k = n.children(".mCustomScrollBox"),
			q = k.children(".mCSB_container");
			q.removeClass("mCS_no_scrollbar");
			n.removeClass("mCS_disabled mCS_destroyed");
			k.scrollTop(0).scrollLeft(0);
			var y = k.children(".mCSB_scrollTools"),
			o = y.children(".mCSB_draggerContainer"),
			m = o.children(".mCSB_dragger");
			if (n.data("horizontalScroll")) {
				var A = y.children(".mCSB_buttonLeft"),
				t = y.children(".mCSB_buttonRight"),
				f = k.width();
				if (n.data("autoExpandHorizontalScroll")) {
					q.css({
						position : "absolute",
						width : "auto"
					}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
						width : q.outerWidth(),
						position : "relative"
					}).unwrap()
				}
				var z = q.outerWidth()
			} else {
				var w = y.children(".mCSB_buttonUp"),
				g = y.children(".mCSB_buttonDown"),
				r = k.height(),
				i = q.outerHeight()
			}
			if (i > r && !n.data("horizontalScroll")) {
				y.css("display", "block");
				var s = o.height();
				if (n.data("autoDraggerLength")) {
					var u = Math.round(r / i * s),
					l = m.data("minDraggerHeight");
					if (u <= l) {
						m.css({
							height : l
						})
					} else {
						if (u >= s - 10) {
							var p = s - 10;
							m.css({
								height : p
							})
						} else {
							m.css({
								height : u
							})
						}
					}
					m.children(".mCSB_dragger_bar").css({
						"line-height" : m.height() + "px"
					})
				}
				var B = m.height(),
				x = (i - r) / (s - B);
				n.data("scrollAmount", x).mCustomScrollbar("scrolling", k, q, o, m, w, g, A, t);
				var D = Math.abs(q.position().top);
				n.mCustomScrollbar("scrollTo", D, {
					scrollInertia : 0,
					trigger : "internal"
				})
			} else {
				if (z > f && n.data("horizontalScroll")) {
					y.css("display", "block");
					var h = o.width();
					if (n.data("autoDraggerLength")) {
						var j = Math.round(f / z * h),
						C = m.data("minDraggerWidth");
						if (j <= C) {
							m.css({
								width : C
							})
						} else {
							if (j >= h - 10) {
								var e = h - 10;
								m.css({
									width : e
								})
							} else {
								m.css({
									width : j
								})
							}
						}
					}
					var v = m.width(),
					x = (z - f) / (h - v);
					n.data("scrollAmount", x).mCustomScrollbar("scrolling", k, q, o, m, w, g, A, t);
					var D = Math.abs(q.position().left);
					n.mCustomScrollbar("scrollTo", D, {
						scrollInertia : 0,
						trigger : "internal"
					})
				} else {
					k.unbind("mousewheel focusin");
					if (n.data("horizontalScroll")) {
						m.add(q).css("left", 0)
					} else {
						m.add(q).css("top", 0)
					}
					y.css("display", "none");
					q.addClass("mCS_no_scrollbar");
					n.data({
						bindEvent_mousewheel : false,
						bindEvent_focusin : false
					})
				}
			}
		},
		scrolling : function (h, p, m, j, w, e, A, v) {
			var k = c(this);
			if (!k.data("bindEvent_scrollbar_drag")) {
				var n,
				o;
				if (c.support.msPointer) {
					j.bind("MSPointerDown", function (H) {
						H.preventDefault();
						k.data({
							on_drag : true
						});
						j.addClass("mCSB_dragger_onDrag");
						var G = c(this),
						J = G.offset(),
						F = H.originalEvent.pageX - J.left,
						I = H.originalEvent.pageY - J.top;
						if (F < G.width() && F > 0 && I < G.height() && I > 0) {
							n = I;
							o = F
						}
					});
					c(document).bind("MSPointerMove." + k.data("mCustomScrollbarIndex"), function (H) {
						H.preventDefault();
						if (k.data("on_drag")) {
							var G = j,
							J = G.offset(),
							F = H.originalEvent.pageX - J.left,
							I = H.originalEvent.pageY - J.top;
							D(n, o, I, F)
						}
					}).bind("MSPointerUp." + k.data("mCustomScrollbarIndex"), function (x) {
						k.data({
							on_drag : false
						});
						j.removeClass("mCSB_dragger_onDrag")
					})
				} else {
					j.bind("mousedown touchstart", function (H) {
						H.preventDefault();
						H.stopImmediatePropagation();
						var G = c(this),
						K = G.offset(),
						F,
						J;
						if (H.type === "touchstart") {
							var I = H.originalEvent.touches[0] || H.originalEvent.changedTouches[0];
							F = I.pageX - K.left;
							J = I.pageY - K.top
						} else {
							k.data({
								on_drag : true
							});
							j.addClass("mCSB_dragger_onDrag");
							F = H.pageX - K.left;
							J = H.pageY - K.top
						}
						if (F < G.width() && F > 0 && J < G.height() && J > 0) {
							n = J;
							o = F
						}
					}).bind("touchmove", function (H) {
						H.preventDefault();
						H.stopImmediatePropagation();
						var K = H.originalEvent.touches[0] || H.originalEvent.changedTouches[0],
						G = c(this),
						J = G.offset(),
						F = K.pageX - J.left,
						I = K.pageY - J.top;
						D(n, o, I, F)
					});
					c(document).bind("mousemove." + k.data("mCustomScrollbarIndex"), function (H) {
						if (k.data("on_drag")) {
							var G = j,
							J = G.offset(),
							F = H.pageX - J.left,
							I = H.pageY - J.top;
							D(n, o, I, F)
						}
					}).bind("mouseup." + k.data("mCustomScrollbarIndex"), function (x) {
						k.data({
							on_drag : false
						});
						j.removeClass("mCSB_dragger_onDrag")
					})
				}
				k.data({
					bindEvent_scrollbar_drag : true
				})
			}
			function D(G, H, I, F) {
				if (k.data("horizontalScroll")) {
					k.mCustomScrollbar("scrollTo", (j.position().left - (H)) + F, {
						moveDragger : true,
						trigger : "internal"
					})
				} else {
					k.mCustomScrollbar("scrollTo", (j.position().top - (G)) + I, {
						moveDragger : true,
						trigger : "internal"
					})
				}
			}
			if (c.support.touch && k.data("contentTouchScroll")) {
				if (!k.data("bindEvent_content_touch")) {
					var l,
					B,
					r,
					s,
					u,
					C,
					E;
					p.bind("touchstart", function (x) {
						x.stopImmediatePropagation();
						l = x.originalEvent.touches[0] || x.originalEvent.changedTouches[0];
						B = c(this);
						r = B.offset();
						u = l.pageX - r.left;
						s = l.pageY - r.top;
						C = s;
						E = u
					});
					p.bind("touchmove", function (x) {
						x.preventDefault();
						x.stopImmediatePropagation();
						l = x.originalEvent.touches[0] || x.originalEvent.changedTouches[0];
						B = c(this).parent();
						r = B.offset();
						u = l.pageX - r.left;
						s = l.pageY - r.top;
						if (k.data("horizontalScroll")) {
							k.mCustomScrollbar("scrollTo", E - u, {
								trigger : "internal"
							})
						} else {
							k.mCustomScrollbar("scrollTo", C - s, {
								trigger : "internal"
							})
						}
					})
				}
			}
			if (!k.data("bindEvent_scrollbar_click")) {
				m.bind("click", function (F) {
					var x = (F.pageY - m.offset().top) * k.data("scrollAmount"),
					y = c(F.target);
					if (k.data("horizontalScroll")) {
						x = (F.pageX - m.offset().left) * k.data("scrollAmount")
					}
					if (y.hasClass("mCSB_draggerContainer") || y.hasClass("mCSB_draggerRail")) {
						k.mCustomScrollbar("scrollTo", x, {
							trigger : "internal",
							scrollEasing : "draggerRailEase"
						})
					}
				});
				k.data({
					bindEvent_scrollbar_click : true
				})
			}
			if (k.data("mouseWheel")) {
				if (!k.data("bindEvent_mousewheel")) {
					h.bind("mousewheel", function (H, J) {
						var G,
						F = k.data("mouseWheelPixels"),
						x = Math.abs(p.position().top),
						I = j.position().top,
						y = m.height() - j.height();
						if (k.data("normalizeMouseWheelDelta")) {
							if (J < 0) {
								J = -1
							} else {
								J = 1
							}
						}
						if (F === "auto") {
							F = 100 + Math.round(k.data("scrollAmount") / 2)
						}
						if (k.data("horizontalScroll")) {
							I = j.position().left;
							y = m.width() - j.width();
							x = Math.abs(p.position().left)
						}
						if ((J > 0 && I !== 0) || (J < 0 && I !== y)) {
							H.preventDefault();
							H.stopImmediatePropagation()
						}
						G = x - (J * F);
						k.mCustomScrollbar("scrollTo", G, {
							trigger : "internal"
						})
					});
					k.data({
						bindEvent_mousewheel : true
					})
				}
			}
			if (k.data("scrollButtons_enable")) {
				if (k.data("scrollButtons_scrollType") === "pixels") {
					if (k.data("horizontalScroll")) {
						v.add(A).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend", i, g);
						k.data({
							bindEvent_buttonsContinuous_x : false
						});
						if (!k.data("bindEvent_buttonsPixels_x")) {
							v.bind("click", function (x) {
								x.preventDefault();
								q(Math.abs(p.position().left) + k.data("scrollButtons_scrollAmount"))
							});
							A.bind("click", function (x) {
								x.preventDefault();
								q(Math.abs(p.position().left) - k.data("scrollButtons_scrollAmount"))
							});
							k.data({
								bindEvent_buttonsPixels_x : true
							})
						}
					} else {
						e.add(w).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend", i, g);
						k.data({
							bindEvent_buttonsContinuous_y : false
						});
						if (!k.data("bindEvent_buttonsPixels_y")) {
							e.bind("click", function (x) {
								x.preventDefault();
								q(Math.abs(p.position().top) + k.data("scrollButtons_scrollAmount"))
							});
							w.bind("click", function (x) {
								x.preventDefault();
								q(Math.abs(p.position().top) - k.data("scrollButtons_scrollAmount"))
							});
							k.data({
								bindEvent_buttonsPixels_y : true
							})
						}
					}
					function q(x) {
						if (!j.data("preventAction")) {
							j.data("preventAction", true);
							k.mCustomScrollbar("scrollTo", x, {
								trigger : "internal"
							})
						}
					}
				} else {
					if (k.data("horizontalScroll")) {
						v.add(A).unbind("click");
						k.data({
							bindEvent_buttonsPixels_x : false
						});
						if (!k.data("bindEvent_buttonsContinuous_x")) {
							v.bind("mousedown touchstart MSPointerDown", function (y) {
								y.preventDefault();
								var x = z();
								k.data({
									mCSB_buttonScrollRight : setInterval(function () {
										k.mCustomScrollbar("scrollTo", Math.abs(p.position().left) + x, {
											trigger : "internal",
											scrollEasing : "easeOutCirc"
										})
									}, 17)
								})
							});
							var i = function (x) {
								x.preventDefault();
								clearInterval(k.data("mCSB_buttonScrollRight"))
							};
							v.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", i);
							A.bind("mousedown touchstart MSPointerDown", function (y) {
								y.preventDefault();
								var x = z();
								k.data({
									mCSB_buttonScrollLeft : setInterval(function () {
										k.mCustomScrollbar("scrollTo", Math.abs(p.position().left) - x, {
											trigger : "internal",
											scrollEasing : "easeOutCirc"
										})
									}, 17)
								})
							});
							var g = function (x) {
								x.preventDefault();
								clearInterval(k.data("mCSB_buttonScrollLeft"))
							};
							A.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", g);
							k.data({
								bindEvent_buttonsContinuous_x : true
							})
						}
					} else {
						e.add(w).unbind("click");
						k.data({
							bindEvent_buttonsPixels_y : false
						});
						if (!k.data("bindEvent_buttonsContinuous_y")) {
							e.bind("mousedown touchstart MSPointerDown", function (y) {
								y.preventDefault();
								var x = z();
								k.data({
									mCSB_buttonScrollDown : setInterval(function () {
										k.mCustomScrollbar("scrollTo", Math.abs(p.position().top) + x, {
											trigger : "internal",
											scrollEasing : "easeOutCirc"
										})
									}, 17)
								})
							});
							var t = function (x) {
								x.preventDefault();
								clearInterval(k.data("mCSB_buttonScrollDown"))
							};
							e.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", t);
							w.bind("mousedown touchstart MSPointerDown", function (y) {
								y.preventDefault();
								var x = z();
								k.data({
									mCSB_buttonScrollUp : setInterval(function () {
										k.mCustomScrollbar("scrollTo", Math.abs(p.position().top) - x, {
											trigger : "internal",
											scrollEasing : "easeOutCirc"
										})
									}, 17)
								})
							});
							var f = function (x) {
								x.preventDefault();
								clearInterval(k.data("mCSB_buttonScrollUp"))
							};
							w.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", f);
							k.data({
								bindEvent_buttonsContinuous_y : true
							})
						}
					}
					function z() {
						var x = k.data("scrollButtons_scrollSpeed");
						if (k.data("scrollButtons_scrollSpeed") === "auto") {
							x = Math.round((k.data("scrollInertia") + 100) / 40)
						}
						return x
					}
				}
			}
			if (k.data("autoScrollOnFocus")) {
				if (!k.data("bindEvent_focusin")) {
					h.bind("focusin", function () {
						h.scrollTop(0).scrollLeft(0);
						var x = c(document.activeElement);
						if (x.is("input,textarea,select,button,a[tabindex],area,object")) {
							var G = p.position().top,
							y = x.position().top,
							F = h.height() - x.outerHeight();
							if (k.data("horizontalScroll")) {
								G = p.position().left;
								y = x.position().left;
								F = h.width() - x.outerWidth()
							}
							if (G + y < 0 || G + y > F) {
								k.mCustomScrollbar("scrollTo", y, {
									trigger : "internal"
								})
							}
						}
					});
					k.data({
						bindEvent_focusin : true
					})
				}
			}
			if (k.data("autoHideScrollbar")) {
				if (!k.data("bindEvent_autoHideScrollbar")) {
					h.bind("mouseenter", function (x) {
						h.addClass("mCS-mouse-over");
						d.showScrollbar.call(h.children(".mCSB_scrollTools"))
					}).bind("mouseleave touchend", function (x) {
						h.removeClass("mCS-mouse-over");
						if (x.type === "mouseleave") {
							d.hideScrollbar.call(h.children(".mCSB_scrollTools"))
						}
					});
					k.data({
						bindEvent_autoHideScrollbar : true
					})
				}
			}
		},
		scrollTo : function (e, f) {
			var i = c(this),
			o = {
				moveDragger : false,
				trigger : "external",
				callbacks : true,
				scrollInertia : i.data("scrollInertia"),
				scrollEasing : i.data("scrollEasing")
			},
			f = c.extend(o, f),
			p,
			g = i.children(".mCustomScrollBox"),
			k = g.children(".mCSB_container"),
			r = g.children(".mCSB_scrollTools"),
			j = r.children(".mCSB_draggerContainer"),
			h = j.children(".mCSB_dragger"),
			t = draggerSpeed = f.scrollInertia,
			q,
			s,
			m,
			l;
			if (!k.hasClass("mCS_no_scrollbar")) {
				i.data({
					mCS_trigger : f.trigger
				});
				if (i.data("mCS_Init")) {
					f.callbacks = false
				}
				if (e || e === 0) {
					if (typeof(e) === "number") {
						if (f.moveDragger) {
							p = e;
							if (i.data("horizontalScroll")) {
								e = h.position().left * i.data("scrollAmount")
							} else {
								e = h.position().top * i.data("scrollAmount")
							}
							draggerSpeed = 0
						} else {
							p = e / i.data("scrollAmount")
						}
					} else {
						if (typeof(e) === "string") {
							var v;
							if (e === "top") {
								v = 0
							} else {
								if (e === "bottom" && !i.data("horizontalScroll")) {
									v = k.outerHeight() - g.height()
								} else {
									if (e === "left") {
										v = 0
									} else {
										if (e === "right" && i.data("horizontalScroll")) {
											v = k.outerWidth() - g.width()
										} else {
											if (e === "first") {
												v = i.find(".mCSB_container").find(":first")
											} else {
												if (e === "last") {
													v = i.find(".mCSB_container").find(":last")
												} else {
													v = i.find(e)
												}
											}
										}
									}
								}
							}
							if (v.length === 1) {
								if (i.data("horizontalScroll")) {
									e = v.position().left
								} else {
									e = v.position().top
								}
								p = e / i.data("scrollAmount")
							} else {
								p = e = v
							}
						}
					}
					if (i.data("horizontalScroll")) {
						if (i.data("onTotalScrollBack_Offset")) {
							s = -i.data("onTotalScrollBack_Offset")
						}
						if (i.data("onTotalScroll_Offset")) {
							l = g.width() - k.outerWidth() + i.data("onTotalScroll_Offset")
						}
						if (p < 0) {
							p = e = 0;
							clearInterval(i.data("mCSB_buttonScrollLeft"));
							if (!s) {
								q = true
							}
						} else {
							if (p >= j.width() - h.width()) {
								p = j.width() - h.width();
								e = g.width() - k.outerWidth();
								clearInterval(i.data("mCSB_buttonScrollRight"));
								if (!l) {
									m = true
								}
							} else {
								e = -e
							}
						}
						var n = i.data("snapAmount");
						if (n) {
							e = Math.round(e / n) * n - i.data("snapOffset")
						}
						d.mTweenAxis.call(this, h[0], "left", Math.round(p), draggerSpeed, f.scrollEasing);
						d.mTweenAxis.call(this, k[0], "left", Math.round(e), t, f.scrollEasing, {
							onStart : function () {
								if (f.callbacks && !i.data("mCS_tweenRunning")) {
									u("onScrollStart")
								}
								if (i.data("autoHideScrollbar")) {
									d.showScrollbar.call(r)
								}
							},
							onUpdate : function () {
								if (f.callbacks) {
									u("whileScrolling")
								}
							},
							onComplete : function () {
								if (f.callbacks) {
									u("onScroll");
									if (q || (s && k.position().left >= s)) {
										u("onTotalScrollBack")
									}
									if (m || (l && k.position().left <= l)) {
										u("onTotalScroll")
									}
								}
								h.data("preventAction", false);
								i.data("mCS_tweenRunning", false);
								if (i.data("autoHideScrollbar")) {
									if (!g.hasClass("mCS-mouse-over")) {
										d.hideScrollbar.call(r)
									}
								}
							}
						})
					} else {
						if (i.data("onTotalScrollBack_Offset")) {
							s = -i.data("onTotalScrollBack_Offset")
						}
						if (i.data("onTotalScroll_Offset")) {
							l = g.height() - k.outerHeight() + i.data("onTotalScroll_Offset")
						}
						if (p < 0) {
							p = e = 0;
							clearInterval(i.data("mCSB_buttonScrollUp"));
							if (!s) {
								q = true
							}
						} else {
							if (p >= j.height() - h.height()) {
								p = j.height() - h.height();
								e = g.height() - k.outerHeight();
								clearInterval(i.data("mCSB_buttonScrollDown"));
								if (!l) {
									m = true
								}
							} else {
								e = -e
							}
						}
						var n = i.data("snapAmount");
						if (n) {
							e = Math.round(e / n) * n - i.data("snapOffset")
						}
						d.mTweenAxis.call(this, h[0], "top", Math.round(p), draggerSpeed, f.scrollEasing);
						d.mTweenAxis.call(this, k[0], "top", Math.round(e), t, f.scrollEasing, {
							onStart : function () {
								if (f.callbacks && !i.data("mCS_tweenRunning")) {
									u("onScrollStart")
								}
								if (i.data("autoHideScrollbar")) {
									d.showScrollbar.call(r)
								}
							},
							onUpdate : function () {
								if (f.callbacks) {
									u("whileScrolling")
								}
							},
							onComplete : function () {
								if (f.callbacks) {
									u("onScroll");
									if (q || (s && k.position().top >= s)) {
										u("onTotalScrollBack")
									}
									if (m || (l && k.position().top <= l)) {
										u("onTotalScroll")
									}
								}
								h.data("preventAction", false);
								i.data("mCS_tweenRunning", false);
								if (i.data("autoHideScrollbar")) {
									if (!g.hasClass("mCS-mouse-over")) {
										d.hideScrollbar.call(r)
									}
								}
							}
						})
					}
					if (i.data("mCS_Init")) {
						i.data({
							mCS_Init : false
						})
					}
				}
			}
			function u(w) {
				this.mcs = {
					top : k.position().top,
					left : k.position().left,
					draggerTop : h.position().top,
					draggerLeft : h.position().left,
					topPct : Math.round((100 * Math.abs(k.position().top)) / Math.abs(k.outerHeight() - g.height())),
					leftPct : Math.round((100 * Math.abs(k.position().left)) / Math.abs(k.outerWidth() - g.width()))
				};
				switch (w) {
				case "onScrollStart":
					i.data("mCS_tweenRunning", true).data("onScrollStart_Callback").call(i, this.mcs);
					break;
				case "whileScrolling":
					i.data("whileScrolling_Callback").call(i, this.mcs);
					break;
				case "onScroll":
					i.data("onScroll_Callback").call(i, this.mcs);
					break;
				case "onTotalScrollBack":
					i.data("onTotalScrollBack_Callback").call(i, this.mcs);
					break;
				case "onTotalScroll":
					i.data("onTotalScroll_Callback").call(i, this.mcs);
					break
				}
			}
		},
		stop : function () {
			var g = c(this),
			e = g.children().children(".mCSB_container"),
			f = g.children().children().children().children(".mCSB_dragger");
			d.mTweenAxisStop.call(this, e[0]);
			d.mTweenAxisStop.call(this, f[0])
		},
		disable : function (e) {
			var j = c(this),
			f = j.children(".mCustomScrollBox"),
			h = f.children(".mCSB_container"),
			g = f.children(".mCSB_scrollTools"),
			i = g.children().children(".mCSB_dragger");
			f.unbind("mousewheel focusin mouseenter mouseleave touchend");
			h.unbind("touchstart touchmove");
			if (e) {
				if (j.data("horizontalScroll")) {
					i.add(h).css("left", 0)
				} else {
					i.add(h).css("top", 0)
				}
			}
			g.css("display", "none");
			h.addClass("mCS_no_scrollbar");
			j.data({
				bindEvent_mousewheel : false,
				bindEvent_focusin : false,
				bindEvent_content_touch : false,
				bindEvent_autoHideScrollbar : false
			}).addClass("mCS_disabled")
		},
		destroy : function () {
			var e = c(this);
			e.removeClass("mCustomScrollbar _mCS_" + e.data("mCustomScrollbarIndex")).addClass("mCS_destroyed").children().children(".mCSB_container").unwrap().children().unwrap().siblings(".mCSB_scrollTools").remove();
			c(document).unbind("mousemove." + e.data("mCustomScrollbarIndex") + " mouseup." + e.data("mCustomScrollbarIndex") + " MSPointerMove." + e.data("mCustomScrollbarIndex") + " MSPointerUp." + e.data("mCustomScrollbarIndex"));
			c(window).unbind("resize." + e.data("mCustomScrollbarIndex"))
		}
	},
	d = {
		showScrollbar : function () {
			this.stop().animate({
				opacity : 1
			}, "fast")
		},
		hideScrollbar : function () {
			this.stop().animate({
				opacity : 0
			}, "fast")
		},
		mTweenAxis : function (g, i, h, f, o, y) {
			var y = y || {},
			v = y.onStart || function () {},
			p = y.onUpdate || function () {},
			w = y.onComplete || function () {};
			var n = t(),
			l,
			j = 0,
			r = g.offsetTop,
			s = g.style;
			if (i === "left") {
				r = g.offsetLeft
			}
			var m = h - r;
			q();
			e();
			function t() {
				if (window.performance && window.performance.now) {
					return window.performance.now()
				} else {
					if (window.performance && window.performance.webkitNow) {
						return window.performance.webkitNow()
					} else {
						if (Date.now) {
							return Date.now()
						} else {
							return new Date().getTime()
						}
					}
				}
			}
			function x() {
				if (!j) {
					v.call()
				}
				j = t() - n;
				u();
				if (j >= g._time) {
					g._time = (j > g._time) ? j + l - (j - g._time) : j + l - 1;
					if (g._time < j + 1) {
						g._time = j + 1
					}
				}
				if (g._time < f) {
					g._id = _request(x)
				} else {
					w.call()
				}
			}
			function u() {
				if (f > 0) {
					g.currVal = k(g._time, r, m, f, o);
					s[i] = Math.round(g.currVal) + "px"
				} else {
					s[i] = h + "px"
				}
				p.call()
			}
			function e() {
				l = 1000 / 60;
				g._time = j + l;
				_request = (!window.requestAnimationFrame) ? function (z) {
					u();
					return setTimeout(z, 0.01)
				}
				 : window.requestAnimationFrame;
				g._id = _request(x)
			}
			function q() {
				if (g._id == null) {
					return
				}
				if (!window.requestAnimationFrame) {
					clearTimeout(g._id)
				} else {
					window.cancelAnimationFrame(g._id)
				}
				g._id = null
			}
			function k(B, A, F, E, C) {
				switch (C) {
				case "linear":
					return F * B / E + A;
					break;
				case "easeOutQuad":
					B /= E;
					return -F * B * (B - 2) + A;
					break;
				case "easeInOutQuad":
					B /= E / 2;
					if (B < 1) {
						return F / 2 * B * B + A
					}
					B--;
					return -F / 2 * (B * (B - 2) - 1) + A;
					break;
				case "easeOutCubic":
					B /= E;
					B--;
					return F * (B * B * B + 1) + A;
					break;
				case "easeOutQuart":
					B /= E;
					B--;
					return -F * (B * B * B * B - 1) + A;
					break;
				case "easeOutQuint":
					B /= E;
					B--;
					return F * (B * B * B * B * B + 1) + A;
					break;
				case "easeOutCirc":
					B /= E;
					B--;
					return F * Math.sqrt(1 - B * B) + A;
					break;
				case "easeOutSine":
					return F * Math.sin(B / E * (Math.PI / 2)) + A;
					break;
				case "easeOutExpo":
					return F * (-Math.pow(2, -10 * B / E) + 1) + A;
					break;
				case "mcsEaseOut":
					var D = (B /= E) * B,
					z = D * B;
					return A + F * (0.499999999999997 * z * D + -2.5 * D * D + 5.5 * z + -6.5 * D + 4 * B);
					break;
				case "draggerRailEase":
					B /= E / 2;
					if (B < 1) {
						return F / 2 * B * B * B + A
					}
					B -= 2;
					return F / 2 * (B * B * B + 2) + A;
					break
				}
			}
		},
		mTweenAxisStop : function (e) {
			if (e._id == null) {
				return
			}
			if (!window.requestAnimationFrame) {
				clearTimeout(e._id)
			} else {
				window.cancelAnimationFrame(e._id)
			}
			e._id = null
		},
		rafPolyfill : function () {
			var f = ["ms", "moz", "webkit", "o"],
			e = f.length;
			while (--e > -1 && !window.requestAnimationFrame) {
				window.requestAnimationFrame = window[f[e] + "RequestAnimationFrame"];
				window.cancelAnimationFrame = window[f[e] + "CancelAnimationFrame"] || window[f[e] + "CancelRequestAnimationFrame"]
			}
		}
	};
	d.rafPolyfill.call();
	c.support.touch = !!("ontouchstart" in window);
	c.support.msPointer = window.navigator.msPointerEnabled;
	var a = ("https:" == document.location.protocol) ? "https:" : "http:";
	c.event.special.mousewheel || document.write('<script src="' + a + '//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.0.6/jquery.mousewheel.min.js"><\/script>');
	c.fn.mCustomScrollbar = function (e) {
		if (b[e]) {
			return b[e].apply(this, Array.prototype.slice.call(arguments, 1))
		} else {
			if (typeof e === "object" || !e) {
				return b.init.apply(this, arguments)
			} else {
				c.error("Method " + e + " does not exist")
			}
		}
	}
})(jQuery);

//	jQuery Mobile framework customized for Camera slideshow, made by
//	'jquery.mobile.define.js',
//	'jquery.ui.widget.js',
//	'jquery.mobile.widget.js',
//	'jquery.mobile.media.js',
//	'jquery.mobile.support.js',
//	'jquery.mobile.vmouse.js',
//	'jquery.mobile.event.js',
//	'jquery.mobile.core.js'
window.define = function () {
	Array.prototype.slice.call(arguments).pop()(window.jQuery)
};
define(["jquery"], function (a) {
	(function (a, b) {
		if (a.cleanData) {
			var c = a.cleanData;
			a.cleanData = function (b) {
				for (var d = 0, e; (e = b[d]) != null; d++) {
					a(e).triggerHandler("remove")
				}
				c(b)
			}
		} else {
			var d = a.fn.remove;
			a.fn.remove = function (b, c) {
				return this.each(function () {
					if (!c) {
						if (!b || a.filter(b, [this]).length) {
							a("*", this).add([this]).each(function () {
								a(this).triggerHandler("remove")
							})
						}
					}
					return d.call(a(this), b, c)
				})
			}
		}
		a.widget = function (b, c, d) {
			var e = b.split(".")[0],
			f;
			b = b.split(".")[1];
			f = e + "-" + b;
			if (!d) {
				d = c;
				c = a.Widget
			}
			a.expr[":"][f] = function (c) {
				return !!a.data(c, b)
			};
			a[e] = a[e] || {};
			a[e][b] = function (a, b) {
				if (arguments.length) {
					this._createWidget(a, b)
				}
			};
			var g = new c;
			g.options = a.extend(true, {}, g.options);
			a[e][b].prototype = a.extend(true, g, {
					namespace : e,
					widgetName : b,
					widgetEventPrefix : a[e][b].prototype.widgetEventPrefix || b,
					widgetBaseClass : f
				}, d);
			a.widget.bridge(b, a[e][b])
		};
		a.widget.bridge = function (c, d) {
			a.fn[c] = function (e) {
				var f = typeof e === "string",
				g = Array.prototype.slice.call(arguments, 1),
				h = this;
				e = !f && g.length ? a.extend.apply(null, [true, e].concat(g)) : e;
				if (f && e.charAt(0) === "_") {
					return h
				}
				if (f) {
					this.each(function () {
						var d = a.data(this, c);
						if (!d) {
							throw "cannot call methods on " + c + " prior to initialization; " + "attempted to call method '" + e + "'"
						}
						if (!a.isFunction(d[e])) {
							throw "no such method '" + e + "' for " + c + " widget instance"
						}
						var f = d[e].apply(d, g);
						if (f !== d && f !== b) {
							h = f;
							return false
						}
					})
				} else {
					this.each(function () {
						var b = a.data(this, c);
						if (b) {
							b.option(e || {})._init()
						} else {
							a.data(this, c, new d(e, this))
						}
					})
				}
				return h
			}
		};
		a.Widget = function (a, b) {
			if (arguments.length) {
				this._createWidget(a, b)
			}
		};
		a.Widget.prototype = {
			widgetName : "widget",
			widgetEventPrefix : "",
			options : {
				disabled : false
			},
			_createWidget : function (b, c) {
				a.data(c, this.widgetName, this);
				this.element = a(c);
				this.options = a.extend(true, {}, this.options, this._getCreateOptions(), b);
				var d = this;
				this.element.bind("remove." + this.widgetName, function () {
					d.destroy()
				});
				this._create();
				this._trigger("create");
				this._init()
			},
			_getCreateOptions : function () {
				var b = {};
				if (a.metadata) {
					b = a.metadata.get(element)[this.widgetName]
				}
				return b
			},
			_create : function () {},
			_init : function () {},
			destroy : function () {
				this.element.unbind("." + this.widgetName).removeData(this.widgetName);
				this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
			},
			widget : function () {
				return this.element
			},
			option : function (c, d) {
				var e = c;
				if (arguments.length === 0) {
					return a.extend({}, this.options)
				}
				if (typeof c === "string") {
					if (d === b) {
						return this.options[c]
					}
					e = {};
					e[c] = d
				}
				this._setOptions(e);
				return this
			},
			_setOptions : function (b) {
				var c = this;
				a.each(b, function (a, b) {
					c._setOption(a, b)
				});
				return this
			},
			_setOption : function (a, b) {
				this.options[a] = b;
				if (a === "disabled") {
					this.widget()[b ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", b)
				}
				return this
			},
			enable : function () {
				return this._setOption("disabled", false)
			},
			disable : function () {
				return this._setOption("disabled", true)
			},
			_trigger : function (b, c, d) {
				var e = this.options[b];
				c = a.Event(c);
				c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase();
				d = d || {};
				if (c.originalEvent) {
					for (var f = a.event.props.length, g; f; ) {
						g = a.event.props[--f];
						c[g] = c.originalEvent[g]
					}
				}
				this.element.trigger(c, d);
				return !(a.isFunction(e) && e.call(this.element[0], c, d) === false || c.isDefaultPrevented())
			}
		}
	})(jQuery)
});
define(["jquery", "./jquery.ui.widget"], function (a) {
	(function (a, b) {
		a.widget("mobile.widget", {
			_createWidget : function () {
				a.Widget.prototype._createWidget.apply(this, arguments);
				this._trigger("init")
			},
			_getCreateOptions : function () {
				var c = this.element,
				d = {};
				a.each(this.options, function (a) {
					var e = c.jqmData(a.replace(/[A-Z]/g, function (a) {
								return "-" + a.toLowerCase()
							}));
					if (e !== b) {
						d[a] = e
					}
				});
				return d
			},
			enhanceWithin : function (b) {
				var c = a.mobile.closestPageData(a(b)),
				d = c && c.keepNativeSelector() || "";
				a(this.options.initSelector, b).not(d)[this.widgetName]()
			}
		})
	})(jQuery)
});
define(["jquery", "./jquery.mobile.core"], function (a) {
	(function (a, b) {
		var c = a(window),
		d = a("html");
		a.mobile.media = function () {
			var b = {},
			c = a("<div id='jquery-mediatest'>"),
			e = a("<body>").append(c);
			return function (a) {
				if (!(a in b)) {
					var f = document.createElement("style"),
					g = "@media " + a + " { #jquery-mediatest { position:absolute; } }";
					f.type = "text/css";
					if (f.styleSheet) {
						f.styleSheet.cssText = g
					} else {
						f.appendChild(document.createTextNode(g))
					}
					d.prepend(e).prepend(f);
					b[a] = c.css("position") === "absolute";
					e.add(f).remove()
				}
				return b[a]
			}
		}
		()
	})(jQuery)
});
define(["jquery", "./jquery.mobile.media"], function (a) {
	(function (a, b) {
		function m() {
			var b = location.protocol + "//" + location.host + location.pathname + "ui-dir/",
			d = a("head base"),
			e = null,
			f = "",
			g,
			h;
			if (!d.length) {
				d = e = a("<base>", {
						href : b
					}).appendTo("head")
			} else {
				f = d.attr("href")
			}
			g = a("<a href='testurl' />").prependTo(c);
			h = g[0].href;
			d[0].href = f || location.pathname;
			if (e) {
				e.remove()
			}
			return h.indexOf(b) === 0
		}
		function l() {
			var b = "transform-3d";
			return k("perspective", "10px", "moz") || a.mobile.media("(-" + e.join("-" + b + "),(-") + "-" + b + "),(" + b + ")")
		}
		function k(a, b, c) {
			var d = document.createElement("div"),
			f = function (a) {
				return a.charAt(0).toUpperCase() + a.substr(1)
			},
			g = function (a) {
				return "-" + a.charAt(0).toLowerCase() + a.substr(1) + "-"
			},
			h = function (c) {
				var e = g(c) + a + ": " + b + ";",
				h = f(c),
				i = h + f(a);
				d.setAttribute("style", e);
				if (!!d.style[i]) {
					k = true
				}
			},
			j = c ? [c] : e,
			k;
			for (i = 0; i < j.length; i++) {
				h(j[i])
			}
			return !!k
		}
		function j(a) {
			var c = a.charAt(0).toUpperCase() + a.substr(1),
			f = (a + " " + e.join(c + " ") + c).split(" ");
			for (var g in f) {
				if (d[f[g]] !== b) {
					return true
				}
			}
		}
		var c = a("<body>").prependTo("html"),
		d = c[0].style,
		e = ["Webkit", "Moz", "O"],
		f = "palmGetResource" in window,
		g = window.operamini && {}

		.toString.call(window.operamini) === "[object OperaMini]",
		h = window.blackberry;
		a.extend(a.mobile, {
			browser : {}

		});
		a.mobile.browser.ie = function () {
			var a = 3,
			b = document.createElement("div"),
			c = b.all || [];
			while (b.innerHTML = "<!--[if gt IE " + ++a + "]><br><![endif]-->", c[0]) {}

			return a > 4 ? a : !a
		}
		();
		a.extend(a.support, {
			orientation : "orientation" in window && "onorientationchange" in window,
			touch : "ontouchend" in document,
			cssTransitions : "WebKitTransitionEvent" in window || k("transition", "height 100ms linear"),
			pushState : "pushState" in history && "replaceState" in history,
			mediaquery : a.mobile.media("only all"),
			cssPseudoElement : !!j("content"),
			touchOverflow : !!j("overflowScrolling"),
			cssTransform3d : l(),
			boxShadow : !!j("boxShadow") && !h,
			scrollTop : ("pageXOffset" in window || "scrollTop" in document.documentElement || "scrollTop" in c[0]) && !f && !g,
			dynamicBaseTag : m()
		});
		c.remove();
		var n = function () {
			var a = window.navigator.userAgent;
			return a.indexOf("Nokia") > -1 && (a.indexOf("Symbian/3") > -1 || a.indexOf("Series60/5") > -1) && a.indexOf("AppleWebKit") > -1 && a.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)
		}
		();
		a.mobile.ajaxBlacklist = window.blackberry && !window.WebKitPoint || g || n;
		if (n) {
			a(function () {
				a("head link[rel='stylesheet']").attr("rel", "alternate stylesheet").attr("rel", "stylesheet")
			})
		}
		if (!a.support.boxShadow) {
			a("html").addClass("ui-mobile-nosupport-boxshadow")
		}
	})(jQuery)
});
define(["jquery"], function (a) {
	(function (a, b, c, d) {
		function O(b) {
			var c = b.substr(1);
			return {
				setup : function (d, f) {
					if (!M(this)) {
						a.data(this, e, {})
					}
					var g = a.data(this, e);
					g[b] = true;
					k[b] = (k[b] || 0) + 1;
					if (k[b] === 1) {
						t.bind(c, H)
					}
					a(this).bind(c, N);
					if (s) {
						k["touchstart"] = (k["touchstart"] || 0) + 1;
						if (k["touchstart"] === 1) {
							t.bind("touchstart", I).bind("touchend", L).bind("touchmove", K).bind("scroll", J)
						}
					}
				},
				teardown : function (d, f) {
					--k[b];
					if (!k[b]) {
						t.unbind(c, H)
					}
					if (s) {
						--k["touchstart"];
						if (!k["touchstart"]) {
							t.unbind("touchstart", I).unbind("touchmove", K).unbind("touchend", L).unbind("scroll", J)
						}
					}
					var g = a(this),
					h = a.data(this, e);
					if (h) {
						h[b] = false
					}
					g.unbind(c, N);
					if (!M(this)) {
						g.removeData(e)
					}
				}
			}
		}
		function N() {}

		function M(b) {
			var c = a.data(b, e),
			d;
			if (c) {
				for (d in c) {
					if (c[d]) {
						return true
					}
				}
			}
			return false
		}
		function L(a) {
			if (r) {
				return
			}
			B();
			var b = y(a.target),
			c;
			G("vmouseup", a, b);
			if (!o) {
				var d = G("vclick", a, b);
				if (d && d.isDefaultPrevented()) {
					c = w(a).changedTouches[0];
					p.push({
						touchID : v,
						x : c.clientX,
						y : c.clientY
					});
					q = true
				}
			}
			G("vmouseout", a, b);
			o = false;
			E()
		}
		function K(b) {
			if (r) {
				return
			}
			var c = w(b).touches[0],
			d = o,
			e = a.vmouse.moveDistanceThreshold;
			o = o || Math.abs(c.pageX - m) > e || Math.abs(c.pageY - n) > e,
			flags = y(b.target);
			if (o && !d) {
				G("vmousecancel", b, flags)
			}
			G("vmousemove", b, flags);
			E()
		}
		function J(a) {
			if (r) {
				return
			}
			if (!o) {
				G("vmousecancel", a, y(a.target))
			}
			o = true;
			E()
		}
		function I(b) {
			var c = w(b).touches,
			d,
			e;
			if (c && c.length === 1) {
				d = b.target;
				e = y(d);
				if (e.hasVirtualBinding) {
					v = u++;
					a.data(d, f, v);
					F();
					D();
					o = false;
					var g = w(b).touches[0];
					m = g.pageX;
					n = g.pageY;
					G("vmouseover", b, e);
					G("vmousedown", b, e)
				}
			}
		}
		function H(b) {
			var c = a.data(b.target, f);
			if (!q && (!v || v !== c)) {
				var d = G("v" + b.type, b);
				if (d) {
					if (d.isDefaultPrevented()) {
						b.preventDefault()
					}
					if (d.isPropagationStopped()) {
						b.stopPropagation()
					}
					if (d.isImmediatePropagationStopped()) {
						b.stopImmediatePropagation()
					}
				}
			}
		}
		function G(b, c, d) {
			var e;
			if (d && d[b] || !d && z(c.target, b)) {
				e = x(c, b);
				a(c.target).trigger(e)
			}
			return e
		}
		function F() {
			if (l) {
				clearTimeout(l);
				l = 0
			}
		}
		function E() {
			F();
			l = setTimeout(function () {
					l = 0;
					C()
				}, a.vmouse.resetTimerDuration)
		}
		function D() {
			A()
		}
		function C() {
			v = 0;
			p.length = 0;
			q = false;
			B()
		}
		function B() {
			r = true
		}
		function A() {
			r = false
		}
		function z(b, c) {
			var d;
			while (b) {
				d = a.data(b, e);
				if (d && (!c || d[c])) {
					return b
				}
				b = b.parentNode
			}
			return null
		}
		function y(b) {
			var c = {},
			d,
			f;
			while (b) {
				d = a.data(b, e);
				for (f in d) {
					if (d[f]) {
						c[f] = c.hasVirtualBinding = true
					}
				}
				b = b.parentNode
			}
			return c
		}
		function x(b, c) {
			var e = b.type,
			f,
			g,
			i,
			k,
			l,
			m,
			n,
			o;
			b = a.Event(b);
			b.type = c;
			f = b.originalEvent;
			g = a.event.props;
			if (e.search(/mouse/) > -1) {
				g = j
			}
			if (f) {
				for (n = g.length, k; n; ) {
					k = g[--n];
					b[k] = f[k]
				}
			}
			if (e.search(/mouse(down|up)|click/) > -1 && !b.which) {
				b.which = 1
			}
			if (e.search(/^touch/) !== -1) {
				i = w(f);
				e = i.touches;
				l = i.changedTouches;
				m = e && e.length ? e[0] : l && l.length ? l[0] : d;
				if (m) {
					for (o = 0, len = h.length; o < len; o++) {
						k = h[o];
						b[k] = m[k]
					}
				}
			}
			return b
		}
		function w(a) {
			while (a && typeof a.originalEvent !== "undefined") {
				a = a.originalEvent
			}
			return a
		}
		var e = "virtualMouseBindings",
		f = "virtualTouchID",
		g = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
		h = "clientX clientY pageX pageY screenX screenY".split(" "),
		i = a.event.mouseHooks ? a.event.mouseHooks.props : [],
		j = a.event.props.concat(i),
		k = {},
		l = 0,
		m = 0,
		n = 0,
		o = false,
		p = [],
		q = false,
		r = false,
		s = "addEventListener" in c,
		t = a(c),
		u = 1,
		v = 0;
		a.vmouse = {
			moveDistanceThreshold : 10,
			clickDistanceThreshold : 10,
			resetTimerDuration : 1500
		};
		for (var P = 0; P < g.length; P++) {
			a.event.special[g[P]] = O(g[P])
		}
		if (s) {
			c.addEventListener("click", function (b) {
				var c = p.length,
				d = b.target,
				e,
				g,
				h,
				i,
				j,
				k;
				if (c) {
					e = b.clientX;
					g = b.clientY;
					threshold = a.vmouse.clickDistanceThreshold;
					h = d;
					while (h) {
						for (i = 0; i < c; i++) {
							j = p[i];
							k = 0;
							if (h === d && Math.abs(j.x - e) < threshold && Math.abs(j.y - g) < threshold || a.data(h, f) === j.touchID) {
								b.preventDefault();
								b.stopPropagation();
								return
							}
						}
						h = h.parentNode
					}
				}
			}, true)
		}
	})(jQuery, window, document)
});
define(["jquery", "./jquery.mobile.core", "./jquery.mobile.media", "./jquery.mobile.support", "./jquery.mobile.vmouse"], function (a) {
	(function (a, b, c) {
		function i(b, c, d) {
			var e = d.type;
			d.type = c;
			a.event.handle.call(b, d);
			d.type = e
		}
		a.each(("touchstart touchmove touchend orientationchange throttledresize " + "tap taphold swipe swipeleft swiperight scrollstart scrollstop").split(" "), function (b, c) {
			a.fn[c] = function (a) {
				return a ? this.bind(c, a) : this.trigger(c)
			};
			a.attrFn[c] = true
		});
		var d = a.support.touch,
		e = "touchmove scroll",
		f = d ? "touchstart" : "mousedown",
		g = d ? "touchend" : "mouseup",
		h = d ? "touchmove" : "mousemove";
		a.event.special.scrollstart = {
			enabled : true,
			setup : function () {
				function g(a, c) {
					d = c;
					i(b, d ? "scrollstart" : "scrollstop", a)
				}
				var b = this,
				c = a(b),
				d,
				f;
				c.bind(e, function (b) {
					if (!a.event.special.scrollstart.enabled) {
						return
					}
					if (!d) {
						g(b, true)
					}
					clearTimeout(f);
					f = setTimeout(function () {
							g(b, false)
						}, 50)
				})
			}
		};
		a.event.special.tap = {
			setup : function () {
				var b = this,
				c = a(b);
				c.bind("vmousedown", function (d) {
					function k(a) {
						j();
						if (e == a.target) {
							i(b, "tap", a)
						}
					}
					function j() {
						h();
						c.unbind("vclick", k).unbind("vmouseup", h);
						a(document).unbind("vmousecancel", j)
					}
					function h() {
						clearTimeout(g)
					}
					if (d.which && d.which !== 1) {
						return false
					}
					var e = d.target,
					f = d.originalEvent,
					g;
					c.bind("vmouseup", h).bind("vclick", k);
					a(document).bind("vmousecancel", j);
					g = setTimeout(function () {
							i(b, "taphold", a.Event("taphold"))
						}, 750)
				})
			}
		};
		a.event.special.swipe = {
			scrollSupressionThreshold : 10,
			durationThreshold : 1e3,
			horizontalDistanceThreshold : 30,
			verticalDistanceThreshold : 75,
			setup : function () {
				var b = this,
				d = a(b);
				d.bind(f, function (b) {
					function j(b) {
						if (!f) {
							return
						}
						var c = b.originalEvent.touches ? b.originalEvent.touches[0] : b;
						i = {
							time : (new Date).getTime(),
							coords : [c.pageX, c.pageY]
						};
						if (Math.abs(f.coords[0] - i.coords[0]) > a.event.special.swipe.scrollSupressionThreshold) {
							b.preventDefault()
						}
					}
					var e = b.originalEvent.touches ? b.originalEvent.touches[0] : b,
					f = {
						time : (new Date).getTime(),
						coords : [e.pageX, e.pageY],
						origin : a(b.target)
					},
					i;
					d.bind(h, j).one(g, function (b) {
						d.unbind(h, j);
						if (f && i) {
							if (i.time - f.time < a.event.special.swipe.durationThreshold && Math.abs(f.coords[0] - i.coords[0]) > a.event.special.swipe.horizontalDistanceThreshold && Math.abs(f.coords[1] - i.coords[1]) < a.event.special.swipe.verticalDistanceThreshold) {
								f.origin.trigger("swipe").trigger(f.coords[0] > i.coords[0] ? "swipeleft" : "swiperight")
							}
						}
						f = i = c
					})
				})
			}
		};
		(function (a, b) {
			function j() {
				var a = e();
				if (a !== f) {
					f = a;
					c.trigger("orientationchange")
				}
			}
			var c = a(b),
			d,
			e,
			f,
			g,
			h,
			i = {
				0 : true,
				180 : true
			};
			if (a.support.orientation) {
				g = a.mobile.media("all and (orientation: landscape)");
				h = i[b.orientation];
				if (g && h || !g && !h) {
					i = {
						"-90" : true,
						90 : true
					}
				}
			}
			a.event.special.orientationchange = d = {
				setup : function () {
					if (a.support.orientation && a.mobile.orientationChangeEnabled) {
						return false
					}
					f = e();
					c.bind("throttledresize", j)
				},
				teardown : function () {
					if (a.support.orientation && a.mobile.orientationChangeEnabled) {
						return false
					}
					c.unbind("throttledresize", j)
				},
				add : function (a) {
					var b = a.handler;
					a.handler = function (a) {
						a.orientation = e();
						return b.apply(this, arguments)
					}
				}
			};
			a.event.special.orientationchange.orientation = e = function () {
				var c = true,
				d = document.documentElement;
				if (a.support.orientation) {
					c = i[b.orientation]
				} else {
					c = d && d.clientWidth / d.clientHeight < 1.1
				}
				return c ? "portrait" : "landscape"
			}
		})(jQuery, b);
		(function () {
			a.event.special.throttledresize = {
				setup : function () {
					a(this).bind("resize", c)
				},
				teardown : function () {
					a(this).unbind("resize", c)
				}
			};
			var b = 250,
			c = function () {
				f = (new Date).getTime();
				g = f - d;
				if (g >= b) {
					d = f;
					a(this).trigger("throttledresize")
				} else {
					if (e) {
						clearTimeout(e)
					}
					e = setTimeout(c, b - g)
				}
			},
			d = 0,
			e,
			f,
			g
		})();
		a.each({
			scrollstop : "scrollstart",
			taphold : "tap",
			swipeleft : "swipe",
			swiperight : "swipe"
		}, function (b, c) {
			a.event.special[b] = {
				setup : function () {
					a(this).bind(c, a.noop)
				}
			}
		})
	})(jQuery, this)
});
define(["jquery", "../external/requirejs/text!../version.txt", "./jquery.mobile.widget"], function (a, b) {
	(function (a, c, d) {
		var e = {};
		a.mobile = a.extend({}, {
				version : b,
				ns : "",
				subPageUrlKey : "ui-page",
				activePageClass : "ui-page-active",
				activeBtnClass : "ui-btn-active",
				focusClass : "ui-focus",
				ajaxEnabled : true,
				hashListeningEnabled : true,
				linkBindingEnabled : true,
				defaultPageTransition : "fade",
				maxTransitionWidth : false,
				minScrollBack : 10,
				touchOverflowEnabled : false,
				defaultDialogTransition : "pop",
				loadingMessage : "loading",
				pageLoadErrorMessage : "Error Loading Page",
				loadingMessageTextVisible : false,
				loadingMessageTheme : "a",
				pageLoadErrorMessageTheme : "e",
				autoInitializePage : true,
				pushStateEnabled : true,
				orientationChangeEnabled : true,
				gradeA : function () {
					return a.support.mediaquery || a.mobile.browser.ie && a.mobile.browser.ie >= 7
				},
				keyCode : {
					ALT : 18,
					BACKSPACE : 8,
					CAPS_LOCK : 20,
					COMMA : 188,
					COMMAND : 91,
					COMMAND_LEFT : 91,
					COMMAND_RIGHT : 93,
					CONTROL : 17,
					DELETE : 46,
					DOWN : 40,
					END : 35,
					ENTER : 13,
					ESCAPE : 27,
					HOME : 36,
					INSERT : 45,
					LEFT : 37,
					MENU : 93,
					NUMPAD_ADD : 107,
					NUMPAD_DECIMAL : 110,
					NUMPAD_DIVIDE : 111,
					NUMPAD_ENTER : 108,
					NUMPAD_MULTIPLY : 106,
					NUMPAD_SUBTRACT : 109,
					PAGE_DOWN : 34,
					PAGE_UP : 33,
					PERIOD : 190,
					RIGHT : 39,
					SHIFT : 16,
					SPACE : 32,
					TAB : 9,
					UP : 38,
					WINDOWS : 91
				},
				silentScroll : function (b) {
					if (a.type(b) !== "number") {
						b = a.mobile.defaultHomeScroll
					}
					a.event.special.scrollstart.enabled = false;
					setTimeout(function () {
						c.scrollTo(0, b);
						a(document).trigger("silentscroll", {
							x : 0,
							y : b
						})
					}, 20);
					setTimeout(function () {
						a.event.special.scrollstart.enabled = true
					}, 150)
				},
				nsNormalizeDict : e,
				nsNormalize : function (b) {
					if (!b) {
						return
					}
					return e[b] || (e[b] = a.camelCase(a.mobile.ns + b))
				},
				getInheritedTheme : function (a, b) {
					var c = a[0],
					d = "",
					e = /ui-(bar|body)-([a-z])\b/,
					f,
					g;
					while (c) {
						var f = c.className || "";
						if ((g = e.exec(f)) && (d = g[2])) {
							break
						}
						c = c.parentNode
					}
					return d || b || "a"
				},
				closestPageData : function (a) {
					return a.closest(':jqmData(role="page"), :jqmData(role="dialog")').data("page")
				}
			}, a.mobile);
		a.fn.jqmData = function (b, c) {
			var d;
			if (typeof b != "undefined") {
				d = this.data(b ? a.mobile.nsNormalize(b) : b, c)
			}
			return d
		};
		a.jqmData = function (b, c, d) {
			var e;
			if (typeof c != "undefined") {
				e = a.data(b, c ? a.mobile.nsNormalize(c) : c, d)
			}
			return e
		};
		a.fn.jqmRemoveData = function (b) {
			return this.removeData(a.mobile.nsNormalize(b))
		};
		a.jqmRemoveData = function (b, c) {
			return a.removeData(b, a.mobile.nsNormalize(c))
		};
		a.fn.removeWithDependents = function () {
			a.removeWithDependents(this)
		};
		a.removeWithDependents = function (b) {
			var c = a(b);
			(c.jqmData("dependents") || a()).remove();
			c.remove()
		};
		a.fn.addDependents = function (b) {
			a.addDependents(a(this), b)
		};
		a.addDependents = function (b, c) {
			var d = a(b).jqmData("dependents") || a();
			a(b).jqmData("dependents", a.merge(d, c))
		};
		a.fn.getEncodedText = function () {
			return a("<div/>").text(a(this).text()).html()
		};
		var f = a.find,
		g = /:jqmData\(([^)]*)\)/g;
		a.find = function (b, c, d, e) {
			b = b.replace(g, "[data-" + (a.mobile.ns || "") + "$1]");
			return f.call(this, b, c, d, e)
		};
		a.extend(a.find, f);
		a.find.matches = function (b, c) {
			return a.find(b, null, null, c)
		};
		a.find.matchesSelector = function (b, c) {
			return a.find(c, null, null, [b]).length > 0
		}
	})(jQuery, this)
})

// Camera slideshow v1.3.3 - a jQuery slideshow with many effects, transitions, easy to customize, using canvas and mobile ready, based on jQuery 1.4+
// Copyright (c) 2012 by Manuel Masia - www.pixedelic.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
;
(function (a) {
	a.fn.camera = function (b, c) {
		function e() {
			if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
				return true
			}
		}
		function H() {
			var b = a(s).width();
			a("li", s).removeClass("camera_visThumb");
			a("li", s).each(function () {
				var c = a(this).position(),
				d = a("ul", s).outerWidth(),
				e = a("ul", s).offset().left,
				f = a("> div", s).offset().left,
				g = f - e;
				if (g > 0) {
					a(".camera_prevThumbs", V).removeClass("hideNav")
				} else {
					a(".camera_prevThumbs", V).addClass("hideNav")
				}
				if (d - g > b) {
					a(".camera_nextThumbs", V).removeClass("hideNav")
				} else {
					a(".camera_nextThumbs", V).addClass("hideNav")
				}
				var h = c.left,
				i = c.left + a(this).width();
				if (i - g <= b && h - g >= 0) {
					a(this).addClass("camera_visThumb")
				}
			})
		}
		function K() {
			function d() {
				t = f.width();
				if (b.height.indexOf("%") != -1) {
					var c = Math.round(t / (100 / parseFloat(b.height)));
					if (b.minHeight != "" && c < parseFloat(b.minHeight)) {
						u = parseFloat(b.minHeight)
					} else {
						u = c
					}
					f.css({
						height : u
					})
				} else if (b.height == "auto") {
					u = f.height()
				} else {
					u = parseFloat(b.height);
					f.css({
						height : u
					})
				}
				a(".camerarelative", k).css({
					width : t,
					height : u
				});
				a(".imgLoaded", k).each(function () {
					var c = a(this),
					d = c.attr("width"),
					e = c.attr("height"),
					f = c.index(),
					g,
					h,
					i = c.attr("data-alignment"),
					j = c.attr("data-portrait");
					if (typeof i === "undefined" || i === false || i === "") {
						i = b.alignment
					}
					if (typeof j === "undefined" || j === false || j === "") {
						j = b.portrait
					}
					if (j == false || j == "false") {
						if (d / e < t / u) {
							var k = t / d;
							var l = Math.abs(u - e * k) * .5;
							switch (i) {
							case "topLeft":
								g = 0;
								break;
							case "topCenter":
								g = 0;
								break;
							case "topRight":
								g = 0;
								break;
							case "centerLeft":
								g = "-" + l + "px";
								break;
							case "center":
								g = "-" + l + "px";
								break;
							case "centerRight":
								g = "-" + l + "px";
								break;
							case "bottomLeft":
								g = "-" + l * 2 + "px";
								break;
							case "bottomCenter":
								g = "-" + l * 2 + "px";
								break;
							case "bottomRight":
								g = "-" + l * 2 + "px";
								break
							}
							c.css({
								height : e * k,
								"margin-left" : 0,
								"margin-top" : g,
								position : "absolute",
								visibility : "visible",
								width : t
							})
						} else {
							var k = u / e;
							var l = Math.abs(t - d * k) * .5;
							switch (i) {
							case "topLeft":
								h = 0;
								break;
							case "topCenter":
								h = "-" + l + "px";
								break;
							case "topRight":
								h = "-" + l * 2 + "px";
								break;
							case "centerLeft":
								h = 0;
								break;
							case "center":
								h = "-" + l + "px";
								break;
							case "centerRight":
								h = "-" + l * 2 + "px";
								break;
							case "bottomLeft":
								h = 0;
								break;
							case "bottomCenter":
								h = "-" + l + "px";
								break;
							case "bottomRight":
								h = "-" + l * 2 + "px";
								break
							}
							c.css({
								height : u,
								"margin-left" : h,
								"margin-top" : 0,
								position : "absolute",
								visibility : "visible",
								width : d * k
							})
						}
					} else {
						if (d / e < t / u) {
							var k = u / e;
							var l = Math.abs(t - d * k) * .5;
							switch (i) {
							case "topLeft":
								h = 0;
								break;
							case "topCenter":
								h = l + "px";
								break;
							case "topRight":
								h = l * 2 + "px";
								break;
							case "centerLeft":
								h = 0;
								break;
							case "center":
								h = l + "px";
								break;
							case "centerRight":
								h = l * 2 + "px";
								break;
							case "bottomLeft":
								h = 0;
								break;
							case "bottomCenter":
								h = l + "px";
								break;
							case "bottomRight":
								h = l * 2 + "px";
								break
							}
							c.css({
								height : u,
								"margin-left" : h,
								"margin-top" : 0,
								position : "absolute",
								visibility : "visible",
								width : d * k
							})
						} else {
							var k = t / d;
							var l = Math.abs(u - e * k) * .5;
							switch (i) {
							case "topLeft":
								g = 0;
								break;
							case "topCenter":
								g = 0;
								break;
							case "topRight":
								g = 0;
								break;
							case "centerLeft":
								g = l + "px";
								break;
							case "center":
								g = l + "px";
								break;
							case "centerRight":
								g = l + "px";
								break;
							case "bottomLeft":
								g = l * 2 + "px";
								break;
							case "bottomCenter":
								g = l * 2 + "px";
								break;
							case "bottomRight":
								g = l * 2 + "px";
								break
							}
							c.css({
								height : e * k,
								"margin-left" : 0,
								"margin-top" : g,
								position : "absolute",
								visibility : "visible",
								width : t
							})
						}
					}
				})
			}
			var c;
			if (I == true) {
				clearTimeout(c);
				c = setTimeout(d, 200)
			} else {
				d()
			}
			I = true
		}
		function X(a) {
			for (var b, c, d = a.length; d; b = parseInt(Math.random() * d), c = a[--d], a[d] = a[b], a[b] = c);
			return a
		}
		function Y(a) {
			return Math.ceil(a) == Math.floor(a)
		}
		function hb() {
			if (a(s).length && !a(r).length) {
				var b = a(s).outerWidth(),
				c = a("ul > li", s).outerWidth(),
				d = a("li.cameracurrent", s).length ? a("li.cameracurrent", s).position() : "",
				e = a("ul > li", s).length * a("ul > li", s).outerWidth(),
				g = a("ul", s).offset().left,
				h = a("> div", s).offset().left,
				i;
				if (g < 0) {
					i = "-" + (h - g)
				} else {
					i = h - g
				}
				if (gb == true) {
					a("ul", s).width(a("ul > li", s).length * a("ul > li", s).outerWidth());
					if (a(s).length && !a(r).lenght) {
						f.css({
							marginBottom : a(s).outerHeight()
						})
					}
					H();
					a("ul", s).width(a("ul > li", s).length * a("ul > li", s).outerWidth());
					if (a(s).length && !a(r).lenght) {
						f.css({
							marginBottom : a(s).outerHeight()
						})
					}
				}
				gb = false;
				var j = a("li.cameracurrent", s).length ? d.left : "",
				k = a("li.cameracurrent", s).length ? d.left + a("li.cameracurrent", s).outerWidth() : "";
				if (j < a("li.cameracurrent", s).outerWidth()) {
					j = 0
				}
				if (k - i > b) {
					if (j + b < e) {
						a("ul", s).animate({
							"margin-left" : "-" + j + "px"
						}, 500, H)
					} else {
						a("ul", s).animate({
							"margin-left" : "-" + (a("ul", s).outerWidth() - b) + "px"
						}, 500, H)
					}
				} else if (j - i < 0) {
					a("ul", s).animate({
						"margin-left" : "-" + j + "px"
					}, 500, H)
				} else {
					a("ul", s).css({
						"margin-left" : "auto",
						"margin-right" : "auto"
					});
					setTimeout(H, 100)
				}
			}
		}
		function ib() {
			bb = 0;
			var c = a(".camera_bar_cont", V).width(),
			d = a(".camera_bar_cont", V).height();
			if (h != "pie") {
				switch (U) {
				case "leftToRight":
					a("#" + i).css({
						right : c
					});
					break;
				case "rightToLeft":
					a("#" + i).css({
						left : c
					});
					break;
				case "topToBottom":
					a("#" + i).css({
						bottom : d
					});
					break;
				case "bottomToTop":
					a("#" + i).css({
						top : d
					});
					break
				}
			} else {
				db.clearRect(0, 0, b.pieDiameter, b.pieDiameter)
			}
		}
		function jb(c) {
			j.addClass("camerasliding");
			R = false;
			var d = parseFloat(a("div.cameraSlide.cameracurrent", k).index());
			if (c > 0) {
				var l = c - 1
			} else if (d == B - 1) {
				var l = 0
			} else {
				var l = d + 1
			}
			var m = a(".cameraSlide:eq(" + l + ")", k);
			var n = a(".cameraSlide:eq(" + (l + 1) + ")", k).addClass("cameranext");
			if (d != l + 1) {
				n.hide()
			}
			a(".cameraContent", g).fadeOut(600);
			a(".camera_caption", g).show();
			a(".camerarelative", m).append(a("> div ", j).eq(l).find("> div.camera_effected"));
			a(".camera_target_content .cameraContent:eq(" + l + ")", f).append(a("> div ", j).eq(l).find("> div"));
			if (!a(".imgLoaded", m).length) {
				var o = v[l];
				var p = new Image;
				p.src = o + "?" + (new Date).getTime();
				m.css("visibility", "hidden");
				m.prepend(a(p).attr("class", "imgLoaded").css("visibility", "hidden"));
				var q,
				w;
				if (!a(p).get(0).complete || q == "0" || w == "0" || typeof q === "undefined" || q === false || typeof w === "undefined" || w === false) {
					a(".camera_loader", f).delay(500).fadeIn(400);
					p.onload = function () {
						q = p.naturalWidth;
						w = p.naturalHeight;
						a(p).attr("data-alignment", z[l]).attr("data-portrait", y[l]);
						a(p).attr("width", q);
						a(p).attr("height", w);
						k.find(".cameraSlide_" + l).hide().css("visibility", "visible");
						K();
						jb(l + 1)
					}
				}
			} else {
				if (v.length > l + 1 && !a(".imgLoaded", n).length) {
					var x = v[l + 1];
					var A = new Image;
					A.src = x + "?" + (new Date).getTime();
					n.prepend(a(A).attr("class", "imgLoaded").css("visibility", "hidden"));
					A.onload = function () {
						q = A.naturalWidth;
						w = A.naturalHeight;
						a(A).attr("data-alignment", z[l + 1]).attr("data-portrait", y[l + 1]);
						a(A).attr("width", q);
						a(A).attr("height", w);
						K()
					}
				}
				b.onLoaded.call(this);
				if (a(".camera_loader", f).is(":visible")) {
					a(".camera_loader", f).fadeOut(400)
				} else {
					a(".camera_loader", f).css({
						visibility : "hidden"
					});
					a(".camera_loader", f).fadeOut(400, function () {
						a(".camera_loader", f).css({
							visibility : "visible"
						})
					})
				}
				var C = b.rows,
				D = b.cols,
				F = 1,
				G = 0,
				H,
				I,
				J,
				N,
				O,
				P = new Array("simpleFade", "curtainTopLeft", "curtainTopRight", "curtainBottomLeft", "curtainBottomRight", "curtainSliceLeft", "curtainSliceRight", "blindCurtainTopLeft", "blindCurtainTopRight", "blindCurtainBottomLeft", "blindCurtainBottomRight", "blindCurtainSliceBottom", "blindCurtainSliceTop", "stampede", "mosaic", "mosaicReverse", "mosaicRandom", "mosaicSpiral", "mosaicSpiralReverse", "topLeftBottomRight", "bottomRightTopLeft", "bottomLeftTopRight", "topRightBottomLeft", "scrollLeft", "scrollRight", "scrollTop", "scrollBottom", "scrollHorz");
				marginLeft = 0,
				marginTop = 0,
				opacityOnGrid = 0;
				if (b.opacityOnGrid == true) {
					opacityOnGrid = 0
				} else {
					opacityOnGrid = 1
				}
				var Q = a(" > div", j).eq(l).attr("data-fx");
				if (e() && b.mobileFx != "" && b.mobileFx != "default") {
					N = b.mobileFx
				} else {
					if (typeof Q !== "undefined" && Q !== false && Q !== "default") {
						N = Q
					} else {
						N = b.fx
					}
				}
				if (N == "random") {
					N = X(P);
					N = N[0]
				} else {
					N = N;
					if (N.indexOf(",") > 0) {
						N = N.replace(/ /g, "");
						N = N.split(",");
						N = X(N);
						N = N[0]
					}
				}
				dataEasing = a(" > div", j).eq(l).attr("data-easing");
				mobileEasing = a(" > div", j).eq(l).attr("data-mobileEasing");
				if (e() && b.mobileEasing != "" && b.mobileEasing != "default") {
					if (typeof mobileEasing !== "undefined" && mobileEasing !== false && mobileEasing !== "default") {
						O = mobileEasing
					} else {
						O = b.mobileEasing
					}
				} else {
					if (typeof dataEasing !== "undefined" && dataEasing !== false && dataEasing !== "default") {
						O = dataEasing
					} else {
						O = b.easing
					}
				}
				H = a(" > div", j).eq(l).attr("data-slideOn");
				if (typeof H !== "undefined" && H !== false) {
					T = H
				} else {
					if (b.slideOn == "random") {
						var T = new Array("next", "prev");
						T = X(T);
						T = T[0]
					} else {
						T = b.slideOn
					}
				}
				var Y = a(" > div", j).eq(l).attr("data-time");
				if (typeof Y !== "undefined" && Y !== false && Y !== "") {
					I = parseFloat(Y)
				} else {
					I = b.time
				}
				var Z = a(" > div", j).eq(l).attr("data-transPeriod");
				if (typeof Z !== "undefined" && Z !== false && Z !== "") {
					J = parseFloat(Z)
				} else {
					J = b.transPeriod
				}
				if (!a(j).hasClass("camerastarted")) {
					N = "simpleFade";
					T = "next";
					O = "";
					J = 400;
					a(j).addClass("camerastarted")
				}
				switch (N) {
				case "simpleFade":
					D = 1;
					C = 1;
					break;
				case "curtainTopLeft":
					if (b.slicedCols == 0) {
						D = b.cols
					} else {
						D = b.slicedCols
					}
					C = 1;
					break;
				case "curtainTopRight":
					if (b.slicedCols == 0) {
						D = b.cols
					} else {
						D = b.slicedCols
					}
					C = 1;
					break;
				case "curtainBottomLeft":
					if (b.slicedCols == 0) {
						D = b.cols
					} else {
						D = b.slicedCols
					}
					C = 1;
					break;
				case "curtainBottomRight":
					if (b.slicedCols == 0) {
						D = b.cols
					} else {
						D = b.slicedCols
					}
					C = 1;
					break;
				case "curtainSliceLeft":
					if (b.slicedCols == 0) {
						D = b.cols
					} else {
						D = b.slicedCols
					}
					C = 1;
					break;
				case "curtainSliceRight":
					if (b.slicedCols == 0) {
						D = b.cols
					} else {
						D = b.slicedCols
					}
					C = 1;
					break;
				case "blindCurtainTopLeft":
					if (b.slicedRows == 0) {
						C = b.rows
					} else {
						C = b.slicedRows
					}
					D = 1;
					break;
				case "blindCurtainTopRight":
					if (b.slicedRows == 0) {
						C = b.rows
					} else {
						C = b.slicedRows
					}
					D = 1;
					break;
				case "blindCurtainBottomLeft":
					if (b.slicedRows == 0) {
						C = b.rows
					} else {
						C = b.slicedRows
					}
					D = 1;
					break;
				case "blindCurtainBottomRight":
					if (b.slicedRows == 0) {
						C = b.rows
					} else {
						C = b.slicedRows
					}
					D = 1;
					break;
				case "blindCurtainSliceTop":
					if (b.slicedRows == 0) {
						C = b.rows
					} else {
						C = b.slicedRows
					}
					D = 1;
					break;
				case "blindCurtainSliceBottom":
					if (b.slicedRows == 0) {
						C = b.rows
					} else {
						C = b.slicedRows
					}
					D = 1;
					break;
				case "stampede":
					G = "-" + J;
					break;
				case "mosaic":
					G = b.gridDifference;
					break;
				case "mosaicReverse":
					G = b.gridDifference;
					break;
				case "mosaicRandom":
					break;
				case "mosaicSpiral":
					G = b.gridDifference;
					F = 1.7;
					break;
				case "mosaicSpiralReverse":
					G = b.gridDifference;
					F = 1.7;
					break;
				case "topLeftBottomRight":
					G = b.gridDifference;
					F = 6;
					break;
				case "bottomRightTopLeft":
					G = b.gridDifference;
					F = 6;
					break;
				case "bottomLeftTopRight":
					G = b.gridDifference;
					F = 6;
					break;
				case "topRightBottomLeft":
					G = b.gridDifference;
					F = 6;
					break;
				case "scrollLeft":
					D = 1;
					C = 1;
					break;
				case "scrollRight":
					D = 1;
					C = 1;
					break;
				case "scrollTop":
					D = 1;
					C = 1;
					break;
				case "scrollBottom":
					D = 1;
					C = 1;
					break;
				case "scrollHorz":
					D = 1;
					C = 1;
					break
				}
				var _ = 0;
				var ab = C * D;
				var eb = t - Math.floor(t / D) * D;
				var fb = u - Math.floor(u / C) * C;
				var gb;
				var kb;
				var lb = 0;
				var mb = 0;
				var nb = new Array;
				var ob = new Array;
				var pb = new Array;
				while (_ < ab) {
					nb.push(_);
					ob.push(_);
					E.append('<div class="cameraappended" style="display:none; overflow:hidden; position:absolute; z-index:1000" />');
					var qb = a(".cameraappended:eq(" + _ + ")", k);
					if (N == "scrollLeft" || N == "scrollRight" || N == "scrollTop" || N == "scrollBottom" || N == "scrollHorz") {
						S.eq(l).clone().show().appendTo(qb)
					} else {
						if (T == "next") {
							S.eq(l).clone().show().appendTo(qb)
						} else {
							S.eq(d).clone().show().appendTo(qb)
						}
					}
					if (_ % D < eb) {
						gb = 1
					} else {
						gb = 0
					}
					if (_ % D == 0) {
						lb = 0
					}
					if (Math.floor(_ / D) < fb) {
						kb = 1
					} else {
						kb = 0
					}
					qb.css({
						height : Math.floor(u / C + kb + 1),
						left : lb,
						top : mb,
						width : Math.floor(t / D + gb + 1)
					});
					a("> .cameraSlide", qb).css({
						height : u,
						"margin-left" : "-" + lb + "px",
						"margin-top" : "-" + mb + "px",
						width : t
					});
					lb = lb + qb.width() - 1;
					if (_ % D == D - 1) {
						mb = mb + qb.height() - 1
					}
					_++
				}
				switch (N) {
				case "curtainTopLeft":
					break;
				case "curtainBottomLeft":
					break;
				case "curtainSliceLeft":
					break;
				case "curtainTopRight":
					nb = nb.reverse();
					break;
				case "curtainBottomRight":
					nb = nb.reverse();
					break;
				case "curtainSliceRight":
					nb = nb.reverse();
					break;
				case "blindCurtainTopLeft":
					break;
				case "blindCurtainBottomLeft":
					nb = nb.reverse();
					break;
				case "blindCurtainSliceTop":
					break;
				case "blindCurtainTopRight":
					break;
				case "blindCurtainBottomRight":
					nb = nb.reverse();
					break;
				case "blindCurtainSliceBottom":
					nb = nb.reverse();
					break;
				case "stampede":
					nb = X(nb);
					break;
				case "mosaic":
					break;
				case "mosaicReverse":
					nb = nb.reverse();
					break;
				case "mosaicRandom":
					nb = X(nb);
					break;
				case "mosaicSpiral":
					var rb = C / 2,
					sb,
					tb,
					ub,
					vb = 0;
					for (ub = 0; ub < rb; ub++) {
						tb = ub;
						for (sb = ub; sb < D - ub - 1; sb++) {
							pb[vb++] = tb * D + sb
						}
						sb = D - ub - 1;
						for (tb = ub; tb < C - ub - 1; tb++) {
							pb[vb++] = tb * D + sb
						}
						tb = C - ub - 1;
						for (sb = D - ub - 1; sb > ub; sb--) {
							pb[vb++] = tb * D + sb
						}
						sb = ub;
						for (tb = C - ub - 1; tb > ub; tb--) {
							pb[vb++] = tb * D + sb
						}
					}
					nb = pb;
					break;
				case "mosaicSpiralReverse":
					var rb = C / 2,
					sb,
					tb,
					ub,
					vb = ab - 1;
					for (ub = 0; ub < rb; ub++) {
						tb = ub;
						for (sb = ub; sb < D - ub - 1; sb++) {
							pb[vb--] = tb * D + sb
						}
						sb = D - ub - 1;
						for (tb = ub; tb < C - ub - 1; tb++) {
							pb[vb--] = tb * D + sb
						}
						tb = C - ub - 1;
						for (sb = D - ub - 1; sb > ub; sb--) {
							pb[vb--] = tb * D + sb
						}
						sb = ub;
						for (tb = C - ub - 1; tb > ub; tb--) {
							pb[vb--] = tb * D + sb
						}
					}
					nb = pb;
					break;
				case "topLeftBottomRight":
					for (var tb = 0; tb < C; tb++)
						for (var sb = 0; sb < D; sb++) {
							pb.push(sb + tb)
						}
					ob = pb;
					break;
				case "bottomRightTopLeft":
					for (var tb = 0; tb < C; tb++)
						for (var sb = 0; sb < D; sb++) {
							pb.push(sb + tb)
						}
					ob = pb.reverse();
					break;
				case "bottomLeftTopRight":
					for (var tb = C; tb > 0; tb--)
						for (var sb = 0; sb < D; sb++) {
							pb.push(sb + tb)
						}
					ob = pb;
					break;
				case "topRightBottomLeft":
					for (var tb = 0; tb < C; tb++)
						for (var sb = D; sb > 0; sb--) {
							pb.push(sb + tb)
						}
					ob = pb;
					break
				}
				a.each(nb, function (c, e) {
					function o() {
						a(this).addClass("cameraeased");
						if (a(".cameraeased", k).length >= 0) {
							a(s).css({
								visibility : "visible"
							})
						}
						if (a(".cameraeased", k).length == ab) {
							hb();
							a(".moveFromLeft, .moveFromRight, .moveFromTop, .moveFromBottom, .fadeIn, .fadeFromLeft, .fadeFromRight, .fadeFromTop, .fadeFromBottom", g).each(function () {
								a(this).css("visibility", "hidden")
							});
							S.eq(l).show().css("z-index", "999").removeClass("cameranext").addClass("cameracurrent");
							S.eq(d).css("z-index", "1").removeClass("cameracurrent");
							a(".cameraContent", g).eq(l).addClass("cameracurrent");
							if (d >= 0) {
								a(".cameraContent", g).eq(d).removeClass("cameracurrent")
							}
							b.onEndTransition.call(this);
							if (a("> div", j).eq(l).attr("data-video") != "hide" && a(".cameraContent.cameracurrent .imgFake", g).length) {
								a(".cameraContent.cameracurrent .imgFake", g).click()
							}
							var c = S.eq(l).find(".fadeIn").length;
							var e = a(".cameraContent", g).eq(l).find(".moveFromLeft, .moveFromRight, .moveFromTop, .moveFromBottom, .fadeIn, .fadeFromLeft, .fadeFromRight, .fadeFromTop, .fadeFromBottom").length;
							if (c != 0) {
								a(".cameraSlide.cameracurrent .fadeIn", g).each(function () {
									if (a(this).attr("data-easing") != "") {
										var b = a(this).attr("data-easing")
									} else {
										var b = O
									}
									var d = a(this);
									if (typeof d.attr("data-outerWidth") === "undefined" || d.attr("data-outerWidth") === false || d.attr("data-outerWidth") === "") {
										var e = d.outerWidth();
										d.attr("data-outerWidth", e)
									} else {
										var e = d.attr("data-outerWidth")
									}
									if (typeof d.attr("data-outerHeight") === "undefined" || d.attr("data-outerHeight") === false || d.attr("data-outerHeight") === "") {
										var f = d.outerHeight();
										d.attr("data-outerHeight", f)
									} else {
										var f = d.attr("data-outerHeight")
									}
									var g = d.position();
									var h = g.left;
									var i = g.top;
									var j = d.attr("class");
									var k = d.index();
									var l = d.parents(".camerarelative").outerHeight();
									var m = d.parents(".camerarelative").outerWidth();
									if (j.indexOf("fadeIn") != -1) {
										d.animate({
											opacity : 0
										}, 0).css("visibility", "visible").delay(I / c * .1 * (k - 1)).animate({
											opacity : 1
										}, I / c * .15, b)
									} else {
										d.css("visibility", "visible")
									}
								})
							}
							a(".cameraContent.cameracurrent", g).show();
							if (e != 0) {
								a(".cameraContent.cameracurrent .moveFromLeft, .cameraContent.cameracurrent .moveFromRight, .cameraContent.cameracurrent .moveFromTop, .cameraContent.cameracurrent .moveFromBottom, .cameraContent.cameracurrent .fadeIn, .cameraContent.cameracurrent .fadeFromLeft, .cameraContent.cameracurrent .fadeFromRight, .cameraContent.cameracurrent .fadeFromTop, .cameraContent.cameracurrent .fadeFromBottom", g).each(function () {
									if (a(this).attr("data-easing") != "") {
										var b = a(this).attr("data-easing")
									} else {
										var b = O
									}
									var c = a(this);
									var d = c.position();
									var f = d.left;
									var g = d.top;
									var h = c.attr("class");
									var i = c.index();
									var j = c.outerHeight();
									if (h.indexOf("moveFromLeft") != -1) {
										c.css({
											left : "-" + t + "px",
											right : "auto"
										});
										c.css("visibility", "visible").delay(I / e * .1 * (i - 1)).animate({
											left : d.left
										}, I / e * .15, b)
									} else if (h.indexOf("moveFromRight") != -1) {
										c.css({
											left : t + "px",
											right : "auto"
										});
										c.css("visibility", "visible").delay(I / e * .1 * (i - 1)).animate({
											left : d.left
										}, I / e * .15, b)
									} else if (h.indexOf("moveFromTop") != -1) {
										c.css({
											top : "-" + u + "px",
											bottom : "auto"
										});
										c.css("visibility", "visible").delay(I / e * .1 * (i - 1)).animate({
											top : d.top
										}, I / e * .15, b, function () {
											c.css({
												top : "auto",
												bottom : 0
											})
										})
									} else if (h.indexOf("moveFromBottom") != -1) {
										c.css({
											top : u + "px",
											bottom : "auto"
										});
										c.css("visibility", "visible").delay(I / e * .1 * (i - 1)).animate({
											top : d.top
										}, I / e * .15, b)
									} else if (h.indexOf("fadeFromLeft") != -1) {
										c.animate({
											opacity : 0
										}, 0).css({
											left : "-" + t + "px",
											right : "auto"
										});
										c.css("visibility", "visible").delay(I / e * .1 * (i - 1)).animate({
											left : d.left,
											opacity : 1
										}, I / e * .15, b)
									} else if (h.indexOf("fadeFromRight") != -1) {
										c.animate({
											opacity : 0
										}, 0).css({
											left : t + "px",
											right : "auto"
										});
										c.css("visibility", "visible").delay(I / e * .1 * (i - 1)).animate({
											left : d.left,
											opacity : 1
										}, I / e * .15, b)
									} else if (h.indexOf("fadeFromTop") != -1) {
										c.animate({
											opacity : 0
										}, 0).css({
											top : "-" + u + "px",
											bottom : "auto"
										});
										c.css("visibility", "visible").delay(I / e * .1 * (i - 1)).animate({
											top : d.top,
											opacity : 1
										}, I / e * .15, b, function () {
											c.css({
												top : "auto",
												bottom : 0
											})
										})
									} else if (h.indexOf("fadeFromBottom") != -1) {
										c.animate({
											opacity : 0
										}, 0).css({
											bottom : "-" + j + "px"
										});
										c.css("visibility", "visible").delay(I / e * .1 * (i - 1)).animate({
											bottom : "0",
											opacity : 1
										}, I / e * .15, b)
									} else if (h.indexOf("fadeIn") != -1) {
										c.animate({
											opacity : 0
										}, 0).css("visibility", "visible").delay(I / e * .1 * (i - 1)).animate({
											opacity : 1
										}, I / e * .15, b)
									} else {
										c.css("visibility", "visible")
									}
								})
							}
							a(".cameraappended", k).remove();
							j.removeClass("camerasliding");
							S.eq(d).hide();
							var f = a(".camera_bar_cont", V).width(),
							m = a(".camera_bar_cont", V).height(),
							o;
							if (h != "pie") {
								o = .05
							} else {
								o = .005
							}
							a("#" + i).animate({
								opacity : b.loaderOpacity
							}, 200);
							L = setInterval(function () {
									if (j.hasClass("stopped")) {
										clearInterval(L)
									}
									if (h != "pie") {
										if (bb <= 1.002 && !j.hasClass("stopped") && !j.hasClass("paused") && !j.hasClass("hovered")) {
											bb = bb + o
										} else if (bb <= 1 && (j.hasClass("stopped") || j.hasClass("paused") || j.hasClass("stopped") || j.hasClass("hovered"))) {
											bb = bb
										} else {
											if (!j.hasClass("stopped") && !j.hasClass("paused") && !j.hasClass("hovered")) {
												clearInterval(L);
												W();
												a("#" + i).animate({
													opacity : 0
												}, 200, function () {
													clearTimeout(M);
													M = setTimeout(ib, n);
													jb();
													b.onStartLoading.call(this)
												})
											}
										}
										switch (U) {
										case "leftToRight":
											a("#" + i).animate({
												right : f - f * bb
											}, I * o, "linear");
											break;
										case "rightToLeft":
											a("#" + i).animate({
												left : f - f * bb
											}, I * o, "linear");
											break;
										case "topToBottom":
											a("#" + i).animate({
												bottom : m - m * bb
											}, I * o, "linear");
											break;
										case "bottomToTop":
											a("#" + i).animate({
												bottom : m - m * bb
											}, I * o, "linear");
											break
										}
									} else {
										cb = bb;
										db.clearRect(0, 0, b.pieDiameter, b.pieDiameter);
										db.globalCompositeOperation = "destination-over";
										db.beginPath();
										db.arc(b.pieDiameter / 2, b.pieDiameter / 2, b.pieDiameter / 2 - b.loaderStroke, 0, Math.PI * 2, false);
										db.lineWidth = b.loaderStroke;
										db.strokeStyle = b.loaderBgColor;
										db.stroke();
										db.closePath();
										db.globalCompositeOperation = "source-over";
										db.beginPath();
										db.arc(b.pieDiameter / 2, b.pieDiameter / 2, b.pieDiameter / 2 - b.loaderStroke, 0, Math.PI * 2 * cb, false);
										db.lineWidth = b.loaderStroke - b.loaderPadding * 2;
										db.strokeStyle = b.loaderColor;
										db.stroke();
										db.closePath();
										if (bb <= 1.002 && !j.hasClass("stopped") && !j.hasClass("paused") && !j.hasClass("hovered")) {
											bb = bb + o
										} else if (bb <= 1 && (j.hasClass("stopped") || j.hasClass("paused") || j.hasClass("hovered"))) {
											bb = bb
										} else {
											if (!j.hasClass("stopped") && !j.hasClass("paused") && !j.hasClass("hovered")) {
												clearInterval(L);
												W();
												a("#" + i + ", .camera_canvas_wrap", V).animate({
													opacity : 0
												}, 200, function () {
													clearTimeout(M);
													M = setTimeout(ib, n);
													jb();
													b.onStartLoading.call(this)
												})
											}
										}
									}
								}, I * o)
						}
					}
					if (e % D < eb) {
						gb = 1
					} else {
						gb = 0
					}
					if (e % D == 0) {
						lb = 0
					}
					if (Math.floor(e / D) < fb) {
						kb = 1
					} else {
						kb = 0
					}
					switch (N) {
					case "simpleFade":
						height = u;
						width = t;
						opacityOnGrid = 0;
						break;
					case "curtainTopLeft":
						height = 0,
						width = Math.floor(t / D + gb + 1),
						marginTop = "-" + Math.floor(u / C + kb + 1) + "px";
						break;
					case "curtainTopRight":
						height = 0,
						width = Math.floor(t / D + gb + 1),
						marginTop = "-" + Math.floor(u / C + kb + 1) + "px";
						break;
					case "curtainBottomLeft":
						height = 0,
						width = Math.floor(t / D + gb + 1),
						marginTop = Math.floor(u / C + kb + 1) + "px";
						break;
					case "curtainBottomRight":
						height = 0,
						width = Math.floor(t / D + gb + 1),
						marginTop = Math.floor(u / C + kb + 1) + "px";
						break;
					case "curtainSliceLeft":
						height = 0,
						width = Math.floor(t / D + gb + 1);
						if (e % 2 == 0) {
							marginTop = Math.floor(u / C + kb + 1) + "px"
						} else {
							marginTop = "-" + Math.floor(u / C + kb + 1) + "px"
						}
						break;
					case "curtainSliceRight":
						height = 0,
						width = Math.floor(t / D + gb + 1);
						if (e % 2 == 0) {
							marginTop = Math.floor(u / C + kb + 1) + "px"
						} else {
							marginTop = "-" + Math.floor(u / C + kb + 1) + "px"
						}
						break;
					case "blindCurtainTopLeft":
						height = Math.floor(u / C + kb + 1),
						width = 0,
						marginLeft = "-" + Math.floor(t / D + gb + 1) + "px";
						break;
					case "blindCurtainTopRight":
						height = Math.floor(u / C + kb + 1),
						width = 0,
						marginLeft = Math.floor(t / D + gb + 1) + "px";
						break;
					case "blindCurtainBottomLeft":
						height = Math.floor(u / C + kb + 1),
						width = 0,
						marginLeft = "-" + Math.floor(t / D + gb + 1) + "px";
						break;
					case "blindCurtainBottomRight":
						height = Math.floor(u / C + kb + 1),
						width = 0,
						marginLeft = Math.floor(t / D + gb + 1) + "px";
						break;
					case "blindCurtainSliceBottom":
						height = Math.floor(u / C + kb + 1),
						width = 0;
						if (e % 2 == 0) {
							marginLeft = "-" + Math.floor(t / D + gb + 1) + "px"
						} else {
							marginLeft = Math.floor(t / D + gb + 1) + "px"
						}
						break;
					case "blindCurtainSliceTop":
						height = Math.floor(u / C + kb + 1),
						width = 0;
						if (e % 2 == 0) {
							marginLeft = "-" + Math.floor(t / D + gb + 1) + "px"
						} else {
							marginLeft = Math.floor(t / D + gb + 1) + "px"
						}
						break;
					case "stampede":
						height = 0;
						width = 0;
						marginLeft = t * .2 * (c % D - (D - Math.floor(D / 2))) + "px";
						marginTop = u * .2 * (Math.floor(c / D) + 1 - (C - Math.floor(C / 2))) + "px";
						break;
					case "mosaic":
						height = 0;
						width = 0;
						break;
					case "mosaicReverse":
						height = 0;
						width = 0;
						marginLeft = Math.floor(t / D + gb + 1) + "px";
						marginTop = Math.floor(u / C + kb + 1) + "px";
						break;
					case "mosaicRandom":
						height = 0;
						width = 0;
						marginLeft = Math.floor(t / D + gb + 1) * .5 + "px";
						marginTop = Math.floor(u / C + kb + 1) * .5 + "px";
						break;
					case "mosaicSpiral":
						height = 0;
						width = 0;
						marginLeft = Math.floor(t / D + gb + 1) * .5 + "px";
						marginTop = Math.floor(u / C + kb + 1) * .5 + "px";
						break;
					case "mosaicSpiralReverse":
						height = 0;
						width = 0;
						marginLeft = Math.floor(t / D + gb + 1) * .5 + "px";
						marginTop = Math.floor(u / C + kb + 1) * .5 + "px";
						break;
					case "topLeftBottomRight":
						height = 0;
						width = 0;
						break;
					case "bottomRightTopLeft":
						height = 0;
						width = 0;
						marginLeft = Math.floor(t / D + gb + 1) + "px";
						marginTop = Math.floor(u / C + kb + 1) + "px";
						break;
					case "bottomLeftTopRight":
						height = 0;
						width = 0;
						marginLeft = 0;
						marginTop = Math.floor(u / C + kb + 1) + "px";
						break;
					case "topRightBottomLeft":
						height = 0;
						width = 0;
						marginLeft = Math.floor(t / D + gb + 1) + "px";
						marginTop = 0;
						break;
					case "scrollRight":
						height = u;
						width = t;
						marginLeft = -t;
						break;
					case "scrollLeft":
						height = u;
						width = t;
						marginLeft = t;
						break;
					case "scrollTop":
						height = u;
						width = t;
						marginTop = u;
						break;
					case "scrollBottom":
						height = u;
						width = t;
						marginTop = -u;
						break;
					case "scrollHorz":
						height = u;
						width = t;
						if (d == 0 && l == B - 1) {
							marginLeft = -t
						} else if (d < l || d == B - 1 && l == 0) {
							marginLeft = t
						} else {
							marginLeft = -t
						}
						break
					}
					var m = a(".cameraappended:eq(" + e + ")", k);
					if (typeof L !== "undefined") {
						clearInterval(L);
						clearTimeout(M);
						M = setTimeout(ib, J + G)
					}
					if (a(r).length) {
						a(".camera_pag li", f).removeClass("cameracurrent");
						a(".camera_pag li", f).eq(l).addClass("cameracurrent")
					}
					if (a(s).length) {
						a("li", s).removeClass("cameracurrent");
						a("li", s).eq(l).addClass("cameracurrent");
						a("li", s).not(".cameracurrent").find("img").animate({
							opacity : .5
						}, 0);
						a("li.cameracurrent img", s).animate({
							opacity : 1
						}, 0);
						a("li", s).hover(function () {
							a("img", this).stop(true, false).animate({
								opacity : 1
							}, 150)
						}, function () {
							if (!a(this).hasClass("cameracurrent")) {
								a("img", this).stop(true, false).animate({
									opacity : .5
								}, 150)
							}
						})
					}
					var n = parseFloat(J) + parseFloat(G);
					if (N == "scrollLeft" || N == "scrollRight" || N == "scrollTop" || N == "scrollBottom" || N == "scrollHorz") {
						b.onStartTransition.call(this);
						n = 0;
						m.delay((J + G) / ab * ob[c] * F * .5).css({
							display : "block",
							height : height,
							"margin-left" : marginLeft,
							"margin-top" : marginTop,
							width : width
						}).animate({
							height : Math.floor(u / C + kb + 1),
							"margin-top" : 0,
							"margin-left" : 0,
							width : Math.floor(t / D + gb + 1)
						}, J - G, O, o);
						S.eq(d).delay((J + G) / ab * ob[c] * F * .5).animate({
							"margin-left" : marginLeft * -1,
							"margin-top" : marginTop * -1
						}, J - G, O, function () {
							a(this).css({
								"margin-top" : 0,
								"margin-left" : 0
							})
						})
					} else {
						b.onStartTransition.call(this);
						n = parseFloat(J) + parseFloat(G);
						if (T == "next") {
							m.delay((J + G) / ab * ob[c] * F * .5).css({
								display : "block",
								height : height,
								"margin-left" : marginLeft,
								"margin-top" : marginTop,
								width : width,
								opacity : opacityOnGrid
							}).animate({
								height : Math.floor(u / C + kb + 1),
								"margin-top" : 0,
								"margin-left" : 0,
								opacity : 1,
								width : Math.floor(t / D + gb + 1)
							}, J - G, O, o)
						} else {
							S.eq(l).show().css("z-index", "999").addClass("cameracurrent");
							S.eq(d).css("z-index", "1").removeClass("cameracurrent");
							a(".cameraContent", g).eq(l).addClass("cameracurrent");
							a(".cameraContent", g).eq(d).removeClass("cameracurrent");
							m.delay((J + G) / ab * ob[c] * F * .5).css({
								display : "block",
								height : Math.floor(u / C + kb + 1),
								"margin-top" : 0,
								"margin-left" : 0,
								opacity : 1,
								width : Math.floor(t / D + gb + 1)
							}).animate({
								height : height,
								"margin-left" : marginLeft,
								"margin-top" : marginTop,
								width : width,
								opacity : opacityOnGrid
							}, J - G, O, o)
						}
					}
				})
			}
		}
		var d = {
			alignment : "center",
			autoAdvance : true,
			mobileAutoAdvance : true,
			barDirection : "leftToRight",
			barPosition : "bottom",
			cols : 6,
			easing : "easeInOutExpo",
			mobileEasing : "",
			fx : "random",
			mobileFx : "",
			gridDifference : 250,
			height : "50%",
			imagePath : "images/",
			hover : true,
			loader : "pie",
			loaderColor : "#eeeeee",
			loaderBgColor : "#222222",
			loaderOpacity : .8,
			loaderPadding : 2,
			loaderStroke : 7,
			minHeight : "200px",
			navigation : true,
			navigationHover : true,
			mobileNavHover : true,
			opacityOnGrid : false,
			overlayer : true,
			pagination : true,
			playPause : true,
			pauseOnClick : true,
			pieDiameter : 38,
			piePosition : "rightTop",
			portrait : false,
			rows : 4,
			slicedCols : 12,
			slicedRows : 8,
			slideOn : "random",
			thumbnails : false,
			time : 7e3,
			transPeriod : 1500,
			onEndTransition : function () {},
			onLoaded : function () {},
			onStartLoading : function () {},
			onStartTransition : function () {}

		};
		var b = a.extend({}, d, b);
		var f = a(this).addClass("camera_wrap");
		f.wrapInner('<div class="camera_src" />').wrapInner('<div class="camera_fakehover" />');
		var g = a(".camera_fakehover", f);
		g.append('<div class="camera_target"></div>');
		if (b.overlayer == true) {
			g.append('<div class="camera_overlayer"></div>')
		}
		g.append('<div class="camera_target_content"></div>');
		var h;
		if (b.loader == "pie" && a.browser.msie && a.browser.version < 9) {
			h = "bar"
		} else {
			h = b.loader
		}
		if (h == "pie") {
			g.append('<div class="camera_pie"></div>')
		} else if (h == "bar") {
			g.append('<div class="camera_bar"></div>')
		} else {
			g.append('<div class="camera_bar" style="display:none"></div>')
		}
		if (b.playPause == true) {
			g.append('<div class="camera_commands"></div>')
		}
		if (b.navigation == true) {
			g.append('<div class="camera_prev"><span></span></div>').append('<div class="camera_next"><span></span></div>')
		}
		if (b.thumbnails == true) {
			f.append('<div class="camera_thumbs_cont" />')
		}
		if (b.thumbnails == true && b.pagination != true) {
			a(".camera_thumbs_cont", f).wrap("<div />").wrap('<div class="camera_thumbs" />').wrap("<div />").wrap('<div class="camera_command_wrap" />')
		}
		if (b.pagination == true) {
			f.append('<div class="camera_pag"></div>')
		}
		f.append('<div class="camera_loader"></div>');
		a(".camera_caption", f).each(function () {
			a(this).wrapInner("<div />")
		});
		var i = "pie_" + f.index(),
		j = a(".camera_src", f),
		k = a(".camera_target", f),
		l = a(".camera_target_content", f),
		m = a(".camera_pie", f),
		n = a(".camera_bar", f),
		o = a(".camera_prev", f),
		p = a(".camera_next", f),
		q = a(".camera_commands", f),
		r = a(".camera_pag", f),
		s = a(".camera_thumbs_cont", f);
		var t,
		u;
		var v = new Array;
		a("> div", j).each(function () {
			v.push(a(this).attr("data-src"))
		});
		var w = new Array;
		a("> div", j).each(function () {
			if (a(this).attr("data-link")) {
				w.push(a(this).attr("data-link"))
			} else {
				w.push("")
			}
		});
		var x = new Array;
		a("> div", j).each(function () {
			if (a(this).attr("data-target")) {
				x.push(a(this).attr("data-target"))
			} else {
				x.push("")
			}
		});
		var y = new Array;
		a("> div", j).each(function () {
			if (a(this).attr("data-portrait")) {
				y.push(a(this).attr("data-portrait"))
			} else {
				y.push("")
			}
		});
		var z = new Array;
		a("> div", j).each(function () {
			if (a(this).attr("data-alignment")) {
				z.push(a(this).attr("data-alignment"))
			} else {
				z.push("")
			}
		});
		var A = new Array;
		a("> div", j).each(function () {
			if (a(this).attr("data-thumb")) {
				A.push(a(this).attr("data-thumb"))
			} else {
				A.push("")
			}
		});
		var B = v.length;
		a(l).append('<div class="cameraContents" />');
		var C;
		for (C = 0; C < B; C++) {
			a(".cameraContents", l).append('<div class="cameraContent" />');
			if (w[C] != "") {
				var D = a("> div ", j).eq(C).attr("data-box");
				if (typeof D !== "undefined" && D !== false && D != "") {
					D = 'data-box="' + a("> div ", j).eq(C).attr("data-box") + '"'
				} else {
					D = ""
				}
				a(".camera_target_content .cameraContent:eq(" + C + ")", f).append('<a class="camera_link" href="' + w[C] + '" ' + D + ' target="' + x[C] + '"></a>')
			}
		}
		a(".camera_caption", f).each(function () {
			var b = a(this).parent().index(),
			c = f.find(".cameraContent").eq(b);
			a(this).appendTo(c)
		});
		k.append('<div class="cameraCont" />');
		var E = a(".cameraCont", f);
		var F;
		for (F = 0; F < B; F++) {
			E.append('<div class="cameraSlide cameraSlide_' + F + '" />');
			var G = a("> div:eq(" + F + ")", j);
			k.find(".cameraSlide_" + F).clone(G)
		}
		a(window).bind("load resize pageshow", function () {
			hb();
			H()
		});
		E.append('<div class="cameraSlide cameraSlide_' + F + '" />');
		var I;
		f.show();
		var t = k.width();
		var u = k.height();
		var J;
		a(window).bind("resize pageshow", function () {
			if (I == true) {
				K()
			}
			a("ul", s).animate({
				"margin-top" : 0
			}, 0, hb);
			if (!j.hasClass("paused")) {
				j.addClass("paused");
				if (a(".camera_stop", V).length) {
					a(".camera_stop", V).hide();
					a(".camera_play", V).show();
					if (h != "none") {
						a("#" + i).hide()
					}
				} else {
					if (h != "none") {
						a("#" + i).hide()
					}
				}
				clearTimeout(J);
				J = setTimeout(function () {
						j.removeClass("paused");
						if (a(".camera_play", V).length) {
							a(".camera_play", V).hide();
							a(".camera_stop", V).show();
							if (h != "none") {
								a("#" + i).fadeIn()
							}
						} else {
							if (h != "none") {
								a("#" + i).fadeIn()
							}
						}
					}, 1500)
			}
		});
		var L,
		M;
		var N,
		O,
		P,
		q,
		r;
		var Q,
		R;
		if (e() && b.mobileAutoAdvance != "") {
			O = b.mobileAutoAdvance
		} else {
			O = b.autoAdvance
		}
		if (O == false) {
			j.addClass("paused")
		}
		if (e() && b.mobileNavHover != "") {
			P = b.mobileNavHover
		} else {
			P = b.navigationHover
		}
		if (j.length != 0) {
			var S = a(".cameraSlide", k);
			S.wrapInner('<div class="camerarelative" />');
			var T;
			var U = b.barDirection;
			var V = f;
			a("iframe", g).each(function () {
				var b = a(this);
				var c = b.attr("src");
				b.attr("data-src", c);
				var d = b.parent().index(".camera_src > div");
				a(".camera_target_content .cameraContent:eq(" + d + ")", f).append(b)
			});
			function W() {
				a("iframe", g).each(function () {
					a(".camera_caption", g).show();
					var c = a(this);
					var d = c.attr("data-src");
					c.attr("src", d);
					var e = b.imagePath + "blank.gif";
					var h = new Image;
					h.src = e;
					if (b.height.indexOf("%") != -1) {
						var i = Math.round(t / (100 / parseFloat(b.height)));
						if (b.minHeight != "" && i < parseFloat(b.minHeight)) {
							u = parseFloat(b.minHeight)
						} else {
							u = i
						}
					} else if (b.height == "auto") {
						u = f.height()
					} else {
						u = parseFloat(b.height)
					}
					c.after(a(h).attr({
							"class" : "imgFake",
							width : t,
							height : u
						}));
					var j = c.clone();
					c.remove();
					a(h).bind("click", function () {
						if (a(this).css("position") == "absolute") {
							a(this).remove();
							if (d.indexOf("vimeo") != -1 || d.indexOf("youtube") != -1) {
								if (d.indexOf("?") != -1) {
									autoplay = "&autoplay=1"
								} else {
									autoplay = "?autoplay=1"
								}
							} else if (d.indexOf("dailymotion") != -1) {
								if (d.indexOf("?") != -1) {
									autoplay = "&autoPlay=1"
								} else {
									autoplay = "?autoPlay=1"
								}
							}
							j.attr("src", d + autoplay);
							R = true
						} else {
							a(this).css({
								position : "absolute",
								top : 0,
								left : 0,
								zIndex : 10
							}).after(j);
							j.css({
								position : "absolute",
								top : 0,
								left : 0,
								zIndex : 9
							})
						}
					})
				})
			}
			W();
			if (b.hover == true) {
				if (!e()) {
					g.hover(function () {
						j.addClass("hovered")
					}, function () {
						j.removeClass("hovered")
					})
				}
			}
			if (P == true) {
				a(o, f).animate({
					opacity : 0
				}, 0);
				a(p, f).animate({
					opacity : 0
				}, 0);
				a(q, f).animate({
					opacity : 0
				}, 0);
				if (e()) {
					g.live("vmouseover", function () {
						a(o, f).animate({
							opacity : 1
						}, 200);
						a(p, f).animate({
							opacity : 1
						}, 200);
						a(q, f).animate({
							opacity : 1
						}, 200)
					});
					g.live("vmouseout", function () {
						a(o, f).delay(500).animate({
							opacity : 0
						}, 200);
						a(p, f).delay(500).animate({
							opacity : 0
						}, 200);
						a(q, f).delay(500).animate({
							opacity : 0
						}, 200)
					})
				} else {
					g.hover(function () {
						a(o, f).animate({
							opacity : 1
						}, 200);
						a(p, f).animate({
							opacity : 1
						}, 200);
						a(q, f).animate({
							opacity : 1
						}, 200)
					}, function () {
						a(o, f).animate({
							opacity : 0
						}, 200);
						a(p, f).animate({
							opacity : 0
						}, 200);
						a(q, f).animate({
							opacity : 0
						}, 200)
					})
				}
			}
			a(".camera_stop", V).live("click", function () {
				O = false;
				j.addClass("paused");
				if (a(".camera_stop", V).length) {
					a(".camera_stop", V).hide();
					a(".camera_play", V).show();
					if (h != "none") {
						a("#" + i).hide()
					}
				} else {
					if (h != "none") {
						a("#" + i).hide()
					}
				}
			});
			a(".camera_play", V).live("click", function () {
				O = true;
				j.removeClass("paused");
				if (a(".camera_play", V).length) {
					a(".camera_play", V).hide();
					a(".camera_stop", V).show();
					if (h != "none") {
						a("#" + i).show()
					}
				} else {
					if (h != "none") {
						a("#" + i).show()
					}
				}
			});
			if (b.pauseOnClick == true) {
				a(".camera_target_content", g).mouseup(function () {
					O = false;
					j.addClass("paused");
					a(".camera_stop", V).hide();
					a(".camera_play", V).show();
					a("#" + i).hide()
				})
			}
			a(".cameraContent, .imgFake", g).hover(function () {
				Q = true
			}, function () {
				Q = false
			});
			a(".cameraContent, .imgFake", g).bind("click", function () {
				if (R == true && Q == true) {
					O = false;
					a(".camera_caption", g).hide();
					j.addClass("paused");
					a(".camera_stop", V).hide();
					a(".camera_play", V).show();
					a("#" + i).hide()
				}
			})
		}
		if (h != "pie") {
			n.append('<span class="camera_bar_cont" />');
			a(".camera_bar_cont", n).animate({
				opacity : b.loaderOpacity
			}, 0).css({
				position : "absolute",
				left : 0,
				right : 0,
				top : 0,
				bottom : 0,
				"background-color" : b.loaderBgColor
			}).append('<span id="' + i + '" />');
			a("#" + i).animate({
				opacity : 0
			}, 0);
			var Z = a("#" + i);
			Z.css({
				position : "absolute",
				"background-color" : b.loaderColor
			});
			switch (b.barPosition) {
			case "left":
				n.css({
					right : "auto",
					width : b.loaderStroke
				});
				break;
			case "right":
				n.css({
					left : "auto",
					width : b.loaderStroke
				});
				break;
			case "top":
				n.css({
					bottom : "auto",
					height : b.loaderStroke
				});
				break;
			case "bottom":
				n.css({
					top : "auto",
					height : b.loaderStroke
				});
				break
			}
			switch (U) {
			case "leftToRight":
				Z.css({
					left : 0,
					right : 0,
					top : b.loaderPadding,
					bottom : b.loaderPadding
				});
				break;
			case "rightToLeft":
				Z.css({
					left : 0,
					right : 0,
					top : b.loaderPadding,
					bottom : b.loaderPadding
				});
				break;
			case "topToBottom":
				Z.css({
					left : b.loaderPadding,
					right : b.loaderPadding,
					top : 0,
					bottom : 0
				});
				break;
			case "bottomToTop":
				Z.css({
					left : b.loaderPadding,
					right : b.loaderPadding,
					top : 0,
					bottom : 0
				});
				break
			}
		} else {
			m.append('<canvas id="' + i + '"></canvas>');
			var _;
			var Z = document.getElementById(i);
			Z.setAttribute("width", b.pieDiameter);
			Z.setAttribute("height", b.pieDiameter);
			var ab;
			switch (b.piePosition) {
			case "leftTop":
				ab = "left:0; top:0;";
				break;
			case "rightTop":
				ab = "right:0; top:0;";
				break;
			case "leftBottom":
				ab = "left:0; bottom:0;";
				break;
			case "rightBottom":
				ab = "right:0; bottom:0;";
				break
			}
			Z.setAttribute("style", "position:absolute; z-index:1002; " + ab);
			var bb;
			var cb;
			if (Z && Z.getContext) {
				var db = Z.getContext("2d");
				db.rotate(Math.PI * (3 / 2));
				db.translate(-b.pieDiameter, 0)
			}
		}
		if (h == "none" || O == false) {
			a("#" + i).hide();
			a(".camera_canvas_wrap", V).hide()
		}
		if (a(r).length) {
			a(r).append('<ul class="camera_pag_ul" />');
			var eb;
			for (eb = 0; eb < B; eb++) {
				a(".camera_pag_ul", f).append('<li class="pag_nav_' + eb + '" style="position:relative; z-index:1002"><span><span>' + eb + "</span></span></li>")
			}
			a(".camera_pag_ul li", f).hover(function () {
				a(this).addClass("camera_hover");
				if (a(".camera_thumb", this).length) {
					var b = a(".camera_thumb", this).outerWidth(),
					c = a(".camera_thumb", this).outerHeight(),
					d = a(this).outerWidth();
					a(".camera_thumb", this).show().css({
						top : "-" + c + "px",
						left : "-" + (b - d) / 2 + "px"
					}).animate({
						opacity : 1,
						"margin-top" : "-3px"
					}, 200);
					a(".thumb_arrow", this).show().animate({
						opacity : 1,
						"margin-top" : "-3px"
					}, 200)
				}
			}, function () {
				a(this).removeClass("camera_hover");
				a(".camera_thumb", this).animate({
					"margin-top" : "-20px",
					opacity : 0
				}, 200, function () {
					a(this).css({
						marginTop : "5px"
					}).hide()
				});
				a(".thumb_arrow", this).animate({
					"margin-top" : "-20px",
					opacity : 0
				}, 200, function () {
					a(this).css({
						marginTop : "5px"
					}).hide()
				})
			})
		}
		if (a(s).length) {
			var fb;
			if (!a(r).length) {
				a(s).append("<div />");
				a(s).before('<div class="camera_prevThumbs hideNav"><div></div></div>').before('<div class="camera_nextThumbs hideNav"><div></div></div>');
				a("> div", s).append("<ul />");
				a.each(A, function (b, c) {
					if (a("> div", j).eq(b).attr("data-thumb") != "") {
						var d = a("> div", j).eq(b).attr("data-thumb"),
						e = new Image;
						e.src = d;
						a("ul", s).append('<li class="pix_thumb pix_thumb_' + b + '" />');
						a("li.pix_thumb_" + b, s).append(a(e).attr("class", "camera_thumb"))
					}
				})
			} else {
				a.each(A, function (b, c) {
					if (a("> div", j).eq(b).attr("data-thumb") != "") {
						var d = a("> div", j).eq(b).attr("data-thumb"),
						e = new Image;
						e.src = d;
						a("li.pag_nav_" + b, r).append(a(e).attr("class", "camera_thumb").css({
								position : "absolute"
							}).animate({
								opacity : 0
							}, 0));
						a("li.pag_nav_" + b + " > img", r).after('<div class="thumb_arrow" />');
						a("li.pag_nav_" + b + " > .thumb_arrow", r).animate({
							opacity : 0
						}, 0)
					}
				});
				f.css({
					marginBottom : a(r).outerHeight()
				})
			}
		} else if (!a(s).length && a(r).length) {
			f.css({
				marginBottom : a(r).outerHeight()
			})
		}
		var gb = true;
		if (a(q).length) {
			a(q).append('<div class="camera_play"></div>').append('<div class="camera_stop"></div>');
			if (O == true) {
				a(".camera_play", V).hide();
				a(".camera_stop", V).show()
			} else {
				a(".camera_stop", V).hide();
				a(".camera_play", V).show()
			}
		}
		ib();
		a(".moveFromLeft, .moveFromRight, .moveFromTop, .moveFromBottom, .fadeIn, .fadeFromLeft, .fadeFromRight, .fadeFromTop, .fadeFromBottom", g).each(function () {
			a(this).css("visibility", "hidden")
		});
		b.onStartLoading.call(this);
		jb();
		if (a(o).length) {
			a(o).click(function () {
				if (!j.hasClass("camerasliding")) {
					var c = parseFloat(a(".cameraSlide.cameracurrent", k).index());
					clearInterval(L);
					W();
					a("#" + i + ", .camera_canvas_wrap", f).animate({
						opacity : 0
					}, 0);
					ib();
					if (c != 0) {
						jb(c)
					} else {
						jb(B)
					}
					b.onStartLoading.call(this)
				}
			})
		}
		if (a(p).length) {
			a(p).click(function () {
				if (!j.hasClass("camerasliding")) {
					var c = parseFloat(a(".cameraSlide.cameracurrent", k).index());
					clearInterval(L);
					W();
					a("#" + i + ", .camera_canvas_wrap", V).animate({
						opacity : 0
					}, 0);
					ib();
					if (c == B - 1) {
						jb(1)
					} else {
						jb(c + 2)
					}
					b.onStartLoading.call(this)
				}
			})
		}
		if (e()) {
			g.bind("swipeleft", function (c) {
				if (!j.hasClass("camerasliding")) {
					var d = parseFloat(a(".cameraSlide.cameracurrent", k).index());
					clearInterval(L);
					W();
					a("#" + i + ", .camera_canvas_wrap", V).animate({
						opacity : 0
					}, 0);
					ib();
					if (d == B - 1) {
						jb(1)
					} else {
						jb(d + 2)
					}
					b.onStartLoading.call(this)
				}
			});
			g.bind("swiperight", function (c) {
				if (!j.hasClass("camerasliding")) {
					var d = parseFloat(a(".cameraSlide.cameracurrent", k).index());
					clearInterval(L);
					W();
					a("#" + i + ", .camera_canvas_wrap", V).animate({
						opacity : 0
					}, 0);
					ib();
					if (d != 0) {
						jb(d)
					} else {
						jb(B)
					}
					b.onStartLoading.call(this)
				}
			})
		}
		if (a(r).length) {
			a(".camera_pag li", f).click(function () {
				if (!j.hasClass("camerasliding")) {
					var c = parseFloat(a(this).index());
					var d = parseFloat(a(".cameraSlide.cameracurrent", k).index());
					if (c != d) {
						clearInterval(L);
						W();
						a("#" + i + ", .camera_canvas_wrap", V).animate({
							opacity : 0
						}, 0);
						ib();
						jb(c + 1);
						b.onStartLoading.call(this)
					}
				}
			})
		}
		if (a(s).length) {
			a(".pix_thumb img", s).click(function () {
				if (!j.hasClass("camerasliding")) {
					var c = parseFloat(a(this).parents("li").index());
					var d = parseFloat(a(".cameracurrent", k).index());
					if (c != d) {
						clearInterval(L);
						W();
						a("#" + i + ", .camera_canvas_wrap", V).animate({
							opacity : 0
						}, 0);
						a(".pix_thumb", s).removeClass("cameracurrent");
						a(this).parents("li").addClass("cameracurrent");
						ib();
						jb(c + 1);
						hb();
						b.onStartLoading.call(this)
					}
				}
			});
			a(".camera_thumbs_cont .camera_prevThumbs", V).hover(function () {
				a(this).stop(true, false).animate({
					opacity : 1
				}, 250)
			}, function () {
				a(this).stop(true, false).animate({
					opacity : .7
				}, 250)
			});
			a(".camera_prevThumbs", V).click(function () {
				var b = 0,
				c = a(s).outerWidth(),
				d = a("ul", s).offset().left,
				e = a("> div", s).offset().left,
				f = e - d;
				a(".camera_visThumb", s).each(function () {
					var c = a(this).outerWidth();
					b = b + c
				});
				if (f - b > 0) {
					a("ul", s).animate({
						"margin-left" : "-" + (f - b) + "px"
					}, 500, H)
				} else {
					a("ul", s).animate({
						"margin-left" : 0
					}, 500, H)
				}
			});
			a(".camera_thumbs_cont .camera_nextThumbs", V).hover(function () {
				a(this).stop(true, false).animate({
					opacity : 1
				}, 250)
			}, function () {
				a(this).stop(true, false).animate({
					opacity : .7
				}, 250)
			});
			a(".camera_nextThumbs", V).click(function () {
				var b = 0,
				c = a(s).outerWidth(),
				d = a("ul", s).outerWidth(),
				e = a("ul", s).offset().left,
				f = a("> div", s).offset().left,
				g = f - e;
				a(".camera_visThumb", s).each(function () {
					var c = a(this).outerWidth();
					b = b + c
				});
				if (g + b + b < d) {
					a("ul", s).animate({
						"margin-left" : "-" + (g + b) + "px"
					}, 500, H)
				} else {
					a("ul", s).animate({
						"margin-left" : "-" + (d - c) + "px"
					}, 500, H)
				}
			})
		}
	}
})(jQuery);
(function (a) {
	a.fn.cameraStop = function () {
		var b = a(this),
		c = a(".camera_src", b),
		d = "pie_" + b.index();
		c.addClass("stopped");
		if (a(".camera_showcommands").length) {
			var e = a(".camera_thumbs_wrap", b)
		} else {
			var e = b
		}
	}
})(jQuery);
(function (a) {
	a.fn.cameraPause = function () {
		var b = a(this);
		var c = a(".camera_src", b);
		c.addClass("paused")
	}
})(jQuery);
(function (a) {
	a.fn.cameraResume = function () {
		var b = a(this);
		var c = a(".camera_src", b);
		if (typeof autoAdv === "undefined" || autoAdv !== true) {
			c.removeClass("paused")
		}
	}
})(jQuery);

//View Mode by MKR
window.viewMode = function () {
	var e = function (e) {
		var i = e || {},
		o = configSummary,
		a = i.viewmodedefault || o.defaultView,
		r = i.cookielist || "list",
		s = i.cookiegrid || "grid";
		!function () {
			function e() {
				return o.addClass("grid").removeClass("list"),
				d.addClass("active"),
				t.removeClass("active"),
				createCookie(s, null, 1e4),
				eraseCookie(r),
				changeimage(),
				!1
			}
			function i() {
				return o.removeClass("grid").addClass("list"),
				d.removeClass("active"),
				t.addClass("active"),
				createCookie(r, null, 1e4),
				eraseCookie(s),
				changeimage(),
				!1
			}
			var o = $(".blog-posts.hfeed").find(".post-outer"),
			d = $("#view .grid"),
			t = $("#view .list");
			readCookie(r) && "grid" != a ? (i(), eraseCookie(r)) : readCookie(s) && "grid" != a ? (e(), eraseCookie(s)) : readCookie(r) ? (i(), eraseCookie(r)) : readCookie(s) ? (e(), eraseCookie(s)) : "grid" != a ? (i(), eraseCookie(r)) : (e(), eraseCookie(s)),
			d.click(e),
			t.click(i)
		}
		()
	};
	return function (i) {
		e(i)
	}
}
();

//Digital Time and Date by MKR
function datetime(h) {
	(function (g) {
		var c = Alldefaultconfig,
		e = {
			months : c.timemonthName,
			dateplace : "tglxnya",
			timeplace : "clockx",
			timeFormat : c.timeFormat
		},
		e = g.extend({}, e, h),
		b = new Date;
		g = b.getDate();
		c = b.getMonth();
		b = b.getYear();
		b = 1E3 > b ? b + 1900 : b;
		document.getElementById(e.dateplace).innerHTML = e.months[c] + " " + g + ", " + b;
		var f = function (a) {
			10 > a && (a = "0" + a);
			return a
		};
		setInterval("12" === e.timeFormat ? function () {
			var a = "",
			a = new Date,
			d = a.getHours(),
			b = a.getMinutes(),
			c = a.getSeconds(),
			a = 12 > d ? "AM" : "PM";
			0 == d && (d = 12);
			12 < d &&
			(d -= 12);
			d = f(d);
			b = f(b);
			c = f(c);
			document.getElementById(e.timeplace).innerHTML = d + ":" + b + ":" + c + " " + a
		}
			 : function () {
			var a = new Date,
			b = a.getHours(),
			c = a.getMinutes(),
			a = a.getSeconds(),
			b = f(b),
			c = f(c),
			a = f(a);
			document.getElementById(e.timeplace).innerHTML = b + ":" + c + ":" + a
		}, 500)
	})(jQuery)
};

//Navigation Call by MKR
function menunav(c) {
	c("#mobilenav").click(function () {
		c("#menunav").slideToggle();
		c(this).toggleClass("active");
		return false
	});
	c("#topmobilenav").click(function () {
		c("#topmenunav").slideToggle();
		c(this).toggleClass("active");
		return false
	});
	c(".sf-menu ul").each(function () {
		var e = c(this).parent("li");
		e.append("<i></i>")
	});
	var b = function () {
		var e = c(window).width();
		if (e > 979) {
			c("#menunav").css("display", "block");
			c("#menunav").superfish({
				animation : {
					height : "show"
				},
				animationOut : {
					height : "hide"
				}
			});
			c(".sf-menu i").css("display", "none")
		} else {
			if (e <= 979 && c("#mobilenav").attr("class") === "active") {
				c("#menunav").css("display", "block");
				c("#menunav").superfish("destroy");
				c(".sf-menu i").css("display", "block")
			} else {
				if (e <= 979 && c("#mobilenav").attr("class") !== "active") {
					c("#menunav").css("display", "none");
					c("#menunav").superfish("destroy");
					c(".sf-menu i").css("display", "block")
				}
			}
		}
	};
	var a = function () {
		var e = c(window).width();
		if (e > 979) {
			c("#topmenunav").css("display", "block");
			c("#topmenunav").superfish({
				animation : {
					height : "show"
				},
				animationOut : {
					height : "hide"
				}
			});
			c(".sf-menu i").css("display", "none")
		} else {
			if (e <= 979 && c("#topmobilenav").attr("class") === "active") {
				c("#topmenunav").css("display", "block");
				c("#topmenunav").superfish("destroy");
				c(".sf-menu i").css("display", "block")
			} else {
				if (e <= 979 && c("#topmobilenav").attr("class") !== "active") {
					c("#topmenunav").css("display", "none");
					c("#topmenunav").superfish("destroy");
					c(".sf-menu i").css("display", "block")
				}
			}
		}
	};
	b();
	a();
	c(window).resize(b);
	c(window).resize(a);
	c(".sf-menu i").click(function () {
		var e = c(this).parent("li");
		var f = e.children("ul");
		f.slideToggle();
		c(this).toggleClass("active");
		return false
	});
	var d = window.location.href;
	c("#menunav a, #topmenunav a").each(function () {
		if (this.href === d) {
			var e = c(this).parents("li").children("a").addClass("current")
		}
	})
};

//Organic tab by CSStrick modif by MKR
(function (b) {
	b.organicTabs = function (c, l) {
		var a = this;
		a.$el = b(c);
		a.$nav = a.$el.find(".navtab");
		a.init = function () {
			a.options = b.extend({}, b.organicTabs.defaultOptions, l);
			b(".list-tabwrap .hide").css({
				position : "relative",
				top : 0,
				left : 0,
				display : "none"
			});
			a.$nav.delegate("li > a", "click", function () {
				var c = a.$el.find("a.current").attr("href").substring(1),
				e = b(this),
				g = e.attr("href").substring(1),
				d = a.$el.find(".list-tabwrap"),
				f = d.height();
				d.height(f);
				g != c && 0 == a.$el.find(":animated").length && a.$el.find("#" + c).fadeOut(a.options.speed,
					function () {
					a.$el.find("#" + g).fadeIn(a.options.speed);
					var b = a.$el.find("#" + g).height();
					d.animate({
						height : b
					});
					a.$el.find(".navtab li a").removeClass("current");
					e.addClass("current")
				});
				return !1
			});
			b(".sidebarmd-widget .BlogArchive .toggle").length && b(".sidebarmd-widget .BlogArchive .toggle").click(function () {
				var a = b(this).parents(".BlogArchive"),
				d = b(this).parent("li").children("ul"),
				c = function () {
					var c = a.height();
					b("#sidebar-tengah .list-tabwrap").animate({
						height : c
					})
				};
				b(this).children().is(".toggle-open") ?
				setTimeout(c, 500) : 0 < d.length ? setTimeout(c, 500) : setTimeout(c, 4E3)
			});
			var e,
			d,
			f,
			c = a.$el.find(".nav-one a"),
			h = a.$el.find(".nav-two a"),
			k = a.$el.find(".nav-three a");
			e = c.attr("href");
			d = h.attr("href");
			f = k.attr("href");
			e = a.$el.find(e);
			d = a.$el.find(d);
			f = a.$el.find(f);
			e = e.find(".widget > h2:first").html();
			d = d.find(".widget > h2:first").html();
			f = f.find(".widget > h2:first").html();
			c.html(e);
			h.html(d);
			k.html(f)
		};
		a.init()
	};
	b.organicTabs.defaultOptions = {
		speed : 300
	};
	b.fn.organicTabs = function (c) {
		return this.each(function () {
			new b.organicTabs(this,
				c)
		})
	}
})(jQuery);

// Simple Spy
(function (c) {
	c.fn.simpleSpy = function (a, e) {
		a = a || 4;
		e = e || 4E3;
		return this.each(function () {
			function g() {
				var a = c(f[d]).css({
						height : 0,
						opacity : 0
					}).prependTo(b);
				b.find("> li:last").animate({
					opacity : 0
				}, 1E3, function () {
					a.animate({
						height : h
					}, 1E3).animate({
						opacity : 1
					}, 1E3);
					c(this).remove()
				});
				d++;
				d >= k && (d = 0);
				setTimeout(g, e)
			}
			var b = c(this),
			f = [],
			d = a,
			k = 0,
			h = b.find("> li:first").height();
			b.find("> li").each(function () {
				f.push("<li>" + c(this).html() + "</li>")
			});
			k = f.length;
			b.wrap('<div class="spyWrapper" />').parent().css({
				height : h *
				a
			});
			b.find("> li").filter(":gt(" + (a - 1) + ")").remove();
			g()
		})
	}
})(jQuery);

//Date Format by MKR
function datenya() {
	var e = Alldefaultconfig;
	$(".timestamp-link abbr.published").each(function () {
		var d = $(this).attr("title"),
		a = e.monthName;
		if ("" != d)
			var b = d.substring(0, 10), f = b.substring(0, 4), c = b.substring(5, 7), b = b.substring(8, 10), c = a[parseInt(c, 10) - 1];
		a = $(this).parents(".post").children(".datex");
		a.removeClass("hidex").addClass("show");
		$("strong", a).html(b);
		$("small", a).html(f);
		$("span", a).html(c)
	})
};

//Ajax Loadmore by MKR
function loadMorePost(e) {
	!function (t) {
		function i(e) {
			t.getScript("http://" + e + ".disqus.com/blogger_index.js")
		}
		function a() {
			return n.loading ? void 0 : (n.loading = !0, n.olderPostsLink ? (n.loadMoreDiv.find("a").hide(), n.loadMoreDiv.find("img").show(), t.get(n.olderPostsLink, "html").done(function (e) {
						var a = t("<div></div>").append(e.replace(d, "")),
						o = a.find("a.blog-pager-older-link");
						o ? n.olderPostsLink = o.attr("href") : (n.olderPostsLink = "", n.loadMoreDiv.hide());
						var l = a.find(n.postContainerSelector).children(".date-outer");
						l.find(".post-summary").each(function () {
							var e,
							i,
							a,
							o,
							l,
							s,
							r = [],
							d = [],
							c = "",
							g = "";
							if (i = t(this).parent(".post-body"), a = i.children("textarea").val(), s = a.replace(/<(.*?)>/g, "").replace(/[\n\r]+/g, " "), parens = t(this).parents(".post"), l = parens.find(".post-title.entry-title a").attr("href"), titlex = parens.find(".post-title.entry-title a").text(), null != (r = a.match(/src=(?:\"|\')?([^>]*[^\/].(?:jpg|bmp|gif|png))(?:\"|\')?/gi)))
								if (n.slideffect === !0 && r.length > 1) {
									for (var m = n.maxImage > r.length ? r.length : n.maxImage, p = 0; m > p; p++)
										c += '<li><div class="thumbimage imglatest"><a title="' + titlex + '" href="' + l + '"><img alt="' + titlex + '" src="' + r[p].replace("src=", "").replace(/"/g, "").replace(/'/g, "") + '"/></a></div></li>';
									e = '<div class="thumbimgslide"><div class="slideximg"><ul class="imgslide">' + c + "</ul></div></div>";
									var u = t(this).attr("id");
									setTimeout(function () {
										t("#" + u + " .slideximg").flexslider({
											animation : "fade",
											selector : ".imgslide > li",
											slideshowSpeed : n.slideSpeed
										})
									}, 20)
								} else
									e = '<div class="thumbimage imglatest"><a class="thumbimgx" title="' + titlex + '" href="' + l + '"><img class="post-thumbnail" src="' + r[0].replace("src=", "").replace(/"/g, "").replace(/'/g, "") + '" alt="' + titlex + '">' + (-1 != r[0].indexOf("ytimg.googleusercontent.com") ? '<span class="youtubeplay"><i class="icon-youtube-play"></i></span>' : "") + "</a></div>";
							else if (null != (d = a.match(/(youtu.be\/|youtube.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&\"\'>]+)/gi))) {
								var h = d[0].match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
								h && 11 == h[7].length && (e = '<div class="thumbimage imglatest"><a class="thumbimgx" title="' + titlex + '" href="' + l + '"><img class="post-thumbnail" src="http://img.youtube.com/vi/' + h[7] + '/0.jpg" alt="' + titlex + '"/><span class="youtubeplay"><i class="icon-youtube-play"></i></span></a></div>')
							} else
								e = '<div class="thumbimage imglatest"><a title="' + titlex + '" class="thumbimgx" href="' + l + '"><img class="post-thumbnail" src="' + n.BackupImage.replace(/\/s[0-9]+(\-c)?\//, "/" + n.thumbnailSize + "/") + '" alt="' + titlex + '"/></a></div>';
							o = '<a target="_blank" title="Share to Facebook" class="facebook" href="http://www.facebook.com/share.php?u=' + encodeURIComponent(l) + "&t=" + encodeURIComponent(titlex) + '"><i class="icon-facebook"></i></a><a target="_blank" title="Share to Twitter" class="twitter" href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(titlex) + "&amp;url=" + encodeURIComponent(l) + '"><i class="icon-twitter"></i></a><a target="_blank" title="Share to Google Plus" class="google-plus" href="https://plus.google.com/share?url=' + encodeURIComponent(l) + '"><i class="icon-google-plus"></i></a>',
							g = e + '<strong><a class="titlex" href="' + l + '">' + titlex + "</a></strong><p>" + s.substring(0, n.summaryLength) + '&hellip;</p><div class="socialpostshare">' + o + "</div>",
							t(this).html(g)
						}),
						t(n.postContainerSelector).append(l),
						datenya({
							monthName : n.monthName
						}),
						viewMode({
							viewmodedefault : n.viewmodedefault,
							cookielist : n.cookielist,
							cookiegrid : n.cookiegrid
						}),
						changeimage(),
						window._gaq && window._gaq.push(["_trackPageview", n.olderPostsLink]),
						window.gapi && window.gapi.plusone && window.gapi.plusone.go && window.gapi.plusone.go(),
						window.disqus_shortname && i(window.disqus_shortname),
						window.FB && window.FB.XFBML && window.FB.XFBML.parse && window.FB.XFBML.parse(),
						n.loadMoreDiv.find("img").hide(),
						n.loadMoreDiv.find("a").show(),
						n.loading = !1
					}), !1) : void n.loadMoreDiv.hide())
		}
		function o() {
			if ("item" != _WidgetManager._GetAllData().blog.pageType && (n.olderPostsLink = t("a.blog-pager-older-link").attr("href"), n.olderPostsLink)) {
				var e = t('<a class="loadpost" href="javascript:;">' + n.MoreText + "</a>");
				e.click(a);
				var i = t('<img class="imgload" src="' + n.loadingGif + '" style="display: none;">');
				n.loadMoreDiv = t('<div style="text-align: center; font-size: 120%;"></div>'),
				n.loadMoreDiv.append(e),
				n.loadMoreDiv.append(i),
				n.loadMoreDiv.insertBefore(t("#blog-pager")),
				t("#blog-pager").hide()
			}
		}
		var l = configSummary,
		s = Alldefaultconfig,
		n = {
			loadingGif : "https://lh3.googleusercontent.com/-FiCzyOK4Mew/T4aAj2uVJKI/AAAAAAAAPaY/x23tjGIH7ls/s32/ajax-loader.gif",
			olderPostsLink : "",
			loadMoreDiv : null,
			thumbnailSize : l.thumbnailSize,
			summaryLength : l.summaryLength,
			postContainerSelector : "div.blog-posts",
			MoreText : s.MoreText,
			viewmodedefault : l.defaultView,
			cookielist : "list",
			cookiegrid : "grid",
			monthName : s.monthName,
			slideffect : l.slideffect,
			maxImage : l.maxImage,
			slideSpeed : l.slideSpeed,
			BackupImage : s.BackupImage,
			loading : !1
		};
		n = t.extend({}, n, e);
		var r = (t(window), t(document)),
		d = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
		r.ready(o)
	}
	(jQuery)
}

//Ajax Page Navigation by MKR
function pageNavi(a) {
	!function (e) {
		var s = configSummary,
		t = Alldefaultconfig,
		i = {
			postperpage : s.postPerPage,
			numshowpage : s.numshowpage,
			previous : "&#171;",
			next : "&#187;",
			loadAjax : !0,
			thumbnailSize : s.thumbnailSize,
			summaryLength : s.summaryLength,
			viewmodedefault : s.defaultView,
			cookielist : "list",
			cookiegrid : "grid",
			monthName : t.monthName,
			slideffect : s.slideffect,
			maxImage : s.maxImage,
			slideSpeed : s.slideSpeed,
			BackupImage : t.BackupImage
		};
		i = e.extend({}, i, a);
		var l,
		n,
		o,
		p,
		r = "/",
		m = location.href,
		g = function (a) {
			var s = "";
			nomerkiri = parseInt(i.numshowpage / 2),
			nomerkiri == i.numshowpage - nomerkiri && (i.numshowpage = 2 * nomerkiri + 1),
			mulai = o - nomerkiri,
			1 > mulai && (mulai = 1),
			maksimal = parseInt(a / i.postperpage) + 1,
			maksimal - 1 == a / i.postperpage && (maksimal -= 1),
			akhir = mulai + i.numshowpage - 1,
			akhir > maksimal && (akhir = maksimal);
			var t = parseInt(o) - 1;
			o > 1 && (s += 2 == o ? "page" == n ? '<span class="showpage"><a href="' + r + '">' + i.previous + "</a></span>" : '<span class="showpageNum"><a href="/search/label/' + p + "?&max-results=" + i.postperpage + '">' + i.previous + "</a></span>" : "page" == n ? '<span class="showpageNum"><a class="xpagex" href="#" alt="' + t + '">' + i.previous + "</a></span>" : '<span class="showpageNum"><a class="xlabelx" href="#" alt="' + t + '">' + i.previous + "</a></span>"),
			mulai > 1 && (s += "page" == n ? '<span class="showpageNum"><a href="' + r + '">1</a></span>' : '<span class="showpageNum"><a href="/search/label/' + p + "?&max-results=" + i.postperpage + '">1</a></span>'),
			mulai > 2 && (s += '<span class="dotxpage"> ... </span>');
			for (var m = mulai; akhir >= m; m++)
				s += o == m ? '<span class="showpagePoint">' + m + "</span>" : 1 == m ? "page" == n ? '<span class="showpageNum"><a href="' + r + '">1</a></span>' : '<span class="showpageNum"><a href="/search/label/' + p + "?&max-results=" + i.postperpage + '">1</a></span>' : "page" == n ? '<span class="showpageNum"><a href="#" class="xpagex" alt="' + m + '">' + m + "</a></span>" : '<span class="showpageNum"><a href="#" class="xlabelx" alt="' + m + '">' + m + "</a></span>";
			maksimal - 1 > akhir && (s += '<span class="dotxpage"> ... </span>'),
			maksimal > akhir && (s += "page" == n ? '<span class="showpageNum"><a href="#" class="xpagex" alt="' + maksimal + '">' + maksimal + "</a></span>" : '<span class="showpageNum"><a href="#" class="xlabelx" alt="' + maksimal + '">' + maksimal + "</a></span>");
			var g = parseInt(o) + 1;
			maksimal > o && (s += "page" == n ? '<span class="showpageNum"><a href="#" class="xpagex" alt="' + g + '">' + i.next + "</a></span>" : '<span class="showpageNum"><a href="#" class="xlabelx" alt="' + g + '">' + i.next + "</a></span>");
			for (var c = document.getElementsByName("pageArea"), u = document.getElementById("blog-pager"), h = 0; h < c.length; h++)
				c[h].innerHTML = s;
			c && c.length > 0 && (s = ""),
			u && (u.innerHTML = s),
			e("#blog-pager").css("display", "block"),
			e("#blog-pager a.xpagex, #blog-pager a.xlabelx").click(function () {
				i.loadAjax && e(".loadingpost").show();
				var a = e(this).attr("alt");
				return jsonstart = (a - 1) * i.postperpage,
				l = a,
				"page" == n ? e.get(r + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script", d, "jsonp") : e.get(r + "feeds/posts/summary/-/" + p + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script", d, "jsonp"),
				!1
			}),
			e(".loadingpost").hide()
		},
		c = function (a) {
			var e = a.feed,
			s = parseInt(e.openSearch$totalResults.$t, 10);
			g(s)
		},
		u = function () {
			var a = m;
			-1 != a.indexOf("/search/label/") && (p = -1 != a.indexOf("?updated-max") ? a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?updated-max")) : -1 != a.indexOf("?&max") ? a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?&max")) : a.substr(a.lastIndexOf("/"))),
			-1 == a.indexOf("?q=") && -1 == a.indexOf(".html") && (-1 == a.indexOf("/search/label/") ? (n = "page", o = -1 != m.indexOf("#PageNo=") ? m.substring(m.indexOf("#PageNo=") + 8, m.length) : 1, e.get(r + "feeds/posts/summary?max-results=1&alt=json-in-script", c, "jsonp")) : (n = "label", -1 == a.indexOf("&max-results=") && (i.postperpage = 20), o = -1 != m.indexOf("#PageNo=") ? m.substring(m.indexOf("#PageNo=") + 8, m.length) : 1, e.get(r + "feeds/posts/summary/-/" + p + "?max-results=1&alt=json-in-script", c, "jsonp")))
		};
		u();
		var d = function (a) {
			post = a.feed.entry[0];
			var s = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29),
			t = encodeURIComponent(s);
			if ("page" == n)
				var o = "/search?updated-max=" + t + "&max-results=" + i.postperpage + "#PageNo=" + l;
			else
				var o = "/search/label/" + p + "?updated-max=" + t + "&max-results=" + i.postperpage + "#PageNo=" + l;
			if (i.loadAjax) {
				var r = function (a) {
					e.getScript("http://" + a + ".disqus.com/blogger_index.js")
				},
				g = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
				e.get(o, "html").done(function (a) {
					var s = e("<div></div>").append(a.replace(g, "")),
					t = s.find("div.blog-posts").children(".date-outer");
					t.find(".post-summary").each(function () {
						var a,
						s,
						t,
						l,
						n,
						o,
						p = [],
						r = [],
						m = "",
						g = "";
						if (s = e(this).parent(".post-body"), t = s.children("textarea").val(), o = t.replace(/<(.*?)>/g, "").replace(/[\n\r]+/g, " "), parens = e(this).parents(".post"), n = parens.find(".post-title.entry-title a").attr("href"), titlex = parens.find(".post-title.entry-title a").text(), null != (p = t.match(/src=(?:\"|\')?([^>]*[^\/].(?:jpg|bmp|gif|png))(?:\"|\')?/gi)))
							if (i.slideffect === !0 && p.length > 1) {
								for (var c = i.maxImage > p.length ? p.length : i.maxImage, u = 0; c > u; u++)
									m += '<li><div class="thumbimage imglatest"><a title="' + titlex + '" href="' + n + '"><img alt="' + titlex + '" src="' + p[u].replace("src=", "").replace(/"/g, "").replace(/'/g, "") + '"/></a></div></li>';
								a = '<div class="thumbimgslide"><div class="slideximg"><ul class="imgslide">' + m + "</ul></div></div>";
								var d = e(this).attr("id");
								setTimeout(function () {
									e("#" + d + " .slideximg").flexslider({
										animation : "fade",
										selector : ".imgslide > li",
										slideshowSpeed : i.slideSpeed
									})
								}, 20)
							} else
								a = '<div class="thumbimage imglatest"><a class="thumbimgx" title="' + titlex + '" href="' + n + '"><img class="post-thumbnail" src="' + p[0].replace("src=", "").replace(/"/g, "").replace(/'/g, "") + '" alt="' + titlex + '">' + (-1 != p[0].indexOf("ytimg.googleusercontent.com") ? '<span class="youtubeplay"><i class="icon-youtube-play"></i></span>' : "") + "</a></div>";
						else if (null != (r = t.match(/(youtu.be\/|youtube.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&\"\'>]+)/gi))) {
							var h = r[0].match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
							h && 11 == h[7].length && (a = '<div class="thumbimage imglatest"><a class="thumbimgx" title="' + titlex + '" href="' + n + '"><img class="post-thumbnail" src="http://img.youtube.com/vi/' + h[7] + '/0.jpg" alt="' + titlex + '"/><span class="youtubeplay"><i class="icon-youtube-play"></i></span></a></div>')
						} else
							a = '<div class="thumbimage imglatest"><a title="' + titlex + '" class="thumbimgx" href="' + n + '"><img class="post-thumbnail" src="' + i.BackupImage.replace(/\/s[0-9]+(\-c)?\//, "/" + i.thumbnailSize + "/") + '" alt="' + titlex + '"/></a></div>';
						l = '<a target="_blank" title="Share to Facebook" class="facebook" href="http://www.facebook.com/share.php?u=' + encodeURIComponent(n) + "&t=" + encodeURIComponent(titlex) + '"><i class="icon-facebook"></i></a><a target="_blank" title="Share to Twitter" class="twitter" href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(titlex) + "&amp;url=" + encodeURIComponent(n) + '"><i class="icon-twitter"></i></a><a target="_blank" title="Share to Google Plus" class="google-plus" href="https://plus.google.com/share?url=' + encodeURIComponent(n) + '"><i class="icon-google-plus"></i></a>',
						g = a + '<strong><a class="titlex" href="' + n + '">' + titlex + "</a></strong><p>" + o.substring(0, i.summaryLength) + '&hellip;</p><div class="socialpostshare">' + l + "</div>",
						e(this).html(g)
					}),
					e("div.blog-posts").html(t),
					datenya({
						monthName : i.monthName
					}),
					viewMode({
						viewmodedefault : i.viewmodedefault,
						cookielist : i.cookielist,
						cookiegrid : i.cookiegrid
					}),
					m = o,
					u(),
					changeimage(),
					window._gaq && window._gaq.push(["_trackPageview", i.olderPostsLink]),
					window.gapi && window.gapi.plusone && window.gapi.plusone.go && window.gapi.plusone.go(),
					window.disqus_shortname && r(window.disqus_shortname),
					window.FB && window.FB.XFBML && window.FB.XFBML.parse && window.FB.XFBML.parse()
				})
			} else
				location.href = o
		}
	}
	(jQuery)
}

//Ajax JSON Search Result by MKR
function searchxx(e) {
	!function (t) {
		var r = Alldefaultconfig,
		a = {
			blogURL : "",
			srcBlank : r.BackupImage,
			findText : "Search results for keyword",
			NotfindText : "No result!",
			Showthumb : !0,
			LoadingText : "Searching...",
			viewMoreText : r.viewMoreText,
			scrthumbSize : 50,
			MaxPost : 10,
			summaryLength : r.summaryLength
		};
		a = t.extend({}, a, e);
		var s = t("#ajax-search-form"),
		o = s.find(":text");
		s.append('<div id="search-result"></div>');
		var i = t("#search-result");
		s.on("submit", function () {
			var e = o.val();
			return i.show().html('<div class="load">' + a.LoadingText + "</div>"),
			t.get(("" === a.blogURL ? window.location.protocol + "//" + window.location.host : a.blogURL) + "/feeds/posts/default?alt=json-in-script&q=" + e + "&max-results=" + a.MaxPost, function (r) {
				var s,
				o,
				l,
				n,
				c = r.feed.entry,
				h = [],
				u = [],
				m = "";
				if (void 0 !== c) {
					m = "<h4>" + a.findText + " &quot;" + e + "&quot;</h4>",
					m += '<a class="close" href="/">&times;</a><ol>';
					for (var g = 0, d = c.length; d > g; g++) {
						for (var f = new RegExp(e, "ig"), l = c[g].title.$t.replace(f, "<mark>" + e + "</mark>"), p = 0, v = c[g].link.length; v > p; p++)
							"alternate" == c[g].link[p].rel && (n = c[g].link[p].href);
						if (s = "content" in c[g] ? c[g].content.$t : "summary" in c[g] ? c[g].summary.$t : "", "media$thumbnail" in c[g])
							o = c[g].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/s" + a.scrthumbSize + "-c");
						else if (null != (h = s.match(/src=(?:\"|\')?([^>]*[^\/].(?:jpg|bmp|gif|png))(?:\"|\')?/gi)))
							o = h[0].replace("src=", "").replace(/"/g, "").replace(/'/g, "");
						else if (null != (u = s.match(/(youtu.be\/|youtube.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&\"\'>]+)/gi))) {
							var b = u[0].match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
							b && 11 == b[7].length && (o = "http://img.youtube.com/vi/" + b[7] + "/0.jpg")
						} else
							o = a.srcBlank;
						s = s.replace(/<\S[^>]*>/g, ""),
						s.length > a.summaryLength && (s = s.substring(0, a.summaryLength) + "..."),
						s = s.replace(f, "<mark>" + e + "</mark>"),
						m += '<li><a href="' + n + '" >' + (a.Showthumb === !0 ? '<img style="width:' + a.scrthumbSize + "px;height:" + a.scrthumbSize + 'px" width="' + a.scrthumbSize + '" height="' + a.scrthumbSize + '" src="' + o + '"/>' : "") + "<strong>" + l + "</strong></a>" + (a.summaryLength > 0 ? "<p>" + s + "</p>" : "") + "</li>"
					}
					m += "</ol>" + (r.feed.openSearch$totalResults.$t > r.feed.openSearch$itemsPerPage.$t ? '<div class="src-morepost"><a href="/search?q=' + e + '">' + a.viewMoreText + " &quot;" + e + "&quot;</a></div>" : ""),
					i.html(m),
					t("#searchnya ol").mCustomScrollbar()
				} else
					i.html('<a class="close" href="/">&times;</a><strong>' + a.NotfindText + "</strong>")
			}, "jsonp"),
			!1
		}),
		s.on("click", ".close", function () {
			return i.fadeOut(),
			!1
		})
	}
	(jQuery)
}

// Ajax Recent Post Tag by MKR
!function (t) {
	var o = Alldefaultconfig,
	e = configSummary;
	t.RecentPostbyTag = function (e, a) {
		var s = this;
		s.$el = t(e),
		s.init = function () {
			s.options = t.extend({}, t.RecentPostbyTag.defaultOptions, a),
			s.$el.html('<div class="rcbytag ' + s.options.postType + " " + ("f" === s.options.sliderType ? "featuredpost" : "") + " " + (s.options.ShowImage ? "" : "noimagez") + '"><ul class="rcentpost ' + s.options.sliderType + " " + (s.options.animated ? "animated" : "") + '"></ul></div>').addClass(s.options.loadingClass);
			var n = t(e).parents(".widget"),
			i = n.children("h2");
			i.length || "f" === s.options.sliderType || n.prepend('<h2 class="title"><span>' + (s.options.tagName !== !1 ? s.options.tagName : s.options.Random ? o.RandomTitle : o.RecentTitle) + "</span></h2>");
			var l = function (o) {
				var a,
				n,
				i,
				l,
				p,
				r,
				d,
				m,
				c,
				g,
				u = "",
				h = [],
				f = [],
				b = s.options.Random === !0 ? shuffleArray(o.feed.entry) : o.feed.entry;
				if (void 0 !== b) {
					for (var y = s.$el.find(".recntmore"), v = s.$el.find("ul li"), w = b.length, x = 0; w > x; x++) {
						for (var $ = b[x].link.length, S = 0; $ > S; S++)
							if ("alternate" == b[x].link[S].rel) {
								a = b[x].link[S].href;
								break
							}
						for (var T = 0; $ > T; T++)
							if ("replies" == b[x].link[T].rel && "text/html" == b[x].link[T].type) {
								l = b[x].link[T].title.split(" ")[0];
								break
							}
						if (i = "content" in b[x] ? b[x].content.$t : "summary" in b[x] ? b[x].summary.$t : "", "media$thumbnail" in b[x])
							p = b[x].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/" + s.options.ImageSize), -1 != b[x].media$thumbnail.url.indexOf("img.youtube.com") ? p = b[x].media$thumbnail.url.replace("default", "0") : b[x] === b[0] && "s" !== s.options.postType && (p = b[x].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/" + s.options.FirstImageSize));
						else if (null != (h = i.match(/src=(?:\"|\')?([^>]*[^\/].(?:jpg|bmp|gif|png))(?:\"|\')?/gi)))
							p = h[0].replace("src=", "").replace(/"/g, "").replace(/'/g, "");
						else if (null != (f = i.match(/(youtu.be\/|youtube.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&\"\'>]+)/gi))) {
							var R = f[0].match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
							R && 11 == R[7].length && (p = "http://img.youtube.com/vi/" + R[7] + "/0.jpg")
						} else
							p = s.options.pBlank;
						i = i.replace(/<\S[^>]*>/g, "").replace(/"/g, "&quot;"),
						i.length > s.options.Summarylength && (i = i.substring(0, s.options.Summarylength) + "..."),
						n = b[x].title.$t,
						g = b[x].published.$t.substring(0, 10),
						r = g.substring(0, 4),
						d = g.substring(5, 7),
						m = g.substring(8, 10),
						c = s.options.MonthNames[parseInt(d, 10) - 1],
						"f" === s.options.sliderType ? u += '<li><div class="inner" ><a title="' + n + '" class="feathumb" href="' + a + '"><img src="' + p + '"/>' + (-1 != p.indexOf("img.youtube.com") || -1 != p.indexOf("ytimg.googleusercontent.com") ? '<span class="youtubeplay"><i class="icon-youtube-play"></i></span>' : "") + '</a><div class="featinfo"><strong class="titlex"><a href="' + a + '">' + n + '</a></strong><div class="labeltext"><div class="infolabel">' + (s.options.ShowDate ? '<span class="date">' + c + " " + m + ", " + r + "</span>" : "") + (s.options.ShowComment ? '<span class="comnum"><a href="' + a + '#comment-form">' + l + "</a></span>" : "") + "</span></div><p>" + i + "</p></div></div></div></li>" : (socialadd = '<a target="_blank" title="Share to Facebook" class="facebook" href="http://www.facebook.com/share.php?u=' + encodeURIComponent(a) + "&t=" + encodeURIComponent(n) + '"><i class="icon-facebook"></i></a><a target="_blank" title="Share to Twitter" class="twitter" href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(n) + "&amp;url=" + encodeURIComponent(a) + '"><i class="icon-twitter"></i></a><a target="_blank" title="Share to Google Plus" class="google-plus" href="https://plus.google.com/share?url=' + encodeURIComponent(a) + '"><i class="icon-google-plus"></i></a>', u += '<li class="a' + x + '"><div class="inner" >' + (s.options.ShowImage ? '<div class="thumbimage rcpstimage"><a ' + ("g1" === s.options.postType || "g2" === s.options.postType ? 'data-comment="' + l + '" data-date="' + c + " " + m + ", " + r + '" data-description="' + i + '" data-image="' + p + '" data-title="' + n + '"' : 'title="' + n + '"') + ' class="thumbxtag ' + ("g1" === s.options.postType || "g2" === s.options.postType ? "adainfo" : "") + '" href="' + a + '"><img src="' + p + '"/>' + (-1 != p.indexOf("img.youtube.com") || -1 != p.indexOf("ytimg.googleusercontent.com") ? '<span class="youtubeplay"><i class="icon-youtube-play"></i></span>' : "") + "</a></div>" : "") + "<strong><a " + (s.options.ShowImage ? "" : "class=adainfo") + " " + (s.options.ShowImage ? "" : 'data-comment="' + l + '" data-date="' + c + " " + m + ", " + r + '" data-description="' + i + '" data-image="' + p + '" data-title="' + n + '"') + ' href="' + a + '">' + n + '</a></strong><div class="info">' + (s.options.ShowDate ? '<span class="date"><span class="dd">' + m + '</span> <span class="dm">' + c + '</span> <span class="dy">' + r + "</span></span>" : "") + (s.options.ShowComment ? '<span class="comnum"><a href="' + a + '#comment-form">' + l + "</a></span>" : "") + "</div><p " + (s.options.ShowDesc ? 'style="display:block"' : "") + ">" + i + '</p><div class="socialpostshare">' + socialadd + "</div></div></li>" + (b[x] !== b[0] || "s" === s.options.postType || v.length ? "" : '<div class="loadmorepost"></div><div class="recntright"><ul ' + (s.options.animated ? "class=animated" : "") + " >") + (b[x] !== b[w + 1] || "s" === s.options.postType || v.length ? "" : "</ul>" + L + "</div>"))
					}
					if (y.length && !s.options.animated ? (s.$el.find(".mCSB_container").append(u), s.$el.find(".recntright ul").mCustomScrollbar("update")) : t("ul", s.$el).html(u), "s" === s.options.postType)
						if ("c" === s.options.sliderType) {
							var I = t(e).parents(".widget"),
							N = I.children("h2");
							0 != s.options.tagName && N.wrapInner('<a href="/search/label/' + encodeURIComponent(s.options.tagName) + '"/>');
							var k,
							M,
							C = s.$el.width();
							300 > C ? (M = 1, k = C / M) : 450 > C ? (M = 2, k = C / M) : 700 > C ? (M = 3, k = C / M) : (M = 4, k = C / M),
							t(".rcbytag", s.$el).flexslider({
								animation : "slide",
								selector : ".rcentpost > li",
								animationLoop : !0,
								itemWidth : k,
								minItems : 1,
								move : M,
								mousewheel : !0,
								maxItems : 4
							})
						} else
							t(".featuredpost", s.$el).flexslider({
								animation : s.options.animation,
								selector : ".rcentpost > li",
								animationLoop : !0,
								mousewheel : !0,
								slideshowSpeed : s.options.slideSpeed
							});
					else {
						var L = s.options.tagName !== !1 ? '<div class="morepostag"><a class="recntmore" title="' + s.options.MoreText + " " + s.options.tagName + '" href="/search/label/' + encodeURIComponent(s.options.tagName) + "?&max-results=" + s.options.MoreNumPost + '">' + s.options.MoreText + " " + s.options.tagName + "</a></div>" : '<div class="morepostag rect"><a class="recntmore" title="' + s.options.LoadMoreText + '" href="#">' + s.options.LoadMoreText + "</a></div>";
						y.length || (s.$el.find(".recntright").append(L), s.options.animated || "g2" === s.options.postType || s.$el.find(".recntright ul").mCustomScrollbar(), (s.options.animated || s.options.Random || "g2" === s.options.postType) && s.$el.find(".morepostag").hide(), s.options.AjaxLoad || s.$el.find(".morepostag.rect").hide(), s.$el.find(".loadmorepost").fadeOut(), s.options.animated && s.$el.find(".recntright ul.animated").simpleSpy()),
						(v.length + s.options.MaxPost >= o.feed.openSearch$totalResults.$t || s.options.Random) && s.$el.find(".morepostag").hide(),
						s.$el.find(".loadmorepost").fadeOut(),
						"g1" !== s.options.postType && "g2" !== s.options.postType && s.options.ShowImage || (t("#content-wrapper").mouseenter(function () {
								t(".postinfo").filter(":not(:animated)").hide()
							}).mousemove(function () {
								t(".postinfo").filter(":not(:animated)").hide()
							}), s.$el.find(".rcbytag a.adainfo").mouseenter(function () {
								var o = t(this).attr("data-title"),
								e = t(this).attr("data-image"),
								a = t(this).attr("data-description"),
								s = t(this).attr("data-date"),
								n = t(this).attr("data-comment");
								t(".postinfo").html('<div class="inner"><a href="#"><img src="' + e.replace(/\/s[0-9]+\-c/g, "/s320-c") + '"/>' + (-1 != e.indexOf("img.youtube.com") || -1 != e.indexOf("ytimg.googleusercontent.com") ? '<span class="youtubeplay"><i class="icon-youtube-play"></i></span>' : "") + "</a><strong>" + o + '</strong><span><i class="icon-time"></i> ' + s + ' <i class="icon-comment"></i> ' + n + "</span><p>" + a + "</p></div>"),
								t(".postinfo").filter(":not(:animated)").fadeIn(700)
							}).mousemove(function (o) {
								var e = t(window).width(),
								a = (t(window).height(), t(".postinfo").outerWidth()),
								s = (t(".postinfo").outerHeight(), o.pageY + 20),
								n = o.pageX + 10;
								t("#outer-wrapper").hasClass("rtl") && (n = o.pageX - (a + 10)),
								n + a > e ? n = e - a - 10 : 0 > n && (n = 10),
								t(".postinfo").css({
									top : s,
									left : n
								})
							}).mouseleave(function () {
								t(".postinfo").filter(":not(:animated)").hide().html("")
							}), s.$el.find(".rcbytag").on("mousemove", function (t) {
								t.stopPropagation()
							}))
					}
					s.$el.removeClass(s.options.loadingClass)
				} else
					s.$el.html("<span>No result! Or Error Loading Feed</span>")
			};
			if (s.options.Random)
				t.get(("" === s.options.blogURL ? window.location.protocol + "//" + window.location.host : s.options.blogURL) + "/feeds/posts/summary" + (s.options.tagName === !1 ? "" : "/-/" + s.options.tagName) + "?max-results=0&orderby=published&alt=json-in-script", function (o) {
					var e = s.options.MaxPost > o.feed.openSearch$totalResults.$t ? 1 : getRandomInt(1, o.feed.openSearch$totalResults.$t - s.options.MaxPost);
					t.get(("" === s.options.blogURL ? window.location.protocol + "//" + window.location.host : s.options.blogURL) + "/feeds/posts/default" + (s.options.tagName === !1 ? "" : "/-/" + s.options.tagName) + "?max-results=" + s.options.MaxPost + "&orderby=published&start-index=" + e + "&alt=json-in-script", l, "jsonp")
				}, "jsonp");
			else {
				var p = t.get(("" === s.options.blogURL ? window.location.protocol + "//" + window.location.host : s.options.blogURL) + "/feeds/posts/default" + (s.options.tagName === !1 ? "" : "/-/" + s.options.tagName) + "?max-results=" + s.options.MaxPost + "&orderby=published&alt=json-in-script", l, "jsonp");
				t.when(p).done(function () {
					s.options.AjaxLoad && s.$el.find(".morepostag a.recntmore").click(function () {
						s.$el.find(".loadmorepost").fadeIn();
						var o = s.$el.find("ul li"),
						e = o.length + 1;
						return t.get(("" === s.options.blogURL ? window.location.protocol + "//" + window.location.host : s.options.blogURL) + "/feeds/posts/default" + (s.options.tagName === !1 ? "" : "/-/" + s.options.tagName) + "?max-results=" + s.options.MaxPost + "&orderby=published&start-index=" + e + "&alt=json-in-script", l, "jsonp"),
						!1
					})
				})
			}
		},
		s.init()
	},
	t.RecentPostbyTag.defaultOptions = {
		blogURL : "",
		MaxPost : o.MaxPost,
		FirstImageSize : o.FirstImageSize,
		ImageSize : o.ImageSize,
		ShowDesc : !1,
		ShowImage : !0,
		ShowDate : !0,
		ShowComment : !0,
		Random : !1,
		Summarylength : o.summaryLength,
		MoreText : o.viewMoreText,
		LoadMoreText : o.MoreText,
		MoreNumPost : e.postPerPage,
		animation : "slide",
		slideSpeed : o.slideshowSpeed,
		AjaxLoad : !0,
		animated : !1,
		postType : "v",
		sliderType : "c",
		loadingClass : "loadingxx",
		pBlank : o.BackupImage,
		MonthNames : o.monthName,
		tagName : !1
	},
	t.fn.RecentPostbyTag = function (o) {
		return this.each(function () {
			new t.RecentPostbyTag(this, o)
		})
	}
}
(jQuery);

//Emoticon by MKR
window.emoticonx = (function () {
	var b = function (m) {
		var j = m || {},
		l = j.emoRange || ".comments p, div.emoWrap",
		k = j.putEmoAbove || "iframe#comment-editor",
		h = j.topText || "Click to see the code!",
		a = j.emoMessage || "To insert emoticon you must added at least one space before the code.";
		$(k).before('<span class="emobutton"><i class="icon-smile"></i> <b>Emoticon</b></span><div style="text-align:center" class="emoWrap"> :) :)) ;(( :-) =)) ;( ;-( :d :-d @-) :p :o :&gt;) (o) [-( :-? (p) :-s (m) 8-) :-t :-b  b-( :-# =p~ $-) (b) (f) x-) (k) (h) (c) cheer <br/><b>' + h + "</b><br/>" + a + "</div>");
		var i = function (c, d, e) {
			$(l).each(function () {
				$(this).html($(this).html().replace(/<br>:/g, "<br> :").replace(/<br>;/g, "<br> ;").replace(/<br>=/g, "<br> =").replace(/<br>\^/g, "<br> ^").replace(c, " <img style='max-height:24px' src='" + d + "' class='emo delayLoad' alt='" + e + "' />"))
			})
		};
		i(/\s:\)\)+/g, "https://lh3.googleusercontent.com/-duNoMAb1RS4/T2WEWrOfR8I/AAAAAAAACZ0/ObgHf-PmTuE/s36/03.gif", ":))");
		i(/\s;\(\(+/g, "https://lh6.googleusercontent.com/-LIr-ZdDp2xI/T2WEYDacVnI/AAAAAAAACaY/W7MF5qKO2sE/s47/06.gif", ";((");
		i(/\s:\)+/g, "https://lh6.googleusercontent.com/-Q5lMkgcmVR4/T2WEWkNi3MI/AAAAAAAACZ4/7VBYeVbx7kA/s36/01.gif", ":)");
		i(/\s:-\)+/g, "https://lh3.googleusercontent.com/-mCsZPeixHvA/T2WEWivv9FI/AAAAAAAACZw/64ZGRgdlDeg/s36/02.gif", ":-)");
		i(/\s=\)\)+/g, "https://lh5.googleusercontent.com/-u__sc3DgZ2c/T2d0_lDLueI/AAAAAAAACkw/YbeuRNde61Q/s36/03a.gif", "=))");
		i(/\s;\(+/g, "https://lh5.googleusercontent.com/-EwonQGBTYwo/T2WEXeVq3oI/AAAAAAAACZ8/4ixt2ZVlqrI/s36/04.gif", ";(");
		i(/\s;-\(+/g, "https://lh3.googleusercontent.com/-fMtAZDakmBI/T2WEXswr5BI/AAAAAAAACaA/83R1X_PumTk/s36/05.gif", ";-(");
		i(/\s:d/ig, "https://lh3.googleusercontent.com/-Em3lvBgvYlI/T2WElbV0BaI/AAAAAAAACdI/ApynphQdka8/s36/7.gif", ":d");
		i(/\s:-d/ig, "https://lh4.googleusercontent.com/-0R7-2DC1klM/T2WEmMQajfI/AAAAAAAACdM/-4JFCeC6QD8/s36/8.gif", ":-d");
		i(/\s@-\)+/g, "https://lh5.googleusercontent.com/-PE2GWBseiGk/T2acYH_uNRI/AAAAAAAAChg/HloTeaRIdyQ/s36/09.gif", "@-)");
		i(/\s:p/ig, "https://lh5.googleusercontent.com/-nkyzLkHUPg8/T2WEYdFqFxI/AAAAAAAACaQ/Mu1yPq91yuc/s36/10.gif", ":p");
		i(/\s:o/ig, "https://lh6.googleusercontent.com/-0-zgLVgK2Cg/T2WEY10FXuI/AAAAAAAACag/dyKQ5pPUIGQ/s36/11.gif", ":o");
		i(/\s:&gt;\)+/g, "https://lh3.googleusercontent.com/-xbWqvOWJNE0/T2WEZM-VLTI/AAAAAAAACak/8dLATIlXRDk/s36/12.gif", ":&gt;)");
		i(/\s\(o\)+/ig, "https://lh4.googleusercontent.com/-cguZVxYzR3o/T2WEZSgFvUI/AAAAAAAACas/nDJgr6YcuaI/s36/13.gif", "(o)");
		i(/\s\[-\(+/g, "https://lh5.googleusercontent.com/-VKGWq-wPGUw/T2WEaEQLA9I/AAAAAAAACa4/ZDnLP29mlgk/s36/14.gif", "[-(");
		i(/\s:-\?/g, "https://lh6.googleusercontent.com/-hIVRIc7IAJw/T2WEaO5ASUI/AAAAAAAACaw/FLmCvzeMSbc/s36/15.gif", ":-?");
		i(/\s\(p\)+/ig, "https://lh4.googleusercontent.com/-hk3q3tP-0Pg/T2WEcRONc5I/AAAAAAAACbY/bJ00rge5Mq8/s36/16.gif", "(p)");
		i(/\s:-s/ig, "https://lh5.googleusercontent.com/-cysJNcXxT-Q/T2WEcxVM5dI/AAAAAAAACbU/Mvuc437f1ZI/s36/17.gif", ":-s");
		i(/\s\(m\)+/ig, "https://lh6.googleusercontent.com/-H20tIsy7Hvw/T2WEbDW0R7I/AAAAAAAACbE/DymXsZOmO3s/s36/18.gif", "(m)");
		i(/\s8-\)+/ig, "https://lh4.googleusercontent.com/-IvNFZtzJJYI/T2WEcDj-0NI/AAAAAAAACbM/kiqtHbdkarQ/s36/19.gif", "8-)");
		i(/\s:-t/ig, "https://lh5.googleusercontent.com/-XCXdaCYaOGE/T2WEcmd15EI/AAAAAAAACbQ/Z5UyZCuX4Xo/s36/20.gif", ":-t");
		i(/\s:-b/ig, "https://lh4.googleusercontent.com/-g6V0tBD1vwk/T2WEdRGJfWI/AAAAAAAACbo/P8P_SGEdhzI/s36/21.gif", ":-b");
		i(/\sb-\(+/ig, "https://lh6.googleusercontent.com/-ErUGB8ea0H4/T2WEdm5-ZSI/AAAAAAAACbs/245Hxnaa82g/s35/22.gif", "b-(");
		i(/\s:-#/ig, "https://lh6.googleusercontent.com/-p-5AT-amLik/T2WEi_MJDqI/AAAAAAAACco/5J-MqivSQw4/s36/23.gif", ":-#");
		i(/\s=p~/ig, "https://lh3.googleusercontent.com/-H8izCFTaHFE/T2b39mmu2NI/AAAAAAAACkM/k4bDdFe301U/s36/24.gif", "=p~");
		i(/\s\$-\)+/ig, "https://lh5.googleusercontent.com/-LZn6dX8GslQ/T2W30lpp_kI/AAAAAAAAChA/Rym2Ql5H-jU/s36/25.gif", "$-)");
		i(/\s\(b\)+/ig, "https://lh5.googleusercontent.com/-k6r8YBUhxVk/T2WEgBtjFtI/AAAAAAAACcE/U5U5uPCpxq8/s36/26.gif", "(b)");
		i(/\s\(f\)+/ig, "https://lh5.googleusercontent.com/-pj6fMvZXTyc/T2WEga9-gjI/AAAAAAAACcM/kVpUCa7uqpw/s36/27.gif'", "(f)");
		i(/\sx-\)+/ig, "https://lh3.googleusercontent.com/-zI2UJmwerDM/T2WEhSRkuTI/AAAAAAAACcc/Gr3xFDrZF3Y/s36/28.gif", "x-)");
		i(/\s\(k\)+/ig, "https://lh3.googleusercontent.com/-ilBYLLWFQJQ/T2WEiJXJ7LI/AAAAAAAACcY/bXpkIPuVUto/s36/29.gif", "(k)");
		i(/\s\(h\)+/ig, "https://lh5.googleusercontent.com/-_NHYkuf5bZg/T2WEjOhTIxI/AAAAAAAACcg/76qRE27R_ig/s36/30.gif", "(h)");
		i(/\s\(c\)+/ig, "https://lh6.googleusercontent.com/-O6m44_Z-8AA/T2WEjLRImnI/AAAAAAAACck/c_jh643HU6o/s36/31.gif", "(c)");
		i(/\scheer/ig, "https://lh5.googleusercontent.com/-9TYEg93ImUM/T2WEjvuhxTI/AAAAAAAACc0/KQRBXuuV_Yg/s36/32.gif", "cheer");
		$("div.emoWrap").one("click", function () {
			if (a) {
				alert(a)
			}
		});
		$(".emo").css("cursor", "pointer").on("click", function (c) {
			$(".emoKey").remove();
			$(this).after('<input class="emoKey" type="text" size="' + this.alt.length + '" value=" ' + this.alt + '" />');
			$(".emoKey").trigger("select");
			c.stopPropagation()
		});
		$(".emoKey").on("click", function () {
			$(this).focus().select()
		});
		$(".emobutton").toggle(function () {
			$(this).addClass("active");
			$("div.emoWrap").slideDown();
			return false
		}, function () {
			$(this).removeClass("active");
			$("div.emoWrap").slideUp();
			return false
		});
		$(document).on("click", function () {
			$(".emoKey").remove()
		})
	};
	return function (a) {
		b(a)
	}
})();

//Ajax JSON Label by MKR
window.labelnyacx = function () {
	var e = function (b) {
		b = b || {};
		var e = b.url_blog || window.location.host,
		h = b.id_labelcontent || "#labelxnya",
		k = [],
		l,
		m = [],
		f = [],
		n,
		p,
		k = (b.labelNotShow || "").split(","),
		a = location.href;
		$.get("http://" + e + "/feeds/posts/summary?max-results=0&alt=json-in-script", function (d) {
			var c = d.feed.category,
			b = d = "";
			if (void 0 !== c) {
				var e = c.length;
				d = '<span>+</span><div class="bknslabel"><ul class="subnya-xitem">';
				for (var g = 0; g < e; g++)
					b += c[g].term + (c[g] !== c[e + 1] ? "," : "");
				l = b;
				m = l.split(",");
				$.each(m, function (b,
						a) {
					0 > $.inArray(a, k) && f.push(a)
				});
				-1 != a.indexOf("/search/label/") && (n = -1 != a.indexOf("?updated-max") ? a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?updated-max")) : -1 != a.indexOf("?&max") ? a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?&max")) : a.substr(a.lastIndexOf("/")), p = n.replace("/", "").replace("%20", " "));
				for (c = 0; c < f.length; c++)
					d += "<li><a " + (f[c] === p ? "class=activelabel" : "") + ' href="/search/label/' + encodeURIComponent(f[c]) + '">' + f[c] + "</a></li>";
				d += "</ul></div></div>";
				$(h).html(d);
				$("#labelxnya ul").mCustomScrollbar()
			} else
				$(h).html("<span>No Label!</span>")
		}, "jsonp");
		$(".xitem1 .liat").click(function () {
			$("#labelxnya").slideToggle("fast");
			$(this).toggleClass("active");
			$("#labelxnya ul").mCustomScrollbar("update");
			return !1
		})
	};
	return function (b) {
		e(b)
	}
}
();

//Ajax JSON NewsTicker by MKR
function NewsTicker(e) {
	!function (t) {
		var s = Alldefaultconfig,
		a = {
			blogURL : "",
			MaxPost : 10,
			Speed : .1,
			titleText : "Latest",
			displayType : "reveal",
			Container : "#newsticker",
			tagName : !1,
			MonthNames : s.monthName
		};
		a = t.extend({}, a, e),
		t(a.Container).addClass("loading"),
		t.get(("" === a.blogURL ? window.location.protocol + "//" + window.location.host : a.blogURL) + "/feeds/posts/summary" + (a.tagName === !1 ? "" : "/-/" + a.tagName) + "?max-results=" + a.MaxPost + "&orderby=published&alt=json-in-script", function (e) {
			var s,
			n,
			i,
			l,
			r,
			o,
			d,
			p,
			u,
			g,
			c,
			m = "",
			b = e.feed.entry;
			if (void 0 !== b) {
				for (var h = 0, f = b.length; f > h; h++) {
					for (var w = 0, y = b[h].link.length; y > w; w++)
						"alternate" == b[h].link[w].rel && (s = b[h].link[w].href);
					n = b[h].title.$t,
					g = b[h].published.$t.substring(0, 10),
					i = g.substring(0, 4),
					l = g.substring(5, 7),
					r = g.substring(8, 10),
					o = a.MonthNames[parseInt(l, 10) - 1],
					d = b[h].published.$t.substring(11, 16),
					p = d.substring(0, 2),
					u = d.substring(2, 5),
					c = 12 > p ? "AM" : "PM",
					0 === p && (p = 12),
					p > 12 && (p -= 12),
					m += '<li class="news-item"><span title="' + o + " " + r + ", " + i + '" class="date">' + p + u + " " + c + '</span> <a class="title" href="' + s + '">' + n + "</a></li>"
				}
				t(a.Container).html('<ul class="js-hidden" id="newstick">' + m + "</ul>").removeClass("loading"),
				t("#newstick").ticker({
					speed : a.Speed,
					direction : t("#outer-wrapper").attr("class"),
					titleText : a.titleText,
					displayType : a.displayType
				})
			} else
				t(a.Container).html("<span>No result!</span>").removeClass("loading")
		}, "jsonp")
	}
	(jQuery)
}

//Ajax JSON Related Post by MKR
function relatedPostsWidget(e) {
	!function (t) {
		var a = Alldefaultconfig,
		l = {
			blogURL : "",
			maxPosts : "carousel" === a.RelatedStyle ? 8 : 6,
			maxTags : 4,
			maxPostsPerTag : 6,
			containerSelector : "#related_posts",
			tags : null,
			loadingText : "",
			loadingClass : "loadingxx",
			relevantTip : "",
			ShowComment : !0,
			ShowDate : !0,
			DateFloat : !1,
			ShowDesc : "carousel" === a.RelatedStyle ? !1 : !0,
			rlt_summary : a.summaryLength,
			relatedTitle : a.RelatedTitle,
			readMoretext : "Read more »",
			rlpBlank : a.BackupImage,
			rlt_thumb : "carousel" === a.RelatedStyle ? 200 : 70,
			recentTitle : a.RecentTitle,
			MonthNames : a.monthName,
			postScoreClass : "",
			onLoad : !1
		};
		l = t.extend({}, l, e);
		var o = 0,
		s = null,
		r = null;
		l.containerSelector || (document.write('<div id="related_posts"></div>'), l.containerSelector = "#related_posts");
		var n = function (e) {
			if (o++, e.feed.entry)
				for (var r = 0, n = e.feed.entry.length; n > r; r++) {
					for (var c, d, p, u, m, g, h, f, v, b, y = e.feed.entry[r], S = [], w = [], x = 0, T = y.link.length; T > x; x++)
						if ("alternate" == y.link[x].rel) {
							c = y.link[x].href;
							break
						}
					for (var R = 0, k = y.link.length; k > R; R++)
						if ("replies" == y.link[R].rel && "text/html" == y.link[R].type) {
							m = y.link[R].title.split(" ")[0];
							break
						}
					if (d = "content" in y ? y.content.$t : "summary" in y ? y.summary.$t : "", "media$thumbnail" in y)
						u = y.media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/s" + l.rlt_thumb + "-c"), -1 != y.media$thumbnail.url.indexOf("img.youtube.com") && (u = y.media$thumbnail.url.replace("default", "0"));
					else if (null != (S = d.match(/src=(?:\"|\')?([^>]*[^\/].(?:jpg|bmp|gif|png))(?:\"|\')?/gi)))
						u = S[0].replace("src=", "").replace(/"/g, "").replace(/'/g, "");
					else if (null != (w = d.match(/(youtu.be\/|youtube.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&\"\'>]+)/gi))) {
						var C = w[0].match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
						C && 11 == C[7].length && (u = "http://img.youtube.com/vi/" + C[7] + "/0.jpg")
					} else
						u = l.rlpBlank;
					d = d.replace(/<\S[^>]*>/g, ""),
					d.length > l.rlt_summary && (d = d.substring(0, l.rlt_summary) + "..."),
					p = y.title.$t,
					g = y.published.$t.substring(0, 10),
					h = g.substring(0, 4),
					f = g.substring(5, 7),
					v = g.substring(8, 10),
					b = l.MonthNames[parseInt(f, 10) - 1],
					location.href.toLowerCase() != c.toLowerCase() && i(c, p, u, d, h, v, b, m)
				}
			if (o >= l.tags.length && (t(l.containerSelector + " ul").removeClass(l.loadingClass), t("#related-posts-loadingtext", s).remove(), l.maxPosts > 0 && t("li:gt(" + (l.maxPosts - 1) + ")", t(l.containerSelector + " ul")).remove(), "carousel" === a.RelatedStyle)) {
				var _,
				P,
				I = t(l.containerSelector + " .relatednyacar").width();
				300 > I ? (P = 1, _ = I / P) : 450 > I ? (P = 2, _ = I / P) : 700 > I ? (P = 3, _ = I / P) : (P = 4, _ = I / P),
				t(l.containerSelector + " .relatednyacar").flexslider({
					animation : "slide",
					selector : ".rltcaraousel > li",
					animationLoop : !0,
					itemWidth : _,
					minItems : 1,
					move : P,
					mousewheel : !0,
					maxItems : 4
				})
			}
		},
		i = function (e, o, s, r, n, i, p, u) {
			for (var m = t("li", t(l.containerSelector + " ul")), g = 0, h = m.length; h > g; g++) {
				var f = t("a", m.eq(g)),
				v = c(f);
				if (f.attr("href") == e) {
					d(f, ++v);
					for (var b = g - 1; b >= 0; b--) {
						var y = t("a", m.eq(b));
						if (c(y) > v)
							return void(g - b > 1 && m.eq(b).after(m.eq(g)))
					}
					return void(g > 0 && m.eq(0).before(m.eq(g)))
				}
			}
			t(l.containerSelector + " ul").append('<li><div class="inner"><div class="thumbimage rltdimg"><a title="' + o + '" href="' + e + '"><img alt="' + o + '" src="' + s + '"/>' + (-1 != s.indexOf("img.youtube.com") || -1 != s.indexOf("ytimg.googleusercontent.com") ? '<span class="youtubeplay"><i class="icon-youtube-play"></i></span>' : "") + '</a></div><strong><a class="jdlunya" href="' + e + '" title="' + (l.relevantTip ? l.relevantTip.replace("d", 1) : "") + '">' + o + '</a></strong><div class="info">' + (l.ShowDate === !0 ? '<span class="date' + (l.DateFloat === !0 || "carousel" === a.RelatedStyle ? " floatd" : "") + '"><span class="dd">' + i + '</span> <span class="dm">' + p + '</span> <span class="dy">' + n + "</span></span>" : "") + (l.ShowComment === !0 ? '<span class="comnum"><a href="' + e + '#comment-form">' + u + "</a></span>" : "") + "</div><p " + (l.ShowDesc === !0 && "carousel" !== a.RelatedStyle ? 'style="display:block"' : "") + ">" + r + '<a title="' + o + '" href="' + e + '">' + l.readMoretext + '</a></p><div class="socialpostshare"><a target="_blank" title="Share to Facebook" class="facebook" href="http://www.facebook.com/share.php?u=' + encodeURIComponent(e) + "&t=" + encodeURIComponent(o) + '"><i class="icon-facebook"></i></a><a target="_blank" title="Share to Twitter" class="twitter" href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(o) + "&amp;url=" + encodeURIComponent(e) + '"><i class="icon-twitter"></i></a><a target="_blank" title="Share to Google Plus" class="google-plus" href="https://plus.google.com/share?url=' + encodeURIComponent(e) + '"><i class="icon-google-plus"></i></a></div></div></li>')
		},
		c = function (e) {
			var t = parseInt(e.attr("score"));
			return t > 0 ? t : 1
		},
		d = function (e, t) {
			e.attr("score", t),
			l.relevantTip && e.attr("title", l.relevantTip.replace("d", t)),
			l.postScoreClass && e.attr("class", l.postScoreClass + t)
		},
		p = function () {
			if ("#related_posts" != l.containerSelector) {
				var e = t(l.containerSelector);
				if (1 != e.length)
					return;
				s = t('<div id="related_posts"></div>').appendTo(e)
			} else
				s = t(l.containerSelector);
			if ("carousel" === a.RelatedStyle && s.addClass("rltcarousel"), l.tags || (l.tags = [], t('a[rel="tag"]:lt(' + l.maxTags + ")").each(function () {
						var e = t.trim(t(this).text().replace(/\n/g, ""));
						-1 == t.inArray(e, l.tags) && (l.tags[l.tags.length] = e)
					})), 0 != l.tags.length || l.recentTitle)
				if (0 == l.tags.length ? t("<h4><span>" + l.recentTitle + "</span></h4>").appendTo(s) : l.relatedTitle && t("<h4><span>" + l.relatedTitle + "</span></h4>").appendTo(s), l.loadingText && t('<div id="related-posts-loadingtext">' + l.loadingText + "</div>").appendTo(s), r = t('<div class="relatedinner"><div class="relatednyacar"><ul class="' + (l.loadingClass ? l.loadingClass : "") + ("carousel" === a.RelatedStyle ? " rltcaraousel" : "") + '"></ul></div></div>').appendTo(s), 0 == l.tags.length)
					t.get(("" === l.blogURL ? window.location.protocol + "//" + window.location.host : l.blogURL) + "/feeds/posts/default?max-results=" + l.maxPostsPerTag + "&orderby=published&alt=json-in-script", n, "jsonp");
				else
					for (var o = 0; o < l.tags.length; o++)
						t.get(("" === l.blogURL ? window.location.protocol + "//" + window.location.host : l.blogURL) + "/feeds/posts/default/-/" + l.tags[o] + "?max-results=" + l.maxPostsPerTag + "&orderby=published&alt=json-in-script", n, "jsonp")
		};
		p()
	}
	(jQuery)
}

//Ajax JSON Auto Featured Post by MKR
!function (t) {
	var o = Alldefaultconfig;
	t.AutofeaturedPost = function (o, e) {
		var a = this;
		a.$el = t(o),
		a.init = function () {
			a.options = t.extend({}, t.AutofeaturedPost.defaultOptions, e),
			a.$el.html('<div class="autofeaturedpost"><div class="featpost camera_wrap camera_sevida_skin ' + (a.options.pagination ? "pageyes" : "") + '"></div></div>').addClass("loadingxx");
			var o = function (t) {
				for (var o, e, n, s, i, l, p, r, d, m = "", u = [], c = [], h = a.options.Random ? shuffleArray(t.feed.entry) : t.feed.entry, g = 0, f = h.length; f > g; g++) {
					for (var b = h[g].link.length, v = 0; b > v; v++)
						if ("alternate" == h[g].link[v].rel) {
							o = h[g].link[v].href;
							break
						}
					for (var w = 0; b > w; w++)
						if ("replies" == h[g].link[w].rel && "text/html" == h[g].link[w].type) {
							s = Number(h[g].link[w].title.split(" ")[0]);
							break
						}
					if (n = "content" in h[g] ? h[g].content.$t : "summary" in h[g] ? h[g].summary.$t : "", "media$thumbnail" in h[g])
						l = h[g].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/s" + a.options.ImageSize), -1 != h[g].media$thumbnail.url.indexOf("img.youtube.com") && (l = h[g].media$thumbnail.url.replace("default", "0"));
					else if (null != (u = n.match(/src=(?:\"|\')?([^>]*[^\/].(?:jpg|bmp|gif|png))(?:\"|\')?/gi)))
						l = u[0].replace("src=", "").replace(/"/g, "").replace(/'/g, "");
					else if (null != (c = n.match(/(youtu.be\/|youtube.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&\"\'>]+)/gi))) {
						var y = c[0].match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
						y && 11 == y[7].length && (l = "http://img.youtube.com/vi/" + y[7] + "/0.jpg")
					} else
						l = a.options.pBlank;
					n = n.replace(/<\S[^>]*>/g, "").replace(/"/g, "&quot;"),
					n.length > a.options.Summarylength && (n = n.substring(0, a.options.Summarylength) + "..."),
					e = h[g].title.$t,
					i = h[g].published.$t.substring(0, 10),
					p = i.substring(0, 4),
					r = i.substring(5, 7),
					d = i.substring(8, 10),
					nmbln = a.options.MonthNames[parseInt(r, 10) - 1],
					m += '<div data-thumb="' + l + '" data-src="' + l + '" data-link="' + o + '"><div class="camera_caption fadeFromBottom"><div class="inner"><h4><a href="' + o + '">' + e + "</a></h4>" + (n.length > 0 ? "<p>" + n + "</p>" : "") + (a.options.ShowDate || a.options.ShowComment ? '<div class="info"><span class="infoinner">' + (a.options.ShowDate ? '<span class="date"><span class="dd">' + d + '</span> <span class="dm">' + nmbln + '</span> <span class="dy">' + p + "</span></span>" : "") + (a.options.ShowComment ? '<span class="comnum"><a href="' + o + '#comment-form">' + s + "</a></span>" : "") + "</span></div>" : "") + "</div></div></div>"
				}
				a.$el.find("div.featpost").html(m),
				a.$el.find("div.featpost").camera({
					height : a.options.height,
					loader : a.options.loader,
					pagination : a.options.pagination,
					thumbnails : a.options.thumbnails,
					time : a.options.slideSpeed
				}),
				a.$el.removeClass("loadingxx")
			};
			a.options.Random ? t.get(("" === a.options.blogURL ? window.location.protocol + "//" + window.location.host : a.options.blogURL) + "/feeds/posts/summary" + (a.options.tagName === !1 ? "" : "/-/" + a.options.tagName) + "?max-results=0&orderby=published&alt=json-in-script", function (e) {
				var n = a.options.MaxPost > e.feed.openSearch$totalResults.$t ? 1 : getRandomInt(1, e.feed.openSearch$totalResults.$t - a.options.MaxPost);
				t.get(("" === a.options.blogURL ? window.location.protocol + "//" + window.location.host : a.options.blogURL) + "/feeds/posts/default" + (a.options.tagName === !1 ? "" : "/-/" + a.options.tagName) + "?max-results=" + a.options.MaxPost + "&orderby=published&start-index=" + n + "&alt=json-in-script", o, "jsonp")
			}, "jsonp") : t.get(("" === a.options.blogURL ? window.location.protocol + "//" + window.location.host : a.options.blogURL) + "/feeds/posts/default" + (a.options.tagName === !1 ? "" : "/-/" + a.options.tagName) + "?max-results=" + a.options.MaxPost + "&orderby=published&alt=json-in-script", o, "jsonp")
		},
		a.init()
	},
	t.AutofeaturedPost.defaultOptions = {
		blogURL : "",
		MaxPost : 5,
		ImageSize : 600,
		Summarylength : o.summaryLength,
		slideSpeed : o.slideshowSpeed,
		height : "50%",
		pagination : !0,
		thumbnails : !0,
		ShowDate : !0,
		ShowComment : !0,
		loader : "pie",
		Random : !0,
		MonthNames : o.monthName,
		pBlank : o.BackupImage,
		tagName : !1
	},
	t.fn.AutofeaturedPost = function (o) {
		return this.each(function () {
			new t.AutofeaturedPost(this, o)
		})
	}
}
(jQuery);

//Scroll Top by MKR
(function (a) {
	a(window).scroll(function () {
		if (a(this).scrollTop() > 250) {
			a("#top").removeAttr("href");
			a("#top").stop().animate({
				height : 40,
				opacity : 1
			}, {
				duration : 500,
				queue : false
			})
		} else {
			a("#top").stop().animate({
				height : 0,
				opacity : 0
			}, {
				duration : 500,
				queue : false
			})
		}
	});
	a(function () {
		a("#top").click(function () {
			a("html, body").animate({
				scrollTop : 0
			}, "slow");
			return false
		})
	})
})(jQuery);

//Ajax JSON Recent Commnet
function RecentComments(a) {
	(function (b) {
		var c = {
			blogURL : "",
			numComments : 4,
			characters : 100,
			id_containrc : "#rcentcomnets",
			avatarSize : 50,
			loadingClass : "loadingxx",
			Showimage : true,
			defaultAvatar : "http://4.bp.blogspot.com/-AEWksK942OE/UFiyLzXJhiI/AAAAAAAAFKE/jBegaGPClxI/s70/user-anonymous-icon.png",
			MonthNames : Alldefaultconfig.monthName,
			maxfeeds : 50,
			adminBlog : ""
		};
		c = b.extend({}, c, a);
		b(c.id_containrc).addClass(c.loadingClass);
		b.get((c.blogURL === "" ? window.location.protocol + "//" + window.location.host : c.blogURL) + "/feeds/comments/default?alt=json-in-script&orderby=published", function (y) {
			var e,
			d = y.feed.entry;
			if (d !== undefined) {
				e = "<ul class='rcomnetxx'>";
				ntotal = 0;
				for (var x = 0; x < c.maxfeeds; x++) {
					var n,
					z,
					C,
					k,
					D,
					j,
					r;
					if (x == d.length) {
						break
					}
					if (ntotal >= c.numComments) {
						break
					}
					var g = d[x];
					for (var t = 0; t < g.link.length; t++) {
						if (g.link[t].rel == "alternate") {
							n = g.link[t].href
						}
					}
					for (var B = 0; B < g.author.length; B++) {
						z = g.author[B].name.$t;
						C = g.author[B].gd$image.src
					}
					if (z != c.adminBlog && ntotal < c.numComments) {
						ntotal++;
						e += "<li>";
						if (C == "http://img1.blogblog.com/img/blank.gif") {
							k = c.defaultAvatar
						} else {
							k = C.replace(/\/s[0-9]+(\-c|\/)/, "/s" + c.avatarSize + "$1")
						}
						j = (g.author[0].uri) ? g.author[0].uri.$t : "#nope";
						e += (c.Showimage === true ? '<a class="kmtimg" href="' + j + '"><img src="' + k + '"  title="' + z + '" alt="' + z + '" style="width:' + c.avatarSize + "px;height:" + c.avatarSize + 'px;display:block"/></a>' : "");
						var q = n.lastIndexOf("/") + 1,
						s = n.lastIndexOf("."),
						E = n.split("-").join(" ").substring(q, s) + "...";
						D = g.published.$t.substring(0, 10);
						var p = D.substring(0, 4),
						u = D.substring(5, 7),
						A = D.substring(8, 10),
						v = c.MonthNames[parseInt(u, 10) - 1],
						o = g.published.$t.substring(11, 16),
						h = o.substring(0, 2),
						w = o.substring(2, 5);
						if (h < 12) {
							r = "AM"
						} else {
							r = "PM"
						}
						if (h === 0) {
							h = 12
						}
						if (h > 12) {
							h = h - 12
						}
						e += '<div class="ketkomt"><a target="_blank" rel="nofollow" href="' + j + '"><strong>' + z + '</strong></a> on <a class="judulx" href="' + n + '">' + E + '</a><div class="date"><span class="dd">' + A + '</span> <span class="dm">' + v + '</span> <span class="dy">' + p + '</span> <span class="timex">' + h + w + " " + r + "</span></div></div>";
						var m = g.content.$t;
						var f = m.replace(/(<([^>]+)>)/gi, "");
						if (f !== "" && f.length > c.characters) {
							f = f.substring(0, c.characters);
							f += "..."
						} else {
							f = f
						}
						e += (c.characters > 0 ? "<p>" + f + "</p>" : "");
						e += "</li>"
					}
				}
				e += "</ul>";
				b(c.id_containrc).html(e).removeClass(c.loadingClass)
			} else {
				b(c.id_containrc).html("<span>No result!</span>").removeClass(c.loadingClass)
			}
		}, "jsonp")
	})(jQuery)
};

//Manual Featured Post by MKR
function manualfeaturedPost(a) {
	!function (e) {
		var i = Alldefaultconfig,
		t = {
			slideSpeed : i.slideshowSpeed,
			height : "50%",
			pagination : !0,
			thumbnails : !0,
			loader : "pie"
		};
		t = e.extend({}, t, a);
		var n,
		d,
		s;
		n = e("#main-top-manualslide"),
		d = n.children(".Image"),
		s = d.length,
		s && (n.append('<div class="bungkusmanualfeatured"><div class="manualfeaturedpost"><div class="featpost camera_wrap camera_sevida_skin ' + (t.pagination ? "pageyes" : "") + '"></div></div></div>'), d.each(function () {
				var a,
				i,
				t,
				n,
				d = e(this);
				a = d.find("h2").text(),
				i = d.find(".widget-content img").attr("src"),
				t = d.find(".widget-content a").attr("href"),
				n = d.find(".caption").text(),
				e('<div data-thumb="' + i + '" data-src="' + i + '" data-link="' + t + '" />').append('<div class="camera_caption fadeFromBottom"><div class="inner"><h4><a href="' + t + '">' + a + "</a></h4>" + (n.length > 0 ? "<p>" + n + "</p>" : "") + "</div></div>").appendTo("#main-top-manualslide div.featpost"),
				e(this).remove()
			}), e("#main-top-manualslide .camera_sevida_skin").camera({
				height : t.height,
				loader : t.loader,
				pagination : t.pagination,
				thumbnails : t.thumbnails,
				time : t.slideSpeed
			}))
	}
	(jQuery)
}

// CommentMode by MKR
window.commentMode = function () {
	var e = function (e) {
		function o() {
			return $(d).fadeIn(),
			$(n).fadeOut(),
			$(f).fadeOut(),
			C.addClass("active"),
			c.removeClass("active"),
			k.removeClass("active"),
			createCookie(d, null, 1e4),
			eraseCookie(n),
			eraseCookie(f),
			!1
		}
		function a() {
			return $(n).fadeIn(),
			$(d).fadeOut(),
			$(f).fadeOut(),
			C.removeClass("active"),
			k.removeClass("active"),
			c.addClass("active"),
			createCookie(n, null, 1e4),
			eraseCookie(d),
			eraseCookie(f),
			!1
		}
		function r() {
			return $(f).fadeIn(),
			$(d).fadeOut(),
			$(n).fadeOut(),
			C.removeClass("active"),
			c.removeClass("active"),
			k.addClass("active"),
			createCookie(f, null, 1e4),
			eraseCookie(d),
			eraseCookie(n),
			!1
		}
		var i = e || {},
		s = Alldefaultconfig,
		t = i.Commentmodedefault || s.CommentMode,
		C = $("#comment-post-message a.blogger_cm"),
		k = $("#comment-post-message a.disqus_cm"),
		c = $("#comment-post-message a.facebook_cm"),
		d = C.attr("href"),
		n = c.attr("href"),
		f = k.attr("href");
		readCookie(n) && "facebook" == t ? (a(), eraseCookie(n)) : readCookie(f) && "disqus" == t ? (r(), eraseCookie(f)) : readCookie(d) && "blogger" == t ? (o(), eraseCookie(d)) : readCookie(d) && "blogger" != t ? (o(), eraseCookie(d)) : readCookie(n) && "facebook" != t ? (a(), eraseCookie(n)) : readCookie(f) && "disqus" != t ? (r(), eraseCookie(f)) : readCookie(n) ? (a(), eraseCookie(n)) : readCookie(d) ? (o(), eraseCookie(d)) : readCookie(f) ? (r(), eraseCookie(f)) : "facebook" == t ? (a(), eraseCookie(n)) : "disqus" == t ? (r(), eraseCookie(f)) : (o(), eraseCookie(d)),
		C.click(o),
		c.click(a),
		k.click(r)
	};
	return function (o) {
		e(o)
	}
}
();

/*!
highlight v4
Highlights arbitrary terms.
<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>
MIT license.
Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>
 */
(function ($) {
	$.fn.highlight = function (pat) {
		function innerHighlight(node, pat) {
			var skip = 0;
			if (node.nodeType == 3) {
				var pos = node.data.toUpperCase().indexOf(pat);
				if (pos >= 0) {
					var spannode = document.createElement("span");
					spannode.className = "highlight";
					var middlebit = node.splitText(pos);
					var endbit = middlebit.splitText(pat.length);
					var middleclone = middlebit.cloneNode(true);
					spannode.appendChild(middleclone);
					middlebit.parentNode.replaceChild(spannode, middlebit);
					skip = 1
				}
			} else {
				if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
					for (var i = 0; i < node.childNodes.length; ++i) {
						i += innerHighlight(node.childNodes[i], pat)
					}
				}
			}
			return skip
		}
		return this.length && pat && pat.length ? this.each(function () {
			innerHighlight(this, pat.toUpperCase())
		}) : this
	};
	$.fn.removeHighlight = function () {
		return this.find("span.highlight").each(function () {
			this.parentNode.firstChild.nodeName;
			with (this.parentNode) {
				replaceChild(this.firstChild, this);
				normalize()
			}
		}).end()
	}
})(jQuery);
(function (a) {
	a(document).ready(function () {
		var c = a("#text-finder"),
		e = c.children().first(),
		f = e.next(),
		d = a(".post-body"),
		g = a("html, body");
		e.on("keyup", function () {
			d.removeHighlight().highlight(this.value);
			g.scrollTop(d.find("span.highlight").first().offset().top - 50)
		});
		f.on("click", function () {
			d.removeHighlight();
			e.val("").trigger("focus");
			g.scrollTop(0);
			return false
		});
		var b = readCookie("font_size");
		if (b != "" && b != null) {
			a(".post-body").css("font-size", b + "px")
		}
		a(".zoom-text").click(function () {
			var j = a(".post-body").css("font-size");
			j = j.replace("px", "");
			var h = a(this).attr("class");
			var i = Number(j);
			if (h.indexOf("zoom-in-text") != -1) {
				i++
			} else {
				i -= 1
			}
			createCookie("font_size", i);
			a(".post-body").css("font-size", i + "px");
			return false
		})
	})
})(jQuery);

/**
 * Simple Tab JQuery Plugin by Taufik Nurrohman
 * With some help: http://css-tricks.com/forums/discussion/18008/jquery-plugin-patterns-that-can-be-applied-for-multiple-elements
 * On: 9 June 2012
 * https://plus.google.com/108949996304093815163/about
 */
(function (a) {
	a.fn.simpleTab = function (b) {
		b = jQuery.extend({
				active : 1,
				fx : null,
				showSpeed : 400,
				hideSpeed : 400,
				showEasing : null,
				hideEasing : null,
				show : function () {},
				hide : function () {},
				change : function () {}

			}, b);
		return this.each(function () {
			var e = a(this),
			c = e.children("[data-tab]"),
			d = b.active - 1;
			e.addClass("simpleTab").prepend('<ul class="tab-wrapper"></ul>');
			c.addClass("tab-content").each(function () {
				a(this).hide();
				e.find(".tab-wrapper").append('<li><a href="#">' + a(this).data("tab") + "</a></li>")
			}).eq(d).show();
			e.find(".tab-wrapper a").on("click", function () {
				var f = a(this).parent().index();
				a(this).closest(".tab-wrapper").find(".activeTab").removeClass("activeTab");
				a(this).addClass("activeTab");
				if (b.fx == "slide") {
					if (c.eq(f).is(":hidden")) {
						c.slideUp(b.hideSpeed, b.hideEasing, function () {
							b.hide.call(e)
						}).eq(f).slideDown(b.showSpeed, b.showEasing, function () {
							b.show.call(e)
						})
					}
				} else {
					if (b.fx == "fade") {
						if (c.eq(f).is(":hidden")) {
							c.hide().eq(f).fadeIn(b.showSpeed, b.showEasing, function () {
								b.show.call(e)
							})
						}
					} else {
						if (b.fx == "fancyslide") {
							if (c.eq(f).is(":hidden")) {
								c.slideUp(b.hideSpeed, b.hideEasing, function () {
									b.hide.call(e)
								}).eq(f).delay(b.hideSpeed).slideDown(b.showSpeed, b.showEasing, function () {
									b.show.call(e)
								})
							}
						} else {
							if (c.eq(f).is(":hidden")) {
								c.hide().eq(f).show()
							}
						}
					}
				}
				b.change.call(e);
				return false
			}).eq(d).addClass("activeTab")
		})
	}
})(jQuery);
function callregex(t) {
	var e = configSummary;
	t("#outer-wrapper .Label").each(function () {
		var a,
		i,
		s,
		l,
		n,
		o,
		d = t(this).children("h2").html(),
		r = [],
		c = t(this).attr("id");
		r = d.match(/[^[\]]+(?=])/g),
		/[^[\]]+(?=])/g.test(d) && (a = t(this).find(".widget-content li").length > 1 && (null !== r[5] || "" !== r[5] || void 0 !== r[5]) ? r[5] : t(this).find(".widget-content li").length > 1 ? !1 : t(this).find(".widget-content li a").html(), t(this).children("h2").html("<span>" + r[0] + "</span>"), t(this).children(".widget-content").html('<div class="shortrpt" id="' + c + 'rcb"></div>'), i = "slider1" === r[1] ? "s" : "gallery1" === r[1] ? "g1" : "gallery2" === r[1] ? "g2" : "horizontal" === r[1] ? "h" : "combine" === r[1] ? "c" : "slider2" === r[1] ? "s" : "hot" === r[1] ? "ht" : "v", s = "slider2" === r[1] ? "f" : "c", n = "animated" === r[2] ? !0 : !1, l = "random" === r[2] ? !0 : !1, o = "noimage" === r[1] ? !1 : !0, "featuredpost" === r[1] || "featuredpost2" === r[1] ? t("#" + c + "rcb").AutofeaturedPost({
				blogURL : null === r[4] || "" === r[4] || void 0 === r[4] ? "" : r[4],
				MaxPost : r[3],
				Random : l,
				pagination : "featuredpost2" === r[1] ? !1 : !0,
				tagName : a
			}) : t("#" + c + "rcb").RecentPostbyTag({
				blogURL : null === r[4] || "" === r[4] || void 0 === r[4] ? "" : r[4],
				MaxPost : r[3],
				tagName : a,
				postType : i,
				sliderType : s,
				animated : n,
				ShowImage : o,
				Random : l,
				MoreNumPost : e.postPerPage,
				FirstImageSize : "gallery2" === r[1] ? "s80-c" : "simple" === r[1] ? "s80-c" : "s200-c",
				AjaxLoad : !1,
				ImageSize : "slider1" === r[1] ? "s200-c" : "slider2" === r[1] ? "s600" : "hot" === r[1] ? "s200-c" : "s80-c"
			}), t(this).removeClass("Label").addClass(r[1]), t(this).children(".widget-content").removeClass("list-label-widget-content")),
		t(this).css("visibility", "visible")
	}),
	t(window).on("load resize", changeimage),
	t(".sevidarcomment").each(function () {
		var e = t(this).attr("data-number"),
		a = t(this).attr("data-author");
		t(this).RecentComments({
			numComments : null === e || "" === e || void 0 === e ? 5 : e,
			adminBlog : null === a || "" === a || void 0 === a ? "" : a
		})
	}),
	t(".socialmedia li a").each(function () {
		var e = t(this),
		a = e.text(),
		i = e.parent("li");
		i.addClass("so" + decodeURIComponent(a.replace(/\+/g, "").replace(/\./g, "").toLowerCase())),
		t(this).attr("target", "_blank")
	}),
	t(".sf-menu > li").hover(function () {
		var a = t(this),
		i = a.find(".sevidarecentag > div");
		0 === i.length && a.find(".sevidarecentag").each(function () {
			var a = t(this).attr("data-number"),
			i = t(this).attr("data-tag"),
			s = t(this).attr("data-type"),
			l = t(this).attr("data-random");
			void 0 !== s && t(this).addClass(s),
			t(this).RecentPostbyTag({
				MaxPost : null === a || "" === a || void 0 === a ? 5 : a,
				tagName : null === i || "" === i || void 0 === i ? !1 : i,
				postType : "slider1" === s ? "s" : "gallery1" === s ? "g1" : "gallery2" === s ? "g2" : "horizontal" === s ? "h" : "combine" === s ? "c" : "slider2" === s ? "s" : "hot" === s ? "ht" : "v",
				sliderType : "slider2" === s ? "f" : "c",
				animated : "animated" === l ? !0 : !1,
				ShowImage : "noimage" === s ? !1 : !0,
				Random : null === l || "0" === l || void 0 === l ? !1 : !0,
				MoreNumPost : e.postPerPage,
				FirstImageSize : "gallery2" === s ? "s80-c" : "simple" === s ? "s80-c" : "s200-c",
				AjaxLoad : !1,
				ImageSize : "slider1" === s ? "s200-c" : "slider2" === s ? "s600" : "hot" === s ? "s200-c" : "s80-c"
			})
		})
	})
}
function defaultnavi() {
	"LoadMore" === configSummary.defaultNavigation ? loadMorePost() : pageNavi()
}