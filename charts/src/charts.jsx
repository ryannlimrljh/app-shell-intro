/* Collabrium — Performance Space boards, built on visx.
 *
 * Bundled by esbuild into pages/assets/charts.bundle.js and committed, so the
 * static page needs neither a build step at deploy time nor a runtime CDN.
 * Build with: npm run build:charts
 *
 * Figures are the reconciled set: months sum to 148.2, media actuals sum to
 * 148.2 against a 157.6 target (94% fill, gap exactly 9.4). Every visual
 * decision comes from ./theme.jsx.
 */
import { createRoot } from 'react-dom/client';
import { scaleLinear } from '@visx/scale';
import { LinePath, AreaClosed, Circle } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { Group } from '@visx/group';
import { curveMonotoneX, curveLinear } from '@visx/curve';
import {
  C, T, BAR, GRID, BASE, REF_DASH, axisLeftProps, axisBottomProps, axisLabelProps,
  eyebrowProps, labelProps, valueProps, verdictProps, Dot, Board, Bar, makePlacer,
} from './theme.jsx';

const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const g = (id, k) => `url(#${id}-${k})`;

/* ── 1 · Cumulative revenue against plan ─────────────────────────────────── */
function Fan({ id }) {
  const w = 700, h = 300, L = 52, R = 630, T0 = 30, B = 254;
  const act = [16.2, 33.3, 51.7, 68.7, 88.3, 108.5, 127.6, 148.2];
  const tgt = [18.6, 37.6, 57.0, 76.2, 96.2, 116.6, 136.8, 157.6, 178.2, 199.0, 219.4, 240.0];
  const com = [148.2, 163.2, 178.6, 194.2, 210.2];
  const wtd = [148.2, 166.2, 184.6, 203.4, 222.9];
  const bst = [148.2, 170.2, 192.8, 215.9, 239.4];
  const x = scaleLinear({ domain: [0, 11], range: [L, R] });
  const y = scaleLinear({ domain: [0, 260], range: [B, T0] });
  const pt = (arr, off = 0) => arr.map((v, i) => ({ i: i + off, v }));
  const band = [...pt(bst, 7), ...pt(com, 7).reverse()];
  return (
    <Board id={id} w={w} h={h} label="Cumulative revenue against target with commit, weighted and best-case projections to December">
      <GridRows scale={y} left={L} width={R - L} tickValues={[0, 65, 130, 195, 260]} {...GRID} />
      <AxisLeft scale={y} left={L} tickValues={[0, 65, 130, 195, 260]}
        tickFormat={(v) => (v ? `${v}M` : '0')} {...axisLeftProps} />
      {/* Commit→best-case band: the spread of outcomes, not a series. */}
      <path d={`M${band.map((p) => `${x(p.i)},${y(p.v)}`).join('L')}Z`} fill={g(id, 'purFade')} />
      <LinePath data={pt(tgt)} x={(d) => x(d.i)} y={(d) => y(d.v)} curve={curveLinear}
        stroke={C.ink} strokeWidth={1.6} strokeDasharray={REF_DASH} opacity={0.45} />
      <LinePath data={pt(com, 7)} x={(d) => x(d.i)} y={(d) => y(d.v)} curve={curveMonotoneX}
        stroke={C.ALARM} strokeWidth={2} strokeDasharray={REF_DASH} />
      <LinePath data={pt(bst, 7)} x={(d) => x(d.i)} y={(d) => y(d.v)} curve={curveMonotoneX}
        stroke={C.POS} strokeWidth={2} strokeDasharray={REF_DASH} />
      {/* Actual to date, grounded on a fade — the one certain thing here. */}
      <AreaClosed data={pt(act)} x={(d) => x(d.i)} y={(d) => y(d.v)} yScale={y}
        curve={curveMonotoneX} fill={g(id, 'blueFade')} />
      <LinePath data={pt(act)} x={(d) => x(d.i)} y={(d) => y(d.v)} curve={curveMonotoneX}
        stroke={C.SWEEP_FROM} strokeWidth={3.5} />
      {/* Weighted takes the sweep's dark end: PRI would make it identical to
          the actual, and the card's legend declares these two apart. */}
      <LinePath data={pt(wtd, 7)} x={(d) => x(d.i)} y={(d) => y(d.v)} curve={curveMonotoneX}
        stroke={C.SWEEP_TO} strokeWidth={3.5} />
      <line x1={x(7)} y1={T0} x2={x(7)} y2={B} {...GRID} />
      <text x={x(7) + 6} y={T0 + 9} {...eyebrowProps()}>PROJECTED</text>
      <Dot cx={x(7)} cy={y(148.2)} fill={C.SWEEP_FROM} />
      <text x={R + 6} y={y(240) - 4} fontSize={T.TICK} fontWeight={800} fill={C.ink}>plan 240.0</text>
      <text x={R + 6} y={y(222.9) - 6} {...eyebrowProps()}>WEIGHTED</text>
      <text x={R + 6} y={y(222.9) + 13} {...verdictProps({ fill: C.PRI_INK })}>222.9</text>
      <AxisBottom scale={x} top={B + 6} tickValues={[...Array(12).keys()]}
        tickFormat={(i) => M[i]} {...axisBottomProps} />
      <line x1={L} y1={B} x2={R} y2={B} {...BASE} />
    </Board>
  );
}

