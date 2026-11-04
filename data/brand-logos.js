/* Brand directory for the V4 sales board.

   Logos are fetched live, never stored: the board builds each logo's
   address from the brand's website with BRAND_LOGO_SRC as the page
   renders, and the browser caches it. Swap the service by changing that
   one line (Brandfetch or logo.dev once there is an account; Google's
   public favicon service until then). A brand with no logo, or one too
   small to read, shows its initials.

   The report names advertisers the way NeoCRM stores them
   ("CELCOMDIGI BHD", "CELCOM…", "CELCOMDI…"); this directory maps those
   spellings to one display name and a website. It is data, not code:
   once NeoCRM carries each advertiser's website, the board takes the
   website from the report and this list only fills the gaps. Only
   brands whose official site is known with confidence are listed. `re`
   is tested against the report's raw name, upper-cased; first match wins.

   This is also the client list. Settings → Client management reads and
   edits it (through shared/clients.js), and every page that shows a brand
   reads it, so a name or logo changed there shows the same everywhere.
   Edits made in Client management are kept in that browser until the
   directory is served from the server; to make one permanent for
   everyone, change it here. */
window.BRAND_LOGO_SRC = 'https://www.google.com/s2/favicons?domain={domain}&sz=128';
window.BRAND_LOGOS = [
  { name: 'CelcomDigi',            re: '^CELCOM',                          domain: 'celcomdigi.com' },
  { name: 'U Mobile',              re: '^U MOBILE',                        domain: 'u.com.my' },
  { name: 'Maxis',                 re: '^MAXIS',                           domain: 'maxis.com.my' },
  { name: 'Nestlé',                re: '^NESTL',                           domain: 'nestle.com.my' },
  { name: 'GWM Malaysia',          re: '^GREAT WALL MOTOR',                domain: 'gwm.com.my' },
  { name: 'PTPTN',                 re: '^PERBADANAN TABUNG PENDIDIKAN',    domain: 'ptptn.gov.my' },
  { name: 'OMD',                   re: '^OMD\\b',                          domain: 'omd.com' },
  { name: 'DBKL',                  re: '^DEWAN BANDARAYA KUALA LUMPUR',    domain: 'dbkl.gov.my' },
  { name: 'Coway',                 re: '^COWAY',                           domain: 'coway.com.my' },
  { name: 'Perodua',               re: '^(PERODUA|PERUSAHAAN OTOMOBIL KEDUA)', domain: 'perodua.com.my' },
  { name: 'Maybank',               re: '^MALAYAN BA',                      domain: 'maybank.com' },
  { name: 'TM',                    re: '^(TM TECHNOLOG|TELEKOM MALAYSIA)', domain: 'tm.com.my' },
  { name: 'Petronas Dagangan',     re: '^PETRONAS',                        domain: 'petronas.com' },
  { name: 'Gardenia',              re: '^GARDENIA',                        domain: 'gardenia.com.my' },
  { name: 'foodpanda',             re: '^DELIVERY HER',                    domain: 'foodpanda.my' },
  { name: 'SC Johnson',            re: '^SC JOHNSO',                       domain: 'scjohnson.com' },
  { name: 'KFC Malaysia',          re: '^QSR STORES',                      domain: 'kfc.com.my' },
  { name: 'Teraju',                re: '^TERAJU',                          domain: 'teraju.gov.my' },
  { name: 'Senheng',               re: '^SENHENG',                         domain: 'senheng.com.my' },
  { name: 'Grab',                  re: '^GRAB',                            domain: 'grab.com' },
  { name: 'Eu Yan Sang',           re: '^EU YAN SANG',                     domain: 'euyansang.com.my' },
  { name: 'IPG Mediabrands',       re: '^IPG MEDIABRANDS',                 domain: 'ipgmediabrands.com' },
  { name: 'AIA',                   re: '^AIA\\b',                          domain: 'aia.com.my' },
  { name: 'P&G',                   re: '^PROCTER & GAMBLE',                domain: 'pg.com' },
  { name: 'ZUS Coffee',            re: '^ZUS COMMERCE',                    domain: 'zuscoffee.com' },
  { name: 'UMW Toyota',            re: '^UMW TOYOTA',                      domain: 'toyota.com.my' },
  { name: 'KWSP',                  re: '^KUMPULAN WANG SIMPANAN PEKERJA',  domain: 'kwsp.gov.my' },
  { name: 'Tabung Haji',           re: '^LEMBAGA TABUNG HAJI',             domain: 'tabunghaji.gov.my' },
  { name: 'Kementerian Kesihatan Malaysia', re: '^KEMENTERIAN KESIHATAN',     domain: 'moh.gov.my' },
  { name: 'Innocean',              re: '^INNOCEAN',                        domain: 'innocean.com' },
  { name: 'McDonald’s Malaysia',   re: '^(GERBANG ALAF|MCDONALD)',                    domain: 'mcdonalds.com.my' },
  { name: 'AEON Credit',           re: '^AEON CREDIT',                     domain: 'aeoncredit.com.my' },
  { name: 'GSK',                   re: '^GLAXOSMITHKLINE',                 domain: 'gsk.com' },
  { name: 'Sepang Circuit',        re: '^SEPANG INT',                      domain: 'sepangcircuit.com' },
  { name: 'Lalamove',              re: '^LALAMOVE',                        domain: 'lalamove.com' },
  { name: 'Emirates',              re: '^EMIRATES',                        domain: 'emirates.com' },
  { name: 'Danone',                re: '^DANONE',                          domain: 'danone.com' },
  { name: 'PepsiCo',               re: '^PEPSICO',                         domain: 'pepsico.com' },
  { name: 'UOB',                   re: '^UNITED OVERSEAS BANK',            domain: 'uob.com.my' },
  { name: 'Chevron',               re: '^CHEVRON',                         domain: 'chevron.com' },
  { name: 'Proton',                re: '^PROTON',                          domain: 'proton.com' },
  { name: 'Astro',                 re: '^(ASTRO|MEASAT BROADCAST)',        domain: 'astro.com.my' },
  { name: 'Shopee',                re: '^SHOPEE',                          domain: 'shopee.com.my' },
  { name: 'Unilever',              re: '^UNILEVER',                        domain: 'unilever.com.my' },
  { name: 'Mydin',                 re: '^MYDIN',                           domain: 'mydin.com.my' },
  /* The clients Client management started with (4 Nov). KULT has no
     website listed yet, so it shows its initials. */
  { name: 'KULT',                  re: '^KULT\\b' },
  { name: 'Skechers',              re: '^SKECHERS',                        domain: 'skechers.com' },
  { name: 'Nippon Paint',          re: '^NIPPON PAINT',                    domain: 'nipponpaint.com.my' },
  { name: 'SK Magic',              re: '^SK MAGIC',                        domain: 'skmagic.com.my' },
  { name: 'Tourism Malaysia',      re: '^(TOURISM MALAYSIA|LEMBAGA PENGGALAKAN PELANCONGAN)', domain: 'tourism.gov.my' }
];
/* When this list was last revised, shown as "Last updated" for every brand
   nobody has edited in Client management since. */
window.BRAND_LOGOS_UPDATED = '2026-11-04';
