#!/usr/bin/env python3
"""Global Avenue sayti uchun placeholder arxitektura SVG'lari."""
import math
import os
import random

ROOT = os.path.expanduser('~/Documents/global-avenue/public/img')


def w(path, body):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w', encoding='utf-8') as f:
        f.write(body)


def head(w_, h_, extra=''):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w_} {h_}" '
            f'width="{w_}" height="{h_}" role="img">{extra}')


PALETTES = {
    'dusk':   ('#1d2735', '#3c4a5e', '#8a97a8', '#c9b08a', '#0f151d'),
    'sand':   ('#e8dfd0', '#cfc0a8', '#9d8c74', '#b98a4b', '#4a4437'),
    'morning':('#dbe4ec', '#b6c4d4', '#7e8ea1', '#b98a4b', '#2b3542'),
    'warm':   ('#efe2d2', '#d8bfa0', '#a98a68', '#8c5f34', '#3d3025'),
    'cool':   ('#dfe7ea', '#b9c9cf', '#7d9198', '#b98a4b', '#26343a'),
}


def building_scene(seed, palette, w_=1200, h_=750, towers=None, tower_h=None):
    """Abstract arxitektura sahnasi: osmon gradienti + bino siluetlari."""
    rnd = random.Random(seed)
    sky_a, sky_b, mid, accent, dark = PALETTES[palette]
    gid = f'g{seed}'
    parts = [head(w_, h_)]
    parts.append(
        f'<defs>'
        f'<linearGradient id="{gid}s" x1="0" y1="0" x2="0" y2="1">'
        f'<stop offset="0" stop-color="{sky_a}"/><stop offset="1" stop-color="{sky_b}"/></linearGradient>'
        f'<linearGradient id="{gid}b" x1="0" y1="0" x2="0" y2="1">'
        f'<stop offset="0" stop-color="{mid}" stop-opacity="0.95"/>'
        f'<stop offset="1" stop-color="{dark}" stop-opacity="0.98"/></linearGradient>'
        f'<linearGradient id="{gid}f" x1="0" y1="0" x2="1" y2="0">'
        f'<stop offset="0" stop-color="{dark}"/><stop offset="1" stop-color="{mid}"/></linearGradient>'
        f'</defs>'
    )
    parts.append(f'<rect width="{w_}" height="{h_}" fill="url(#{gid}s)"/>')

    # quyosh / oy
    sx, sy = rnd.randint(180, w_ - 180), rnd.randint(90, 200)
    parts.append(f'<circle cx="{sx}" cy="{sy}" r="{rnd.randint(38, 62)}" fill="{accent}" opacity="0.30"/>')

    # uzoq siluetlar
    ground = int(h_ * 0.80)
    x = -40
    while x < w_ + 40:
        bw = rnd.randint(60, 130)
        bh = rnd.randint(70, 190)
        parts.append(
            f'<rect x="{x}" y="{ground - bh}" width="{bw}" height="{bh}" '
            f'fill="{mid}" opacity="0.35"/>'
        )
        x += bw + rnd.randint(6, 26)

    # asosiy minoralar
    n = towers if towers else rnd.choice([2, 3])
    total = int(w_ * 0.62)
    gap = 26
    bw = (total - gap * (n - 1)) // n
    start = (w_ - total) // 2
    for i in range(n):
        bx = start + i * (bw + gap)
        bh = tower_h[i] if tower_h else rnd.randint(int(h_ * 0.34), int(h_ * 0.60))
        by = ground - bh
        parts.append(f'<rect x="{bx}" y="{by}" width="{bw}" height="{bh}" fill="url(#{gid}b)"/>')
        # oyna panjarasi
        cols = max(3, bw // 34)
        rows = max(4, bh // 40)
        cw = (bw - 18) / cols
        ch = (bh - 22) / rows
        for r in range(rows):
            for c in range(cols):
                if rnd.random() < 0.22:
                    continue
                op = round(rnd.uniform(0.10, 0.42), 2)
                wx = bx + 9 + c * cw + 2
                wy = by + 12 + r * ch + 3
                parts.append(
                    f'<rect x="{wx:.0f}" y="{wy:.0f}" width="{cw - 6:.0f}" '
                    f'height="{ch - 9:.0f}" fill="{accent}" opacity="{op}"/>'
                )
        # tom qirrasi
        parts.append(f'<rect x="{bx - 5}" y="{by - 7}" width="{bw + 10}" height="7" fill="{dark}" opacity="0.9"/>')

    # yer
    parts.append(f'<rect x="0" y="{ground}" width="{w_}" height="{h_ - ground}" fill="url(#{gid}f)"/>')
    parts.append(f'<rect x="0" y="{ground}" width="{w_}" height="3" fill="{accent}" opacity="0.45"/>')

    # daraxtlar
    for _ in range(rnd.randint(5, 9)):
        tx = rnd.randint(20, w_ - 20)
        th = rnd.randint(26, 52)
        parts.append(
            f'<path d="M{tx} {ground} l0 -{th}" stroke="{dark}" stroke-width="3" opacity="0.55"/>'
            f'<circle cx="{tx}" cy="{ground - th}" r="{th * 0.42:.0f}" fill="{dark}" opacity="0.42"/>'
        )

    parts.append('</svg>')
    return ''.join(parts)


def crane_scene(seed, palette, w_=900, h_=675):
    """Qurilish jarayoni kadri: kran + qurilayotgan karkas."""
    rnd = random.Random(seed)
    sky_a, sky_b, mid, accent, dark = PALETTES[palette]
    gid = f'c{seed}'
    p = [head(w_, h_)]
    p.append(
        f'<defs><linearGradient id="{gid}s" x1="0" y1="0" x2="0" y2="1">'
        f'<stop offset="0" stop-color="{sky_a}"/><stop offset="1" stop-color="{sky_b}"/>'
        f'</linearGradient></defs>'
        f'<rect width="{w_}" height="{h_}" fill="url(#{gid}s)"/>'
    )
    ground = int(h_ * 0.82)

    # karkas (qavatlar)
    bx, bw = int(w_ * 0.22), int(w_ * 0.5)
    floors = rnd.randint(5, 10)
    fh = int((ground - h_ * 0.22) / floors)
    for i in range(floors):
        y = ground - (i + 1) * fh
        p.append(f'<rect x="{bx}" y="{y}" width="{bw}" height="{fh - 4}" fill="{mid}" opacity="{0.30 + i * 0.05:.2f}"/>')
        p.append(f'<rect x="{bx}" y="{y}" width="{bw}" height="5" fill="{dark}" opacity="0.7"/>')
    cols = 5
    for c in range(cols + 1):
        cx = bx + c * (bw / cols)
        p.append(f'<rect x="{cx - 3:.0f}" y="{ground - floors * fh}" width="6" height="{floors * fh}" fill="{dark}" opacity="0.55"/>')

    # kran
    mx = int(w_ * 0.78)
    mtop = int(h_ * 0.12)
    p.append(f'<rect x="{mx - 5}" y="{mtop}" width="10" height="{ground - mtop}" fill="{accent}"/>')
    p.append(f'<rect x="{mx - int(w_*0.42)}" y="{mtop}" width="{int(w_*0.52)}" height="9" fill="{accent}"/>')
    hook = mx - int(w_ * 0.30)
    p.append(f'<path d="M{hook} {mtop + 9} L{hook} {mtop + 120}" stroke="{dark}" stroke-width="3"/>')
    p.append(f'<rect x="{hook - 16}" y="{mtop + 120}" width="32" height="22" fill="{dark}" opacity="0.8"/>')

    # yer va materiallar
    p.append(f'<rect x="0" y="{ground}" width="{w_}" height="{h_ - ground}" fill="{dark}" opacity="0.9"/>')
    for _ in range(rnd.randint(3, 6)):
        sx = rnd.randint(20, w_ - 90)
        sw = rnd.randint(50, 90)
        sh = rnd.randint(14, 26)
        p.append(f'<rect x="{sx}" y="{ground - sh}" width="{sw}" height="{sh}" fill="{mid}" opacity="0.75"/>')
    p.append('</svg>')
    return ''.join(p)


def plan_svg(rooms):
    """Planirovka chizmasi — sodda, o'qiladigan chiziqli reja."""
    W, H = 520, 420
    line, wall, fill, txt = '#c9c4ba', '#14181f', '#f7f6f3', '#6b7280'
    p = [head(W, H)]
    p.append(f'<rect width="{W}" height="{H}" fill="#ffffff"/>')
    m = 34
    p.append(f'<rect x="{m}" y="{m}" width="{W-2*m}" height="{H-2*m}" fill="{fill}" stroke="{wall}" stroke-width="6"/>')

    def room(x, y, rw, rh, label):
        p.append(f'<rect x="{x}" y="{y}" width="{rw}" height="{rh}" fill="#ffffff" stroke="{line}" stroke-width="2"/>')
        p.append(
            f'<text x="{x + rw/2:.0f}" y="{y + rh/2:.0f}" text-anchor="middle" '
            f'dominant-baseline="middle" font-family="system-ui,sans-serif" font-size="13" '
            f'fill="{txt}" letter-spacing="0.06em">{label}</text>'
        )

    ix, iy = m + 6, m + 6
    iw, ih = W - 2 * m - 12, H - 2 * m - 12

    if rooms == 0:  # studiya
        room(ix, iy, iw, int(ih * 0.66), 'STUDIO')
        room(ix, iy + int(ih * 0.66) + 4, int(iw * 0.45), ih - int(ih * 0.66) - 4, 'WC')
        room(ix + int(iw * 0.45) + 4, iy + int(ih * 0.66) + 4, iw - int(iw * 0.45) - 4, ih - int(ih * 0.66) - 4, 'BALKON')
    elif rooms == 1:
        room(ix, iy, int(iw * 0.58), int(ih * 0.60), 'ZAL')
        room(ix + int(iw * 0.58) + 4, iy, iw - int(iw * 0.58) - 4, int(ih * 0.60), 'OSHXONA')
        room(ix, iy + int(ih * 0.60) + 4, int(iw * 0.30), ih - int(ih * 0.60) - 4, 'WC')
        room(ix + int(iw * 0.30) + 4, iy + int(ih * 0.60) + 4, iw - int(iw * 0.30) - 4, ih - int(ih * 0.60) - 4, 'KORIDOR')
    elif rooms == 2:
        room(ix, iy, int(iw * 0.52), int(ih * 0.55), 'ZAL')
        room(ix + int(iw * 0.52) + 4, iy, iw - int(iw * 0.52) - 4, int(ih * 0.55), 'YOTOQXONA')
        room(ix, iy + int(ih * 0.55) + 4, int(iw * 0.40), ih - int(ih * 0.55) - 4, 'OSHXONA')
        room(ix + int(iw * 0.40) + 4, iy + int(ih * 0.55) + 4, int(iw * 0.26), ih - int(ih * 0.55) - 4, 'WC')
        room(ix + int(iw * 0.66) + 8, iy + int(ih * 0.55) + 4, iw - int(iw * 0.66) - 8, ih - int(ih * 0.55) - 4, 'BALKON')
    elif rooms == 3:
        room(ix, iy, int(iw * 0.46), int(ih * 0.52), 'ZAL')
        room(ix + int(iw * 0.46) + 4, iy, int(iw * 0.27), int(ih * 0.52), 'YOTOQ 1')
        room(ix + int(iw * 0.73) + 8, iy, iw - int(iw * 0.73) - 8, int(ih * 0.52), 'YOTOQ 2')
        room(ix, iy + int(ih * 0.52) + 4, int(iw * 0.36), ih - int(ih * 0.52) - 4, 'OSHXONA')
        room(ix + int(iw * 0.36) + 4, iy + int(ih * 0.52) + 4, int(iw * 0.22), ih - int(ih * 0.52) - 4, 'WC')
        room(ix + int(iw * 0.58) + 8, iy + int(ih * 0.52) + 4, iw - int(iw * 0.58) - 8, ih - int(ih * 0.52) - 4, 'KORIDOR')
    else:  # 4+
        room(ix, iy, int(iw * 0.40), int(ih * 0.50), 'ZAL')
        room(ix + int(iw * 0.40) + 4, iy, int(iw * 0.28), int(ih * 0.50), 'YOTOQ 1')
        room(ix + int(iw * 0.68) + 8, iy, iw - int(iw * 0.68) - 8, int(ih * 0.50), 'YOTOQ 2')
        room(ix, iy + int(ih * 0.50) + 4, int(iw * 0.30), ih - int(ih * 0.50) - 4, 'YOTOQ 3')
        room(ix + int(iw * 0.30) + 4, iy + int(ih * 0.50) + 4, int(iw * 0.30), ih - int(ih * 0.50) - 4, 'OSHXONA')
        room(ix + int(iw * 0.60) + 8, iy + int(ih * 0.50) + 4, int(iw * 0.18), ih - int(ih * 0.50) - 4, 'WC')
        room(ix + int(iw * 0.78) + 12, iy + int(ih * 0.50) + 4, iw - int(iw * 0.78) - 12, ih - int(ih * 0.50) - 4, 'BALKON')

    # o'lchov chizig'i
    p.append(
        f'<path d="M{m} {H-18} L{W-m} {H-18}" stroke="{txt}" stroke-width="1.4"/>'
        f'<path d="M{m} {H-23} L{m} {H-13} M{W-m} {H-23} L{W-m} {H-13}" stroke="{txt}" stroke-width="1.4"/>'
    )
    p.append('</svg>')
    return ''.join(p)


def article_svg(seed, palette, w_=1200, h_=675):
    """Blog muqovasi — geometrik, sokin kompozitsiya."""
    rnd = random.Random(seed)
    sky_a, sky_b, mid, accent, dark = PALETTES[palette]
    gid = f'a{seed}'
    p = [head(w_, h_)]
    p.append(
        f'<defs><linearGradient id="{gid}" x1="0" y1="0" x2="1" y2="1">'
        f'<stop offset="0" stop-color="{sky_a}"/><stop offset="1" stop-color="{sky_b}"/>'
        f'</linearGradient></defs><rect width="{w_}" height="{h_}" fill="url(#{gid})"/>'
    )
    for i in range(rnd.randint(4, 7)):
        bw = rnd.randint(90, 220)
        bh = rnd.randint(140, 420)
        bx = rnd.randint(-40, w_ - 60)
        by = h_ - bh
        p.append(f'<rect x="{bx}" y="{by}" width="{bw}" height="{bh}" fill="{mid}" opacity="{0.25 + i*0.07:.2f}"/>')
    r = rnd.randint(80, 150)
    p.append(f'<circle cx="{rnd.randint(200, w_-200)}" cy="{rnd.randint(140, 260)}" r="{r}" fill="{accent}" opacity="0.22"/>')
    for i in range(3):
        y = int(h_ * (0.55 + i * 0.12))
        p.append(f'<path d="M0 {y} H{w_}" stroke="{dark}" stroke-width="1.2" opacity="0.18"/>')
    p.append(f'<rect x="0" y="{h_-8}" width="{w_}" height="8" fill="{accent}" opacity="0.55"/>')
    p.append('</svg>')
    return ''.join(p)


# ── Chiqarish ─────────────────────────────────────────────────────────

w('hero.svg', building_scene(7, 'dusk', 1920, 1080, towers=2, tower_h=[560, 500]))

projects = [
    ('twinera', 'dusk', 2, [420, 400]),
    ('izmir', 'sand', 3, None),
    ('marokko', 'warm', 3, None),
    ('ashxabad', 'morning', 3, None),
    ('nrg', 'cool', 4, None),
]
counts = {'twinera': 5, 'izmir': 5, 'marokko': 5, 'ashxabad': 5, 'nrg': 5}
for name, pal, tw, th in projects:
    for i in range(counts[name]):
        fn = f'projects/{name}.svg' if i == 0 else f'projects/{name}-{i+1}.svg'
        w(fn, building_scene(sum(ord(ch) for ch in name) * 7 + i * 31, pal, 1200, 750, towers=tw, tower_h=th if i == 0 else None))

for r, key in [(0, 's'), (1, '1'), (2, '2'), (3, '3'), (4, '4')]:
    w(f'plans/plan-{key}.svg', plan_svg(r))

pal_cycle = ['dusk', 'morning', 'sand', 'warm', 'cool']
for i in range(1, 9):
    w(f'progress/p{i}.svg', crane_scene(100 + i * 17, pal_cycle[i % len(pal_cycle)]))

for i in range(1, 7):
    w(f'blog/post-{i}.svg', article_svg(200 + i * 13, pal_cycle[(i + 2) % len(pal_cycle)]))

total = 0
for base, _, files in os.walk(ROOT):
    total += len([f for f in files if f.endswith('.svg')])
print(f'{total} ta SVG yaratildi -> {ROOT}')