/* ── 2 · Growth composition ──────────────────────────────────────────────── */
function Bridge({ id }) {
  const w = 340, h = 300, L = 112, W = 196, top = 30, rh = 50;
  const rows = [
    { l: 'New advertisers', v: 12.7, fill: g(id, 'pos'), vf: C.ink },
    { l: 'Existing accounts', v: 4.8, fill: g(id, 'sweep'), vf: '#fff' },
    { l: 'Lapsed advertisers', v: -8.6, fill: C.ALARM, vf: '#fff' },
  ];
  const sc = W / 21.3, zero = L + (8.6 / 21.3) * W;
  const ny = top + rh * 3 + 4;
  return (
    <Board id={id} w={w} h={h} label="Waterfall from last year revenue through existing account growth, new business and lapsed accounts to this year">
      <text x={L - 8} y={18} {...eyebrowProps('end')}>RM MILLION</text>
      <line x1={zero} y1={top - 8} x2={zero} y2={top + rh * 3 + 22} stroke={C.faint} strokeWidth={1.2} />
      {rows.map((r, i) => {
        const yy = top + rh * i, bw = Math.abs(r.v) * sc, bx = r.v >= 0 ? zero : zero - bw;
        return (
          <Group key={r.l}>
            <Bar x={bx} y={yy} w={bw} fill={r.fill} />
            <text x={L - 8} y={yy + BAR.H / 2 + 4} {...labelProps({ anchor: 'end' })}>{r.l}</text>
            <text x={bx + bw - 12} y={yy + BAR.H / 2 + 4.5} {...valueProps({ fill: r.vf, anchor: 'end' })}>
              {(r.v > 0 ? '+' : '') + r.v.toFixed(1)}
            </text>
          </Group>
        );
      })}
      <line x1={L - 4} y1={ny - 10} x2={L + W + 32} y2={ny - 10} stroke={C.rule} strokeWidth={1.2} />
      <Bar x={zero} y={ny} w={8.9 * sc} fill={g(id, 'ink')} />
      <text x={L - 8} y={ny + BAR.H / 2 + 4} {...labelProps({ anchor: 'end', weight: 900 })}>Net growth</text>
      <text x={zero + 8.9 * sc - 12} y={ny + BAR.H / 2 + 4.5} {...valueProps({ fill: '#fff', anchor: 'end' })}>+8.9</text>
      <text x={L - 8} y={ny + BAR.H + 26} {...eyebrowProps('end')}>LAST YEAR TO THIS</text>
      <text x={L + 4} y={ny + BAR.H + 28} {...verdictProps()}>139.3 → 148.2</text>
    </Board>
  );
}

