/*
 * jquery.inputmask.bundle
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) 2010 - 2014 Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 3.1.27
 */
! function(a) {
    function b(a) {
        var b = document.createElement("input"),
            c = "on" + a,
            d = c in b;
        return d || (b.setAttribute(c, "return;"), d = "function" == typeof b[c]), b = null, d
    }

    function c(a) {
        var b = "text" == a || "tel" == a;
        if (!b) {
            var c = document.createElement("input");
            c.setAttribute("type", a), b = "text" === c.type, c = null
        }
        return b
    }

    function d(b, c, e) {
        var f = e.aliases[b];
        return f ? (f.alias && d(f.alias, void 0, e), a.extend(!0, e, f), a.extend(!0, e, c), !0) : !1
    }

    function e(b, c) {
        function d(a) {
            function c(a, b, c, d) {
                this.matches = [], this.isGroup = a || !1, this.isOptional = b || !1, this.isQuantifier = c || !1, this.isAlternator = d || !1, this.quantifier = {
                    min: 1,
                    max: 1
                }
            }

            function d(a, c, d) {
                var e = b.definitions[c],
                    f = 0 == a.matches.length;
                if (d = void 0 != d ? d : a.matches.length, e && !l) {
                    for (var g = e.prevalidator, h = g ? g.length : 0, i = 1; i < e.cardinality; i++) {
                        var j = h >= i ? g[i - 1] : [],
                            k = j.validator,
                            m = j.cardinality;
                        a.matches.splice(d++, 0, {
                            fn: k ? "string" == typeof k ? new RegExp(k) : new function() {
                                this.test = k
                            } : new RegExp("."),
                            cardinality: m ? m : 1,
                            optionality: a.isOptional,
                            newBlockMarker: f,
                            casing: e.casing,
                            def: e.definitionSymbol || c,
                            placeholder: e.placeholder,
                            mask: c
                        })
                    }
                    a.matches.splice(d++, 0, {
                        fn: e.validator ? "string" == typeof e.validator ? new RegExp(e.validator) : new function() {
                            this.test = e.validator
                        } : new RegExp("."),
                        cardinality: e.cardinality,
                        optionality: a.isOptional,
                        newBlockMarker: f,
                        casing: e.casing,
                        def: e.definitionSymbol || c,
                        placeholder: e.placeholder,
                        mask: c
                    })
                } else a.matches.splice(d++, 0, {
                    fn: null,
                    cardinality: 0,
                    optionality: a.isOptional,
                    newBlockMarker: f,
                    casing: null,
                    def: c,
                    placeholder: void 0,
                    mask: c
                }), l = !1
            }
            for (var e, f, g, h, i, j, k = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g, l = !1, m = new c, n = [], o = []; e = k.exec(a);) switch (f = e[0], f.charAt(0)) {
                case b.optionalmarker.end:
                case b.groupmarker.end:
                    if (g = n.pop(), n.length > 0) {
                        if (h = n[n.length - 1], h.matches.push(g), h.isAlternator) {
                            i = n.pop();
                            for (var p = 0; p < i.matches.length; p++) i.matches[p].isGroup = !1;
                            n.length > 0 ? (h = n[n.length - 1], h.matches.push(i)) : m.matches.push(i)
                        }
                    } else m.matches.push(g);
                    break;
                case b.optionalmarker.start:
                    n.push(new c(!1, !0));
                    break;
                case b.groupmarker.start:
                    n.push(new c(!0));
                    break;
                case b.quantifiermarker.start:
                    var q = new c(!1, !1, !0);
                    f = f.replace(/[{}]/g, "");
                    var r = f.split(","),
                        s = isNaN(r[0]) ? r[0] : parseInt(r[0]),
                        t = 1 == r.length ? s : isNaN(r[1]) ? r[1] : parseInt(r[1]);
                    if (("*" == t || "+" == t) && (s = "*" == t ? 0 : 1), q.quantifier = {
                            min: s,
                            max: t
                        }, n.length > 0) {
                        var u = n[n.length - 1].matches;
                        if (e = u.pop(), !e.isGroup) {
                            var v = new c(!0);
                            v.matches.push(e), e = v
                        }
                        u.push(e), u.push(q)
                    } else {
                        if (e = m.matches.pop(), !e.isGroup) {
                            var v = new c(!0);
                            v.matches.push(e), e = v
                        }
                        m.matches.push(e), m.matches.push(q)
                    }
                    break;
                case b.escapeChar:
                    l = !0;
                    break;
                case b.alternatormarker:
                    n.length > 0 ? (h = n[n.length - 1], j = h.matches.pop()) : j = m.matches.pop(), j.isAlternator ? n.push(j) : (i = new c(!1, !1, !1, !0), i.matches.push(j), n.push(i));
                    break;
                default:
                    if (n.length > 0) {
                        if (h = n[n.length - 1], h.matches.length > 0 && (j = h.matches[h.matches.length - 1], j.isGroup && (j.isGroup = !1, d(j, b.groupmarker.start, 0), d(j, b.groupmarker.end))), d(h, f), h.isAlternator) {
                            i = n.pop();
                            for (var p = 0; p < i.matches.length; p++) i.matches[p].isGroup = !1;
                            n.length > 0 ? (h = n[n.length - 1], h.matches.push(i)) : m.matches.push(i)
                        }
                    } else m.matches.length > 0 && (j = m.matches[m.matches.length - 1], j.isGroup && (j.isGroup = !1, d(j, b.groupmarker.start, 0), d(j, b.groupmarker.end))), d(m, f)
            }
            return m.matches.length > 0 && (j = m.matches[m.matches.length - 1], j.isGroup && (j.isGroup = !1, d(j, b.groupmarker.start, 0), d(j, b.groupmarker.end)), o.push(m)), o
        }

        function e(c, e) {
            if (b.numericInput && b.multi !== !0) {
                c = c.split("").reverse();
                for (var f = 0; f < c.length; f++) c[f] == b.optionalmarker.start ? c[f] = b.optionalmarker.end : c[f] == b.optionalmarker.end ? c[f] = b.optionalmarker.start : c[f] == b.groupmarker.start ? c[f] = b.groupmarker.end : c[f] == b.groupmarker.end && (c[f] = b.groupmarker.start);
                c = c.join("")
            }
            if (void 0 == c || "" == c) return void 0;
            if (1 == c.length && 0 == b.greedy && 0 != b.repeat && (b.placeholder = ""), b.repeat > 0 || "*" == b.repeat || "+" == b.repeat) {
                var g = "*" == b.repeat ? 0 : "+" == b.repeat ? 1 : b.repeat;
                c = b.groupmarker.start + c + b.groupmarker.end + b.quantifiermarker.start + g + "," + b.repeat + b.quantifiermarker.end
            }
            return void 0 == a.inputmask.masksCache[c] && (a.inputmask.masksCache[c] = {
                mask: c,
                maskToken: d(c),
                validPositions: {},
                _buffer: void 0,
                buffer: void 0,
                tests: {},
                metadata: e
            }), a.extend(!0, {}, a.inputmask.masksCache[c])
        }
        var f = void 0;
        if (a.isFunction(b.mask) && (b.mask = b.mask.call(this, b)), a.isArray(b.mask))
            if (c) f = [], a.each(b.mask, function(b, c) {
                f.push(void 0 == c.mask || a.isFunction(c.mask) ? e(c.toString(), c) : e(c.mask.toString(), c))
            });
            else {
                b.keepStatic = void 0 == b.keepStatic ? !0 : b.keepStatic;
                var g = "(";
                a.each(b.mask, function(b, c) {
                    g.length > 1 && (g += ")|("), g += void 0 == c.mask || a.isFunction(c.mask) ? c.toString() : c.mask.toString()
                }), g += ")", f = e(g, b.mask)
            }
        else b.mask && (f = void 0 == b.mask.mask || a.isFunction(b.mask.mask) ? e(b.mask.toString(), b.mask) : e(b.mask.mask.toString(), b.mask));
        return f
    }

    function f(d, e, f) {
        function h(a, b, c) {
            b = b || 0;
            var d, e, f, g = [],
                h = 0;
            do {
                if (a === !0 && o().validPositions[h]) {
                    var i = o().validPositions[h];
                    e = i.match, d = i.locator.slice(), g.push(c === !0 ? i.input : I(h, e))
                } else {
                    if (b > h) {
                        var j = w(h, d, h - 1);
                        f = j[0]
                    } else f = t(h, d, h - 1);
                    e = f.match, d = f.locator.slice(), g.push(I(h, e))
                }
                h++
            } while ((void 0 == fb || fb > h - 1) && null != e.fn || null == e.fn && "" != e.def || b >= h);
            return g.pop(), g
        }

        function o() {
            return e
        }

        function p(a) {
            var b = o();
            b.buffer = void 0, b.tests = {}, a !== !0 && (b._buffer = void 0, b.validPositions = {}, b.p = 0)
        }

        function q(a) {
            var b = o(),
                c = -1,
                d = b.validPositions;
            void 0 == a && (a = -1);
            var e = c,
                f = c;
            for (var g in d) {
                var h = parseInt(g);
                (-1 == a || null != d[h].match.fn) && (a > h && (e = h), h >= a && (f = h))
            }
            return c = a - e > 1 || a > f ? e : f
        }

        function r(b, c, d) {
            if (f.insertMode && void 0 != o().validPositions[b] && void 0 == d) {
                var e, g = a.extend(!0, {}, o().validPositions),
                    h = q();
                for (e = b; h >= e; e++) delete o().validPositions[e];
                o().validPositions[b] = c;
                var i, j = !0;
                for (e = b; h >= e; e++) {
                    var k = g[e];
                    if (void 0 != k) {
                        var l = o().validPositions;
                        i = !f.keepStatic && (void 0 != l[e + 1] && w(e + 1, l[e].locator.slice(), e).length > 1 || l[e] && void 0 != l[e].alternation) ? e + 1 : E(e), j = v(i, k.match.def) ? j && B(i, k.input, !0, !0) !== !1 : null == k.match.fn
                    }
                    if (!j) break
                }
                if (!j) return o().validPositions = a.extend(!0, {}, g), !1
            } else o().validPositions[b] = c;
            return !0
        }

        function s(a, b) {
            var c, d = a;
            for (void 0 != o().validPositions[a] && o().validPositions[a].input == f.radixPoint && (b++, d++), c = d; b > c; c++) void 0 == o().validPositions[c] || o().validPositions[c].input == f.radixPoint && c != q() || delete o().validPositions[c];
            for (c = b; c <= q();) {
                var e = o().validPositions[c],
                    g = o().validPositions[d];
                void 0 != e && void 0 == g ? (v(d, e.match.def) && B(d, e.input, !0) !== !1 && (delete o().validPositions[c], c++), d++) : c++
            }
            var h = q();
            h >= a && void 0 != o().validPositions[h] && o().validPositions[h].input == f.radixPoint && delete o().validPositions[h], p(!0)
        }

        function t(b, c, d) {
            for (var e, g = w(b, c, d), h = q(), i = o().validPositions[h] || w(0)[0], j = void 0 != i.alternation ? i.locator[i.alternation].split(",") : [], k = 0; k < g.length && (e = g[k], !f.greedy && (!e.match || e.match.optionality !== !1 && e.match.newBlockMarker !== !1 || e.match.optionalQuantifier === !0 || void 0 != i.alternation && (void 0 == e.locator[i.alternation] || -1 != a.inArray(e.locator[i.alternation].toString(), j)))); k++);
            return e
        }

        function u(a) {
            return o().validPositions[a] ? o().validPositions[a].match : w(a)[0].match
        }

        function v(a, b) {
            for (var c = !1, d = w(a), e = 0; e < d.length; e++)
                if (d[e].match && d[e].match.def == b) {
                    c = !0;
                    break
                }
            return c
        }

        function w(b, c, d) {
            function e(c, d, g, i) {
                function l(g, i, n) {
                    if (h > 1e4) return alert("jquery.inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + o().mask), !0;
                    if (h == b && void 0 == g.matches) return j.push({
                        match: g,
                        locator: i.reverse()
                    }), !0;
                    if (void 0 != g.matches) {
                        if (g.isGroup && n !== !0) {
                            if (g = l(c.matches[m + 1], i)) return !0
                        } else if (g.isOptional) {
                            var p = g;
                            if (g = e(g, d, i, n)) {
                                var q = j[j.length - 1].match,
                                    r = 0 == a.inArray(q, p.matches);
                                r && (k = !0), h = b
                            }
                        } else if (g.isAlternator) {
                            var s, t = g,
                                u = [],
                                v = j.slice(),
                                w = i.length,
                                x = d.length > 0 ? d.shift() : -1;
                            if (-1 == x || "string" == typeof x) {
                                var y, z = h,
                                    A = d.slice();
                                "string" == typeof x && (y = x.split(","));
                                for (var B = 0; B < t.matches.length; B++) {
                                    j = [], g = l(t.matches[B], [B].concat(i), n) || g, s = j.slice(), h = z, j = [];
                                    for (var C = 0; C < A.length; C++) d[C] = A[C];
                                    for (var D = 0; D < s.length; D++)
                                        for (var E = s[D], F = 0; F < u.length; F++) {
                                            var G = u[F];
                                            if (E.match.mask == G.match.mask && ("string" != typeof x || -1 != a.inArray(E.locator[w].toString(), y))) {
                                                s.splice(D, 1), G.locator[w] = G.locator[w] + "," + E.locator[w], G.alternation = w;
                                                break
                                            }
                                        }
                                    u = u.concat(s)
                                }
                                "string" == typeof x && (u = a.map(u, function(b, c) {
                                    if (isFinite(c)) {
                                        var d, e = b.locator[w].toString().split(",");
                                        b.locator[w] = void 0, b.alternation = void 0;
                                        for (var f = 0; f < e.length; f++) d = -1 != a.inArray(e[f], y), d && (void 0 != b.locator[w] ? (b.locator[w] += ",", b.alternation = w, b.locator[w] += e[f]) : b.locator[w] = parseInt(e[f]));
                                        if (void 0 != b.locator[w]) return b
                                    }
                                })), j = v.concat(u), k = !0
                            } else g = l(t.matches[x], [x].concat(i), n);
                            if (g) return !0
                        } else if (g.isQuantifier && n !== !0) {
                            var H = g;
                            f.greedy = f.greedy && isFinite(H.quantifier.max);
                            for (var I = d.length > 0 && n !== !0 ? d.shift() : 0; I < (isNaN(H.quantifier.max) ? I + 1 : H.quantifier.max) && b >= h; I++) {
                                var J = c.matches[a.inArray(H, c.matches) - 1];
                                if (g = l(J, [I].concat(i), !0)) {
                                    var q = j[j.length - 1].match;
                                    q.optionalQuantifier = I > H.quantifier.min - 1;
                                    var r = 0 == a.inArray(q, J.matches);
                                    if (r) {
                                        if (I > H.quantifier.min - 1) {
                                            k = !0, h = b;
                                            break
                                        }
                                        return !0
                                    }
                                    return !0
                                }
                            }
                        } else if (g = e(g, d, i, n)) return !0
                    } else h++
                }
                for (var m = d.length > 0 ? d.shift() : 0; m < c.matches.length; m++)
                    if (c.matches[m].isQuantifier !== !0) {
                        var n = l(c.matches[m], [m].concat(g), i);
                        if (n && h == b) return n;
                        if (h > b) break
                    }
            }
            var g = o().maskToken,
                h = c ? d : 0,
                i = c || [0],
                j = [],
                k = !1;
            if (void 0 == c) {
                for (var l, m = b - 1; void 0 == (l = o().validPositions[m]) && m > -1;) m--;
                if (void 0 != l && m > -1) h = m, i = l.locator.slice();
                else {
                    for (m = b - 1; void 0 == (l = o().tests[m]) && m > -1;) m--;
                    void 0 != l && m > -1 && (h = m, i = l[0].locator.slice())
                }
            }
            for (var n = i.shift(); n < g.length; n++) {
                var p = e(g[n], i, [n]);
                if (p && h == b || h > b) break
            }
            return (0 == j.length || k) && j.push({
                match: {
                    fn: null,
                    cardinality: 0,
                    optionality: !0,
                    casing: null,
                    def: ""
                },
                locator: []
            }), o().tests[b] = a.extend(!0, [], j), o().tests[b]
        }

        function x() {
            return void 0 == o()._buffer && (o()._buffer = h(!1, 1)), o()._buffer
        }

        function y() {
            return void 0 == o().buffer && (o().buffer = h(!0, q(), !0)), o().buffer
        }

        function z(a, b) {
            var c = y().slice();
            if (a === !0) p(), a = 0, b = c.length;
            else
                for (var d = a; b > d; d++) delete o().validPositions[d], delete o().tests[d];
            for (var d = a; b > d; d++) c[d] != f.skipOptionalPartCharacter && B(d, c[d], !0, !0)
        }

        function A(a, b) {
            switch (b.casing) {
                case "upper":
                    a = a.toUpperCase();
                    break;
                case "lower":
                    a = a.toLowerCase()
            }
            return a
        }

        function B(b, c, d, e) {
            function g(b, c, d, e) {
                var g = !1;
                return a.each(w(b), function(h, i) {
                    for (var j = i.match, k = c ? 1 : 0, l = "", m = (y(), j.cardinality); m > k; m--) l += G(b - (m - 1));
                    if (c && (l += c), g = null != j.fn ? j.fn.test(l, o(), b, d, f) : c != j.def && c != f.skipOptionalPartCharacter || "" == j.def ? !1 : {
                            c: j.def,
                            pos: b
                        }, g !== !1) {
                        var n = void 0 != g.c ? g.c : c;
                        n = n == f.skipOptionalPartCharacter && null === j.fn ? j.def : n;
                        var t = b;
                        if (void 0 != g.remove && s(g.remove, g.remove + 1), g.refreshFromBuffer) {
                            var u = g.refreshFromBuffer;
                            if (d = !0, z(u === !0 ? u : u.start, u.end), void 0 == g.pos && void 0 == g.c) return g.pos = q(), !1;
                            if (t = void 0 != g.pos ? g.pos : b, t != b) return g = a.extend(g, B(t, n, !0)), !1
                        } else if (g !== !0 && void 0 != g.pos && g.pos != b && (t = g.pos, z(b, t), t != b)) return g = a.extend(g, B(t, n, !0)), !1;
                        return 1 != g && void 0 == g.pos && void 0 == g.c ? !1 : (h > 0 && p(!0), r(t, a.extend({}, i, {
                            input: A(n, j)
                        }), e) || (g = !1), !1)
                    }
                }), g
            }

            function h(b, c, d, e) {
                var g, h, i = a.extend(!0, {}, o().validPositions);
                for (g = q(); g >= 0; g--)
                    if (o().validPositions[g] && void 0 != o().validPositions[g].alternation) {
                        h = o().validPositions[g].alternation;
                        break
                    }
                if (void 0 != h)
                    for (var j in o().validPositions)
                        if (parseInt(j) > parseInt(g) && void 0 === o().validPositions[j].alternation) {
                            for (var k = o().validPositions[j], l = k.locator[h], m = o().validPositions[g].locator[h].split(","), n = 0; n < m.length; n++)
                                if (l < m[n]) {
                                    for (var r, s, t = j - 1; t >= 0; t--)
                                        if (r = o().validPositions[t], void 0 != r) {
                                            s = r.locator[h], r.locator[h] = m[n];
                                            break
                                        }
                                    if (l != r.locator[h]) {
                                        for (var u = y().slice(), v = j; v < q() + 1; v++) delete o().validPositions[v], delete o().tests[v];
                                        p(!0), f.keepStatic = !f.keepStatic;
                                        for (var v = j; v < u.length; v++) u[v] != f.skipOptionalPartCharacter && B(q() + 1, u[v], !1, !0);
                                        r.locator[h] = s;
                                        var w = B(b, c, d, e);
                                        if (f.keepStatic = !f.keepStatic, w) return w;
                                        p(), o().validPositions = a.extend(!0, {}, i)
                                    }
                                }
                            break
                        }
                return !1
            }
            d = d === !0;
            for (var i = y(), j = b - 1; j > -1 && (!o().validPositions[j] || null != o().validPositions[j].match.fn); j--) void 0 == o().validPositions[j] && (!C(j) || i[j] != I(j)) && w(j).length > 1 && g(j, i[j], !0);
            var k = b,
                l = !1;
            if (e && k >= D() && p(!0), k < D() && (l = g(k, c, d, e), !d && l === !1)) {
                var m = o().validPositions[k];
                if (!m || null != m.match.fn || m.match.def != c && c != f.skipOptionalPartCharacter) {
                    if ((f.insertMode || void 0 == o().validPositions[E(k)]) && !C(k))
                        for (var n = k + 1, t = E(k); t >= n; n++)
                            if (l = g(n, c, d, e), l !== !1) {
                                k = n;
                                break
                            }
                } else l = {
                    caret: E(k)
                }
            }
            return l === !1 && f.keepStatic && R(i) && (l = h(b, c, d, e)), l === !0 && (l = {
                pos: k
            }), l
        }

        function C(a) {
            var b = u(a);
            return null != b.fn ? b.fn : !1
        }

        function D() {
            var a;
            if (fb = eb.prop("maxLength"), -1 == fb && (fb = void 0), 0 == f.greedy) {
                var b, c = q(),
                    d = o().validPositions[c],
                    e = void 0 != d ? d.locator.slice() : void 0;
                for (b = c + 1; void 0 == d || null != d.match.fn || null == d.match.fn && "" != d.match.def; b++) d = t(b, e, b - 1), e = d.locator.slice();
                a = b
            } else a = y().length;
            return void 0 == fb || fb > a ? a : fb
        }

        function E(a) {
            var b = D();
            if (a >= b) return b;
            for (var c = a; ++c < b && !C(c) && (f.nojumps !== !0 || f.nojumpsThreshold > c););
            return c
        }

        function F(a) {
            var b = a;
            if (0 >= b) return 0;
            for (; --b > 0 && !C(b););
            return b
        }

        function G(a) {
            return void 0 == o().validPositions[a] ? I(a) : o().validPositions[a].input
        }

        function H(a, b, c) {
            a._valueSet(b.join("")), void 0 != c && O(a, c)
        }

        function I(b, c) {
            c = c || u(b);
            var d = a.isFunction(c.placeholder) ? c.placeholder.call(this, f) : c.placeholder;
            return void 0 != d ? d : null == c.fn ? c.def : f.placeholder.charAt(b % f.placeholder.length)
        }

        function J(b, c, d, e, g) {
            var h = void 0 != e ? e.slice() : L(b._valueGet()).split("");
            if (p(), c && b._valueSet(""), a.each(h, function(c, e) {
                    if (g === !0) {
                        var f = q(),
                            h = -1 == f ? c : E(f); - 1 == a.inArray(e, x().slice(f + 1, h)) && Y.call(b, void 0, !0, e.charCodeAt(0), !1, d, d ? c : o().p)
                    } else Y.call(b, void 0, !0, e.charCodeAt(0), !1, d, d ? c : o().p), d = d || c > 0 && c > o().p
                }), c) {
                var i = f.onKeyPress.call(this, void 0, y(), 0, f);
                W(b, i), H(b, y(), a(b).is(":focus") ? E(q(0)) : void 0)
            }
        }

        function K(b) {
            return a.inputmask.escapeRegex.call(this, b)
        }

        function L(a) {
            return a.replace(new RegExp("(" + K(x().join("")) + ")*$"), "")
        }

        function M(b) {
            if (b.data("_inputmask") && !b.hasClass("hasDatepicker")) {
                var c = [],
                    d = o().validPositions;
                for (var e in d) d[e].match && null != d[e].match.fn && c.push(d[e].input);
                var g = (gb ? c.reverse() : c).join(""),
                    h = (gb ? y().slice().reverse() : y()).join("");
                return a.isFunction(f.onUnMask) && (g = f.onUnMask.call(b, h, g, f) || g), g
            }
            return b[0]._valueGet()
        }

        function N(a) {
            if (gb && "number" == typeof a && (!f.greedy || "" != f.placeholder)) {
                var b = y().length;
                a = b - a
            }
            return a
        }

        function O(b, c, d) {
            var e, g = b.jquery && b.length > 0 ? b[0] : b;
            if ("number" != typeof c) {
                var h = a(g).data("_inputmask");
                return !a(g).is(":visible") && h && void 0 != h.caret ? (c = h.caret.begin, d = h.caret.end) : g.setSelectionRange ? (c = g.selectionStart, d = g.selectionEnd) : document.selection && document.selection.createRange && (e = document.selection.createRange(), c = 0 - e.duplicate().moveStart("character", -1e5), d = c + e.text.length), c = N(c), d = N(d), {
                    begin: c,
                    end: d
                }
            }
            c = N(c), d = N(d), d = "number" == typeof d ? d : c;
            var h = a(g).data("_inputmask") || {};
            h.caret = {
                begin: c,
                end: d
            }, a(g).data("_inputmask", h), a(g).is(":visible") && (g.scrollLeft = g.scrollWidth, 0 == f.insertMode && c == d && d++, g.setSelectionRange ? (g.selectionStart = c, g.selectionEnd = d) : g.createTextRange && (e = g.createTextRange(), e.collapse(!0), e.moveEnd("character", d), e.moveStart("character", c), e.select()))
        }

        function P(b) {
            var c, d, e = y(),
                f = e.length,
                g = q(),
                h = {},
                i = o().validPositions[g],
                j = void 0 != i ? i.locator.slice() : void 0;
            for (c = g + 1; c < e.length; c++) d = t(c, j, c - 1), j = d.locator.slice(), h[c] = a.extend(!0, {}, d);
            var k = i && void 0 != i.alternation ? i.locator[i.alternation].split(",") : [];
            for (c = f - 1; c > g && (d = h[c].match, (d.optionality || d.optionalQuantifier || i && void 0 != i.alternation && void 0 != h[c].locator[i.alternation] && -1 != a.inArray(h[c].locator[i.alternation].toString(), k)) && e[c] == I(c, d)); c--) f--;
            return b ? {
                l: f,
                def: h[f] ? h[f].match : void 0
            } : f
        }

        function Q(a) {
            for (var b = y(), c = b.slice(), d = P(), e = c.length - 1; e > d && !C(e); e--);
            c.splice(d, e + 1 - d), H(a, c)
        }

        function R(b) {
            if (a.isFunction(f.isComplete)) return f.isComplete.call(eb, b, f);
            if ("*" == f.repeat) return void 0;
            var c = !1,
                d = P(!0),
                e = F(d.l),
                g = q();
            if (g == e && (void 0 == d.def || d.def.newBlockMarker || d.def.optionalQuantifier)) {
                c = !0;
                for (var h = 0; e >= h; h++) {
                    var i = C(h);
                    if (i && (void 0 == b[h] || b[h] == I(h)) || !i && b[h] != I(h)) {
                        c = !1;
                        break
                    }
                }
            }
            return c
        }

        function S(a, b) {
            return gb ? a - b > 1 || a - b == 1 && f.insertMode : b - a > 1 || b - a == 1 && f.insertMode
        }

        function T(b) {
            var c = a._data(b).events;
            a.each(c, function(b, c) {
                a.each(c, function(a, b) {
                    if ("inputmask" == b.namespace && "setvalue" != b.type) {
                        var c = b.handler;
                        b.handler = function(a) {
                            return this.readOnly || this.disabled ? void a.preventDefault : c.apply(this, arguments)
                        }
                    }
                })
            })
        }

        function U(b) {
            function c(b) {
                if (void 0 == a.valHooks[b] || 1 != a.valHooks[b].inputmaskpatch) {
                    var c = a.valHooks[b] && a.valHooks[b].get ? a.valHooks[b].get : function(a) {
                            return a.value
                        },
                        d = a.valHooks[b] && a.valHooks[b].set ? a.valHooks[b].set : function(a, b) {
                            return a.value = b, a
                        };
                    a.valHooks[b] = {
                        get: function(b) {
                            var d = a(b);
                            if (d.data("_inputmask")) {
                                if (d.data("_inputmask").opts.autoUnmask) return d.inputmask("unmaskedvalue");
                                var e = c(b),
                                    f = d.data("_inputmask"),
                                    g = f.maskset,
                                    h = g._buffer;
                                return h = h ? h.join("") : "", e != h ? e : ""
                            }
                            return c(b)
                        },
                        set: function(b, c) {
                            var e, f = a(b),
                                g = f.data("_inputmask");
                            return g ? (e = d(b, a.isFunction(g.opts.onBeforeMask) ? g.opts.onBeforeMask.call(ob, c, g.opts) || c : c), f.triggerHandler("setvalue.inputmask")) : e = d(b, c), e
                        },
                        inputmaskpatch: !0
                    }
                }
            }

            function d() {
                var b = a(this),
                    c = a(this).data("_inputmask");
                return c ? c.opts.autoUnmask ? b.inputmask("unmaskedvalue") : g.call(this) != x().join("") ? g.call(this) : "" : g.call(this)
            }

            function e(b) {
                var c = a(this).data("_inputmask");
                c ? (h.call(this, a.isFunction(c.opts.onBeforeMask) ? c.opts.onBeforeMask.call(ob, b, c.opts) || b : b), a(this).triggerHandler("setvalue.inputmask")) : h.call(this, b)
            }

            function f(b) {
                a(b).bind("mouseenter.inputmask", function() {
                    var b = a(this),
                        c = this,
                        d = c._valueGet();
                    "" != d && d != y().join("") && b.trigger("setvalue")
                });
                var c = a._data(b).events,
                    d = c.mouseover;
                if (d) {
                    for (var e = d[d.length - 1], f = d.length - 1; f > 0; f--) d[f] = d[f - 1];
                    d[0] = e
                }
            }
            var g, h;
            if (!b._valueGet) {
                if (Object.getOwnPropertyDescriptor) {
                    Object.getOwnPropertyDescriptor(b, "value")
                }
                document.__lookupGetter__ && b.__lookupGetter__("value") ? (g = b.__lookupGetter__("value"), h = b.__lookupSetter__("value"), b.__defineGetter__("value", d), b.__defineSetter__("value", e)) : (g = function() {
                    return b.value
                }, h = function(a) {
                    b.value = a
                }, c(b.type), f(b)), b._valueGet = function() {
                    return gb ? g.call(this).split("").reverse().join("") : g.call(this)
                }, b._valueSet = function(a) {
                    h.call(this, gb ? a.split("").reverse().join("") : a)
                }
            }
        }

        function V(b, c, d) {
            function e() {
                if (f.keepStatic) {
                    p(!0);
                    var a, c = [];
                    for (a = q(); a >= 0; a--)
                        if (o().validPositions[a]) {
                            if (void 0 != o().validPositions[a].alternation) break;
                            c.push(o().validPositions[a].input), delete o().validPositions[a]
                        }
                    if (a > 0)
                        for (; c.length > 0;) o().p = E(q()), Y.call(b, void 0, !0, c.pop().charCodeAt(0), !1, !1, o().p)
                }
            }
            if ((f.numericInput || gb) && (c == a.inputmask.keyCode.BACKSPACE ? c = a.inputmask.keyCode.DELETE : c == a.inputmask.keyCode.DELETE && (c = a.inputmask.keyCode.BACKSPACE), gb)) {
                var g = d.end;
                d.end = d.begin, d.begin = g
            }
            c == a.inputmask.keyCode.BACKSPACE && d.end - d.begin <= 1 ? d.begin = F(d.begin) : c == a.inputmask.keyCode.DELETE && d.begin == d.end && d.end++, s(d.begin, d.end), e();
            var h = q(d.begin);
            h < d.begin ? (-1 == h && p(), o().p = E(h)) : o().p = d.begin
        }

        function W(a, b, c) {
            if (b && b.refreshFromBuffer) {
                var d = b.refreshFromBuffer;
                z(d === !0 ? d : d.start, d.end), p(!0), void 0 != c && (H(a, y()), O(a, b.caret || c.begin, b.caret || c.end))
            }
        }

        function X(c) {
            hb = !1;
            var d = this,
                e = a(d),
                g = c.keyCode,
                h = O(d);
            g == a.inputmask.keyCode.BACKSPACE || g == a.inputmask.keyCode.DELETE || i && 127 == g || c.ctrlKey && 88 == g && !b("cut") ? (c.preventDefault(), 88 == g && (db = y().join("")), V(d, g, h), H(d, y(), o().p), d._valueGet() == x().join("") && e.trigger("cleared"), f.showTooltip && e.prop("title", o().mask)) : g == a.inputmask.keyCode.END || g == a.inputmask.keyCode.PAGE_DOWN ? setTimeout(function() {
                var a = E(q());
                f.insertMode || a != D() || c.shiftKey || a--, O(d, c.shiftKey ? h.begin : a, a)
            }, 0) : g == a.inputmask.keyCode.HOME && !c.shiftKey || g == a.inputmask.keyCode.PAGE_UP ? O(d, 0, c.shiftKey ? h.begin : 0) : g == a.inputmask.keyCode.ESCAPE || 90 == g && c.ctrlKey ? (J(d, !0, !1, db.split("")), e.click()) : g != a.inputmask.keyCode.INSERT || c.shiftKey || c.ctrlKey ? 0 != f.insertMode || c.shiftKey || (g == a.inputmask.keyCode.RIGHT ? setTimeout(function() {
                var a = O(d);
                O(d, a.begin)
            }, 0) : g == a.inputmask.keyCode.LEFT && setTimeout(function() {
                var a = O(d);
                O(d, gb ? a.begin + 1 : a.begin - 1)
            }, 0)) : (f.insertMode = !f.insertMode, O(d, f.insertMode || h.begin != D() ? h.begin : h.begin - 1));
            var j = O(d),
                k = f.onKeyDown.call(this, c, y(), j.begin, f);
            W(d, k, j), jb = -1 != a.inArray(g, f.ignorables)
        }

        function Y(b, c, d, e, g, h) {
            if (void 0 == d && hb) return !1;
            hb = !0;
            var i = this,
                j = a(i);
            b = b || window.event;
            var d = c ? d : b.which || b.charCode || b.keyCode;
            if (!(c === !0 || b.ctrlKey && b.altKey) && (b.ctrlKey || b.metaKey || jb)) return !0;
            if (d) {
                c !== !0 && 46 == d && 0 == b.shiftKey && "," == f.radixPoint && (d = 44);
                var k, l = c ? {
                        begin: h,
                        end: h
                    } : O(i),
                    m = String.fromCharCode(d),
                    n = S(l.begin, l.end);
                n && (o().undoPositions = a.extend(!0, {}, o().validPositions), V(i, a.inputmask.keyCode.DELETE, l), f.insertMode || (f.insertMode = !f.insertMode, r(l.begin, g), f.insertMode = !f.insertMode), n = !f.multi), o().writeOutBuffer = !0;
                var q = gb && !n ? l.end : l.begin,
                    s = B(q, m, g);
                if (s !== !1) {
                    if (s !== !0 && (q = void 0 != s.pos ? s.pos : q, m = void 0 != s.c ? s.c : m), p(!0), void 0 != s.caret) k = s.caret;
                    else {
                        var t = o().validPositions;
                        k = !f.keepStatic && (void 0 != t[q + 1] && w(q + 1, t[q].locator.slice(), q).length > 1 || void 0 != t[q].alternation) ? q + 1 : E(q)
                    }
                    o().p = k
                }
                if (e !== !1) {
                    var u = this;
                    if (setTimeout(function() {
                            f.onKeyValidation.call(u, s, f)
                        }, 0), o().writeOutBuffer && s !== !1) {
                        var v = y();
                        H(i, v, c ? void 0 : f.numericInput ? F(k) : k), c !== !0 && setTimeout(function() {
                            R(v) === !0 && j.trigger("complete"), ib = !0, j.trigger("input")
                        }, 0)
                    } else n && (o().buffer = void 0, o().validPositions = o().undoPositions)
                } else n && (o().buffer = void 0, o().validPositions = o().undoPositions);
                if (f.showTooltip && j.prop("title", o().mask), b && 1 != c) {
                    b.preventDefault();
                    var x = O(i),
                        z = f.onKeyPress.call(this, b, y(), x.begin, f);
                    W(i, z, x)
                }
            }
        }

        function Z(b) {
            var c = a(this),
                d = this,
                e = b.keyCode,
                g = y(),
                h = O(d),
                i = f.onKeyUp.call(this, b, g, h.begin, f);
            W(d, i, h), e == a.inputmask.keyCode.TAB && f.showMaskOnFocus && (c.hasClass("focus-inputmask") && 0 == d._valueGet().length ? (p(), g = y(), H(d, g), O(d, 0), db = y().join("")) : (H(d, g), O(d, N(0), N(D()))))
        }

        function $(b) {
            if (ib === !0 && "input" == b.type) return ib = !1, !0;
            var c = this,
                d = a(c),
                e = c._valueGet();
            if ("propertychange" == b.type && c._valueGet().length <= D()) return !0;
            "paste" == b.type && (window.clipboardData && window.clipboardData.getData ? e = window.clipboardData.getData("Text") : b.originalEvent && b.originalEvent.clipboardData && b.originalEvent.clipboardData.getData && (e = b.originalEvent.clipboardData.getData("text/plain")));
            var g = a.isFunction(f.onBeforePaste) ? f.onBeforePaste.call(c, e, f) || e : e;
            return J(c, !0, !1, gb ? g.split("").reverse() : g.split(""), !0), d.click(), R(y()) === !0 && d.trigger("complete"), !1
        }

        function _(b) {
            if (ib === !0 && "input" == b.type) return ib = !1, !0;
            var c = this,
                d = O(c),
                e = c._valueGet();
            e = e.replace(new RegExp("(" + K(x().join("")) + ")*"), ""), d.begin > e.length && (O(c, e.length), d = O(c)), y().length - e.length != 1 || e.charAt(d.begin) == y()[d.begin] || e.charAt(d.begin + 1) == y()[d.begin] || C(d.begin) || (b.keyCode = a.inputmask.keyCode.BACKSPACE, X.call(c, b)), b.preventDefault()
        }

        function ab(b) {
            if (ib === !0 && "input" == b.type) return ib = !1, !0;
            var c = this,
                d = O(c),
                e = c._valueGet();
            O(c, d.begin - 1);
            var g = a.Event("keypress");
            g.which = e.charCodeAt(d.begin - 1), hb = !1, jb = !1, Y.call(c, g, void 0, void 0, !1);
            var h = o().p;
            H(c, y(), f.numericInput ? F(h) : h), b.preventDefault()
        }

        function bb(b) {
            ib = !0;
            var c = this;
            return setTimeout(function() {
                O(c, O(c).begin - 1);
                var d = a.Event("keypress");
                d.which = b.originalEvent.data.charCodeAt(0), hb = !1, jb = !1, Y.call(c, d, void 0, void 0, !1);
                var e = o().p;
                H(c, y(), f.numericInput ? F(e) : e)
            }, 0), !1
        }

        function cb(b) {
            if (eb = a(b), eb.is(":input") && c(eb.attr("type"))) {
                if (eb.data("_inputmask", {
                        maskset: e,
                        opts: f,
                        isRTL: !1
                    }), f.showTooltip && eb.prop("title", o().mask), ("rtl" == b.dir || f.rightAlign) && eb.css("text-align", "right"), "rtl" == b.dir || f.numericInput) {
                    b.dir = "ltr", eb.removeAttr("dir");
                    var d = eb.data("_inputmask");
                    d.isRTL = !0, eb.data("_inputmask", d), gb = !0
                }
                eb.unbind(".inputmask"), eb.removeClass("focus-inputmask"), eb.closest("form").bind("submit", function() {
                    db != y().join("") && eb.change(), eb[0]._valueGet && eb[0]._valueGet() == x().join("") && eb[0]._valueSet(""), f.autoUnmask && f.removeMaskOnSubmit && eb.inputmask("remove")
                }).bind("reset", function() {
                    setTimeout(function() {
                        eb.trigger("setvalue")
                    }, 0)
                }), eb.bind("mouseenter.inputmask", function() {
                    var b = a(this),
                        c = this;
                    !b.hasClass("focus-inputmask") && f.showMaskOnHover && c._valueGet() != y().join("") && H(c, y())
                }).bind("blur.inputmask", function() {
                    var b = a(this),
                        c = this;
                    if (b.data("_inputmask")) {
                        var d = c._valueGet(),
                            e = y();
                        b.removeClass("focus-inputmask"), db != y().join("") && b.change(), f.clearMaskOnLostFocus && "" != d && (d == x().join("") ? c._valueSet("") : Q(c)), R(e) === !1 && (b.trigger("incomplete"), f.clearIncomplete && (p(), f.clearMaskOnLostFocus ? c._valueSet("") : (e = x().slice(), H(c, e))))
                    }
                }).bind("focus.inputmask", function() {
                    var b = a(this),
                        c = this,
                        d = c._valueGet();
                    f.showMaskOnFocus && !b.hasClass("focus-inputmask") && (!f.showMaskOnHover || f.showMaskOnHover && "" == d) && c._valueGet() != y().join("") && H(c, y(), E(q())), b.addClass("focus-inputmask"), db = y().join("")
                }).bind("mouseleave.inputmask", function() {
                    var b = a(this),
                        c = this;
                    f.clearMaskOnLostFocus && (b.hasClass("focus-inputmask") || c._valueGet() == b.attr("placeholder") || (c._valueGet() == x().join("") || "" == c._valueGet() ? c._valueSet("") : Q(c)))
                }).bind("click.inputmask", function() {
                    var b = this;
                    a(b).is(":focus") && setTimeout(function() {
                        var c = O(b);
                        if (c.begin == c.end)
                            if (f.radixFocus && "" != f.radixPoint && -1 != a.inArray(f.radixPoint, y()) && y().join("") == x().join("")) O(b, a.inArray(f.radixPoint, y()));
                            else {
                                var d = gb ? N(c.begin) : c.begin,
                                    e = E(q(d));
                                e > d ? O(b, C(d) ? d : E(d)) : O(b, e)
                            }
                    }, 0)
                }).bind("dblclick.inputmask", function() {
                    var a = this;
                    setTimeout(function() {
                        O(a, 0, E(q()))
                    }, 0)
                }).bind(n + ".inputmask dragdrop.inputmask drop.inputmask", $).bind("setvalue.inputmask", function() {
                    var a = this;
                    J(a, !0, !1, void 0, !0), db = y().join(""), (f.clearMaskOnLostFocus || f.clearIncomplete) && a._valueGet() == x().join("") && a._valueSet("")
                }).bind("cut.inputmask", function(b) {
                    ib = !0;
                    var c = this,
                        d = a(c),
                        e = O(c);
                    V(c, a.inputmask.keyCode.DELETE, e);
                    var g = f.onKeyPress.call(this, b, y(), o().p, f);
                    W(c, g, {
                        begin: o().p,
                        end: o().p
                    }), c._valueGet() == x().join("") && d.trigger("cleared"), f.showTooltip && d.prop("title", o().mask)
                }).bind("complete.inputmask", f.oncomplete).bind("incomplete.inputmask", f.onincomplete).bind("cleared.inputmask", f.oncleared), eb.bind("keydown.inputmask", X).bind("keypress.inputmask", Y).bind("keyup.inputmask", Z).bind("compositionupdate.inputmask", bb), "paste" !== n || g || eb.bind("input.inputmask", ab), g && eb.bind("input.inputmask", $), (j || l || k || m) && ("input" == n && eb.unbind(n + ".inputmask"), eb.bind("input.inputmask", _)), U(b);
                var h = a.isFunction(f.onBeforeMask) ? f.onBeforeMask.call(b, b._valueGet(), f) || b._valueGet() : b._valueGet();
                J(b, !0, !1, h.split(""), !0), db = y().join("");
                var i;
                try {
                    i = document.activeElement
                } catch (r) {}
                R(y()) === !1 && f.clearIncomplete && p(), f.clearMaskOnLostFocus ? y().join("") == x().join("") ? b._valueSet("") : Q(b) : H(b, y()), i === b && (eb.addClass("focus-inputmask"), O(b, E(q()))), T(b)
            }
        }
        var db, eb, fb, gb = !1,
            hb = !1,
            ib = !1,
            jb = !1;
        if (void 0 != d) switch (d.action) {
            case "isComplete":
                return eb = a(d.el), e = eb.data("_inputmask").maskset, f = eb.data("_inputmask").opts, R(d.buffer);
            case "unmaskedvalue":
                return eb = d.$input, e = eb.data("_inputmask").maskset, f = eb.data("_inputmask").opts, gb = d.$input.data("_inputmask").isRTL, M(d.$input);
            case "mask":
                db = y().join(""), cb(d.el);
                break;
            case "format":
                eb = a({}), eb.data("_inputmask", {
                    maskset: e,
                    opts: f,
                    isRTL: f.numericInput
                }), f.numericInput && (gb = !0);
                var kb = (a.isFunction(f.onBeforeMask) ? f.onBeforeMask.call(eb, d.value, f) || d.value : d.value).split("");
                return J(eb, !1, !1, gb ? kb.reverse() : kb, !0), f.onKeyPress.call(this, void 0, y(), 0, f), d.metadata ? {
                    value: gb ? y().slice().reverse().join("") : y().join(""),
                    metadata: eb.inputmask("getmetadata")
                } : gb ? y().slice().reverse().join("") : y().join("");
            case "isValid":
                eb = a({}), eb.data("_inputmask", {
                    maskset: e,
                    opts: f,
                    isRTL: f.numericInput
                }), f.numericInput && (gb = !0);
                var kb = d.value.split("");
                J(eb, !1, !0, gb ? kb.reverse() : kb);
                for (var lb = y(), mb = P(), nb = lb.length - 1; nb > mb && !C(nb); nb--);
                return lb.splice(mb, nb + 1 - mb), R(lb) && d.value == lb.join("");
            case "getemptymask":
                return eb = a(d.el), e = eb.data("_inputmask").maskset, f = eb.data("_inputmask").opts, x();
            case "remove":
                var ob = d.el;
                eb = a(ob), e = eb.data("_inputmask").maskset, f = eb.data("_inputmask").opts, ob._valueSet(M(eb)), eb.unbind(".inputmask"), eb.removeClass("focus-inputmask"), eb.removeData("_inputmask");
                var pb;
                Object.getOwnPropertyDescriptor && (pb = Object.getOwnPropertyDescriptor(ob, "value")), pb && pb.get ? ob._valueGet && Object.defineProperty(ob, "value", {
                    get: ob._valueGet,
                    set: ob._valueSet
                }) : document.__lookupGetter__ && ob.__lookupGetter__("value") && ob._valueGet && (ob.__defineGetter__("value", ob._valueGet), ob.__defineSetter__("value", ob._valueSet));
                try {
                    delete ob._valueGet, delete ob._valueSet
                } catch (qb) {
                    ob._valueGet = void 0, ob._valueSet = void 0
                }
                break;
            case "getmetadata":
                if (eb = a(d.el), e = eb.data("_inputmask").maskset, f = eb.data("_inputmask").opts, a.isArray(e.metadata)) {
                    for (var rb, sb = q(), tb = sb; tb >= 0; tb--)
                        if (o().validPositions[tb] && void 0 != o().validPositions[tb].alternation) {
                            rb = o().validPositions[tb].alternation;
                            break
                        }
                    return void 0 != rb ? e.metadata[o().validPositions[sb].locator[rb]] : e.metadata[0]
                }
                return e.metadata
        }
    }
    if (void 0 === a.fn.inputmask) {
        var g = "function" == typeof ScriptEngineMajorVersion ? ScriptEngineMajorVersion() : new Function("/*@cc_on return @_jscript_version; @*/")() >= 10,
            h = navigator.userAgent,
            i = null !== h.match(new RegExp("iphone", "i")),
            j = null !== h.match(new RegExp("android.*safari.*", "i")),
            k = null !== h.match(new RegExp("android.*chrome.*", "i")),
            l = null !== h.match(new RegExp("android.*firefox.*", "i")),
            m = /Kindle/i.test(h) || /Silk/i.test(h) || /KFTT/i.test(h) || /KFOT/i.test(h) || /KFJWA/i.test(h) || /KFJWI/i.test(h) || /KFSOWI/i.test(h) || /KFTHWA/i.test(h) || /KFTHWI/i.test(h) || /KFAPWA/i.test(h) || /KFAPWI/i.test(h),
            n = b("paste") ? "paste" : b("input") ? "input" : "propertychange";
        a.inputmask = {
            defaults: {
                placeholder: "_",
                optionalmarker: {
                    start: "[",
                    end: "]"
                },
                quantifiermarker: {
                    start: "{",
                    end: "}"
                },
                groupmarker: {
                    start: "(",
                    end: ")"
                },
                alternatormarker: "|",
                escapeChar: "\\",
                mask: null,
                oncomplete: a.noop,
                onincomplete: a.noop,
                oncleared: a.noop,
                repeat: 0,
                greedy: !0,
                autoUnmask: !1,
                removeMaskOnSubmit: !0,
                clearMaskOnLostFocus: !0,
                insertMode: !0,
                clearIncomplete: !1,
                aliases: {},
                alias: null,
                onKeyUp: a.noop,
                onKeyPress: a.noop,
                onKeyDown: a.noop,
                onBeforeMask: void 0,
                onBeforePaste: void 0,
                onUnMask: void 0,
                showMaskOnFocus: !0,
                showMaskOnHover: !0,
                onKeyValidation: a.noop,
                skipOptionalPartCharacter: " ",
                showTooltip: !1,
                numericInput: !1,
                rightAlign: !1,
                radixPoint: "",
                radixFocus: !1,
                nojumps: !1,
                nojumpsThreshold: 0,
                keepStatic: void 0,
                definitions: {
                    9: {
                        validator: "[0-9]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    a: {
                        validator: "[A-Za-zА-яЁёÀ-ÿµ]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    "*": {
                        validator: "[0-9A-Za-zА-яЁёÀ-ÿµ]",
                        cardinality: 1
                    }
                },
                ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
                isComplete: void 0
            },
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            },
            masksCache: {},
            escapeRegex: function(a) {
                var b = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"];
                return a.replace(new RegExp("(\\" + b.join("|\\") + ")", "gim"), "\\$1")
            },
            format: function(b, c, g) {
                var h = a.extend(!0, {}, a.inputmask.defaults, c);
                return d(h.alias, c, h), f({
                    action: "format",
                    value: b,
                    metadata: g
                }, e(h), h)
            },
            isValid: function(b, c) {
                var g = a.extend(!0, {}, a.inputmask.defaults, c);
                return d(g.alias, c, g), f({
                    action: "isValid",
                    value: b
                }, e(g), g)
            }
        }, a.fn.inputmask = function(b, c, g, h, i) {
            function j(b, c, e) {
                var f = a(b);
                f.data("inputmask-alias") && d(f.data("inputmask-alias"), {}, c);
                for (var g in c) {
                    var h = f.data("inputmask-" + g.toLowerCase());
                    void 0 != h && ("mask" == g && 0 == h.indexOf("[") ? (c[g] = h.replace(/[\s[\]]/g, "").split("','"), c[g][0] = c[g][0].replace("'", ""), c[g][c[g].length - 1] = c[g][c[g].length - 1].replace("'", "")) : c[g] = "boolean" == typeof h ? h : h.toString(), e && (e[g] = c[g]))
                }
                return c
            }
            g = g || f, h = h || "_inputmask";
            var k, l = a.extend(!0, {}, a.inputmask.defaults, c);
            if ("string" == typeof b) switch (b) {
                case "mask":
                    return d(l.alias, c, l), k = e(l, g !== f), void 0 == k ? this : this.each(function() {
                        g({
                            action: "mask",
                            el: this
                        }, a.extend(!0, {}, k), j(this, l))
                    });
                case "unmaskedvalue":
                    var m = a(this);
                    return m.data(h) ? g({
                        action: "unmaskedvalue",
                        $input: m
                    }) : m.val();
                case "remove":
                    return this.each(function() {
                        var b = a(this);
                        b.data(h) && g({
                            action: "remove",
                            el: this
                        })
                    });
                case "getemptymask":
                    return this.data(h) ? g({
                        action: "getemptymask",
                        el: this
                    }) : "";
                case "hasMaskedValue":
                    return this.data(h) ? !this.data(h).opts.autoUnmask : !1;
                case "isComplete":
                    return this.data(h) ? g({
                        action: "isComplete",
                        buffer: this[0]._valueGet().split(""),
                        el: this
                    }) : !0;
                case "getmetadata":
                    return this.data(h) ? g({
                        action: "getmetadata",
                        el: this
                    }) : void 0;
                case "_detectScope":
                    return d(l.alias, c, l), void 0 == i || d(i, c, l) || -1 != a.inArray(i, ["mask", "unmaskedvalue", "remove", "getemptymask", "hasMaskedValue", "isComplete", "getmetadata", "_detectScope"]) || (l.mask = i), a.isFunction(l.mask) && (l.mask = l.mask.call(this, l)), a.isArray(l.mask);
                default:
                    return d(l.alias, c, l), d(b, c, l) || (l.mask = b), k = e(l, g !== f), void 0 == k ? this : this.each(function() {
                        g({
                            action: "mask",
                            el: this
                        }, a.extend(!0, {}, k), j(this, l))
                    })
            } else {
                if ("object" == typeof b) return l = a.extend(!0, {}, a.inputmask.defaults, b), d(l.alias, b, l), k = e(l, g !== f), void 0 == k ? this : this.each(function() {
                    g({
                        action: "mask",
                        el: this
                    }, a.extend(!0, {}, k), j(this, l))
                });
                if (void 0 == b) return this.each(function() {
                    var b = a(this).attr("data-inputmask");
                    if (b && "" != b) try {
                        b = b.replace(new RegExp("'", "g"), '"');
                        var e = a.parseJSON("{" + b + "}");
                        a.extend(!0, e, c), l = a.extend(!0, {}, a.inputmask.defaults, e), l = j(this, l), d(l.alias, e, l), l.alias = void 0, a(this).inputmask("mask", l, g)
                    } catch (f) {}
                    if (a(this).attr("data-inputmask-mask") || a(this).attr("data-inputmask-alias")) {
                        l = a.extend(!0, {}, a.inputmask.defaults, {});
                        var h = {};
                        l = j(this, l, h), d(l.alias, h, l), l.alias = void 0, a(this).inputmask("mask", l, g)
                    }
                })
            }
        }
    }
    return a.fn.inputmask
}(jQuery),
function(a) {
    return a.extend(a.inputmask.defaults.definitions, {
        h: {
            validator: "[01][0-9]|2[0-3]",
            cardinality: 2,
            prevalidator: [{
                validator: "[0-2]",
                cardinality: 1
            }]
        },
        s: {
            validator: "[0-5][0-9]",
            cardinality: 2,
            prevalidator: [{
                validator: "[0-5]",
                cardinality: 1
            }]
        },
        d: {
            validator: "0[1-9]|[12][0-9]|3[01]",
            cardinality: 2,
            prevalidator: [{
                validator: "[0-3]",
                cardinality: 1
            }]
        },
        m: {
            validator: "0[1-9]|1[012]",
            cardinality: 2,
            prevalidator: [{
                validator: "[01]",
                cardinality: 1
            }]
        },
        y: {
            validator: "(19|20)\\d{2}",
            cardinality: 4,
            prevalidator: [{
                validator: "[12]",
                cardinality: 1
            }, {
                validator: "(19|20)",
                cardinality: 2
            }, {
                validator: "(19|20)\\d",
                cardinality: 3
            }]
        }
    }), a.extend(a.inputmask.defaults.aliases, {
        "dd/mm/yyyy": {
            mask: "1/2/y",
            placeholder: "dd/mm/yyyy",
            regex: {
                val1pre: new RegExp("[0-3]"),
                val1: new RegExp("0[1-9]|[12][0-9]|3[01]"),
                val2pre: function(b) {
                    var c = a.inputmask.escapeRegex.call(this, b);
                    return new RegExp("((0[1-9]|[12][0-9]|3[01])" + c + "[01])")
                },
                val2: function(b) {
                    var c = a.inputmask.escapeRegex.call(this, b);
                    return new RegExp("((0[1-9]|[12][0-9])" + c + "(0[1-9]|1[012]))|(30" + c + "(0[13-9]|1[012]))|(31" + c + "(0[13578]|1[02]))")
                }
            },
            leapday: "29/02/",
            separator: "/",
            yearrange: {
                minyear: 1900,
                maxyear: 2099
            },
            isInYearRange: function(a, b, c) {
                if (isNaN(a)) return !1;
                var d = parseInt(a.concat(b.toString().slice(a.length))),
                    e = parseInt(a.concat(c.toString().slice(a.length)));
                return (isNaN(d) ? !1 : d >= b && c >= d) || (isNaN(e) ? !1 : e >= b && c >= e)
            },
            determinebaseyear: function(a, b, c) {
                var d = (new Date).getFullYear();
                if (a > d) return a;
                if (d > b) {
                    for (var e = b.toString().slice(0, 2), f = b.toString().slice(2, 4); e + c > b;) e--;
                    var g = e + f;
                    return a > g ? a : g
                }
                return d
            },
            onKeyUp: function(b) {
                var c = a(this);
                if (b.ctrlKey && b.keyCode == a.inputmask.keyCode.RIGHT) {
                    var d = new Date;
                    c.val(d.getDate().toString() + (d.getMonth() + 1).toString() + d.getFullYear().toString())
                }
            },
            definitions: {
                1: {
                    validator: function(a, b, c, d, e) {
                        var f = e.regex.val1.test(a);
                        return d || f || a.charAt(1) != e.separator && -1 == "-./".indexOf(a.charAt(1)) || !(f = e.regex.val1.test("0" + a.charAt(0))) ? f : (b.buffer[c - 1] = "0", {
                            refreshFromBuffer: {
                                start: c - 1,
                                end: c
                            },
                            pos: c,
                            c: a.charAt(0)
                        })
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function(a, b, c, d, e) {
                            isNaN(b.buffer[c + 1]) || (a += b.buffer[c + 1]);
                            var f = 1 == a.length ? e.regex.val1pre.test(a) : e.regex.val1.test(a);
                            return d || f || !(f = e.regex.val1.test("0" + a)) ? f : (b.buffer[c] = "0", c++, {
                                pos: c
                            })
                        },
                        cardinality: 1
                    }]
                },
                2: {
                    validator: function(a, b, c, d, e) {
                        var f = e.mask.indexOf("2") == e.mask.length - 1 ? b.buffer.join("").substr(5, 3) : b.buffer.join("").substr(0, 3); - 1 != f.indexOf(e.placeholder[0]) && (f = "01" + e.separator);
                        var g = e.regex.val2(e.separator).test(f + a);
                        if (!d && !g && (a.charAt(1) == e.separator || -1 != "-./".indexOf(a.charAt(1))) && (g = e.regex.val2(e.separator).test(f + "0" + a.charAt(0)))) return b.buffer[c - 1] = "0", {
                            refreshFromBuffer: {
                                start: c - 1,
                                end: c
                            },
                            pos: c,
                            c: a.charAt(0)
                        };
                        if (e.mask.indexOf("2") == e.mask.length - 1 && g) {
                            var h = b.buffer.join("").substr(4, 4) + a;
                            if (h != e.leapday) return !0;
                            var i = parseInt(b.buffer.join("").substr(0, 4), 10);
                            return i % 4 === 0 ? i % 100 === 0 ? i % 400 === 0 ? !0 : !1 : !0 : !1
                        }
                        return g
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function(a, b, c, d, e) {
                            isNaN(b.buffer[c + 1]) || (a += b.buffer[c + 1]);
                            var f = e.mask.indexOf("2") == e.mask.length - 1 ? b.buffer.join("").substr(5, 3) : b.buffer.join("").substr(0, 3); - 1 != f.indexOf(e.placeholder[0]) && (f = "01" + e.separator);
                            var g = 1 == a.length ? e.regex.val2pre(e.separator).test(f + a) : e.regex.val2(e.separator).test(f + a);
                            return d || g || !(g = e.regex.val2(e.separator).test(f + "0" + a)) ? g : (b.buffer[c] = "0", c++, {
                                pos: c
                            })
                        },
                        cardinality: 1
                    }]
                },
                y: {
                    validator: function(a, b, c, d, e) {
                        if (e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear)) {
                            var f = b.buffer.join("").substr(0, 6);
                            if (f != e.leapday) return !0;
                            var g = parseInt(a, 10);
                            return g % 4 === 0 ? g % 100 === 0 ? g % 400 === 0 ? !0 : !1 : !0 : !1
                        }
                        return !1
                    },
                    cardinality: 4,
                    prevalidator: [{
                        validator: function(a, b, c, d, e) {
                            var f = e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear);
                            if (!d && !f) {
                                var g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a + "0").toString().slice(0, 1);
                                if (f = e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear)) return b.buffer[c++] = g.charAt(0), {
                                    pos: c
                                };
                                if (g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a + "0").toString().slice(0, 2), f = e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear)) return b.buffer[c++] = g.charAt(0), b.buffer[c++] = g.charAt(1), {
                                    pos: c
                                }
                            }
                            return f
                        },
                        cardinality: 1
                    }, {
                        validator: function(a, b, c, d, e) {
                            var f = e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear);
                            if (!d && !f) {
                                var g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a).toString().slice(0, 2);
                                if (f = e.isInYearRange(a[0] + g[1] + a[1], e.yearrange.minyear, e.yearrange.maxyear)) return b.buffer[c++] = g.charAt(1), {
                                    pos: c
                                };
                                if (g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a).toString().slice(0, 2), e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear)) {
                                    var h = b.buffer.join("").substr(0, 6);
                                    if (h != e.leapday) f = !0;
                                    else {
                                        var i = parseInt(a, 10);
                                        f = i % 4 === 0 ? i % 100 === 0 ? i % 400 === 0 ? !0 : !1 : !0 : !1
                                    }
                                } else f = !1;
                                if (f) return b.buffer[c - 1] = g.charAt(0), b.buffer[c++] = g.charAt(1), b.buffer[c++] = a.charAt(0), {
                                    refreshFromBuffer: {
                                        start: c - 3,
                                        end: c
                                    },
                                    pos: c
                                }
                            }
                            return f
                        },
                        cardinality: 2
                    }, {
                        validator: function(a, b, c, d, e) {
                            return e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear)
                        },
                        cardinality: 3
                    }]
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        "mm/dd/yyyy": {
            placeholder: "mm/dd/yyyy",
            alias: "dd/mm/yyyy",
            regex: {
                val2pre: function(b) {
                    var c = a.inputmask.escapeRegex.call(this, b);
                    return new RegExp("((0[13-9]|1[012])" + c + "[0-3])|(02" + c + "[0-2])")
                },
                val2: function(b) {
                    var c = a.inputmask.escapeRegex.call(this, b);
                    return new RegExp("((0[1-9]|1[012])" + c + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + c + "30)|((0[13578]|1[02])" + c + "31)")
                },
                val1pre: new RegExp("[01]"),
                val1: new RegExp("0[1-9]|1[012]")
            },
            leapday: "02/29/",
            onKeyUp: function(b) {
                var c = a(this);
                if (b.ctrlKey && b.keyCode == a.inputmask.keyCode.RIGHT) {
                    var d = new Date;
                    c.val((d.getMonth() + 1).toString() + d.getDate().toString() + d.getFullYear().toString())
                }
            }
        },
        "yyyy/mm/dd": {
            mask: "y/1/2",
            placeholder: "yyyy/mm/dd",
            alias: "mm/dd/yyyy",
            leapday: "/02/29",
            onKeyUp: function(b) {
                var c = a(this);
                if (b.ctrlKey && b.keyCode == a.inputmask.keyCode.RIGHT) {
                    var d = new Date;
                    c.val(d.getFullYear().toString() + (d.getMonth() + 1).toString() + d.getDate().toString())
                }
            }
        },
        "dd.mm.yyyy": {
            mask: "1.2.y",
            placeholder: "dd.mm.yyyy",
            leapday: "29.02.",
            separator: ".",
            alias: "dd/mm/yyyy"
        },
        "dd-mm-yyyy": {
            mask: "1-2-y",
            placeholder: "dd-mm-yyyy",
            leapday: "29-02-",
            separator: "-",
            alias: "dd/mm/yyyy"
        },
        "mm.dd.yyyy": {
            mask: "1.2.y",
            placeholder: "mm.dd.yyyy",
            leapday: "02.29.",
            separator: ".",
            alias: "mm/dd/yyyy"
        },
        "mm-dd-yyyy": {
            mask: "1-2-y",
            placeholder: "mm-dd-yyyy",
            leapday: "02-29-",
            separator: "-",
            alias: "mm/dd/yyyy"
        },
        "yyyy.mm.dd": {
            mask: "y.1.2",
            placeholder: "yyyy.mm.dd",
            leapday: ".02.29",
            separator: ".",
            alias: "yyyy/mm/dd"
        },
        "yyyy-mm-dd": {
            mask: "y-1-2",
            placeholder: "yyyy-mm-dd",
            leapday: "-02-29",
            separator: "-",
            alias: "yyyy/mm/dd"
        },
        datetime: {
            mask: "1/2/y h:s",
            placeholder: "dd/mm/yyyy hh:mm",
            alias: "dd/mm/yyyy",
            regex: {
                hrspre: new RegExp("[012]"),
                hrs24: new RegExp("2[0-4]|1[3-9]"),
                hrs: new RegExp("[01][0-9]|2[0-4]"),
                ampm: new RegExp("^[a|p|A|P][m|M]"),
                mspre: new RegExp("[0-5]"),
                ms: new RegExp("[0-5][0-9]")
            },
            timeseparator: ":",
            hourFormat: "24",
            definitions: {
                h: {
                    validator: function(a, b, c, d, e) {
                        if ("24" == e.hourFormat && 24 == parseInt(a, 10)) return b.buffer[c - 1] = "0", b.buffer[c] = "0", {
                            refreshFromBuffer: {
                                start: c - 1,
                                end: c
                            },
                            c: "0"
                        };
                        var f = e.regex.hrs.test(a);
                        if (!d && !f && (a.charAt(1) == e.timeseparator || -1 != "-.:".indexOf(a.charAt(1))) && (f = e.regex.hrs.test("0" + a.charAt(0)))) return b.buffer[c - 1] = "0", b.buffer[c] = a.charAt(0), c++, {
                            refreshFromBuffer: {
                                start: c - 2,
                                end: c
                            },
                            pos: c,
                            c: e.timeseparator
                        };
                        if (f && "24" !== e.hourFormat && e.regex.hrs24.test(a)) {
                            var g = parseInt(a, 10);
                            return 24 == g ? (b.buffer[c + 5] = "a", b.buffer[c + 6] = "m") : (b.buffer[c + 5] = "p", b.buffer[c + 6] = "m"), g -= 12, 10 > g ? (b.buffer[c] = g.toString(), b.buffer[c - 1] = "0") : (b.buffer[c] = g.toString().charAt(1), b.buffer[c - 1] = g.toString().charAt(0)), {
                                refreshFromBuffer: {
                                    start: c - 1,
                                    end: c + 6
                                },
                                c: b.buffer[c]
                            }
                        }
                        return f
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function(a, b, c, d, e) {
                            var f = e.regex.hrspre.test(a);
                            return d || f || !(f = e.regex.hrs.test("0" + a)) ? f : (b.buffer[c] = "0", c++, {
                                pos: c
                            })
                        },
                        cardinality: 1
                    }]
                },
                s: {
                    validator: "[0-5][0-9]",
                    cardinality: 2,
                    prevalidator: [{
                        validator: function(a, b, c, d, e) {
                            var f = e.regex.mspre.test(a);
                            return d || f || !(f = e.regex.ms.test("0" + a)) ? f : (b.buffer[c] = "0", c++, {
                                pos: c
                            })
                        },
                        cardinality: 1
                    }]
                },
                t: {
                    validator: function(a, b, c, d, e) {
                        return e.regex.ampm.test(a + "m")
                    },
                    casing: "lower",
                    cardinality: 1
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        datetime12: {
            mask: "1/2/y h:s t\\m",
            placeholder: "dd/mm/yyyy hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "hh:mm t": {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "h:s t": {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "hh:mm:ss": {
            mask: "h:s:s",
            placeholder: "hh:mm:ss",
            alias: "datetime",
            autoUnmask: !1
        },
        "hh:mm": {
            mask: "h:s",
            placeholder: "hh:mm",
            alias: "datetime",
            autoUnmask: !1
        },
        date: {
            alias: "dd/mm/yyyy"
        },
        "mm/yyyy": {
            mask: "1/y",
            placeholder: "mm/yyyy",
            leapday: "donotuse",
            separator: "/",
            alias: "mm/dd/yyyy"
        }
    }), a.fn.inputmask
}(jQuery),
function(a) {
    return a.extend(a.inputmask.defaults.definitions, {
        A: {
            validator: "[A-Za-zА-яЁёÀ-ÿµ]",
            cardinality: 1,
            casing: "upper"
        },
        "#": {
            validator: "[0-9A-Za-zА-яЁёÀ-ÿµ]",
            cardinality: 1,
            casing: "upper"
        }
    }), a.extend(a.inputmask.defaults.aliases, {
        url: {
            mask: "ir",
            placeholder: "",
            separator: "",
            defaultPrefix: "http://",
            regex: {
                urlpre1: new RegExp("[fh]"),
                urlpre2: new RegExp("(ft|ht)"),
                urlpre3: new RegExp("(ftp|htt)"),
                urlpre4: new RegExp("(ftp:|http|ftps)"),
                urlpre5: new RegExp("(ftp:/|ftps:|http:|https)"),
                urlpre6: new RegExp("(ftp://|ftps:/|http:/|https:)"),
                urlpre7: new RegExp("(ftp://|ftps://|http://|https:/)"),
                urlpre8: new RegExp("(ftp://|ftps://|http://|https://)")
            },
            definitions: {
                i: {
                    validator: function() {
                        return !0
                    },
                    cardinality: 8,
                    prevalidator: function() {
                        for (var a = [], b = 8, c = 0; b > c; c++) a[c] = function() {
                            var a = c;
                            return {
                                validator: function(b, c, d, e, f) {
                                    if (f.regex["urlpre" + (a + 1)]) {
                                        var g, h = b;
                                        a + 1 - b.length > 0 && (h = c.buffer.join("").substring(0, a + 1 - b.length) + "" + h);
                                        var i = f.regex["urlpre" + (a + 1)].test(h);
                                        if (!e && !i) {
                                            for (d -= a, g = 0; g < f.defaultPrefix.length; g++) c.buffer[d] = f.defaultPrefix[g], d++;
                                            for (g = 0; g < h.length - 1; g++) c.buffer[d] = h[g], d++;
                                            return {
                                                pos: d
                                            }
                                        }
                                        return i
                                    }
                                    return !1
                                },
                                cardinality: a
                            }
                        }();
                        return a
                    }()
                },
                r: {
                    validator: ".",
                    cardinality: 50
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        ip: {
            mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
            definitions: {
                i: {
                    validator: function(a, b, c) {
                        return c - 1 > -1 && "." != b.buffer[c - 1] ? (a = b.buffer[c - 1] + a, a = c - 2 > -1 && "." != b.buffer[c - 2] ? b.buffer[c - 2] + a : "0" + a) : a = "00" + a, new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(a)
                    },
                    cardinality: 1
                }
            }
        },
        email: {
            mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,64}]@*{1,64}[.*{2,64}][.*{2,6}][.*{1,2}]",
            greedy: !1,
            onBeforePaste: function(a) {
                return a = a.toLowerCase(), a.replace("mailto:", "")
            },
            definitions: {
                "*": {
                    validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
                    cardinality: 1,
                    casing: "lower"
                }
            }
        }
    }), a.fn.inputmask
}(jQuery),
function(a) {
    return a.extend(a.inputmask.defaults.aliases, {
        numeric: {
            mask: function(a) {
                if (0 !== a.repeat && isNaN(a.integerDigits) && (a.integerDigits = a.repeat), a.repeat = 0, a.groupSeparator == a.radixPoint && (a.groupSeparator = "." == a.radixPoint ? "," : "," == a.radixPoint ? "." : ""), " " === a.groupSeparator && (a.skipOptionalPartCharacter = void 0), a.autoGroup = a.autoGroup && "" != a.groupSeparator, a.autoGroup && isFinite(a.integerDigits)) {
                    var b = Math.floor(a.integerDigits / a.groupSize),
                        c = a.integerDigits % a.groupSize;
                    a.integerDigits += 0 == c ? b - 1 : b
                }
                a.definitions[";"] = a.definitions["~"];
                var d = a.prefix;
                return d += "[+]", d += "~{1," + a.integerDigits + "}", void 0 != a.digits && (isNaN(a.digits) || parseInt(a.digits) > 0) && (d += a.digitsOptional ? "[" + (a.decimalProtect ? ":" : a.radixPoint) + ";{" + a.digits + "}]" : (a.decimalProtect ? ":" : a.radixPoint) + ";{" + a.digits + "}"), d += a.suffix
            },
            placeholder: "",
            greedy: !1,
            digits: "*",
            digitsOptional: !0,
            groupSeparator: "",
            radixPoint: ".",
            radixFocus: !0,
            groupSize: 3,
            autoGroup: !1,
            allowPlus: !0,
            allowMinus: !0,
            integerDigits: "+",
            prefix: "",
            suffix: "",
            rightAlign: !0,
            decimalProtect: !0,
            postFormat: function(b, c, d, e) {
                var f = !1,
                    g = b[c];
                if ("" == e.groupSeparator || -1 != a.inArray(e.radixPoint, b) && c >= a.inArray(e.radixPoint, b) || new RegExp("[-+]").test(g)) return {
                    pos: c
                };
                var h = b.slice();
                g == e.groupSeparator && (h.splice(c--, 1), g = h[c]), d ? h[c] = "?" : h.splice(c, 0, "?");
                var i = h.join("");
                if (e.autoGroup || d && -1 != i.indexOf(e.groupSeparator)) {
                    var j = a.inputmask.escapeRegex.call(this, e.groupSeparator);
                    f = 0 == i.indexOf(e.groupSeparator), i = i.replace(new RegExp(j, "g"), "");
                    var k = i.split(e.radixPoint);
                    if (i = k[0], i != e.prefix + "?0" && i.length >= e.groupSize + e.prefix.length) {
                        f = !0;
                        for (var l = new RegExp("([-+]?[\\d?]+)([\\d?]{" + e.groupSize + "})"); l.test(i);) i = i.replace(l, "$1" + e.groupSeparator + "$2"), i = i.replace(e.groupSeparator + e.groupSeparator, e.groupSeparator)
                    }
                    k.length > 1 && (i += e.radixPoint + k[1])
                }
                b.length = i.length;
                for (var m = 0, n = i.length; n > m; m++) b[m] = i.charAt(m);
                var o = a.inArray("?", b);
                return d ? b[o] = g : b.splice(o, 1), {
                    pos: o,
                    refreshFromBuffer: f
                }
            },
            onKeyDown: function(b, c, d, e) {
                if (b.keyCode == a.inputmask.keyCode.TAB && "0" != e.placeholder.charAt(0)) {
                    var f = a.inArray(e.radixPoint, c);
                    if (-1 != f && isFinite(e.digits)) {
                        for (var g = 1; g <= e.digits; g++)(void 0 == c[f + g] || c[f + g] == e.placeholder.charAt(0)) && (c[f + g] = "0");
                        return {
                            refreshFromBuffer: {
                                start: ++f,
                                end: f + e.digits
                            }
                        }
                    }
                } else if (e.autoGroup && (b.keyCode == a.inputmask.keyCode.DELETE || b.keyCode == a.inputmask.keyCode.BACKSPACE)) {
                    var h = e.postFormat(c, d - 1, !0, e);
                    return h.caret = h.pos + 1, h
                }
            },
            onKeyPress: function(a, b, c, d) {
                if (d.autoGroup) {
                    var e = d.postFormat(b, c - 1, !0, d);
                    return e.caret = e.pos + 1, e
                }
            },
            regex: {
                integerPart: function() {
                    return new RegExp("[-+]?\\d+")
                },
                integerNPart: function() {
                    return new RegExp("\\d+")
                }
            },
            signHandler: function(a, b, c, d, e) {
                if (!d && (e.allowMinus && "-" === a || e.allowPlus && "+" === a)) {
                    var f = b.join("").match(e.regex.integerPart(e));
                    if (f && f.length > 0 && "0" !== f[f.index]) return b[f.index] == ("-" === a ? "+" : "-") ? {
                        pos: f.index,
                        c: a,
                        remove: f.index,
                        caret: c
                    } : b[f.index] == ("-" === a ? "-" : "+") ? {
                        remove: f.index,
                        caret: c - 1
                    } : {
                        pos: f.index,
                        c: a,
                        caret: c + 1
                    }
                }
                return !1
            },
            radixHandler: function(b, c, d, e, f) {
                if (!e && b === f.radixPoint) {
                    var g = a.inArray(f.radixPoint, c.buffer),
                        h = c.buffer.join("").match(f.regex.integerPart(f));
                    if (-1 != g) return c.validPositions[g - 1] ? {
                        caret: g + 1
                    } : {
                        pos: h.index,
                        c: h[0],
                        caret: g + 1
                    }
                }
                return !1
            },
            leadingZeroHandler: function(b, c, d, e, f) {
                var g = c.buffer.join("").match(f.regex.integerNPart(f)),
                    h = a.inArray(f.radixPoint, c.buffer);
                if (g && !e && (-1 == h || g.index < h))
                    if (0 == g[0].indexOf("0") && d >= f.prefix.length) {
                        if (-1 == h || h >= d && void 0 == c.validPositions[h]) return c.buffer.splice(g.index, 1), d = d > g.index ? d - 1 : g.index, {
                            pos: d,
                            remove: g.index
                        };
                        if (d > g.index && h >= d) return c.buffer.splice(g.index, 1), d = d > g.index ? d - 1 : g.index, {
                            pos: d,
                            remove: g.index
                        }
                    } else if ("0" == b && d <= g.index) return !1;
                return !0
            },
            definitions: {
                "~": {
                    validator: function(b, c, d, e, f) {
                        var g = f.signHandler(b, c.buffer, d, e, f);
                        if (!g && (g = f.radixHandler(b, c, d, e, f), !g && (g = e ? new RegExp("[0-9" + a.inputmask.escapeRegex.call(this, f.groupSeparator) + "]").test(b) : new RegExp("[0-9]").test(b), g === !0 && (g = f.leadingZeroHandler(b, c, d, e, f), g === !0)))) {
                            var h = a.inArray(f.radixPoint, c.buffer);
                            f.digitsOptional === !1 && d > h && !e && (g = {
                                pos: d,
                                remove: d
                            }), g = {
                                pos: d
                            }
                        }
                        return g
                    },
                    cardinality: 1,
                    prevalidator: null
                },
                "+": {
                    validator: function(a, b, c, d, e) {
                        var f = e.signHandler(a, b.buffer, c, d, e);
                        return f || (f = e.allowMinus && "-" == a || e.allowPlus && "+" == a), f
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: ""
                },
                ":": {
                    validator: function(b, c, d, e, f) {
                        var g = f.signHandler(b, c.buffer, d, e, f);
                        if (!g) {
                            var h = "[" + a.inputmask.escapeRegex.call(this, f.radixPoint) + "]";
                            g = new RegExp(h).test(b), g && c.validPositions[d] && c.validPositions[d].match.placeholder == f.radixPoint && (g = {
                                pos: d,
                                remove: d
                            })
                        }
                        return g
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: function(a) {
                        return a.radixPoint
                    }
                }
            },
            insertMode: !0,
            autoUnmask: !1,
            onUnMask: function(b, c, d) {
                var e = b.replace(d.prefix, "");
                return e = e.replace(d.suffix, ""), e = e.replace(new RegExp(a.inputmask.escapeRegex.call(this, d.groupSeparator), "g"), "")
            },
            isComplete: function(b, c) {
                var d = b.join(""),
                    e = b.slice();
                if (c.postFormat(e, 0, !0, c), e.join("") != d) return !1;
                var f = d.replace(c.prefix, "");
                return f = f.replace(c.suffix, ""), f = f.replace(new RegExp(a.inputmask.escapeRegex.call(this, c.groupSeparator), "g"), ""), f = f.replace(a.inputmask.escapeRegex.call(this, c.radixPoint), "."), isFinite(f)
            },
            onBeforeMask: function(b, c) {
                if (isFinite(b)) return b.toString().replace(".", c.radixPoint);
                var d = b.match(/,/g),
                    e = b.match(/\./g);
                return e && d ? e.length > d.length ? (b = b.replace(/\./g, ""), b = b.replace(",", c.radixPoint)) : d.length > e.length && (b = b.replace(/,/g, ""), b = b.replace(".", c.radixPoint)) : b = b.replace(new RegExp(a.inputmask.escapeRegex.call(this, c.groupSeparator), "g"), ""), b
            }
        },
        currency: {
            prefix: "$ ",
            groupSeparator: ",",
            radixPoint: ".",
            alias: "numeric",
            placeholder: "0",
            autoGroup: !0,
            digits: 2,
            digitsOptional: !1,
            clearMaskOnLostFocus: !1,
            decimalProtect: !0
        },
        decimal: {
            alias: "numeric"
        },
        integer: {
            alias: "numeric",
            digits: "0"
        }
    }), a.fn.inputmask
}(jQuery),
function(a) {
    return a.extend(a.inputmask.defaults.aliases, {
        phone: {
            url: "phone-codes/phone-codes.js",
            maskInit: "+pp(pp)pppppppp",
            mask: function(b) {
                b.definitions = {
                    p: {
                        validator: function() {
                            return !1
                        },
                        cardinality: 1
                    },
                    "#": {
                        validator: "[0-9]",
                        cardinality: 1
                    }
                };
                var c = [];
                return a.ajax({
                    url: b.url,
                    async: !1,
                    dataType: "json",
                    success: function(a) {
                        c = a
                    }
                }), c = c.sort(function(a, b) {
                    return (a.mask || a) < (b.mask || b) ? -1 : 1
                }), c.splice(0, 0, b.maskInit), c
            },
            nojumps: !0,
            nojumpsThreshold: 1
        },
        phonebe: {
            alias: "phone",
            url: "phone-codes/phone-be.js",
            maskInit: "+32(pp)pppppppp",
            nojumpsThreshold: 4
        }
    }), a.fn.inputmask
}(jQuery),
function(a) {
    return a.extend(a.inputmask.defaults.aliases, {
        Regex: {
            mask: "r",
            greedy: !1,
            repeat: "*",
            regex: null,
            regexTokens: null,
            tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
            quantifierFilter: /[0-9]+[^,]/,
            isComplete: function(a, b) {
                return new RegExp(b.regex).test(a.join(""))
            },
            definitions: {
                r: {
                    validator: function(b, c, d, e, f) {
                        function g(a, b) {
                            this.matches = [], this.isGroup = a || !1, this.isQuantifier = b || !1, this.quantifier = {
                                min: 1,
                                max: 1
                            }, this.repeaterPart = void 0
                        }

                        function h() {
                            var a, b, c = new g,
                                d = [];
                            for (f.regexTokens = []; a = f.tokenizer.exec(f.regex);) switch (b = a[0], b.charAt(0)) {
                                case "(":
                                    d.push(new g(!0));
                                    break;
                                case ")":
                                    var e = d.pop();
                                    d.length > 0 ? d[d.length - 1].matches.push(e) : c.matches.push(e);
                                    break;
                                case "{":
                                case "+":
                                case "*":
                                    var h = new g(!1, !0);
                                    b = b.replace(/[{}]/g, "");
                                    var i = b.split(","),
                                        j = isNaN(i[0]) ? i[0] : parseInt(i[0]),
                                        k = 1 == i.length ? j : isNaN(i[1]) ? i[1] : parseInt(i[1]);
                                    if (h.quantifier = {
                                            min: j,
                                            max: k
                                        }, d.length > 0) {
                                        var l = d[d.length - 1].matches;
                                        if (a = l.pop(), !a.isGroup) {
                                            var e = new g(!0);
                                            e.matches.push(a), a = e
                                        }
                                        l.push(a), l.push(h)
                                    } else {
                                        if (a = c.matches.pop(), !a.isGroup) {
                                            var e = new g(!0);
                                            e.matches.push(a), a = e
                                        }
                                        c.matches.push(a), c.matches.push(h)
                                    }
                                    break;
                                default:
                                    d.length > 0 ? d[d.length - 1].matches.push(b) : c.matches.push(b)
                            }
                            c.matches.length > 0 && f.regexTokens.push(c)
                        }

                        function i(b, c) {
                            var d = !1;
                            c && (k += "(", m++);
                            for (var e = 0; e < b.matches.length; e++) {
                                var f = b.matches[e];
                                if (1 == f.isGroup) d = i(f, !0);
                                else if (1 == f.isQuantifier) {
                                    var g = a.inArray(f, b.matches),
                                        h = b.matches[g - 1],
                                        j = k;
                                    if (isNaN(f.quantifier.max)) {
                                        for (; f.repeaterPart && f.repeaterPart != k && f.repeaterPart.length > k.length && !(d = i(h, !0)););
                                        d = d || i(h, !0), d && (f.repeaterPart = k), k = j + f.quantifier.max
                                    } else {
                                        for (var l = 0, o = f.quantifier.max - 1; o > l && !(d = i(h, !0)); l++);
                                        k = j + "{" + f.quantifier.min + "," + f.quantifier.max + "}"
                                    }
                                } else if (void 0 != f.matches)
                                    for (var p = 0; p < f.length && !(d = i(f[p], c)); p++);
                                else {
                                    var q;
                                    if ("[" == f.charAt(0)) {
                                        q = k, q += f;
                                        for (var r = 0; m > r; r++) q += ")";
                                        var s = new RegExp("^(" + q + ")$");
                                        d = s.test(n)
                                    } else
                                        for (var t = 0, u = f.length; u > t; t++)
                                            if ("\\" != f.charAt(t)) {
                                                q = k, q += f.substr(0, t + 1), q = q.replace(/\|$/, "");
                                                for (var r = 0; m > r; r++) q += ")";
                                                var s = new RegExp("^(" + q + ")$");
                                                if (d = s.test(n)) break
                                            }
                                    k += f
                                }
                                if (d) break
                            }
                            return c && (k += ")", m--), d
                        }
                        null == f.regexTokens && h();
                        var j = c.buffer.slice(),
                            k = "",
                            l = !1,
                            m = 0;
                        j.splice(d, 0, b);
                        for (var n = j.join(""), o = 0; o < f.regexTokens.length; o++) {
                            var g = f.regexTokens[o];
                            if (l = i(g, g.isGroup)) break
                        }
                        return l
                    },
                    cardinality: 1
                }
            }
        }
    }), a.fn.inputmask
}(jQuery);