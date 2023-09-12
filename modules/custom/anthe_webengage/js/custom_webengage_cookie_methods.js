function set_cookie(e, t, n) {
    var o, i = "";
    n && ((o = new Date).setTime(o.getTime() + 24 * n * 60 * 60 * 1e3), i = "; expires=" + o.toUTCString()), document.cookie = e + "=" + (t || "") + i + "; path=/"
}

function get_cookie(e) {
    for (var t = e + "=", n = document.cookie.split(";"), o = 0; o < n.length; o++) {
        for (var i = n[o];
            " " == i.charAt(0);) i = i.substring(1, i.length);
        if (0 == i.indexOf(t)) return i.substring(t.length, i.length)
    }
    return null
}

function erase_cookie(e) {
    document.cookie = e + "=; Max-Age=-99999999;"
}