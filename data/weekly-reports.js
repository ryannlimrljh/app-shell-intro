/* The weekly sales reports, as an index: one line per refresh, newest
   first. The board shows the newest by default and loads any other week
   only when someone picks it, so the page stays light however long the
   history grows. Each file registers itself as window.SALES_REPORTS[asOf]
   (the 9 Oct file, from before the index, sets window.SALES_REPORT).

   A new week: add its file to data/, add one line here, and load the new
   file in the page in place of the previous newest. */
window.SALES_REPORT_BASE = (document.currentScript && document.currentScript.src || '').replace(/[^/]*$/, '');
window.SALES_REPORT_INDEX = [
  { asOf: '2026-10-16', label: '16 Oct 2026', file: 'weekly-report-16oct26.js' },
  { asOf: '2026-10-09', label: '9 Oct 2026', file: 'weekly-report-09oct26.js' }
];