/* ── 3 · Pipeline funnel ─────────────────────────────────────────────────── */
function Funnel({ id }) {
  const w = 420, h = 268, L = 14, W = 392, top = 28, rh = 72, max = 51.2;
  const st = [
    { l: 'Negotiation', v: 51.2, wt: 25.6, n: 37, a: '41d', p: '50%' },
    { l: 'Verbal agreement', v: 31.6, wt: 22.1, n: 22, a: '24d', p: '70%' },
    { l: 'Contracted, not booked', v: 28.4, wt: 27.0, n: 14, a: '11d', p: '95%' },
  ];
  const y2 = top + rh * 3 - 8;
  return (
    <Board id={id} w={w} h={h} label="Pipeline funnel by stage with weighted value overlay">
      <text x={L} y={16} {...eyebrowProps()}>OPEN VALUE</text>
      <text x={L + W} y={16} {...eyebrowProps('end')}>RM 111.2M · 73 DEALS</text>
      {st.map((r, i) => {
        const yy = top + rh * i, bw = (r.v / max) * W, ww = (r.wt / max) * W;
        return (
          <Group key={r.l}>
            <Bar x={L} y={yy} w={bw} fill={C.TRACK} opacity={C.TRACK_O} />
            <Bar x={L} y={yy} w={ww} fill={g(id, 'sweep')} />
            <text x={L + 14} y={yy + BAR.H / 2 + 4} {...labelProps({ fill: '#fff', weight: 800 })}>{r.l}</text>
            <text x={L + bw - 12} y={yy + BAR.H / 2 + 4.5} {...valueProps({ anchor: 'end' })}>{r.v.toFixed(1)}</text>
            <text x={L} y={yy + BAR.H + 15} fontSize={T.TICK} fontWeight={600} fill={C.faint}>
              {`${r.n} deals · ${r.p} · avg ${r.a}`}
            </text>
            <text x={L + ww} y={yy + BAR.H + 15} fontSize={T.TICK} fontWeight={800} fill={C.PRI_INK} textAnchor="middle">
              {`weighted ${r.wt.toFixed(1)}`}
            </text>
          </Group>
        );
      })}
      <line x1={L} y1={y2} x2={L + W} y2={y2} stroke={C.rule} strokeWidth={1.2} />
      <text x={L} y={y2 + 22} {...labelProps({ weight: 800 })}>Weighted total</text>
      <text x={L + W} y={y2 + 24} {...verdictProps({ fill: C.PRI_INK, anchor: 'end' })}>RM 74.7M</text>
    </Board>
  );
}

/* ── 4 · Rep risk quadrant. Scales are FIXED, not derived: the label solver
 *      below is audited against these exact coordinates. ─────────────────── */
