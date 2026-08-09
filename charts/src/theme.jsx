/* Collabrium chart theme — the single source of visual truth for every board.
 *
 * visx supplies scales, axes, grids and shape generators; it is deliberately
 * unstyled, so everything that makes these nine charts read as one family
 * lives here. A chart that needs a size, a colour or a rule style not defined
 * in this file is a gap in the theme, not a special case — extend the theme.
 *
 * CONTRAST CONTRACT (measured over the real composited fills, AA floor 4.5):
 *   white on SWEEP_FROM #1473E6 ........ 4.54
 *   white on SWEEP_TO   #6D28D9 ........ 7.10
 *   white on ALARM      #C4111F ........ 6.09
 *   ink   on POS mid-gradient .......... 6.97  (5.56 at its dark end)
 *   POS_INK / ALARM_INK / PRI_INK on white  5.90 / 6.09 / 7.10
 * Raw palette hues are never used as text: raw amber on white is 1.98 and raw
 * green 2.35. Raw purple #9F56FF under white text is 4.00 — under the floor —
 * which is why the sweep terminates on #6D28D9 and every in-shape numeral sits
 * at that end of it.
 */

// ── Palette. Three roles plus ink, drawn from the Collabrium tokens. ────────
export const C = {
  ink: '#080808',
  mut: '#5a5a5a',
  faint: '#767676',
  rule: '#d8d8d8',
  card: '#ffffff',

  SWEEP_FROM: '#1473E6', // navy
  SWEEP_TO: '#6D28D9',   // strategic ink — the sweep's dark end, safe under white
  PRI_INK: '#6D28D9',    // primary as text on white
  TRACK: '#9F56FF',      // pale remainder tracks only, never under text
  TRACK_O: 0.12,

  POS: '#009B58',
  POS_INK: '#00734D',
  ALARM: '#C4111F',
  ALARM_RAW: '#FD3343',
};

// ── One type scale. Six rungs, no exceptions outside SCATTER. ───────────────
export const T = {
  EYE: 8.5,      // corner eyebrows, tracked
  TICK: 9,       // axis numbers
  AXIS: 9.5,     // axis names
  LABEL: 11,     // series names
  VALUE: 12.5,   // a figure inside a shape
  VERDICT: 20,   // the one big number each board is allowed
  // The two scatters' label solvers are calibrated to this size; changing it
  // shifts every width estimate and can silently drop a label.
  SCATTER: 8.6,
};

// R is a corner radius, not half the height: at 17 these read as pills, and
// the bars are chart marks rather than DS surfaces, so the 12px interactive
// floor does not apply to them.
export const BAR = { H: 34, R: 6 };

// ── Shared text props, so no chart hand-rolls its own label styling. ───────
export const eyebrowProps = (anchor = 'start') => ({
  fontSize: T.EYE, fontWeight: 800, fill: C.faint, textAnchor: anchor,
  letterSpacing: '0.1em',
});
export const tickLabelProps = (anchor = 'middle') => () => ({
  fontSize: T.TICK, fontWeight: 600, fill: C.faint, textAnchor: anchor,
  dy: anchor === 'end' ? '0.32em' : '0em',
});
export const axisLabelProps = {
  fontSize: T.AXIS, fontWeight: 800, fill: C.mut, textAnchor: 'middle',
};
export const labelProps = (o = {}) => ({
  fontSize: T.LABEL, fontWeight: o.weight || 700, fill: o.fill || C.ink,
  textAnchor: o.anchor || 'start',
});
export const valueProps = (o = {}) => ({
  fontSize: T.VALUE, fontWeight: 900, fill: o.fill || C.ink,
  textAnchor: o.anchor || 'start',
});
export const verdictProps = (o = {}) => ({
  fontSize: T.VERDICT, fontWeight: 900, fill: o.fill || C.ink,
  textAnchor: o.anchor || 'start',
});

// ── One grid, one baseline, one reference dash. ─────────────────────────────
export const GRID = { stroke: C.rule, strokeDasharray: '1 5', strokeLinecap: 'round', strokeWidth: 1 };
export const BASE = { stroke: C.rule, strokeWidth: 1.5 };
export const REF_DASH = '6 4';

