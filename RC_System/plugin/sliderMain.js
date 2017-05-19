var App = App || {};
! function() {
    var t = function() {
        var t, e, i = function() {
                t = $(window), e = $(".js-slider"), e.length && (a(), e.imagesLoaded(function() {
                    e.addClass("show")
                }))
            },
            a = function() {
                e.hasClass("slick-initialized") || e.slick({
                    infinite: !0,
                    autoplay: !0,
                    autoplaySpeed: 5e3,
                    speed: 500,
                    easing: "swing",
                    pauseOnHover: !1,
                    slidesToScroll: 1,
                    adaptiveHeight: !0,
                    touchThreshold: 6,
                    fade: !0,
                    dots: !0,
                    arrows: !1
                })
            };
        return {
            initialize: i
        }
    }();
    App.headerSlider = t, App.headerSlider.initialize()
}(), ! function(t) {
    function e(a) {
        if (i[a]) return i[a].exports;
        var r = i[a] = {
            exports: {},
            id: a,
            loaded: !1
        };
        return t[a].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
    }
    var i = {};
    return e.m = t, e.c = i, e.p = "", e(0)
}([function(t, e, i) {
    var a, r;
    a = i(1), r = new a
}, function(t, e, i) {
    var a, r, n = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    };
    r = i(2), a = function() {
        function t() {
            this._onScrollTimeout = n(this._onScrollTimeout, this), this._onWheel = n(this._onWheel, this), this._onTick = n(this._onTick, this);
            var t;
            t = ".js-star", this._timeoutId = -1, this._renderer = PIXI.autoDetectRenderer(180, 360, {
                transparent: !0,
                antialias: !0,
                resolution: 2
            }), $(t).append(this._renderer.view), $(this._renderer.view).width("100%"), this._stage = new PIXI.Container, this._params = {
                debug: !0,
                lifetime: .3,
                lifetimeRange: .2,
                birthCenterX: 90,
                birthRangeX: 80,
                birthCenterY: 50,
                birthRangeY: 120,
                birthAlpha: 1,
                birthAlphaRange: 0,
                deathAlpha: 1,
                deathAlphaRange: 0,
                birthScale: .1,
                birthScaleRange: .15,
                deathScale: 0,
                deathScaleRange: 0,
                velocityX: 0,
                velocityXRange: .75,
                velocityY: 1.5,
                velocityYRange: 1,
                accelerationY: .075,
                accelerationYRange: .075,
                accelerationX: 0,
                accelerationXRange: 0,
                friction: .85,
                direction: 0,
                birthRate: 1,
                blinkEnabled: !1,
                depthColorEnabled: !1
            }, this._movingAverage = new r(10), PIXI.ticker.shared.add(this._onTick), this._addEvents()
        }
        return t.prototype._onTick = function() {
            var t, e, i, a;
            if (t = this._movingAverage.getAverage(), 0 > t ? this._params.direction = -1 : t > 0 ? this._params.direction = 1 : this._params.direction = 0, 0 !== this._params.direction)
                for (e = i = 0, a = this._params.birthRate; a >= 0 ? a > i : i > a; e = a >= 0 ? ++i : --i) this.emit();
            this._renderer.render(this._stage)
        }, t.prototype._addEvents = function() {
            var t, e, i;
            i = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
            try {
                document.addEventListener(i, this._onWheel, !1)
            } catch (e) {
                t = e, document.attachEvent("onmousewheel", this._onWheel)
            }
        }, t.prototype._onWheel = function(t) {
            var e;
            t || (t = window.event), e = t.deltaY ? -t.deltaY : t.wheelDelta ? t.wheelDelta : -t.detail, this._movingAverage.addRawValue(e), clearTimeout(this._timeoutId), this._timeoutId = setTimeout(this._onScrollTimeout, 300)
        }, t.prototype._onScrollTimeout = function() {
            this.reset()
        }, t.prototype.reset = function() {
            this._movingAverage.reset(), this._params.direction = 0
        }, t.prototype.emit = function() {
            var t, e, a, r, n, s, o;
            r = i(3), s = PIXI.Sprite.fromImage(r), s.anchor.x = s.anchor.y = .5, this._stage.addChild(s), t = function(t, e) {
                return t + e * Math.random() - .5 * e
            }, s.x = t(this._params.birthCenterX, this._params.birthRangeX), s.y = t(this._params.birthCenterY, this._params.birthRangeY), s.alpha = t(this._params.birthAlpha, this._params.birthAlphaRange), s.scale.x = s.scale.y = s.__scale = t(this._params.birthScale, this._params.birthScaleRange), s.__velocityX = t(this._params.velocityX, this._params.velocityXRange), s.__velocityY = t(this._params.velocityY, this._params.velocityYRange), s.__accelerationX = t(this._params.accelerationX, this._params.accelerationXRange), s.__accelerationY = t(this._params.accelerationY, this._params.accelerationYRange), n = s.__scale / this._params.birthScale * .9 + .1, s.__velocityX *= n, s.__velocityY *= n, s.__accelerationX *= n, s.__accelerationY *= n, s.__velocityY *= this._params.direction, s.__accelerationY *= this._params.direction, a = t(this._params.lifetime, this._params.lifetimeRange), this._params.depthColorEnabled && (e = new PIXI.filters.ColorMatrixFilter, e.matrix = [n, 0, 0, 0, 0, 0, n, 0, 0, 0, 0, 0, n, 0, 0, 0, 0, 0, 1, 0], s.filters = [e]), o = this, TweenMax.to(s, a, {
                __scale: "*=.9",
                onUpdate: function() {
                    var t;
                    this.target.scale.set(this.target.__scale), this.target.__velocityX += this.target.__accelerationX, this.target.__velocityY += this.target.__accelerationY, this.target.x += this.target.__velocityX, this.target.y += this.target.__velocityY, this.target.__velocityX *= o._params.friction, this.target.__velocityY *= o._params.friction, o._params.blinkEnabled && (this.target.visible = Math.random() < .8), t = this.progress(), t > .8 && (this.target.alpha = (1 - t) / .8)
                },
                onComplete: function() {
                    this.target.visible = !1, this.target.parent.removeChild(this.target)
                },
                ease: Linear.easeNone
            })
        }, t
    }(), t.exports = a
}, function(t, e) {
    var i;
    i = function() {
        function t(t) {
            this._length = t, this.reset()
        }
        return t.prototype.reset = function() {
            var t;
            for (this._list = [], this._average = 0, t = 0; t < this._length;) this._list.push(0), t++
        }, t.prototype.addRawValue = function(t) {
            var e, i;
            for (this._list.push(t), this._list.shift(), i = 0, e = 0; e < this._length;) i += this._list[e], e++;
            return this._average = i / this._length, this._average
        }, t.prototype.getAverage = function() {
            return this._average
        }, t
    }(), t.exports = i
}, function(t, e) {
    t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsFJREFUeNrsneFtgzAQhQFlgGSCsAFs0IzDSIxDNjAbkAmaDVKQHIlEIUkDxn7Od5LVqsU/7K/v3tnX0iSJIKqqOgwjhrVkSRxR2iEfm0iAFJGsIxogJUAAgodMGHr56HOAhKEOgARm6AVAUAhAABKuoef9h+3oS1v7NYAEVO6WAAEIQJ5UVQVAUMhikQob+mDmvxPf3tV1fUYh/tUhrxKAAMSpocsbOwoBCECiA/JO30O1N5JFqA5plagCKRZ6BiAoBCAAcWzoeXLbA5kKyd5IFqk6ZFUCEICsUmHJVlooJLCQ6oe86IFMhVRvJItYHZIqUQNyWGkOQN6M/UpzAELKAghAZlZYBx9zATIduae5AHFw6i4AEoZ/yPmIEpCDp7mrRpBXJ9aEc5tqygU3tOmH6Ufbj66u6wYgtxu/HW34PvHzRgZjx+kKzOfdV7ri5uejDb/+5Ida/XQjJRkLqZMFYn8narzxw9gm2nEeqam1kExQQEYp537zvynMAzWdnQMRSzmyKS/9opQjkfJSW2J+c8oJKuVl7IfAOYSU5TFlYeoCpk7ZK1D2cjAUOBjOuDr5seku5KuTYRyjuDr5IOUNpTeXiwnX741E2RsopMuc+f3mS6xV6WDYeJoLkCe53sdcgExE62kuQJ6Uoj7mYupLG7uKoasp5FMvMEoLBAhAZsVppTkAcXieaABCyvoOIPbS7z8lbKf2dlLFnnrn6FmAfBhHR88CZAUfMQAByKyQfNV4VVXD6zVe9ejPvaHvUEg4KjGKCwMIQBaJdqFnAIJCIjR1a+yXF6f6FIWEoxKjuiiAAGQVY28BgkIAApCA4klvpFP9D23qCplSglFekDqQNiZDRyEAAcirSMWB3PdGJHsgMSnkXhFGfTEAAYjTSqsFCAohHhj7Ze4fhYYSm0iYRKMMgADEubEDBIUsF38CDABE0wZix37c/wAAAABJRU5ErkJggg=="
}]);