function Quad({ id }) {
  const w = 640, h = 312, L = 54, R = 486, T0 = 26, B = 266;
  const reps = [
    { n: 'Aisyah Rahman', x: 118, y: 2.5 }, { n: 'Kavitha Raj', x: 112, y: 2.2 },
    { n: 'Wei Ling Ho', x: 101, y: 1.75 },
    { n: 'Hafiz Osman', x: 121, y: 1.45 }, { n: 'Nurul Izzah', x: 108, y: 1.15 },
    { n: 'Arvind Kumar', x: 103, y: 0.85 }, { n: 'Siti Marina', x: 97, y: 1.35 },
    { n: 'Mei Chen', x: 88, y: 2.4 }, { n: 'Faizal Hamid', x: 92, y: 2.05 },
    { n: 'Zarina Yusof', x: 74, y: 1.85 }, { n: 'Jason Lim', x: 78, y: 1.1 },
    { n: 'Priya Menon', x: 95, y: 0.65 }, { n: 'Daniel Tan', x: 85, y: 0.8, r: true },
  ];
  const x = scaleLinear({ domain: [70, 126], range: [L, R] });
  const y = scaleLinear({ domain: [0.3, 2.8], range: [B, T0] });
  const place = makePlacer({ maxX: 636, maxY: B + 34 }, [
    { x: x(101) - 2, y: T0 + 4, w: 120, h: 13 },
    { x: x(70.6) - 2, y: B - 19, w: 140, h: 13 },
    { x: x(70.6) - 2, y: T0 + 4, w: 96, h: 13 },
  ]);
  return (
    <Board id={id} w={w} h={h} label="Quadrant chart of sales rep attainment versus pipeline coverage">
      {/* Only the quadrant that matters is tinted. Three coloured grounds were
          the loudest, least familial thing on this board. */}
      <rect x={x(70)} y={y(1.5)} width={x(100) - x(70)} height={B - y(1.5)} fill={C.ALARM_RAW} opacity={0.07} />
      <line x1={x(100)} y1={T0} x2={x(100)} y2={B} {...GRID} />
      <line x1={L} y1={y(1.5)} x2={R} y2={y(1.5)} {...GRID} />
      <AxisLeft scale={y} left={L} tickValues={[0.5, 1.0, 1.5, 2.0, 2.5]}
        tickFormat={(v) => `${v.toFixed(1)}×`} {...axisLeftProps} />
      <AxisBottom scale={x} top={B + 6} tickValues={[80, 90, 100, 110, 120]}
        tickFormat={(v) => `${v}%`} {...axisBottomProps} />
      <line x1={L} y1={B} x2={R} y2={B} {...BASE} />
      <line x1={L} y1={T0} x2={L} y2={B} {...BASE} />
      <text x={L + (R - L) / 2} y={B + 32} {...axisLabelProps}>Attainment today</text>
      <text transform={`translate(16,${(T0 + B) / 2}) rotate(-90)`} {...axisLabelProps}>Pipeline cover</text>
      <text x={x(101)} y={T0 + 13} {...eyebrowProps()}>AHEAD · WELL COVERED</text>
      <text x={x(70.6)} y={B - 8} {...eyebrowProps()}>AT RISK · BEHIND AND THIN</text>
      <text x={x(70.6)} y={T0 + 13} {...eyebrowProps()}>BEHIND · COVERED</text>
      {reps.map((p) => {
        const cx = x(p.x), cy = y(p.y), col = p.r ? C.ALARM : C.SWEEP_FROM;
        const rad = p.r ? 6.5 : 4.5, fs = p.r ? 9.5 : T.SCATTER, bh = p.r ? 22 : 11;
        const bw = Math.max(p.n.length * fs * 0.55, p.r ? 78 : 0) + 2;
        const spot = place([
          [cx + rad + 4, cy - bh / 2], [cx - rad - 4 - bw, cy - bh / 2],
          [cx - bw / 2, cy - rad - bh - 2], [cx - bw / 2, cy + rad + 2],
          [cx + rad + 4, cy - bh - 3], [cx + rad + 4, cy + 3],
          [cx - rad - 4 - bw, cy - bh - 3], [cx - rad - 4 - bw, cy + 3],
        ], bw, bh);
        return (
          <Group key={p.n}>
            <Dot cx={cx} cy={cy} fill={col} big={p.r} halo={p.r} />
            {/* no free slot ⇒ label dropped; re-run the 1px audit after ANY data edit */}
            {spot && (
              <text x={spot[0]} y={spot[1] + 8.5} fontSize={fs} fontWeight={p.r ? 900 : 700} fill={p.r ? C.ALARM : C.ink}>
                {p.n}
              </text>
            )}
            {spot && p.r && (
              <text x={spot[0]} y={spot[1] + 19.5} fontSize={T.EYE} fontWeight={700} fill={C.ALARM}>
                85% · 0.8× cover
              </text>
            )}
          </Group>
        );
      })}
      <text x={R + 8} y={T0 + 4} {...eyebrowProps()}>13 REPS</text>
    </Board>
  );
}