/* Shared axis config. hideAxisLine + hideTicks on purpose: the baseline is
 * drawn once by the chart so it is identical everywhere, and tick marks are
 * redundant next to a dotted grid row. */
export const axisLeftProps = {
  hideAxisLine: true, hideTicks: true,
  tickLabelProps: tickLabelProps('end'),
};
export const axisBottomProps = {
  hideAxisLine: true, hideTicks: true,
  tickLabelProps: tickLabelProps('middle'),
};

/* One dot. Ringed in the card colour so it stays legible crossing a line or a
 * grid rule; emphasis adds a halo rather than a second size language. */
export function Dot({ cx, cy, fill, big, halo }) {
  const r = big ? 6.5 : 4.5;
  return (
    <>
      {halo && <circle cx={cx} cy={cy} r={r + 6} fill={fill} opacity={0.16} />}
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={C.card} strokeWidth={2} />
    </>
  );
}

/* The gradient set. Rendered once per chart svg — ids are scoped per chart so
 * two boards on one page cannot collide. */
export function Defs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-sweep`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={C.SWEEP_FROM} />
        <stop offset="1" stopColor={C.SWEEP_TO} />
      </linearGradient>
      <linearGradient id={`${id}-pos`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={C.POS} />
        <stop offset="1" stopColor="#00C26E" />
      </linearGradient>
      <linearGradient id={`${id}-ink`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#2B2B2C" />
        <stop offset="1" stopColor="#4A4A4C" />
      </linearGradient>
      <linearGradient id={`${id}-blueFade`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={C.SWEEP_FROM} stopOpacity="0.26" />
        <stop offset="1" stopColor={C.SWEEP_FROM} stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-purFade`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={C.TRACK} stopOpacity="0.38" />
        <stop offset="1" stopColor={C.TRACK} stopOpacity="0.04" />
      </linearGradient>
      <linearGradient id={`${id}-redFade`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={C.ALARM_RAW} stopOpacity="0.28" />
        <stop offset="1" stopColor={C.ALARM_RAW} stopOpacity="0.05" />
      </linearGradient>
      <radialGradient id={`${id}-blobPri`} cx="0.35" cy="0.3" r="0.95">
        <stop offset="0" stopColor="#D9BFFF" />
        <stop offset="1" stopColor={C.TRACK} />
      </radialGradient>
      <radialGradient id={`${id}-blobPos`} cx="0.35" cy="0.3" r="0.95">
        <stop offset="0" stopColor="#9FF0C6" />
        <stop offset="1" stopColor="#00C26E" />
      </radialGradient>
    </defs>
  );
}

/* Every chart is a fixed-viewBox svg that scales to its card. Fixed dimensions
 * are load-bearing, not lazy: this page renders charts while their tab is still
 * display:none, where a measured/responsive wrapper reports zero and any
 * ResizeObserver-driven layout would render an empty board. */
export function Board({ id, w, h, label, children }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} height={h} width="100%" role="img" aria-label={label}
         style={{ display: 'block', minWidth: 280, overflow: 'visible' }}>
      <Defs id={id} />
      {children}
    </svg>
  );
}

/* One bar: one height, one corner radius, everywhere. */
export function Bar({ x, y, w, fill, opacity }) {
  return <rect x={x} y={y} width={Math.max(0, w)} height={BAR.H} rx={BAR.R} fill={fill} opacity={opacity} />;
}

/* First-fit label placement against a running collision map. Shared by the two
 * scatters. Audited at 1px — a 3px threshold let visually-jammed pairs through
 * (see the tracker's history). Returns null when no candidate box is free, and
 * the caller must treat that as "label dropped" rather than draw it anyway. */
export function makePlacer(bounds, seed) {
  const placed = seed ? seed.slice() : [];
  return function place(cands, w, h) {
    for (let i = 0; i < cands.length; i++) {
      const [bx, by] = cands[i];
      const clear = !placed.some((q) =>
        !(bx + w < q.x - 1 || bx > q.x + q.w + 1 || by + h < q.y - 1 || by > q.y + q.h + 1));
      if (clear && bx > 2 && bx + w < bounds.maxX && by > 2 && by + h < bounds.maxY) {
        placed.push({ x: bx, y: by, w, h });
        return [bx, by];
      }
    }
    return null;
  };
}
