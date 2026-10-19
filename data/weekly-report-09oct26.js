/* The weekly sales report, as the board reads it: the 9 Oct 2026 refresh.
   ─────────────────────────────────────────────────────────────────────
   Generated from the data team's reports, nothing modelled:
     · AMS_SLT_Overview_09OCT26.pdf      All of sales: company, platforms,
       heads, the four-month sprint, deals, booked and won. The reference.
     · AMS_HoS_<head>_09OCT26.pdf x 10   each head's own report: their team
       by salesperson, open pipeline, booked and won, every booking.
     · sales-board-data_09OCT26.json     precise head targets and forecasts
       (they agree with the PDF at every rounding) and four 50% deals the
       PDF's top-eight list leaves out.
   Kult is now inside every company total, as the SLT report has it.
   Names below head level are mapped to the 6 Oct org chart; people the
   reports carry who are not on that chart are kept, with their numbers,
   and flagged `offChart`. Money is RM millions; percentages of target.
   Regenerate with scratchpad/r09/build_data.py. */
window.SALES_REPORT = {
 "asOf": "2026-10-09",
 "asOfLabel": "9 Oct 2026",
 "refresh": "weekly",
 "source": "Weekly sales report, prepared by the data team",
 "month": {
  "key": "Oct",
  "name": "October",
  "day": 9,
  "days": 31
 },
 "months": [
  "Oct",
  "Nov",
  "Dec",
  "Jan"
 ],
 "monthNames": {
  "Oct": "October",
  "Nov": "November",
  "Dec": "December",
  "Jan": "January"
 },
 "rules": {
  "forecast": "Forecast is won-booked plus 80% deals weighted at 80%.",
  "coverage": "The whole bar is coverage: every deal from 30% (proposal sent) up, unweighted. Below 30% never counts.",
  "fifty": "50% deals count toward coverage, not the forecast: moving one to 80% adds 80% of its value to the forecast.",
  "lines": "The red line at 50% is the performance threshold, the green line at 60% the commission unlock.",
  "mapping": "Revenue follows the closer each system records, placed in the October org chart; RM21K is not yet in the name mapping and follows the booking’s lead."
 },
 "company": {
  "target": 38.6,
  "won": 15.3,
  "weighted": 1.7,
  "forecast": 17.0,
  "pct": 44,
  "cov": 52,
  "gap": -21.6,
  "lastYear": {
   "billed": 21.2,
   "label": "October 2025, Finance, net",
   "change": -20
  }
 },
 "platforms": [
  {
   "name": "TV",
   "target": 13.7,
   "won": 4.6,
   "forecast": 5.5,
   "pct": 40,
   "cov": 48,
   "ly": -25
  },
  {
   "name": "Radio",
   "target": 19.0,
   "won": 9.1,
   "forecast": 9.3,
   "pct": 49,
   "cov": 53,
   "ly": -14
  },
  {
   "name": "Digital",
   "target": 4.8,
   "won": 1.5,
   "forecast": 2.0,
   "pct": 42,
   "cov": 69,
   "ly": -16,
   "cycle": {
    "from": 24,
    "day": 16,
    "days": 30
   }
  },
  {
   "name": "AA",
   "target": 1.2,
   "won": 0.131,
   "forecast": 0.169,
   "pct": 15,
   "cov": 15,
   "ly": -73,
   "cycle": {
    "from": 24,
    "day": 16,
    "days": 30
   }
  }
 ],
 "heads": [
  {
   "key": "kenn",
   "name": "Kenn",
   "full": "KENN (KULT)",
   "lead": "kenn",
   "share": 11,
   "target": 4.424,
   "won": 0.182,
   "forecast": 0.352,
   "pct": 8,
   "cov": 16,
   "gap": -4.072,
   "sprint": [
    [
     8,
     16,
     4.4
    ],
    [
     5,
     17,
     4.7
    ],
    [
     2,
     10,
     5.0
    ],
    [
     1,
     3,
     4.4
    ]
   ],
   "sprintForecast": 0.736,
   "sprintGap": -17.7
  },
  {
   "key": "joy",
   "name": "Joy Ahmad",
   "full": "AHMAD, Normala [Joy]",
   "lead": "nicholas",
   "share": 18,
   "target": 7.019,
   "won": 2.4,
   "forecast": 3.208,
   "pct": 46,
   "cov": 49,
   "gap": -3.811,
   "sprint": [
    [
     46,
     49,
     7.0
    ],
    [
     28,
     34,
     7.4
    ],
    [
     3,
     3,
     7.9
    ],
    [
     5,
     5,
     7.0
    ]
   ],
   "sprintForecast": 5.9,
   "sprintGap": -23.4
  },
  {
   "key": "edison",
   "name": "Edison",
   "full": "LIM, Kin Wai [Edison]",
   "lead": "simon",
   "share": 8,
   "target": 3.119,
   "won": 0.473,
   "forecast": 0.58,
   "pct": 19,
   "cov": 21,
   "gap": -2.539,
   "sprint": [
    [
     19,
     21,
     3.1
    ],
    [
     4,
     5,
     3.3
    ],
    [
     2,
     11,
     3.5
    ],
    [
     0,
     1,
     3.1
    ]
   ],
   "sprintForecast": 0.771,
   "sprintGap": -12.2
  },
  {
   "key": "yuen",
   "name": "Yuen",
   "full": "YEE, Yuen Lai",
   "lead": "jeya",
   "share": 13,
   "target": 4.918,
   "won": 2.3,
   "forecast": 2.539,
   "pct": 52,
   "cov": 70,
   "gap": -2.379,
   "sprint": [
    [
     52,
     70,
     4.9
    ],
    [
     30,
     52,
     5.2
    ],
    [
     28,
     89,
     5.5
    ],
    [
     16,
     29,
     4.9
    ]
   ],
   "sprintForecast": 6.4,
   "sprintGap": -14.1
  },
  {
   "key": "alvin",
   "name": "Alvin Wong",
   "full": "WONG, Kok Wei [Alvin]",
   "lead": "jeya",
   "share": 11,
   "target": 4.435,
   "won": 1.9,
   "forecast": 2.219,
   "pct": 50,
   "cov": 65,
   "gap": -2.216,
   "sprint": [
    [
     50,
     65,
     4.4
    ],
    [
     25,
     30,
     4.7
    ],
    [
     19,
     20,
     5.0
    ],
    [
     11,
     13,
     4.4
    ]
   ],
   "sprintForecast": 4.8,
   "sprintGap": -13.7
  },
  {
   "key": "belinda",
   "name": "Belinda",
   "full": "CHIN, Poh Yin [Belinda]",
   "lead": "nicholas",
   "share": 11,
   "target": 4.102,
   "won": 1.9,
   "forecast": 1.953,
   "pct": 48,
   "cov": 65,
   "gap": -2.149,
   "sprint": [
    [
     48,
     65,
     4.1
    ],
    [
     24,
     26,
     4.3
    ],
    [
     9,
     9,
     4.6
    ],
    [
     4,
     9,
     4.1
    ]
   ],
   "sprintForecast": 3.6,
   "sprintGap": -13.5
  },
  {
   "key": "suatwei",
   "name": "Suat Wei",
   "full": "BOON, Suat Wei",
   "lead": "nicholas",
   "share": 12,
   "target": 4.734,
   "won": 3.0,
   "forecast": 3.095,
   "pct": 65,
   "cov": 67,
   "gap": -1.639,
   "sprint": [
    [
     65,
     67,
     4.7
    ],
    [
     16,
     20,
     5.0
    ],
    [
     26,
     26,
     5.3
    ],
    [
     1,
     1,
     4.7
    ]
   ],
   "sprintForecast": 5.3,
   "sprintGap": -14.4
  },
  {
   "key": "siokchin",
   "name": "Siok Chin",
   "full": "TENG, Siok Chin",
   "lead": "nicholas",
   "share": 7,
   "target": 2.879,
   "won": 1.6,
   "forecast": 1.643,
   "pct": 57,
   "cov": 57,
   "gap": -1.236,
   "sprint": [
    [
     57,
     57,
     2.9
    ],
    [
     14,
     16,
     3.0
    ],
    [
     19,
     19,
     3.2
    ],
    [
     7,
     7,
     2.9
    ]
   ],
   "sprintForecast": 2.9,
   "sprintGap": -9.1
  },
  {
   "key": "kavin",
   "name": "Kavin Mullai",
   "full": "SADASSEEVAN, Kavin Mullai",
   "lead": "jeya",
   "share": 5,
   "target": 1.922,
   "won": 1.1,
   "forecast": 1.063,
   "pct": 55,
   "cov": 55,
   "gap": -0.859,
   "sprint": [
    [
     55,
     55,
     1.9
    ],
    [
     17,
     17,
     2.0
    ],
    [
     8,
     8,
     2.2
    ],
    [
     5,
     5,
     1.9
    ]
   ],
   "sprintForecast": 1.7,
   "sprintGap": -6.3
  },
  {
   "key": "joanne",
   "name": "Joanne Tan",
   "full": "TAN, Fung Fung [Joanne]",
   "lead": "jeya",
   "share": 3,
   "target": 1.08,
   "won": 0.373,
   "forecast": 0.389,
   "pct": 36,
   "cov": 41,
   "gap": -0.691,
   "sprint": [
    [
     36,
     41,
     1.1
    ],
    [
     5,
     7,
     1.1
    ],
    [
     9,
     15,
     1.2
    ],
    [
     0,
     0,
     1.1
    ]
   ],
   "sprintForecast": 0.56,
   "sprintGap": -3.9
  }
 ],
 "sprint": {
  "months": {
   "Oct": {
    "won": 15.3,
    "weighted": 1.7,
    "pct": 44,
    "cov": 52,
    "target": 38.6
   },
   "Nov": {
    "won": 6.0,
    "weighted": 1.9,
    "pct": 19,
    "cov": 26,
    "target": 40.7
   },
   "Dec": {
    "won": 4.6,
    "weighted": 1.0,
    "pct": 13,
    "cov": 23,
    "target": 43.3
   },
   "Jan": {
    "won": 1.3,
    "weighted": 0.826,
    "pct": 6,
    "cov": 8,
    "target": 38.5
   }
  },
  "forecast": 32.5,
  "gap": -128.5,
  "caveat": "Pipeline is what has been logged in NeoCRM, which is not necessarily what exists."
 },
 "negotiating": {
  "months": {
   "Oct": {
    "count": 25,
    "value": 0.796
   },
   "Nov": {
    "count": 14
   },
   "Dec": {
    "count": 11
   },
   "Jan": {
    "count": 3
   }
  },
  "eighty": {
   "count": 92,
   "value": 4.08
  },
  "deals": [
   {
    "c": "ROS XTRA - AIA BHD",
    "a": "AIA BHD",
    "p": "Radio",
    "head": "yuen",
    "m": {
     "Oct": 0.166
    },
    "runs": "Oct 26",
    "campaign": 0.166
   },
   {
    "c": "GV - Pesta Vaganza + Radio",
    "a": "INNOCEAN ENTREPRISE",
    "p": "Radio + TV",
    "head": "yuen",
    "m": {
     "Oct": 0.105,
     "Dec": 0.056
    },
    "runs": "Oct 26",
    "bookings": 2,
    "campaign": 0.105
   },
   {
    "c": "[booking in] Lalamove x Fandom A",
    "a": "LALAMOVE MALAYSIA SDN BHD",
    "p": "Digital + Radio",
    "head": "alvin",
    "m": {
     "Oct": 0.075
    },
    "runs": "Oct 26",
    "bookings": 4,
    "campaign": 0.075
   },
   {
    "c": "Weng Seng Heng_SMEVaganza Radio",
    "a": "WENG SENG HENG MEDICAL FACTORY",
    "p": "Radio",
    "head": "alvin",
    "m": {
     "Oct": 0.067
    },
    "runs": "Oct to Nov 26",
    "bookings": 2,
    "campaign": 0.09
   },
   {
    "c": "Flooring",
    "a": "Yellow Paper Plane Sdn Bhd",
    "p": "Digital",
    "head": "kenn",
    "m": {
     "Oct": 0.06
    },
    "runs": "Oct to Nov 26",
    "campaign": 0.085
   },
   {
    "c": "Fandom 7.7 Package",
    "a": "ENRICHMENT MEDIA LAB SDN. BHD.",
    "p": "Digital",
    "head": "kenn",
    "m": {
     "Oct": 0.058
    },
    "runs": "Oct 26",
    "bookings": 2,
    "campaign": 0.058
   },
   {
    "c": "NIPPON PAINT SEEDER 2.0",
    "a": "Yellow Paper Plane",
    "p": "Digital",
    "head": "kenn",
    "m": {
     "Oct": 0.054,
     "Nov": 0.095,
     "Dec": 0.098,
     "Jan": 0.098
    },
    "runs": "Oct to Jan 27",
    "campaign": 0.345
   },
   {
    "c": "[Fandom] Audio Impact 360",
    "a": "FOCUS POINT VISION CARE GROUP",
    "p": "Radio",
    "head": "yuen",
    "m": {
     "Oct": 0.033
    },
    "runs": "Oct 26",
    "campaign": 0.033
   },
   {
    "c": "Blinkie AI Series",
    "a": "BONUSKAD LOYALTY SDN. BHD.",
    "p": "Digital",
    "head": "kenn",
    "m": {
     "Oct": 0.029
    }
   },
   {
    "c": "Video 360+_redONE Mobile",
    "a": "RED ONE NETWORK SDN BHD",
    "p": "Digital",
    "head": "yuen",
    "m": {
     "Oct": 0.029
    }
   },
   {
    "c": "Fandom 7.7 Package",
    "a": "NKMH MEDIA SDN BHD",
    "p": "Digital",
    "head": "kenn",
    "m": {
     "Oct": 0.029,
     "Dec": 0.029
    }
   },
   {
    "c": "Drymix Lab Test Campaign",
    "a": "Yellow Paper Plane Sdn Bhd",
    "p": "Digital",
    "head": "kenn",
    "m": {
     "Oct": 0.025,
     "Nov": 0.101
    }
   },
   {
    "c": "BYD TikTok Series",
    "a": "IPG MEDIABRANDS SDN BHD",
    "p": "Digital",
    "head": "yuen",
    "m": {
     "Nov": 0.336
    }
   },
   {
    "c": "Waterproof All-In-One Campaign 2026",
    "a": "Yellow Paper Plane Sdn Bhd",
    "p": "Digital",
    "head": "kenn",
    "m": {
     "Nov": 0.189,
     "Dec": 0.195
    }
   },
   {
    "c": "Eco Shop - Uncomplicated Challenge",
    "a": "IPG MEDIABRANDS SDN BHD",
    "p": "Digital + Radio",
    "head": "suatwei",
    "m": {
     "Nov": 0.173
    },
    "bookings": 2
   },
   {
    "c": "Weatherbond Lab Test Campaign 2026",
    "a": "Yellow Paper Plane Sdn Bhd",
    "p": "Digital",
    "head": "kenn",
    "m": {
     "Nov": 0.042,
     "Dec": 0.043
    }
   },
   {
    "c": "Weng Seng Heng_SMEVaganza TV",
    "a": "WENG SENG HENG MEDICAL FACTORY SDN BHD",
    "p": "TV",
    "head": "alvin",
    "m": {
     "Nov": 0.04,
     "Dec": 0.04,
     "Jan": 0.022
    },
    "bookings": 2
   },
   {
    "c": "MOUTHWASH TIKTOK KOL CAMPAIGN",
    "a": "Singnan Communications Sdn Bhd",
    "p": "Digital",
    "head": "kenn",
    "m": {
     "Dec": 0.014
    }
   },
   {
    "c": "MegaTrend SMEvaganza Commitment",
    "a": "MEGA TREND ADVERTISING SDN BHD",
    "p": "Digital",
    "head": "belinda",
    "m": {
     "Jan": 0.181
    }
   }
  ]
 },
 "bankOct": [
  [
   "PREPAID",
   "CELCOMDIGI BHD",
   "TV",
   "Booked",
   "suatwei",
   "Ashley",
   0.664
  ],
  [
   "QL EGGS JUARAI PAGIMU - QL EGGS FM",
   "advertiser not recorded",
   "Radio",
   "Booked",
   "edison",
   "Zack",
   0.334
  ],
  [
   "ASTRO RADIO SPONSORSHIP 2026",
   "U MOBILE SERVICES SDN BHD",
   "Radio",
   "Booked",
   "yuen",
   "Vernon",
   0.324
  ],
  [
   "PELANCARAN BULAN MENABUNG SIMPAN SSPN (BMS2026)",
   "PERBADANAN TABUNG PENDIDIKAN TINGGI NASI",
   "Radio",
   "Booked",
   "joy",
   "Nazihah",
   0.315
  ],
  [
   "OMNET DEAL-MARIGOLD HL ADVANCE SARCOPENIA (PRIME",
   "COTRA ENTERPRISE SDN BHD",
   "Radio",
   "Booked",
   "yuen",
   "Jing Yan",
   0.252
  ],
  [
   "WA 016 2026 SPONSORSHIP",
   "CELCOMDIGI BHD",
   "Radio",
   "Won",
   "siokchin",
   "—",
   0.222
  ],
  [
   "SUNWHITE RICE",
   "JASMINE FOOD CORPORATION SDN BHD",
   "TV",
   "Booked",
   "yuen",
   "Siti Sarah",
   0.222
  ],
  [
   "ORION DEAL- GWM RADIO SPONSORSHIP 2026 - SPORT &",
   "GREAT WALL MOTOR SALES MALAYSIA SDN BHD",
   "Radio",
   "Booked",
   "alvin",
   "Crystal",
   0.219
  ],
  [
   "DENTSU DEAL-CONSIDER IPROSPECT PETRONAS NEWS SPO",
   "PETRONAS DAGANGAN BERHAD",
   "Radio",
   "Booked",
   "suatwei",
   "Melanie",
   0.216
  ],
  [
   "Gardenia QuickBites New Launch",
   "GARDENIA BAKERIES (M) SDN BHD",
   "Radio",
   "Won",
   "belinda",
   "Elaine",
   0.199
  ],
  [
   "MILO POWDER - TRIPLE ADVANTAGE",
   "NESTLE PRODUCT SDN BHD",
   "TV",
   "Booked",
   "belinda",
   "Shin Hsin",
   0.196
  ],
  [
   "RIDSECT RADIO-OCT'26-NOV'26 (PRIME TIME COMBO)",
   "SC JOHNSON & SON (M) SDN BHD",
   "Radio",
   "Booked",
   "yuen",
   "Joanne Chen",
   0.195
  ],
  [
   "MAXIS POSTPAID",
   "MAXIS BROADBAND SDN BHD",
   "TV",
   "Booked",
   "belinda",
   "Josephine",
   0.19
  ],
  [
   "COWAY LAUNDRY GROUP CAMPAIGN",
   "COWAY (M) SDN BHD",
   "TV",
   "Booked",
   "belinda",
   "Keong",
   0.173
  ],
  [
   "WONDA COFFEE",
   "ETIKA SDN BHD",
   "TV",
   "Booked",
   "alvin",
   "Aisyah",
   0.172
  ]
 ],
 "bankSprint": [
  [
   "OMNET DEAL-CD 016 POWERLINE SPONSORSHIP 2026",
   "CELCOM…",
   "Radio",
   "Booked",
   "suatwei",
   "Edmund Ng",
   [
    0.122,
    0.117,
    0.879,
    null
   ],
   1.1
  ],
  [
   "ASTRO RADIO SPONSORSHIP 2026",
   "U MOBILE SERVICES SDN BHD",
   "Radio",
   "Booked",
   "yuen",
   "Vernon",
   [
    0.324,
    0.313,
    0.335,
    0.093
   ],
   1.1
  ],
  [
   "MAXIS POSTPAID",
   "MAXIS BROADBAND SDN BHD",
   "TV",
   "Booked",
   "belinda",
   "Josephine",
   [
    0.19,
    0.19,
    0.19,
    0.172
   ],
   0.742
  ],
  [
   "WA 016 2026 SPONSORSHIP",
   "CELCOMDIGI BHD",
   "Radio",
   "Won",
   "siokchin",
   "—",
   [
    0.222,
    0.222,
    0.222,
    null
   ],
   0.666
  ],
  [
   "PREPAID",
   "CELCOMDIGI BHD",
   "TV",
   "Booked",
   "suatwei",
   "Ashley",
   [
    0.664,
    null,
    null,
    null
   ],
   0.664
  ],
  [
   "ORION DEAL- GWM RADIO SPONSORSHIP 2026 - SPORT &",
   "GREAT WALL MOTOR SALES MALAYSIA SDN BHD",
   "Radio",
   "Booked",
   "alvin",
   "Crystal",
   [
    0.219,
    0.199,
    0.219,
    null
   ],
   0.636
  ],
  [
   "WONDA COFFEE",
   "ETIKA SDN BHD",
   "TV",
   "Booked",
   "alvin",
   "Aisyah",
   [
    0.172,
    0.093,
    0.093,
    0.174
   ],
   0.532
  ],
  [
   "OMNET DEAL-3 PAGI ERA SPONSORSHIP 2026",
   "CELCOMDIGI BHD",
   "Radio",
   "Booked",
   "suatwei",
   "Edmund Ng",
   [
    0.099,
    0.094,
    0.289,
    null
   ],
   0.482
  ],
  [
   "WEATHER FORECAST DBKL 2026",
   "DEWAN BANDARAYA KUALA LUMPUR",
   "Radio",
   "Booked",
   "joy",
   "Nadia Rosli",
   [
    0.103,
    0.097,
    0.1,
    0.101
   ],
   0.402
  ],
  [
   "CCTV - ASTRO GROUP BENEFITS & INVESTMENT DETAILS",
   "CCTV…",
   "TV",
   "Booked",
   "joy",
   "Nurul Huda",
   [
    0.093,
    0.093,
    0.093,
    0.093
   ],
   0.372
  ],
  [
   "BRAND X",
   "OMD (M) SDN BHD",
   "TV",
   "Booked",
   "suatwei",
   "Ashley",
   [
    0.168,
    0.202,
    null,
    null
   ],
   0.37
  ],
  [
   "QL EGGS JUARAI PAGIMU - QL EGGS FM",
   "advertiser not recorded",
   "Radio",
   "Booked",
   "edison",
   "Zack",
   [
    0.334,
    0.01,
    0.009,
    null
   ],
   0.353
  ],
  [
   "INFOZONE SPONSORSHIP 2026",
   "PERODUA SALES SDN BHD",
   "Radio",
   "Booked",
   "alvin",
   "Crystal",
   [
    0.113,
    0.119,
    0.113,
    null
   ],
   0.345
  ],
  [
   "PELANCARAN BULAN MENABUNG SIMPAN SSPN (BMS2026)",
   "PERBADANAN TABUNG PENDIDIKAN TINGGI NASI",
   "Radio",
   "Booked",
   "joy",
   "Nazihah",
   [
    0.315,
    null,
    null,
    null
   ],
   0.315
  ],
  [
   "INVENTORY DEAL 3.0-JIWA SME 2026 (ROS XTRA)",
   "TM TECHNOLOGY SERVICES SDN BHD",
   "Radio",
   "Booked",
   "suatwei",
   "Hong Cheng",
   [
    0.167,
    0.122,
    null,
    null
   ],
   0.29
  ]
 ],
 "org": {
  "slt": [
   "Tai"
  ],
  "leads": [
   {
    "key": "jeya",
    "name": "Jeya",
    "heads": [
     "yuen",
     "alvin",
     "kavin",
     "joanne"
    ]
   },
   {
    "key": "nicholas",
    "name": "Nicholas",
    "heads": [
     "joy",
     "belinda",
     "suatwei",
     "siokchin"
    ]
   },
   {
    "key": "simon",
    "name": "Simon",
    "heads": [
     "edison"
    ]
   },
   {
    "key": "kenn",
    "name": "Kenn",
    "heads": [
     "kenn"
    ],
    "note": "Kenn leads his own line, Kult, and reports to neither Jeya nor Nicholas."
   }
  ]
 },
 "teamDetail": {
  "kenn": {
   "rows": [
    {
     "id": "Kazman",
     "n": "Kazman",
     "full": "FAIZAL, Kazman",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       12,
       26,
       2.6
      ],
      [
       5,
       25,
       2.7
      ],
      [
       2,
       15,
       2.9
      ],
      [
       0,
       4,
       2.6
      ]
     ],
     "f": 0.522,
     "g": -10.3
    },
    {
     "id": "Kazman (own book)",
     "n": "Kazman",
     "full": "FAIZAL, Kazman",
     "kind": "own",
     "mgr": "Kazman",
     "cells": [
      {
       "f": 0.0,
       "c": 0.134
      },
      {
       "f": 0.0,
       "c": 0.086
      },
      {
       "f": 0.0,
       "c": 0.029
      },
      null
     ],
     "f": 0.0,
     "g": null
    },
    {
     "id": "Jarald",
     "n": "Jarald",
     "full": "WONG, Jarald",
     "kind": "exec",
     "mgr": "Kazman",
     "cells": [
      [
       0,
       0,
       1.3
      ],
      [
       0,
       0,
       1.4
      ],
      [
       0,
       0,
       1.5
      ],
      [
       0,
       0,
       1.3
      ]
     ],
     "f": 0.0,
     "g": -5.5
    },
    {
     "id": "Jonis",
     "n": "Jonis",
     "full": "CHUNG, Jonis",
     "kind": "exec",
     "mgr": "Kazman",
     "cells": [
      [
       25,
       41,
       1.3
      ],
      [
       10,
       45,
       1.4
      ],
      [
       5,
       29,
       1.4
      ],
      [
       0,
       8,
       1.3
      ]
     ],
     "f": 0.522,
     "g": -4.8
    },
    {
     "id": "Amelia",
     "n": "Amelia",
     "full": "PENG, Amelia",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       2,
       2,
       1.8
      ],
      [
       6,
       6,
       1.9
      ],
      [
       2,
       2,
       2.1
      ],
      [
       2,
       2,
       1.8
      ]
     ],
     "f": 0.214,
     "g": -7.4
    },
    {
     "id": "Gates and Yuk Tung",
     "n": "Gates and Yuk Tung",
     "full": "WONG, Gates & CHAN, Yuk Tung",
     "kind": "shared",
     "mgr": "Amelia",
     "cells": [
      [
       4,
       4,
       0.924
      ],
      [
       6,
       6,
       0.973
      ],
      [
       3,
       3,
       1.0
      ],
      [
       4,
       4,
       0.92
      ]
     ],
     "f": 0.166,
     "g": -3.7
    },
    {
     "id": "Gates",
     "n": "Gates",
     "full": "WONG, Gates",
     "kind": "member",
     "mgr": "Amelia",
     "cells": [
      {
       "f": 0.036,
       "c": 0.036
      },
      {
       "f": 0.058,
       "c": 0.058
      },
      {
       "f": 0.036,
       "c": 0.036
      },
      {
       "f": 0.036,
       "c": 0.036
      }
     ],
     "f": 0.166,
     "g": null,
     "pair": "Gates and Yuk Tung"
    },
    {
     "id": "Yuk Tung",
     "n": "Yuk Tung",
     "full": "CHAN, Yuk Tung",
     "kind": "member",
     "mgr": "Amelia",
     "cells": [
      null,
      null,
      null,
      null
     ],
     "f": 0.0,
     "g": null,
     "pair": "Gates and Yuk Tung"
    },
    {
     "id": "Lani and Yean Yean",
     "n": "Lani and Yean Yean",
     "full": "LOW, Lani & YEAN YEAN",
     "kind": "shared",
     "mgr": "Amelia",
     "cells": [
      [
       0,
       0,
       0.907
      ],
      [
       5,
       5,
       0.955
      ],
      [
       0,
       0,
       1.0
      ],
      [
       0,
       0,
       0.903
      ]
     ],
     "f": 0.048,
     "g": -3.7
    },
    {
     "id": "Lani",
     "n": "Lani",
     "full": "LOW, Lani",
     "kind": "member",
     "mgr": "Amelia",
     "cells": [
      null,
      null,
      null,
      null
     ],
     "f": 0.0,
     "g": null,
     "pair": "Lani and Yean Yean"
    },
    {
     "id": "Yean Yean",
     "n": "Yean Yean",
     "full": "YEAN YEAN",
     "kind": "member",
     "mgr": "Amelia",
     "cells": [
      null,
      {
       "f": 0.048,
       "c": 0.048
      },
      null,
      null
     ],
     "f": 0.048,
     "g": null,
     "pair": "Lani and Yean Yean"
    }
   ],
   "total": {
    "cells": [
     [
      8,
      16,
      4.4
     ],
     [
      5,
      17,
      4.7
     ],
     [
      2,
      10,
      5.0
     ],
     [
      1,
      3,
      4.4
     ]
    ],
    "f": 0.736,
    "g": -17.7
   },
   "open": [
    [
     "Waterproof All-In-One Campaign 2026",
     "Yellow Paper Plane Sdn Bhd",
     "Digital",
     "50%",
     "Jonis",
     {
      "Nov": 0.189,
      "Dec": 0.195
     }
    ],
    [
     "NIPPON PAINT SEEDER 2.0",
     "Yellow Paper Plane",
     "Digital",
     "50%",
     "Jonis",
     {
      "Oct": 0.054,
      "Nov": 0.095,
      "Dec": 0.098,
      "Jan": 0.098
     }
    ],
    [
     "All Shinny White CORE Phase 2 Oct 2026",
     "HAWLEY & HAZEL (M) SDN …",
     "Digital",
     "80%",
     "Jonis",
     {
      "Oct": 0.15
     }
    ],
    [
     "Drymix Lab Test Campaign",
     "Yellow Paper Plane Sdn Bhd",
     "Digital",
     "50%",
     "Jonis",
     {
      "Oct": 0.025,
      "Nov": 0.101
     }
    ],
    [
     "Fandom 7.7 Package",
     "NKMH MEDIA SDN BHD",
     "Digital",
     "50%",
     "Kazman",
     {
      "Oct": 0.029,
      "Nov": 0.029,
      "Dec": 0.029
     }
    ],
    [
     "Flooring",
     "Yellow Paper Plane Sdn Bhd",
     "Digital",
     "50%",
     "Jonis",
     {
      "Oct": 0.06,
      "Nov": 0.025
     }
    ],
    [
     "Weatherbond Lab Test Campaign 2026",
     "Yellow Paper Plane Sdn Bhd",
     "Digital",
     "50%",
     "Jonis",
     {
      "Nov": 0.042,
      "Dec": 0.043
     }
    ],
    [
     "ASW Starshine Purple Phase 2 Oct 2026",
     "HAWLEY & HAZEL (M) SDN …",
     "Digital",
     "80%",
     "Jonis",
     {
      "Oct": 0.062
     }
    ],
    [
     "Fandom 7.7 Package",
     "ENRICHMENT MEDIA LAB SDN. BHD.",
     "Digital",
     "50%",
     "Kazman",
     {
      "Oct": 0.058
     }
    ],
    [
     "MOUTHWASH TIKTOK KOL CAMPAIGN",
     "Singnan Communications Sdn Bhd",
     "Digital",
     "50%",
     "Jonis",
     {
      "Nov": 0.016,
      "Dec": 0.014
     }
    ],
    [
     "Blinkie AI Series",
     "BONUSKAD LOYALTY SDN. BHD. (Malaysia)",
     "Digital",
     "50%",
     "Jonis",
     {
      "Oct": 0.029
     }
    ],
    [
     "UDA Properties H2 2026 Campaign",
     "UDA Holdings Berhad",
     "Digital",
     "50%",
     "Kazman",
     {
      "Oct": 0.019
     }
    ]
   ],
   "bank": [
    [
     "2026 MJN Ambassador",
     "MEAD JOHNSON NUTRITION (M) SDN BHD",
     "Digital",
     "Won",
     "Gates and Yuk Tung",
     [
      0.036,
      0.036,
      0.036,
      0.036
     ],
     0.144
    ],
    [
     "Darlie Double Action Food Campaign P2 Oct 2026",
     "HAWLEY & HAZE…",
     "Digital",
     "Won",
     "Jonis",
     [
      0.048,
      0.085,
      null,
      null
     ],
     0.133
    ],
    [
     "TM Unifi Affiliate Marketing Program 2026",
     "Telekom Malaysia",
     "Digital",
     "Won",
     "Jonis",
     [
      0.039,
      0.038,
      0.018,
      null
     ],
     0.095
    ],
    [
     "VISA/Maybank MU Card MY Campaign",
     "GLOBAL-ASM SINGAPORE PTE. LTD.",
     "Digital",
     "Won",
     "Jonis",
     [
      0.034,
      0.005,
      0.039,
      null
     ],
     0.079
    ],
    [
     "Unilever Others Say Dove",
     "VIVAKI (MALAYSIA) SDN BHD",
     "Digital",
     "Won",
     "Lani and Yean Yean",
     [
      null,
      0.048,
      null,
      null
     ],
     0.048
    ],
    [
     "2027 Raya Campaign",
     "KENANGA WHOLESALE CITY SDN. BHD.",
     "Digital",
     "Won",
     "Jonis",
     [
      0.01,
      0.01,
      0.01,
      null
     ],
     0.031
    ],
    [
     "MJN - 2026 Ambassador POSM Usage Right",
     "MEAD JOHNSON NUTRITI…",
     "Digital",
     "Won",
     "Gates and Yuk Tung",
     [
      null,
      0.022,
      null,
      null
     ],
     0.022
    ],
    [
     "Cloakwork Collaboration Campaign 2026 (Media)",
     "SKECHERS MALA…",
     "Digital",
     "Won",
     "Jonis",
     [
      0.014,
      null,
      null,
      null
     ],
     0.014
    ]
   ],
   "bankOct": [
    [
     "Darlie Double Action Food Campaign P2 Oct 2026",
     "HAWLEY & HAZEL (M) SDN BHD",
     "Digital",
     "Won",
     "Jonis",
     0.048
    ],
    [
     "TM Unifi Affiliate Marketing Program 2026",
     "Telekom Malaysia",
     "Digital",
     "Won",
     "Jonis",
     0.039
    ],
    [
     "2026 MJN Ambassador",
     "MEAD JOHNSON NUTRITION (M) SDN BHD",
     "Digital",
     "Won",
     "Gates and Yuk Tung",
     0.036
    ],
    [
     "VISA/Maybank MU Card MY Campaign",
     "GLOBAL-ASM SINGAPORE PTE. LTD.",
     "Digital",
     "Won",
     "Jonis",
     0.034
    ],
    [
     "Cloakwork Collaboration Campaign 2026 (Media)",
     "SKECHERS MALAYSIA SDN. BHD.",
     "Digital",
     "Won",
     "Jonis",
     0.014
    ],
    [
     "2027 Raya Campaign",
     "KENANGA WHOLESALE CITY SDN. BHD.",
     "Digital",
     "Won",
     "Jonis",
     0.01
    ]
   ],
   "bookings": []
  },
  "joy": {
   "rows": [
    {
     "id": "Nash",
     "n": "Nash",
     "full": "ZULKIFLI, Zul Nashriq",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       61,
       71,
       2.0
      ],
      [
       8,
       8,
       1.8
      ],
      [
       0,
       0,
       2.3
      ],
      [
       0,
       0,
       2.3
      ]
     ],
     "f": 1.4,
     "g": -7.0
    },
    {
     "id": "Nash (own book)",
     "n": "Nash",
     "full": "ZULKIFLI, Zul Nashriq",
     "kind": "own",
     "mgr": "Nash",
     "cells": [
      [
       17,
       17,
       0.486
      ],
      [
       9,
       9,
       0.474
      ],
      [
       0,
       0,
       0.506
      ],
      [
       0,
       0,
       0.484
      ]
     ],
     "f": 0.127,
     "g": -1.8
    },
    {
     "id": "Reezal",
     "n": "Reezal",
     "full": "ISMAIL, Mohd Shahrizal",
     "kind": "exec",
     "mgr": "Nash",
     "cells": [
      [
       15,
       15,
       0.497
      ],
      [
       0,
       0,
       0.461
      ],
      [
       0,
       0,
       0.676
      ],
      [
       0,
       0,
       0.809
      ]
     ],
     "f": 0.073,
     "g": -2.4,
     "assumed": "ISMAIL, Mohd Shahrizal is read as Reezal on the chart"
    },
    {
     "id": "Fauzi",
     "n": "Fauzi",
     "full": "OMAR, Ahmad Fauzi",
     "kind": "exec",
     "mgr": "Nash",
     "cells": [
      [
       202,
       239,
       0.501
      ],
      [
       14,
       14,
       0.446
      ],
      [
       0,
       0,
       0.561
      ],
      [
       0,
       0,
       0.482
      ]
     ],
     "f": 1.1,
     "g": -0.914
    },
    {
     "id": "Ungku Asif",
     "n": "Ungku Asif",
     "full": "UNGKU AZNAN, Ungku Asif",
     "kind": "exec",
     "mgr": "Nash",
     "cells": [
      [
       9,
       9,
       0.495
      ],
      [
       10,
       10,
       0.464
      ],
      [
       0,
       0,
       0.53
      ],
      [
       0,
       0,
       0.489
      ]
     ],
     "f": 0.088,
     "g": -1.9
    },
    {
     "id": "Nazihah",
     "n": "Nazihah",
     "full": "ABDOL GHAPOR, Nazihah",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       45,
       45,
       2.0
      ],
      [
       37,
       43,
       2.2
      ],
      [
       7,
       7,
       2.1
      ],
      [
       11,
       11,
       1.5
      ]
     ],
     "f": 2.0,
     "g": -5.7
    },
    {
     "id": "Nazihah (own book)",
     "n": "Nazihah",
     "full": "ABDOL GHAPOR, Nazihah",
     "kind": "own",
     "mgr": "Nazihah",
     "cells": [
      [
       73,
       73,
       0.616
      ],
      [
       9,
       9,
       0.835
      ],
      [
       0,
       0,
       1.0
      ],
      [
       0,
       0,
       0.488
      ]
     ],
     "f": 0.519,
     "g": -2.5
    },
    {
     "id": "Nurul Syahirah",
     "n": "Nurul Syahirah",
     "full": "SAMSUDIN, Nurul Syahirah",
     "kind": "exec",
     "mgr": "Nazihah",
     "cells": [
      [
       8,
       8,
       0.808
      ],
      [
       6,
       6,
       0.865
      ],
      [
       7,
       7,
       0.536
      ],
      [
       10,
       10,
       0.479
      ]
     ],
     "f": 0.2,
     "g": -2.5
    },
    {
     "id": "Nadia Rosli",
     "n": "Nadia Rosli",
     "full": "ROSLI, Nadia",
     "kind": "exec",
     "mgr": "Nazihah",
     "cells": [
      [
       69,
       69,
       0.545
      ],
      [
       144,
       170,
       0.478
      ],
      [
       20,
       20,
       0.553
      ],
      [
       22,
       22,
       0.486
      ]
     ],
     "f": 1.3,
     "g": -0.78
    },
    {
     "id": "Sharifah Kuraisha",
     "n": "Sharifah Kuraisha",
     "full": "SYED AMIR SAMSUDDIN, Sharifah Khuraisha",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       27,
       27,
       1.6
      ],
      [
       36,
       52,
       1.8
      ],
      [
       1,
       1,
       1.7
      ],
      [
       4,
       4,
       1.5
      ]
     ],
     "f": 1.2,
     "g": -5.4
    },
    {
     "id": "Sharifah Kuraisha (own book)",
     "n": "Sharifah Kuraisha",
     "full": "SYED AMIR SAMSUDDIN, Sharifah Khuraisha",
     "kind": "own",
     "mgr": "Sharifah Kuraisha",
     "cells": [
      [
       12,
       12,
       0.501
      ],
      [
       9,
       9,
       0.459
      ],
      [
       0,
       0,
       0.648
      ],
      [
       0,
       0,
       0.473
      ]
     ],
     "f": 0.099,
     "g": -2.0
    },
    {
     "id": "Imran",
     "n": "Imran",
     "full": "MD. ABDUL RASHID, Muhammad Imran",
     "kind": "exec",
     "mgr": "Sharifah Kuraisha",
     "cells": [
      [
       9,
       9,
       0.595
      ],
      [
       0,
       0,
       0.881
      ],
      [
       2,
       2,
       0.559
      ],
      [
       12,
       12,
       0.494
      ]
     ],
     "f": 0.123,
     "g": -2.4
    },
    {
     "id": "Nurshafiqah",
     "n": "Nurshafiqah",
     "full": "ABD RAHIM, Nurshafiqah",
     "kind": "exec",
     "mgr": "Sharifah Kuraisha",
     "cells": [
      [
       65,
       65,
       0.504
      ],
      [
       127,
       190,
       0.475
      ],
      [
       0,
       0,
       0.528
      ],
      [
       0,
       0,
       0.49
      ]
     ],
     "f": 0.934,
     "g": -1.1
    },
    {
     "id": "Nurul Huda",
     "n": "Nurul Huda",
     "full": "HAMIDON, Nurul Huda",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       45,
       46,
       1.5
      ],
      [
       30,
       31,
       1.6
      ],
      [
       6,
       7,
       1.7
      ],
      [
       6,
       6,
       1.8
      ]
     ],
     "f": 1.4,
     "g": -5.2
    },
    {
     "id": "Nurul Huda (own book)",
     "n": "Nurul Huda",
     "full": "HAMIDON, Nurul Huda",
     "kind": "own",
     "mgr": "Nurul Huda",
     "cells": [
      [
       44,
       44,
       0.495
      ],
      [
       30,
       30,
       0.528
      ],
      [
       14,
       14,
       0.672
      ],
      [
       12,
       12,
       0.805
      ]
     ],
     "f": 0.564,
     "g": -1.9
    },
    {
     "id": "Monica",
     "n": "Monica",
     "full": "MUJAH, Siti Mahdeya Yvonne",
     "kind": "exec",
     "mgr": "Nurul Huda",
     "cells": [
      [
       51,
       53,
       0.496
      ],
      [
       48,
       49,
       0.515
      ],
      [
       1,
       1,
       0.532
      ],
      [
       2,
       3,
       0.533
      ]
     ],
     "f": 0.52,
     "g": -1.6
    },
    {
     "id": "Arif",
     "n": "Arif",
     "full": "AMINUDDIN, Mohamad Arif",
     "kind": "exec",
     "mgr": "Nurul Huda",
     "cells": [
      [
       41,
       42,
       0.48
      ],
      [
       13,
       14,
       0.508
      ],
      [
       2,
       2,
       0.506
      ],
      [
       0,
       0,
       0.476
      ]
     ],
     "f": 0.271,
     "g": -1.7
    }
   ],
   "total": {
    "cells": [
     [
      46,
      49,
      7.0
     ],
     [
      28,
      34,
      7.4
     ],
     [
      3,
      3,
      7.9
     ],
     [
      5,
      5,
      7.0
     ]
    ],
    "f": 5.9,
    "g": -23.4
   },
   "open": [
    [
     "Mualim Muda S2 Sponsorship",
     "MEDIAKEY GROUP SDN BHD (agency)",
     "TV",
     "80%",
     "Fauzi",
     {
      "Oct": 0.936
     }
    ],
    [
     "TRAVELOGUE 14 PJRM",
     "CLEAVE AMITY (agency)",
     "TV",
     "80%",
     "Nadia Rosli",
     {
      "Nov": 0.624
     }
    ],
    [
     "BRAND PLAN PADI BERAS NASIONAL BERHAD (BERNAS) 2",
     "PADI…",
     "TV",
     "80%",
     "Nurshafiqah",
     {
      "Nov": 0.234
     }
    ],
    [
     "KWSP - BASS [NIKAH]",
     "KUMPULAN WANG SIMPANAN PEKERJA",
     "Digital + TV",
     "80%",
     "Monica",
     {
      "Oct": 0.038,
      "Nov": 0.028
     }
    ],
    [
     "TBA",
     "Alhaya International Women’s Specialists",
     "Digital + Radio",
     "80%",
     "Arif",
     {
      "Oct": 0.007,
      "Nov": 0.012,
      "Dec": 0.012
     }
    ],
    [
     "Xp Day Stem & Tvet Education Promotional",
     "Todak Academy Sdn. Bhd.",
     "Radio",
     "80%",
     "Arif",
     {
      "Oct": 0.025
     }
    ],
    [
     "CBP - RENEWAL BERDUA MALAM SINAR",
     "KOPERASI CO-OPBANK PERT…",
     "Digital + Radio",
     "80%",
     "Monica",
     {
      "Jan": 0.015
     }
    ],
    [
     "Maxim Elite Event",
     "Malaysia Healthcare Travel Council (MHTC",
     "TV",
     "80%",
     "Arif",
     {
      "Nov": 0.013
     }
    ],
    [
     "CBP - FANDOM AA COMPLETED VIEWS",
     "ENRICHMENT MEDIA LAB SDN …",
     "AA",
     "80%",
     "Monica",
     {
      "Oct": 0.012
     }
    ],
    [
     "Borak SeeNI : KPJ Kuala Selangor",
     "ACI ACI BUKA PINTU ENTERPRISE (ag…",
     "TV",
     "80%",
     "Arif",
     {
      "Oct": 0.003
     }
    ]
   ],
   "bank": [
    [
     "WEATHER FORECAST DBKL 2026",
     "DEWAN BANDARAYA KUALA LUMPUR",
     "Radio",
     "Booked",
     "Nadia Rosli",
     [
      0.103,
      0.097,
      0.1,
      0.101
     ],
     0.402
    ],
    [
     "CCTV - ASTRO GROUP BENEFITS & INVESTMENT DETAILS",
     "CCTV N…",
     "TV",
     "Booked",
     "Nurul Huda",
     [
      0.093,
      0.093,
      0.093,
      0.093
     ],
     0.372
    ],
    [
     "PELANCARAN BULAN MENABUNG SIMPAN SSPN (BMS2026)",
     "PER…",
     "Radio",
     "Booked",
     "Nazihah",
     [
      0.315,
      null,
      null,
      null
     ],
     0.315
    ],
    [
     "Putera35 Season 2",
     "TERAJU BUMIPUTERA CORPORATION",
     "Digital + TV",
     "Won",
     "Nadia Rosli",
     [
      0.164,
      0.078,
      null,
      null
     ],
     0.242
    ],
    [
     "Keganasan Rumah Tangga (KRT) 2026 BY KPWKM",
     "KEMENTERIAN P…",
     "AA + Digital + Ra…",
     "Won",
     "Nurshafiqah",
     [
      null,
      0.233,
      null,
      null
     ],
     0.233
    ],
    [
     "KWSP - 75th ANNIVERSARY DOCUMENTARY [AGENCY]",
     "Ipg Orion S…",
     "Digital + TV",
     "Won",
     "Monica",
     [
      null,
      0.181,
      null,
      null
     ],
     0.181
    ],
    [
     "BASS_ Wedding 2026",
     "GBR Marketing Sdn Bhd",
     "Digital",
     "Won",
     "Nurshafiqah",
     [
      0.154,
      null,
      null,
      null
     ],
     0.154
    ],
    [
     "SME26 PEN SINAR 1782",
     "DR CUTE INTERNATIONAL SDN BHD",
     "Radio",
     "Booked",
     "Nazihah",
     [
      0.075,
      0.071,
      null,
      null
     ],
     0.146
    ],
    [
     "RETAIL BANKING OCT'26-JAN'27",
     "BANK SIMPANAN NASIONAL BERHAD",
     "Radio",
     "Booked",
     "Nurul Syahirah",
     [
      0.026,
      0.036,
      0.039,
      0.036
     ],
     0.136
    ],
    [
     "MEDIA BUY KPWKM 2026",
     "KEMENTERIAN PEMBANGUNAN WANITA, KELUARGA",
     "TV",
     "Won",
     "Nurshafiqah",
     [
      null,
      0.135,
      null,
      null
     ],
     0.135
    ],
    [
     "ROS XTRA-JOM ISTITO'AH -SEP'26-OCT'26",
     "LEMBAGA TABUNG HAJI",
     "Radio",
     "Booked",
     "Nash",
     [
      0.078,
      0.044,
      null,
      null
     ],
     0.122
    ],
    [
     "DICCI JUS ARABIC GOLD",
     "DICCI GROUP SDN BHD",
     "TV",
     "Booked",
     "Fauzi",
     [
      0.057,
      0.06,
      null,
      null
     ],
     0.116
    ],
    [
     "ROS XTRA-AGENDA NASIONAL MALAYSIA SIHAT-OCT'26-N",
     "KEME…",
     "Radio",
     "Booked",
     "Arif",
     [
      0.07,
      0.045,
      null,
      null
     ],
     0.115
    ],
    [
     "ESKAYVIE HEALTHCARE",
     "ESKAYVIE SDN BHD",
     "TV",
     "Booked",
     "Nurul Huda",
     [
      0.052,
      0.052,
      null,
      null
     ],
     0.105
    ],
    [
     "INVENTORY DEAL 3.0-BUILDING FINANCIAL READINESS",
     "KUMPULA…",
     "Radio",
     "Booked",
     "Monica",
     [
      0.104,
      null,
      null,
      null
     ],
     0.104
    ]
   ],
   "bankOct": [
    [
     "PELANCARAN BULAN MENABUNG SIMPAN SSPN (BMS2026)",
     "PERBADANAN TABUNG PENDIDIKAN TINGGI NASI",
     "Radio",
     "Booked",
     "Nazihah",
     0.315
    ],
    [
     "Putera35 Season 2",
     "TERAJU BUMIPUTERA CORPORATION",
     "Digital + TV",
     "Won",
     "Nadia Rosli",
     0.164
    ],
    [
     "BASS_ Wedding 2026",
     "GBR Marketing Sdn Bhd",
     "Digital",
     "Won",
     "Nurshafiqah",
     0.154
    ],
    [
     "INVENTORY DEAL 3.0-BUILDING FINANCIAL READINESS",
     "KUMPULAN WANG SIMPANAN PEKERJA",
     "Radio",
     "Booked",
     "Monica",
     0.104
    ],
    [
     "WEATHER FORECAST DBKL 2026",
     "DEWAN BANDARAYA KUALA LUMPUR",
     "Radio",
     "Booked",
     "Nadia Rosli",
     0.103
    ],
    [
     "CCTV - ASTRO GROUP BENEFITS & INVESTMENT DETAILS",
     "CCTV NEWS CONTENT CO LTD",
     "TV",
     "Booked",
     "Nurul Huda",
     0.093
    ],
    [
     "ROS XTRA-JOM ISTITO'AH -SEP'26-OCT'26",
     "LEMBAGA TABUNG HAJI",
     "Radio",
     "Booked",
     "Nash",
     0.078
    ],
    [
     "SME26 PEN SINAR 1782",
     "DR CUTE INTERNATIONAL SDN BHD",
     "Radio",
     "Booked",
     "Nazihah",
     0.075
    ],
    [
     "ROS XTRA-AGENDA NASIONAL MALAYSIA SIHAT-OCT'26-N",
     "KEMENTERIAN KESIHATAN MALAYSIA",
     "Radio",
     "Booked",
     "Arif",
     0.07
    ],
    [
     "KILAUAN EMAS SELEBRITI",
     "DICCI GROUP SDN BHD",
     "Digital + Radio",
     "Booked",
     "Fauzi",
     0.068
    ],
    [
     "JIWA SME x FAMA (KOPIE SATU) 2026",
     "LEMBAGA PEMASARAN PERTANIAN PERSEKUTUAN",
     "Digital + Radio",
     "Won",
     "Nurshafiqah",
     0.06
    ],
    [
     "DICCI JUS ARABIC GOLD",
     "DICCI GROUP SDN BHD",
     "TV",
     "Booked",
     "Fauzi",
     0.057
    ],
    [
     "MIMOS BERHAD",
     "MIMOS BERHAD",
     "TV",
     "Booked",
     "Nadia Rosli",
     0.053
    ],
    [
     "ESKAYVIE HEALTHCARE",
     "ESKAYVIE SDN BHD",
     "TV",
     "Booked",
     "Nurul Huda",
     0.052
    ],
    [
     "Branding",
     "AMANAHRAYA TRUSTEESBERHAD",
     "Digital + TV",
     "Won",
     "Imran",
     0.051
    ]
   ],
   "bookings": [
    [
     "PELANCARAN BULAN MENABUNG SIMPAN SSPN (BMS2026)",
     "PERBADANAN TABUNG PENDIDIKAN TINGGI NASI",
     "Radio",
     "Nazihah",
     0.315
    ],
    [
     "INVENTORY DEAL 3.0-BUILDING FINANCIAL READINESS",
     "KUMPULAN WANG SIMPANAN PEKERJA",
     "Radio",
     "Monica",
     0.104
    ],
    [
     "WEATHER FORECAST DBKL 2026",
     "DEWAN BANDARAYA KUALA LUMPUR",
     "Radio",
     "Nadia Rosli",
     0.103
    ],
    [
     "CCTV - ASTRO GROUP BENEFITS & INVESTMENT DETAILS",
     "CCTV NEWS CONTENT CO LTD",
     "TV",
     "Nurul Huda",
     0.093
    ],
    [
     "ROS XTRA-JOM ISTITO'AH -SEP'26-OCT'26",
     "LEMBAGA TABUNG HAJI",
     "Radio",
     "Nash",
     0.078
    ],
    [
     "SME26 PEN SINAR 1782",
     "DR CUTE INTERNATIONAL SDN BHD",
     "Radio",
     "Nazihah",
     0.075
    ],
    [
     "ROS XTRA-AGENDA NASIONAL MALAYSIA SIHAT-OCT'26-N",
     "KEMENTERIAN KESIHATAN MALAYSIA",
     "Radio",
     "Arif",
     0.07
    ],
    [
     "KILAUAN EMAS SELEBRITI",
     "DICCI GROUP SDN BHD",
     "Digital + Radio",
     "Fauzi",
     0.068
    ],
    [
     "DICCI JUS ARABIC GOLD",
     "DICCI GROUP SDN BHD",
     "TV",
     "Fauzi",
     0.057
    ],
    [
     "MIMOS BERHAD",
     "MIMOS BERHAD",
     "TV",
     "Nadia Rosli",
     0.053
    ],
    [
     "ESKAYVIE HEALTHCARE",
     "ESKAYVIE SDN BHD",
     "TV",
     "Nurul Huda",
     0.052
    ],
    [
     "FEATURE HITZ FM THAT'S SO MALAYSIAN",
     "KEMENTERIAN PERPADUAN NEGARA",
     "Radio",
     "Monica",
     0.045
    ],
    [
     "SME26 PEN ERA 325",
     "EMAS SRI SEMANTAN SDN BHD",
     "Radio",
     "Fauzi",
     0.038
    ],
    [
     "PUBLIC BANK - 60TH DIAMOND JUBILEE ANNIVERSARY",
     "PUBLIC BANK BERHAD",
     "TV",
     "Arif",
     0.036
    ],
    [
     "#BELLASYEDYES-WEDDING EVENT:SOLEMNISATION,RECEPT",
     "GBR MARKETING SDN BHD",
     "Radio",
     "Nurshafiqah",
     0.031
    ],
    [
     "MALAYSIA AIRPORT HOLDINGS BERHAD",
     "MALAYSIA AIRPORT HOLDINGS BERHAD",
     "TV",
     "Arif",
     0.03
    ],
    [
     "SME26 PEN SINAR 325",
     "EMAS SRI SEMANTAN SDN BHD",
     "Radio",
     "Fauzi",
     0.029
    ],
    [
     "MIDA - IGEM",
     "MALAYSIAN INVESTMENT DEVELOPMENT AUTHORI",
     "TV",
     "Nurshafiqah",
     0.027
    ],
    [
     "LE TOUR DE LANGKAWI 2026",
     "MAJLIS SUKAN NEGARA MALAYSIA",
     "Radio",
     "Sharifah Kuraisha",
     0.027
    ],
    [
     "RETAIL BANKING OCT'26-JAN'27",
     "BANK SIMPANAN NASIONAL BERHAD",
     "Radio",
     "Nurul Syahirah",
     0.026
    ],
    [
     "CTOS - KREDIT KAU HIJAU 2.0 CAMPAIGN",
     "CTOS DATA SYSTEM SDN BHD",
     "TV",
     "Sharifah Kuraisha",
     0.025
    ],
    [
     "KEMPEN ADVOKASI @KRT PRISMANITA DAN PROGRAM SANT",
     "JABATAN PEMBANGUNAN WANITA",
     "Radio",
     "Nurshafiqah",
     0.022
    ],
    [
     "Talk To My Manager S2",
     "ESKAYVIE SDN BHD",
     "Digital",
     "Nurul Huda",
     0.022
    ],
    [
     "SME25 PEN ERA 312",
     "PTTI GROUP SDN BHD",
     "Radio",
     "Reezal",
     0.021
    ],
    [
     "SME25 PEN SINAR 600",
     "FAIZA MARKETING SDN BHD",
     "Radio",
     "Arif",
     0.02
    ],
    [
     "KEMPEN INTERNET SELAMAT AND NATIONAL DIGITAL INI",
     "SURUHANJAYA KOMUNIKASI DAN MULTIMEDIA MA",
     "Digital",
     "Monica",
     0.02
    ],
    [
     "TOUR-OCTOBER 2026",
     "IRKAZ TRAVEL & TOURS SDN BHD",
     "Radio",
     "Nurul Syahirah",
     0.02
    ],
    [
     "SME25 PEN SINAR 75",
     "ELLA FURNITURE SDN BHD",
     "Radio",
     "Reezal",
     0.02
    ],
    [
     "PUNGUTAN ZAKAT BERKALA - SEPT-NOV'26 (ERA CENTRA",
     "HARTA SUCI S/B",
     "Radio",
     "Ungku Asif",
     0.019
    ],
    [
     "RMK13",
     "KEMENTERIAN EKONOMI",
     "Digital",
     "Nadia Rosli",
     0.019
    ],
    [
     "TALK TO MY MANAGER S2",
     "ESKAYVIE SDN BHD",
     "AA",
     "Nurul Huda",
     0.018
    ],
    [
     "PUNGUTAN ZAKAT BERKALA - SEPT-NOV'26 ( ROS XTRA)",
     "HARTA SUCI S/B",
     "Radio",
     "Ungku Asif",
     0.018
    ],
    [
     "AWARENESS 2026",
     "MRANTI CORPORATION SDN BHD",
     "TV",
     "Nadia Rosli",
     0.017
    ],
    [
     "SME25 PEN SINAR 308",
     "PTTI GROUP SDN BHD",
     "Radio",
     "Reezal",
     0.016
    ],
    [
     "BRAND AWARENESS",
     "KLINIK NUR RAISHA",
     "TV",
     "Nurul Syahirah",
     0.015
    ],
    [
     "AGENDA AWANI",
     "PEJABAT SETIAUSAHA KERAJAAN PAHANG",
     "Digital",
     "Fauzi",
     0.014
    ],
    [
     "JAKEL SOCIAL MEDIA VIDEO POST - ERA",
     "JAKEL TRADING SDN BHD",
     "Digital",
     "Nazihah",
     0.013
    ],
    [
     "URIIS",
     "UNIVERSITI PUTRA MALAYSIA",
     "Digital",
     "Nazihah",
     0.013
    ],
    [
     "KEMPEN KOMUNIKASI RADIO (21/8/26-8/10/26)",
     "KEMENTERIAN PERUMAHAN DAN KERAJAAN TEMPA",
     "Radio",
     "Nurul Huda",
     0.012
    ],
    [
     "MALAYSIA MARATHON 2026",
     "MALAYSIAN MARATHON OFFICIAL SDN BHD",
     "Digital",
     "Nazihah",
     0.012
    ],
    [
     "SEGMENT DOMINATION SINAR REHAT & RELAX 2026",
     "KOPERASI CO-OPBANK PERTAMA MALAYSIA",
     "Radio",
     "Monica",
     0.011
    ],
    [
     "SME26 GEGAR 460",
     "EMAS SRI SEMANTAN SDN BHD",
     "Radio",
     "Fauzi",
     0.011
    ],
    [
     "MALAYSIA INTERNATIONAL CRAFT FAIR 2026",
     "PERBADANAN KEMAJUAN KRAFTANGAN MALAYSIA",
     "Radio",
     "Reezal",
     0.01
    ],
    [
     "SME26 GEGAR 410",
     "TIARA PESONA SDN BHD",
     "Radio",
     "Nazihah",
     0.009
    ],
    [
     "Eskayvie Trio Hauz Tom Tom Bak 2026",
     "ESKAYVIE SDN BHD",
     "Digital",
     "Nurul Huda",
     0.009
    ],
    [
     "BULETIN AWANI",
     "PEJABAT SETIAUSAHA KERAJAAN PAHANG",
     "Digital",
     "Fauzi",
     0.008
    ],
    [
     "KILAUN EMAS SELEBRITI",
     "DICCI GROUP SDN BHD",
     "AA",
     "Fauzi",
     0.008
    ],
    [
     "PAKEJ HUJUNG MINGGU GEGAR & ZAYAN AUG-DEC'26",
     "KOPERASI CO-OPBANK PERTAMA MALAYSIA",
     "Radio",
     "Monica",
     0.007
    ],
    [
     "INVENTORY DEAL 3.0-MOUNT KINABALU EXPEDISI",
     "KUMPULAN WANG SIMPANAN PEKERJA",
     "Radio",
     "Monica",
     0.007
    ],
    [
     "Gastronomy Tourism and Selangor Mega Food festiv",
     "TOURISM SELANGOR SDN BHD",
     "Digital",
     "Nadia Rosli",
     0.007
    ],
    [
     "SME26 REG MIX CE 70",
     "PACIFIC SENIOR LIVING SDN BHD",
     "Radio",
     "Nurul Huda",
     0.007
    ],
    [
     "SME26 GEGAR 100",
     "MENARA NETWORK SDN BHD",
     "Radio",
     "Fauzi",
     0.007
    ],
    [
     "26Q3 APAC RECOVERY DET",
     "DUBAI TOURISM",
     "AA",
     "Arif",
     0.007
    ],
    [
     "SME26 PEN ZAYAN 100",
     "BUMIPUTERA TRAVEL AND TOUR AGENTS ASSOCI",
     "Radio",
     "Ungku Asif",
     0.007
    ],
    [
     "FIESTA RUMAH IMPIAN (24/7/26-27/10/26)",
     "BANK KERJASAMA RAKYAT (M) BHD",
     "Radio",
     "Sharifah Kuraisha",
     0.006
    ],
    [
     "SEGMENT CARTA 40 ERA (Renewal)",
     "FYQA MARKETING",
     "Digital",
     "Fauzi",
     0.006
    ],
    [
     "SME26 EM ERA KK 155",
     "EMAS SRI SEMANTAN SDN BHD",
     "Radio",
     "Fauzi",
     0.006
    ],
    [
     "SEGMENT BRADER BRADE SINAR",
     "SMART PRECISION SDN BHD",
     "Digital",
     "Fauzi",
     0.005
    ],
    [
     "SME26 REG (ERA CE 70) (SINAR CE 70)",
     "AP EVENTS EMPIRE SDN BHD",
     "Radio",
     "Fauzi",
     0.005
    ],
    [
     "GOXUAN Mid-Autumn X Sunway Velocity Mall",
     "advertiser not recorded",
     "Digital",
     "Arif",
     0.005
    ],
    [
     "MAJLIS PENARAFAN QS MBA GLOBAL RANKINGS 2026",
     "UNIVERSITI KEBANGSAAN MALAYSIA",
     "Digital",
     "Nazihah",
     0.005
    ],
    [
     "PENGURUSAN HARTA & PERKHIDMATAN MAIS-MAY-NOV'26",
     "MAJLIS AGAMA ISLAM SELANGOR",
     "Radio",
     "Nadia Rosli",
     0.004
    ],
    [
     "Majlis Perasmian MBOR 2026",
     "PTTI GROUP SDN BHD",
     "Digital",
     "Reezal",
     0.004
    ],
    [
     "Agensi Anti Dadah Kebangasaan Malaysia Borak See",
     "AGENSI ANTIDADAH KEBANGSAAN",
     "Digital",
     "Nurul Syahirah",
     0.004
    ],
    [
     "JAKIM BULAN OKTOBER, BULAN AL-QURAN (5/10/26-9/1",
     "JABATAN KEMAJUAN ISLAM MALAYSIA (JAKIM)",
     "Radio",
     "Nash",
     0.004
    ],
    [
     "VISIT MALAYSIA 2026-2027",
     "LEMBAGA PENGGALAKAN PELANCONGAN MALAYSIA",
     "AA",
     "Reezal",
     0.003
    ],
    [
     "BANK FACILITIES - SEPT-OCT'26 (ROS XTRA)",
     "KOPERASI CO-OPBANK PERTAMA MALAYSIA",
     "Radio",
     "Monica",
     0.002
    ],
    [
     "SEGMENT SPONSORSHIP SINAR REHAT & RELAX",
     "KOPERASI CO-OPBANK PERTAMA MALAYSIA",
     "Digital",
     "Monica",
     0.002
    ],
    [
     "SME26 PEN SINAR 100",
     "ADABI CONSUMER INDUSTRIES SDN BHD",
     "Radio",
     "Nurul Huda",
     0.002
    ],
    [
     "WAKTU SOLAT SINAR (RAYA HAJI)",
     "KOPERASI CO-OPBANK PERTAMA MALAYSIA",
     "Digital",
     "Monica",
     0.002
    ],
    [
     "CADENZA OF THE SOUL_NOH SALLEH WITH AUBREY SUWIT",
     "ALTUS PROHOUSE SDN BHD",
     "Radio",
     "Nazihah",
     0.002
    ],
    [
     "ZAYAN PAGI SEGMENT SPONSORSHIP - OCT2025 - SEPT2",
     "IN SAFF TRAVEL & TOURS SDN BHD",
     "Radio",
     "Nazihah",
     0.002
    ],
    [
     "PROMOTION TOM TOM BAK (28/10/26-3/11/26)",
     "ESKAYVIE SDN BHD",
     "Radio",
     "Nurul Huda",
     0.002
    ],
    [
     "Kempen Komunikasi Radio 2026",
     "KEMENTERIAN PERUMAHAN DAN KERAJAAN TEMPA",
     "Digital",
     "Nurul Huda",
     0.002
    ],
    [
     "HartaSuci Sdn Bhd Media Buy 2026",
     "HARTA SUCI S/B",
     "Digital",
     "Ungku Asif",
     0.001
    ],
    [
     "BPG KUANTAN 188 & CFE SITI KHADIJAH - EAST COAST",
     "SITI KHADIJAH APPAREL SDN BHD",
     "Digital",
     "Monica",
     0.001
    ],
    [
     "IN SAFF TRAVEL & TOURS ON ZAYAN PAGI SEGMENT SPO",
     "IN SAFF TRAVEL & TOURS SDN BHD",
     "Digital",
     "Nazihah",
     0.001
    ],
    [
     "JAKIM - BULAN OKTOBER, BULAN AL-QURAN",
     "JABATAN KEMAJUAN ISLAM MALAYSIA (JAKIM)",
     "Digital",
     "Nash",
     0.001
    ],
    [
     "International Greentech & Eco Products Exhibitio",
     "LEMB.PEMBANGUNAN PELABURAN MALAYSIA",
     "Digital",
     "Nurshafiqah",
     0.001
    ],
    [
     "CARTA ERA 40",
     "FYQA MARKETING",
     "Digital",
     "Fauzi",
     0.001
    ],
    [
     "ZAYAN PAGI SPONSORSHIP WITH IN SAFF TRAVEL & TOU",
     "IN SAFF TRAVEL & TOURS SDN BHD",
     "Digital",
     "Nazihah",
     0.001
    ],
    [
     "INTERNATIONAL GREENTECH & ECO PRODUCTS EXHIBITIO",
     "MALAYSIAN INVESTMENT DEVELOPMENT AUTHORI",
     "Radio",
     "Nurshafiqah",
     0.001
    ],
    [
     "SME26 PEN ERA 100",
     "ADABI CONSUMER INDUSTRIES SDN BHD",
     "Radio",
     "Nurul Huda",
     0.0
    ]
   ]
  },
  "edison": {
   "rows": [
    {
     "id": "Rizal",
     "n": "Rizal",
     "full": "MOHD SAHIMY, Mohd Rizal",
     "kind": "exec",
     "mgr": null,
     "cells": [
      [
       6,
       8,
       0.74
      ],
      [
       6,
       10,
       0.761
      ],
      [
       4,
       4,
       0.831
      ],
      [
       0,
       1,
       0.735
      ]
     ],
     "f": 0.123,
     "g": -2.9
    },
    {
     "id": "Subra",
     "n": "Subra",
     "full": "SUBRA",
     "kind": "exec",
     "mgr": null,
     "cells": [
      [
       0,
       0,
       0.74
      ],
      [
       0,
       0,
       0.761
      ],
      [
       0,
       0,
       0.831
      ],
      [
       0,
       0,
       0.735
      ]
     ],
     "f": 0.0,
     "g": -3.1
    },
    {
     "id": "Wan Syahrul",
     "n": "Wan Syahrul",
     "full": "WAN MANSOR, Wan Syahrul Amry",
     "kind": "exec",
     "mgr": null,
     "cells": [
      [
       1,
       3,
       0.74
      ],
      [
       0,
       1,
       0.761
      ],
      [
       0,
       1,
       0.831
      ],
      [
       0,
       1,
       0.735
      ]
     ],
     "f": 0.009,
     "g": -3.1
    },
    {
     "id": "Zack",
     "n": "Zack",
     "full": "LIM, Chien Shiung [Zack]",
     "kind": "exec",
     "mgr": null,
     "cells": [
      [
       105,
       109,
       0.5
      ],
      [
       14,
       17,
       0.5
      ],
      [
       5,
       6,
       0.5
      ],
      [
       4,
       5,
       0.4
      ]
     ],
     "f": 0.639,
     "g": -1.3
    },
    {
     "id": "Kavinraj",
     "n": "Kavinraj",
     "full": "VIJAYARAJ, Kavinraj",
     "kind": "exec",
     "mgr": null,
     "cells": [
      [
       0,
       8,
       0.4
      ],
      [
       0,
       0,
       0.5
      ],
      [
       0,
       64,
       0.5
      ],
      [
       0,
       0,
       0.5
      ]
     ],
     "f": 0.0,
     "g": -1.9
    }
   ],
   "total": {
    "cells": [
     [
      19,
      21,
      3.1
     ],
     [
      4,
      5,
      3.3
     ],
     [
      2,
      11,
      3.5
     ],
     [
      0,
      1,
      3.1
     ]
    ],
    "f": 0.771,
    "g": -12.2
   },
   "open": [
    [
     "QL POULTRY FARMS SDN. BHD.",
     "QL POULTRY FARMS SDN. BHD.",
     "Digital",
     "80%",
     "Zack",
     {
      "Oct": 0.083,
      "Nov": 0.04,
      "Dec": 0.008
     }
    ],
    [
     "Pending MO signing",
     "Syarikat Jaminan Pembiayaan Perniagaan",
     "Radio",
     "80%",
     "Rizal",
     {
      "Oct": 0.03,
      "Nov": 0.061
     }
    ],
    [
     "AICB RASA, RUANG & INSPIRASI",
     "STF RESOURCES SDN. BHD.",
     "Radio",
     "80%",
     "Zack",
     {
      "Oct": 0.008,
      "Jan": 0.015
     }
    ],
    [
     "SEDUNIA TTC X MIX MIND YOUR BUSINESS (14-19 OCT",
     "SEDUNIA …",
     "Radio",
     "80%",
     "Zack",
     {
      "Oct": 0.007,
      "Nov": 0.007
     }
    ],
    [
     "K.M OLI MOHAMED YEAR END SALE 2026",
     "K.M. OLI MOHAMED (M) SD…",
     "Radio",
     "80%",
     "Zack",
     {
      "Dec": 0.013
     }
    ],
    [
     "BOBOIBOY MALAYSIA'S FIRST TICKETED LIVE SHOW (9",
     "ONE UNI…",
     "Radio",
     "80%",
     "Zack",
     {
      "Nov": 0.01
     }
    ],
    [
     "HOSPITAL PICASO X MOVEMBER (29 OCT -5 NOV 2026)",
     "INTEGRA…",
     "Radio",
     "80%",
     "Zack",
     {
      "Nov": 0.009
     }
    ],
    [
     "AS IF SHE WERE HERE: CHEN JIA SINGS TERESA TENG",
     "MALAYSIA…",
     "Radio",
     "80%",
     "Zack",
     {
      "Oct": 0.004
     }
    ],
    [
     "MPO_A CHORALE SPECTACULAR",
     "MALAYSIAN PHILHARMONIC ORCHESTRA",
     "Radio",
     "80%",
     "Zack",
     {
      "Nov": 0.004
     }
    ]
   ],
   "bank": [
    [
     "QL EGGS JUARAI PAGIMU - QL EGGS FM",
     "advertiser not recorded",
     "Radio",
     "Booked",
     "Zack",
     [
      0.334,
      0.01,
      0.009,
      null
     ],
     0.353
    ],
    [
     "Qalam Management",
     "Qalam Management",
     "Radio",
     "Won",
     "Rizal",
     [
      0.02,
      null,
      0.03,
      null
     ],
     0.05
    ],
    [
     "JOM MALAYSIA BERSAMA LAZADA ERA TANYA PRO (28 SE",
     "ECART…",
     "Radio",
     "Booked",
     "Zack",
     [
      0.02,
      null,
      null,
      null
     ],
     0.02
    ],
    [
     "AEON CO. x ASTRO: Barter Collaboration for Astro",
     "AEON CO. (M) BHD",
     "Radio",
     "Booked",
     "Zack",
     [
      0.018,
      null,
      null,
      null
     ],
     0.018
    ],
    [
     "YE LIVE TOUR LIVE IN JAKARTA 2026 (10/10/26-16/1",
     "TBA SOLUTIONS",
     "Radio",
     "Booked",
     "Zack",
     [
      0.016,
      null,
      null,
      null
     ],
     0.016
    ],
    [
     "HOSPITAL PICASO X SINAR KONGSI (8-14 OCT 2026)",
     "INTEGRATED …",
     "Radio",
     "Booked",
     "Zack",
     [
      0.012,
      null,
      null,
      null
     ],
     0.012
    ],
    [
     "BIG BANG CONCERT 2026",
     "IME PRODUCTIONS (M) SDN BHD",
     "Radio",
     "Booked",
     "Zack",
     [
      0.011,
      null,
      null,
      null
     ],
     0.011
    ],
    [
     "RE:WIND x CLUB ROOTS (26 OCT - 14 NOV 2026)",
     "LIVE ACTS & EVEN…",
     "Radio",
     "Booked",
     "Zack",
     [
      0.002,
      0.006,
      null,
      null
     ],
     0.008
    ],
    [
     "REDBOX X MY BIG SHOW (7 SEPT - 26 OCT 2026)",
     "9R LEISURE SDN …",
     "Radio",
     "Booked",
     "Zack",
     [
      0.008,
      null,
      null,
      null
     ],
     0.008
    ],
    [
     "SME25 GEGAR 700",
     "NAJEEHAH INTERNATIONAL SDN BHD",
     "Radio",
     "Booked",
     "Wan Syahrul",
     [
      0.007,
      null,
      null,
      null
     ],
     0.007
    ],
    [
     "AICB RASA, RUANG & INSPIRASI",
     "STF RESOURCES SDN BHD",
     "TV",
     "Booked",
     "Zack",
     [
      0.003,
      null,
      null,
      0.003
     ],
     0.005
    ],
    [
     "BEATS OF BORNEO: ALENA MURANG WITH THE MPO",
     "MALAYSIAN P…",
     "Radio",
     "Booked",
     "Zack",
     [
      0.005,
      null,
      null,
      null
     ],
     0.005
    ],
    [
     "A REGAL EVENING WITH STEPHEN HOUGH (5-18 OCT 202",
     "MALAY…",
     "Radio",
     "Booked",
     "Zack",
     [
      0.004,
      null,
      null,
      null
     ],
     0.004
    ],
    [
     "HOSPITAL PICASO X PINK OCT (2-8 OCT 2026)",
     "INTEGRATED ONCOL…",
     "Radio",
     "Booked",
     "Zack",
     [
      0.004,
      null,
      null,
      null
     ],
     0.004
    ],
    [
     "AEON CO X MID AUTUMN 2026",
     "AEON CO. (M) BHD",
     "Digital",
     "Booked",
     "Zack",
     [
      0.003,
      null,
      null,
      null
     ],
     0.003
    ]
   ],
   "bankOct": [
    [
     "QL EGGS JUARAI PAGIMU - QL EGGS FM",
     "advertiser not recorded",
     "Radio",
     "Booked",
     "Zack",
     0.334
    ],
    [
     "JOM MALAYSIA BERSAMA LAZADA ERA TANYA PRO (28 SE",
     "ECART SERVICES MALAYSIA SDN BHD",
     "Radio",
     "Booked",
     "Zack",
     0.02
    ],
    [
     "Qalam Management",
     "Qalam Management",
     "Radio",
     "Won",
     "Rizal",
     0.02
    ],
    [
     "AEON CO. x ASTRO: Barter Collaboration for Astro",
     "AEON CO. (M) BHD",
     "Radio",
     "Booked",
     "Zack",
     0.018
    ],
    [
     "YE LIVE TOUR LIVE IN JAKARTA 2026 (10/10/26-16/1",
     "TBA SOLUTIONS",
     "Radio",
     "Booked",
     "Zack",
     0.016
    ],
    [
     "HOSPITAL PICASO X SINAR KONGSI (8-14 OCT 2026)",
     "INTEGRATED ONCOLOGY CENTER (KUALA LUMPUR",
     "Radio",
     "Booked",
     "Zack",
     0.012
    ],
    [
     "BIG BANG CONCERT 2026",
     "IME PRODUCTIONS (M) SDN BHD",
     "Radio",
     "Booked",
     "Zack",
     0.011
    ],
    [
     "REDBOX X MY BIG SHOW (7 SEPT - 26 OCT 2026)",
     "9R LEISURE SDN BHD",
     "Radio",
     "Booked",
     "Zack",
     0.008
    ],
    [
     "SME25 GEGAR 700",
     "NAJEEHAH INTERNATIONAL SDN BHD",
     "Radio",
     "Booked",
     "Wan Syahrul",
     0.007
    ],
    [
     "BEATS OF BORNEO: ALENA MURANG WITH THE MPO",
     "MALAYSIAN PHILHARMONIC ORCHESTRA",
     "Radio",
     "Booked",
     "Zack",
     0.005
    ],
    [
     "A REGAL EVENING WITH STEPHEN HOUGH (5-18 OCT 202",
     "MALAYSIAN PHILHARMONIC ORCHESTRA",
     "Radio",
     "Booked",
     "Zack",
     0.004
    ],
    [
     "HOSPITAL PICASO X PINK OCT (2-8 OCT 2026)",
     "INTEGRATED ONCOLOGY CENTER (KUALA LUMPUR",
     "Radio",
     "Booked",
     "Zack",
     0.004
    ],
    [
     "AICB RASA, RUANG & INSPIRASI",
     "STF RESOURCES SDN BHD",
     "TV",
     "Booked",
     "Zack",
     0.003
    ],
    [
     "AEON CO X MID AUTUMN 2026",
     "AEON CO. (M) BHD",
     "Digital",
     "Booked",
     "Zack",
     0.003
    ],
    [
     "MELODY HEALTHY THURSDAY - Pink Oct",
     "INTEGRATED ONCOLOGY CENTER (KUALA LUMPUR",
     "Digital",
     "Booked",
     "Zack",
     0.003
    ]
   ],
   "bookings": [
    [
     "QL EGGS JUARAI PAGIMU - QL EGGS FM",
     "advertiser not recorded",
     "Radio",
     "Zack",
     0.334
    ],
    [
     "JOM MALAYSIA BERSAMA LAZADA ERA TANYA PRO (28 SE",
     "ECART SERVICES MALAYSIA SDN BHD",
     "Radio",
     "Zack",
     0.02
    ],
    [
     "AEON CO. x ASTRO: Barter Collaboration for Astro",
     "AEON CO. (M) BHD",
     "Radio",
     "Zack",
     0.018
    ],
    [
     "YE LIVE TOUR LIVE IN JAKARTA 2026 (10/10/26-16/1",
     "TBA SOLUTIONS",
     "Radio",
     "Zack",
     0.016
    ],
    [
     "HOSPITAL PICASO X SINAR KONGSI (8-14 OCT 2026)",
     "INTEGRATED ONCOLOGY CENTER (KUALA LUMPUR",
     "Radio",
     "Zack",
     0.012
    ],
    [
     "BIG BANG CONCERT 2026",
     "IME PRODUCTIONS (M) SDN BHD",
     "Radio",
     "Zack",
     0.011
    ],
    [
     "REDBOX X MY BIG SHOW (7 SEPT - 26 OCT 2026)",
     "9R LEISURE SDN BHD",
     "Radio",
     "Zack",
     0.008
    ],
    [
     "SME25 GEGAR 700",
     "NAJEEHAH INTERNATIONAL SDN BHD",
     "Radio",
     "Wan Syahrul",
     0.007
    ],
    [
     "BEATS OF BORNEO: ALENA MURANG WITH THE MPO",
     "MALAYSIAN PHILHARMONIC ORCHESTRA",
     "Radio",
     "Zack",
     0.005
    ],
    [
     "A REGAL EVENING WITH STEPHEN HOUGH (5-18 OCT 202",
     "MALAYSIAN PHILHARMONIC ORCHESTRA",
     "Radio",
     "Zack",
     0.004
    ],
    [
     "HOSPITAL PICASO X PINK OCT (2-8 OCT 2026)",
     "INTEGRATED ONCOLOGY CENTER (KUALA LUMPUR",
     "Radio",
     "Zack",
     0.004
    ],
    [
     "AICB RASA, RUANG & INSPIRASI",
     "STF RESOURCES SDN BHD",
     "TV",
     "Zack",
     0.003
    ],
    [
     "AEON CO X MID AUTUMN 2026",
     "AEON CO. (M) BHD",
     "Digital",
     "Zack",
     0.003
    ],
    [
     "MELODY HEALTHY THURSDAY - Pink Oct",
     "INTEGRATED ONCOLOGY CENTER (KUALA LUMPUR",
     "Digital",
     "Zack",
     0.003
    ],
    [
     "RE:WIND x CLUB ROOTS (26 OCT - 14 NOV 2026)",
     "LIVE ACTS & EVENTS PLT",
     "Radio",
     "Zack",
     0.002
    ],
    [
     "GEGAR ROS XTRA",
     "MH MOHD INDUSTRRIES S/B",
     "Radio",
     "Wan Syahrul",
     0.002
    ],
    [
     "ECART X JOM MALAYSIA BERSAMA MALAYSIA (SEPT 2026",
     "ECART SERVICES MALAYSIA SDN BHD",
     "Digital",
     "Zack",
     0.001
    ],
    [
     "THREE BY THREE (21 SEPT - 2 OCT 2026)",
     "MALAYSIAN PHILHARMONIC ORCHESTRA",
     "Radio",
     "Zack",
     0.001
    ],
    [
     "QL Eggs FM x WORLD EGGS DAY",
     "advertiser not recorded",
     "Digital",
     "Zack",
     0.0
    ],
    [
     "MY FM BIG SHOW x REDBOX Karaoke - \"Sing Your Way",
     "9R LEISURE SDN BHD",
     "Digital",
     "Zack",
     -0.001
    ]
   ]
  },
  "yuen": {
   "rows": [
    {
     "id": "Mandy",
     "n": "Mandy",
     "full": "SEAH, Mandy",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       66,
       71,
       2.5
      ],
      [
       24,
       35,
       2.6
      ],
      [
       19,
       24,
       2.8
      ],
      [
       23,
       29,
       2.5
      ]
     ],
     "f": 3.4,
     "g": -7.0
    },
    {
     "id": "Siti Sarah",
     "n": "Siti Sarah",
     "full": "RUSLI, Siti Sarah",
     "kind": "exec",
     "mgr": "Mandy",
     "cells": [
      [
       99,
       100,
       0.608
      ],
      [
       9,
       17,
       0.692
      ],
      [
       20,
       25,
       0.76
      ],
      [
       68,
       84,
       0.62
      ]
     ],
     "f": 1.2,
     "g": -1.4
    },
    {
     "id": "Rae Zalani",
     "n": "Rae Zalani",
     "full": "Rae Zalani",
     "kind": "exec",
     "mgr": "Mandy",
     "cells": [
      [
       34,
       39,
       0.686
      ],
      [
       29,
       31,
       0.642
      ],
      [
       19,
       31,
       0.63
      ],
      [
       1,
       4,
       0.67
      ]
     ],
     "f": 0.546,
     "g": -2.1
    },
    {
     "id": "Jing Yan",
     "n": "Jing Yan",
     "full": "WONG, Jing Yan",
     "kind": "exec",
     "mgr": "Mandy",
     "cells": [
      [
       70,
       70,
       0.63
      ],
      [
       12,
       12,
       0.68
      ],
      [
       14,
       14,
       0.7
      ],
      [
       0,
       0,
       0.6
      ]
     ],
     "f": 0.622,
     "g": -2.0
    },
    {
     "id": "Joanne Chen",
     "n": "Joanne Chen",
     "full": "CHEN, Xin Yan",
     "kind": "exec",
     "mgr": "Mandy",
     "cells": [
      [
       67,
       79,
       0.561
      ],
      [
       49,
       87,
       0.58
      ],
      [
       22,
       27,
       0.736
      ],
      [
       24,
       30,
       0.618
      ]
     ],
     "f": 0.964,
     "g": -1.5,
     "assumed": "CHEN, Xin Yan is read as Joanne Chen on the chart"
    },
    {
     "id": "Stanley",
     "n": "Stanley",
     "full": "CHONG, Keng Fui [Stanley]",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       37,
       70,
       2.4
      ],
      [
       36,
       70,
       2.6
      ],
      [
       37,
       158,
       2.7
      ],
      [
       8,
       29,
       2.4
      ]
     ],
     "f": 3.0,
     "g": -7.1
    },
    {
     "id": "Vernon",
     "n": "Vernon",
     "full": "ONG, Vernon",
     "kind": "exec",
     "mgr": "Stanley",
     "cells": [
      [
       51,
       64,
       1.2
      ],
      [
       46,
       60,
       1.4
      ],
      [
       33,
       33,
       1.3
      ],
      [
       14,
       14,
       1.3
      ]
     ],
     "f": 1.8,
     "g": -3.3
    },
    {
     "id": "Azuin",
     "n": "Azuin",
     "full": "AB RAHMAN, Nor Azuin",
     "kind": "exec",
     "mgr": "Stanley",
     "cells": [
      [
       9,
       39,
       0.66
      ],
      [
       3,
       8,
       0.673
      ],
      [
       46,
       127,
       0.695
      ],
      [
       0,
       0,
       0.55
      ]
     ],
     "f": 0.39,
     "g": -2.2
    },
    {
     "id": "Daniel",
     "n": "Daniel",
     "full": "THOMAS RAYMOND, Daniel Ravin",
     "kind": "exec",
     "mgr": "Stanley",
     "cells": [
      [
       40,
       119,
       0.581
      ],
      [
       51,
       169,
       0.56
      ],
      [
       35,
       435,
       0.67
      ],
      [
       0,
       92,
       0.54
      ]
     ],
     "f": 0.754,
     "g": -1.6
    }
   ],
   "total": {
    "cells": [
     [
      52,
      70,
      4.9
     ],
     [
      30,
      52,
      5.2
     ],
     [
      28,
      89,
      5.5
     ],
     [
      16,
      29,
      4.9
     ]
    ],
    "f": 6.4,
    "g": -14.1
   },
   "open": [
    [
     "JASMINE FOOD - BASS WEDDING",
     "SPECIALISED MEDIA ADS SDN BHD (a…",
     "Digital + Radio +…",
     "80%",
     "Siti Sarah",
     {
      "Jan": 0.523
     }
    ],
    [
     "Radio Sponsorship_Amaron",
     "Tecxus Marketing Sdn. Bhd. (Amaron Malay",
     "Radio",
     "80%",
     "Azuin",
     {
      "Dec": 0.374
     }
    ],
    [
     "BYD TikTok Series",
     "IPG MEDIABRANDS SDN BHD (agency)",
     "Digital",
     "50%",
     "Daniel",
     {
      "Nov": 0.336
     }
    ],
    [
     "Wipro Unza x Alpha Ambassadorship",
     "WIPRO UNZA (MALAYSIA) SDN BHD",
     "Digital",
     "80%",
     "Joanne Chen",
     {
      "Nov": 0.221
     }
    ],
    [
     "FISHERMAN'S FRIEND - ERA TIKTOK SERIES",
     "OMNICOM MEDIA GROU…",
     "Radio",
     "80%",
     "Vernon",
     {
      "Nov": 0.208
     }
    ],
    [
     "KFC x Home of Kids",
     "DENTSU HOLDINGS MALAYSIA SDN BHD (agency",
     "Digital",
     "80%",
     "Siti Sarah",
     {
      "Dec": 0.192
     }
    ],
    [
     "Bio-Essence x CNY 2027",
     "WIPRO UNZA (MALAYSIA) SDN BHD",
     "Digital",
     "80%",
     "Joanne Chen",
     {
      "Jan": 0.182
     }
    ],
    [
     "ROS XTRA - AIA BHD",
     "AIA BHD",
     "Radio",
     "50%",
     "Azuin",
     {
      "Oct": 0.166
     }
    ],
    [
     "GV - Pesta Vaganza + Radio",
     "INNOCEAN ENTREPRISE (agency)",
     "Radio + TV",
     "50%",
     "Daniel",
     {
      "Oct": 0.105,
      "Dec": 0.056
     }
    ],
    [
     "SMEVaganza26 - CGC",
     "CD ADVERTISING SDN BHD (agency)",
     "Digital",
     "80%",
     "Daniel",
     {
      "Dec": 0.132
     }
    ],
    [
     "[Booking In] Poh Kong Year End Campaign",
     "POH KONG JEWELLERS S…",
     "Digital + Radio",
     "80%",
     "Joanne Chen",
     {
      "Dec": 0.125
     }
    ],
    [
     "U MOBILE - LIVE STREAM IOI",
     "Ipg Orion Sdn Bhd (agency)",
     "Digital",
     "80%",
     "Vernon",
     {
      "Nov": 0.096
     }
    ],
    [
     "Emirates TV Spots (Sept to Oct)",
     "EMIRATES (Malaysia)",
     "TV",
     "80%",
     "Rae Zalani",
     {
      "Oct": 0.094
     }
    ],
    [
     "[Booking In] HK Tourism x Travel Anak Beranak",
     "HKMEDIA INTERNA…",
     "Digital + TV",
     "80%",
     "Joanne Chen",
     {
      "Dec": 0.077
     }
    ],
    [
     "[Booking In] Ebene Radio Campaign",
     "WIPRO UNZA (MALAYSIA) SDN BHD",
     "Digital + Radio",
     "80%",
     "Joanne Chen",
     {
      "Oct": 0.07
     }
    ],
    [
     "DP PROVITON - MIX HEALTH CHECK & COMMERCIAL 2026",
     "DUOP…",
     "Radio",
     "80%",
     "Vernon",
     {
      "Oct": 0.052
     }
    ],
    [
     "Malindo Syndey Route",
     "MALINDO AIRWAYS SDN BHD",
     "Radio",
     "50%",
     "Joanne Chen",
     {
      "Oct": 0.021,
      "Nov": 0.021
     }
    ],
    [
     "[Fandom] Audio Impact 360",
     "FOCUS POINT VISION CARE GROUP SDN BHD",
     "Radio",
     "50%",
     "Joanne Chen",
     {
      "Oct": 0.033
     }
    ],
    [
     "Teik Senn x APH 2026 (BM)",
     "TEIK SENN (M) SDN BHD",
     "TV",
     "50%",
     "Rae Zalani",
     {
      "Oct": 0.013,
      "Nov": 0.008,
      "Dec": 0.008
     }
    ],
    [
     "Etiqa Insurance Advertorials (Oct)",
     "ETIQA LIFE INSURANCE BERHAD",
     "Digital",
     "80%",
     "Rae Zalani",
     {
      "Oct": 0.029
     }
    ],
    [
     "Video 360+_redONE Mobile",
     "RED ONE NETWORK SDN BHD",
     "Digital",
     "50%",
     "Azuin",
     {
      "Oct": 0.029
     }
    ],
    [
     "FANDOM TVC SPOT BUY - CHUAN SIN",
     "CHUAN SIN SDN BHD",
     "TV",
     "80%",
     "Azuin",
     {
      "Oct": 0.023
     }
    ],
    [
     "Sarong Run - Himalaya",
     "SPECIALISED MEDIA ADS SDN BHD (agency)",
     "Radio",
     "80%",
     "Siti Sarah",
     {
      "Oct": 0.013
     }
    ],
    [
     "LOTUS'S - DEEPAVALI COMMERCIAL BUY",
     "OMNICOM MEDIA GROUP (M…",
     "Radio",
     "80%",
     "Vernon",
     {
      "Oct": 0.006,
      "Nov": 0.006
     }
    ]
   ],
   "bank": [
    [
     "ASTRO RADIO SPONSORSHIP 2026",
     "U MOBILE SERVICES SDN BHD",
     "Radio",
     "Booked",
     "Vernon",
     [
      0.324,
      0.313,
      0.335,
      0.093
     ],
     1.1
    ],
    [
     "RIDSECT RADIO-OCT'26-NOV'26 (PRIME TIME COMBO)",
     "SC JOHNSO…",
     "Radio",
     "Booked",
     "Joanne Chen",
     [
      0.195,
      0.084,
      null,
      null
     ],
     0.278
    ],
    [
     "SUNWHITE RICE",
     "JASMINE FOOD CORPORATION SDN BHD",
     "TV",
     "Booked",
     "Siti Sarah",
     [
      0.222,
      0.039,
      null,
      null
     ],
     0.26
    ],
    [
     "OMNET DEAL-MARIGOLD HL ADVANCE SARCOPENIA (PRIME",
     "COT…",
     "Radio",
     "Booked",
     "Jing Yan",
     [
      0.252,
      null,
      null,
      null
     ],
     0.252
    ],
    [
     "SME26 NAT MY 1700",
     "SENHENG ELECTRIC (KL) SDN BHD",
     "Radio",
     "Booked",
     "Rae Zalani",
     [
      0.081,
      0.075,
      0.077,
      null
     ],
     0.233
    ],
    [
     "POSTPAID & PREPAID - UMOBILE BWF TAKEOVER 2026",
     "U MOBILE …",
     "TV",
     "Booked",
     "Vernon",
     [
      0.04,
      0.04,
      0.051,
      0.05
     ],
     0.182
    ],
    [
     "ORION DEAL-BWF BADMINTON TAKEOVER 2026",
     "U MOBILE SERVICE…",
     "Radio",
     "Booked",
     "Vernon",
     [
      0.06,
      0.026,
      0.043,
      0.043
     ],
     0.172
    ],
    [
     "SMEVaganza - UNIKL",
     "CD ADVERTISING SDN BHD (agency)",
     "Digital",
     "Won",
     "Daniel",
     [
      0.046,
      0.044,
      0.046,
      null
     ],
     0.137
    ],
    [
     "ORION DEAL-FA26 NAT ERA 200",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Booked",
     "Daniel",
     [
      0.047,
      0.054,
      0.021,
      null
     ],
     0.122
    ],
    [
     "ORION DEAL-FA26 NAT MY 200",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Booked",
     "Daniel",
     [
      0.045,
      0.052,
      0.02,
      null
     ],
     0.117
    ],
    [
     "DENTSU DEAL-DENTSU X KFC VALUE DV CAMPAIGN (SPO",
     "QSR ST…",
     "Radio",
     "Booked",
     "Siti Sarah",
     [
      0.111,
      null,
      null,
      null
     ],
     0.111
    ],
    [
     "DENTSU DEAL-DENTSU X KFC VALUE DV CAMPAIGN (18/",
     "QSR STO…",
     "Radio",
     "Booked",
     "Siti Sarah",
     [
      0.088,
      null,
      null,
      null
     ],
     0.088
    ],
    [
     "ORION DEAL-FA26 NAT HITZ 200",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Booked",
     "Daniel",
     [
      0.031,
      0.036,
      0.014,
      null
     ],
     0.08
    ],
    [
     "Moomoo 30s AA (Aug-Nov)",
     "MOOMOO SECURITIES MALAYSIA SDN BHD",
     "Digital",
     "Won",
     "Rae Zalani",
     [
      0.038,
      0.038,
      null,
      null
     ],
     0.077
    ],
    [
     "OMNET DEAL -CARE FOR WHAT MATTERS 3.0 -OCT'26-NO",
     "ZURIC…",
     "Radio",
     "Booked",
     "Jing Yan",
     [
      0.046,
      0.022,
      null,
      null
     ],
     0.068
    ]
   ],
   "bankOct": [
    [
     "ASTRO RADIO SPONSORSHIP 2026",
     "U MOBILE SERVICES SDN BHD",
     "Radio",
     "Booked",
     "Vernon",
     0.324
    ],
    [
     "OMNET DEAL-MARIGOLD HL ADVANCE SARCOPENIA (PRIME",
     "COTRA ENTERPRISE SDN BHD",
     "Radio",
     "Booked",
     "Jing Yan",
     0.252
    ],
    [
     "SUNWHITE RICE",
     "JASMINE FOOD CORPORATION SDN BHD",
     "TV",
     "Booked",
     "Siti Sarah",
     0.222
    ],
    [
     "RIDSECT RADIO-OCT'26-NOV'26 (PRIME TIME COMBO)",
     "SC JOHNSON & SON (M) SDN BHD",
     "Radio",
     "Booked",
     "Joanne Chen",
     0.195
    ],
    [
     "DENTSU DEAL-DENTSU X KFC VALUE DV CAMPAIGN (SPO",
     "QSR STORES SDN BHD",
     "Radio",
     "Booked",
     "Siti Sarah",
     0.111
    ],
    [
     "DENTSU DEAL-DENTSU X KFC VALUE DV CAMPAIGN (18/",
     "QSR STORES SDN BHD",
     "Radio",
     "Booked",
     "Siti Sarah",
     0.088
    ],
    [
     "SME26 NAT MY 1700",
     "SENHENG ELECTRIC (KL) SDN BHD",
     "Radio",
     "Booked",
     "Rae Zalani",
     0.081
    ],
    [
     "FA26 NAT ERA 600",
     "DUOPHARMA DISTRIBUTION SDN BHD",
     "Radio",
     "Booked",
     "Vernon",
     0.062
    ],
    [
     "ORION DEAL-BWF BADMINTON TAKEOVER 2026",
     "U MOBILE SERVICES SDN BHD",
     "Radio",
     "Booked",
     "Vernon",
     0.06
    ],
    [
     "DENTSU DEAL-DENTSU X-QSR VALUE FOMO-OCT'26",
     "QSR STORES SDN BHD",
     "Radio",
     "Booked",
     "Siti Sarah",
     0.053
    ],
    [
     "ORION DEAL-FA26 NAT ERA 200",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Booked",
     "Daniel",
     0.047
    ],
    [
     "[Booking In] Rozel x National Budget Announcemen",
     "ROZEL CORPORATION SDN BHD",
     "Digital",
     "Won",
     "Joanne Chen",
     0.047
    ],
    [
     "SMEVaganza - UNIKL",
     "CD ADVERTISING SDN BHD (agency)",
     "Digital",
     "Won",
     "Daniel",
     0.046
    ],
    [
     "OMNET DEAL -CARE FOR WHAT MATTERS 3.0 -OCT'26-NO",
     "ZURICH INSURANCE COMPANY LTD",
     "Radio",
     "Booked",
     "Jing Yan",
     0.046
    ],
    [
     "ORION DEAL-FA26 NAT MY 200",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Booked",
     "Daniel",
     0.045
    ]
   ],
   "bookings": [
    [
     "ASTRO RADIO SPONSORSHIP 2026",
     "U MOBILE SERVICES SDN BHD",
     "Radio",
     "Vernon",
     0.324
    ],
    [
     "OMNET DEAL-MARIGOLD HL ADVANCE SARCOPENIA (PRIME",
     "COTRA ENTERPRISE SDN BHD",
     "Radio",
     "Jing Yan",
     0.252
    ],
    [
     "SUNWHITE RICE",
     "JASMINE FOOD CORPORATION SDN BHD",
     "TV",
     "Siti Sarah",
     0.222
    ],
    [
     "RIDSECT RADIO-OCT'26-NOV'26 (PRIME TIME COMBO)",
     "SC JOHNSON & SON (M) SDN BHD",
     "Radio",
     "Joanne Chen",
     0.195
    ],
    [
     "DENTSU DEAL-DENTSU X KFC VALUE DV CAMPAIGN (SPO",
     "QSR STORES SDN BHD",
     "Radio",
     "Siti Sarah",
     0.111
    ],
    [
     "DENTSU DEAL-DENTSU X KFC VALUE DV CAMPAIGN (18/",
     "QSR STORES SDN BHD",
     "Radio",
     "Siti Sarah",
     0.088
    ],
    [
     "SME26 NAT MY 1700",
     "SENHENG ELECTRIC (KL) SDN BHD",
     "Radio",
     "Rae Zalani",
     0.081
    ],
    [
     "FA26 NAT ERA 600",
     "DUOPHARMA DISTRIBUTION SDN BHD",
     "Radio",
     "Vernon",
     0.062
    ],
    [
     "ORION DEAL-BWF BADMINTON TAKEOVER 2026",
     "U MOBILE SERVICES SDN BHD",
     "Radio",
     "Vernon",
     0.06
    ],
    [
     "DENTSU DEAL-DENTSU X-QSR VALUE FOMO-OCT'26",
     "QSR STORES SDN BHD",
     "Radio",
     "Siti Sarah",
     0.053
    ],
    [
     "ORION DEAL-FA26 NAT ERA 200",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Daniel",
     0.047
    ],
    [
     "OMNET DEAL -CARE FOR WHAT MATTERS 3.0 -OCT'26-NO",
     "ZURICH INSURANCE COMPANY LTD",
     "Radio",
     "Jing Yan",
     0.046
    ],
    [
     "ORION DEAL-FA26 NAT MY 200",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Daniel",
     0.045
    ],
    [
     "OMNET DEAL-MARIGOLD HL ADVANCE SARCOPENIA (12/10",
     "COTRA ENTERPRISE SDN BHD",
     "Radio",
     "Jing Yan",
     0.041
    ],
    [
     "POSTPAID & PREPAID - UMOBILE BWF TAKEOVER 2026",
     "U MOBILE SDN BHD",
     "TV",
     "Vernon",
     0.04
    ],
    [
     "SME26 (NAT ERA 35)( SINAR 35)(ZAYAN 30)(GEGAR 30",
     "UNIVERSITI KUALA LUMPUR",
     "Radio",
     "Daniel",
     0.039
    ],
    [
     "ORION DEAL-SIME MOTORS AUTOFEST EVENT BUKIT JALI",
     "SIME DARBY AUTO BAVARIA SDN BHD",
     "Radio",
     "Daniel",
     0.038
    ],
    [
     "TNG - 30TH ANNIVERSARY",
     "TOUCH N GO SDN BHD",
     "TV",
     "Siti Sarah",
     0.038
    ],
    [
     "ORION DEAL-U Mobile x Astro Siti Nurhaliza Conce",
     "U MOBILE SERVICES SDN BHD",
     "Radio",
     "Vernon",
     0.034
    ],
    [
     "ORION DEAL-FA26 NAT HITZ 200",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Daniel",
     0.031
    ],
    [
     "SPECIALISED MEDIA ADS SB-JASMINE FOOD CORPORATIO",
     "JASMINE FOOD CORPORATION SDN BHD",
     "Digital",
     "Siti Sarah",
     0.031
    ],
    [
     "BATIK AIR EAST MALAYSIA MIX COMMERCIAL-SEP'26-OC",
     "MALINDO AIRWAYS SDN BHD",
     "Radio",
     "Joanne Chen",
     0.024
    ],
    [
     "BIO OIL",
     "NUVANTA SDN BHD",
     "TV",
     "Daniel",
     0.022
    ],
    [
     "MALINDO LITE DRIVE SPONSORSHIP (4/5/26-18/10/26)",
     "MALINDO AIRWAYS SDN BHD",
     "Radio",
     "Joanne Chen",
     0.016
    ],
    [
     "JASMINE FOOD #BELLA SYED YES WEDDING (20/9/26-28",
     "JASMINE FOOD CORPORATION SDN BHD",
     "Radio",
     "Siti Sarah",
     0.016
    ],
    [
     "GEGAR TIME CHECK SPONSORSHIP JUNE-NOV'26",
     "RED ONE NETWORK SDN BHD",
     "Radio",
     "Azuin",
     0.015
    ],
    [
     "IPG ORION-U MOBILE SB-MERDEKA TERBANG BERSAMA WI",
     "U MOBILE SERVICES SDN BHD",
     "Digital",
     "Vernon",
     0.015
    ],
    [
     "SUNSWEET AMAZING PRUNES",
     "TEIK SENN (M) SDN BHD",
     "TV",
     "Rae Zalani",
     0.014
    ],
    [
     "ERAVENGERS FOR HIMALAYA (12/10/26-29/11/26)",
     "HIMALAYA WELLNESS MALAYSIA SDN BHD",
     "Radio",
     "Siti Sarah",
     0.014
    ],
    [
     "IPG MEDIABRANDS- U MOBILE SB- U MOBILE RADIO SSH",
     "U MOBILE SERVICES SDN BHD",
     "Digital",
     "Vernon",
     0.013
    ],
    [
     "ERA SABAH SPONSORSIP - NEXT HOUR TEE UP & ENTERT",
     "RED ONE NETWORK SDN BHD",
     "Radio",
     "Azuin",
     0.013
    ],
    [
     "CX 5 LAUNCH-OCT'26",
     "BERMAZ MOTOR TRADING SDN BHD",
     "Radio",
     "Joanne Chen",
     0.012
    ],
    [
     "DENTSU X-QSR STORES SB-MICRO DRAMA MOMENTS",
     "QSR STORES SDN BHD",
     "Digital",
     "Siti Sarah",
     0.012
    ],
    [
     "SME26 PEN SIN 500",
     "DAIKIN MALAYSIA SALES & SERVICE SDN BHD",
     "Radio",
     "Jing Yan",
     0.011
    ],
    [
     "MEMBER DAY SALE (28 OCT -3 NOV'26)",
     "SOGO (K.L) DEPARTMENT STORE SDN BHD",
     "Radio",
     "Joanne Chen",
     0.008
    ],
    [
     "SME26 NAT MY 500",
     "DAIKIN MALAYSIA SALES & SERVICE SDN BHD",
     "Radio",
     "Jing Yan",
     0.008
    ],
    [
     "TRAPPER MEDIA SERVICES-DUOPHARMA DISTRIBUTION SB",
     "DUOPHARMA DISTRIBUTION SDN BHD",
     "Digital",
     "Vernon",
     0.007
    ],
    [
     "FA26 GEGAR 350",
     "RED ONE NETWORK SDN BHD",
     "Radio",
     "Azuin",
     0.007
    ],
    [
     "IPG ORION-U MOBILE SB-SITI NURHALIZA CONCERT TIC",
     "U MOBILE SERVICES SDN BHD",
     "Digital",
     "Vernon",
     0.007
    ],
    [
     "DIRECT-INCEIF UNIVERSITY-ASTRO AWANI",
     "INCEIF UNIVERSITY",
     "Digital",
     "Siti Sarah",
     0.005
    ],
    [
     "DIRECT-MALINDO AIRWAYS SB-LITE DRIVE SEGMENT SSH",
     "MALINDO AIRWAYS SDN BHD",
     "Digital",
     "Joanne Chen",
     0.005
    ],
    [
     "OMNET DEAL-DRYPERS GEGAR CAMPAIGN-JAN'26-NOV'26",
     "VINDA MARKETING (M) SDN BHD",
     "Radio",
     "Joanne Chen",
     0.004
    ],
    [
     "MEOW MEOW A72 PET CARE (12/10/26-16/10/26)",
     "WIPRO UNZA (MALAYSIA) SDN BHD",
     "Radio",
     "Joanne Chen",
     0.003
    ],
    [
     "FA26 PEN GEGAR 450",
     "VINDA MARKETING (M) SDN BHD",
     "Radio",
     "Joanne Chen",
     0.003
    ],
    [
     "AMBI AGENCY-KLA CONSULTANCY-AUDIO IMPACT 360-KIN",
     "KLA CONSULTANCY SDN BHD",
     "Digital",
     "Daniel",
     0.003
    ],
    [
     "SME26 PEN MEL 500",
     "DAIKIN MALAYSIA SALES & SERVICE SDN BHD",
     "Radio",
     "Jing Yan",
     0.003
    ],
    [
     "SME26 PEN MIX 400",
     "DAIKIN MALAYSIA SALES & SERVICE SDN BHD",
     "Radio",
     "Jing Yan",
     0.003
    ],
    [
     "FA26 PEN MELODY 400",
     "JASMINE FOOD CORPORATION SDN BHD",
     "Radio",
     "Siti Sarah",
     0.002
    ],
    [
     "FA26 EM ERA KK 280",
     "RED ONE NETWORK SDN BHD",
     "Radio",
     "Azuin",
     0.002
    ],
    [
     "FA26 PEN LITE 450",
     "JASMINE FOOD CORPORATION SDN BHD",
     "Radio",
     "Siti Sarah",
     0.002
    ],
    [
     "SME26 EM ERA KC 420",
     "DAIKIN MALAYSIA SALES & SERVICE SDN BHD",
     "Radio",
     "Jing Yan",
     0.001
    ],
    [
     "SME26 EM ERA KK 420",
     "DAIKIN MALAYSIA SALES & SERVICE SDN BHD",
     "Radio",
     "Jing Yan",
     0.001
    ],
    [
     "SME26 EM HITZ KC 420",
     "DAIKIN MALAYSIA SALES & SERVICE SDN BHD",
     "Radio",
     "Jing Yan",
     0.001
    ],
    [
     "SME26 EM HITZ KK 420",
     "DAIKIN MALAYSIA SALES & SERVICE SDN BHD",
     "Radio",
     "Jing Yan",
     0.001
    ],
    [
     "POSTPAID & PREPAID - LEE CHONG WEI CUP",
     "U MOBILE SERVICES SDN BHD",
     "AA",
     "Vernon",
     0.0
    ],
    [
     "DENTSU X (MALAYSIA) SB- TUNE TALK SB- ERA SEGMEN",
     "TUNE TALK SDN BHD",
     "Digital",
     "Azuin",
     0.0
    ],
    [
     "IPG MEDIABRANDS SB-U MOBILE SB- MALAYSIA FANTASY",
     "U MOBILE SERVICES SDN BHD",
     "Digital",
     "Vernon",
     -0.007
    ],
    [
     "ORION DEAL-PAY WITH DEBIT 2026 - RADIO SEGMENT S",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Daniel",
     -0.039
    ]
   ]
  },
  "alvin": {
   "rows": [
    {
     "id": "Hui Yee",
     "n": "Hui Yee",
     "full": "TAN, Hui Yee",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       36,
       38,
       2.8
      ],
      [
       18,
       18,
       3.3
      ],
      [
       18,
       18,
       3.0
      ],
      [
       2,
       2,
       2.0
      ]
     ],
     "f": 2.2,
     "g": -8.9
    },
    {
     "id": "Crystal",
     "n": "Crystal",
     "full": "PE, Sook Chin [Crystal]",
     "kind": "exec",
     "mgr": "Hui Yee",
     "cells": [
      [
       73,
       73,
       1.0
      ],
      [
       38,
       38,
       1.2
      ],
      [
       37,
       37,
       1.1
      ],
      [
       1,
       1,
       0.715
      ]
     ],
     "f": 1.6,
     "g": -2.4
    },
    {
     "id": "Svensson",
     "n": "Svensson",
     "full": "YAP, Suen Sheng [Svensson]",
     "kind": "exec",
     "mgr": "Hui Yee",
     "cells": [
      [
       14,
       14,
       0.835
      ],
      [
       5,
       5,
       1.1
      ],
      [
       6,
       6,
       0.984
      ],
      [
       0,
       0,
       0.656
      ]
     ],
     "f": 0.23,
     "g": -3.3
    },
    {
     "id": "Edward",
     "n": "Edward",
     "full": "HAM SHUO ZE, Edward",
     "kind": "exec",
     "mgr": "Hui Yee",
     "cells": [
      [
       14,
       22,
       0.956
      ],
      [
       8,
       8,
       0.99
      ],
      [
       9,
       9,
       0.924
      ],
      [
       6,
       6,
       0.616
      ]
     ],
     "f": 0.341,
     "g": -3.1
    },
    {
     "id": "Chen Lee",
     "n": "Chen Lee",
     "full": "LING, Chen Lee",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       75,
       110,
       1.6
      ],
      [
       42,
       57,
       1.4
      ],
      [
       20,
       24,
       2.0
      ],
      [
       18,
       21,
       2.4
      ]
     ],
     "f": 2.6,
     "g": -4.8
    },
    {
     "id": "Amanda",
     "n": "Amanda",
     "full": "LIM, Shun Yinn [Amanda]",
     "kind": "exec",
     "mgr": "Chen Lee",
     "cells": [
      [
       118,
       233,
       0.49
      ],
      [
       70,
       115,
       0.47
      ],
      [
       25,
       35,
       0.7
      ],
      [
       25,
       33,
       0.9
      ]
     ],
     "f": 1.3,
     "g": -1.3
    },
    {
     "id": "Aisyah",
     "n": "Aisyah",
     "full": "AZIZI, Aisyah",
     "kind": "exec",
     "mgr": "Chen Lee",
     "cells": [
      [
       63,
       63,
       0.585
      ],
      [
       45,
       45,
       0.35
      ],
      [
       33,
       33,
       0.5
      ],
      [
       35,
       35,
       0.5
      ]
     ],
     "f": 0.866,
     "g": -1.1
    },
    {
     "id": "Lionel",
     "n": "Lionel",
     "full": "LIM, Lionel Kok Yew",
     "kind": "exec",
     "mgr": "Chen Lee",
     "cells": [
      [
       47,
       48,
       0.338
      ],
      [
       20,
       21,
       0.47
      ],
      [
       11,
       12,
       0.5
      ],
      [
       8,
       9,
       0.5
      ]
     ],
     "f": 0.35,
     "g": -1.5
    },
    {
     "id": "Fiona",
     "n": "Fiona",
     "full": "LEE, Tze Mun",
     "kind": "exec",
     "mgr": "Chen Lee",
     "cells": [
      [
       51,
       51,
       0.2
      ],
      [
       1,
       1,
       0.111
      ],
      [
       1,
       1,
       0.287
      ],
      [
       0,
       0,
       0.528
      ]
     ],
     "f": 0.104,
     "g": -1.0
    }
   ],
   "total": {
    "cells": [
     [
      50,
      65,
      4.4
     ],
     [
      25,
      30,
      4.7
     ],
     [
      19,
      20,
      5.0
     ],
     [
      11,
      13,
      4.4
     ]
    ],
    "f": 4.8,
    "g": -13.7
   },
   "open": [
    [
     "Grab_Microdrama 2026",
     "GRABCAR SDN BHD",
     "Digital",
     "80%",
     "Amanda",
     {
      "Oct": 0.243,
      "Nov": 0.147
     }
    ],
    [
     "Yeo's CNY 2027",
     "YEO HIAP SENG (MALAYSIA) BERHAD",
     "Digital + Radio",
     "80%",
     "Amanda",
     {
      "Dec": 0.092,
      "Jan": 0.244
     }
    ],
    [
     "VIDA X STL 2026",
     "THE VIDA WORLD SDN BHD",
     "Digital + TV",
     "80%",
     "Amanda",
     {
      "Oct": 0.104,
      "Nov": 0.071,
      "Dec": 0.074,
      "Jan": 0.035
     }
    ],
    [
     "Weng Seng Heng_SMEVaganza TV",
     "WENG SENG HENG MEDICAL FACTO…",
     "TV",
     "50%",
     "Amanda",
     {
      "Nov": 0.04,
      "Dec": 0.04,
      "Jan": 0.022
     }
    ],
    [
     "Weng Seng Heng_SMEVaganza Radio Campaign",
     "WENG SENG HEN…",
     "Radio",
     "50%",
     "Amanda",
     {
      "Oct": 0.067,
      "Nov": 0.023
     }
    ],
    [
     "[booking in] Lalamove x Fandom Audio360 Impact a",
     "LALAMOVE …",
     "Digital + Radio",
     "50%",
     "Edward",
     {
      "Oct": 0.075
     }
    ],
    [
     "Gajahmas STL Sponsorship",
     "Gajah Emas Industries Sdn Bhd",
     "Digital + TV",
     "80%",
     "Lionel",
     {
      "Oct": 0.017,
      "Nov": 0.017,
      "Dec": 0.017,
      "Jan": 0.017
     }
    ],
    [
     "Maybank x Mix Save Debit Campaign",
     "MAYBANK ISLAMIC BERHAD",
     "Radio",
     "80%",
     "Crystal",
     {
      "Nov": 0.029
     }
    ]
   ],
   "bank": [
    [
     "ORION DEAL- GWM RADIO SPONSORSHIP 2026 - SPORT &",
     "GREAT…",
     "Radio",
     "Booked",
     "Crystal",
     [
      0.219,
      0.199,
      0.219,
      null
     ],
     0.636
    ],
    [
     "WONDA COFFEE",
     "ETIKA SDN BHD",
     "TV",
     "Booked",
     "Aisyah",
     [
      0.172,
      0.093,
      0.093,
      0.174
     ],
     0.532
    ],
    [
     "INFOZONE SPONSORSHIP 2026",
     "PERODUA SALES SDN BHD",
     "Radio",
     "Booked",
     "Crystal",
     [
      0.113,
      0.119,
      0.113,
      null
     ],
     0.345
    ],
    [
     "MAYBANK - ASTRO RADIO SPONSORSHIP 2026/2027",
     "MALAYAN BA…",
     "Radio",
     "Booked",
     "Crystal",
     [
      0.1,
      0.088,
      0.056,
      0.007
     ],
     0.252
    ],
    [
     "CALPIS X MIX BREAKFAST SEGMENT (18/6/26-3/1/27)",
     "ETIKA SDN BHD",
     "Radio",
     "Booked",
     "Aisyah",
     [
      0.068,
      0.065,
      0.07,
      0.003
     ],
     0.206
    ],
    [
     "HITZ MORNING CREW SEGMENT SPONSORSHIP & TACTICAL",
     "UM…",
     "Radio",
     "Booked",
     "Edward",
     [
      0.058,
      0.056,
      0.063,
      0.016
     ],
     0.193
    ],
    [
     "HAVAL H6 - GWM X BASS WEDDING SPONSORSHIP",
     "GREAT WALL M…",
     "TV",
     "Booked",
     "Crystal",
     [
      0.115,
      0.013,
      0.013,
      null
     ],
     0.142
    ],
    [
     "INVENTORY DEAL 3.0-MEMBERS SALE OCT'26",
     "EU YAN SANG (1959) …",
     "Radio",
     "Booked",
     "Amanda",
     [
      0.117,
      null,
      null,
      null
     ],
     0.117
    ],
    [
     "WENG SENG HENG MEDICAL - YU YEE OIL",
     "WENG SENG HENG MEDICA…",
     "TV",
     "Booked",
     "Amanda",
     [
      0.043,
      0.034,
      0.034,
      null
     ],
     0.111
    ],
    [
     "MELODY - TIME CHECK, SME AN HOUR, MELODY HEALTH",
     "GOODM…",
     "Radio",
     "Booked",
     "Lionel",
     [
      0.022,
      0.021,
      0.028,
      0.021
     ],
     0.091
    ],
    [
     "ERA CEKEPI 1 YEAR SPONSORSHIP 2026 (MARCH'26-FEB",
     "UMW T…",
     "Radio",
     "Booked",
     "Edward",
     [
      0.023,
      0.022,
      0.024,
      0.022
     ],
     0.09
    ],
    [
     "MELODY MORNING SEGMENT SPONSORSHIP 5OCT-27DEC'26",
     "SE…",
     "Radio",
     "Booked",
     "Svensson",
     [
      0.027,
      0.027,
      0.027,
      null
     ],
     0.081
    ],
    [
     "ORION DEAL-CAH 30TH ANNIVERSARY JUNE-NOV 2026",
     "COLUMBIA…",
     "Radio",
     "Booked",
     "Amanda",
     [
      0.022,
      0.054,
      null,
      null
     ],
     0.076
    ],
    [
     "DUGRO CORE",
     "DANONE SPECIALIZED NUTRITION (M) SDN BHD",
     "TV",
     "Booked",
     "Crystal",
     [
      0.061,
      null,
      null,
      null
     ],
     0.061
    ],
    [
     "SME26 NAT ERA 200",
     "WENG SENG HENG MEDICAL S/B",
     "Radio",
     "Booked",
     "Amanda",
     [
      0.028,
      0.024,
      null,
      null
     ],
     0.052
    ]
   ],
   "bankOct": [
    [
     "ORION DEAL- GWM RADIO SPONSORSHIP 2026 - SPORT &",
     "GREAT WALL MOTOR SALES MALAYSIA SDN BHD",
     "Radio",
     "Booked",
     "Crystal",
     0.219
    ],
    [
     "WONDA COFFEE",
     "ETIKA SDN BHD",
     "TV",
     "Booked",
     "Aisyah",
     0.172
    ],
    [
     "INVENTORY DEAL 3.0-MEMBERS SALE OCT'26",
     "EU YAN SANG (1959) SDN BHD",
     "Radio",
     "Booked",
     "Amanda",
     0.117
    ],
    [
     "HAVAL H6 - GWM X BASS WEDDING SPONSORSHIP",
     "GREAT WALL MOTOR SALES MALAYSIA SDN BHD",
     "TV",
     "Booked",
     "Crystal",
     0.115
    ],
    [
     "INFOZONE SPONSORSHIP 2026",
     "PERODUA SALES SDN BHD",
     "Radio",
     "Booked",
     "Crystal",
     0.113
    ],
    [
     "MAYBANK - ASTRO RADIO SPONSORSHIP 2026/2027",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Booked",
     "Crystal",
     0.1
    ],
    [
     "CALPIS X MIX BREAKFAST SEGMENT (18/6/26-3/1/27)",
     "ETIKA SDN BHD",
     "Radio",
     "Booked",
     "Aisyah",
     0.068
    ],
    [
     "DUGRO CORE",
     "DANONE SPECIALIZED NUTRITION (M) SDN BHD",
     "TV",
     "Booked",
     "Crystal",
     0.061
    ],
    [
     "HITZ MORNING CREW SEGMENT SPONSORSHIP & TACTICAL",
     "UMW TOYOTA MOTOR SDN BHD",
     "Radio",
     "Booked",
     "Edward",
     0.058
    ],
    [
     "INVENTORY 3.0-90TH ANNIVERSARY",
     "CHEVRON MALAYSIA LIMITED",
     "Radio",
     "Booked",
     "Lionel",
     0.051
    ],
    [
     "PEPSICO",
     "PEPSICO (CONCENTRATED MANUFACTURING SING",
     "TV",
     "Booked",
     "Aisyah",
     0.048
    ],
    [
     "WENG SENG HENG MEDICAL - YU YEE OIL",
     "WENG SENG HENG MEDICAL FACTORY SDN BHD",
     "TV",
     "Booked",
     "Amanda",
     0.043
    ],
    [
     "FA26 NAT MY 59",
     "DANONE SPECIALIZED NUTRITION (MALAYSIA)",
     "Radio",
     "Booked",
     "Crystal",
     0.037
    ],
    [
     "DIRECT-ETIKA SDN BHD-WONDA-KERETAPI SARONG",
     "ETIKA SDN BHD",
     "Digital",
     "Booked",
     "Aisyah",
     0.032
    ],
    [
     "Q3-UOB-CC Rewards You Carnival 2026-Oct_UOB26_RA",
     "UNITED OVERSEAS BANK (MALAYSIA) BHD",
     "Radio",
     "Booked",
     "Svensson",
     0.03
    ]
   ],
   "bookings": [
    [
     "ORION DEAL- GWM RADIO SPONSORSHIP 2026 - SPORT &",
     "GREAT WALL MOTOR SALES MALAYSIA SDN BHD",
     "Radio",
     "Crystal",
     0.219
    ],
    [
     "WONDA COFFEE",
     "ETIKA SDN BHD",
     "TV",
     "Aisyah",
     0.172
    ],
    [
     "INVENTORY DEAL 3.0-MEMBERS SALE OCT'26",
     "EU YAN SANG (1959) SDN BHD",
     "Radio",
     "Amanda",
     0.117
    ],
    [
     "HAVAL H6 - GWM X BASS WEDDING SPONSORSHIP",
     "GREAT WALL MOTOR SALES MALAYSIA SDN BHD",
     "TV",
     "Crystal",
     0.115
    ],
    [
     "INFOZONE SPONSORSHIP 2026",
     "PERODUA SALES SDN BHD",
     "Radio",
     "Crystal",
     0.113
    ],
    [
     "MAYBANK - ASTRO RADIO SPONSORSHIP 2026/2027",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Crystal",
     0.1
    ],
    [
     "CALPIS X MIX BREAKFAST SEGMENT (18/6/26-3/1/27)",
     "ETIKA SDN BHD",
     "Radio",
     "Aisyah",
     0.068
    ],
    [
     "DUGRO CORE",
     "DANONE SPECIALIZED NUTRITION (M) SDN BHD",
     "TV",
     "Crystal",
     0.061
    ],
    [
     "HITZ MORNING CREW SEGMENT SPONSORSHIP & TACTICAL",
     "UMW TOYOTA MOTOR SDN BHD",
     "Radio",
     "Edward",
     0.058
    ],
    [
     "INVENTORY 3.0-90TH ANNIVERSARY",
     "CHEVRON MALAYSIA LIMITED",
     "Radio",
     "Lionel",
     0.051
    ],
    [
     "PEPSICO",
     "PEPSICO (CONCENTRATED MANUFACTURING SING",
     "TV",
     "Aisyah",
     0.048
    ],
    [
     "WENG SENG HENG MEDICAL - YU YEE OIL",
     "WENG SENG HENG MEDICAL FACTORY SDN BHD",
     "TV",
     "Amanda",
     0.043
    ],
    [
     "FA26 NAT MY 59",
     "DANONE SPECIALIZED NUTRITION (MALAYSIA)",
     "Radio",
     "Crystal",
     0.037
    ],
    [
     "DIRECT-ETIKA SDN BHD-WONDA-KERETAPI SARONG",
     "ETIKA SDN BHD",
     "Digital",
     "Aisyah",
     0.032
    ],
    [
     "Q3-UOB-CC Rewards You Carnival 2026-Oct_UOB26_RA",
     "UNITED OVERSEAS BANK (MALAYSIA) BHD",
     "Radio",
     "Svensson",
     0.03
    ],
    [
     "SME26 NAT ERA 200",
     "WENG SENG HENG MEDICAL S/B",
     "Radio",
     "Amanda",
     0.028
    ],
    [
     "MBSB BERANI MELANGKAH CAMPAIGN (21/9/26-31/10/26",
     "MBSB BANK BERHAD",
     "Radio",
     "Fiona",
     0.027
    ],
    [
     "MELODY MORNING SEGMENT SPONSORSHIP 5OCT-27DEC'26",
     "SEREMBAN TWO HOLDINGS SDN BHD",
     "Radio",
     "Svensson",
     0.027
    ],
    [
     "DIRECT-ETIKA SB-ASCU MOVIE",
     "ETIKA SDN BHD",
     "Digital",
     "Aisyah",
     0.026
    ],
    [
     "SME26 NAT MY 200",
     "WENG SENG HENG MEDICAL S/B",
     "Radio",
     "Amanda",
     0.026
    ],
    [
     "MELODY DRIVE SEGMENT SPONSORSHIP 2025-2026",
     "EU YAN SANG (1959) SDN BHD",
     "Radio",
     "Amanda",
     0.023
    ],
    [
     "MINDSHARE-SIME DARBY PPTY (KLGCC RST) SB-2825A-K",
     "SIME DARBY PROPERTY BERHAD",
     "Digital",
     "Fiona",
     0.023
    ],
    [
     "ERA CEKEPI 1 YEAR SPONSORSHIP 2026 (MARCH'26-FEB",
     "UMW TOYOTA MOTOR SDN BHD",
     "Radio",
     "Edward",
     0.023
    ],
    [
     "APD DIGITAL SERVICES SB- MBSB BANK BERHAD- MBSB",
     "MBSB BANK BERHAD",
     "Digital",
     "Fiona",
     0.022
    ],
    [
     "MELODY - TIME CHECK, SME AN HOUR, MELODY HEALTH",
     "GOODMORNING GLOBAL SDN BHD",
     "Radio",
     "Lionel",
     0.022
    ],
    [
     "ORION DEAL-CAH 30TH ANNIVERSARY JUNE-NOV 2026",
     "COLUMBIA ASIA SDN BHD",
     "Radio",
     "Amanda",
     0.022
    ],
    [
     "FA26 PEN MELODY 600",
     "VICTORIA FACELIFT SDN BHD",
     "Radio",
     "Crystal",
     0.021
    ],
    [
     "FA26 NAT ENG HITZ-MIX 200 (HITZ 100)",
     "DANONE SPECIALIZED NUTRITION (MALAYSIA)",
     "Radio",
     "Crystal",
     0.021
    ],
    [
     "NADI MASTERCARD CREDIT CARD-i",
     "MAYBANK ISLAMIC BERHAD",
     "Radio",
     "Crystal",
     0.021
    ],
    [
     "DIRECT-BJAK SB-AWANI ARTICLE-INSURANS KERETA UBA",
     "Bjak Sdn Bhd",
     "Digital",
     "Amanda",
     0.02
    ],
    [
     "DIRECT- ETIKA SB-H.A.K MERDEKA BRAND FILM-7UP-MI",
     "ETIKA SDN BHD",
     "Digital",
     "Fiona",
     0.019
    ],
    [
     "FA26 REG MY CE 200",
     "ORIENT EUROPHARMA (M) SDN BHD",
     "Radio",
     "Svensson",
     0.018
    ],
    [
     "GSWMY-088-GSW X HAKIM DANISH MAD RAMP PEAK LAUNC",
     "GENTING MALAYSIA BERHAD",
     "Radio",
     "Edward",
     0.018
    ],
    [
     "LALAMOVE x MYBIG SHOW2026 PARTNER SPONSOR",
     "LALAMOVE MALAYSIA SDN BHD",
     "Radio",
     "Edward",
     0.018
    ],
    [
     "ORION DEAL-CAH 30TH ANNIVERSARY JUNE-NOV 2026 (P",
     "COLUMBIA ASIA SDN BHD",
     "Radio",
     "Amanda",
     0.017
    ],
    [
     "SME25 PEN MELODY 600",
     "GOODMORNING GLOBAL SDN BHD",
     "Radio",
     "Lionel",
     0.015
    ],
    [
     "DIRECT-FWD INSURANCE-WE GOT YOU COVERED",
     "FWD INSURANCE BERHAD",
     "Digital",
     "Lionel",
     0.015
    ],
    [
     "DIRECT-FWD TAKAFUL-WE GOT YOU COVERED",
     "FWD TAKAFUL BERHAD",
     "Digital",
     "Lionel",
     0.015
    ],
    [
     "ZEST-I FB LIVE 2026- ERA NEXT HOUR TEE UP & HIGH",
     "MAYBANK ISLAMIC BERHAD",
     "Radio",
     "Crystal",
     0.015
    ],
    [
     "FA26 NAT MY 379",
     "OZ MARKETING SDN BHD",
     "Radio",
     "Svensson",
     0.015
    ],
    [
     "GAJAHMAS",
     "GAJAH EMAS INDUSTRIES SDN BHD",
     "TV",
     "Lionel",
     0.014
    ],
    [
     "STING F1 2026",
     "advertiser not recorded",
     "AA",
     "Aisyah",
     0.013
    ],
    [
     "DIRECT- ETIKA SDN BHD- H.A.K MERDEKA BRAND FILM-",
     "ETIKA SDN BHD",
     "Digital",
     "Fiona",
     0.01
    ],
    [
     "FA26 NAT HITZ 400",
     "OZ MARKETING SDN BHD",
     "Radio",
     "Svensson",
     0.01
    ],
    [
     "INVICTUS BLUE SB-MALAYAN BANKING BERHAD-LITE FM-",
     "MALAYAN BANKING BERHAD",
     "Digital",
     "Crystal",
     0.01
    ],
    [
     "SPOOKADILLY x ERAFM - AUDIO IMPACT360",
     "GENTING MALAYSIA BERHAD",
     "Radio",
     "Edward",
     0.009
    ],
    [
     "OWN THE APPLE (AUDIO IMPACT360)",
     "R BEAUTE SDN BHD",
     "Radio",
     "Svensson",
     0.009
    ],
    [
     "FA26 NAT ENG HITZ-MIX 200 (MIX 100)",
     "DANONE SPECIALIZED NUTRITION (MALAYSIA)",
     "Radio",
     "Crystal",
     0.008
    ],
    [
     "DIRECT- BOUSTEAD PETROLEUM MARKETING SB- KITAFM",
     "BOUSTEAD PETROLEUM MARKETING SDN BHD",
     "Digital",
     "Svensson",
     0.008
    ],
    [
     "DENTSU DEAL-CARAT MEDIA-TIGER COURAGE",
     "HEINEKEN MARKETING MALAYSIA SDN BHD",
     "Radio",
     "Edward",
     0.008
    ],
    [
     "TAKAFUL 101 - CP-02153234",
     "SUN LIFE MALAYSIA ASSURANCE BERHAD",
     "AA",
     "Lionel",
     0.007
    ],
    [
     "DIRECT-FWD MALAYSIA HOLDIINGS SB-FWD MALAYSIA AG",
     "FWD MALAYSIA HOLDINGS SDN BHD",
     "Digital",
     "Lionel",
     0.006
    ],
    [
     "DIRECT- ETIKA SB-HEALTHY CALPIS",
     "ETIKA SDN BHD",
     "Digital",
     "Aisyah",
     0.005
    ],
    [
     "OMNICOM MEDIA GROUP (M) SB- JIE BUSINESS SB- OPP",
     "JIE BUSINESS SDN BHD",
     "Digital",
     "Crystal",
     0.005
    ],
    [
     "IPG ORION-GREAT WALL MOTOR SALES MALAYSIA SB –HA",
     "GREAT WALL MOTOR SALES MALAYSIA SDN BHD",
     "Digital",
     "Crystal",
     0.005
    ],
    [
     "MINDSHARE-EU YAN SANG (1959) SB-MELODY DRIVE SEG",
     "EU YAN SANG (1959) SDN BHD",
     "Digital",
     "Amanda",
     0.004
    ],
    [
     "STING X F1 (30/9/26-15/10/26) - AUDIO IMPACT",
     "PEPSICO (MALAYSIA) SDN BHD",
     "Radio",
     "Aisyah",
     0.003
    ],
    [
     "FA26 NAT MY 120",
     "DANONE SPECIALIZED NUTRITION (MALAYSIA)",
     "Radio",
     "Crystal",
     0.003
    ],
    [
     "PINK DOLPHIN ADWORK PLT-SEREMBAN 2 SB-IJM S2-MEL",
     "SEREMBAN TWO HOLDINGS SDN BHD",
     "Digital",
     "Svensson",
     0.003
    ],
    [
     "MAD LADS MEDIA SB-UWM TOYOTA MOTOR SB-HITZ MORNI",
     "UMW TOYOTA MOTOR SDN BHD",
     "Digital",
     "Edward",
     0.002
    ],
    [
     "CARAT MEDIA SERVICES (M) SB-HEINEKEN MARKETING M",
     "HEINEKEN MARKETING MALAYSIA SDN BHD",
     "Digital",
     "Edward",
     0.002
    ],
    [
     "SAFE CHILD, STRONG NATION",
     "CHILDRENS PROTECTION SOCIETY MALAYSIA",
     "TV",
     "Fiona",
     0.001
    ],
    [
     "MAD LADS MEDIA SB-UWM TOYOTA MOTOR SB-ERA CEKEPI",
     "UMW TOYOTA MOTOR SDN BHD",
     "Digital",
     "Edward",
     0.001
    ],
    [
     "STING X TERBANG",
     "ETIKA SDN BHD",
     "AA",
     "Aisyah",
     0.001
    ],
    [
     "VIDA WATER, VIDA C AND VIDA ZERO [BEVERAGE]",
     "THE VIDA WORLD SDN BHD",
     "AA",
     "Amanda",
     0.0
    ],
    [
     "IPG ORION SB-COLUMBIA ASIA SB- CAH 30TH ANNIVERS",
     "COLUMBIA ASIA SDN BHD",
     "Digital",
     "Amanda",
     0.0
    ]
   ]
  },
  "belinda": {
   "rows": [
    {
     "id": "Elaine",
     "n": "Elaine",
     "full": "NG, Li Chean [Elaine]",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       53,
       82,
       1.7
      ],
      [
       20,
       20,
       1.7
      ],
      [
       11,
       11,
       1.9
      ],
      [
       0,
       11,
       1.6
      ]
     ],
     "f": 1.4,
     "g": -5.5
    },
    {
     "id": "Elaine (own book)",
     "n": "Elaine",
     "full": "NG, Li Chean [Elaine]",
     "kind": "own",
     "mgr": "Elaine",
     "cells": [
      {
       "f": 0.281,
       "c": 0.286
      },
      {
       "f": 0.031,
       "c": 0.031
      },
      {
       "f": 0.024,
       "c": 0.024
      },
      {
       "f": 0.0,
       "c": 0.0
      }
     ],
     "f": 0.337,
     "g": null
    },
    {
     "id": "Jessie",
     "n": "Jessie",
     "full": "JESSIE HOE, Jia Chee",
     "kind": "exec",
     "mgr": "Elaine",
     "cells": [
      [
       27,
       28,
       0.867
      ],
      [
       7,
       7,
       0.865
      ],
      [
       4,
       4,
       0.968
      ],
      [
       0,
       0,
       0.854
      ]
     ],
     "f": 0.338,
     "g": -3.2
    },
    {
     "id": "Shin Hsin",
     "n": "Shin Hsin",
     "full": "LEE, Shih Hsin",
     "kind": "exec",
     "mgr": "Elaine",
     "cells": [
      [
       45,
       103,
       0.833
      ],
      [
       29,
       29,
       0.849
      ],
      [
       16,
       16,
       0.948
      ],
      [
       0,
       24,
       0.757
      ]
     ],
     "f": 0.771,
     "g": -2.6,
     "assumed": "LEE, Shih Hsin is Shin Hsin on the chart"
    },
    {
     "id": "Keong",
     "n": "Keong",
     "full": "TEO, Yap Keong",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       36,
       36,
       1.1
      ],
      [
       2,
       2,
       1.2
      ],
      [
       0,
       0,
       1.1
      ],
      [
       0,
       0,
       0.992
      ]
     ],
     "f": 0.419,
     "g": -4.0
    },
    {
     "id": "Keong (own book)",
     "n": "Keong",
     "full": "TEO, Yap Keong",
     "kind": "own",
     "mgr": "Keong",
     "cells": [
      [
       36,
       36,
       1.1
      ],
      [
       2,
       2,
       1.2
      ],
      [
       0,
       0,
       1.1
      ],
      [
       0,
       0,
       0.992
      ]
     ],
     "f": 0.419,
     "g": -4.0
    },
    {
     "id": "Reporting directly",
     "n": "Reporting directly",
     "full": "Reporting directly to the head",
     "kind": "direct",
     "mgr": null,
     "cells": [
      [
       51,
       69,
       1.3
      ],
      [
       48,
       54,
       1.4
      ],
      [
       12,
       12,
       1.6
      ],
      [
       12,
       12,
       1.5
      ]
     ],
     "f": 1.7,
     "g": -4.0
    },
    {
     "id": "Josephine",
     "n": "Josephine",
     "full": "LIM, Yee Kwan [Josephine]",
     "kind": "exec",
     "mgr": "Reporting directly",
     "cells": [
      [
       51,
       69,
       1.3
      ],
      [
       48,
       54,
       1.4
      ],
      [
       12,
       12,
       1.6
      ],
      [
       12,
       12,
       1.5
      ]
     ],
     "f": 1.7,
     "g": -4.0,
     "offChart": true
    }
   ],
   "total": {
    "cells": [
     [
      48,
      65,
      4.1
     ],
     [
      24,
      26,
      4.3
     ],
     [
      9,
      9,
      4.6
     ],
     [
      4,
      9,
      4.1
     ]
    ],
    "f": 3.6,
    "g": -13.5
   },
   "open": [
    [
     "Nescafe SOS",
     "NESTLE PRODUCTS SDN BHD",
     "Digital + TV",
     "80%",
     "Josephine",
     {
      "Nov": 0.419
     }
    ],
    [
     "MegaTrend SMEvaganza Commitment",
     "MEGA TREND ADVERTISING SD…",
     "Digital",
     "50%",
     "Shin Hsin",
     {
      "Jan": 0.181
     }
    ],
    [
     "Tohtonku (TBC)",
     "SINGNAN COMMUNICATIONS SDN BHD (agency)",
     "AA",
     "80%",
     "Jessie",
     {
      "Oct": 0.024
     }
    ],
    [
     "Oatbedient New Variant Launch (News)",
     "LISTEN UP SDN BHD",
     "AA + Digital",
     "80%",
     "Elaine",
     {
      "Oct": 0.017
     }
    ],
    [
     "Oatbedient New Variant Launch (Audio Impact)",
     "LISTEN UP SDN BHD",
     "Radio",
     "80%",
     "Elaine",
     {
      "Oct": 0.008
     }
    ]
   ],
   "bank": [
    [
     "MAXIS POSTPAID",
     "MAXIS BROADBAND SDN BHD",
     "TV",
     "Booked",
     "Josephine",
     [
      0.19,
      0.19,
      0.19,
      0.172
     ],
     0.742
    ],
    [
     "MILO POWDER - TRIPLE ADVANTAGE",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Booked",
     "Shin Hsin",
     [
      0.196,
      0.088,
      null,
      null
     ],
     0.284
    ],
    [
     "MAGGI 2 MINUTES NOODLE - SAB THEMATIC",
     "NESTLE PRODUCT SDN …",
     "TV",
     "Booked",
     "Shin Hsin",
     [
      0.049,
      0.081,
      0.076,
      null
     ],
     0.205
    ],
    [
     "Gardenia QuickBites New Launch",
     "GARDENIA BAKERIES (M) SDN BHD",
     "Radio",
     "Won",
     "Elaine",
     [
      0.199,
      null,
      null,
      null
     ],
     0.199
    ],
    [
     "COWAY LAUNDRY GROUP CAMPAIGN",
     "COWAY (M) SDN BHD",
     "TV",
     "Booked",
     "Keong",
     [
      0.173,
      0.023,
      null,
      null
     ],
     0.196
    ],
    [
     "MAXIS POSTPAID X APPLE IPHONE NPI",
     "MAXIS BROADBAND SDN BHD",
     "TV",
     "Booked",
     "Josephine",
     [
      0.108,
      0.05,
      null,
      null
     ],
     0.157
    ],
    [
     "MAGGI 2 MINUTES NOODLE - MAGGI SAB PW HIKAYAT",
     "NESTLE PR…",
     "TV",
     "Booked",
     "Shin Hsin",
     [
      0.04,
      0.048,
      0.045,
      null
     ],
     0.133
    ],
    [
     "ORION DEAL -MAXIS ENTERPRISE SME GREAT HELPER-OC",
     "MAXIS …",
     "Radio",
     "Booked",
     "Josephine",
     [
      0.07,
      0.054,
      null,
      null
     ],
     0.124
    ],
    [
     "MAGGI SERVICE PILLAR-MSSCC",
     "NESTLE PRODUCTS SDN BHD",
     "Radio",
     "Booked",
     "Josephine",
     [
      0.11,
      0.011,
      null,
      null
     ],
     0.122
    ],
    [
     "MCD BRANDED CORE MENU - LTO AYAM GORENG GRIMACE",
     "GERB…",
     "TV",
     "Booked",
     "Keong",
     [
      0.119,
      null,
      null,
      null
     ],
     0.119
    ],
    [
     "ORION DEAL-MAXIS POSTPAID-BEST OF ENGLISH FOOTBA",
     "MAXIS…",
     "Radio",
     "Booked",
     "Josephine",
     [
      0.041,
      0.041,
      null,
      null
     ],
     0.082
    ],
    [
     "SIC MOTOGP (16/9/26-31/10/26) -SPOT BUY XTRA",
     "SEPANG INT.CIRCUIT",
     "Radio",
     "Booked",
     "Keong",
     [
      0.081,
      null,
      null,
      null
     ],
     0.081
    ],
    [
     "NESCAFE GOLD - MASTERBRAND COMM",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Booked",
     "Josephine",
     [
      0.06,
      null,
      null,
      null
     ],
     0.06
    ],
    [
     "KIT KAT - EQUITY SUSTENANCE",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Booked",
     "Josephine",
     [
      0.058,
      null,
      null,
      null
     ],
     0.058
    ],
    [
     "FEBREZE BASE",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Booked",
     "Jessie",
     [
      0.021,
      0.028,
      null,
      null
     ],
     0.049
    ]
   ],
   "bankOct": [
    [
     "Gardenia QuickBites New Launch",
     "GARDENIA BAKERIES (M) SDN BHD",
     "Radio",
     "Won",
     "Elaine",
     0.199
    ],
    [
     "MILO POWDER - TRIPLE ADVANTAGE",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Booked",
     "Shin Hsin",
     0.196
    ],
    [
     "MAXIS POSTPAID",
     "MAXIS BROADBAND SDN BHD",
     "TV",
     "Booked",
     "Josephine",
     0.19
    ],
    [
     "COWAY LAUNDRY GROUP CAMPAIGN",
     "COWAY (M) SDN BHD",
     "TV",
     "Booked",
     "Keong",
     0.173
    ],
    [
     "MCD BRANDED CORE MENU - LTO AYAM GORENG GRIMACE",
     "GERBANG ALAF RESTAURANTS SDN BHD",
     "TV",
     "Booked",
     "Keong",
     0.119
    ],
    [
     "MAGGI SERVICE PILLAR-MSSCC",
     "NESTLE PRODUCTS SDN BHD",
     "Radio",
     "Booked",
     "Josephine",
     0.11
    ],
    [
     "MAXIS POSTPAID X APPLE IPHONE NPI",
     "MAXIS BROADBAND SDN BHD",
     "TV",
     "Booked",
     "Josephine",
     0.108
    ],
    [
     "SIC MOTOGP (16/9/26-31/10/26) -SPOT BUY XTRA",
     "SEPANG INT.CIRCUIT",
     "Radio",
     "Booked",
     "Keong",
     0.081
    ],
    [
     "ORION DEAL -MAXIS ENTERPRISE SME GREAT HELPER-OC",
     "MAXIS MOBILE SERVICES SDN BHD",
     "Radio",
     "Booked",
     "Josephine",
     0.07
    ],
    [
     "NESCAFE GOLD - MASTERBRAND COMM",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Booked",
     "Josephine",
     0.06
    ],
    [
     "KIT KAT - EQUITY SUSTENANCE",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Booked",
     "Josephine",
     0.058
    ],
    [
     "MAGGI 2 MINUTES NOODLE - SAB THEMATIC",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Booked",
     "Shin Hsin",
     0.049
    ],
    [
     "ORION DEAL-MAXIS POSTPAID-BEST OF ENGLISH FOOTBA",
     "MAXIS MOBILE SERVICES SDN BHD",
     "Radio",
     "Booked",
     "Josephine",
     0.041
    ],
    [
     "MAGGI 2 MINUTES NOODLE - MAGGI SAB PW HIKAYAT",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Booked",
     "Shin Hsin",
     0.04
    ],
    [
     "HEAD & SHOULDER",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Booked",
     "Jessie",
     0.04
    ]
   ],
   "bookings": [
    [
     "MILO POWDER - TRIPLE ADVANTAGE",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Shin Hsin",
     0.196
    ],
    [
     "MAXIS POSTPAID",
     "MAXIS BROADBAND SDN BHD",
     "TV",
     "Josephine",
     0.19
    ],
    [
     "COWAY LAUNDRY GROUP CAMPAIGN",
     "COWAY (M) SDN BHD",
     "TV",
     "Keong",
     0.173
    ],
    [
     "MCD BRANDED CORE MENU - LTO AYAM GORENG GRIMACE",
     "GERBANG ALAF RESTAURANTS SDN BHD",
     "TV",
     "Keong",
     0.119
    ],
    [
     "MAGGI SERVICE PILLAR-MSSCC",
     "NESTLE PRODUCTS SDN BHD",
     "Radio",
     "Josephine",
     0.11
    ],
    [
     "MAXIS POSTPAID X APPLE IPHONE NPI",
     "MAXIS BROADBAND SDN BHD",
     "TV",
     "Josephine",
     0.108
    ],
    [
     "SIC MOTOGP (16/9/26-31/10/26) -SPOT BUY XTRA",
     "SEPANG INT.CIRCUIT",
     "Radio",
     "Keong",
     0.081
    ],
    [
     "ORION DEAL -MAXIS ENTERPRISE SME GREAT HELPER-OC",
     "MAXIS MOBILE SERVICES SDN BHD",
     "Radio",
     "Josephine",
     0.07
    ],
    [
     "NESCAFE GOLD - MASTERBRAND COMM",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Josephine",
     0.06
    ],
    [
     "KIT KAT - EQUITY SUSTENANCE",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Josephine",
     0.058
    ],
    [
     "MAGGI 2 MINUTES NOODLE - SAB THEMATIC",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Shin Hsin",
     0.049
    ],
    [
     "ORION DEAL-MAXIS POSTPAID-BEST OF ENGLISH FOOTBA",
     "MAXIS MOBILE SERVICES SDN BHD",
     "Radio",
     "Josephine",
     0.041
    ],
    [
     "MAGGI 2 MINUTES NOODLE - MAGGI SAB PW HIKAYAT",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Shin Hsin",
     0.04
    ],
    [
     "HEAD & SHOULDER",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Jessie",
     0.04
    ],
    [
     "DOWNY D2C WIBC VALUE",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Jessie",
     0.034
    ],
    [
     "DOWNY D2C WIBC MOR",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Jessie",
     0.03
    ],
    [
     "Honor-Magic 9 x Astro F1-Sept-Oct'26",
     "HONOR TECHNOLOGY (M) SDN BHD",
     "Digital",
     "Shin Hsin",
     0.027
    ],
    [
     "DOWNY D2C WIBC LLF",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Jessie",
     0.027
    ],
    [
     "FEBREZE BASE",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Jessie",
     0.021
    ],
    [
     "REJOICE",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Jessie",
     0.017
    ],
    [
     "AMBI PUR HOME",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Jessie",
     0.016
    ],
    [
     "HONOR MAGIC 9 SERIES",
     "HONOR TECHNOLOGY (M) SDN BHD",
     "TV",
     "Shin Hsin",
     0.013
    ],
    [
     "2026 STM LOTTERY IN ANTI ILLEGAL PSA (JULY - DEC",
     "STM LOTTERY SDN BHD",
     "Radio",
     "Elaine",
     0.013
    ],
    [
     "SME26 NAT MY 105",
     "BUNTING LAH MEDIA",
     "Radio",
     "Shin Hsin",
     0.012
    ],
    [
     "SME26 NAT HITZ 105",
     "BUNTING LAH MEDIA",
     "Radio",
     "Shin Hsin",
     0.012
    ],
    [
     "SME26 PEN ERA 200",
     "KINO BIOTECH (M) SDN BHD",
     "Radio",
     "Elaine",
     0.011
    ],
    [
     "AYAM GORENG OFFENSE PLAN - SAMURAI PHASE",
     "GERBANG ALAF RESTAURANTS SDN BHD",
     "TV",
     "Keong",
     0.01
    ],
    [
     "SME26 REG MY CEN 70",
     "MODERN LIVING EVENT SDN BHD",
     "Radio",
     "Shin Hsin",
     0.008
    ],
    [
     "SPORTS TOTO-CSR MESSAGE ANTI ILLEGAL-JUL26-DEC'2",
     "STM LOTTERY SDN BHD",
     "Radio",
     "Elaine",
     0.008
    ],
    [
     "SIC MOTOGP (16/9/26-31/10/26)",
     "SEPANG INT.CIRCUIT",
     "Radio",
     "Keong",
     0.008
    ],
    [
     "SME26 PEN MELODY 800",
     "KINO BIOTECH (M) SDN BHD",
     "Radio",
     "Elaine",
     0.007
    ],
    [
     "ME & MAGGI SO GOOD TOGETHER'26",
     "NESTLE PRODUCTS SDN BHD",
     "Radio",
     "Josephine",
     0.007
    ],
    [
     "2026 STM LOTTERY IN ANTI ILLEGAL PSA (JULY-DEC'2",
     "STM LOTTERY SDN BHD",
     "Radio",
     "Elaine",
     0.007
    ],
    [
     "SME26 REG HITZ CEN 70",
     "MODERN LIVING EVENT SDN BHD",
     "Radio",
     "Shin Hsin",
     0.007
    ],
    [
     "SME26 GEGAR 300",
     "TOHTONKU SDN BHD",
     "Radio",
     "Jessie",
     0.007
    ],
    [
     "MAGGI SERVICE PILLAR - ME & MAGGI SO GOOD TOGETH",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Josephine",
     0.006
    ],
    [
     "ORION DEAL- AIR ASIA AMRITSAR X HFM ON LITE (5/1",
     "MOVE TRAVEL SDN BHD",
     "Radio",
     "Shin Hsin",
     0.006
    ],
    [
     "GEMPAK MOST WANTED SPONSORSHIP X RMHC",
     "GERBANG ALAF RESTAURANTS SDN BHD",
     "Digital",
     "Keong",
     0.006
    ],
    [
     "AirAsia - Istanbul Low Fare",
     "AIR ASIA BERHAD",
     "Digital",
     "Shin Hsin",
     0.005
    ],
    [
     "Maxis SME Great Helper Business Level Up",
     "MAXIS MOBILE SERVICES SDN BHD",
     "Digital",
     "Josephine",
     0.005
    ],
    [
     "SME26 PEN MELODY 100",
     "STM LOTTERY SDN BHD",
     "Radio",
     "Elaine",
     0.005
    ],
    [
     "MELODY HEALTH THURSDAY - OCT'26",
     "PMG HEALTHCARE SDN BHD",
     "Radio",
     "Elaine",
     0.004
    ],
    [
     "MAXIS POSTPAID - BEST OF ENGLISH FOOTBALL SEASON",
     "MAXIS MOBILE SERVICES SDN BHD",
     "Digital",
     "Josephine",
     0.004
    ],
    [
     "STM ELECTION PSA - GOXUAN (ROS XTRA SEPT-OCT'26)",
     "STM LOTTERY SDN BHD",
     "Radio",
     "Elaine",
     0.003
    ],
    [
     "MAXIS ENTERPRISE",
     "MAXIS BROADBAND SDN BHD",
     "TV",
     "Josephine",
     0.003
    ],
    [
     "SME26 EM ERA KCH 140",
     "EXPLOREPEDIA SDN BHD",
     "Radio",
     "Elaine",
     0.003
    ],
    [
     "SME26 EM ERA KK 140",
     "EXPLOREPEDIA SDN BHD",
     "Radio",
     "Elaine",
     0.003
    ],
    [
     "SME26 EM ERA SBH 210",
     "SKYWORTH DEVELOPMENT M'SIA S/B",
     "Radio",
     "Jessie",
     0.002
    ],
    [
     "SME26 EM ERA SRWK 210",
     "SKYWORTH DEVELOPMENT M'SIA S/B",
     "Radio",
     "Jessie",
     0.002
    ],
    [
     "MELODY - 2026 ASTRO AEC CLASSIC GOLDEN MELODY SI",
     "MAH SING GROUP BHD",
     "Radio",
     "Jessie",
     0.001
    ]
   ]
  },
  "suatwei": {
   "rows": [
    {
     "id": "Li Zhan",
     "n": "Li Zhan",
     "full": "GAI, Li Zhan",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       60,
       60,
       1.7
      ],
      [
       13,
       13,
       2.4
      ],
      [
       8,
       8,
       2.7
      ],
      [
       1,
       1,
       1.7
      ]
     ],
     "f": 1.6,
     "g": -7.0
    },
    {
     "id": "Hong Cheng",
     "n": "Hong Cheng",
     "full": "GOH, Hong Cheng",
     "kind": "exec",
     "mgr": "Li Zhan",
     "cells": [
      [
       63,
       63,
       0.596
      ],
      [
       14,
       14,
       0.87
      ],
      [
       4,
       4,
       0.965
      ],
      [
       0,
       0,
       0.59
      ]
     ],
     "f": 0.535,
     "g": -2.5
    },
    {
     "id": "Joe Er",
     "n": "Joe Er",
     "full": "CHEW, Joe Er",
     "kind": "exec",
     "mgr": "Li Zhan",
     "cells": [
      [
       52,
       52,
       0.56
      ],
      [
       11,
       11,
       0.852
      ],
      [
       6,
       6,
       0.92
      ],
      [
       4,
       4,
       0.56
      ]
     ],
     "f": 0.454,
     "g": -2.4
    },
    {
     "id": "Melanie",
     "n": "Melanie",
     "full": "LIM, Melanie Sze Ling",
     "kind": "exec",
     "mgr": "Li Zhan",
     "cells": [
      [
       64,
       64,
       0.567
      ],
      [
       14,
       14,
       0.72
      ],
      [
       14,
       14,
       0.82
      ],
      [
       0,
       0,
       0.56
      ]
     ],
     "f": 0.578,
     "g": -2.1
    },
    {
     "id": "Poh Chee",
     "n": "Poh Chee",
     "full": "VOO, Poh Chee",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       67,
       67,
       2.1
      ],
      [
       32,
       32,
       1.5
      ],
      [
       76,
       76,
       1.5
      ],
      [
       0,
       0,
       2.1
      ]
     ],
     "f": 3.0,
     "g": -4.2
    },
    {
     "id": "Ashley",
     "n": "Ashley",
     "full": "HO, Ashley",
     "kind": "exec",
     "mgr": "Poh Chee",
     "cells": [
      [
       78,
       78,
       1.5
      ],
      [
       30,
       30,
       0.931
      ],
      [
       0,
       0,
       0.94
      ],
      [
       0,
       0,
       1.5
      ]
     ],
     "f": 1.4,
     "g": -3.4
    },
    {
     "id": "Edmund Ng",
     "n": "Edmund Ng",
     "full": "NG, Wei Han [Edmund]",
     "kind": "exec",
     "mgr": "Poh Chee",
     "cells": [
      [
       39,
       39,
       0.563
      ],
      [
       35,
       35,
       0.6
      ],
      [
       195,
       195,
       0.597
      ],
      [
       0,
       0,
       0.576
      ]
     ],
     "f": 1.6,
     "g": -0.736,
     "qual": "CelcomDigi accounts"
    },
    {
     "id": "Dayang",
     "n": "Dayang",
     "full": "ABANG OTHMAN, Dayang Diana Natasha",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       71,
       77,
       0.95
      ],
      [
       0,
       17,
       1.0
      ],
      [
       0,
       0,
       1.1
      ],
      [
       0,
       0,
       0.93
      ]
     ],
     "f": 0.681,
     "g": -3.3
    },
    {
     "id": "Dayang (own book)",
     "n": "Dayang",
     "full": "ABANG OTHMAN, Dayang Diana Natasha",
     "kind": "own",
     "mgr": "Dayang",
     "cells": [
      [
       51,
       51,
       0.65
      ],
      [
       1,
       1,
       0.66
      ],
      [
       0,
       0,
       0.66
      ],
      [
       0,
       0,
       0.65
      ]
     ],
     "f": 0.337,
     "g": -2.3
    },
    {
     "id": "Edmund Ng (all other accounts)",
     "n": "Edmund Ng",
     "full": "NG, Wei Han [Edmund]",
     "kind": "exec",
     "mgr": "Dayang",
     "cells": [
      [
       114,
       132,
       0.3
      ],
      [
       0,
       49,
       0.35
      ],
      [
       0,
       0,
       0.4
      ],
      [
       0,
       0,
       0.28
      ]
     ],
     "f": 0.343,
     "g": -0.987,
     "qual": "all other accounts"
    }
   ],
   "total": {
    "cells": [
     [
      65,
      67,
      4.7
     ],
     [
      16,
      20,
      5.0
     ],
     [
      26,
      26,
      5.3
     ],
     [
      1,
      1,
      4.7
     ]
    ],
    "f": 5.3,
    "g": -14.4
   },
   "open": [
    [
     "Eco Shop - Uncomplicated Challenge",
     "IPG MEDIABRANDS SDN BHD (ag…",
     "Digital + Radio",
     "50%",
     "Edmund Ng",
     {
      "Nov": 0.173
     }
    ],
    [
     "CD x Awani Belanjawan 2027",
     "OMD (M) SDN BHD (agency)",
     "TV",
     "80%",
     "Edmund Ng",
     {
      "Oct": 0.058
     }
    ],
    [
     "CUCKOO x Home of Kids",
     "TRIO HAUZ SDN BHD (agency)",
     "TV",
     "80%",
     "Joe Er",
     {
      "Dec": 0.039
     }
    ]
   ],
   "bank": [
    [
     "OMNET DEAL-CD 016 POWERLINE SPONSORSHIP 2026",
     "CELCOMDI…",
     "Radio",
     "Booked",
     "Edmund Ng",
     [
      0.122,
      0.117,
      0.879,
      null
     ],
     1.1
    ],
    [
     "PREPAID",
     "CELCOMDIGI BHD",
     "TV",
     "Booked",
     "Ashley",
     [
      0.664,
      null,
      null,
      null
     ],
     0.664
    ],
    [
     "OMNET DEAL-3 PAGI ERA SPONSORSHIP 2026",
     "CELCOMDIGI BHD",
     "Radio",
     "Booked",
     "Edmund Ng",
     [
      0.099,
      0.094,
      0.289,
      null
     ],
     0.482
    ],
    [
     "BRAND X",
     "OMD (M) SDN BHD",
     "TV",
     "Booked",
     "Ashley",
     [
      0.168,
      0.202,
      null,
      null
     ],
     0.37
    ],
    [
     "INVENTORY DEAL 3.0-JIWA SME 2026 (ROS XTRA)",
     "TM TECHNOLOG…",
     "Radio",
     "Booked",
     "Hong Cheng",
     [
      0.167,
      0.122,
      null,
      null
     ],
     0.29
    ],
    [
     "DENTSU DEAL-CONSIDER IPROSPECT PETRONAS NEWS SPO",
     "PET…",
     "Radio",
     "Booked",
     "Melanie",
     [
      0.216,
      null,
      null,
      null
     ],
     0.216
    ],
    [
     "Sensodyne Cavity Launch",
     "VIVAKI (MALAYSIA) SDN BHD (agency)",
     "Radio",
     "Won",
     "Melanie",
     [
      null,
      0.098,
      0.096,
      null
     ],
     0.194
    ],
    [
     "FOODPANDA X MLD WAVE 9 - BRAND EQUITY 2026",
     "DELIVERY HER…",
     "TV",
     "Booked",
     "Dayang",
     [
      0.168,
      null,
      null,
      null
     ],
     0.168
    ],
    [
     "SME26 NAT MY 1000",
     "KALBE MALAYSIA SDN BHD",
     "Radio",
     "Booked",
     "Joe Er",
     [
      0.126,
      0.007,
      null,
      null
     ],
     0.133
    ],
    [
     "3M Scotch Brite - October 2026",
     "Ipg Orion Sdn Bhd (agency)",
     "Radio",
     "Won",
     "Edmund Ng",
     [
      0.108,
      null,
      null,
      null
     ],
     0.108
    ],
    [
     "EUCERIN SPOTLESS BRIGHTENING (RADIO+DIG) AUG-OCT",
     "BEIER…",
     "Radio",
     "Booked",
     "Ashley",
     [
      0.101,
      null,
      null,
      null
     ],
     0.101
    ],
    [
     "3M-SCOTCH BRITE - 3M Q3, RADIO 2026",
     "3M INNOVATION SINGAPORE …",
     "Radio",
     "Booked",
     "Edmund Ng",
     [
      0.094,
      null,
      null,
      null
     ],
     0.094
    ],
    [
     "FOODPANDA X MLD WAVE 9 - AFFORDABILITY 2026",
     "DELIVERY HER…",
     "TV",
     "Booked",
     "Dayang",
     [
      0.091,
      null,
      null,
      null
     ],
     0.091
    ],
    [
     "PANADOL CAN AWARENESS-SEP'26-OCT'26",
     "GLAXOSMITHKLINE",
     "Radio",
     "Booked",
     "Melanie",
     [
      0.084,
      null,
      null,
      null
     ],
     0.084
    ],
    [
     "SME26 NAT ERA 200",
     "ZUS COMMERCE (M) SDN BHD",
     "Radio",
     "Booked",
     "Hong Cheng",
     [
      0.082,
      null,
      null,
      null
     ],
     0.082
    ]
   ],
   "bankOct": [
    [
     "PREPAID",
     "CELCOMDIGI BHD",
     "TV",
     "Booked",
     "Ashley",
     0.664
    ],
    [
     "DENTSU DEAL-CONSIDER IPROSPECT PETRONAS NEWS SPO",
     "PETRONAS DAGANGAN BERHAD",
     "Radio",
     "Booked",
     "Melanie",
     0.216
    ],
    [
     "BRAND X",
     "OMD (M) SDN BHD",
     "TV",
     "Booked",
     "Ashley",
     0.168
    ],
    [
     "FOODPANDA X MLD WAVE 9 - BRAND EQUITY 2026",
     "DELIVERY HERO MALAYSIA SDN BHD",
     "TV",
     "Booked",
     "Dayang",
     0.168
    ],
    [
     "INVENTORY DEAL 3.0-JIWA SME 2026 (ROS XTRA)",
     "TM TECHNOLOGY SERVICES SDN BHD",
     "Radio",
     "Booked",
     "Hong Cheng",
     0.167
    ],
    [
     "SME26 NAT MY 1000",
     "KALBE MALAYSIA SDN BHD",
     "Radio",
     "Booked",
     "Joe Er",
     0.126
    ],
    [
     "OMNET DEAL-CD 016 POWERLINE SPONSORSHIP 2026",
     "CELCOMDIGI BHD",
     "Radio",
     "Booked",
     "Edmund Ng",
     0.122
    ],
    [
     "3M Scotch Brite - October 2026",
     "Ipg Orion Sdn Bhd (agency)",
     "Radio",
     "Won",
     "Edmund Ng",
     0.108
    ],
    [
     "EUCERIN SPOTLESS BRIGHTENING (RADIO+DIG) AUG-OCT",
     "BEIERSDORF (MALAYSIA) SDN BHD",
     "Radio",
     "Booked",
     "Ashley",
     0.101
    ],
    [
     "OMNET DEAL-3 PAGI ERA SPONSORSHIP 2026",
     "CELCOMDIGI BHD",
     "Radio",
     "Booked",
     "Edmund Ng",
     0.099
    ],
    [
     "3M-SCOTCH BRITE - 3M Q3, RADIO 2026",
     "3M INNOVATION SINGAPORE PTE. LTD",
     "Radio",
     "Booked",
     "Edmund Ng",
     0.094
    ],
    [
     "FOODPANDA X MLD WAVE 9 - AFFORDABILITY 2026",
     "DELIVERY HERO MALAYSIA SDN BHD",
     "TV",
     "Booked",
     "Dayang",
     0.091
    ],
    [
     "PANADOL CAN AWARENESS-SEP'26-OCT'26",
     "GLAXOSMITHKLINE",
     "Radio",
     "Booked",
     "Melanie",
     0.084
    ],
    [
     "SME26 NAT ERA 200",
     "ZUS COMMERCE (M) SDN BHD",
     "Radio",
     "Booked",
     "Hong Cheng",
     0.082
    ],
    [
     "BrandX Spot Buy - Oct",
     "OMD (M) SDN BHD (agency)",
     "TV",
     "Won",
     "Ashley",
     0.078
    ]
   ],
   "bookings": [
    [
     "PREPAID",
     "CELCOMDIGI BHD",
     "TV",
     "Ashley",
     0.664
    ],
    [
     "DENTSU DEAL-CONSIDER IPROSPECT PETRONAS NEWS SPO",
     "PETRONAS DAGANGAN BERHAD",
     "Radio",
     "Melanie",
     0.216
    ],
    [
     "BRAND X",
     "OMD (M) SDN BHD",
     "TV",
     "Ashley",
     0.168
    ],
    [
     "FOODPANDA X MLD WAVE 9 - BRAND EQUITY 2026",
     "DELIVERY HERO MALAYSIA SDN BHD",
     "TV",
     "Dayang",
     0.168
    ],
    [
     "INVENTORY DEAL 3.0-JIWA SME 2026 (ROS XTRA)",
     "TM TECHNOLOGY SERVICES SDN BHD",
     "Radio",
     "Hong Cheng",
     0.167
    ],
    [
     "SME26 NAT MY 1000",
     "KALBE MALAYSIA SDN BHD",
     "Radio",
     "Joe Er",
     0.126
    ],
    [
     "OMNET DEAL-CD 016 POWERLINE SPONSORSHIP 2026",
     "CELCOMDIGI BHD",
     "Radio",
     "Edmund Ng",
     0.122
    ],
    [
     "EUCERIN SPOTLESS BRIGHTENING (RADIO+DIG) AUG-OCT",
     "BEIERSDORF (MALAYSIA) SDN BHD",
     "Radio",
     "Ashley",
     0.101
    ],
    [
     "OMNET DEAL-3 PAGI ERA SPONSORSHIP 2026",
     "CELCOMDIGI BHD",
     "Radio",
     "Edmund Ng",
     0.099
    ],
    [
     "3M-SCOTCH BRITE - 3M Q3, RADIO 2026",
     "3M INNOVATION SINGAPORE PTE. LTD",
     "Radio",
     "Edmund Ng",
     0.094
    ],
    [
     "FOODPANDA X MLD WAVE 9 - AFFORDABILITY 2026",
     "DELIVERY HERO MALAYSIA SDN BHD",
     "TV",
     "Dayang",
     0.091
    ],
    [
     "PANADOL CAN AWARENESS-SEP'26-OCT'26",
     "GLAXOSMITHKLINE",
     "Radio",
     "Melanie",
     0.084
    ],
    [
     "SME26 NAT ERA 200",
     "ZUS COMMERCE (M) SDN BHD",
     "Radio",
     "Hong Cheng",
     0.082
    ],
    [
     "HITZ DRIVE TIME SEGMENT SPONSORSHIP MAY-OCT'26",
     "TM TECHNOLOGY SERVICES SDN BHD",
     "Radio",
     "Hong Cheng",
     0.047
    ],
    [
     "FOODPANDA",
     "DELIVERY HERO MALAYSIA SDN BHD",
     "TV",
     "Dayang",
     0.045
    ],
    [
     "SME26 PEN MELODY 1100",
     "KALBE MALAYSIA SDN BHD",
     "Radio",
     "Joe Er",
     0.045
    ],
    [
     "BBB LAUNCH",
     "CELCOMDIGI BHD",
     "AA",
     "Ashley",
     0.039
    ],
    [
     "GANJARAN RAKSASA - WEEKEND DOMINATION PACKAGE",
     "WATSON'S PERSONAL CARE STORES (M) SDN BH",
     "Radio",
     "Joe Er",
     0.039
    ],
    [
     "AXE & CLEAR SHAMPOO",
     "UNILEVER (M) HOLDINGS SDN BHD",
     "TV",
     "Dayang",
     0.03
    ],
    [
     "SME26 PEN SINAR 100",
     "ZUS COMMERCE (M) SDN BHD",
     "Radio",
     "Hong Cheng",
     0.028
    ],
    [
     "PREPAID - BORNEO RISING 2026",
     "CELCOMDIGI BHD",
     "AA",
     "Ashley",
     0.019
    ],
    [
     "KARA SANTAN CUN CUN JE",
     "KARA MARKETING (M) SDN BHD",
     "Radio",
     "Edmund Ng",
     0.018
    ],
    [
     "SME26 NAT ERA 100",
     "SARAWAK MEDIA GROUP SDN BHD",
     "Radio",
     "Joe Er",
     0.018
    ],
    [
     "INVENTORY DEAL 3.0- OCT INTAKE 2026",
     "UNIVERSITI TELEKOM SDN BHD",
     "Radio",
     "Hong Cheng",
     0.016
    ],
    [
     "OMNET DEAL-BORNEO RISING 2026",
     "CELCOMDIGI BHD",
     "Radio",
     "Ashley",
     0.015
    ],
    [
     "SME26 GEGAR 200",
     "ZUS COMMERCE (M) SDN BHD",
     "Radio",
     "Hong Cheng",
     0.015
    ],
    [
     "FA26 PEN LITE 800",
     "HERBAL REVIVAL SDN BHD",
     "Radio",
     "Joe Er",
     0.013
    ],
    [
     "INVENTORY DEAL 3.0-JIWA SME 2026",
     "TM TECHNOLOGY SERVICES SDN BHD",
     "Radio",
     "Hong Cheng",
     0.01
    ],
    [
     "SME26 PEN MELODY 160",
     "HERBALCEUTICAL (M) SDN BHD",
     "Radio",
     "Joe Er",
     0.007
    ],
    [
     "Kara Santan x Fandom Package 2026",
     "KARA MARKETING (M) SDN BHD",
     "Digital",
     "Edmund Ng",
     0.007
    ],
    [
     "NCT LAND - PROPERTY",
     "NCT LAND SDN BHD",
     "TV",
     "Joe Er",
     0.007
    ],
    [
     "OGAWA",
     "HEALTHY WORLD LIFESTYLE SDN BHD",
     "TV",
     "Joe Er",
     0.007
    ],
    [
     "YAKIN AMBASSADORS LAUNCHING EVENT",
     "YAKIN MEDIC SDN BHD",
     "TV",
     "Joe Er",
     0.007
    ],
    [
     "YAKIN MEDIC",
     "YAKIN MEDIC SDN BHD",
     "TV",
     "Joe Er",
     0.007
    ],
    [
     "ASTRO CLASSIC GOLDEN MELODY 2026 - SPONSORSHIP C",
     "HERBALCEUTICAL (M) SDN BHD",
     "Radio",
     "Joe Er",
     0.006
    ],
    [
     "TM X JIWA SME 2026",
     "TM TECHNOLOGY SERVICES SDN BHD",
     "Digital",
     "Hong Cheng",
     0.006
    ],
    [
     "TM UNIFI X UNIFI DRIVE ON HITZ MAY - OCT'26",
     "TM TECHNOLOGY SERVICES SDN BHD",
     "Digital",
     "Hong Cheng",
     0.005
    ],
    [
     "SME26 PEN GOXUAN 300",
     "HERBALCEUTICAL (M) SDN BHD",
     "Radio",
     "Joe Er",
     0.004
    ],
    [
     "ASTRO RADIO NEWS UPDATES SEGMENT SPONSORSHIP (H2",
     "PETRONAS DAGANGAN BERHAD",
     "Digital",
     "Melanie",
     0.004
    ],
    [
     "Q426 TBD1",
     "OMD (M) SDN BHD",
     "Digital",
     "Ashley",
     0.003
    ],
    [
     "SME26 PEN MELODY 140",
     "HERBALCEUTICAL (M) SDN BHD",
     "Radio",
     "Joe Er",
     0.003
    ],
    [
     "GOLD 5X - CP-02151305 MALAY",
     "FONTERRA BRAND (M) SDN BHD",
     "AA",
     "Melanie",
     0.001
    ],
    [
     "GOLD 5X - CP-02151305 CHINESE",
     "FONTERRA BRAND (M) SDN BHD",
     "AA",
     "Melanie",
     0.001
    ],
    [
     "Pakej Hujung Minggu-Watsons 11.11- migrate from",
     "WATSON'S PERSONAL CARE STORES (M) SDN BH",
     "Digital",
     "Joe Er",
     0.001
    ],
    [
     "Watson's 45+ Weekend Domination",
     "WATSON'S PERSONAL CARE STORES (M) SDN BH",
     "Digital",
     "Joe Er",
     0.001
    ],
    [
     "SEPAK TAKRAW LEAGUE'26",
     "CELCOMDIGI BHD",
     "AA",
     "Ashley",
     0.0
    ],
    [
     "WPP Media-TM-AEC Prime Talk Sponsorship-Oct-Nov'",
     "TM TECHNOLOGY SERVICES SDN BHD",
     "Digital",
     "Hong Cheng",
     0.0
    ]
   ]
  },
  "siokchin": {
   "rows": [
    {
     "id": "Henry",
     "n": "Henry",
     "full": "ONG, Chi Herng",
     "kind": "exec",
     "mgr": null,
     "cells": [
      [
       26,
       26,
       0.864
      ],
      [
       10,
       10,
       0.667
      ],
      [
       12,
       12,
       0.967
      ],
      [
       0,
       0,
       0.745
      ]
     ],
     "f": 0.4,
     "g": -2.8
    },
    {
     "id": "Yuki",
     "n": "Yuki",
     "full": "LOOI, Yun Yi [Yuki]",
     "kind": "exec",
     "mgr": null,
     "cells": [
      [
       78,
       79,
       0.576
      ],
      [
       12,
       13,
       0.849
      ],
      [
       41,
       41,
       0.677
      ],
      [
       21,
       21,
       0.717
      ]
     ],
     "f": 0.98,
     "g": -1.8
    },
    {
     "id": "Yoke Saan",
     "n": "Yoke Saan",
     "full": "WONG, Yoke Saan",
     "kind": "exec",
     "mgr": null,
     "cells": [
      [
       109,
       109,
       0.518
      ],
      [
       1,
       8,
       0.849
      ],
      [
       1,
       1,
       0.613
      ],
      [
       8,
       8,
       0.717
      ]
     ],
     "f": 0.637,
     "g": -2.1
    },
    {
     "id": "Annabel",
     "n": "Annabel",
     "full": "LEE, Joe Lynn [Annabel]",
     "kind": "exec",
     "mgr": null,
     "cells": [
      null,
      [
       0,
       0,
       0.667
      ],
      [
       0,
       0,
       0.967
      ],
      [
       0,
       0,
       0.688
      ]
     ],
     "f": 0.0,
     "g": -2.3,
     "offChart": true
    },
    {
     "id": "Justin",
     "n": "Justin",
     "full": "TAN, Justin",
     "kind": "exec",
     "mgr": null,
     "cells": [
      [
       18,
       18,
       0.921
      ],
      {
       "f": 0.012,
       "c": 0.012
      },
      null,
      null
     ],
     "f": 0.182,
     "g": -0.739,
     "offChart": true
    },
    {
     "id": "Not yet mapped",
     "n": "Not yet mapped",
     "full": "Not yet mapped to a person",
     "kind": "unmapped",
     "mgr": null,
     "cells": [
      {
       "f": 0.234,
       "c": 0.234
      },
      {
       "f": 0.222,
       "c": 0.222
      },
      {
       "f": 0.222,
       "c": 0.222
      },
      null
     ],
     "f": 0.678,
     "g": null,
     "note": "Revenue not yet in the name mapping · KOK, Yoong Wei [Stephanie]"
    }
   ],
   "total": {
    "cells": [
     [
      57,
      57,
      2.9
     ],
     [
      14,
      16,
      3.0
     ],
     [
      19,
      19,
      3.2
     ],
     [
      7,
      7,
      2.9
     ]
    ],
    "f": 2.9,
    "g": -9.1
   },
   "open": [
    [
     "MY FM LUNCH ON YOU WITH LEE KUM KEE",
     "MAHSURI DAGANG SDN …",
     "Digital + Radio",
     "80%",
     "Yuki",
     {
      "Oct": 0.016,
      "Nov": 0.026
     }
    ]
   ],
   "bank": [
    [
     "WA 016 2026 SPONSORSHIP",
     "CELCOMDIGI BHD",
     "Radio",
     "Won",
     "—",
     [
      0.222,
      0.222,
      0.222,
      null
     ],
     0.666
    ],
    [
     "JOY PARADISE X MYFM BIG SHOW (21 SEPT - 1 NOV 20",
     "JOY PARAD…",
     "Radio",
     "Booked",
     "Yoke Saan",
     [
      0.133,
      0.007,
      null,
      null
     ],
     0.14
    ],
    [
     "POSTPAID & PREPAID - UMOBILE ULTRA5G REVAMP BRAN",
     "U MOB…",
     "TV",
     "Booked",
     "Henry",
     [
      0.097,
      0.019,
      null,
      null
     ],
     0.117
    ],
    [
     "INDAH WATER MELODY MIX SINAR (AUG - DEC 2026)",
     "INDAH WATE…",
     "Radio",
     "Booked",
     "Yuki",
     [
      0.038,
      0.042,
      0.034,
      null
     ],
     0.115
    ],
    [
     "COWAY LAUNDRY GROUP CAMPAIGN",
     "COWAY (M) SDN BHD",
     "TV",
     "Booked",
     "Justin",
     [
      0.093,
      0.012,
      null,
      null
     ],
     0.105
    ],
    [
     "SMEVAGANZA26_VORTEXIN HIPP",
     "VORTEXIN SDN BHD",
     "Radio",
     "Won",
     "Yuki",
     [
      null,
      null,
      null,
      0.102
     ],
     0.102
    ],
    [
     "SMEVAGANZA26_POWERPETS FOOD SDN BHD",
     "POWERPETS FOOD S…",
     "Radio",
     "Won",
     "Yuki",
     [
      null,
      null,
      0.076,
      null
     ],
     0.076
    ],
    [
     "SMEVAGANZA26_MUTUAL EMPIRE SDN BHD",
     "MUTURE EMPIRE SDN BHD",
     "TV",
     "Won",
     "Yuki",
     [
      0.075,
      null,
      null,
      null
     ],
     0.075
    ],
    [
     "AEON MOTOGP TIX GIVEAWAY (ERA & SINAR) (SEPT - N",
     "AEON CR…",
     "Radio",
     "Booked",
     "Yuki",
     [
      0.071,
      null,
      null,
      null
     ],
     0.071
    ],
    [
     "SJPP MIX CHAT TO CHAT & SEGMENT SPONSORSHIP 5 OC",
     "SYARIK…",
     "Radio",
     "Booked",
     "Yuki",
     [
      0.063,
      0.007,
      null,
      null
     ],
     0.07
    ],
    [
     "BIKERS CARD",
     "AEON CREDIT SERVICE (M) BERHAD",
     "TV",
     "Booked",
     "Yuki",
     [
      0.034,
      0.034,
      null,
      null
     ],
     0.068
    ],
    [
     "BIO OIL",
     "NUVANTA SDN BHD",
     "TV",
     "Booked",
     "Henry",
     [
      0.022,
      0.022,
      0.022,
      null
     ],
     0.067
    ],
    [
     "HN MASSIVE HOME UPGRADE SALE (GROUP A-HA/AV,C&C",
     "ELITET…",
     "Radio",
     "Booked",
     "Yoke Saan",
     [
      0.064,
      null,
      null,
      null
     ],
     0.064
    ],
    [
     "SMEVAGANZA26_PY HEALTHCARE",
     "PY HEALTHCARE SDN BHD",
     "Radio",
     "Won",
     "Yoke Saan",
     [
      null,
      null,
      null,
      0.058
     ],
     0.058
    ],
    [
     "SME UPFRONT 26 REG MY CE",
     "AGENSI PEKERJAAN ETERNITY SDN BHD",
     "Radio",
     "Won",
     "Henry",
     [
      null,
      null,
      0.049,
      null
     ],
     0.049
    ]
   ],
   "bankOct": [
    [
     "WA 016 2026 SPONSORSHIP",
     "CELCOMDIGI BHD",
     "Radio",
     "Won",
     "—",
     0.222
    ],
    [
     "JOY PARADISE X MYFM BIG SHOW (21 SEPT - 1 NOV 20",
     "JOY PARADISE HOLIDAYS SDN BHD",
     "Radio",
     "Booked",
     "Yoke Saan",
     0.133
    ],
    [
     "POSTPAID & PREPAID - UMOBILE ULTRA5G REVAMP BRAN",
     "U MOBILE SDN BHD",
     "TV",
     "Booked",
     "Henry",
     0.097
    ],
    [
     "COWAY LAUNDRY GROUP CAMPAIGN",
     "COWAY (M) SDN BHD",
     "TV",
     "Booked",
     "Justin",
     0.093
    ],
    [
     "SMEVAGANZA26_MUTUAL EMPIRE SDN BHD",
     "MUTURE EMPIRE SDN BHD",
     "TV",
     "Won",
     "Yuki",
     0.075
    ],
    [
     "AEON MOTOGP TIX GIVEAWAY (ERA & SINAR) (SEPT - N",
     "AEON CREDIT SERVICE (M) BERHAD",
     "Radio",
     "Booked",
     "Yuki",
     0.071
    ],
    [
     "HN MASSIVE HOME UPGRADE SALE (GROUP A-HA/AV,C&C",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Booked",
     "Yoke Saan",
     0.064
    ],
    [
     "SJPP MIX CHAT TO CHAT & SEGMENT SPONSORSHIP 5 OC",
     "SYARIKAT JAMINAN PEMBIAYAAN PERNIAGAAN B",
     "Radio",
     "Booked",
     "Yuki",
     0.063
    ],
    [
     "NOVAMIL KID'S FORMULA MILK AWARENESS CAMPAIGN (O",
     "DELFI MARKETING SDN BHD",
     "Radio",
     "Booked",
     "Yoke Saan",
     0.049
    ],
    [
     "MAH SING HOUSING PROPERTY",
     "MAH SING GROUP BERHAD",
     "TV",
     "Booked",
     "Justin",
     0.048
    ],
    [
     "SMEVAGANZA26_CARING PHARMACY AUG 2026",
     "CARING PHARMACY",
     "Digital + Radio",
     "Won",
     "Yuki",
     0.048
    ],
    [
     "IPSERVERONE RADIO COMMERCIAL (AUG - DEC 2026)",
     "IP SERVERONE SOLUTIONS SDN BHD",
     "Radio",
     "Booked",
     "Yoke Saan",
     0.042
    ],
    [
     "HN MASSIVE HOME UPGRADE SALE (GROUP B-FUR,SA) 12",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Booked",
     "Yoke Saan",
     0.04
    ],
    [
     "INDAH WATER MELODY MIX SINAR (AUG - DEC 2026)",
     "INDAH WATER KONSORTIUM SDN BHD",
     "Radio",
     "Booked",
     "Yuki",
     0.038
    ],
    [
     "HN [FACTORY OUTLET] UNBEATABLE DEALS SALE 1-26 O",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Booked",
     "Yoke Saan",
     0.034
    ]
   ],
   "bookings": [
    [
     "JOY PARADISE X MYFM BIG SHOW (21 SEPT - 1 NOV 20",
     "JOY PARADISE HOLIDAYS SDN BHD",
     "Radio",
     "Yoke Saan",
     0.133
    ],
    [
     "POSTPAID & PREPAID - UMOBILE ULTRA5G REVAMP BRAN",
     "U MOBILE SDN BHD",
     "TV",
     "Henry",
     0.097
    ],
    [
     "COWAY LAUNDRY GROUP CAMPAIGN",
     "COWAY (M) SDN BHD",
     "TV",
     "Justin",
     0.093
    ],
    [
     "AEON MOTOGP TIX GIVEAWAY (ERA & SINAR) (SEPT - N",
     "AEON CREDIT SERVICE (M) BERHAD",
     "Radio",
     "Yuki",
     0.071
    ],
    [
     "HN MASSIVE HOME UPGRADE SALE (GROUP A-HA/AV,C&C",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.064
    ],
    [
     "SJPP MIX CHAT TO CHAT & SEGMENT SPONSORSHIP 5 OC",
     "SYARIKAT JAMINAN PEMBIAYAAN PERNIAGAAN B",
     "Radio",
     "Yuki",
     0.063
    ],
    [
     "NOVAMIL KID'S FORMULA MILK AWARENESS CAMPAIGN (O",
     "DELFI MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.049
    ],
    [
     "MAH SING HOUSING PROPERTY",
     "MAH SING GROUP BERHAD",
     "TV",
     "Justin",
     0.048
    ],
    [
     "IPSERVERONE RADIO COMMERCIAL (AUG - DEC 2026)",
     "IP SERVERONE SOLUTIONS SDN BHD",
     "Radio",
     "Yoke Saan",
     0.042
    ],
    [
     "HN MASSIVE HOME UPGRADE SALE (GROUP B-FUR,SA) 12",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.04
    ],
    [
     "INDAH WATER MELODY MIX SINAR (AUG - DEC 2026)",
     "INDAH WATER KONSORTIUM SDN BHD",
     "Radio",
     "Yuki",
     0.038
    ],
    [
     "HN [FACTORY OUTLET] UNBEATABLE DEALS SALE 1-26 O",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.034
    ],
    [
     "BIKERS CARD",
     "AEON CREDIT SERVICE (M) BERHAD",
     "TV",
     "Yuki",
     0.034
    ],
    [
     "FOODPANDA MLD WILD 9 - AFFORDABILITY 2026",
     "DELIVERY HERO MALAYSIA SDN BHD",
     "TV",
     "Justin",
     0.028
    ],
    [
     "HN [CENTRAL] COALFIELDS GRAND OPENING SALE 1-12",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.028
    ],
    [
     "MELODY MORNING SHOW WITH WEON (2-29 OCT 2026)",
     "NEUCLEUS CONSULTING GROUP SDN BHD",
     "Radio",
     "Yoke Saan",
     0.024
    ],
    [
     "SME26 PEN ERA 300 (JUNE - OCT 2026)",
     "HUASIN FOOD MANUFACTURING SDN BHD",
     "Radio",
     "Yuki",
     0.024
    ],
    [
     "BIO OIL",
     "NUVANTA SDN BHD",
     "TV",
     "Henry",
     0.022
    ],
    [
     "HN 10.10 COMES EARLY SALE (GROUP A-HA/AV,C&C & B",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.022
    ],
    [
     "SJPP - JIWA SME 2026",
     "SYARIKAT JAMINAN PEMBIAYAAN PERNIAGAAN B",
     "TV",
     "Yuki",
     0.021
    ],
    [
     "HN [CENTRAL] THE BIG 2ND ANNIVERSARY CELEBRATION",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.019
    ],
    [
     "NESCAFE GOLD - MASTERBRAND COMM",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Henry",
     0.016
    ],
    [
     "AN XIN MEAT SHOPPE (28 SEPT - 27 OCT 2206)",
     "AN XIN'S HEALTHY MEAT SHOPPE",
     "Radio",
     "Yoke Saan",
     0.015
    ],
    [
     "SME26 PEN MELODY 1000 (AUG 2026 - JAN 2027)",
     "LIFE FACTOR SDN BHD",
     "Radio",
     "Yoke Saan",
     0.015
    ],
    [
     "SME26 PEN MIX 100",
     "ABOUT KUCHING SDN BHD",
     "Radio",
     "Yuki",
     0.014
    ],
    [
     "HN [NORTHERN] GURNEY PLAZA PHASE 2 OPENING 29-31",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.013
    ],
    [
     "HN 10.10 COMES EARLY SALE (GROUP B-FUR, SA) 5-11",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.012
    ],
    [
     "SME26 PEN MIX 100",
     "B-CROBES MARKETING (M) SDN BHD",
     "Radio",
     "Yuki",
     0.012
    ],
    [
     "NIVEA Pickleball-Deo Female Skin Hero x Astro Ra",
     "BEIERSDORF (MALAYSIA) SDN BHD",
     "Digital",
     "—",
     0.011
    ],
    [
     "HN [NORTHERN] PENANG 1 WEEK ONLY IN-STORE WAREHO",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.011
    ],
    [
     "MOTORGP SPONSORSHIP",
     "AEON CREDIT SERVICE (M) BERHAD",
     "AA",
     "Yuki",
     0.01
    ],
    [
     "NH X Classic Golden Melody",
     "HERBALCEUTICAL (M) SDN BHD",
     "Digital",
     "Henry",
     0.01
    ],
    [
     "GO XUAN RISING HOUR-OCT'26-JAN'27",
     "HERBALCEUTICAL (M) SDN BHD",
     "Radio",
     "Henry",
     0.009
    ],
    [
     "REJOICE",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Henry",
     0.009
    ],
    [
     "HAED & SHOULDER",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Henry",
     0.009
    ],
    [
     "HN [FACTORY OUTLET] 10.10 WAREHOUSE SALE 8-11 OC",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.008
    ],
    [
     "FEBREZE BASE",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Henry",
     0.008
    ],
    [
     "HN'S NO GIMMICK, JUST THE BEST PRICES (GROUP A-H",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.007
    ],
    [
     "HN [FACTORY OUTLET] EVERYTHING MUST GO SALE 29-3",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.007
    ],
    [
     "HN'S RACE DAY DEALS (GROUP B-FUR, SA) 2-4 OCT'26",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.007
    ],
    [
     "HN RACE DAY DEALS (GROUP A-HA/AV,C&C & BED) 2-4",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.007
    ],
    [
     "NH NUTRI GRAINS",
     "HERBALCEUTICAL (M) SDN BHD",
     "TV",
     "Henry",
     0.007
    ],
    [
     "ROS XTRA_INDAH WATER_GEGAR 2026",
     "INDAH WATER KONSORTIUM SDN BHD",
     "Radio",
     "Yuki",
     0.007
    ],
    [
     "SJPP X MIX CHAT TO CHAT & SEGMENT SPONSORSHIP",
     "SYARIKAT JAMINAN PEMBIAYAAN PERNIAGAAN B",
     "Digital",
     "Yuki",
     0.006
    ],
    [
     "DIRIGO EVENT KLSC RUN (25 SEPT - 2 OCT 2026)",
     "DIRIGO EVENTS SDN BHD",
     "Radio",
     "Yuki",
     0.006
    ],
    [
     "DOWNY D2C WIBC MOR",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Henry",
     0.006
    ],
    [
     "DOWNY D2C WIBC VALUE",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Henry",
     0.005
    ],
    [
     "KIT KAT - EQUITY SUSTENANCE",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Henry",
     0.005
    ],
    [
     "MAGGI 2 MINUTES NOODLE - SAB THEMATIC",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Henry",
     0.005
    ],
    [
     "DOWNY D2C WIBC LLF",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Henry",
     0.005
    ],
    [
     "AMBI PUR HOME",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Henry",
     0.005
    ],
    [
     "SJPP X JIWA SEWA",
     "SYARIKAT JAMINAN PEMBIAYAAN PERNIAGAAN B",
     "Digital",
     "Yuki",
     0.004
    ],
    [
     "JOY PARADISE X MYFM BIG SHOW (31 AUG - 1 NOV 202",
     "JOY PARADISE HOLIDAYS SDN BHD",
     "Digital",
     "Yoke Saan",
     0.004
    ],
    [
     "GOOGLE PIXEL X KITA FM CO SPONSOR",
     "VSTECS ASTAR SDN BHD",
     "Digital",
     "Yuki",
     0.003
    ],
    [
     "HN NO GIMMIK, JUST THE BEST PRICES (GROUP B-FUR,",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.002
    ],
    [
     "CLASSIC GOLDEN MELODY SPONSORSHIP 2026",
     "HERBALCEUTICAL (M) SDN BHD",
     "AA",
     "Henry",
     0.002
    ],
    [
     "MAGGI SERVICE PILLAR - ME & MAGGI SO GOOD TOGETH",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Henry",
     0.002
    ],
    [
     "CARING PHARMACY BARTER DEAL (SEPT - GEMPAK MY MI",
     "CARING PHARMACY RETAIL MANAGEMENT SDN BH",
     "Digital",
     "Yuki",
     0.002
    ],
    [
     "SERBA WANGI X JATI CHOM CHOM NATIONAL COLOURING",
     "SERBA WANGI SDN BHD",
     "Radio",
     "Yoke Saan",
     0.001
    ],
    [
     "HN [SARAWAK] WOW SALE 8-12 OCT'26",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.001
    ],
    [
     "NEUCLEUS CONSULTING X MELODY MORNING SHOW WITH W",
     "Neucleus Consulting Group Sdn Bhd",
     "Digital",
     "Yoke Saan",
     0.0
    ]
   ]
  },
  "kavin": {
   "rows": [
    {
     "id": "Pushpa",
     "n": "Pushpa",
     "full": "SUBRAMANIAM, Pushpa Nathan",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       55,
       55,
       1.9
      ],
      [
       17,
       17,
       2.0
      ],
      [
       8,
       8,
       2.2
      ],
      [
       5,
       5,
       1.9
      ]
     ],
     "f": 1.7,
     "g": -6.3
    },
    {
     "id": "Kirabassri",
     "n": "Kirabassri",
     "full": "SIVANESON, Kirabassri",
     "kind": "exec",
     "mgr": "Pushpa",
     "cells": [
      [
       50,
       50,
       0.497
      ],
      [
       13,
       13,
       0.621
      ],
      [
       7,
       7,
       0.516
      ],
      [
       0,
       0,
       0.454
      ]
     ],
     "f": 0.363,
     "g": -1.7
    },
    {
     "id": "Rhesimalar",
     "n": "Rhesimalar",
     "full": "RAVI, Rhesimalar",
     "kind": "exec",
     "mgr": "Pushpa",
     "cells": [
      [
       50,
       50,
       0.514
      ],
      [
       23,
       23,
       0.468
      ],
      [
       20,
       20,
       0.49
      ],
      [
       15,
       15,
       0.528
      ]
     ],
     "f": 0.544,
     "g": -1.5
    },
    {
     "id": "Yulesha",
     "n": "Yulesha",
     "full": "PREMA KUMARAN, Yulesha",
     "kind": "exec",
     "mgr": "Pushpa",
     "cells": [
      [
       64,
       64,
       0.466
      ],
      [
       30,
       30,
       0.407
      ],
      [
       2,
       2,
       0.633
      ],
      [
       1,
       1,
       0.483
      ]
     ],
     "f": 0.439,
     "g": -1.5
    },
    {
     "id": "Pravinn",
     "n": "Pravinn",
     "full": "KUPPUSAMY, Prravinn",
     "kind": "exec",
     "mgr": "Pushpa",
     "cells": [
      [
       58,
       58,
       0.446
      ],
      [
       8,
       8,
       0.528
      ],
      [
       5,
       5,
       0.515
      ],
      [
       2,
       2,
       0.448
      ]
     ],
     "f": 0.335,
     "g": -1.6
    }
   ],
   "total": {
    "cells": [
     [
      55,
      55,
      1.9
     ],
     [
      17,
      17,
      2.0
     ],
     [
      8,
      8,
      2.2
     ],
     [
      5,
      5,
      1.9
     ]
    ],
    "f": 1.7,
    "g": -6.3
   },
   "open": [],
   "bank": [
    [
     "TOYOTA DEEPAVALI 2026",
     "UMW TOYOTA MOTOR SDN BHD",
     "Radio",
     "Booked",
     "Yulesha",
     [
      0.039,
      0.025,
      null,
      null
     ],
     0.064
    ],
    [
     "FA26 PEN RAAGA 1800",
     "MITRAALAYAA VENTURES",
     "Radio",
     "Booked",
     "Kirabassri",
     [
      0.055,
      0.001,
      null,
      null
     ],
     0.057
    ],
    [
     "FERNLEAF FCMP",
     "FONTERRA BRANDS (M) SDN BHD",
     "TV",
     "Booked",
     "Kirabassri",
     [
      0.018,
      0.018,
      0.018,
      null
     ],
     0.054
    ],
    [
     "NEEM ACTIVE TOOTHPASTE PROMO-OCT'26-NOV'26 (SPOT",
     "JYOT…",
     "Radio",
     "Booked",
     "Yulesha",
     [
      0.022,
      0.028,
      null,
      null
     ],
     0.05
    ],
    [
     "SME26 PEN RAAGA 600",
     "ARTIZZ FOOD AND BEVERAGES SDN BHD",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      0.013,
      0.011,
      0.014,
      0.011
     ],
     0.049
    ],
    [
     "FA26 PEN RAAGA 600",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Kirabassri",
     [
      0.02,
      0.011,
      0.011,
      0.002
     ],
     0.044
    ],
    [
     "SME26 PEN RAAGA 800",
     "RAVIRAJ SDN BHD",
     "Radio",
     "Booked",
     "Yulesha",
     [
      0.035,
      0.005,
      null,
      null
     ],
     0.04
    ],
    [
     "SME26 PEN RAAGA 600",
     "HAIR ASIAN COSMETIC MANUFACTURING SDN BH",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      0.001,
      0.002,
      0.022,
      0.014
     ],
     0.039
    ],
    [
     "RAAGA WEEKDAY 6AM-10AM WITH JOTHI IMPEX (10/11/2",
     "JOTHI I…",
     "Radio",
     "Booked",
     "Pravinn",
     [
      0.032,
      0.007,
      null,
      null
     ],
     0.039
    ],
    [
     "SME26 PEN RAAGA 400",
     "PRIMA ASIA SDN BHD",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      0.01,
      0.004,
      0.014,
      0.009
     ],
     0.037
    ],
    [
     "WEATHER FORECAST DBKL 2026-RAAGA",
     "DEWAN BANDARAYA KUALA …",
     "Radio",
     "Booked",
     "Pravinn",
     [
      0.01,
      0.009,
      0.009,
      0.009
     ],
     0.037
    ],
    [
     "SME26 PEN RAAGA 500",
     "STAR MAAS MARKETING",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      0.011,
      0.009,
      0.011,
      0.006
     ],
     0.036
    ],
    [
     "RAAGA BULKBUY 5000 (2026)",
     "SYARIKAT SRI MURUGAN TRADING AGENC…",
     "Radio",
     "Booked",
     "Kirabassri",
     [
      0.026,
      0.01,
      null,
      null
     ],
     0.036
    ],
    [
     "SME26 PEN RAAGA 500",
     "VAISHNAV RESOURCES SDN BHD",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      0.011,
      0.024,
      null,
      null
     ],
     0.035
    ],
    [
     "SME26 PEN RAAGA 600",
     "SWAMI SIVANADHA HERBAL (M) SDN BHD",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      0.008,
      0.007,
      0.007,
      0.011
     ],
     0.034
    ]
   ],
   "bankOct": [
    [
     "FA26 PEN RAAGA 1800",
     "MITRAALAYAA VENTURES",
     "Radio",
     "Booked",
     "Kirabassri",
     0.055
    ],
    [
     "TOYOTA DEEPAVALI 2026",
     "UMW TOYOTA MOTOR SDN BHD",
     "Radio",
     "Booked",
     "Yulesha",
     0.039
    ],
    [
     "SME26 PEN RAAGA 800",
     "RAVIRAJ SDN BHD",
     "Radio",
     "Booked",
     "Yulesha",
     0.035
    ],
    [
     "HYPERMAALAI 4PM - 8PM WITH UNITAR [7/9/2026 - 27",
     "UNITAR CAPITAL SDN BHD",
     "Radio",
     "Booked",
     "Kirabassri",
     0.033
    ],
    [
     "RAAGA WEEKDAY 6AM-10AM WITH JOTHI IMPEX (10/11/2",
     "JOTHI IMPEX SDN BHD",
     "Radio",
     "Booked",
     "Pravinn",
     0.032
    ],
    [
     "RAAGA BULKBUY 5000 (2026)",
     "SYARIKAT SRI MURUGAN TRADING AGENCY SDN",
     "Radio",
     "Booked",
     "Kirabassri",
     0.026
    ],
    [
     "LALAMOVE X RAAGA DEEPAVALI NHTU (5/10/26-30/10/2",
     "LALAMOVE MALAYSIA SDN BHD",
     "Radio",
     "Booked",
     "Pravinn",
     0.026
    ],
    [
     "JOTHI IMPEX SHAN MASALA - COOKING CAPSULES (9/9/",
     "JOTHI IMPEX SDN BHD",
     "Radio",
     "Booked",
     "Rhesimalar",
     0.024
    ],
    [
     "SME26 PEN RAAGA 500",
     "BOMBAY BAZAAR",
     "Radio",
     "Booked",
     "Pravinn",
     0.024
    ],
    [
     "RAAGA BULKBUY 4000 (2025)",
     "GM KUMARANS WHOLESALE KLANG",
     "Radio",
     "Booked",
     "Pravinn",
     0.023
    ],
    [
     "SME26 PEN RAAGA 400",
     "DATTA SHREE SDN BHD",
     "Radio",
     "Booked",
     "Rhesimalar",
     0.023
    ],
    [
     "NEEM ACTIVE TOOTHPASTE PROMO-OCT'26-NOV'26 (SPOT",
     "JYOTHY LABS LIMITED",
     "Radio",
     "Booked",
     "Yulesha",
     0.022
    ],
    [
     "RAAGA CAMPUS KATHAIGAL WITH MAHSA UNIVERSITY",
     "MALAYSIAN ALLIED HEALTH SCIENCES ACADEMY",
     "Radio",
     "Booked",
     "Rhesimalar",
     0.021
    ],
    [
     "FA26 PEN RAAGA 600",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Kirabassri",
     0.02
    ],
    [
     "SME26 PEN RAAGA 600",
     "SRI JAYA IMPEX SDN BHD",
     "Radio",
     "Booked",
     "Kirabassri",
     0.019
    ]
   ],
   "bookings": [
    [
     "FA26 PEN RAAGA 1800",
     "MITRAALAYAA VENTURES",
     "Radio",
     "Kirabassri",
     0.055
    ],
    [
     "TOYOTA DEEPAVALI 2026",
     "UMW TOYOTA MOTOR SDN BHD",
     "Radio",
     "Yulesha",
     0.039
    ],
    [
     "SME26 PEN RAAGA 800",
     "RAVIRAJ SDN BHD",
     "Radio",
     "Yulesha",
     0.035
    ],
    [
     "HYPERMAALAI 4PM - 8PM WITH UNITAR [7/9/2026 - 27",
     "UNITAR CAPITAL SDN BHD",
     "Radio",
     "Kirabassri",
     0.033
    ],
    [
     "RAAGA WEEKDAY 6AM-10AM WITH JOTHI IMPEX (10/11/2",
     "JOTHI IMPEX SDN BHD",
     "Radio",
     "Pravinn",
     0.032
    ],
    [
     "RAAGA BULKBUY 5000 (2026)",
     "SYARIKAT SRI MURUGAN TRADING AGENCY SDN",
     "Radio",
     "Kirabassri",
     0.026
    ],
    [
     "LALAMOVE X RAAGA DEEPAVALI NHTU (5/10/26-30/10/2",
     "LALAMOVE MALAYSIA SDN BHD",
     "Radio",
     "Pravinn",
     0.026
    ],
    [
     "JOTHI IMPEX SHAN MASALA - COOKING CAPSULES (9/9/",
     "JOTHI IMPEX SDN BHD",
     "Radio",
     "Rhesimalar",
     0.024
    ],
    [
     "SME26 PEN RAAGA 500",
     "BOMBAY BAZAAR",
     "Radio",
     "Pravinn",
     0.024
    ],
    [
     "RAAGA BULKBUY 4000 (2025)",
     "GM KUMARANS WHOLESALE KLANG",
     "Radio",
     "Pravinn",
     0.023
    ],
    [
     "SME26 PEN RAAGA 400",
     "DATTA SHREE SDN BHD",
     "Radio",
     "Rhesimalar",
     0.023
    ],
    [
     "NEEM ACTIVE TOOTHPASTE PROMO-OCT'26-NOV'26 (SPOT",
     "JYOTHY LABS LIMITED",
     "Radio",
     "Yulesha",
     0.022
    ],
    [
     "RAAGA CAMPUS KATHAIGAL WITH MAHSA UNIVERSITY",
     "MALAYSIAN ALLIED HEALTH SCIENCES ACADEMY",
     "Radio",
     "Rhesimalar",
     0.021
    ],
    [
     "FA26 PEN RAAGA 600",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Kirabassri",
     0.02
    ],
    [
     "SME26 PEN RAAGA 600",
     "SRI JAYA IMPEX SDN BHD",
     "Radio",
     "Kirabassri",
     0.019
    ],
    [
     "ROS X'TRA RISE HUB VENTURES (24/9/2026 - 17/10/2",
     "RISE HUB VENTURES",
     "Radio",
     "Yulesha",
     0.018
    ],
    [
     "VANAKKAM RAAGA (WEEKDAY, 10AM-1PM) WITH MAPS ENT",
     "MAPS ENTERPRISE SDN BHD",
     "Radio",
     "Yulesha",
     0.018
    ],
    [
     "RAAGA INNIKI ENNA KATHE WITH MADANIKAS (3/8/26 -",
     "3D FASHION EMPIRE",
     "Radio",
     "Kirabassri",
     0.018
    ],
    [
     "FERNLEAF FCMP",
     "FONTERRA BRANDS (M) SDN BHD",
     "TV",
     "Kirabassri",
     0.018
    ],
    [
     "MYDIN X RAAGA CSR (8/10/26-30/10/26)",
     "MYDIN MOHAMED HOLDINGS BHD",
     "Radio",
     "Pravinn",
     0.018
    ],
    [
     "RAAGA WEEKEND 10AM-10PM WITH G GALAXY TRADERS (2",
     "G GALAXY TRADERS",
     "Radio",
     "Rhesimalar",
     0.017
    ],
    [
     "RAAGA BULKBUY 5000 (2025)",
     "MALABAR GOLD & DIAMOND SDN BHD",
     "Radio",
     "Pravinn",
     0.016
    ],
    [
     "LIVING BRAINS COMMITMENT (AUG 2026 - JAN 2027)",
     "DUVINN SDN BHD",
     "Radio",
     "Yulesha",
     0.016
    ],
    [
     "SME26 PEN RAAGA 200",
     "ALAGAPPAS FLOUR MILLS SDN BHD",
     "Radio",
     "Rhesimalar",
     0.015
    ],
    [
     "SME26 PEN RAAGA 400",
     "PANCHA PRODUCTS SDN BHD",
     "Radio",
     "Yulesha",
     0.015
    ],
    [
     "SME26 PEN RAAGA 500",
     "G.L.R ENTERPRISE",
     "Radio",
     "Rhesimalar",
     0.015
    ],
    [
     "SME26 PEN RAAGA 1000",
     "MALIK STREAMS CORPORATION SDN BHD",
     "Radio",
     "Yulesha",
     0.014
    ],
    [
     "RAAGA WEEKEND SEGMENT 4PM-8PM WITH MAJU IMPEX (2",
     "MAJU IMPEX ENTERPRISE",
     "Radio",
     "Pravinn",
     0.014
    ],
    [
     "SME26 PEN RAAGA 200",
     "GEMINI D WAVE (M) SDN BHD",
     "Radio",
     "Rhesimalar",
     0.013
    ],
    [
     "NEEM ACTIVE TOOTHPASTE PROMO-OCT'26-NOV'26",
     "JYOTHY LABS LIMITED",
     "Radio",
     "Yulesha",
     0.013
    ],
    [
     "SME26 PEN RAAGA 600",
     "ARTIZZ FOOD AND BEVERAGES SDN BHD",
     "Radio",
     "Rhesimalar",
     0.013
    ],
    [
     "RAAGA-VIL NEENGGALUM VELLALAAM ORAAYIRAM (28/9/2",
     "RISE HUB VENTURES",
     "Radio",
     "Yulesha",
     0.013
    ],
    [
     "SME26 PEN RAAGA 200",
     "AZRA TRADING SDN BHD",
     "Radio",
     "Pravinn",
     0.012
    ],
    [
     "SME26 PEN RAAGA 200",
     "PUSBAS MASALA & SPICES SDN BHD",
     "Radio",
     "Rhesimalar",
     0.012
    ],
    [
     "FA26 PEN RAAGA 800",
     "AKS NIVAAS SDN BHD",
     "Radio",
     "Pravinn",
     0.012
    ],
    [
     "VAANGE PALAGALAM (WEEKDAY, 8PM -12MN) WITH THAMA",
     "THAMARAI JEWELS SDN BHD",
     "Radio",
     "Yulesha",
     0.011
    ],
    [
     "SME26 PEN RAAGA 200",
     "CHENNAI SILK PALACE SDN BHD",
     "Radio",
     "Pravinn",
     0.011
    ],
    [
     "SME26 PEN RAAGA 500",
     "VAISHNAV RESOURCES SDN BHD",
     "Radio",
     "Rhesimalar",
     0.011
    ],
    [
     "SME26 PEN RAAGA 300",
     "SRI SAI TRADERS",
     "Radio",
     "Yulesha",
     0.011
    ],
    [
     "SME26 PEN RAAGA 500",
     "STAR MAAS MARKETING",
     "Radio",
     "Rhesimalar",
     0.011
    ],
    [
     "SME26 PEN RAAGA 400",
     "PRIMA ASIA SDN BHD",
     "Radio",
     "Rhesimalar",
     0.01
    ],
    [
     "SME26 PEN RAAGA 400",
     "SRI KUMARAN TEXTILES",
     "Radio",
     "Rhesimalar",
     0.01
    ],
    [
     "2026 STM LOTTERY IN ANTI ILLEGAL PSA (JULY- DEC'",
     "STM LOTTERY SDN BHD",
     "Radio",
     "Pravinn",
     0.01
    ],
    [
     "WEATHER FORECAST DBKL 2026-RAAGA",
     "DEWAN BANDARAYA KUALA LUMPUR",
     "Radio",
     "Pravinn",
     0.01
    ],
    [
     "LIVING BRAINS COMMITMENT (APR 2026 - JAN 2027)",
     "MS GOLD S/B",
     "Radio",
     "Yulesha",
     0.009
    ],
    [
     "OMNET DEAL -CARE FOR WHAT MATTERS 3.0 -OCT'26-NO",
     "ZURICH INSURANCE COMPANY LTD",
     "Radio",
     "Kirabassri",
     0.009
    ],
    [
     "LIVING BRAINS COMMITMENT (MAY 2026 - JAN 2027)",
     "JOYALUKKAS",
     "Radio",
     "Yulesha",
     0.009
    ],
    [
     "FA26 PEN RAAGA 800",
     "MP LINGAM & SONS SDN BHD",
     "Radio",
     "Kirabassri",
     0.008
    ],
    [
     "SME26 PEN RAAGA 400",
     "JOMKUMPUL (M) SDN BHD",
     "Radio",
     "Yulesha",
     0.008
    ],
    [
     "SME26 PEN RAAGA 600",
     "SWAMI SIVANADHA HERBAL (M) SDN BHD",
     "Radio",
     "Rhesimalar",
     0.008
    ],
    [
     "SME26 PEN RAAGA 100",
     "S.SUBRAMANIAM & SONS (M) SDN BHD",
     "Radio",
     "Pravinn",
     0.008
    ],
    [
     "SME26 PEN RAAGA 100",
     "POH KONG JEWELLERS SDN BHD",
     "Radio",
     "Kirabassri",
     0.007
    ],
    [
     "SME26 PEN RAAGA 100",
     "MG DEVELOPMENTS SDN BHD",
     "Radio",
     "Pravinn",
     0.007
    ],
    [
     "888 KITA FM 2026 MAIN SPONSORSHIP RAAGA",
     "THONG GUAN TRADING SDN BHD",
     "Digital",
     "Rhesimalar",
     0.007
    ],
    [
     "SME26 PEN RAAGA 100",
     "BUTAI FASHION SDN BHD",
     "Radio",
     "Yulesha",
     0.007
    ],
    [
     "FA26 PEN RAAGA 450",
     "NANA GROUP RESOURCES",
     "Radio",
     "Kirabassri",
     0.007
    ],
    [
     "SME26 PEN RAAGA 100",
     "AMAZING CREATION EVENT MANAGEMENTS SDN B",
     "Radio",
     "Pravinn",
     0.007
    ],
    [
     "OMNET DEAL-CD 016 POWERLINE SPONSORSHIP 2026 - R",
     "CELCOMDIGI BHD",
     "Radio",
     "Pravinn",
     0.006
    ],
    [
     "FLOUR MILLS/APPALAM/PICKLES/NALLANAI/URAD DHALL",
     "MP LINGAM & SONS SDN BHD",
     "TV",
     "Rhesimalar",
     0.006
    ],
    [
     "MEET PANLAMA 2.0 2026 ECR X RAAGA (4TH OCT - 10T",
     "MITRAALAYAA VENTURES",
     "Radio",
     "Kirabassri",
     0.006
    ],
    [
     "ORION DEAL- TOTAL INDIA CAMPAIGN 2026 (27/4/26-3",
     "AIR ASIA BERHAD",
     "Radio",
     "Yulesha",
     0.006
    ],
    [
     "INFOZONE SPONSORSHIP 2026 - RAAGA",
     "PERODUA SALES SDN BHD",
     "Radio",
     "Kirabassri",
     0.006
    ],
    [
     "SME26 PEN RAAGA 100",
     "KAMDAR GROUP (M) BHD",
     "Radio",
     "Yulesha",
     0.005
    ],
    [
     "SME26 PEN RAAGA 100",
     "BUTAI JEWELLERS SDN BHD",
     "Radio",
     "Yulesha",
     0.005
    ],
    [
     "SME26 PEN RAAGA 100",
     "JOHRA JEWELS SDN BHD",
     "Radio",
     "Yulesha",
     0.005
    ],
    [
     "SME26 PEN RAAGA 100",
     "VKN JEWELLERS (M) SDN BHD",
     "Radio",
     "Yulesha",
     0.005
    ],
    [
     "SME26 PEN RAAGA 200 AND HIGH FREQUENCY",
     "MAJESTIC CORPORATE ADVISORY SDN BHD",
     "Radio",
     "Yulesha",
     0.005
    ],
    [
     "DENTAL PRODUCTS, SOAPS AND DRINKS",
     "LITNA (M) SDN BHD",
     "TV",
     "Yulesha",
     0.004
    ],
    [
     "SME26 PEN RAAGA 100",
     "DIAMOND CREATION",
     "Radio",
     "Pravinn",
     0.004
    ],
    [
     "SME26 PEN RAAGA 100",
     "MIRTHICKA ENTERPRISE",
     "Radio",
     "Pravinn",
     0.004
    ],
    [
     "FEBREZE BASE",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Kirabassri",
     0.004
    ],
    [
     "RAAGA WEEKDAY 5AM-6AM WITH G GALAXY TRADERS (2/3",
     "G GALAXY TRADERS",
     "Radio",
     "Rhesimalar",
     0.004
    ],
    [
     "SME26 PEN RAAGA 100",
     "FAST EVENT ENTERTAINMENT",
     "Radio",
     "Pravinn",
     0.004
    ],
    [
     "SME26 PEN RAAGA 100",
     "MAHARAJA TEXTILES SDN BHD",
     "Radio",
     "Pravinn",
     0.004
    ],
    [
     "SME26 PEN RAAGA 300",
     "JAAKS GLOBAL SDN BHD",
     "Radio",
     "Rhesimalar",
     0.004
    ],
    [
     "BAJAJ COCONUT HAIR OIL",
     "TRADEMART MARKETING SDN BHD",
     "TV",
     "Rhesimalar",
     0.003
    ],
    [
     "JOTHI COMMITMENT DEAL (AUG'25-JAN'27)",
     "SVN HERBAL SDN BHD",
     "Radio",
     "Rhesimalar",
     0.003
    ],
    [
     "JOTHI COMMITMENT DEAL (SEP'25-AUG'26)",
     "KFM SUCCESS MARKETING (M) SDN BHD",
     "Radio",
     "Rhesimalar",
     0.003
    ],
    [
     "JUICE",
     "SWAMI SIVANANDHA'S (M) SDN BHD",
     "TV",
     "Rhesimalar",
     0.003
    ],
    [
     "MASALA",
     "JERO GLOBAL SDN BHD",
     "TV",
     "Rhesimalar",
     0.003
    ],
    [
     "PRAYER ITEMS",
     "GLR ENTERPRISE",
     "TV",
     "Rhesimalar",
     0.003
    ],
    [
     "PUSBAS MASALA",
     "PUSBAS MASALA & SPICES SDN BHD",
     "TV",
     "Rhesimalar",
     0.003
    ],
    [
     "SME26 PEN RAAGA 100",
     "MOOKHUTHI PALACE ENTERPRISE",
     "Radio",
     "Yulesha",
     0.003
    ],
    [
     "SME26 PEN RAAGA 200",
     "MADRAS MARKET",
     "Radio",
     "Pravinn",
     0.003
    ],
    [
     "RAAGA CAMPUS KATHAIGAL WITH MAHSA UNIVERSITY 202",
     "MALAYSIAN ALLIED HEALTH SCIENCES ACADEMY",
     "Digital",
     "Rhesimalar",
     0.003
    ],
    [
     "RIVON HAIR DYE",
     "LAKHS MARKETING",
     "TV",
     "Rhesimalar",
     0.003
    ],
    [
     "PARACHUTE ADVANCED GOLD COCONUT HAIR OIL",
     "TRADEMART MARKETING SDN BHD",
     "TV",
     "Rhesimalar",
     0.002
    ],
    [
     "SPECIAL MOVIE PACKAGE- PATTA",
     "ANTENNA ENTERTAINMENTS SDN BHD",
     "Radio",
     "Pravinn",
     0.002
    ],
    [
     "HYPERMAALAI 4PM - 8PM with UNITAR - SEPT 2026",
     "UNITAR CAPITAL SDN BHD",
     "Digital",
     "Kirabassri",
     0.002
    ],
    [
     "AMBI PUR HOME",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Kirabassri",
     0.002
    ],
    [
     "FA26 PEN RAAGA 900 (15SEC) (APR 26 - JAN 27)",
     "WONDERS SMART NETWORK",
     "Radio",
     "Yulesha",
     0.002
    ],
    [
     "SME26 PEN RAAGA 20 - OCT2026",
     "UNIVERSITI KUALA LUMPUR",
     "Radio",
     "Pravinn",
     0.002
    ],
    [
     "S1583-Fernleaf FCMP-Integrated-Masked Chef Cooki",
     "FONTERRA BRAND (M) SDN BHD",
     "Digital",
     "Kirabassri",
     0.002
    ],
    [
     "FA26 PEN RAAGA 1135 (15SEC)",
     "TAAKA LEE STUDIO",
     "Radio",
     "Pravinn",
     0.002
    ],
    [
     "DOWNY D2C WIBC VALUE",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Kirabassri",
     0.001
    ],
    [
     "SME26 PEN RAAGA 600",
     "HAIR ASIAN COSMETIC MANUFACTURING SDN BH",
     "Radio",
     "Rhesimalar",
     0.001
    ],
    [
     "DOWNY D2C WIBC MOR",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Kirabassri",
     0.001
    ],
    [
     "UMZ BIOLINE CAMPAIGN 2026",
     "UMZ BIOLINE MANUFACTURER",
     "Radio",
     "Rhesimalar",
     0.001
    ],
    [
     "DOWNY D2C WIBC LLF",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Kirabassri",
     0.001
    ],
    [
     "RAAGA INNIKI ENNA KATHE WITH MADANIKAS SEPT 2026",
     "3D FASHION EMPIRE",
     "Digital",
     "Kirabassri",
     0.001
    ],
    [
     "TEXTILE",
     "RAAJI SILK PALACE",
     "TV",
     "Yulesha",
     0.001
    ],
    [
     "HEAD & SHOULDER",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Kirabassri",
     0.001
    ],
    [
     "REJOICE",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Kirabassri",
     0.0
    ],
    [
     "RAAGA INNIKI ENNA KATHE WITH MADANIKAS",
     "3D FASHION EMPIRE",
     "Digital",
     "Kirabassri",
     0.0
    ]
   ]
  },
  "joanne": {
   "rows": [
    {
     "id": "Yi Tong",
     "n": "Yi Tong",
     "full": "KOO, Yitong",
     "kind": "exec",
     "mgr": null,
     "cells": [
      [
       52,
       52,
       0.36
      ],
      [
       16,
       19,
       0.284
      ],
      [
       11,
       16,
       0.33
      ],
      [
       0,
       0,
       0.293
      ]
     ],
     "f": 0.269,
     "g": -0.998
    },
    {
     "id": "Maznan",
     "n": "Maznan",
     "full": "MAHYUDDIN, Maznan",
     "kind": "exec",
     "mgr": null,
     "cells": [
      [
       28,
       32,
       0.36
      ],
      [
       3,
       3,
       0.284
      ],
      [
       25,
       31,
       0.275
      ],
      [
       0,
       0,
       0.244
      ]
     ],
     "f": 0.18,
     "g": -0.983
    },
    {
     "id": "Nur Izzatul",
     "n": "Nur Izzatul",
     "full": "ABDUL RAZAK, Nur Izzatul Baizura",
     "kind": "exec",
     "mgr": null,
     "cells": [
      [
       28,
       40,
       0.359
      ],
      [
       0,
       6,
       0.284
      ],
      [
       4,
       16,
       0.275
      ],
      [
       0,
       0,
       0.244
      ]
     ],
     "f": 0.11,
     "g": -1.1
    },
    {
     "id": "Freda",
     "n": "Freda",
     "full": "LOW, Pei Chee [Freda]",
     "kind": "exec",
     "mgr": null,
     "cells": [
      null,
      [
       0,
       0,
       0.284
      ],
      [
       0,
       0,
       0.33
      ],
      [
       0,
       0,
       0.293
      ]
     ],
     "f": 0.0,
     "g": -0.907,
     "offChart": true
    }
   ],
   "total": {
    "cells": [
     [
      36,
      41,
      1.1
     ],
     [
      5,
      7,
      1.1
     ],
     [
      9,
      15,
      1.2
     ],
     [
      0,
      0,
      1.1
     ]
    ],
    "f": 0.56,
    "g": -3.9
   },
   "open": [
    [
     "PALLAS BACK TO SCHOOL BRANDING",
     "International Footwear Sdn Bhd",
     "Radio",
     "80%",
     "Yi Tong",
     {
      "Dec": 0.046
     }
    ],
    [
     "ROS XTRA ZAPAR",
     "ZAKAT PERAK AL RIDZUAN SDN BHD",
     "Radio",
     "80%",
     "Maznan",
     {
      "Dec": 0.046
     }
    ],
    [
     "ZAKAT PERAK DEC 2026",
     "ZAKAT PERAK AL RIDZUAN SDN BHD",
     "Radio",
     "80%",
     "Maznan",
     {
      "Dec": 0.04
     }
    ],
    [
     "MOFLEX STRENGTH BRANDING NOV & DEC'26",
     "BRANDADS MEDIA S…",
     "Radio",
     "80%",
     "Yi Tong",
     {
      "Nov": 0.039
     }
    ],
    [
     "INTEAM X UNIC CONCERT",
     "AHMA NAJAH ENTERPRISE",
     "Radio",
     "80%",
     "Nur Izzatul",
     {
      "Oct": 0.019
     }
    ],
    [
     "KPJUC - INTAKE 2026",
     "KPJ International College Johor Bahru",
     "Radio",
     "80%",
     "Nur Izzatul",
     {
      "Dec": 0.013
     }
    ],
    [
     "SME UPFRONT OFFER 2026 CE ERA",
     "MIKER EMPIRE (M) SDN BHD",
     "Radio",
     "50%",
     "Maznan",
     {
      "Oct": 0.013
     }
    ],
    [
     "Borak Seeni | TPMJ",
     "JABATAN AGAMA ISLAM NEGERI JOHOR",
     "TV",
     "50%",
     "Nur Izzatul",
     {
      "Nov": 0.008,
      "Dec": 0.004
     }
    ],
    [
     "ZAKAT 2026",
     "MAJLIS AGAMA ISLAM NEGERI JOHOR",
     "Radio",
     "50%",
     "Nur Izzatul",
     {
      "Dec": 0.012
     }
    ],
    [
     "PALLAS BTS BRANDING - SMEVAGANZA",
     "International Footwear Sdn Bhd",
     "Radio",
     "50%",
     "Yi Tong",
     {
      "Dec": 0.007
     }
    ]
   ],
   "bank": [
    [
     "SNEK KU 50TH ANNIVERSARY - SEGMENT",
     "NEW STAR FOOD INDUSTRI…",
     "Radio",
     "Won",
     "Nur Izzatul",
     [
      0.07,
      null,
      null,
      null
     ],
     0.07
    ],
    [
     "PAKEJ HUJUNG MINGGU SINAR JUNE26 - JUNE27",
     "IMIKA EMPIRE SDN …",
     "Radio",
     "Booked",
     "Maznan",
     [
      0.059,
      null,
      null,
      null
     ],
     0.059
    ],
    [
     "FA26 PEN MYGOXUAN 670 SPOTS",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     [
      0.046,
      0.003,
      null,
      null
     ],
     0.049
    ],
    [
     "Thong Guan Trading Sdn Bhd - 888 Teh Tarik Malay",
     "THONG GUAN …",
     "Digital",
     "Booked",
     "Yi Tong",
     [
      0.041,
      null,
      null,
      null
     ],
     0.041
    ],
    [
     "FA26 PEN SINAR 705",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     [
      0.033,
      0.002,
      null,
      null
     ],
     0.034
    ],
    [
     "PAKEJ HUJUNG MINGGU GEGAR JUNE26-JULY27",
     "IMIKA EMPIRE SDN BHD",
     "Radio",
     "Booked",
     "Maznan",
     [
      0.024,
      null,
      null,
      null
     ],
     0.024
    ],
    [
     "SME26 PEN SINAR 100",
     "TECK AUN MEDICAL FACTORY SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     [
      0.024,
      null,
      null,
      null
     ],
     0.024
    ],
    [
     "GOXUAN DRIVE SEGMENT SPONSORSHIP SEPT-OCT'26",
     "TEONG HU…",
     "Radio",
     "Booked",
     "Yi Tong",
     [
      0.01,
      0.009,
      null,
      null
     ],
     0.02
    ],
    [
     "SME RAAGA CHANDRIKA OCT",
     "YUSUF TAIYOOB SDN BHD",
     "Radio",
     "Booked",
     "Maznan",
     [
      0.013,
      null,
      null,
      null
     ],
     0.013
    ],
    [
     "FA26 PEN MELODY 670 SPOTS",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     [
      0.012,
      0.0,
      null,
      null
     ],
     0.012
    ],
    [
     "FA26 PEN LITE 600 SPOTS",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     [
      0.01,
      0.0,
      null,
      null
     ],
     0.011
    ],
    [
     "JALEN 2026",
     "JALEN SERVICES SDN BHD",
     "Digital",
     "Booked",
     "Nur Izzatul",
     [
      0.01,
      null,
      null,
      null
     ],
     0.01
    ],
    [
     "ROS RAAGA",
     "PERBADANAN PENGURUSAN QUEENSBAY MALL",
     "Radio",
     "Booked",
     "Maznan",
     [
      null,
      0.01,
      null,
      null
     ],
     0.01
    ],
    [
     "FA26 PEN GEGAR 705",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     [
      0.009,
      0.0,
      null,
      null
     ],
     0.009
    ],
    [
     "FA26 HITZ SABAH 100",
     "APES MEDIA SOLUTIONS",
     "Radio",
     "Booked",
     "Nur Izzatul",
     [
      0.004,
      null,
      null,
      null
     ],
     0.004
    ]
   ],
   "bankOct": [
    [
     "SNEK KU 50TH ANNIVERSARY - SEGMENT",
     "NEW STAR FOOD INDUSTRIES SDN BHD",
     "Radio",
     "Won",
     "Nur Izzatul",
     0.07
    ],
    [
     "PAKEJ HUJUNG MINGGU SINAR JUNE26 - JUNE27",
     "IMIKA EMPIRE SDN BHD",
     "Radio",
     "Booked",
     "Maznan",
     0.059
    ],
    [
     "FA26 PEN MYGOXUAN 670 SPOTS",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     0.046
    ],
    [
     "Thong Guan Trading Sdn Bhd - 888 Teh Tarik Malay",
     "THONG GUAN TRADING SDN BHD",
     "Digital",
     "Booked",
     "Yi Tong",
     0.041
    ],
    [
     "FA26 PEN SINAR 705",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     0.033
    ],
    [
     "PAKEJ HUJUNG MINGGU GEGAR JUNE26-JULY27",
     "IMIKA EMPIRE SDN BHD",
     "Radio",
     "Booked",
     "Maznan",
     0.024
    ],
    [
     "SME26 PEN SINAR 100",
     "TECK AUN MEDICAL FACTORY SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     0.024
    ],
    [
     "SME RAAGA CHANDRIKA OCT",
     "YUSUF TAIYOOB SDN BHD",
     "Radio",
     "Booked",
     "Maznan",
     0.013
    ],
    [
     "FA26 PEN MELODY 670 SPOTS",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     0.012
    ],
    [
     "GOXUAN DRIVE SEGMENT SPONSORSHIP SEPT-OCT'26",
     "TEONG HUAT MEDICAL SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     0.01
    ],
    [
     "FA26 PEN LITE 600 SPOTS",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     0.01
    ],
    [
     "JALEN 2026",
     "JALEN SERVICES SDN BHD",
     "Digital",
     "Booked",
     "Nur Izzatul",
     0.01
    ],
    [
     "FA26 PEN GEGAR 705",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     0.009
    ],
    [
     "FA26 HITZ SABAH 100",
     "APES MEDIA SOLUTIONS",
     "Radio",
     "Booked",
     "Nur Izzatul",
     0.004
    ],
    [
     "NATURALLY LANGKAWI REED LADA",
     "LADA ECO TOURISM SDN.BHD",
     "Digital",
     "Booked",
     "Maznan",
     0.003
    ]
   ],
   "bookings": [
    [
     "PAKEJ HUJUNG MINGGU SINAR JUNE26 - JUNE27",
     "IMIKA EMPIRE SDN BHD",
     "Radio",
     "Maznan",
     0.059
    ],
    [
     "FA26 PEN MYGOXUAN 670 SPOTS",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Yi Tong",
     0.046
    ],
    [
     "Thong Guan Trading Sdn Bhd - 888 Teh Tarik Malay",
     "THONG GUAN TRADING SDN BHD",
     "Digital",
     "Yi Tong",
     0.041
    ],
    [
     "FA26 PEN SINAR 705",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Yi Tong",
     0.033
    ],
    [
     "PAKEJ HUJUNG MINGGU GEGAR JUNE26-JULY27",
     "IMIKA EMPIRE SDN BHD",
     "Radio",
     "Maznan",
     0.024
    ],
    [
     "SME26 PEN SINAR 100",
     "TECK AUN MEDICAL FACTORY SDN BHD",
     "Radio",
     "Yi Tong",
     0.024
    ],
    [
     "SME RAAGA CHANDRIKA OCT",
     "YUSUF TAIYOOB SDN BHD",
     "Radio",
     "Maznan",
     0.013
    ],
    [
     "FA26 PEN MELODY 670 SPOTS",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Yi Tong",
     0.012
    ],
    [
     "GOXUAN DRIVE SEGMENT SPONSORSHIP SEPT-OCT'26",
     "TEONG HUAT MEDICAL SDN BHD",
     "Radio",
     "Yi Tong",
     0.01
    ],
    [
     "FA26 PEN LITE 600 SPOTS",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Yi Tong",
     0.01
    ],
    [
     "JALEN 2026",
     "JALEN SERVICES SDN BHD",
     "Digital",
     "Nur Izzatul",
     0.01
    ],
    [
     "FA26 PEN GEGAR 705",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Yi Tong",
     0.009
    ],
    [
     "FA26 HITZ SABAH 100",
     "APES MEDIA SOLUTIONS",
     "Radio",
     "Nur Izzatul",
     0.004
    ],
    [
     "NATURALLY LANGKAWI REED LADA",
     "LADA ECO TOURISM SDN.BHD",
     "Digital",
     "Maznan",
     0.003
    ],
    [
     "PHM SINAR IMIKA MEDIAKEY SEPT",
     "IMIKA EMPIRE SDN BHD",
     "Digital",
     "Maznan",
     0.002
    ],
    [
     "PHM GEGAR IMIKA MEDIA KEY SEPT",
     "IMIKA EMPIRE SDN BHD",
     "Digital",
     "Maznan",
     0.002
    ],
    [
     "Teong Huat Medical Sdn Bhd- Neobun Branding - Br",
     "TEONG HUAT SDN. BHD",
     "Digital",
     "Yi Tong",
     0.001
    ],
    [
     "WAQAF AN NUR | PAKEJ HUJUNG MINGGU ZAYAN JAN - D",
     "WAKAF AN-NUR CORPORATION BHD",
     "Digital",
     "Nur Izzatul",
     0.001
    ]
   ]
  }
 },
 "previous": {
  "asOfLabel": "5 Oct 2026",
  "companyWonExKult": 11.0,
  "heads": {
   "joy": 2.4,
   "belinda": 0.89,
   "edison": 0.089,
   "suatwei": 1.7,
   "yuen": 1.8,
   "alvin": 1.5,
   "siokchin": 1.4,
   "kavin": 0.91,
   "joanne": 0.347
  },
  "note": "Won-booked only: the forecast rule changed between the two cuts, and Kult was target-only on 5 Oct."
 }
};
