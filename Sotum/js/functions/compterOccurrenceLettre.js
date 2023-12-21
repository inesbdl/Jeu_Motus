function compterOccurrenceLettre(mot) {
    let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", , "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        window[letter] = i - 96;
    }

    mot.forEach(lettre => {
        switch (lettre) {
            case "a": a += 1; break;
            case "b": b += 1; break;
            case "c": c += 1; break;
            case "d": d += 1; break;
            case "e": e += 1; break;
            case "f": f += 1; break
            case "g": g += 1; break;
            case "h": h += 1; break;
            case "i": i += 1; break;
            case "j": j += 1; break;
            case "k": k += 1; break;
            case "l": l += 1; break;
            case "m": m += 1; break;
            case "n": n += 1; break;
            case "p": p += 1; break;
            case "o": o += 1; break;
            case "q": q += 1; break;
            case "r": r += 1; break;
            case "s": s += 1; break;
            case "t": t += 1; break;
            case "u": u += 1; break;
            case "v": v += 1; break;
            case "w": w += 1; break;
            case "x": x += 1; break;
            case "y": y += 1; break;
            case "z": z += 1; break;

        }
    });
    let tabOccurrence = [
        "a" => a,
            "b" => b,
                "c" => c,
                    "d" => d,
                        "e"=> e,
                            "f" => f,
                                "g"=> g,
                                    "h"=> h,
                                        "i"=> j,
                                            "j"=> k,
                                                "k"=> k,
                                                    "l"=> l,
                                                        "m"=> m,
                                                            "n"=> n,
                                                                "o"=> o,
                                                                    "p"=> p,
                                                                        "q"=> q,
                                                                            "r"=> r,
                                                                                "s"=> s,
                                                                                    "t"=> t,
                                                                                        "u"=> u,
                                                                                            "v"=> v,
                                                                                                "w"=> w,
                                                                                                    "x"=> x,
                                                                                                        "y"=> y,
                                                                                                            "z"=> z
    ];
}

compterOccurrenceLettre("uhu");