/* ── 5 · Sold vs sellable ────────────────────────────────────────────────── */
function Fill({ id }) {
  const w = 480, h = 324, L = 14, W = 440, top = 30, rh = 64, max = 88;
  /* k is the Media filter's key, not decoration: this is the only board whose
     data has media lines at all, so it is the only one that can answer that
     filter without a number being invented. 'aa' is the filter's spelling of
     Addressable. The page dims the non-matching rows off this attribute — an
     explicit contract, rather than page CSS counting <g> children and breaking
     the next time a row is reordered. */
  const d = [
    { k: 'tv', l: 'TV', cap: 88.0, sold: 79.4, fill: 90, att: 97 },
    { k: 'aa', l: 'Addressable', cap: 27.0, sold: 26.1, fill: 97, att: 109 },
    { k: 'radio', l: 'Radio', cap: 34.0, sold: 27.2, fill: 80, att: 88 },
    { k: 'digital', l: 'Digital', cap: 25.0, sold: 15.5, fill: 62, att: 75 },
  ];
  const y2 = top + rh * 4 - 10;
  return (
    <Board id={id} w={w} h={h} label="Fill rate versus target attainment by media type">
      <text x={L} y={16} {...eyebrowProps()}>SELLABLE INVENTORY</text>
      <text x={L + W} y={16} {...eyebrowProps('end')}>RM 174.0M CAPACITY</text>
      {d.map((r, i) => {
        const yy = top + rh * i, cw = (r.cap / max) * W, sw = (r.sold / max) * W;
        return (
          <Group key={r.l} data-media={r.k}>
            <Bar x={L} y={yy} w={cw} fill={C.TRACK} opacity={0.12} />
            <Bar x={L} y={yy} w={sw} fill={g(id, 'sweep')} />
            <text x={L + 14} y={yy + BAR.H / 2 + 4} {...labelProps({ fill: '#fff', weight: 800 })}>{r.l}</text>
            {sw > 110
              ? <text x={L + sw - 12} y={yy + BAR.H / 2 + 4.5} {...valueProps({ fill: '#fff', anchor: 'end' })}>{r.sold.toFixed(1)}</text>
              : <text x={L + sw + 10} y={yy + BAR.H / 2 + 4.5} {...valueProps()}>{r.sold.toFixed(1)}</text>}
            <text x={L} y={yy + BAR.H + 15} fontSize={T.TICK} fontWeight={600} fill={C.faint}>
              {`${r.fill}% of ${r.cap.toFixed(1)} sellable`}
            </text>
            <text x={L + 164} y={yy + BAR.H + 15} fontSize={T.TICK} fontWeight={800} fill={r.att >= 100 ? C.POS_INK : C.ALARM}>
              {`${r.att}% of target`}
            </text>
          </Group>
        );
      })}
      <line x1={L} y1={y2} x2={L + W} y2={y2} stroke={C.rule} strokeWidth={1.2} />
      <text x={L} y={y2 + 22} {...labelProps({ weight: 800 })}>Sold</text>
      <text x={L + W} y={y2 + 24} {...verdictProps({ anchor: 'end' })}>RM 148.2M · 85% fill</text>
      <rect x={L} y={y2 + 34} width={12} height={12} rx={3} fill={g(id, 'sweep')} />
      <text x={L + 18} y={y2 + 44} fontSize={T.TICK} fontWeight={600} fill={C.mut}>Sold</text>
      <rect x={L + 64} y={y2 + 34} width={12} height={12} rx={3} fill={C.TRACK} opacity={0.12} />
      <text x={L + 82} y={y2 + 44} fontSize={T.TICK} fontWeight={600} fill={C.mut}>Unsold capacity</text>
    </Board>
  );
}

/* ── 6 · Revenue vs contribution. Scales FIXED for the same reason as the
 *      quadrant — the solver is calibrated to them. ──────────────────────── */
function Bubble({ id }) {
  const w = 500, h = 274, L = 56, R = 440, T0 = 30, B = 228;
  const d = [
    { n: 'Maggi Malaysia', x: 2.10, y: 26 }, { n: 'Shopee', x: 1.95, y: 16 },
    { n: 'Lazada MY', x: 1.80, y: 18 }, { n: 'Petronas Retail', x: 1.55, y: 21 },
    { n: 'Maxis', x: 1.40, y: 29 }, { n: 'Grab MY', x: 1.10, y: 24 },
    { n: 'MyKasih', x: 0.90, y: 22 }, { n: '99 Speedmart', x: 0.85, y: 44 },
    { n: 'Watsons MY', x: 0.75, y: 31 }, { n: 'Mamee', x: 0.65, y: 36 },
    { n: 'ZUS Coffee', x: 0.60, y: 41 }, { n: 'Farm Fresh', x: 0.50, y: 34 },
    { n: 'Tealive', x: 0.45, y: 38 }, { n: 'Secret Recipe', x: 0.35, y: 46 },
  ].map((p) => ({ ...p, c: +(p.x * p.y / 100).toFixed(3) }))
    .sort((a, b) => b.c - a.c);
  const x = scaleLinear({ domain: [0.20, 2.30], range: [L, R] });
  const y = scaleLinear({ domain: [12, 50], range: [B, T0] });
  const place = makePlacer({ maxX: 496, maxY: B + 30 }, []);
  return (
    <Board id={id} w={w} h={h} label="Scatter of advertiser revenue against margin percentage, sized by contribution">
      <GridRows scale={y} left={L} width={R - L} tickValues={[20, 30, 40, 50]} {...GRID} />
      <GridColumns scale={x} top={T0} height={B - T0} tickValues={[0.5, 1.0, 1.5, 2.0]} {...GRID} />
      <AxisLeft scale={y} left={L} tickValues={[20, 30, 40, 50]} tickFormat={(v) => `${v}%`} {...axisLeftProps} />
      <AxisBottom scale={x} top={B + 6} tickValues={[0.5, 1.0, 1.5, 2.0]}
        tickFormat={(v) => v.toFixed(1)} {...axisBottomProps} />
      <line x1={L} y1={B} x2={R} y2={B} {...BASE} />
      <line x1={L} y1={T0} x2={L} y2={B} {...BASE} />
      <text x={(L + R) / 2} y={B + 32} {...axisLabelProps}>Revenue, RM million</text>
      <text transform={`translate(17,${(T0 + B) / 2}) rotate(-90)`} {...axisLabelProps}>Gross margin</text>
      {/* A threshold rule, matching the quadrant's cross — not a third way to
          mark a boundary. */}
      <line x1={L} y1={y(40)} x2={R} y2={y(40)} stroke={C.POS} strokeWidth={1.6} strokeDasharray={REF_DASH} />
      <text x={R - 6} y={y(40) - 7} {...eyebrowProps('end')}>40%+ MARGIN</text>
      {d.map((p) => {
        const hi = p.y >= 40, cx = x(p.x), cy = y(p.y), r = 7 + p.c * 34;
        const bw = p.n.length * 4.9 + 2, bh = 10.5;
        const showVal = r >= 15;
        if (showVal) place([[cx - 15, cy - 6]], 30, 13);
        const spot = place([
          [cx - bw / 2, cy - r - bh - 2], [cx + r + 4, cy - bh / 2], [cx - r - 4 - bw, cy - bh / 2],
          [cx - bw / 2, cy + r + 2], [cx + r + 4, cy - bh - 3], [cx + r + 4, cy + 3],
          [cx - r - 4 - bw, cy - bh - 3], [cx - r - 4 - bw, cy + 3],
        ], bw, bh);
        return (
          <Group key={p.n}>
            <Circle cx={cx} cy={cy} r={r} fill={hi ? g(id, 'blobPos') : g(id, 'blobPri')} opacity={hi ? 0.55 : 0.45} />
            <Circle cx={cx} cy={cy} r={r} fill="none" stroke={hi ? C.POS : C.TRACK} strokeWidth={1.6} />
            {showVal && (
              <text x={cx} y={cy + 3.4} fontSize={T.TICK} fontWeight={900} fill={hi ? C.POS_INK : C.PRI_INK} textAnchor="middle">
                {p.c.toFixed(2)}
              </text>
            )}
            {spot && (
              <text x={spot[0]} y={spot[1] + 8} fontSize={T.SCATTER} fontWeight={hi ? 800 : 700} fill={hi ? C.POS_INK : C.ink}>
                {p.n}
              </text>
            )}
          </Group>
        );
      })}
      <text x={R + 6} y={T0 - 12} {...eyebrowProps('end')}>BUBBLE = GROSS PROFIT</text>
    </Board>
  );
}

/* ── 7 · Churn by reason. "Recoverable" reads POS because that is what it
 *      means — timing, not loss — which also retires the last amber. ─────── */
function Churn({ id }) {
  const w = 480, h = 216, L = 16, W = 448, tot = 4.4, y = 52;
  const seg = [
    { l: 'Budget cycle', v: 2.1, fill: g(id, 'pos'), tf: C.ink, of: C.POS_INK },
    { l: 'Competitive', v: 1.4, fill: C.ALARM, tf: '#fff', of: C.ALARM },
    { l: 'Price', v: 0.5, fill: C.ALARM, tf: '#fff', of: C.ALARM },
    { l: 'Service', v: 0.4, fill: C.mut, tf: '#fff', of: C.mut },
  ];
  const rw = (2.1 / tot) * W, sw2 = W - rw, yr = y + BAR.H + 12;
  let cursor = L;
  return (
    <Board id={id} w={w} h={h} label="Lapsed revenue split by reason, showing recoverable versus structural loss">
      <text x={L} y={20} {...eyebrowProps()}>RM 4.4M LAPSED</text>
      {seg.map((s) => {
        const bw = (s.v / tot) * W, bx = cursor;
        cursor += bw;
        return (
          <Group key={s.l}>
            <Bar x={bx} y={y} w={bw - 6} fill={s.fill} />
            {bw > 62 ? (
              <>
                <text x={bx + (bw - 6) / 2} y={y + 15} fontSize={T.TICK} fontWeight={800} fill={s.tf} textAnchor="middle">{s.l}</text>
                <text x={bx + (bw - 6) / 2} y={y + 29} {...valueProps({ fill: s.tf, anchor: 'middle' })}>{s.v.toFixed(1)}</text>
              </>
            ) : (
              <text x={bx + (bw - 6) / 2} y={y - 8} {...valueProps({ fill: s.of, anchor: 'middle' })}>{s.v.toFixed(1)}</text>
            )}
          </Group>
        );
      })}
      <line x1={L} y1={yr} x2={L + rw - 6} y2={yr} stroke={C.POS} strokeWidth={2.4} strokeLinecap="round" />
      <text x={L + rw / 2} y={yr + 16} {...eyebrowProps('middle')}>RECOVERABLE · RM 2.1M</text>
      <text x={L + rw / 2} y={yr + 30} fontSize={T.TICK} fontWeight={600} fill={C.mut} textAnchor="middle">timing, not loss</text>
      <line x1={L + rw + 2} y1={yr} x2={L + W} y2={yr} stroke={C.ALARM} strokeWidth={2.4} strokeLinecap="round" />
      <text x={L + rw + sw2 / 2} y={yr + 16} {...eyebrowProps('middle')}>STRUCTURAL · RM 2.3M</text>
      <text x={L + rw + sw2 / 2} y={yr + 30} fontSize={T.TICK} fontWeight={600} fill={C.mut} textAnchor="middle">needs a rate conversation</text>
    </Board>
  );
}

/* ── 8 · Concentration curve ─────────────────────────────────────────────── */
function Conc({ id }) {
  const w = 480, h = 250, L = 52, R = 440, T0 = 30, B = 196;
  const pts = [[0, 0], [1, 9.2], [2, 16.1], [3, 22.4], [5, 38], [10, 54], [20, 71]]
    .map(([k, v]) => ({ k, v }));
  const x = scaleLinear({ domain: [0, 20], range: [L, R] });
  const y = scaleLinear({ domain: [0, 80], range: [B, T0] });
  return (
    <Board id={id} w={w} h={h} label="Cumulative revenue concentration curve by advertiser rank">
      <GridRows scale={y} left={L} width={R - L} tickValues={[20, 40, 60, 80]} {...GRID} />
      <AxisLeft scale={y} left={L} tickValues={[20, 40, 60, 80]} tickFormat={(v) => `${v}%`} {...axisLeftProps} />
      <AxisBottom scale={x} top={B + 6} tickValues={[1, 5, 10, 20]} tickFormat={(v) => `Top ${v}`} {...axisBottomProps} />
      <line x1={L} y1={B} x2={R} y2={B} {...BASE} />
      <line x1={L} y1={T0} x2={L} y2={B} {...BASE} />
      <AreaClosed data={pts} x={(d) => x(d.k)} y={(d) => y(d.v)} yScale={y}
        curve={curveMonotoneX} fill={g(id, 'purFade')} />
      <LinePath data={pts} x={(d) => x(d.k)} y={(d) => y(d.v)} curve={curveMonotoneX}
        stroke={C.SWEEP_FROM} strokeWidth={3.5} />
      <line x1={x(5)} y1={y(38)} x2={x(5)} y2={B} {...GRID} />
      <Dot cx={x(1)} cy={y(9.2)} fill={C.SWEEP_FROM} />
      <text x={x(1) + 8} y={y(9.2) - 8} fontSize={T.TICK} fontWeight={700} fill={C.faint}>largest 9.2%</text>
      <Dot cx={x(5)} cy={y(38)} fill={C.SWEEP_FROM} big halo />
      <text x={x(5) + 13} y={y(38) - 12} {...eyebrowProps()}>TOP 5</text>
      <text x={x(5) + 13} y={y(38) + 7} {...verdictProps()}>38%</text>
      <text x={x(5) + 13} y={y(38) + 21} fontSize={T.TICK} fontWeight={600} fill={C.mut}>losing two breaches plan</text>
      <text x={(L + R) / 2} y={B + 32} {...axisLabelProps}>Advertisers by rank</text>
    </Board>
  );
}

/* ── 9 · Us vs market. The share strip is a small multiple of the same
 *      grammar, not a second chart style stacked underneath. ────────────── */
function Share({ id }) {
  const w = 700, h = 268, L = 52, R = 628, T0 = 30, B = 170;
  const mk = [100, 101.2, 102.4, 103.5, 104.8, 105.9, 107.0, 108.1];
  const us = [100, 100.9, 101.9, 102.8, 103.8, 104.7, 105.6, 106.4];
  const sh = [14.20, 14.14, 14.12, 14.08, 14.02, 13.95, 13.88, 13.80];
  const x = scaleLinear({ domain: [0, 7], range: [L, R] });
  const y = scaleLinear({ domain: [98, 110], range: [B, T0] });
  const sT = 212, sB = 248;
  const sy = scaleLinear({ domain: [13.6, 14.4], range: [sB, sT] });
  const pt = (a) => a.map((v, i) => ({ i, v }));
  const gap = [...pt(mk), ...pt(us).reverse()];
  return (
    <Board id={id} w={w} h={h} label="Our indexed growth against market growth, with share of market trending down">
      <GridRows scale={y} left={L} width={R - L} tickValues={[100, 104, 108]} {...GRID} />
      <AxisLeft scale={y} left={L} tickValues={[100, 104, 108]} tickFormat={(v) => `${v}`} {...axisLeftProps} />
      <line x1={L} y1={B} x2={R} y2={B} {...BASE} />
      <AxisBottom scale={x} top={B + 6} tickValues={[...Array(8).keys()]} tickFormat={(i) => M[i]} {...axisBottomProps} />
      <path d={`M${gap.map((p) => `${x(p.i)},${y(p.v)}`).join('L')}Z`} fill={g(id, 'redFade')} />
      <LinePath data={pt(mk)} x={(d) => x(d.i)} y={(d) => y(d.v)} curve={curveMonotoneX}
        stroke={C.faint} strokeWidth={2.2} strokeDasharray={REF_DASH} />
      <LinePath data={pt(us)} x={(d) => x(d.i)} y={(d) => y(d.v)} curve={curveMonotoneX}
        stroke={C.SWEEP_FROM} strokeWidth={3.5} />
      <Dot cx={x(7)} cy={y(106.4)} fill={C.SWEEP_FROM} />
      <text x={R + 6} y={y(108.1) + 3.5} fontSize={T.TICK} fontWeight={800} fill={C.mut}>market +8.1%</text>
      <text x={R + 6} y={y(106.4) + 14} fontSize={T.TICK} fontWeight={800} fill={C.PRI_INK}>us +6.4%</text>
      <text x={L} y={sT - 12} {...eyebrowProps()}>SHARE OF MARKET</text>
      <line x1={L} y1={sT} x2={R} y2={sT} {...GRID} />
      <AxisLeft scale={sy} left={L} tickValues={[13.6, 14.4]} tickFormat={(v) => `${v.toFixed(1)}%`} {...axisLeftProps} />
      <AreaClosed data={pt(sh)} x={(d) => x(d.i)} y={(d) => sy(d.v)} yScale={sy}
        curve={curveMonotoneX} fill={g(id, 'redFade')} />
      <LinePath data={pt(sh)} x={(d) => x(d.i)} y={(d) => sy(d.v)} curve={curveMonotoneX}
        stroke={C.ALARM} strokeWidth={3} />
      <line x1={L} y1={sB} x2={R} y2={sB} {...BASE} />
      <Dot cx={x(7)} cy={sy(13.8)} fill={C.ALARM} />
      <text x={x(0) + 6} y={sy(14.2) - 8} fontSize={T.TICK} fontWeight={800} fill={C.ALARM}>14.2%</text>
      <text x={R + 6} y={sy(13.8) + 7} {...verdictProps({ fill: C.ALARM, anchor: 'end' })}>13.8%</text>
    </Board>
  );
}

/* ── Mount. Each board renders into the div the page reserved for it. React
 *      renders happily into a display:none tab, so no visibility gate here. */
const BOARDS = {
  dFan: Fan, dBridge: Bridge, dFunnel: Funnel, dQuad: Quad, dFill: Fill,
  dBubble: Bubble, dChurn: Churn, dConc: Conc, dShare: Share,
};

function mountAll() {
  Object.keys(BOARDS).forEach((id) => {
    const host = document.getElementById(id);
    if (!host || host.dataset.vxMounted) return;
    host.dataset.vxMounted = '1';
    const Chart = BOARDS[id];
    createRoot(host).render(<Chart id={id} />);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountAll);
} else {
  mountAll();
}
