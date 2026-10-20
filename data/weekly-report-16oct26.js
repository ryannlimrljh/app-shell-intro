/* The weekly sales report, as the board reads it: the 16 Oct 2026 refresh.
   ─────────────────────────────────────────────────────────────────────
   Generated from the data team's reports, nothing modelled:
     · AMS_SLT_Overview_16OCT26.pdf      All of sales: company, platforms,
       heads, the four-month sprint, deals in negotiation, won not yet
       booked, top bookings per month. The reference.
     · AMS_HoS_<head>_16OCT26.pdf x 11   each head's own report: their team
       by salesperson, each month's deals and won-not-booked, top bookings
       per month, open pipeline, every October booking.
   Kenn is no longer a head of sales: he leads Kult, at the level of Jeya,
   Nicholas and Simon, and Kult's two heads, Kazman and Amelia, report
   separately. Names below head level are mapped to the 6 Oct org chart;
   people the reports carry who are not on that chart are kept, with
   their numbers, and flagged `offChart`. Money is RM millions;
   percentages of target. Regenerate with scratchpad/r16/build_data.py.

   Registers beside earlier cuts as window.SALES_REPORTS[asOf], so the
   board can offer them as history; the newest is shown by default. */
(window.SALES_REPORTS = window.SALES_REPORTS || {})['2026-10-16'] = {
 "asOf": "2026-10-16",
 "asOfLabel": "16 Oct 2026",
 "refresh": "weekly",
 "source": "Weekly sales report, prepared by the data team",
 "month": {
  "key": "Oct",
  "name": "October",
  "day": 16,
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
  "mapping": "Revenue follows the closer each system records, placed in the October org chart; RM24K is not yet in the name mapping and follows the booking’s lead.",
  "wonNotBooked": "Won deals count in won-booked already, but are at risk until booked: each needs its MO/IO through Scheduling or Ad Ops, with the right salesperson named."
 },
 "company": {
  "target": 38.7,
  "won": 16.7,
  "weighted": 1.7,
  "forecast": 18.4,
  "pct": 48,
  "cov": 59,
  "gap": -20.3,
  "lastYear": {
   "billed": 21.2,
   "label": "October 2025, Finance, net",
   "change": -13
  }
 },
 "platforms": [
  {
   "name": "TV",
   "target": 14.0,
   "won": 4.9,
   "forecast": 6.0,
   "pct": 43,
   "cov": 55,
   "ly": -19
  },
  {
   "name": "Radio",
   "target": 18.7,
   "won": 9.6,
   "forecast": 9.9,
   "pct": 53,
   "cov": 58,
   "ly": -9
  },
  {
   "name": "Digital",
   "target": 4.9,
   "won": 1.9,
   "forecast": 2.3,
   "pct": 47,
   "cov": 82,
   "ly": -5,
   "cycle": {
    "from": 24,
    "day": 23,
    "days": 30
   }
  },
  {
   "name": "AA",
   "target": 1.2,
   "won": 0.265,
   "forecast": 0.294,
   "pct": 24,
   "cov": 25,
   "ly": -53,
   "cycle": {
    "from": 24,
    "day": 23,
    "days": 30
   }
  }
 ],
 "heads": [
  {
   "key": "joy",
   "name": "Joy Ahmad",
   "full": "AHMAD, Normala [Joy]",
   "lead": "nicholas",
   "share": 18,
   "target": 7.0,
   "won": 2.9,
   "forecast": 3.7,
   "pct": 53,
   "cov": 64,
   "gap": -3.3,
   "sprint": [
    [
     53,
     64,
     7.0
    ],
    [
     31,
     60,
     7.4
    ],
    [
     5,
     24,
     7.9
    ],
    [
     7,
     11,
     7.0
    ]
   ],
   "sprintSplit": [
    [
     2.9,
     0.823
    ],
    [
     1.5,
     0.831
    ],
    [
     0.364,
     0.009
    ],
    [
     0.488,
     0.0
    ]
   ],
   "sprintForecast": 6.9,
   "sprintGap": -22.4
  },
  {
   "key": "edison",
   "name": "Edison",
   "full": "LIM, Kin Wai [Edison]",
   "lead": "simon",
   "share": 8,
   "target": 3.1,
   "won": 0.48,
   "forecast": 0.612,
   "pct": 20,
   "cov": 27,
   "gap": -2.5,
   "sprint": [
    [
     20,
     27,
     3.1
    ],
    [
     3,
     9,
     3.3
    ],
    [
     1,
     8,
     3.5
    ],
    [
     0,
     2,
     3.1
    ]
   ],
   "sprintSplit": [
    [
     0.48,
     0.131
    ],
    [
     0.023,
     0.073
    ],
    [
     0.009,
     0.034
    ],
    [
     0.016,
     0.0
    ]
   ],
   "sprintForecast": 0.766,
   "sprintGap": -12.2
  },
  {
   "key": "kazman",
   "name": "Kazman",
   "full": "FAIZAL, Kazman",
   "lead": "kenn",
   "share": 7,
   "target": 2.6,
   "won": 0.146,
   "forecast": 0.162,
   "pct": 6,
   "cov": 15,
   "gap": -2.4,
   "sprint": [
    [
     6,
     15,
     2.6
    ],
    [
     14,
     47,
     2.7
    ],
    [
     5,
     29,
     2.9
    ],
    [
     3,
     18,
     2.6
    ]
   ],
   "sprintSplit": [
    [
     0.146,
     0.016
    ],
    [
     0.138,
     0.249
    ],
    [
     0.067,
     0.083
    ],
    [
     0.0,
     0.083
    ]
   ],
   "sprintForecast": 0.783,
   "sprintGap": -10.0
  },
  {
   "key": "yuen",
   "name": "Yuen",
   "full": "YEE, Yuen Lai",
   "lead": "jeya",
   "share": 13,
   "target": 4.9,
   "won": 2.4,
   "forecast": 2.6,
   "pct": 52,
   "cov": 69,
   "gap": -2.3,
   "sprint": [
    [
     52,
     69,
     4.9
    ],
    [
     37,
     65,
     5.2
    ],
    [
     29,
     92,
     5.5
    ],
    [
     16,
     29,
     4.9
    ]
   ],
   "sprintSplit": [
    [
     2.4,
     0.132
    ],
    [
     1.5,
     0.424
    ],
    [
     0.974,
     0.619
    ],
    [
     0.195,
     0.564
    ]
   ],
   "sprintForecast": 6.8,
   "sprintGap": -13.7
  },
  {
   "key": "belinda",
   "name": "Belinda",
   "full": "CHIN, Poh Yin [Belinda]",
   "lead": "nicholas",
   "share": 11,
   "target": 4.1,
   "won": 2.0,
   "forecast": 2.1,
   "pct": 52,
   "cov": 88,
   "gap": -2.0,
   "sprint": [
    [
     52,
     88,
     4.1
    ],
    [
     31,
     33,
     4.3
    ],
    [
     10,
     10,
     4.6
    ],
    [
     5,
     10,
     4.1
    ]
   ],
   "sprintSplit": [
    [
     2.0,
     0.113
    ],
    [
     0.933,
     0.389
    ],
    [
     0.454,
     0.012
    ],
    [
     0.173,
     0.012
    ]
   ],
   "sprintForecast": 4.1,
   "sprintGap": -13.0
  },
  {
   "key": "alvin",
   "name": "Alvin Wong",
   "full": "WONG, Kok Wei [Alvin]",
   "lead": "jeya",
   "share": 12,
   "target": 4.5,
   "won": 2.3,
   "forecast": 2.6,
   "pct": 57,
   "cov": 70,
   "gap": -1.9,
   "sprint": [
    [
     57,
     70,
     4.5
    ],
    [
     25,
     30,
     4.8
    ],
    [
     20,
     22,
     5.1
    ],
    [
     13,
     15,
     4.5
    ]
   ],
   "sprintSplit": [
    [
     2.3,
     0.292
    ],
    [
     0.971,
     0.212
    ],
    [
     0.842,
     0.147
    ],
    [
     0.248,
     0.344
    ]
   ],
   "sprintForecast": 5.3,
   "sprintGap": -13.5
  },
  {
   "key": "amelia",
   "name": "Amelia",
   "full": "PENG, Amelia",
   "lead": "kenn",
   "share": 5,
   "target": 1.8,
   "won": 0.035,
   "forecast": 0.035,
   "pct": 2,
   "cov": 2,
   "gap": -1.8,
   "sprint": [
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
   "sprintSplit": [
    [
     0.035,
     0.0
    ],
    [
     0.106,
     0.0
    ],
    [
     0.036,
     0.0
    ],
    [
     0.036,
     0.0
    ]
   ],
   "sprintForecast": 0.213,
   "sprintGap": -7.4
  },
  {
   "key": "siokchin",
   "name": "Siok Chin",
   "full": "TENG, Siok Chin",
   "lead": "nicholas",
   "share": 7,
   "target": 2.9,
   "won": 1.5,
   "forecast": 1.6,
   "pct": 55,
   "cov": 59,
   "gap": -1.3,
   "sprint": [
    [
     55,
     59,
     2.9
    ],
    [
     14,
     36,
     3.0
    ],
    [
     15,
     44,
     3.2
    ],
    [
     34,
     98,
     2.9
    ]
   ],
   "sprintSplit": [
    [
     1.5,
     0.12
    ],
    [
     0.148,
     0.269
    ],
    [
     0.371,
     0.12
    ],
    [
     0.207,
     0.756
    ]
   ],
   "sprintForecast": 3.4,
   "sprintGap": -8.6
  },
  {
   "key": "suatwei",
   "name": "Suat Wei",
   "full": "BOON, Suat Wei",
   "lead": "nicholas",
   "share": 12,
   "target": 4.7,
   "won": 3.4,
   "forecast": 3.5,
   "pct": 73,
   "cov": 76,
   "gap": -1.3,
   "sprint": [
    [
     73,
     76,
     4.7
    ],
    [
     28,
     41,
     5.0
    ],
    [
     37,
     39,
     5.3
    ],
    [
     2,
     10,
     4.7
    ]
   ],
   "sprintSplit": [
    [
     3.4,
     0.047
    ],
    [
     1.4,
     0.027
    ],
    [
     1.9,
     0.062
    ],
    [
     0.086,
     0.0
    ]
   ],
   "sprintForecast": 6.9,
   "sprintGap": -12.8
  },
  {
   "key": "kavin",
   "name": "Kavin Mullai",
   "full": "SADASSEEVAN, Kavin Mullai",
   "lead": "jeya",
   "share": 5,
   "target": 1.9,
   "won": 1.1,
   "forecast": 1.1,
   "pct": 59,
   "cov": 59,
   "gap": -0.79,
   "sprint": [
    [
     59,
     59,
     1.9
    ],
    [
     19,
     19,
     2.0
    ],
    [
     9,
     9,
     2.2
    ],
    [
     6,
     6,
     1.9
    ]
   ],
   "sprintSplit": [
    [
     1.1,
     0.0
    ],
    [
     0.382,
     0.0
    ],
    [
     0.202,
     0.0
    ],
    [
     0.11,
     0.0
    ]
   ],
   "sprintForecast": 1.8,
   "sprintGap": -6.2
  },
  {
   "key": "joanne",
   "name": "Joanne Tan",
   "full": "TAN, Fung Fung [Joanne]",
   "lead": "jeya",
   "share": 3,
   "target": 1.1,
   "won": 0.427,
   "forecast": 0.446,
   "pct": 41,
   "cov": 43,
   "gap": -0.634,
   "sprint": [
    [
     41,
     43,
     1.1
    ],
    [
     8,
     9,
     1.1
    ],
    [
     12,
     17,
     1.2
    ],
    [
     0,
     0,
     1.1
    ]
   ],
   "sprintSplit": [
    [
     0.427,
     0.019
    ],
    [
     0.059,
     0.031
    ],
    [
     0.0,
     0.149
    ],
    [
     0.0,
     0.0
    ]
   ],
   "sprintForecast": 0.685,
   "sprintGap": -3.8
  }
 ],
 "sprint": {
  "months": {
   "Oct": {
    "won": 16.7,
    "weighted": 1.7,
    "pct": 48,
    "cov": 59,
    "target": 38.7
   },
   "Nov": {
    "won": 7.1,
    "weighted": 2.5,
    "pct": 24,
    "cov": 39,
    "target": 40.8
   },
   "Dec": {
    "won": 5.2,
    "weighted": 1.2,
    "pct": 15,
    "cov": 31,
    "target": 43.4
   },
   "Jan": {
    "won": 1.6,
    "weighted": 1.8,
    "pct": 9,
    "cov": 19,
    "target": 38.5
   }
  },
  "forecast": 37.8,
  "gap": -123.6,
  "caveat": "Pipeline is what has been logged in NeoCRM, which is not necessarily what exists."
 },
 "negotiating": {
  "months": {
   "Oct": {
    "count": 60,
    "fifty": {
     "count": 20,
     "value": 0.591
    },
    "eighty": {
     "count": 40,
     "value": 2.12
    }
   },
   "Nov": {
    "count": 56
   },
   "Dec": {
    "count": 41
   },
   "Jan": {
    "count": 20
   }
  },
  "eighty": {
   "count": 40,
   "value": 2.12
  },
  "deals": [
   {
    "c": "Perolehahan Media Buy 2026-2027",
    "a": "KEMENTERIAN KESIHATAN MALAYSIA",
    "p": "Digital + Radio + TV",
    "head": "joy",
    "stage": 50,
    "m": {
     "Dec": 1.1
    },
    "bookings": 9
   },
   {
    "c": "Mualim Muda S2 Sponsorship",
    "a": "MEDIAKEY GROUP SDN BHD",
    "p": "TV",
    "head": "joy",
    "stage": 80,
    "m": {
     "Oct": 0.936
    },
    "runs": "Oct 26",
    "campaign": 0.936
   },
   {
    "c": "TRAVELOGUE 14 PJRM",
    "a": "CLEAVE AMITY",
    "p": "TV",
    "head": "joy",
    "stage": 80,
    "m": {
     "Nov": 0.624
    },
    "bookings": 2
   },
   {
    "c": "JASMINE FOOD - BASS WEDDING",
    "a": "SPECIALISED MEDIA ADS SDN BHD",
    "p": "Digital + Radio + TV",
    "head": "yuen",
    "stage": 80,
    "m": {
     "Jan": 0.523
    },
    "bookings": 4
   },
   {
    "c": "Nescafe SOS",
    "a": "NESTLE PRODUCTS SDN BHD",
    "p": "Digital + TV",
    "head": "belinda",
    "stage": 80,
    "m": {
     "Nov": 0.419
    },
    "bookings": 6
   },
   {
    "c": "Radio Sponsorship_Amaron",
    "a": "Tecxus Marketing Sdn. Bhd. (Amaron Malaysia)",
    "p": "Radio",
    "head": "yuen",
    "stage": 80,
    "m": {
     "Dec": 0.374
    }
   },
   {
    "c": "Waterproof All-In-One Campaign 2026",
    "a": "Yellow Paper Plane Sdn Bhd",
    "p": "Digital",
    "head": "kazman",
    "stage": 50,
    "m": {
     "Dec": 0.372
    }
   },
   {
    "c": "BYD TikTok Series",
    "a": "IPG MEDIABRANDS SDN BHD",
    "p": "Digital",
    "head": "yuen",
    "stage": 50,
    "m": {
     "Nov": 0.336
    }
   },
   {
    "c": "SPONSORSHIP - AEC - THE GRANDMASTE…",
    "a": "WATSONS",
    "p": "Digital + Radio + TV",
    "head": "siokchin",
    "stage": 80,
    "m": {
     "Jan": 0.309
    }
   },
   {
    "c": "SPONSORSHIP - AEC - CGM CNY SPECIAL …",
    "a": "MAH SING",
    "p": "TV",
    "head": "siokchin",
    "stage": 80,
    "m": {
     "Jan": 0.257
    }
   },
   {
    "c": "Advokasi Nilai Kasih Keluarga",
    "a": "Lembaga Penduduk dan Pembangunan Keluarga Ne",
    "p": "Ra…",
    "head": "joy",
    "stage": 50,
    "m": {
     "Nov": 0.249
    }
   },
   {
    "c": "Yeo's CNY 2027",
    "a": "YEO HIAP SENG (MALAYSIA) BERHAD",
    "p": "Digital + Radio",
    "head": "alvin",
    "stage": 80,
    "m": {
     "Dec": 0.092,
     "Jan": 0.244
    },
    "bookings": 2
   },
   {
    "c": "Grab_Microdrama 2026",
    "a": "GRABCAR SDN BHD",
    "p": "Digital",
    "head": "alvin",
    "stage": 80,
    "m": {
     "Oct": 0.243
    },
    "runs": "Oct to Nov 26",
    "bookings": 3,
    "campaign": 0.391
   },
   {
    "c": "BRAND PLAN PADI BERAS NASIONAL BER…",
    "a": "PADIBERAS NASIONAL BERHAD (BERNAS)",
    "p": "TV",
    "head": "joy",
    "stage": 80,
    "m": {
     "Nov": 0.234
    }
   },
   {
    "c": "Wipro Unza x Alpha Ambassadorship",
    "a": "WIPRO UNZA (MALAYSIA) SDN BHD",
    "p": "Digital",
    "head": "yuen",
    "stage": 80,
    "m": {
     "Nov": 0.221
    }
   },
   {
    "c": "FISHERMAN'S FRIEND - ERA TIKTOK SERIES",
    "a": "OMNICOM MEDIA GROUP (M) SDN BHD",
    "p": "Radio",
    "head": "yuen",
    "stage": 80,
    "m": {
     "Nov": 0.208
    }
   },
   {
    "c": "KFC x Home of Kids",
    "a": "DENTSU HOLDINGS MALAYSIA SDN BHD",
    "p": "Digital",
    "head": "yuen",
    "stage": 80,
    "m": {
     "Dec": 0.192
    }
   },
   {
    "c": "SPONSORSHIP - AEC - SIFU MAY I ASK? S…",
    "a": "GENTLE SUMPREME",
    "p": "Digital + Radio + TV",
    "head": "siokchin",
    "stage": 80,
    "m": {
     "Jan": 0.192
    }
   },
   {
    "c": "Bio-Essence x CNY 2027",
    "a": "WIPRO UNZA (MALAYSIA) SDN BHD",
    "p": "Digital",
    "head": "yuen",
    "stage": 80,
    "m": {
     "Jan": 0.182
    }
   },
   {
    "c": "MegaTrend SMEvaganza Commitment",
    "a": "MEGA TREND ADVERTISING SDN BHD",
    "p": "Digital",
    "head": "belinda",
    "stage": 50,
    "m": {
     "Jan": 0.181
    }
   },
   {
    "c": "Eco Shop - Uncomplicated Challenge",
    "a": "IPG MEDIABRANDS SDN BHD",
    "p": "Digital + Radio",
    "head": "suatwei",
    "stage": 50,
    "m": {
     "Nov": 0.173
    },
    "bookings": 2
   },
   {
    "c": "ROS XTRA - AIA BHD",
    "a": "AIA BHD",
    "p": "Radio",
    "head": "yuen",
    "stage": 50,
    "m": {
     "Oct": 0.166
    },
    "runs": "Oct 26",
    "campaign": 0.166
   },
   {
    "c": "SPONSORSHIP - AEC -ASQ 2026",
    "a": "ADONIS BEAUTY",
    "p": "Digital + TV",
    "head": "siokchin",
    "stage": 80,
    "m": {
     "Oct": 0.083,
     "Nov": 0.163
    },
    "runs": "Oct to Dec 26",
    "bookings": 2,
    "campaign": 0.247
   },
   {
    "c": "NEWS SPONSORSHIP - AEC - PRIME TALK",
    "a": "U MOBILE",
    "p": "TV",
    "head": "siokchin",
    "stage": 50,
    "m": {
     "Nov": 0.156,
     "Dec": 0.156,
     "Jan": 0.156
    }
   },
   {
    "c": "Suntory BEC CNY Commercial",
    "a": "Suntory Beverage & Food Malaysia Sdn Bhd",
    "p": "Radio",
    "head": "alvin",
    "stage": 80,
    "m": {
     "Jan": 0.133
    }
   },
   {
    "c": "SMEVaganza26 - CGC",
    "a": "CD ADVERTISING SDN BHD",
    "p": "Digital",
    "head": "yuen",
    "stage": 80,
    "m": {
     "Dec": 0.132
    }
   },
   {
    "c": "VIDA X STL 2026",
    "a": "THE VIDA WORLD SDN BHD",
    "p": "Digital + TV",
    "head": "alvin",
    "stage": 80,
    "m": {
     "Oct": 0.104
    },
    "runs": "Oct to Jan 27",
    "bookings": 3,
    "campaign": 0.284
   },
   {
    "c": "NIPPON PAINT SEEDER 2.0",
    "a": "Yellow Paper Plane",
    "p": "Digital",
    "head": "kazman",
    "stage": 80,
    "m": {
     "Dec": 0.103,
     "Jan": 0.103
    }
   },
   {
    "c": "RADIO COMMERCIAL",
    "a": "AEON CREDIT SERVICE (M) BERHAD",
    "p": "Radio",
    "head": "siokchin",
    "stage": 50,
    "m": {
     "Oct": 0.1
    },
    "runs": "Oct 26",
    "campaign": 0.1
   },
   {
    "c": "Emirates TV Spots (Sept to Oct)",
    "a": "EMIRATES (Malaysia)",
    "p": "TV",
    "head": "yuen",
    "stage": 80,
    "m": {
     "Oct": 0.094
    },
    "runs": "Oct 26",
    "bookings": 4,
    "campaign": 0.094
   },
   {
    "c": "ALL OUT SPM",
    "a": "mc corporate consultant sdn. b",
    "p": "TV",
    "head": "joy",
    "stage": 80,
    "m": {
     "Oct": 0.086
    },
    "runs": "Oct 26",
    "campaign": 0.086
   },
   {
    "c": "DIGITAL",
    "a": "QL POULTRY FARMS SDN. BHD.",
    "p": "Digital",
    "head": "edison",
    "stage": 80,
    "m": {
     "Oct": 0.08
    },
    "runs": "Oct to Dec 26",
    "campaign": 0.126
   },
   {
    "c": "GV - Pesta Vaganza + Radio",
    "a": "INNOCEAN ENTREPRISE",
    "p": "TV",
    "head": "yuen",
    "stage": 50,
    "m": {
     "Dec": 0.078
    }
   },
   {
    "c": "AWANIBYTE",
    "a": "INDAH WATER KONSORTIUM SDN BHD",
    "p": "Digital",
    "head": "siokchin",
    "stage": 80,
    "m": {
     "Dec": 0.077
    }
   },
   {
    "c": "[booking in] Lalamove x Fandom A",
    "a": "LALAMOVE MALAYSIA SDN BHD",
    "p": "Digital + Radio",
    "head": "alvin",
    "stage": 50,
    "m": {
     "Oct": 0.075
    },
    "runs": "Oct 26",
    "bookings": 4,
    "campaign": 0.075
   }
  ]
 },
 "wonNotBooked": {
  "months": {
   "Oct": {
    "count": 52,
    "value": 1.84
   },
   "Nov": {
    "count": 28
   },
   "Dec": {
    "count": 23
   },
   "Jan": {
    "count": 10
   }
  }
 },
 "booked": {
  "Oct": {
   "value": 14.89,
   "campaigns": 585,
   "advertisers": 320
  },
  "Nov": {
   "value": 5.13,
   "campaigns": 222,
   "advertisers": 144
  },
  "Dec": {
   "value": 3.95,
   "campaigns": 101,
   "advertisers": 64
  },
  "Jan": {
   "value": 1.01,
   "campaigns": 41,
   "advertisers": 32
  }
 },
 "bankOct": [
  [
   "PREPAID",
   "CELCOMDIGI BHD",
   "TV",
   "Booked",
   "suatwei",
   "—",
   0.664
  ],
  [
   "QL EGGS JUARAI PAGIMU - QL EGGS FM",
   "QL POULTRY FARMS SDN BHD",
   "Radio",
   "Booked",
   "edison",
   "—",
   0.334
  ],
  [
   "ASTRO RADIO SPONSORSHIP 2026",
   "U MOBILE SERVICES SDN BHD",
   "Radio",
   "Booked",
   "yuen",
   "—",
   0.324
  ],
  [
   "PELANCARAN BULAN MENABUNG SIMPAN SSPN…",
   "PERBADANAN TABUNG PENDIDIKAN TINGGI NASI",
   "Radio",
   "Booked",
   "joy",
   "—",
   0.315
  ],
  [
   "BULAN MALAYSIA SIHAT SEJAHTERA-OCT'26-DE…",
   "KEMENTERIAN KESIHATAN MALAYSIA",
   "Radio",
   "Booked",
   "joy",
   "—",
   0.295
  ],
  [
   "VIVAKI- MYTEKSI SDN BHD- ONEGRAB -ASTRO …",
   "MYTEKSI SDN BHD",
   "Digital",
   "Booked",
   "alvin",
   "—",
   0.289
  ],
  [
   "OMNET DEAL-MARIGOLD HL ADVANCE SARCOP…",
   "COTRA ENTERPRISE SDN BHD",
   "Radio",
   "Booked",
   "yuen",
   "—",
   0.225
  ],
  [
   "SUNWHITE RICE",
   "JASMINE FOOD CORPORATION SDN BHD",
   "TV",
   "Booked",
   "yuen",
   "—",
   0.222
  ],
  [
   "WA 016 2026 SPONSORSHIP",
   "CELCOMDIGI BHD",
   "Radio",
   "Won",
   "suatwei",
   "—",
   0.222
  ],
  [
   "ORION DEAL- GWM RADIO SPONSORSHIP 2026 …",
   "GREAT WALL MOTOR SALES MALAYSIA SDN BHD",
   "Radio",
   "Booked",
   "alvin",
   "—",
   0.219
  ],
  [
   "DENTSU DEAL-CONSIDER IPROSPECT PETRONA…",
   "PETRONAS DAGANGAN BERHAD",
   "Radio",
   "Booked",
   "suatwei",
   "—",
   0.216
  ],
  [
   "Putera35 Season 2",
   "TERAJU BUMIPUTERA CORPORATION",
   "Digital + TV",
   "Won",
   "joy",
   "—",
   0.164
  ],
  [
   "3M Scotch Brite - October 2026",
   "Ipg Orion Sdn Bhd",
   "Radio",
   "Won",
   "suatwei",
   "—",
   0.108
  ],
  [
   "ADABI TVC SPOTBUYS",
   "ADABI MEDIA AD SDN BHD",
   "TV",
   "Won",
   "joy",
   "—",
   0.078
  ],
  [
   "F1",
   "OMD (M) SDN BHD",
   "TV",
   "Won",
   "suatwei",
   "—",
   0.078
  ],
  [
   "BrandX Spot Buy - Oct",
   "OMD (M) SDN BHD",
   "TV",
   "Won",
   "suatwei",
   "—",
   0.078
  ],
  [
   "SMEVAGANZA26_MUTUAL EMPIRE SDN B",
   "MUTURE EMPIRE SDN BHD",
   "TV",
   "Won",
   "siokchin",
   "—",
   0.075
  ],
  [
   "SNEK KU 50TH ANNIVERSARY - SEGME",
   "NEW STAR FOOD INDUSTRIES SDN B",
   "Radio",
   "Won",
   "joanne",
   "—",
   0.07
  ],
  [
   "Celcomdigi STL 2026",
   "OMD (M) SDN BHD",
   "TV",
   "Won",
   "suatwei",
   "—",
   0.062
  ],
  [
   "JIWA SME x FAMA (KOPIE SATU) 202",
   "LEMBAGA PEMASARAN PERTANIAN PE",
   "Digital",
   "Won",
   "joy",
   "—",
   0.06
  ]
 ],
 "bankSprint": [
  [
   "ASTRO RADIO SPONSORSHIP 2026",
   "U MOBILE SERVICES SDN BHD",
   "Radio",
   "Booked",
   "yuen",
   "—",
   [
    0.324,
    0.313,
    0.335,
    0.093
   ],
   1.065
  ],
  [
   "OMNET DEAL-CD 016 POWERLINE SPONSORSHIP …",
   "CELCOMDIGI BHD",
   "Radio",
   "Booked",
   "suatwei",
   "—",
   [
    null,
    null,
    0.879,
    null
   ],
   0.879
  ],
  [
   "WA 016 2026 SPONSORSHIP",
   "CELCOMDIGI BHD",
   "Radio",
   "Won",
   "suatwei",
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
   "—",
   [
    0.664,
    null,
    null,
    null
   ],
   0.664
  ],
  [
   "MAXIS POSTPAID",
   "MAXIS BROADBAND SDN BHD",
   "TV",
   "Booked",
   "belinda",
   "—",
   [
    null,
    0.19,
    0.19,
    0.172
   ],
   0.552
  ],
  [
   "Celcomdigi STL 2026",
   "OMD (M) SDN BHD",
   "TV",
   "Won",
   "suatwei",
   "—",
   [
    0.062,
    0.211,
    0.211,
    0.062
   ],
   0.546
  ],
  [
   "OMNET DEAL-3 PAGI ERA SPONSORSHIP 2026",
   "CELCOMDIGI BHD",
   "Radio",
   "Booked",
   "suatwei",
   "—",
   [
    null,
    0.094,
    0.289,
    null
   ],
   0.383
  ],
  [
   "QL EGGS JUARAI PAGIMU - QL EGGS FM",
   "QL POULTRY FARMS SDN BHD",
   "Radio",
   "Booked",
   "edison",
   "—",
   [
    0.334,
    null,
    null,
    null
   ],
   0.334
  ],
  [
   "PELANCARAN BULAN MENABUNG SIMPAN SSPN…",
   "PERBADANAN TABUNG PENDIDIKAN TINGGI NASI",
   "Radio",
   "Booked",
   "joy",
   "—",
   [
    0.315,
    null,
    null,
    null
   ],
   0.315
  ],
  [
   "ADABI TVC SPOTBUYS",
   "ADABI MEDIA AD SDN BHD",
   "TV",
   "Won",
   "joy",
   "—",
   [
    0.078,
    0.078,
    0.078,
    0.078
   ],
   0.312
  ],
  [
   "WEATHER FORECAST DBKL 2026",
   "DEWAN BANDARAYA KUALA LUMPUR",
   "Radio",
   "Booked",
   "joy",
   "—",
   [
    null,
    0.097,
    0.1,
    0.101
   ],
   0.298
  ],
  [
   "BULAN MALAYSIA SIHAT SEJAHTERA-OCT'26-DE…",
   "KEMENTERIAN KESIHATAN MALAYSIA",
   "Radio",
   "Booked",
   "joy",
   "—",
   [
    0.295,
    null,
    null,
    null
   ],
   0.295
  ],
  [
   "VIVAKI- MYTEKSI SDN BHD- ONEGRAB -ASTRO …",
   "MYTEKSI SDN BHD",
   "Digital",
   "Booked",
   "alvin",
   "—",
   [
    0.289,
    null,
    null,
    null
   ],
   0.289
  ],
  [
   "WONDA COFFEE",
   "ETIKA SDN BHD",
   "TV",
   "Booked",
   "alvin",
   "—",
   [
    null,
    null,
    0.093,
    0.174
   ],
   0.267
  ],
  [
   "Keganasan Rumah Tangga (KRT) 2026 BY KPWKM…",
   "KEMENTERIAN PEMBANGUNAN WANITA, KELUARGA & M",
   "AA",
   "Won",
   "joy",
   "—",
   [
    null,
    0.233,
    null,
    null
   ],
   0.233
  ],
  [
   "INFOZONE SPONSORSHIP 2026",
   "PERODUA SALES SDN BHD",
   "Radio",
   "Booked",
   "alvin",
   "—",
   [
    null,
    0.119,
    0.113,
    null
   ],
   0.232
  ],
  [
   "OMNET DEAL-MARIGOLD HL ADVANCE SARCOP…",
   "COTRA ENTERPRISE SDN BHD",
   "Radio",
   "Booked",
   "yuen",
   "—",
   [
    0.225,
    null,
    null,
    null
   ],
   0.225
  ],
  [
   "SUNWHITE RICE",
   "JASMINE FOOD CORPORATION SDN BHD",
   "TV",
   "Booked",
   "yuen",
   "—",
   [
    0.222,
    null,
    null,
    null
   ],
   0.222
  ],
  [
   "ORION DEAL- GWM RADIO SPONSORSHIP 2026 …",
   "GREAT WALL MOTOR SALES MALAYSIA SDN BHD",
   "Radio",
   "Booked",
   "alvin",
   "—",
   [
    0.219,
    null,
    null,
    null
   ],
   0.219
  ],
  [
   "ORION DEAL- GWM RADIO SPONSORSHIP 2026 - …",
   "GREAT WALL MOTOR SALES MALAYSIA SDN BHD",
   "Radio",
   "Booked",
   "alvin",
   "—",
   [
    null,
    null,
    0.219,
    null
   ],
   0.219
  ],
  [
   "DENTSU DEAL-CONSIDER IPROSPECT PETRONA…",
   "PETRONAS DAGANGAN BERHAD",
   "Radio",
   "Booked",
   "suatwei",
   "—",
   [
    0.216,
    null,
    null,
    null
   ],
   0.216
  ],
  [
   "OTWC CNY 2026 MV (Feb 2027)",
   "Invictus Blue Sdn Bhd",
   "TV",
   "Won",
   "yuen",
   "—",
   [
    null,
    0.203,
    null,
    null
   ],
   0.203
  ],
  [
   "BRAND X",
   "OMD (M) SDN BHD",
   "TV",
   "Booked",
   "suatwei",
   "—",
   [
    null,
    0.202,
    null,
    null
   ],
   0.202
  ],
  [
   "ORION DEAL- GWM RADIO SPONSORSHIP 2026 - SP…",
   "GREAT WALL MOTOR SALES MALAYSIA SDN BHD",
   "Radio",
   "Booked",
   "alvin",
   "—",
   [
    null,
    0.199,
    null,
    null
   ],
   0.199
  ],
  [
   "Sensodyne Cavity Launch",
   "VIVAKI (MALAYSIA) SDN BHD",
   "Radio",
   "Won",
   "suatwei",
   "—",
   [
    null,
    0.098,
    0.096,
    null
   ],
   0.194
  ],
  [
   "KWSP - 75th ANNIVERSARY DOCUMENTARY [AGEN…",
   "Ipg Orion Sdn Bhd",
   "Digital + TV",
   "Won",
   "joy",
   "—",
   [
    null,
    0.181,
    null,
    null
   ],
   0.181
  ],
  [
   "Putera35 Season 2",
   "TERAJU BUMIPUTERA CORPORATION",
   "Digital + TV",
   "Won",
   "joy",
   "—",
   [
    0.164,
    null,
    null,
    null
   ],
   0.164
  ],
  [
   "MEDIA BUY KPWKM 2026",
   "KEMENTERIAN PEMBANGUNAN WANITA, KELUARGA & M",
   "TV",
   "Won",
   "joy",
   "—",
   [
    null,
    0.135,
    null,
    null
   ],
   0.135
  ],
  [
   "[Booking In] Poh Kong Year End Campaign",
   "POH KONG JEWELLERS SDN BHD",
   "Digital + Radio",
   "Won",
   "yuen",
   "—",
   [
    null,
    null,
    0.13,
    null
   ],
   0.13
  ],
  [
   "INVENTORY DEAL 3.0-JIWA SME 2026 (ROS XTRA)",
   "TM TECHNOLOGY SERVICES SDN BHD",
   "Radio",
   "Booked",
   "suatwei",
   "—",
   [
    null,
    0.122,
    null,
    null
   ],
   0.122
  ],
  [
   "OMNET DEAL-CD 016 POWERLINE SPONSORSHIP 2…",
   "CELCOMDIGI BHD",
   "Radio",
   "Booked",
   "suatwei",
   "—",
   [
    null,
    0.117,
    null,
    null
   ],
   0.117
  ],
  [
   "3M Scotch Brite - October 2026",
   "Ipg Orion Sdn Bhd",
   "Radio",
   "Won",
   "suatwei",
   "—",
   [
    0.108,
    null,
    null,
    null
   ],
   0.108
  ],
  [
   "SMEVAGANZA26_VORTEXIN HIPP",
   "VORTEXIN SDN BHD",
   "Radio",
   "Won",
   "siokchin",
   "—",
   [
    null,
    null,
    null,
    0.102
   ],
   0.102
  ],
  [
   "SENSODYNE CAVITY LAUNCH RADIO CAMPAIGN-N…",
   "GLAXOSMITHKLINE",
   "Radio",
   "Booked",
   "suatwei",
   "—",
   [
    null,
    null,
    0.101,
    null
   ],
   0.101
  ],
  [
   "SENSODYNE CAVITY LAUNCH RADIO CAMPAIGN-NO…",
   "GLAXOSMITHKLINE",
   "Radio",
   "Booked",
   "suatwei",
   "—",
   [
    null,
    0.098,
    null,
    null
   ],
   0.098
  ],
  [
   "TALENT BANK ISLAM",
   "BANK ISLAM MALAYSIA BERHAD",
   "Digital",
   "Won",
   "joy",
   "—",
   [
    null,
    null,
    null,
    0.096
   ],
   0.096
  ],
  [
   "CCTV - ASTRO GROUP BENEFITS & INVESTMENT …",
   "CCTV NEWS CONTENT CO LTD",
   "TV",
   "Booked",
   "joy",
   "—",
   [
    null,
    null,
    0.093,
    null
   ],
   0.093
  ],
  [
   "CCTV - ASTRO GROUP BENEFITS & INVESTMENT DE…",
   "CCTV NEWS CONTENT CO LTD",
   "TV",
   "Booked",
   "joy",
   "—",
   [
    null,
    null,
    null,
    0.093
   ],
   0.093
  ],
  [
   "Darlie Double Action Food Campaign P2 Oct 2026",
   "HAWLEY & HAZEL (M) SDN BHD",
   "Digital",
   "Won",
   "kazman",
   "—",
   [
    null,
    0.085,
    null,
    null
   ],
   0.085
  ],
  [
   "F1",
   "OMD (M) SDN BHD",
   "TV",
   "Won",
   "suatwei",
   "—",
   [
    0.078,
    null,
    null,
    null
   ],
   0.078
  ],
  [
   "BrandX Spot Buy - Oct",
   "OMD (M) SDN BHD",
   "TV",
   "Won",
   "suatwei",
   "—",
   [
    0.078,
    null,
    null,
    null
   ],
   0.078
  ],
  [
   "BrandX Spot Buy - Nov",
   "OMD (M) SDN BHD",
   "TV",
   "Won",
   "suatwei",
   "—",
   [
    null,
    0.078,
    null,
    null
   ],
   0.078
  ],
  [
   "SMEVAGANZA26_POWERPETS FOOD SDN BHD",
   "POWERPETS FOOD SDN BHD",
   "Radio",
   "Won",
   "siokchin",
   "—",
   [
    null,
    null,
    0.076,
    null
   ],
   0.076
  ],
  [
   "SMEVAGANZA26_MUTUAL EMPIRE SDN B",
   "MUTURE EMPIRE SDN BHD",
   "TV",
   "Won",
   "siokchin",
   "—",
   [
    0.075,
    null,
    null,
    null
   ],
   0.075
  ],
  [
   "SNEK KU 50TH ANNIVERSARY - SEGME",
   "NEW STAR FOOD INDUSTRIES SDN B",
   "Radio",
   "Won",
   "joanne",
   "—",
   [
    0.07,
    null,
    null,
    null
   ],
   0.07
  ],
  [
   "JIWA SME x FAMA (KOPIE SATU) 202",
   "LEMBAGA PEMASARAN PERTANIAN PE",
   "Digital",
   "Won",
   "joy",
   "—",
   [
    0.06,
    null,
    null,
    null
   ],
   0.06
  ],
  [
   "SMEVAGANZA26_PY HEALTHCARE",
   "PY HEALTHCARE SDN BHD",
   "Radio",
   "Won",
   "siokchin",
   "—",
   [
    null,
    null,
    null,
    0.058
   ],
   0.058
  ],
  [
   "Safe Guard Your Money 2027",
   "PERBADANAN INSURANS DEPOSIT MALAYSIA",
   "Radio",
   "Won",
   "joy",
   "—",
   [
    null,
    null,
    null,
    0.058
   ],
   0.058
  ],
  [
   "POSTPAID & PREPAID - UMOBILE BWF TAKEOVER 2…",
   "U MOBILE SDN BHD",
   "TV",
   "Booked",
   "yuen",
   "—",
   [
    null,
    null,
    null,
    0.05
   ],
   0.05
  ],
  [
   "SME UPFRONT 26 REG MY CE",
   "AGENSI PEKERJAAN ETERNITY SDN BHD",
   "Radio",
   "Won",
   "siokchin",
   "—",
   [
    null,
    null,
    0.049,
    null
   ],
   0.049
  ],
  [
   "SME UPFRONT 26_MILESTONE",
   "MILESTONE PRODUCTION SDN BHD",
   "Radio",
   "Won",
   "siokchin",
   "—",
   [
    null,
    null,
    0.047,
    null
   ],
   0.047
  ],
  [
   "SME UPFRONT 26 - STYLE LASER",
   "STYLE LASER AUDIO SDN BHD",
   "Radio",
   "Won",
   "siokchin",
   "—",
   [
    null,
    null,
    0.046,
    null
   ],
   0.046
  ],
  [
   "SMEVaganza - UNIKL",
   "CD ADVERTISING SDN BHD",
   "Digital",
   "Won",
   "yuen",
   "—",
   [
    null,
    null,
    0.046,
    null
   ],
   0.046
  ],
  [
   "SMEVAGANZA26_PETOUR MALAYSIA SDN BHD",
   "PETOUR MALAYSIA SDN BHD",
   "Radio",
   "Won",
   "siokchin",
   "—",
   [
    null,
    null,
    null,
    0.046
   ],
   0.046
  ],
  [
   "ORION DEAL-BWF BADMINTON TAKEOVER 2026",
   "U MOBILE SERVICES SDN BHD",
   "Radio",
   "Booked",
   "yuen",
   "—",
   [
    null,
    null,
    null,
    0.043
   ],
   0.043
  ],
  [
   "RETAIL BANKING OCT'26-JAN'27",
   "BANK SIMPANAN NASIONAL BERHAD",
   "Radio",
   "Booked",
   "joy",
   "—",
   [
    null,
    null,
    null,
    0.036
   ],
   0.036
  ],
  [
   "2026 MJN Ambassador",
   "MEAD JOHNSON NUTRITION (M) SDN BHD",
   "Digital",
   "Won",
   "amelia",
   "—",
   [
    null,
    null,
    null,
    0.036
   ],
   0.036
  ],
  [
   "ERA CEKEPI 1 YEAR SPONSORSHIP 2026 (MARCH'2…",
   "UMW TOYOTA MOTOR SDN BHD",
   "Radio",
   "Booked",
   "alvin",
   "—",
   [
    null,
    null,
    null,
    0.022
   ],
   0.022
  ],
  [
   "MELODY - TIME CHECK, SME AN HOUR, MELODY HE…",
   "GOODMORNING GLOBAL SDN BHD",
   "Radio",
   "Booked",
   "alvin",
   "—",
   [
    null,
    null,
    null,
    0.021
   ],
   0.021
  ],
  [
   "SMEVAGANZA26_BORAK SEENI PACKAGE",
   "STF RESOURCES SDN BHD",
   "Radio",
   "Won",
   "edison",
   "—",
   [
    null,
    null,
    null,
    0.013
   ],
   0.013
  ],
  [
   "BIDAURA",
   "ZS EMPIRE SDN BHD",
   "Radio",
   "Won",
   "joy",
   "—",
   [
    null,
    null,
    null,
    0.008
   ],
   0.008
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
    "line": "Kult",
    "heads": [
     "kazman",
     "amelia"
    ],
    "note": "Kenn leads Kult at the level of Jeya, Nicholas and Simon; from 16 Oct its two heads, Kazman and Amelia, report separately."
   }
  ]
 },
 "teamDetail": {
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
       67,
       79,
       2.0
      ],
      [
       12,
       13,
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
     "f": 1.6,
     "g": -6.8
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
       25,
       29,
       0.474
      ],
      [
       0,
       0,
       0.515
      ],
      [
       0,
       0,
       0.484
      ]
     ],
     "f": 0.203,
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
       17,
       17,
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
     "f": 0.083,
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
       223,
       263,
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
     "f": 1.2,
     "g": -0.811
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
       14,
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
       50,
       50,
       2.0
      ],
      [
       39,
       44,
       2.2
      ],
      [
       8,
       8,
       2.1
      ],
      [
       11,
       11,
       1.5
      ]
     ],
     "f": 2.2,
     "g": -5.6
    },
    {
     "id": "Nazihah (own book)",
     "n": "Nazihah",
     "full": "ABDOL GHAPOR, Nazihah",
     "kind": "own",
     "mgr": "Nazihah",
     "cells": [
      [
       84,
       84,
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
     "f": 0.59,
     "g": -2.4
    },
    {
     "id": "Nurul Syahirah",
     "n": "Nurul Syahirah",
     "full": "SAMSUDIN, Nurul Syahirah",
     "kind": "exec",
     "mgr": "Nazihah",
     "cells": [
      [
       11,
       11,
       0.808
      ],
      [
       8,
       8,
       0.865
      ],
      [
       10,
       10,
       0.536
      ],
      [
       10,
       10,
       0.479
      ]
     ],
     "f": 0.259,
     "g": -2.4
    },
    {
     "id": "Nadia Rosli",
     "n": "Nadia Rosli",
     "full": "ROSLI, Nadia",
     "kind": "exec",
     "mgr": "Nazihah",
     "cells": [
      [
       71,
       71,
       0.545
      ],
      [
       146,
       172,
       0.478
      ],
      [
       21,
       21,
       0.553
      ],
      [
       24,
       24,
       0.486
      ]
     ],
     "f": 1.3,
     "g": -0.744
    },
    {
     "id": "Sharifah Kuraisha",
     "n": "Sharifah Kuraisha",
     "full": "SYED AMIR SAMSUDDIN, Sharifah Khuraisha",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       18,
       43,
       1.6
      ],
      [
       36,
       140,
       1.8
      ],
      [
       1,
       14,
       1.7
      ],
      [
       4,
       25,
       1.5
      ]
     ],
     "f": 1.0,
     "g": -5.6
    },
    {
     "id": "Sharifah Kuraisha (own book)",
     "n": "Sharifah Kuraisha",
     "full": "SYED AMIR SAMSUDDIN, Sharifah Khuraisha",
     "kind": "own",
     "mgr": "Sharifah Kuraisha",
     "cells": [
      [
       10,
       10,
       0.501
      ],
      [
       10,
       10,
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
       63,
       0.595
      ],
      [
       0,
       175,
       0.881
      ],
      [
       2,
       44,
       0.559
      ],
      [
       12,
       75,
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
       37,
       53,
       0.504
      ],
      [
       127,
       200,
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
     "f": 0.789,
     "g": -1.2
    },
    {
     "id": "Nurul Huda",
     "n": "Nurul Huda",
     "full": "HAMIDON, Nurul Huda",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       75,
       86,
       1.5
      ],
      [
       38,
       43,
       1.6
      ],
      [
       11,
       86,
       1.7
      ],
      [
       15,
       15,
       1.8
      ]
     ],
     "f": 2.1,
     "g": -4.4
    },
    {
     "id": "Nurul Huda (own book)",
     "n": "Nurul Huda",
     "full": "HAMIDON, Nurul Huda",
     "kind": "own",
     "mgr": "Nurul Huda",
     "cells": [
      [
       60,
       60,
       0.495
      ],
      [
       51,
       53,
       0.528
      ],
      [
       25,
       57,
       0.672
      ],
      [
       33,
       33,
       0.805
      ]
     ],
     "f": 1.0,
     "g": -1.5
    },
    {
     "id": "Monica",
     "n": "Monica",
     "full": "MUJAH, Siti Mahdeya Yvonne",
     "kind": "exec",
     "mgr": "Nurul Huda",
     "cells": [
      [
       59,
       59,
       0.496
      ],
      [
       48,
       52,
       0.515
      ],
      [
       1,
       1,
       0.532
      ],
      [
       0,
       0,
       0.533
      ]
     ],
     "f": 0.543,
     "g": -1.5
    },
    {
     "id": "Arif",
     "n": "Arif",
     "full": "AMINUDDIN, Mohamad Arif",
     "kind": "exec",
     "mgr": "Nurul Huda",
     "cells": [
      [
       106,
       141,
       0.48
      ],
      [
       16,
       23,
       0.508
      ],
      [
       2,
       215,
       0.506
      ],
      [
       0,
       0,
       0.476
      ]
     ],
     "f": 0.601,
     "g": -1.4
    }
   ],
   "total": {
    "cells": [
     [
      53,
      64,
      7.0
     ],
     [
      31,
      60,
      7.4
     ],
     [
      5,
      24,
      7.9
     ],
     [
      7,
      11,
      7.0
     ]
    ],
    "f": 6.9,
    "g": -22.4
   },
   "open": [
    [
     "Perolehahan Media Buy 2026-2027",
     "KEMENTERIAN KESIHATAN MALAYSIA",
     "Digital + Radio +…",
     "50%",
     "Arif",
     {
      "Dec": 1.1
     }
    ],
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
     "Advokasi Nilai Kasih Keluarga",
     "Lembaga Penduduk dan Pembangunan K…",
     "Radio",
     "50%",
     "Nurshafiqah",
     {
      "Nov": 0.249
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
     "INSTITUT INTEGRITI MALAYSIA - AWANI MEDIA BUY",
     "INSTITUT INT…",
     "TV",
     "80%",
     "Nash",
     {
      "Nov": 0.094
     }
    ],
    [
     "ALL OUT SPM",
     "mc corporate consultant sdn. bhd.",
     "TV",
     "80%",
     "Fauzi",
     {
      "Oct": 0.086
     }
    ],
    [
     "AWANI DIGITAL KPKT",
     "KEMENTERIAN PERUMAHAN DAN KERAJAAN TEMPA",
     "Digital",
     "80%",
     "Nurul Huda",
     {
      "Nov": 0.043
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
     "POSTAL FORUM - HARI KURIER NEGARA 2026",
     "ASSOCIATION OF MAL…",
     "TV",
     "50%",
     "Monica",
     {
      "Nov": 0.023
     }
    ],
    [
     "Karnival Hebatkan Perniagaan Malaysia",
     "Kementerian Pembangunan…",
     "Radio + TV",
     "50%",
     "Ungku Asif",
     {
      "Oct": 0.023
     }
    ],
    [
     "Rempah Faiza (Nov26)",
     "ENRICHMENT MEDIA LAB SDN BHD (agency)",
     "Radio",
     "80%",
     "Arif",
     {
      "Nov": 0.019
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
     0.401
    ],
    [
     "PELANCARAN BULAN MENABUNG SIMPAN SSPN…",
     "PERBADANAN TABUNG PENDIDIKAN TINGGI NASI",
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
     "ADABI TVC SPOTBUYS",
     "ADABI MEDIA AD SDN BHD",
     "TV",
     "Won",
     "Nurul Huda",
     [
      0.078,
      0.078,
      0.078,
      0.078
     ],
     0.312
    ],
    [
     "BULAN MALAYSIA SIHAT SEJAHTERA-OCT'26-DE…",
     "KEMENTERIAN KESIHATAN MALAYSIA",
     "Radio",
     "Booked",
     "Arif",
     [
      0.295,
      null,
      null,
      null
     ],
     0.295
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
     "Keganasan Rumah Tangga (KRT) 2026 BY KPWKM…",
     "KEMENTERIAN PEMBANGUNAN WANITA, KELUARGA & M",
     "AA",
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
     "CCTV - ASTRO GROUP BENEFITS & INVESTMENT…",
     "CCTV NEWS CONTENT CO LTD",
     "TV",
     "Booked",
     "Nurul Huda",
     [
      0.093,
      null,
      0.093,
      null
     ],
     0.186
    ],
    [
     "CCTV - ASTRO GROUP BENEFITS & INVESTMENT DE…",
     "CCTV NEWS CONTENT CO LTD",
     "TV",
     "Booked",
     "Nurul Huda",
     [
      null,
      0.093,
      null,
      0.093
     ],
     0.186
    ],
    [
     "KWSP - 75th ANNIVERSARY DOCUMENTARY [AGEN…",
     "Ipg Orion Sdn Bhd",
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
      null,
      0.055,
      0.055,
      0.036
     ],
     0.146
    ],
    [
     "MEDIA BUY KPWKM 2026",
     "KEMENTERIAN PEMBANGUNAN WANITA, KELUARGA & M",
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
     0.117
    ],
    [
     "INVENTORY DEAL 3.0-BUILDING FINANCIAL REA…",
     "KUMPULAN WANG SIMPANAN PEKERJA",
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
    ],
    [
     "TALENT BANK ISLAM",
     "BANK ISLAM MALAYSIA BERHAD",
     "Digital",
     "Won",
     "Nurul Huda",
     [
      null,
      null,
      null,
      0.096
     ],
     0.096
    ],
    [
     "KILAUAN EMAS SELEBRITI",
     "DICCI GROUP SDN BHD",
     "Digital",
     "Booked",
     "Fauzi",
     [
      0.09,
      null,
      null,
      null
     ],
     0.09
    ],
    [
     "JIWA SME x FAMA (KOPIE SATU) 2026",
     "LEMBAGA PEMASARAN PERTANIAN PERSEKUTUAN (FAM",
     "Digital + Radio",
     "Won",
     "Nurshafiqah",
     [
      0.06,
      0.012,
      null,
      null
     ],
     0.072
    ],
    [
     "ROS XTRA-AGENDA NASIONAL MALAYSIA SIHAT…",
     "KEMENTERIAN KESIHATAN MALAYSIA",
     "Radio",
     "Booked",
     "Arif",
     [
      0.07,
      null,
      null,
      null
     ],
     0.07
    ],
    [
     "KWSP - BASS [NIKAH]",
     "KUMPULAN WANG SIMPANAN PEKERJA",
     "Digital + TV",
     "Won",
     "Monica",
     [
      0.038,
      0.028,
      null,
      null
     ],
     0.066
    ],
    [
     "Safe Guard Your Money 2027",
     "PERBADANAN INSURANS DEPOSIT MALAYSIA",
     "Radio",
     "Won",
     "Imran",
     [
      null,
      null,
      null,
      0.058
     ],
     0.058
    ],
    [
     "ESKAYVIE HEALTHCARE",
     "ESKAYVIE SDN BHD",
     "TV",
     "Booked",
     "Nurul Huda",
     [
      null,
      0.052,
      null,
      null
     ],
     0.052
    ],
    [
     "Branding",
     "AMANAHRAYA TRUSTEESBERHAD",
     "Digital + TV",
     "Won",
     "Imran",
     [
      0.051,
      null,
      null,
      null
     ],
     0.051
    ],
    [
     "ROS XTRA-AGENDA NASIONAL MALAYSIA SIHAT-OC…",
     "KEMENTERIAN KESIHATAN MALAYSIA",
     "Radio",
     "Booked",
     "Arif",
     [
      null,
      0.045,
      null,
      null
     ],
     0.045
    ],
    [
     "PUNGUTAN ZAKAT BERKALA - SEPT-NOV'26 ( ROS X…",
     "HARTA SUCI S/B",
     "Radio",
     "Booked",
     "Ungku Asif",
     [
      null,
      0.044,
      null,
      null
     ],
     0.044
    ],
    [
     "CTOS KREDIT KAU HIJAU 2.0 (17/9/26-15/11/26)-A",
     "CTOS DATA SYSTEMS SDN BHD",
     "Radio",
     "Booked",
     "Sharifah Kuraisha",
     [
      null,
      0.041,
      null,
      null
     ],
     0.041
    ],
    [
     "JUALAN AGRO MADANI (JAM)",
     "LEMBAGA PEMASARAN PERTANIAN PERSEKUTUAN (FAM",
     "Radio",
     "Won",
     "Nurshafiqah",
     [
      null,
      0.038,
      null,
      null
     ],
     0.038
    ],
    [
     "BIDAURA",
     "ZS EMPIRE SDN BHD",
     "Radio",
     "Won",
     "Nadia Rosli",
     [
      0.008,
      0.01,
      0.008,
      0.008
     ],
     0.034
    ],
    [
     "ZAYAN WAKTU SOLAT - OCT'26-APRIL'27",
     "EMPAYAR ZSAQ SDN BHD",
     "Radio",
     "Booked",
     "Nadia Rosli",
     [
      null,
      null,
      0.008,
      0.008
     ],
     0.016
    ],
    [
     "ERA TANYA PROMO & GEGAR EXPERT HOUR X M…",
     "AGROBANK BANK PERTANIAN MALAYSIA BERHAD",
     "Radio",
     "Booked",
     "Imran",
     [
      null,
      null,
      0.014,
      null
     ],
     0.014
    ],
    [
     "CBP - FANDOM AA COMPLETED VIEWS",
     "ENRICHMENT MEDIA LAB SDN BHD",
     "AA",
     "Won",
     "Monica",
     [
      0.012,
      null,
      null,
      null
     ],
     0.012
    ],
    [
     "BRAND AWARENESS",
     "KLINIK NUR RAISHA",
     "TV",
     "Booked",
     "Nurul Syahirah",
     [
      null,
      null,
      null,
      0.01
     ],
     0.01
    ],
    [
     "PAKEJ HUJUNG MINGGU GEGAR & ZAYAN AUG-D…",
     "KOPERASI CO-OPBANK PERTAMA MALAYSIA",
     "Radio",
     "Booked",
     "Monica",
     [
      null,
      null,
      0.007,
      null
     ],
     0.007
    ],
    [
     "Borak SeeNI : KPJ Kuala Selangor",
     "ACI ACI BUKA PINTU ENTERPRISE",
     "TV",
     "Won",
     "Arif",
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
     "PELANCARAN BULAN MENABUNG SIMPAN SSPN…",
     "PERBADANAN TABUNG PENDIDIKAN TINGGI NASI",
     "Radio",
     "Booked",
     "Nazihah",
     0.315
    ],
    [
     "BULAN MALAYSIA SIHAT SEJAHTERA-OCT'26-DE…",
     "KEMENTERIAN KESIHATAN MALAYSIA",
     "Radio",
     "Booked",
     "Arif",
     0.295
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
     "INVENTORY DEAL 3.0-BUILDING FINANCIAL REA…",
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
     "CCTV - ASTRO GROUP BENEFITS & INVESTMENT…",
     "CCTV NEWS CONTENT CO LTD",
     "TV",
     "Booked",
     "Nurul Huda",
     0.093
    ],
    [
     "KILAUAN EMAS SELEBRITI",
     "DICCI GROUP SDN BHD",
     "Digital",
     "Booked",
     "Fauzi",
     0.09
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
     "ADABI TVC SPOTBUYS",
     "ADABI MEDIA AD SDN BHD",
     "TV",
     "Won",
     "Nurul Huda",
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
     "ROS XTRA-AGENDA NASIONAL MALAYSIA SIHAT…",
     "KEMENTERIAN KESIHATAN MALAYSIA",
     "Radio",
     "Booked",
     "Arif",
     0.07
    ],
    [
     "JIWA SME x FAMA (KOPIE SATU) 2026",
     "LEMBAGA PEMASARAN PERTANIAN PERSEKUTUAN (FAM",
     "Digital",
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
     "Branding",
     "AMANAHRAYA TRUSTEESBERHAD",
     "Digital + TV",
     "Won",
     "Imran",
     0.051
    ],
    [
     "KWSP - BASS [NIKAH]",
     "KUMPULAN WANG SIMPANAN PEKERJA",
     "Digital + TV",
     "Won",
     "Monica",
     0.038
    ],
    [
     "CBP - FANDOM AA COMPLETED VIEWS",
     "ENRICHMENT MEDIA LAB SDN BHD",
     "AA",
     "Won",
     "Monica",
     0.012
    ],
    [
     "BIDAURA",
     "ZS EMPIRE SDN BHD",
     "Radio",
     "Won",
     "Nadia Rosli",
     0.008
    ],
    [
     "Borak SeeNI : KPJ Kuala Selangor",
     "ACI ACI BUKA PINTU ENTERPRISE",
     "TV",
     "Won",
     "Arif",
     0.003
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
     "BULAN MALAYSIA SIHAT SEJAHTERA-OCT'26-DEC'26 (SP",
     "KEMENTERIAN KESIHATAN MALAYSIA",
     "Radio",
     "Arif",
     0.253
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
     "KILAUAN EMAS SELEBRITI",
     "DICCI GROUP SDN BHD",
     "Digital + Radio",
     "Fauzi",
     0.09
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
     "PTPTN - BULAN MENABUNG SIMPAN SSPN BMS 2026",
     "PERBADANAN TABUNG PENDIDIKAN TINGGI NASI",
     "TV",
     "Nazihah",
     0.051
    ],
    [
     "FEATURE HITZ FM THAT'S SO MALAYSIAN",
     "KEMENTERIAN PERPADUAN NEGARA",
     "Radio",
     "Monica",
     0.045
    ],
    [
     "BULAN MALAYSIA SIHAT SEJAHTERA-OCT'26-DEC'26 (RO",
     "KEMENTERIAN KESIHATAN MALAYSIA",
     "Radio",
     "Arif",
     0.042
    ],
    [
     "JKM - SAMBUTAN HARI WARGE EMAS 2026",
     "JABATAN KEBAJIKAN MASYARAKAT (JKM)",
     "TV",
     "Nurshafiqah",
     0.039
    ],
    [
     "SME26 PEN ERA 325",
     "EMAS SRI SEMANTAN SDN BHD",
     "Radio",
     "Fauzi",
     0.038
    ],
    [
     "RETAIL BANKING OCT'26-JAN'27",
     "BANK SIMPANAN NASIONAL BERHAD",
     "Radio",
     "Nurul Syahirah",
     0.036
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
     "KWSP SINAR SHARING IS CARING",
     "KUMPULAN WANG SIMPANAN PEKERJA",
     "Radio",
     "Monica",
     0.028
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
     "XP DAY STEM & TVET EDUCATION PROMOTIONAL (16/10/",
     "TODAK ACADEMY SDN BHD",
     "Radio",
     "Arif",
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
     "KILAUN EMAS SELEBRITI",
     "DICCI GROUP SDN BHD",
     "AA",
     "Fauzi",
     0.02
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
     "GRAND FINAL VARSITY TRACK & FIELD 2026",
     "UNIVERSITI PUTRA MALAYSIA",
     "TV",
     "Nazihah",
     0.018
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
     "PRASARANA MALAYSIA BERHAD",
     "PRASARANA MALAYSIA BERHAD",
     "TV",
     "Arif",
     0.013
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
     "ZAYAN WAKTU SOLAT - OCT'26-APRIL'27",
     "EMPAYAR ZSAQ SDN BHD",
     "Radio",
     "Nadia Rosli",
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
     "VISIT MALAYSIA 2026-2027",
     "LEMBAGA PENGGALAKAN PELANCONGAN MALAYSIA",
     "AA",
     "Reezal",
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
     "SIDEC 2025",
     "SIDEC SDN BHD",
     "Digital",
     "Nurul Syahirah",
     0.006
    ],
    [
     "EKUINAS BERHAD - ILTIZAM PDP",
     "EKUINAS BERHAD",
     "TV",
     "Reezal",
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
     "PENGUATKUASAAN DEMI KEPULIHAN-SEMBANG PANTAI TIM",
     "AGENSI ANTIDADAH KEBANGSAAN",
     "Radio",
     "Nurul Syahirah",
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
     "ASTRO AWANI & ASTRO AUDIO",
     "KEMENTERIAN PERPADUAN NEGARA",
     "Digital",
     "Monica",
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
     "SEGMENT SPONSORSHIP SINAR REHAT & RELAX",
     "KOPERASI CO-OPBANK PERTAMA MALAYSIA",
     "Digital",
     "Monica",
     0.003
    ],
    [
     "SAMBUTAN HARI WARGA EMAS 2026",
     "JABATAN KEBAJIKAN MASYARAKAT",
     "Digital",
     "Nurshafiqah",
     0.003
    ],
    [
     "BANK FACILITIES (SINAR CENTRAL)",
     "KOPERASI CO-OPBANK PERTAMA MALAYSIA",
     "Radio",
     "Monica",
     0.003
    ],
    [
     "ZAYAN PAGI SPONSORSHIP WITH IN SAFF TRAVEL & TOU",
     "IN SAFF TRAVEL & TOURS SDN BHD",
     "Digital",
     "Nazihah",
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
     "JAKIM - BULAN OKTOBER, BULAN AL-QURAN",
     "JABATAN KEMAJUAN ISLAM MALAYSIA (JAKIM)",
     "Digital",
     "Nash",
     0.002
    ],
    [
     "International Greentech & Eco Products Exhibitio",
     "LEMB.PEMBANGUNAN PELABURAN MALAYSIA",
     "Digital",
     "Nurshafiqah",
     0.002
    ],
    [
     "CARTA ERA 40",
     "FYQA MARKETING",
     "Digital",
     "Fauzi",
     0.002
    ],
    [
     "WEEKEND DOMINATION GEGAR & ZAYAN",
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
     "OPENING CEREMONY THE WORLD SOCIAL SECURITY FORUM",
     "PERTUBUHAN KESELAMATAN SOSIAL (PERKESO)",
     "Digital",
     "Nurul Syahirah",
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
     "Soalan Keberkesanan Ekonomi",
     "UNIT PENYELARASAN LONJAKAN PRESTASI",
     "Digital",
     "Nash",
     0.0
    ],
    [
     "SME26 PEN ERA 100",
     "ADABI CONSUMER INDUSTRIES SDN BHD",
     "Radio",
     "Nurul Huda",
     0.0
    ],
    [
     "UAT Testing Hybrid",
     "LEMBAGA ZAKAT SELANGOR",
     "AA",
     "—",
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
       4,
       11,
       0.74
      ],
      [
       0,
       1,
       0.761
      ],
      [
       1,
       1,
       0.831
      ],
      [
       0,
       1,
       0.735
      ]
     ],
     "f": 0.043,
     "g": -3.0
    },
    {
     "id": "Subra",
     "n": "Subra",
     "full": "VEERASAMY, Subramaniam",
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
     "g": -3.1,
     "assumed": "VEERASAMY, Subramaniam is read as Subra on the chart"
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
       2,
       0.74
      ],
      [
       0,
       3,
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
       106,
       111,
       0.5
      ],
      [
       12,
       18,
       0.5
      ],
      [
       5,
       7,
       0.5
      ],
      [
       4,
       4,
       0.4
      ]
     ],
     "f": 0.633,
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
       33,
       0.4
      ],
      [
       2,
       29,
       0.5
      ],
      [
       2,
       47,
       0.5
      ],
      [
       0,
       6,
       0.5
      ]
     ],
     "f": 0.018,
     "g": -1.9
    },
    {
     "id": "Edison",
     "n": "Edison",
     "full": "LIM, Kin Wai [Edison]",
     "kind": "exec",
     "mgr": null,
     "cells": [
      {
       "f": 0.039,
       "c": 0.048
      },
      {
       "f": 0.024,
       "c": 0.03
      },
      null,
      null
     ],
     "f": 0.062,
     "g": null,
     "qual": "own sales as head",
     "headOwn": true
    }
   ],
   "total": {
    "cells": [
     [
      20,
      27,
      3.1
     ],
     [
      3,
      9,
      3.3
     ],
     [
      1,
      8,
      3.5
     ],
     [
      0,
      2,
      3.1
     ]
    ],
    "f": 0.766,
    "g": -12.2
   },
   "open": [
    [
     "DIGITAL",
     "QL POULTRY FARMS SDN. BHD.",
     "Digital",
     "80%",
     "Zack",
     {
      "Oct": 0.08,
      "Nov": 0.038,
      "Dec": 0.008
     }
    ],
    [
     "SINAR SEGMENT SPONSORSHIP - GEN SINAR PAGI OCT-N",
     "SYARIK…",
     "Digital + Radio",
     "80%",
     "Edison",
     {
      "Oct": 0.048,
      "Nov": 0.03
     }
    ],
    [
     "Fella Q3 Stream Campaign",
     "Fella (via Art Script agency)",
     "Digital",
     "50%",
     "Kavinraj",
     {
      "Nov": 0.067
     }
    ],
    [
     "ParkCity Ara Damansara Launch",
     "TRAPPER MEDIA GROUP",
     "Digital",
     "50%",
     "Kavinraj",
     {
      "Nov": 0.067
     }
    ],
    [
     "Qalam Management",
     "Qalam Management",
     "Radio",
     "80%",
     "Rizal",
     {
      "Oct": 0.029,
      "Dec": 0.012
     }
    ],
    [
     "GOAT Luck CNY Festival 2027",
     "Ryt Bank",
     "Radio",
     "50%",
     "Kavinraj",
     {
      "Jan": 0.029
     }
    ],
    [
     "Maybank Visa Stream Campaign",
     "Assembly Global Ltd",
     "Digital",
     "80%",
     "Kavinraj",
     {
      "Nov": 0.012,
      "Dec": 0.012
     }
    ],
    [
     "RADIO COMMERCIAL",
     "PURPLE CANE",
     "Radio",
     "50%",
     "Zack",
     {
      "Nov": 0.017
     }
    ],
    [
     "K.M OLI MOHAMED YEAR END SALE 2026",
     "K.M. OLI MOHAMED (M) SD…",
     "Radio",
     "80%",
     "Zack",
     {
      "Dec": 0.01
     }
    ],
    [
     "BOBOIBOY MALAYSIA'S FIRST TICKETED LIVE SHOW",
     "ONE UNIVER…",
     "Radio",
     "80%",
     "Zack",
     {
      "Nov": 0.008
     }
    ],
    [
     "CSA: THE SOCIAL RECKONING",
     "SONY PICTURES ENTERTAINMENT MALAY…",
     "Radio",
     "50%",
     "Zack",
     {
      "Oct": 0.007
     }
    ],
    [
     "SEDUNIA TTC X MIX MIND YOUR BUSINESS (14-19 OCT",
     "SEDUNIA …",
     "Digital",
     "80%",
     "Zack",
     {
      "Oct": 0.007
     }
    ],
    [
     "MPO_A CHORALE SPECTACULAR",
     "MALAYSIAN PHILHARMONIC ORCHESTRA",
     "Radio",
     "80%",
     "Zack",
     {
      "Nov": 0.003
     }
    ]
   ],
   "bank": [
    [
     "QL EGGS JUARAI PAGIMU - QL EGGS FM",
     "QL POULTRY FARMS SDN BHD",
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
     "JOM MALAYSIA BERSAMA LAZADA ERA TANYA P…",
     "ECART SERVICES MALAYSIA SDN BHD",
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
     "SMEVAGANZA26_BORAK SEENI PACKAGE",
     "STF RESOURCES SDN BHD",
     "Radio + TV",
     "Won",
     "Zack",
     [
      null,
      0.006,
      null,
      0.013
     ],
     0.019
    ],
    [
     "AEON CO. x ASTRO: Barter Collaboration for Ast",
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
     "YE LIVE TOUR LIVE IN JAKARTA 2026 (10/10/26-…",
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
     "HOSPITAL PICASO X SINAR KONGSI (8-14 OCT 2…",
     "INTEGRATED ONCOLOGY CENTER (KUALA LUMPUR",
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
     "NU FEST - OCT 2026",
     "COMS CREATIVE STUDIO",
     "Radio",
     "Booked",
     "Rizal",
     [
      0.009,
      0.001,
      null,
      null
     ],
     0.01
    ],
    [
     "REDBOX X MY BIG SHOW (7 SEPT - 26 OCT 2026)",
     "9R LEISURE SDN BHD",
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
     "SEDUNIA TTC X MIX MIND YOUR BUSINESS (14-…",
     "SEDUNIA TRAVEL SERVICES S/B",
     "Radio",
     "Booked",
     "Zack",
     [
      0.007,
      null,
      null,
      null
     ],
     0.007
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
     "RE:WIND x CLUB ROOTS (26 OCT - 14 NOV 2026)",
     "LIVE ACTS & EVENTS PLT",
     "Radio",
     "Booked",
     "Zack",
     [
      null,
      0.006,
      null,
      null
     ],
     0.006
    ],
    [
     "AICB RASA, RUANG & INSPIRASI",
     "STF RESOURCES SDN BHD",
     "TV",
     "Booked",
     "Zack",
     [
      null,
      null,
      null,
      0.003
     ],
     0.003
    ],
    [
     "AS IF SHE WERE HERE: CHEN JIA SINGS TERESA TEN",
     "MALAYSIAN PHILHARMONIC ORCHESTRA",
     "Radio",
     "Booked",
     "Zack",
     [
      null,
      0.0,
      null,
      null
     ],
     0
    ]
   ],
   "bankOct": [
    [
     "QL EGGS JUARAI PAGIMU - QL EGGS FM",
     "QL POULTRY FARMS SDN BHD",
     "Radio",
     "Booked",
     "Zack",
     0.334
    ],
    [
     "JOM MALAYSIA BERSAMA LAZADA ERA TANYA P…",
     "ECART SERVICES MALAYSIA SDN BHD",
     "Radio",
     "Booked",
     "Zack",
     0.02
    ],
    [
     "AEON CO. x ASTRO: Barter Collaboration for Ast",
     "AEON CO. (M) BHD",
     "Radio",
     "Booked",
     "Zack",
     0.018
    ],
    [
     "YE LIVE TOUR LIVE IN JAKARTA 2026 (10/10/26-…",
     "TBA SOLUTIONS",
     "Radio",
     "Booked",
     "Zack",
     0.016
    ],
    [
     "HOSPITAL PICASO X SINAR KONGSI (8-14 OCT 2…",
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
     "NU FEST - OCT 2026",
     "COMS CREATIVE STUDIO",
     "Radio",
     "Booked",
     "Rizal",
     0.009
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
     "SEDUNIA TTC X MIX MIND YOUR BUSINESS (14-…",
     "SEDUNIA TRAVEL SERVICES S/B",
     "Radio",
     "Booked",
     "Zack",
     0.007
    ],
    [
     "SME25 GEGAR 700",
     "NAJEEHAH INTERNATIONAL SDN BHD",
     "Radio",
     "Booked",
     "Wan Syahrul",
     0.007
    ]
   ],
   "bookings": [
    [
     "QL EGGS JUARAI PAGIMU - QL EGGS FM",
     "QL POULTRY FARMS SDN BHD",
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
     "NU FEST - OCT 2026",
     "COMS CREATIVE STUDIO",
     "Radio",
     "Rizal",
     0.009
    ],
    [
     "REDBOX X MY BIG SHOW (7 SEPT - 26 OCT 2026)",
     "9R LEISURE SDN BHD",
     "Radio",
     "Zack",
     0.008
    ],
    [
     "SEDUNIA TTC X MIX MIND YOUR BUSINESS (14-19 OCT",
     "SEDUNIA TRAVEL SERVICES S/B",
     "Radio",
     "Zack",
     0.007
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
     "AS IF SHE WERE HERE: CHEN JIA SINGS TERESA TENG",
     "MALAYSIAN PHILHARMONIC ORCHESTRA",
     "Radio",
     "Zack",
     0.004
    ],
    [
     "QL Eggs FM x WORLD EGGS DAY",
     "QL POULTRY FARMS SDN BHD",
     "Digital",
     "Zack",
     0.004
    ],
    [
     "MELODY HEALTHY THURSDAY - Pink Oct",
     "INTEGRATED ONCOLOGY CENTER (KUALA LUMPUR",
     "Digital",
     "Zack",
     0.003
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
     "YE LIVE TOUR LIVE IN JAKARTA 2026",
     "advertiser not recorded",
     "Digital",
     "Zack",
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
     "HOSPITAL PICASO X SINAR KONGSI",
     "INTEGRATED ONCOLOGY CENTER (KUALA LUMPUR",
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
     "MY FM BIG SHOW x REDBOX Karaoke - \"Sing Your Way",
     "9R LEISURE SDN BHD",
     "Digital",
     "Zack",
     -0.001
    ]
   ]
  },
  "kazman": {
   "rows": [
    {
     "id": "Jarald",
     "n": "Jarald",
     "full": "WONG, Jarald",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       0,
       0,
       1.3
      ],
      [
       0,
       6,
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
     "id": "Jarald (own book)",
     "n": "Jarald",
     "full": "WONG, Jarald",
     "kind": "own",
     "mgr": "Jarald",
     "cells": [
      [
       0,
       0,
       1.3
      ],
      [
       0,
       6,
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
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       13,
       19,
       1.3
      ],
      [
       29,
       83,
       1.4
      ],
      [
       10,
       56,
       1.4
      ],
      [
       6,
       37,
       1.3
      ]
     ],
     "f": 0.783,
     "g": -4.6
    },
    {
     "id": "Jonis (own book)",
     "n": "Jonis",
     "full": "CHUNG, Jonis",
     "kind": "own",
     "mgr": "Jonis",
     "cells": [
      [
       13,
       19,
       1.3
      ],
      [
       29,
       83,
       1.4
      ],
      [
       10,
       56,
       1.4
      ],
      [
       6,
       37,
       1.3
      ]
     ],
     "f": 0.783,
     "g": -4.6
    },
    {
     "id": "Reporting directly",
     "n": "Reporting directly",
     "full": "Reporting directly to the head",
     "kind": "direct",
     "mgr": null,
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
     "id": "Kazman",
     "n": "Kazman",
     "full": "FAIZAL, Kazman",
     "kind": "exec",
     "mgr": "Reporting directly",
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
     "g": null,
     "qual": "own sales as head",
     "headOwn": true
    }
   ],
   "total": {
    "cells": [
     [
      6,
      15,
      2.6
     ],
     [
      14,
      47,
      2.7
     ],
     [
      5,
      29,
      2.9
     ],
     [
      3,
      18,
      2.6
     ]
    ],
    "f": 0.783,
    "g": -10.0
   },
   "open": [
    [
     "Waterproof All-In-One Campaign 2026",
     "Yellow Paper Plane Sdn Bhd",
     "Digital",
     "50%",
     "Jonis",
     {
      "Nov": 0.012,
      "Dec": 0.372
     }
    ],
    [
     "NIPPON PAINT SEEDER 2.0",
     "Yellow Paper Plane",
     "Digital",
     "80%",
     "Jonis",
     {
      "Oct": 0.02,
      "Nov": 0.1,
      "Dec": 0.103,
      "Jan": 0.103
     }
    ],
    [
     "All Shinny White CORE Phase 2 Oct 2026",
     "HAWLEY & HAZEL (M) SDN …",
     "Digital",
     "80%",
     "Jonis",
     {
      "Nov": 0.15
     }
    ],
    [
     "Boost Bank Debit Card Campaign 2026",
     "IPG MEDIABRANDS SDN BHD",
     "Digital",
     "50%",
     "Jarald",
     {
      "Nov": 0.086
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
     "Drymix Lab Test Campaign",
     "Yellow Paper Plane Sdn Bhd",
     "Digital",
     "50%",
     "Jonis",
     {
      "Nov": 0.013,
      "Dec": 0.044,
      "Jan": 0.028
     }
    ],
    [
     "Flooring",
     "Yellow Paper Plane Sdn Bhd",
     "Digital",
     "50%",
     "Jonis",
     {
      "Nov": 0.013,
      "Dec": 0.045,
      "Jan": 0.027
     }
    ],
    [
     "Weatherbond Lab Test Campaign 2026",
     "Yellow Paper Plane Sdn Bhd",
     "Digital",
     "50%",
     "Jonis",
     {
      "Nov": 0.013,
      "Dec": 0.044,
      "Jan": 0.028
     }
    ],
    [
     "ASW Starshine Purple Phase 2 Oct 2026",
     "HAWLEY & HAZEL (M) SDN …",
     "Digital",
     "80%",
     "Jonis",
     {
      "Nov": 0.062
     }
    ],
    [
     "Blinkie AI Series",
     "BONUSKAD LOYALTY SDN. BHD. (Malaysia)",
     "Digital",
     "50%",
     "Jonis",
     {
      "Nov": 0.028,
      "Dec": 0.029
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
     "Darlie Double Action Food Campaign P2 Oct 2026",
     "HAWLEY & HAZEL (M) SDN BHD",
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
     0.078
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
     0.03
    ],
    [
     "Cloakwork Collaboration Campaign 2026 (Media)",
     "SKECHERS MALAYSIA SDN. BHD.",
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
       65,
       67,
       2.5
      ],
      [
       36,
       56,
       2.6
      ],
      [
       20,
       27,
       2.8
      ],
      [
       23,
       30,
       2.5
      ]
     ],
     "f": 3.7,
     "g": -6.7
    },
    {
     "id": "Siti Sarah",
     "n": "Siti Sarah",
     "full": "RUSLI, Siti Sarah",
     "kind": "exec",
     "mgr": "Mandy",
     "cells": [
      [
       108,
       108,
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
     "f": 1.3,
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
       38,
       43,
       0.686
      ],
      [
       64,
       65,
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
     "f": 0.801,
     "g": -1.8
    },
    {
     "id": "Jing Yan",
     "n": "Jing Yan",
     "full": "WONG, Jing Yan",
     "kind": "exec",
     "mgr": "Mandy",
     "cells": [
      [
       53,
       53,
       0.63
      ],
      [
       21,
       21,
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
     "f": 0.577,
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
       63,
       69,
       0.561
      ],
      [
       54,
       132,
       0.58
      ],
      [
       26,
       36,
       0.736
      ],
      [
       24,
       34,
       0.618
      ]
     ],
     "f": 1.0,
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
       40,
       71,
       2.4
      ],
      [
       38,
       74,
       2.6
      ],
      [
       38,
       160,
       2.7
      ],
      [
       8,
       29,
       2.4
      ]
     ],
     "f": 3.2,
     "g": -6.9
    },
    {
     "id": "Vernon",
     "n": "Vernon",
     "full": "ONG, Vernon",
     "kind": "exec",
     "mgr": "Stanley",
     "cells": [
      [
       54,
       68,
       1.2
      ],
      [
       49,
       62,
       1.4
      ],
      [
       34,
       34,
       1.3
      ],
      [
       14,
       14,
       1.3
      ]
     ],
     "f": 1.9,
     "g": -3.2
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
       43,
       0.66
      ],
      [
       3,
       9,
       0.673
      ],
      [
       46,
       128,
       0.695
      ],
      [
       0,
       0,
       0.55
      ]
     ],
     "f": 0.405,
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
       44,
       109,
       0.581
      ],
      [
       55,
       183,
       0.56
      ],
      [
       39,
       442,
       0.67
      ],
      [
       0,
       92,
       0.54
      ]
     ],
     "f": 0.821,
     "g": -1.5
    }
   ],
   "total": {
    "cells": [
     [
      52,
      69,
      4.9
     ],
     [
      37,
      65,
      5.2
     ],
     [
      29,
      92,
      5.5
     ],
     [
      16,
      29,
      4.9
     ]
    ],
    "f": 6.8,
    "g": -13.7
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
      "Oct": 0.027,
      "Nov": 0.056,
      "Dec": 0.078
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
      "Nov": 0.033,
      "Dec": 0.008
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
     1.065
    ],
    [
     "OMNET DEAL-MARIGOLD HL ADVANCE SARCOPENIA…",
     "COTRA ENTERPRISE SDN BHD",
     "Radio",
     "Booked",
     "Jing Yan",
     [
      0.225,
      0.067,
      null,
      null
     ],
     0.292
    ],
    [
     "RIDSECT RADIO-OCT'26-NOV'26 (PRIME TIME COMB…",
     "SC JOHNSON & SON (M) SDN BHD",
     "Radio",
     "Booked",
     "Joanne Chen",
     [
      0.195,
      0.084,
      null,
      null
     ],
     0.279
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
     0.261
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
     "OTWC CNY 2026 MV (Feb 2027)",
     "Invictus Blue Sdn Bhd",
     "TV",
     "Won",
     "Rae Zalani",
     [
      null,
      0.203,
      null,
      null
     ],
     0.203
    ],
    [
     "DENTSU DEAL-DENTSU X KFC VALUE DV CAMPAIGN…",
     "QSR STORES SDN BHD",
     "Radio",
     "Booked",
     "Siti Sarah",
     [
      0.199,
      null,
      null,
      null
     ],
     0.199
    ],
    [
     "ORION DEAL-BWF BADMINTON TAKEOVER 2026",
     "U MOBILE SERVICES SDN BHD",
     "Radio",
     "Booked",
     "Vernon",
     [
      0.06,
      null,
      0.043,
      0.043
     ],
     0.146
    ],
    [
     "SMEVaganza - UNIKL",
     "CD ADVERTISING SDN BHD",
     "Digital",
     "Won",
     "Daniel",
     [
      0.046,
      0.044,
      0.046,
      null
     ],
     0.136
    ],
    [
     "[Booking In] Poh Kong Year End Campaign",
     "POH KONG JEWELLERS SDN BHD",
     "Digital + Radio",
     "Won",
     "Joanne Chen",
     [
      null,
      null,
      0.13,
      null
     ],
     0.13
    ],
    [
     "BIO OIL",
     "NUVANTA SDN BHD",
     "TV",
     "Booked",
     "Daniel",
     [
      null,
      0.045,
      0.045,
      null
     ],
     0.09
    ],
    [
     "POSTPAID & PREPAID - UMOBILE BWF TAKEOVER 2…",
     "U MOBILE SDN BHD",
     "TV",
     "Booked",
     "Vernon",
     [
      null,
      0.04,
      null,
      0.05
     ],
     0.09
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
     0.076
    ],
    [
     "ORION DEAL-PAY WITH DEBIT 2026 - RADIO SEGME…",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Booked",
     "Daniel",
     [
      null,
      0.076,
      null,
      null
     ],
     0.076
    ],
    [
     "ORION DEAL-FA26 NAT ERA 200",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Booked",
     "Daniel",
     [
      null,
      0.054,
      0.021,
      null
     ],
     0.075
    ],
    [
     "ORION DEAL-FA26 NAT MY 200",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Booked",
     "Daniel",
     [
      null,
      0.052,
      0.02,
      null
     ],
     0.072
    ],
    [
     "FA26 NAT ERA 600",
     "DUOPHARMA DISTRIBUTION SDN BHD",
     "Radio",
     "Booked",
     "Vernon",
     [
      0.062,
      null,
      null,
      null
     ],
     0.062
    ],
    [
     "DENTSU DEAL-DENTSU X-QSR VALUE FOMO-OCT'26",
     "QSR STORES SDN BHD",
     "Radio",
     "Booked",
     "Siti Sarah",
     [
      0.053,
      null,
      null,
      null
     ],
     0.053
    ],
    [
     "POSTPAID & PREPAID - UMOBILE BWF TAKEOVER …",
     "U MOBILE SDN BHD",
     "TV",
     "Booked",
     "Vernon",
     [
      null,
      null,
      0.051,
      null
     ],
     0.051
    ],
    [
     "[Booking In] Rozel x National Budget Announcem",
     "ROZEL CORPORATION SDN BHD",
     "Digital",
     "Won",
     "Joanne Chen",
     [
      0.047,
      null,
      null,
      null
     ],
     0.047
    ],
    [
     "Zurich x Care for what matters 2.6(comm)",
     "OMNICOM MEDIA GROUP (M) SDN BHD",
     "Radio",
     "Won",
     "Jing Yan",
     [
      0.031,
      0.015,
      null,
      null
     ],
     0.046
    ],
    [
     "LITT TAK TOYS",
     "LITT TAK SDN BHD",
     "TV",
     "Booked",
     "Rae Zalani",
     [
      null,
      null,
      0.032,
      0.008
     ],
     0.04
    ],
    [
     "JALAN JALAN WITH YTL HOTEL -JULY'25 - DEC'26",
     "STARHILL HOTEL SDN BHD",
     "Radio",
     "Booked",
     "Jing Yan",
     [
      null,
      null,
      0.033,
      null
     ],
     0.033
    ],
    [
     "PPHH - Raaga Deepavali",
     "PUSAT PAKAIAN HARI-HARI SDN BHD",
     "Radio",
     "Won",
     "Rae Zalani",
     [
      0.019,
      0.01,
      null,
      null
     ],
     0.029
    ],
    [
     "FANDOM TVC SPOT BUY - CHUAN SIN",
     "CHUAN SIN SDN BHD",
     "TV",
     "Won",
     "Azuin",
     [
      0.023,
      null,
      null,
      null
     ],
     0.023
    ],
    [
     "SME26 NAT MY 500",
     "DAIKIN MALAYSIA SALES & SERVICE SDN BHD",
     "Radio",
     "Booked",
     "Jing Yan",
     [
      null,
      null,
      0.023,
      null
     ],
     0.023
    ],
    [
     "[Booking In] Ebene Radio Campaign",
     "WIPRO UNZA (MALAYSIA) SDN BHD",
     "Digital",
     "Won",
     "Joanne Chen",
     [
      0.018,
      null,
      null,
      null
     ],
     0.018
    ],
    [
     "HOME OF KIDS 2026",
     "MUNCHY FOOD INDUSTRIES SDN BHD",
     "Digital + Radio",
     "Won",
     "Azuin",
     [
      null,
      null,
      0.018,
      null
     ],
     0.018
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
     "OMNET DEAL-MARIGOLD HL ADVANCE SARCOPENIA…",
     "COTRA ENTERPRISE SDN BHD",
     "Radio",
     "Booked",
     "Jing Yan",
     0.225
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
     "RIDSECT RADIO-OCT'26-NOV'26 (PRIME TIME COMB…",
     "SC JOHNSON & SON (M) SDN BHD",
     "Radio",
     "Booked",
     "Joanne Chen",
     0.195
    ],
    [
     "DENTSU DEAL-DENTSU X KFC VALUE DV CAMPAIGN…",
     "QSR STORES SDN BHD",
     "Radio",
     "Booked",
     "Siti Sarah",
     0.111
    ],
    [
     "DENTSU DEAL-DENTSU X KFC VALUE DV CAMPAIGN…",
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
     "[Booking In] Rozel x National Budget Announcem",
     "ROZEL CORPORATION SDN BHD",
     "Digital",
     "Won",
     "Joanne Chen",
     0.047
    ],
    [
     "SMEVaganza - UNIKL",
     "CD ADVERTISING SDN BHD",
     "Digital",
     "Won",
     "Daniel",
     0.046
    ],
    [
     "Moomoo 30s AA (Aug-Nov)",
     "MOOMOO SECURITIES MALAYSIA SDN BHD",
     "Digital",
     "Won",
     "Rae Zalani",
     0.038
    ],
    [
     "Zurich x Care for what matters 2.6(comm)",
     "OMNICOM MEDIA GROUP (M) SDN BHD",
     "Radio",
     "Won",
     "Jing Yan",
     0.031
    ],
    [
     "FANDOM TVC SPOT BUY - CHUAN SIN",
     "CHUAN SIN SDN BHD",
     "TV",
     "Won",
     "Azuin",
     0.023
    ],
    [
     "PPHH - Raaga Deepavali",
     "PUSAT PAKAIAN HARI-HARI SDN BHD",
     "Radio",
     "Won",
     "Rae Zalani",
     0.019
    ],
    [
     "[Booking In] Ebene Radio Campaign",
     "WIPRO UNZA (MALAYSIA) SDN BHD",
     "Digital",
     "Won",
     "Joanne Chen",
     0.018
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
     "OMNET DEAL-MARIGOLD HL ADVANCE SARCOPENIA (12/10",
     "COTRA ENTERPRISE SDN BHD",
     "Radio",
     "Jing Yan",
     0.225
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
     "SPECIALISED MEDIA ADS SB-JASMINE FOOD CORPORATIO",
     "JASMINE FOOD CORPORATION SDN BHD",
     "Digital",
     "Siti Sarah",
     0.045
    ],
    [
     "BIO OIL",
     "NUVANTA SDN BHD",
     "TV",
     "Daniel",
     0.045
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
     "IPG ORION-U MOBILE SB-MERDEKA TERBANG BERSAMA WI",
     "U MOBILE SERVICES SDN BHD",
     "Digital",
     "Vernon",
     0.026
    ],
    [
     "INCEIF UNIVERSITY",
     "INCEIF UNIVERSITY",
     "TV",
     "Siti Sarah",
     0.025
    ],
    [
     "BATIK AIR EAST MALAYSIA MIX COMMERCIAL-SEP'26-OC",
     "MALINDO AIRWAYS SDN BHD",
     "Radio",
     "Joanne Chen",
     0.024
    ],
    [
     "ROS XTRA-PPHH DEEPAVALI -OCT'26-NOV'26",
     "PUSAT PAKAIAN HARI-HARI SDN BHD",
     "Radio",
     "Rae Zalani",
     0.019
    ],
    [
     "IPG MEDIABRANDS- U MOBILE SB- U MOBILE RADIO SSH",
     "U MOBILE SERVICES SDN BHD",
     "Digital",
     "Vernon",
     0.019
    ],
    [
     "OMNET DEAL-EBENE ASTRO RADIO CAMPAIGN-OCT'26-DEC",
     "WIPRO CONSUMER CARE (LDW) SDN BHD",
     "Radio",
     "Joanne Chen",
     0.018
    ],
    [
     "THE BOUNCE AA",
     "MOOMOO SECURITIES MALAYSIA SDN BHD",
     "AA",
     "Rae Zalani",
     0.017
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
     "FA26 PEN MIX 356",
     "DUOPHARMA DISTRIBUTION SDN BHD",
     "Radio",
     "Vernon",
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
     "ADS ON MARKETING SB-FONTERRA BRANDS-FERNLEAF-NI",
     "FONTERRA BRAND (M) SDN BHD",
     "Digital",
     "Siti Sarah",
     0.014
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
     "ORION DEAL-LOTUS'S DEEPAVALI 2026",
     "LOTUSS STORES (MALAYSIA) SDN BHD",
     "Radio",
     "Vernon",
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
     "O'BRIENS x PROVITON RADIO AMPLICATION CAMPAIGN",
     "DUOPHARMA DISTRIBUTION SDN BHD",
     "Radio",
     "Vernon",
     0.006
    ],
    [
     "DIRECT-MALINDO AIRWAYS SB-LITE DRIVE SEGMENT SSH",
     "MALINDO AIRWAYS SDN BHD",
     "Digital",
     "Joanne Chen",
     0.006
    ],
    [
     "DIRECT-INCEIF UNIVERSITY-ASTRO AWANI",
     "INCEIF UNIVERSITY",
     "Digital",
     "Siti Sarah",
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
     "AMBI AGENCY-KLA CONSULTANCY-AUDIO IMPACT 360-KIN",
     "KLA CONSULTANCY SDN BHD",
     "Digital",
     "Daniel",
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
     "OMNICOM-COTRA ENTERPRISES SB-MARIGOLD HL ADVANCE",
     "COTRA ENTERPRISE SDN BHD",
     "Digital",
     "Jing Yan",
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
     "TRAPPER MEDIA--DUOPHARMA DISTRIBUTION SB-O'BRIEN",
     "DUOPHARMA DISTRIBUTION SDN BHD",
     "Digital",
     "Vernon",
     0.001
    ],
    [
     "PHD MEDIA (M) SB- WIPRO UNZA (M) SB- MEOW MEOW L",
     "WIPRO UNZA (MALAYSIA) SDN BHD",
     "Digital",
     "Joanne Chen",
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
     "SPECIALISED MEDIA ADS SB- HIMALAYA WELLNESS MALA",
     "advertiser not recorded",
     "Digital",
     "Siti Sarah",
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
     "IPG ORION- SETIA IP HOLDINGS- ASTRO-FANDOM STREA",
     "SP SETIA BERHAD",
     "Digital",
     "Daniel",
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
       67,
       115,
       1.5
      ],
      [
       56,
       62,
       1.5
      ],
      [
       16,
       16,
       1.6
      ],
      [
       0,
       13,
       1.6
      ]
     ],
     "f": 2.1,
     "g": -4.1
    },
    {
     "id": "Elaine (own book)",
     "n": "Elaine",
     "full": "NG, Li Chean [Elaine]",
     "kind": "own",
     "mgr": "Elaine",
     "cells": [
      {
       "f": 0.227,
       "c": 0.232
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
     "f": 0.283,
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
       42,
       72,
       0.817
      ],
      [
       60,
       71,
       0.785
      ],
      [
       9,
       9,
       0.808
      ],
      [
       0,
       3,
       0.804
      ]
     ],
     "f": 0.893,
     "g": -2.3
    },
    {
     "id": "Shin Hsin",
     "n": "Shin Hsin",
     "full": "LEE, Shih Hsin",
     "kind": "exec",
     "mgr": "Elaine",
     "cells": [
      [
       63,
       132,
       0.703
      ],
      [
       47,
       47,
       0.749
      ],
      [
       21,
       21,
       0.798
      ],
      [
       0,
       24,
       0.757
      ]
     ],
     "f": 0.961,
     "g": -2.0,
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
       53,
       92,
       1.2
      ],
      [
       7,
       7,
       1.2
      ],
      [
       0,
       0,
       1.3
      ],
      [
       0,
       0,
       0.992
      ]
     ],
     "f": 0.733,
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
       53,
       92,
       1.2
      ],
      [
       7,
       7,
       1.2
      ],
      [
       0,
       0,
       1.3
      ],
      [
       0,
       0,
       0.992
      ]
     ],
     "f": 0.733,
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
       35,
       53,
       1.4
      ],
      [
       25,
       25,
       1.5
      ],
      [
       12,
       12,
       1.7
      ],
      [
       12,
       12,
       1.5
      ]
     ],
     "f": 1.2,
     "g": -4.9
    },
    {
     "id": "Vacant seat",
     "n": "Vacant seat",
     "full": "Vacant seat",
     "kind": "vacant",
     "mgr": "Reporting directly",
     "cells": [
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
       1.7
      ],
      [
       0,
       0,
       1.5
      ]
     ],
     "f": 0.0,
     "g": -6.1,
     "note": "Vacant: Josephine’s replacement. The target is held for the role, not assigned to anyone."
    },
    {
     "id": "Belinda",
     "n": "Belinda",
     "full": "CHIN, Poh Yin [Belinda]",
     "kind": "exec",
     "mgr": "Reporting directly",
     "cells": [
      {
       "f": 0.47,
       "c": 0.721
      },
      {
       "f": 0.378,
       "c": 0.389
      },
      {
       "f": 0.201,
       "c": 0.204
      },
      {
       "f": 0.184,
       "c": 0.187
      }
     ],
     "f": 1.2,
     "g": null,
     "qual": "own sales as head",
     "headOwn": true
    }
   ],
   "total": {
    "cells": [
     [
      52,
      88,
      4.1
     ],
     [
      31,
      33,
      4.3
     ],
     [
      10,
      10,
      4.6
     ],
     [
      5,
      10,
      4.1
     ]
    ],
    "f": 4.1,
    "g": -13.0
   },
   "open": [
    [
     "Nescafe SOS",
     "NESTLE PRODUCTS SDN BHD",
     "Digital + TV",
     "80%",
     "Jessie",
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
     "Maxis EPL 2026/2027 - Tier 1",
     "FASTBRIDGE MALAYSIA SDN BHD (agency)",
     "Digital + Radio",
     "80%",
     "Belinda",
     {
      "Oct": 0.055,
      "Nov": 0.055,
      "Dec": 0.014,
      "Jan": 0.014
     }
    ],
    [
     "Avalon Cybersouth Hot Air Balloon Event @ Oct'26",
     "Ecolake Resid…",
     "Radio",
     "80%",
     "Jessie",
     {
      "Oct": 0.038
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
     "Ubermen X Astro Biz One Watch Party @ Campus",
     "TOHTONKU SDN…",
     "Digital",
     "50%",
     "Jessie",
     {
      "Jan": 0.024
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
     "Ubermen EDP Launch X Awani",
     "SINGNAN COMMUNICATIONS SDN BHD (…",
     "TV",
     "80%",
     "Jessie",
     {
      "Nov": 0.012
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
     "Belinda",
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
     "COWAY LAUNDRY GROUP CAMPAIGN",
     "COWAY (M) SDN BHD",
     "TV",
     "Booked",
     "Keong",
     [
      0.173,
      null,
      null,
      null
     ],
     0.173
    ],
    [
     "MAXIS POSTPAID X APPLE IPHONE NPI",
     "MAXIS BROADBAND SDN BHD",
     "TV",
     "Booked",
     "Belinda",
     [
      0.108,
      0.05,
      null,
      null
     ],
     0.158
    ],
    [
     "MAGGI 2 MINUTES NOODLE - SAB THEMATIC",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Booked",
     "Shin Hsin",
     [
      null,
      0.081,
      0.076,
      null
     ],
     0.157
    ],
    [
     "GARDENIA QUICKBITES NEW FLAVOUR LAUNCH",
     "GARDENIA BAKERIES (M) SDN BHD",
     "Radio",
     "Booked",
     "Elaine",
     [
      0.145,
      null,
      null,
      null
     ],
     0.145
    ],
    [
     "ORION DEAL -MAXIS ENTERPRISE SME GREAT HELP…",
     "MAXIS MOBILE SERVICES SDN BHD",
     "Radio",
     "Booked",
     "Belinda",
     [
      0.07,
      0.054,
      null,
      null
     ],
     0.124
    ],
    [
     "MCD BRANDED CORE MENU - LTO AYAM GORENG G…",
     "GERBANG ALAF RESTAURANTS SDN BHD",
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
     "MAGGI 2 MINUTES NOODLE - MAGGI SAB PW HIKAY…",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Booked",
     "Shin Hsin",
     [
      null,
      0.048,
      0.045,
      null
     ],
     0.093
    ],
    [
     "MAGGI SERVICE PILLAR-MSSCC",
     "NESTLE PRODUCTS SDN BHD",
     "Radio",
     "Booked",
     "Shin Hsin",
     [
      null,
      0.092,
      null,
      null
     ],
     0.092
    ],
    [
     "Ubermen X Astro Biz One Watch Party (Jom Lepak",
     "TOHTONKU SDN BHD",
     "Digital",
     "Won",
     "Jessie",
     [
      0.017,
      0.034,
      0.034,
      null
     ],
     0.085
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
     "Jessie",
     [
      0.06,
      null,
      null,
      null
     ],
     0.06
    ],
    [
     "COWAY CSA (19/10/26-15/11/26)",
     "WOONGJIN COWAY (MALAYSIA) SDN BHD",
     "Radio",
     "Booked",
     "Keong",
     [
      null,
      0.06,
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
     "Keong",
     [
      0.058,
      null,
      null,
      null
     ],
     0.058
    ],
    [
     "Coway x Digital Content Campaign (Publicis)",
     "WOONGJIN COWAY (MALAYSIA) SDN BHD",
     "Digital",
     "Won",
     "Keong",
     [
      0.058,
      null,
      null,
      null
     ],
     0.058
    ],
    [
     "F&N x ERA & MY",
     "CARAT MEDIA SERVICES (M) SDN BHD",
     "Radio",
     "Won",
     "Keong",
     [
      0.042,
      null,
      null,
      null
     ],
     0.042
    ],
    [
     "ORION DEAL-MAXIS POSTPAID-BEST OF ENGLISH F…",
     "MAXIS MOBILE SERVICES SDN BHD",
     "Radio",
     "Booked",
     "Belinda",
     [
      null,
      0.041,
      null,
      null
     ],
     0.041
    ],
    [
     "FEBREZE BASE",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Booked",
     "Jessie",
     [
      null,
      0.028,
      null,
      null
     ],
     0.028
    ],
    [
     "SME Upfront 2026 TV X'tra (Astro RIA)",
     "MOVON Sdn Bhd",
     "TV",
     "Won",
     "Jessie",
     [
      0.022,
      null,
      null,
      null
     ],
     0.022
    ],
    [
     "SME26 NAT ERA 100",
     "SKYWORTH DEVELOPMENT M'SIA S/B",
     "Radio",
     "Booked",
     "Jessie",
     [
      null,
      null,
      0.019,
      null
     ],
     0.019
    ],
    [
     "SME26 NAT MY 100",
     "SKYWORTH DEVELOPMENT M'SIA S/B",
     "Radio",
     "Booked",
     "Jessie",
     [
      null,
      null,
      0.018,
      null
     ],
     0.018
    ],
    [
     "SME26 NAT MY 105",
     "BUNTING LAH MEDIA",
     "Radio",
     "Booked",
     "Shin Hsin",
     [
      null,
      null,
      0.012,
      null
     ],
     0.012
    ],
    [
     "SME26 NAT HITZ 105",
     "BUNTING LAH MEDIA",
     "Radio",
     "Booked",
     "Shin Hsin",
     [
      null,
      null,
      0.012,
      null
     ],
     0.012
    ],
    [
     "2026 STM LOTTERY IN ANTI ILLEGAL PSA (JULY - D",
     "STM LOTTERY SDN BHD",
     "Radio",
     "Booked",
     "Elaine",
     [
      null,
      null,
      0.011,
      null
     ],
     0.011
    ],
    [
     "SPORTS TOTO-CSR MESSAGE ANTI ILLEGAL-JUL26-…",
     "STM LOTTERY SDN BHD",
     "Radio",
     "Booked",
     "Elaine",
     [
      null,
      null,
      0.008,
      0.001
     ],
     0.009
    ],
    [
     "2026 STM LOTTERY IN ANTI ILLEGAL PSA (JULY-DEC",
     "STM LOTTERY SDN BHD",
     "Radio",
     "Booked",
     "Elaine",
     [
      null,
      null,
      0.006,
      null
     ],
     0.006
    ]
   ],
   "bankOct": [
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
     "Belinda",
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
     "GARDENIA QUICKBITES NEW FLAVOUR LAUNCH",
     "GARDENIA BAKERIES (M) SDN BHD",
     "Radio",
     "Booked",
     "Elaine",
     0.145
    ],
    [
     "MCD BRANDED CORE MENU - LTO AYAM GORENG G…",
     "GERBANG ALAF RESTAURANTS SDN BHD",
     "TV",
     "Booked",
     "Keong",
     0.119
    ],
    [
     "MAXIS POSTPAID X APPLE IPHONE NPI",
     "MAXIS BROADBAND SDN BHD",
     "TV",
     "Booked",
     "Belinda",
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
     "ORION DEAL -MAXIS ENTERPRISE SME GREAT HELP…",
     "MAXIS MOBILE SERVICES SDN BHD",
     "Radio",
     "Booked",
     "Belinda",
     0.07
    ],
    [
     "NESCAFE GOLD - MASTERBRAND COMM",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Booked",
     "Jessie",
     0.06
    ],
    [
     "KIT KAT - EQUITY SUSTENANCE",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Booked",
     "Keong",
     0.058
    ],
    [
     "Coway x Digital Content Campaign (Publicis)",
     "WOONGJIN COWAY (MALAYSIA) SDN BHD",
     "Digital",
     "Won",
     "Keong",
     0.058
    ],
    [
     "F&N x ERA & MY",
     "CARAT MEDIA SERVICES (M) SDN BHD",
     "Radio",
     "Won",
     "Keong",
     0.042
    ],
    [
     "SME Upfront 2026 TV X'tra (Astro RIA)",
     "MOVON Sdn Bhd",
     "TV",
     "Won",
     "Jessie",
     0.022
    ],
    [
     "Ubermen X Astro Biz One Watch Party (Jom Lepak",
     "TOHTONKU SDN BHD",
     "Digital",
     "Won",
     "Jessie",
     0.017
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
     "Belinda",
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
     "GARDENIA QUICKBITES NEW FLAVOUR LAUNCH",
     "GARDENIA BAKERIES (M) SDN BHD",
     "Radio",
     "Elaine",
     0.145
    ],
    [
     "MCD BRANDED CORE MENU - LTO AYAM GORENG GRIMACE",
     "GERBANG ALAF RESTAURANTS SDN BHD",
     "TV",
     "Keong",
     0.119
    ],
    [
     "MAXIS POSTPAID X APPLE IPHONE NPI",
     "MAXIS BROADBAND SDN BHD",
     "TV",
     "Belinda",
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
     "Belinda",
     0.07
    ],
    [
     "NESCAFE GOLD - MASTERBRAND COMM",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Jessie",
     0.06
    ],
    [
     "KIT KAT - EQUITY SUSTENANCE",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Keong",
     0.058
    ],
    [
     "COWAY CSA (19/10/26-15/11/26)",
     "WOONGJIN COWAY (MALAYSIA) SDN BHD",
     "Radio",
     "Keong",
     0.052
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
     "Belinda",
     0.041
    ],
    [
     "DENTSU DEAL-CARAT MEDIA-F&N 100PLUS CSA(12/10/26",
     "F&N GLOBAL MARKETING PTE LTD",
     "Radio",
     "Keong",
     0.04
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
     "MAGGI SERVICE PILLAR-MSSCC",
     "NESTLE PRODUCTS SDN BHD",
     "Radio",
     "Shin Hsin",
     0.024
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
     "SME26 REG MY CEN 70",
     "MODERN LIVING EVENT SDN BHD",
     "Radio",
     "Shin Hsin",
     0.016
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
     "SME26 REG HITZ CEN 70",
     "MODERN LIVING EVENT SDN BHD",
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
     "Maxis SME Great Helper Business Level Up",
     "MAXIS MOBILE SERVICES SDN BHD",
     "Digital",
     "Belinda",
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
     "SME26 PEN RAAGA 400",
     "KPJ HEALTHCARE UNIVERSITY COLLEGE - KPJU",
     "Radio",
     "Shin Hsin",
     0.009
    ],
    [
     "SPORTS TOTO-CSR MESSAGE ANTI ILLEGAL-JUL26-DEC'2",
     "STM LOTTERY SDN BHD",
     "Radio",
     "Elaine",
     0.008
    ],
    [
     "GEMPAK MOST WANTED SPONSORSHIP X RMHC",
     "GERBANG ALAF RESTAURANTS SDN BHD",
     "Digital",
     "Keong",
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
     "Shin Hsin",
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
     "Shin Hsin",
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
     "AirAsia - Istanbul Low Fare",
     "AIR ASIA BERHAD",
     "Digital",
     "Shin Hsin",
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
     "MAXIS POSTPAID - BEST OF ENGLISH FOOTBALL SEASON",
     "MAXIS MOBILE SERVICES SDN BHD",
     "Digital",
     "Belinda",
     0.004
    ],
    [
     "MELODY HEALTH THURSDAY - OCT'26",
     "PMG HEALTHCARE SDN BHD",
     "Radio",
     "Elaine",
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
     "Belinda",
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
     "Tastefully Malaysia - SMEVaganza Package",
     "TASTEFULLY MALAYSIA SDN BHD",
     "Digital",
     "Shin Hsin",
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
     "AirAsia - Astro X MOVE Hotel Last Check",
     "AIR ASIA BERHAD",
     "Digital",
     "Shin Hsin",
     0.002
    ],
    [
     "OTT - Honor - Magic 9 x Astro F1 - Sept-Oct'26",
     "HONOR TECHNOLOGY (M) SDN BHD",
     "Digital",
     "Shin Hsin",
     0.002
    ],
    [
     "MELODY - 2026 ASTRO AEC CLASSIC GOLDEN MELODY SI",
     "MAH SING GROUP BHD",
     "Radio",
     "Jessie",
     0.001
    ],
    [
     "UAT Testing",
     "MAXIS MOBILE SERVICES SDN BHD",
     "AA",
     "—",
     0.0
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
       37,
       39,
       2.8
      ],
      [
       18,
       19,
       3.3
      ],
      [
       18,
       18,
       3.0
      ],
      [
       8,
       9,
       2.0
      ]
     ],
     "f": 2.3,
     "g": -8.7
    },
    {
     "id": "Crystal",
     "n": "Crystal",
     "full": "PE, Sook Chin [Crystal]",
     "kind": "exec",
     "mgr": "Hui Yee",
     "cells": [
      [
       74,
       74,
       1.0
      ],
      [
       38,
       41,
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
       15,
       15,
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
       16,
       20,
       0.656
      ]
     ],
     "f": 0.338,
     "g": -3.2
    },
    {
     "id": "Edward",
     "n": "Edward",
     "full": "HAM SHUO ZE, Edward",
     "kind": "exec",
     "mgr": "Hui Yee",
     "cells": [
      [
       15,
       23,
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
     "f": 0.35,
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
       90,
       122,
       1.7
      ],
      [
       40,
       55,
       1.5
      ],
      [
       21,
       28,
       2.1
      ],
      [
       18,
       20,
       2.5
      ]
     ],
     "f": 3.0,
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
       171,
       272,
       0.49
      ],
      [
       67,
       99,
       0.47
      ],
      [
       31,
       36,
       0.7
      ],
      [
       25,
       31,
       0.9
      ]
     ],
     "f": 1.6,
     "g": -0.964
    },
    {
     "id": "Lionel",
     "n": "Lionel",
     "full": "LIM, Lionel Kok Yew",
     "kind": "exec",
     "mgr": "Chen Lee",
     "cells": [
      [
       39,
       48,
       0.42
      ],
      [
       21,
       34,
       0.557
      ],
      [
       10,
       26,
       0.592
      ],
      [
       7,
       7,
       0.582
      ]
     ],
     "f": 0.377,
     "g": -1.8
    },
    {
     "id": "Aisyah",
     "n": "Aisyah",
     "full": "AZIZI, Aisyah",
     "kind": "exec",
     "mgr": "Chen Lee",
     "cells": [
      [
       68,
       68,
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
     "f": 0.899,
     "g": -1.0
    },
    {
     "id": "Fiona",
     "n": "Fiona",
     "full": "LEE, Tze Mun",
     "kind": "exec",
     "mgr": "Chen Lee",
     "cells": [
      [
       65,
       65,
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
     "f": 0.133,
     "g": -0.993
    }
   ],
   "total": {
    "cells": [
     [
      57,
      70,
      4.5
     ],
     [
      25,
      30,
      4.8
     ],
     [
      20,
      22,
      5.1
     ],
     [
      13,
      15,
      4.5
     ]
    ],
    "f": 5.3,
    "g": -13.5
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
     "Suntory BEC CNY Commercial",
     "Suntory Beverage & Food Malaysia Sdn Bhd",
     "Radio",
     "80%",
     "Svensson",
     {
      "Jan": 0.133
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
     "ORION DEAL- GWM RADIO SPONSORSHIP 2026 - …",
     "GREAT WALL MOTOR SALES MALAYSIA SDN BHD",
     "Radio",
     "Booked",
     "Crystal",
     [
      0.219,
      0.199,
      0.219,
      null
     ],
     0.637
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
     "VIVAKI- MYTEKSI SDN BHD- ONEGRAB -ASTRO MI…",
     "MYTEKSI SDN BHD",
     "Digital",
     "Booked",
     "Amanda",
     [
      0.289,
      null,
      null,
      null
     ],
     0.289
    ],
    [
     "MAYBANK - ASTRO RADIO SPONSORSHIP 2026/2…",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Booked",
     "Crystal",
     [
      0.1,
      0.088,
      0.056,
      null
     ],
     0.244
    ],
    [
     "CALPIS X MIX BREAKFAST SEGMENT (18/6/26-3/1…",
     "ETIKA SDN BHD",
     "Radio",
     "Booked",
     "Aisyah",
     [
      0.068,
      0.065,
      0.07,
      null
     ],
     0.203
    ],
    [
     "HITZ MORNING CREW SEGMENT SPONSORSHIP &…",
     "UMW TOYOTA MOTOR SDN BHD",
     "Radio",
     "Booked",
     "Edward",
     [
      0.058,
      0.056,
      0.063,
      null
     ],
     0.177
    ],
    [
     "INVENTORY DEAL 3.0-MEMBERS SALE OCT'26",
     "EU YAN SANG (1959) SDN BHD",
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
     "HAVAL H6 - GWM X BASS WEDDING SPONSORSHIP",
     "GREAT WALL MOTOR SALES MALAYSIA SDN BHD",
     "TV",
     "Booked",
     "Crystal",
     [
      0.115,
      null,
      null,
      null
     ],
     0.115
    ],
    [
     "ORION DEAL-CAH 30TH ANNIVERSARY JUNE-NOV …",
     "COLUMBIA ASIA SDN BHD",
     "Radio",
     "Booked",
     "Amanda",
     [
      null,
      0.038,
      0.038,
      null
     ],
     0.076
    ],
    [
     "WENG SENG HENG MEDICAL - YU YEE OIL",
     "WENG SENG HENG MEDICAL FACTORY SDN BHD",
     "TV",
     "Booked",
     "Amanda",
     [
      null,
      0.034,
      0.034,
      null
     ],
     0.068
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
     "MELODY MORNING SEGMENT SPONSORSHIP 5OC…",
     "SEREMBAN TWO HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Svensson",
     [
      null,
      0.027,
      0.027,
      null
     ],
     0.054
    ],
    [
     "TAYLOR'S UNIVESITY - QS RANKING",
     "TAYLOR'S UNIVERSITY SDN BHD",
     "TV",
     "Booked",
     "Lionel",
     [
      null,
      0.032,
      null,
      null
     ],
     0.032
    ],
    [
     "MELODY - TIME CHECK, SME AN HOUR, MELODY …",
     "GOODMORNING GLOBAL SDN BHD",
     "Radio",
     "Booked",
     "Lionel",
     [
      null,
      null,
      0.028,
      null
     ],
     0.028
    ],
    [
     "ERA CEKEPI 1 YEAR SPONSORSHIP 2026 (MARCH'2…",
     "UMW TOYOTA MOTOR SDN BHD",
     "Radio",
     "Booked",
     "Edward",
     [
      null,
      null,
      null,
      0.022
     ],
     0.022
    ],
    [
     "MELODY - TIME CHECK, SME AN HOUR, MELODY HE…",
     "GOODMORNING GLOBAL SDN BHD",
     "Radio",
     "Booked",
     "Lionel",
     [
      null,
      null,
      null,
      0.021
     ],
     0.021
    ],
    [
     "HITZ MORNING CREW SEGMENT SPONSORSHIP & T…",
     "UMW TOYOTA MOTOR SDN BHD",
     "Radio",
     "Booked",
     "Edward",
     [
      null,
      null,
      null,
      0.016
     ],
     0.016
    ],
    [
     "MAYBANK - ASTRO RADIO SPONSORSHIP 2026/2027",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Booked",
     "Crystal",
     [
      null,
      null,
      null,
      0.007
     ],
     0.007
    ],
    [
     "GAJAHMAS",
     "GAJAH EMAS INDUSTRIES SDN BHD",
     "TV",
     "Booked",
     "Lionel",
     [
      null,
      null,
      null,
      0.005
     ],
     0.005
    ],
    [
     "CALPIS X MIX BREAKFAST SEGMENT (18/6/26-3/1/27",
     "ETIKA SDN BHD",
     "Radio",
     "Booked",
     "Aisyah",
     [
      null,
      null,
      null,
      0.003
     ],
     0.003
    ]
   ],
   "bankOct": [
    [
     "VIVAKI- MYTEKSI SDN BHD- ONEGRAB -ASTRO MI…",
     "MYTEKSI SDN BHD",
     "Digital",
     "Booked",
     "Amanda",
     0.289
    ],
    [
     "ORION DEAL- GWM RADIO SPONSORSHIP 2026 - …",
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
     "MAYBANK - ASTRO RADIO SPONSORSHIP 2026/2…",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Booked",
     "Crystal",
     0.1
    ],
    [
     "CALPIS X MIX BREAKFAST SEGMENT (18/6/26-3/1…",
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
     "HITZ MORNING CREW SEGMENT SPONSORSHIP &…",
     "UMW TOYOTA MOTOR SDN BHD",
     "Radio",
     "Booked",
     "Edward",
     0.058
    ]
   ],
   "bookings": [
    [
     "VIVAKI- MYTEKSI SDN BHD- ONEGRAB -ASTRO MICRODRA",
     "MYTEKSI SDN BHD",
     "Digital",
     "Amanda",
     0.289
    ],
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
     "APD DIGITAL SERVICES SB- MBSB BANK BERHAD- MBSB",
     "MBSB BANK BERHAD",
     "Digital",
     "Fiona",
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
     "MINDSHARE-SIME DARBY PPTY (KLGCC RST) SB-2825A-K",
     "SIME DARBY PROPERTY BERHAD",
     "Digital",
     "Fiona",
     0.024
    ],
    [
     "MELODY DRIVE SEGMENT SPONSORSHIP 2025-2026",
     "EU YAN SANG (1959) SDN BHD",
     "Radio",
     "Amanda",
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
     "DIECT-EMART24 HOLDINGS SDN BHD- AMBASSADOR LAUNC",
     "EMART24 HOLDINGS SDN BHD",
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
     "VIVAKI-PEPSICO- STING-F1 SEPANG ACTIVATION",
     "PEPSICO (MALAYSIA) SDN BHD",
     "Digital",
     "Aisyah",
     0.016
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
     "STING F1 2026",
     "PEPSICO (CONCENTRATED MANUFACTURING SING",
     "AA",
     "Aisyah",
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
     "INVICTUS BLUE SB-MALAYAN BANKING BERHAD-LITE FM-",
     "MALAYAN BANKING BERHAD",
     "Digital",
     "Crystal",
     0.012
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
     "TAKAFUL 101 - CP-02153234",
     "SUN LIFE MALAYSIA ASSURANCE BERHAD",
     "AA",
     "Lionel",
     0.01
    ],
    [
     "MAYBANK FIXED DEPOSIT WEALTH BUNDLE CAMPAIGN 202",
     "MALAYAN BANKING BERHAD",
     "Radio",
     "Crystal",
     0.01
    ],
    [
     "STING X F1 (30/9/26-15/10/26) - AUDIO IMPACT",
     "CONCENTRATE MANUFACTURING (SINGAPORE) PT",
     "Radio",
     "Aisyah",
     0.009
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
     "IPG ORION-GREAT WALL MOTOR SALES MALAYSIA SB –HA",
     "GREAT WALL MOTOR SALES MALAYSIA SDN BHD",
     "Digital",
     "Crystal",
     0.008
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
     "FA26 PEN MIX 450",
     "21ST CENTURY PRODUCTS SDN BHD",
     "Radio",
     "Aisyah",
     0.007
    ],
    [
     "FA26 PEN SINAR 500",
     "21ST CENTURY PRODUCTS SDN BHD",
     "Radio",
     "Aisyah",
     0.007
    ],
    [
     "DIRECT- ETIKA SB-HEALTHY CALPIS",
     "ETIKA SDN BHD",
     "Digital",
     "Aisyah",
     0.006
    ],
    [
     "DIRECT-FWD MALAYSIA HOLDIINGS SB-FWD MALAYSIA AG",
     "FWD MALAYSIA HOLDINGS SDN BHD",
     "Digital",
     "Lionel",
     0.006
    ],
    [
     "MINDSHARE-EU YAN SANG (1959) SB-MELODY DRIVE SEG",
     "EU YAN SANG (1959) SDN BHD",
     "Digital",
     "Amanda",
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
     "CONSIDER IPROSPECT-GENTING MALAYSIA BERHAD-HAKIM",
     "GENTING MALAYSIA BERHAD",
     "Digital",
     "Edward",
     0.005
    ],
    [
     "ORION DEAL-CAH 30TH ANNIVERSARY JUNE-NOV 2026 (P",
     "COLUMBIA ASIA SDN BHD",
     "Radio",
     "Amanda",
     0.005
    ],
    [
     "PINK DOLPHIN ADWORK PLT-SEREMBAN 2 SB-IJM S2-MEL",
     "SEREMBAN TWO HOLDINGS SDN BHD",
     "Digital",
     "Svensson",
     0.004
    ],
    [
     "INFINITY MEDIA ADS SERVICES SB-LALAMOVE MALAYSIA",
     "LALAMOVE MALAYSIA SDN BHD",
     "Digital",
     "Edward",
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
     "MAD LADS MEDIA SB-UWM TOYOTA MOTOR SB-HITZ MORNI",
     "UMW TOYOTA MOTOR SDN BHD",
     "Digital",
     "Edward",
     0.003
    ],
    [
     "VIDA WATER, VIDA C AND VIDA ZERO [BEVERAGE]",
     "THE VIDA WORLD SDN BHD",
     "AA",
     "Amanda",
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
     "MAD LADS MEDIA SB-UWM TOYOTA MOTOR SB-ERA CEKEPI",
     "UMW TOYOTA MOTOR SDN BHD",
     "Digital",
     "Edward",
     0.001
    ],
    [
     "SAFE CHILD, STRONG NATION",
     "CHILDRENS PROTECTION SOCIETY MALAYSIA",
     "TV",
     "Fiona",
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
     "DIRECT-ETIKA SB-TERBANG-STING THE MOVIE",
     "ETIKA SDN BHD",
     "Digital",
     "Aisyah",
     0.001
    ],
    [
     "FLU AWARENESS x LITE EXPERT HOUR",
     "SANOFI - AVENTIS (M) SDN BHD",
     "Radio",
     "Lionel",
     0.0
    ],
    [
     "IPG ORION SB-COLUMBIA ASIA SB- CAH 30TH ANNIVERS",
     "COLUMBIA ASIA SDN BHD",
     "Digital",
     "Amanda",
     0.0
    ],
    [
     "STING X F1 (30/9/26-15/10/26) - AUDIO IMPACT",
     "PEPSICO (MALAYSIA) SDN BHD",
     "Radio",
     "Aisyah",
     -0.006
    ]
   ]
  },
  "amelia": {
   "rows": [
    {
     "id": "Gates",
     "n": "Gates",
     "full": "WONG, Gates",
     "kind": "manager",
     "mgr": null,
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
     "f": 0.165,
     "g": -3.7
    },
    {
     "id": "Gates and Yuk Tung",
     "n": "Gates and Yuk Tung",
     "full": "WONG, Gates & CHAN, Yuk Tung",
     "kind": "shared",
     "mgr": "Gates",
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
     "f": 0.165,
     "g": -3.7
    },
    {
     "id": "Gates (Gates)",
     "n": "Gates",
     "full": "WONG, Gates",
     "kind": "member",
     "mgr": "Gates",
     "cells": [
      {
       "f": 0.035,
       "c": 0.035
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
     "f": 0.165,
     "g": null,
     "pair": "Gates and Yuk Tung"
    },
    {
     "id": "Yuk Tung",
     "n": "Yuk Tung",
     "full": "CHAN, Yuk Tung",
     "kind": "member",
     "mgr": "Gates",
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
     "id": "Lani",
     "n": "Lani",
     "full": "LOW, Lani",
     "kind": "manager",
     "mgr": null,
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
     "id": "Lani and Yean Yean",
     "n": "Lani and Yean Yean",
     "full": "LOW, Lani & YEAN YEAN",
     "kind": "shared",
     "mgr": "Lani",
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
     "id": "Lani (Lani)",
     "n": "Lani",
     "full": "LOW, Lani",
     "kind": "member",
     "mgr": "Lani",
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
     "mgr": "Lani",
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
    "f": 0.213,
    "g": -7.4
   },
   "open": [],
   "bank": [
    [
     "2026 MJN Ambassador",
     "MEAD JOHNSON NUTRITION (M) SDN BHD",
     "Digital",
     "Won",
     "Gates and Yuk Tung",
     [
      0.035,
      0.036,
      0.036,
      0.036
     ],
     0.143
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
     "MJN - 2026 Ambassador POSM Usage Right",
     "MEAD JOHNSON NUTRITION (M) SDN BHD",
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
    ]
   ],
   "bankOct": [
    [
     "2026 MJN Ambassador",
     "MEAD JOHNSON NUTRITION (M) SDN BHD",
     "Digital",
     "Won",
     "Gates and Yuk Tung",
     0.035
    ]
   ],
   "bookings": []
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
       25,
       26,
       0.864
      ],
      [
       9,
       48,
       0.667
      ],
      [
       12,
       41,
       0.967
      ],
      [
       53,
       159,
       0.745
      ]
     ],
     "f": 0.79,
     "g": -2.5
    },
    {
     "id": "Yuki",
     "n": "Yuki",
     "full": "LOOI, Yun Yi [Yuki]",
     "kind": "exec",
     "mgr": null,
     "cells": [
      [
       92,
       111,
       0.576
      ],
      [
       25,
       41,
       0.849
      ],
      [
       50,
       88,
       0.677
      ],
      [
       21,
       91,
       0.717
      ]
     ],
     "f": 1.2,
     "g": -1.6
    },
    {
     "id": "Yoke Saan",
     "n": "Yoke Saan",
     "full": "WONG, Yoke Saan",
     "kind": "exec",
     "mgr": null,
     "cells": [
      [
       112,
       112,
       0.518
      ],
      [
       1,
       23,
       0.849
      ],
      [
       1,
       39,
       0.613
      ],
      [
       8,
       58,
       0.717
      ]
     ],
     "f": 0.65,
     "g": -2.0
    },
    {
     "id": "Annabel",
     "n": "Annabel",
     "full": "LEE, Joe Lynn [Annabel]",
     "kind": "exec",
     "mgr": null,
     "cells": [
      {
       "f": 0.067,
       "c": 0.083
      },
      [
       20,
       32,
       0.667
      ],
      [
       3,
       17,
       0.967
      ],
      [
       52,
       80,
       0.688
      ]
     ],
     "f": 0.59,
     "g": -1.7,
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
       "f": 0.011,
       "c": 0.011
      },
      null,
      null,
      null
     ],
     "f": 0.011,
     "g": null,
     "note": "Revenue not yet in the name mapping · KOK, Yoong Wei [Stephanie]"
    }
   ],
   "total": {
    "cells": [
     [
      55,
      59,
      2.9
     ],
     [
      14,
      36,
      3.0
     ],
     [
      15,
      44,
      3.2
     ],
     [
      34,
      98,
      2.9
     ]
    ],
    "f": 3.4,
    "g": -8.6
   },
   "open": [
    [
     "NEWS SPONSORSHIP - AEC - PRIME TALK",
     "U MOBILE",
     "TV",
     "50%",
     "Henry",
     {
      "Nov": 0.156,
      "Dec": 0.156,
      "Jan": 0.156
     }
    ],
    [
     "SPONSORSHIP - AEC - THE GRANDMASTER COOK OFF S2",
     "WATSONS",
     "Digital + Radio +…",
     "80%",
     "Henry",
     {
      "Jan": 0.309
     }
    ],
    [
     "SPONSORSHIP - AEC -ASQ 2026",
     "ADONIS BEAUTY",
     "Digital + Radio +…",
     "80%",
     "Annabel",
     {
      "Oct": 0.083,
      "Nov": 0.163,
      "Dec": 0.042
     }
    ],
    [
     "SPONSORSHIP - AEC - CGM CNY SPECIAL 2027",
     "MAH SING",
     "TV",
     "80%",
     "Annabel",
     {
      "Jan": 0.257
     }
    ],
    [
     "SPONSORSHIP - AEC - SIFU MAY I ASK? S4",
     "GENTLE SUMPREME",
     "Digital + Radio +…",
     "80%",
     "Annabel",
     {
      "Jan": 0.192
     }
    ],
    [
     "AWANIBYTE",
     "INDAH WATER KONSORTIUM SDN BHD",
     "Digital",
     "80%",
     "Yuki",
     {
      "Nov": 0.077,
      "Dec": 0.077
     }
    ],
    [
     "SPONSORSHIP - CNY MV",
     "9 KOPITIAM",
     "TV",
     "80%",
     "Henry",
     {
      "Dec": 0.016,
      "Jan": 0.094
     }
    ],
    [
     "SPONSORSHIP - CNY MV",
     "HO YAN HOR",
     "TV",
     "80%",
     "Henry",
     {
      "Dec": 0.016,
      "Jan": 0.094
     }
    ],
    [
     "RADIO COMMERCIAL",
     "AEON CREDIT SERVICE (M) BERHAD",
     "Radio",
     "50%",
     "Yuki",
     {
      "Oct": 0.1
     }
    ],
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
    ],
    [
     "JIWA SME",
     "SYARIKAT JAMINAN PEMBIAYAAN PERNIAGAAN B",
     "TV",
     "80%",
     "Yuki",
     {
      "Nov": 0.039
     }
    ],
    [
     "SPONSORSHIP - AOD - DRAMA SPONSORSHIP",
     "TVBI COMPANY LIMITED",
     "TV",
     "80%",
     "Henry",
     {
      "Oct": 0.02,
      "Nov": 0.02
     }
    ],
    [
     "RADIO COMMERCIAL",
     "AGENSI ETERNITY SDN BHD",
     "Radio",
     "50%",
     "Yuki",
     {
      "Nov": 0.017,
      "Dec": 0.017
     }
    ],
    [
     "KOONG WOH TONG SDN BHD",
     "KOONG WOH TONG SDN BHD",
     "Radio",
     "80%",
     "Yuki",
     {
      "Oct": 0.022
     }
    ],
    [
     "STARLIGHT MANAGEMENT",
     "STARLIGHT MANAGEMENT",
     "Radio",
     "80%",
     "Yuki",
     {
      "Nov": 0.012
     }
    ],
    [
     "ELECTION PACKAGE",
     "STM LOTTERY",
     "Radio",
     "50%",
     "Annabel",
     {
      "Nov": 0.011
     }
    ],
    [
     "CROVER CORPORATION",
     "CROVER CORPORATION",
     "Radio",
     "80%",
     "Yuki",
     {
      "Oct": 0.009
     }
    ],
    [
     "RADIO COMMERCIAL",
     "POTATO STORY SDN BHD",
     "Radio",
     "50%",
     "Yuki",
     {
      "Nov": 0.002
     }
    ]
   ],
   "bank": [
    [
     "JOY PARADISE X MYFM BIG SHOW (21 SEPT -",
     "JOY PARADISE HOLIDAYS SDN BHD",
     "Radio",
     "Booked",
     "Yoke Saan",
     [
      0.133,
      null,
      null,
      null
     ],
     0.133
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
     "POSTPAID & PREPAID - UMOBILE ULTRA5G REV…",
     "U MOBILE SDN BHD",
     "TV",
     "Booked",
     "Henry",
     [
      0.097,
      null,
      null,
      null
     ],
     0.097
    ],
    [
     "INDAH WATER MELODY MIX SINAR (AUG - DEC 2026)",
     "INDAH WATER KONSORTIUM SDN BHD",
     "Radio",
     "Booked",
     "Yuki",
     [
      null,
      0.042,
      0.034,
      null
     ],
     0.076
    ],
    [
     "SMEVAGANZA26_POWERPETS FOOD SDN BHD",
     "POWERPETS FOOD SDN BHD",
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
     "AEON MOTOGP TIX GIVEAWAY (ERA & SINAR) (…",
     "AEON CREDIT SERVICE (M) BERHAD",
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
     "HN MASSIVE HOME UPGRADE SALE (GROUP A-…",
     "ELITETRAX MARKETING SDN BHD",
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
     "SJPP MIX CHAT TO CHAT & SEGMENT SPONSOR…",
     "SYARIKAT JAMINAN PEMBIAYAAN PERNIAGAAN B",
     "Radio",
     "Booked",
     "Yuki",
     [
      0.063,
      null,
      null,
      null
     ],
     0.063
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
     "NOVAMIL KID'S FORMULA MILK AWARENESS C…",
     "DELFI MARKETING SDN BHD",
     "Radio",
     "Booked",
     "Yoke Saan",
     [
      0.049,
      null,
      null,
      null
     ],
     0.049
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
    ],
    [
     "MAH SING HOUSING PROPERTY",
     "MAH SING GROUP BERHAD",
     "TV",
     "Booked",
     "Justin",
     [
      0.048,
      null,
      null,
      null
     ],
     0.048
    ],
    [
     "SMEVAGANZA26_CARING PHARMACY AUG 2026",
     "CARING PHARMACY",
     "Digital + Radio",
     "Won",
     "Yuki",
     [
      0.048,
      null,
      null,
      null
     ],
     0.048
    ],
    [
     "SME UPFRONT 26_MILESTONE",
     "MILESTONE PRODUCTION SDN BHD",
     "Radio",
     "Won",
     "Yuki",
     [
      null,
      null,
      0.047,
      null
     ],
     0.047
    ],
    [
     "SME UPFRONT 26 - STYLE LASER",
     "STYLE LASER AUDIO SDN BHD",
     "Radio",
     "Won",
     "Yuki",
     [
      null,
      null,
      0.046,
      null
     ],
     0.046
    ],
    [
     "SMEVAGANZA26_PETOUR MALAYSIA SDN BHD",
     "PETOUR MALAYSIA SDN BHD",
     "Radio",
     "Won",
     "Yuki",
     [
      null,
      null,
      null,
      0.046
     ],
     0.046
    ],
    [
     "IPSERVERONE RADIO COMMERCIAL (AUG - DEC…",
     "IP SERVERONE SOLUTIONS SDN BHD",
     "Radio",
     "Booked",
     "Yoke Saan",
     [
      0.042,
      null,
      null,
      null
     ],
     0.042
    ],
    [
     "HN MASSIVE HOME UPGRADE SALE (GROUP B-…",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Booked",
     "Yoke Saan",
     [
      0.04,
      null,
      null,
      null
     ],
     0.04
    ],
    [
     "BIKERS CARD",
     "AEON CREDIT SERVICE (M) BERHAD",
     "TV",
     "Booked",
     "Yuki",
     [
      null,
      0.034,
      null,
      null
     ],
     0.034
    ],
    [
     "SME UPFRONT26 _METRO EYEWEAR MOG",
     "METRO EYEWEAR HOLDINGS SDN BHD",
     "Radio",
     "Won",
     "Yuki",
     [
      null,
      null,
      0.033,
      null
     ],
     0.033
    ],
    [
     "SME UPFRONT 26 - CARING PHARMACY",
     "CARING PHARMACY",
     "Radio",
     "Won",
     "Yuki",
     [
      null,
      null,
      0.026,
      null
     ],
     0.026
    ],
    [
     "SME UPFRONT 26 - BCROBES MARKETING",
     "B-CROBES MARKETING (M) SDN BHD",
     "Radio",
     "Won",
     "Yuki",
     [
      0.01,
      0.001,
      0.012,
      null
     ],
     0.023
    ],
    [
     "GO XUAN RISING HOUR-OCT'26-JAN'27",
     "HERBALCEUTICAL (M) SDN BHD",
     "Radio",
     "Booked",
     "Henry",
     [
      null,
      0.01,
      0.011,
      0.0
     ],
     0.021
    ],
    [
     "POSTPAID & PREPAID - UMOBILE ULTRA5G REVAMP…",
     "U MOBILE SDN BHD",
     "TV",
     "Booked",
     "Henry",
     [
      null,
      0.019,
      null,
      null
     ],
     0.019
    ],
    [
     "SME UPFRONT 26 REG MIX CE",
     "AGENSI PEKERJAAN ETERNITY SDN BHD",
     "Radio",
     "Won",
     "Henry",
     [
      null,
      null,
      0.017,
      null
     ],
     0.017
    ],
    [
     "SME UPFRONT 26 REG MELODY CE",
     "AGENSI PEKERJAAN ETERNITY SDN BHD",
     "Radio",
     "Won",
     "Henry",
     [
      null,
      null,
      0.014,
      null
     ],
     0.014
    ],
    [
     "MAGGI 2 MINUTES NOODLE - SAB THEMATIC",
     "NESTLE PRODUCT SDN BHD",
     "TV",
     "Booked",
     "Henry",
     [
      null,
      0.007,
      null,
      null
     ],
     0.007
    ],
    [
     "SJPP MIX CHAT TO CHAT & SEGMENT SPONSORSHI…",
     "SYARIKAT JAMINAN PEMBIAYAAN PERNIAGAAN B",
     "Radio",
     "Booked",
     "Yuki",
     [
      null,
      0.007,
      null,
      null
     ],
     0.007
    ],
    [
     "JOY PARADISE X MYFM BIG SHOW (21 SEPT - 1 NOV",
     "JOY PARADISE HOLIDAYS SDN BHD",
     "Radio",
     "Booked",
     "Yoke Saan",
     [
      null,
      0.007,
      null,
      null
     ],
     0.007
    ],
    [
     "NH NUTRI GRAINS",
     "HERBALCEUTICAL (M) SDN BHD",
     "TV",
     "Booked",
     "Henry",
     [
      null,
      0.005,
      null,
      null
     ],
     0.005
    ],
    [
     "SME UPFRONT 26_INFORMA MARKETS",
     "INFORMA MARKETS MALAYSIA",
     "Radio",
     "Won",
     "Yoke Saan",
     [
      null,
      null,
      0.005,
      null
     ],
     0.005
    ],
    [
     "SME26 PEN MIX 100",
     "B-CROBES MARKETING (M) SDN BHD",
     "Radio",
     "Booked",
     "Yuki",
     [
      null,
      0.002,
      null,
      null
     ],
     0.002
    ]
   ],
   "bankOct": [
    [
     "JOY PARADISE X MYFM BIG SHOW (21 SEPT -",
     "JOY PARADISE HOLIDAYS SDN BHD",
     "Radio",
     "Booked",
     "Yoke Saan",
     0.133
    ],
    [
     "POSTPAID & PREPAID - UMOBILE ULTRA5G REV…",
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
     "AEON MOTOGP TIX GIVEAWAY (ERA & SINAR) (…",
     "AEON CREDIT SERVICE (M) BERHAD",
     "Radio",
     "Booked",
     "Yuki",
     0.071
    ],
    [
     "HN MASSIVE HOME UPGRADE SALE (GROUP A-…",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Booked",
     "Yoke Saan",
     0.064
    ],
    [
     "SJPP MIX CHAT TO CHAT & SEGMENT SPONSOR…",
     "SYARIKAT JAMINAN PEMBIAYAAN PERNIAGAAN B",
     "Radio",
     "Booked",
     "Yuki",
     0.063
    ],
    [
     "NOVAMIL KID'S FORMULA MILK AWARENESS C…",
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
     "IPSERVERONE RADIO COMMERCIAL (AUG - DEC…",
     "IP SERVERONE SOLUTIONS SDN BHD",
     "Radio",
     "Booked",
     "Yoke Saan",
     0.042
    ],
    [
     "HN MASSIVE HOME UPGRADE SALE (GROUP B-…",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Booked",
     "Yoke Saan",
     0.04
    ],
    [
     "SME UPFRONT 26 - BCROBES MARKETING",
     "B-CROBES MARKETING (M) SDN BHD",
     "Radio",
     "Won",
     "Yuki",
     0.01
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
     "KOONG WOH TONG RADIO (13 - 25 OCTOBER 2026 )",
     "KOONG WOH TONG",
     "Radio",
     "Yuki",
     0.026
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
     "JOY PARADISE X MYFM BIG SHOW (31 AUG - 1 NOV 202",
     "JOY PARADISE HOLIDAYS SDN BHD",
     "Digital",
     "Yoke Saan",
     0.014
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
     "MOTORGP SPONSORSHIP",
     "AEON CREDIT SERVICE (M) BERHAD",
     "AA",
     "Yuki",
     0.013
    ],
    [
     "NH X Classic Golden Melody",
     "HERBALCEUTICAL (M) SDN BHD",
     "Digital",
     "Henry",
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
     "SJPP X MIX CHAT TO CHAT & SEGMENT SPONSORSHIP",
     "SYARIKAT JAMINAN PEMBIAYAAN PERNIAGAAN B",
     "Digital",
     "Yuki",
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
     "GOOGLE PIXEL X KITA FM CO SPONSOR",
     "VSTECS ASTAR SDN BHD",
     "Digital",
     "Yuki",
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
     "DIRIGO EVENT KLSC RUN (25 SEPT - 2 OCT 2026)",
     "DIRIGO EVENTS SDN BHD",
     "Radio",
     "Yuki",
     0.006
    ],
    [
     "AEON CO X KITA FM AMPLIFICATIONS",
     "AEON CO. (M) BHD",
     "Digital",
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
     "SJPP X JIWA SEWA",
     "SYARIKAT JAMINAN PEMBIAYAAN PERNIAGAAN B",
     "Digital",
     "Yuki",
     0.004
    ],
    [
     "AMBI PUR HOME",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Henry",
     0.004
    ],
    [
     "HN NO GIMMIK, JUST THE BEST PRICES (GROUP B-FUR,",
     "ELITETRAX MARKETING SDN BHD",
     "Radio",
     "Yoke Saan",
     0.002
    ],
    [
     "NEUCLEUS CONSULTING X MELODY MORNING SHOW WITH W",
     "Neucleus Consulting Group Sdn Bhd",
     "Digital",
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
     "NH x GOXUAN Rising Hour",
     "HERBALCEUTICAL (M) SDN BHD",
     "Digital",
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
     "UAT Testing",
     "ROHTO - MENTHOLATUM (M) SDN BHD",
     "AA",
     "—",
     0.0
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
       61,
       64,
       1.7
      ],
      [
       19,
       25,
       2.4
      ],
      [
       12,
       18,
       2.7
      ],
      [
       1,
       9,
       1.7
      ]
     ],
     "f": 1.9,
     "g": -6.7
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
     "f": 0.538,
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
       47,
       47,
       0.56
      ],
      [
       14,
       14,
       0.852
      ],
      [
       8,
       9,
       0.92
      ],
      [
       4,
       4,
       0.56
      ]
     ],
     "f": 0.475,
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
       72,
       82,
       0.567
      ],
      [
       31,
       50,
       0.72
      ],
      [
       28,
       45,
       0.82
      ],
      [
       0,
       24,
       0.56
      ]
     ],
     "f": 0.855,
     "g": -1.8
    },
    {
     "id": "Poh Chee",
     "n": "Poh Chee",
     "full": "VOO, Poh Chee",
     "kind": "manager",
     "mgr": null,
     "cells": [
      [
       85,
       86,
       2.1
      ],
      [
       60,
       60,
       1.5
      ],
      [
       104,
       104,
       1.5
      ],
      [
       3,
       16,
       2.1
      ]
     ],
     "f": 4.3,
     "g": -2.9
    },
    {
     "id": "Ashley",
     "n": "Ashley",
     "full": "HO, Ashley",
     "kind": "exec",
     "mgr": "Poh Chee",
     "cells": [
      [
       87,
       88,
       1.5
      ],
      [
       53,
       53,
       0.931
      ],
      [
       22,
       22,
       0.94
      ],
      [
       4,
       22,
       1.5
      ]
     ],
     "f": 2.1,
     "g": -2.8
    },
    {
     "id": "Edmund Ng",
     "n": "Edmund Ng",
     "full": "NG, Wei Han [Edmund]",
     "kind": "exec",
     "mgr": "Poh Chee",
     "cells": [
      [
       79,
       79,
       0.563
      ],
      [
       72,
       72,
       0.6
      ],
      [
       233,
       233,
       0.597
      ],
      [
       0,
       0,
       0.576
      ]
     ],
     "f": 2.3,
     "g": -0.07,
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
       51,
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
     "f": 0.682,
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
       52,
       52,
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
     "f": 0.339,
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
       145,
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
      73,
      76,
      4.7
     ],
     [
      28,
      41,
      5.0
     ],
     [
      37,
      39,
      5.3
     ],
     [
      2,
      10,
      4.7
     ]
    ],
    "f": 6.9,
    "g": -12.8
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
     "Colgate Optic White Vitamin C x J-Hope",
     "ESSENCEMEDIACOM SDN BH…",
     "Digital",
     "80%",
     "Melanie",
     {
      "Nov": 0.034,
      "Dec": 0.038
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
     "OMNET DEAL-CD 016 POWERLINE SPONSORSHI…",
     "CELCOMDIGI BHD",
     "Radio",
     "Booked",
     "Edmund Ng",
     [
      null,
      null,
      0.879,
      null
     ],
     0.879
    ],
    [
     "WA 016 2026 SPONSORSHIP",
     "CELCOMDIGI BHD",
     "Radio",
     "Won",
     "Edmund Ng",
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
     "Celcomdigi STL 2026",
     "OMD (M) SDN BHD",
     "TV",
     "Won",
     "Ashley",
     [
      0.062,
      0.211,
      0.211,
      0.062
     ],
     0.546
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
     "TM TECHNOLOGY SERVICES SDN BHD",
     "Radio",
     "Booked",
     "Hong Cheng",
     [
      0.167,
      0.122,
      null,
      null
     ],
     0.289
    ],
    [
     "OMNET DEAL-CD 016 POWERLINE SPONSORSHIP 2…",
     "CELCOMDIGI BHD",
     "Radio",
     "Booked",
     "Edmund Ng",
     [
      0.122,
      0.117,
      null,
      null
     ],
     0.239
    ],
    [
     "DENTSU DEAL-CONSIDER IPROSPECT PETRONAS N…",
     "PETRONAS DAGANGAN BERHAD",
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
     "VIVAKI (MALAYSIA) SDN BHD",
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
     "DELIVERY HERO MALAYSIA SDN BHD",
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
      null,
      null,
      null
     ],
     0.126
    ],
    [
     "3M Scotch Brite - October 2026",
     "Ipg Orion Sdn Bhd",
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
     "EUCERIN SPOTLESS BRIGHTENING (RADIO+DIG) AU…",
     "BEIERSDORF (MALAYSIA) SDN BHD",
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
     "SENSODYNE CAVITY LAUNCH RADIO CAMPAIGN-…",
     "GLAXOSMITHKLINE",
     "Radio",
     "Booked",
     "Melanie",
     [
      null,
      null,
      0.101,
      null
     ],
     0.101
    ],
    [
     "SENSODYNE CAVITY LAUNCH RADIO CAMPAIGN-NO…",
     "GLAXOSMITHKLINE",
     "Radio",
     "Booked",
     "Melanie",
     [
      null,
      0.098,
      null,
      null
     ],
     0.098
    ],
    [
     "3M-SCOTCH BRITE - 3M Q3, RADIO 2026",
     "3M INNOVATION SINGAPORE PTE. LTD",
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
     "BrandX Spot Buy - Oct",
     "OMD (M) SDN BHD",
     "TV",
     "Won",
     "Ashley",
     [
      0.078,
      null,
      null,
      null
     ],
     0.078
    ],
    [
     "F1",
     "OMD (M) SDN BHD",
     "TV",
     "Won",
     "Ashley",
     [
      0.078,
      null,
      null,
      null
     ],
     0.078
    ],
    [
     "BrandX Spot Buy - Nov",
     "OMD (M) SDN BHD",
     "TV",
     "Won",
     "Ashley",
     [
      null,
      0.078,
      null,
      null
     ],
     0.078
    ],
    [
     "Panadol Actifast x Awani Flash Ad",
     "VIVAKI (MALAYSIA) SDN BHD",
     "TV",
     "Won",
     "Melanie",
     [
      0.058,
      null,
      null,
      null
     ],
     0.058
    ],
    [
     "CD x Sooka 2026",
     "OMD (M) SDN BHD",
     "Digital",
     "Won",
     "Edmund Ng",
     [
      0.038,
      null,
      null,
      null
     ],
     0.038
    ],
    [
     "HITZ DRIVE TIME SEGMENT SPONSORSHIP MAY-…",
     "TM TECHNOLOGY SERVICES SDN BHD",
     "Radio",
     "Booked",
     "Hong Cheng",
     [
      null,
      null,
      0.037,
      null
     ],
     0.037
    ],
    [
     "THOMSON MIX -MAY'26-NOV'26 (SPOT BUY XTRA)",
     "HERBAL REVIVAL SDN BHD",
     "Radio",
     "Booked",
     "Joe Er",
     [
      null,
      0.032,
      null,
      null
     ],
     0.032
    ],
    [
     "Kotaqu x STL",
     "Kotaqu Niaga",
     "Digital",
     "Won",
     "Edmund Ng",
     [
      0.031,
      null,
      null,
      null
     ],
     0.031
    ],
    [
     "GANJARAN RAKSASA - WEEKEND DOMINATION PAC…",
     "WATSON'S PERSONAL CARE STORES (M) SDN BH",
     "Radio",
     "Booked",
     "Joe Er",
     [
      null,
      0.02,
      null,
      null
     ],
     0.02
    ],
    [
     "GANJARAN RAKSASA - WEEKEND DOMINATION P…",
     "WATSON'S PERSONAL CARE STORES (M) SDN BH",
     "Radio",
     "Booked",
     "Joe Er",
     [
      null,
      null,
      0.02,
      null
     ],
     0.02
    ],
    [
     "ROS XTRA-NH PRO-CRANTICS / NH NUTRI GRAINS -JA",
     "HERBALCEUTICAL (M) SDN BHD",
     "Radio",
     "Booked",
     "Joe Er",
     [
      null,
      null,
      null,
      0.018
     ],
     0.018
    ],
    [
     "SME26 PEN MELODY 1100",
     "KALBE MALAYSIA SDN BHD",
     "Radio",
     "Booked",
     "Joe Er",
     [
      null,
      0.015,
      null,
      null
     ],
     0.015
    ],
    [
     "FA26 PEN LITE 800",
     "HERBAL REVIVAL SDN BHD",
     "Radio",
     "Booked",
     "Joe Er",
     [
      null,
      0.012,
      null,
      null
     ],
     0.012
    ],
    [
     "SME26 NAT ERA 100",
     "SARAWAK MEDIA GROUP SDN BHD",
     "Radio",
     "Booked",
     "Joe Er",
     [
      null,
      0.011,
      null,
      null
     ],
     0.011
    ],
    [
     "SME26 PEN MELODY 140",
     "HERBALCEUTICAL (M) SDN BHD",
     "Radio",
     "Booked",
     "Joe Er",
     [
      null,
      null,
      0.007,
      0.001
     ],
     0.008
    ],
    [
     "SME26 PEN MELODY 160",
     "HERBALCEUTICAL (M) SDN BHD",
     "Radio",
     "Booked",
     "Joe Er",
     [
      null,
      null,
      0.006,
      0.001
     ],
     0.007
    ],
    [
     "SME26 PEN GOXUAN 300",
     "HERBALCEUTICAL (M) SDN BHD",
     "Radio",
     "Booked",
     "Joe Er",
     [
      null,
      null,
      0.003,
      0.003
     ],
     0.006
    ],
    [
     "SME26 EM ERA KC 140",
     "FMP AUTOMOTIVE (MALAYSIA) SDN BHD",
     "Radio",
     "Booked",
     "Joe Er",
     [
      null,
      null,
      0.001,
      null
     ],
     0.001
    ],
    [
     "SME26 EM ERA KK 140",
     "FMP AUTOMOTIVE (MALAYSIA) SDN BHD",
     "Radio",
     "Booked",
     "Joe Er",
     [
      null,
      null,
      0.001,
      null
     ],
     0.001
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
     "WA 016 2026 SPONSORSHIP",
     "CELCOMDIGI BHD",
     "Radio",
     "Won",
     "Edmund Ng",
     0.222
    ],
    [
     "DENTSU DEAL-CONSIDER IPROSPECT PETRONAS N…",
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
     "OMNET DEAL-CD 016 POWERLINE SPONSORSHIP 2…",
     "CELCOMDIGI BHD",
     "Radio",
     "Booked",
     "Edmund Ng",
     0.122
    ],
    [
     "3M Scotch Brite - October 2026",
     "Ipg Orion Sdn Bhd",
     "Radio",
     "Won",
     "Edmund Ng",
     0.108
    ],
    [
     "EUCERIN SPOTLESS BRIGHTENING (RADIO+DIG) AU…",
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
     "BrandX Spot Buy - Oct",
     "OMD (M) SDN BHD",
     "TV",
     "Won",
     "Ashley",
     0.078
    ],
    [
     "F1",
     "OMD (M) SDN BHD",
     "TV",
     "Won",
     "Ashley",
     0.078
    ],
    [
     "Celcomdigi STL 2026",
     "OMD (M) SDN BHD",
     "TV",
     "Won",
     "Ashley",
     0.062
    ],
    [
     "Panadol Actifast x Awani Flash Ad",
     "VIVAKI (MALAYSIA) SDN BHD",
     "TV",
     "Won",
     "Melanie",
     0.058
    ],
    [
     "CD x Sooka 2026",
     "OMD (M) SDN BHD",
     "Digital",
     "Won",
     "Edmund Ng",
     0.038
    ],
    [
     "Kotaqu x STL",
     "Kotaqu Niaga",
     "Digital",
     "Won",
     "Edmund Ng",
     0.031
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
     "BBB LAUNCH",
     "CELCOMDIGI BHD",
     "AA",
     "Ashley",
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
     "PREPAID - BORNEO RISING 2026",
     "CELCOMDIGI BHD",
     "AA",
     "Ashley",
     0.035
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
     "PETRONAS - MCD",
     "PETROLIAM NASIONAL BHD",
     "TV",
     "Melanie",
     0.021
    ],
    [
     "KARA SANTAN CUN CUN JE",
     "KARA MARKETING (M) SDN BHD",
     "Radio",
     "Edmund Ng",
     0.018
    ],
    [
     "PROMO - 888TH STORE LAUNCH",
     "WATSON'S PERSONAL CARE STORES SDN BHD",
     "TV",
     "Joe Er",
     0.018
    ],
    [
     "SAMSONITE FRIENDS & FAMILY SALES-OCT'26",
     "SAMSONITE MALAYSIA SDN BHD",
     "Radio",
     "Melanie",
     0.017
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
     "SME26 NAT ERA 100",
     "SARAWAK MEDIA GROUP SDN BHD",
     "Radio",
     "Joe Er",
     0.008
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
     "TM UNIFI X UNIFI DRIVE ON HITZ MAY - OCT'26",
     "TM TECHNOLOGY SERVICES SDN BHD",
     "Digital",
     "Hong Cheng",
     0.007
    ],
    [
     "TM X JIWA SME 2026",
     "TM TECHNOLOGY SERVICES SDN BHD",
     "Digital",
     "Hong Cheng",
     0.006
    ],
    [
     "ASTRO CLASSIC GOLDEN MELODY 2026 - SPONSORSHIP C",
     "HERBALCEUTICAL (M) SDN BHD",
     "Radio",
     "Joe Er",
     0.006
    ],
    [
     "SEPAK TAKRAW LEAGUE'26",
     "CELCOMDIGI BHD",
     "AA",
     "Ashley",
     0.005
    ],
    [
     "FCMP - CP-02160682",
     "FONTERRA BRAND (M) SDN BHD",
     "AA",
     "Melanie",
     0.004
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
     "Pakej Hujung Minggu-Watsons 11.11- migrate from",
     "WATSON'S PERSONAL CARE STORES (M) SDN BH",
     "Digital",
     "Joe Er",
     0.003
    ],
    [
     "FOODPANDA X ASTRO F1 GP SPONSORSHIP",
     "DELIVERY HERO MALAYSIA SDN BHD",
     "Digital",
     "Dayang",
     0.002
    ],
    [
     "Watson's 45+ Weekend Domination",
     "WATSON'S PERSONAL CARE STORES (M) SDN BH",
     "Digital",
     "Joe Er",
     0.001
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
     "WPP Media-TM-AEC Prime Talk Sponsorship-Oct-Nov'",
     "TM TECHNOLOGY SERVICES SDN BHD",
     "Digital",
     "Hong Cheng",
     0.0
    ],
    [
     "BRO GEGAR PAGI BREAKFAST SPONSORSHIP 2026",
     "CELCOMDIGI BHD",
     "Digital",
     "Edmund Ng",
     -0.001
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
       61,
       61,
       1.4
      ],
      [
       20,
       20,
       1.4
      ],
      [
       10,
       10,
       1.6
      ],
      [
       7,
       7,
       1.5
      ]
     ],
     "f": 1.4,
     "g": -4.5
    },
    {
     "id": "Rhesimalar",
     "n": "Rhesimalar",
     "full": "RAVI, Rhesimalar",
     "kind": "exec",
     "mgr": "Pushpa",
     "cells": [
      [
       51,
       51,
       0.514
      ],
      [
       24,
       24,
       0.468
      ],
      [
       26,
       26,
       0.49
      ],
      [
       18,
       18,
       0.528
      ]
     ],
     "f": 0.597,
     "g": -1.4
    },
    {
     "id": "Yulesha",
     "n": "Yulesha",
     "full": "PREMA KUMARAN, Yulesha",
     "kind": "exec",
     "mgr": "Pushpa",
     "cells": [
      [
       71,
       71,
       0.466
      ],
      [
       31,
       31,
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
     "f": 0.478,
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
       61,
       61,
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
     "f": 0.349,
     "g": -1.6
    },
    {
     "id": "Reporting directly",
     "n": "Reporting directly",
     "full": "Reporting directly to the head",
     "kind": "direct",
     "mgr": null,
     "cells": [
      [
       54,
       54,
       0.497
      ],
      [
       16,
       16,
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
     "f": 0.404,
     "g": -1.7
    },
    {
     "id": "Kirabassri",
     "n": "Kirabassri",
     "full": "SIVANESON, Kirabassri",
     "kind": "exec",
     "mgr": "Reporting directly",
     "cells": [
      [
       54,
       54,
       0.497
      ],
      [
       16,
       16,
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
     "f": 0.404,
     "g": -1.7
    }
   ],
   "total": {
    "cells": [
     [
      59,
      59,
      1.9
     ],
     [
      19,
      19,
      2.0
     ],
     [
      9,
      9,
      2.2
     ],
     [
      6,
      6,
      1.9
     ]
    ],
    "f": 1.8,
    "g": -6.2
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
      null,
      null,
      null
     ],
     0.055
    ],
    [
     "SME26 PEN RAAGA 600",
     "VAISHNAV RESOURCES SDN BHD",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      null,
      0.014,
      0.016,
      0.014
     ],
     0.044
    ],
    [
     "FERNLEAF FCMP",
     "FONTERRA BRANDS (M) SDN BHD",
     "TV",
     "Booked",
     "Kirabassri",
     [
      null,
      0.018,
      0.018,
      null
     ],
     0.036
    ],
    [
     "SME26 PEN RAAGA 600",
     "ARTIZZ FOOD AND BEVERAGES SDN BHD",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      null,
      0.011,
      0.014,
      0.011
     ],
     0.036
    ],
    [
     "SME26 PEN RAAGA 600",
     "HAIR ASIAN COSMETIC MANUFACTURING SDN BH",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      null,
      null,
      0.022,
      0.014
     ],
     0.036
    ],
    [
     "SME26 PEN RAAGA 800",
     "RAVIRAJ SDN BHD",
     "Radio",
     "Booked",
     "Yulesha",
     [
      0.035,
      null,
      null,
      null
     ],
     0.035
    ],
    [
     "HYPERMAALAI 4PM - 8PM WITH UNITAR [7/9/2026 -",
     "UNITAR CAPITAL SDN BHD",
     "Radio",
     "Booked",
     "Kirabassri",
     [
      0.033,
      null,
      null,
      null
     ],
     0.033
    ],
    [
     "RAAGA WEEKDAY 6AM-10AM WITH JOTHI IMPEX (1…",
     "JOTHI IMPEX SDN BHD",
     "Radio",
     "Booked",
     "Pravinn",
     [
      0.032,
      null,
      null,
      null
     ],
     0.032
    ],
    [
     "NEEM ACTIVE TOOTHPASTE PROMO-OCT'26-NOV'26…",
     "JYOTHY LABS LIMITED",
     "Radio",
     "Booked",
     "Yulesha",
     [
      null,
      0.028,
      null,
      null
     ],
     0.028
    ],
    [
     "RAAGA BULKBUY 4000 (2025)",
     "GM KUMARANS WHOLESALE KLANG",
     "Radio",
     "Booked",
     "Pravinn",
     [
      0.026,
      null,
      null,
      null
     ],
     0.026
    ],
    [
     "RAAGA BULKBUY 5000 (2026)",
     "SYARIKAT SRI MURUGAN TRADING AGENCY SDN",
     "Radio",
     "Booked",
     "Kirabassri",
     [
      0.026,
      null,
      null,
      null
     ],
     0.026
    ],
    [
     "LALAMOVE X RAAGA DEEPAVALI NHTU (5/10/26-30/…",
     "LALAMOVE MALAYSIA SDN BHD",
     "Radio",
     "Booked",
     "Pravinn",
     [
      0.026,
      null,
      null,
      null
     ],
     0.026
    ],
    [
     "SME26 HIGH FREQUENCY & DHOOL ANA 3",
     "AGENDA SURIA COMMUNICATIONS SDN BHD",
     "Radio",
     "Booked",
     "Yulesha",
     [
      0.025,
      null,
      null,
      null
     ],
     0.025
    ],
    [
     "JOTHI IMPEX SHAN MASALA - COOKING CAPSULES (…",
     "JOTHI IMPEX SDN BHD",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      0.024,
      null,
      null,
      null
     ],
     0.024
    ],
    [
     "SME26 PEN RAAGA 400",
     "PRIMA ASIA SDN BHD",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      null,
      null,
      0.014,
      0.009
     ],
     0.023
    ],
    [
     "SME26 PEN RAAGA 400",
     "JOMKUMPUL (M) SDN BHD",
     "Radio",
     "Booked",
     "Yulesha",
     [
      null,
      0.012,
      0.01,
      null
     ],
     0.022
    ],
    [
     "FA26 PEN RAAGA 600",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Kirabassri",
     [
      null,
      0.011,
      0.011,
      null
     ],
     0.022
    ],
    [
     "FERNLEAF TAMIL NEW YEAR & DEEPAVALI TIME CH…",
     "FONTERRA BRAND (M) SDN BHD",
     "Radio",
     "Booked",
     "Kirabassri",
     [
      null,
      0.021,
      null,
      null
     ],
     0.021
    ],
    [
     "WEATHER FORECAST DBKL 2026-RAAGA",
     "DEWAN BANDARAYA KUALA LUMPUR",
     "Radio",
     "Booked",
     "Pravinn",
     [
      null,
      null,
      0.009,
      0.009
     ],
     0.018
    ],
    [
     "SME26 PEN RAAGA 500",
     "STAR MAAS MARKETING",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      null,
      null,
      0.011,
      0.006
     ],
     0.017
    ],
    [
     "SME26 PEN RAAGA 400",
     "ASIA COMMODITY TRADING (M) SDN BHD",
     "Radio",
     "Booked",
     "Kirabassri",
     [
      null,
      0.014,
      null,
      null
     ],
     0.014
    ],
    [
     "SME26 PEN RAAGA 300",
     "advertiser not recorded",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      null,
      null,
      0.011,
      null
     ],
     0.011
    ],
    [
     "SME26 PEN RAAGA 600",
     "SWAMI SIVANADHA HERBAL (M) SDN BHD",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      null,
      null,
      null,
      0.011
     ],
     0.011
    ],
    [
     "SME26 PEN RAAGA 300",
     "JAAKS GLOBAL SDN BHD",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      null,
      null,
      null,
      0.011
     ],
     0.011
    ],
    [
     "LIVING BRAINS COMMITMENT (MAY 2026 - JAN 2027)",
     "JOYALUKKAS",
     "Radio",
     "Booked",
     "Yulesha",
     [
      null,
      0.01,
      null,
      null
     ],
     0.01
    ],
    [
     "SME26 PEN RAAGA 400",
     "SRI KUMARAN TEXTILES",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      null,
      null,
      null,
      0.007
     ],
     0.007
    ],
    [
     "SME26 PEN RAAGA 300",
     "SRI MEENATCHI'S (M) SDN BHD",
     "Radio",
     "Booked",
     "Rhesimalar",
     [
      null,
      null,
      null,
      0.006
     ],
     0.006
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
     "HYPERMAALAI 4PM - 8PM WITH UNITAR [7/9/2026 -",
     "UNITAR CAPITAL SDN BHD",
     "Radio",
     "Booked",
     "Kirabassri",
     0.033
    ],
    [
     "RAAGA WEEKDAY 6AM-10AM WITH JOTHI IMPEX (1…",
     "JOTHI IMPEX SDN BHD",
     "Radio",
     "Booked",
     "Pravinn",
     0.032
    ],
    [
     "RAAGA BULKBUY 4000 (2025)",
     "GM KUMARANS WHOLESALE KLANG",
     "Radio",
     "Booked",
     "Pravinn",
     0.026
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
     "LALAMOVE X RAAGA DEEPAVALI NHTU (5/10/26-30/…",
     "LALAMOVE MALAYSIA SDN BHD",
     "Radio",
     "Booked",
     "Pravinn",
     0.026
    ],
    [
     "SME26 HIGH FREQUENCY & DHOOL ANA 3",
     "AGENDA SURIA COMMUNICATIONS SDN BHD",
     "Radio",
     "Booked",
     "Yulesha",
     0.025
    ],
    [
     "JOTHI IMPEX SHAN MASALA - COOKING CAPSULES (…",
     "JOTHI IMPEX SDN BHD",
     "Radio",
     "Booked",
     "Rhesimalar",
     0.024
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
     "RAAGA BULKBUY 4000 (2025)",
     "GM KUMARANS WHOLESALE KLANG",
     "Radio",
     "Pravinn",
     0.026
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
     "SME26 HIGH FREQUENCY & DHOOL ANA 3",
     "AGENDA SURIA COMMUNICATIONS SDN BHD",
     "Radio",
     "Yulesha",
     0.025
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
     "VANAKKAM RAAGA (WEEKDAY, 10AM-1PM) WITH MAPS ENT",
     "MAPS ENTERPRISE SDN BHD",
     "Digital + Radio",
     "Yulesha",
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
     "SME26 PEN RAAGA 400",
     "ASIA COMMODITY TRADING (M) SDN BHD",
     "Radio",
     "Kirabassri",
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
     "RAAGAVIL RAGALAI WITH SELLATURAI TEXTILES (17/10",
     "AZRA TRADING SDN BHD",
     "Radio",
     "Rhesimalar",
     0.009
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
     "ROS XTRA-ASIAN DEEPAVALI-OCT'26",
     "DP GANAA NETWORKS",
     "Radio",
     "Pravinn",
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
     "SME26 PEN RAAGA 300",
     "advertiser not recorded",
     "Radio",
     "Rhesimalar",
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
     "RAAGA CAMPUS KATHAIGAL WITH MAHSA UNIVERSITY 202",
     "MALAYSIAN ALLIED HEALTH SCIENCES ACADEMY",
     "Digital",
     "Rhesimalar",
     0.004
    ],
    [
     "SME26 PEN RAAGA 100",
     "JASMINE FOOD CORPORATION SDN BHD",
     "Radio",
     "Yulesha",
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
     "SME26 PAN RAAGA 400",
     "HANIFFA SDN BHD",
     "Radio",
     "Pravinn",
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
     "ARUSUVAI CUISINE",
     "Radio",
     "Yulesha",
     0.003
    ],
    [
     "SME26 PEN RAAGA 105",
     "SURIA JERAI ELECTRICAL SDN BHD",
     "Radio",
     "Yulesha",
     0.003
    ],
    [
     "HYPERMAALAI 4PM - 8PM with UNITAR",
     "UNITAR CAPITAL SDN BHD",
     "Digital",
     "Kirabassri",
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
     "HYPERMAALAI 4PM - 8PM with UNITAR - SEPT 2026",
     "UNITAR CAPITAL SDN BHD",
     "Digital",
     "Kirabassri",
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
     "RAAGA INNIKI ENNA KATHE WITH MADANIKAS SEPT 2026",
     "3D FASHION EMPIRE",
     "Digital",
     "Kirabassri",
     0.001
    ],
    [
     "DOWNY D2C WIBC VALUE",
     "PROCTER & GAMBLE (M) SDN BHD",
     "TV",
     "Kirabassri",
     0.001
    ],
    [
     "RAAGA INNIKI ENNA KATHE WITH MADANIKAS",
     "3D FASHION EMPIRE",
     "Digital",
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
     "TEXTILE",
     "RAAJI SILK PALACE",
     "TV",
     "Yulesha",
     0.001
    ],
    [
     "RAAGA HYPERMAALAI 4PM - 8PM WITH UNITAR AUG-SEPT",
     "UNITAR CAPITAL SDN BHD",
     "Digital",
     "Kirabassri",
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
     "KPJUC SME SOCIAL LITE OPTION 1",
     "KPJ HEALTHCARE UNIVERSITY COLLEGE - KPJU",
     "Digital",
     "Yulesha",
     -0.004
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
       54,
       54,
       0.36
      ],
      [
       16,
       19,
       0.284
      ],
      [
       14,
       18,
       0.33
      ],
      [
       0,
       0,
       0.293
      ]
     ],
     "f": 0.287,
     "g": -0.98
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
     "f": 0.179,
     "g": -0.985
    },
    {
     "id": "Nur Izzatul",
     "n": "Nur Izzatul",
     "full": "ABDUL RAZAK, Nur Izzatul Baizura",
     "kind": "exec",
     "mgr": null,
     "cells": [
      [
       42,
       43,
       0.359
      ],
      [
       12,
       15,
       0.284
      ],
      [
       13,
       21,
       0.275
      ],
      [
       0,
       0,
       0.244
      ]
     ],
     "f": 0.219,
     "g": -0.943
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
      41,
      43,
      1.1
     ],
     [
      8,
      9,
      1.1
     ],
     [
      12,
      17,
      1.2
     ],
     [
      0,
      0,
      1.1
     ]
    ],
    "f": 0.685,
    "g": -3.8
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
     "Borak Seeni | TPMJ|Dec",
     "JABATAN AGAMA ISLAM NEGERI JOHOR",
     "Radio + TV",
     "80%",
     "Nur Izzatul",
     {
      "Dec": 0.019
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
     "ZAKAT 2026",
     "MAJLIS AGAMA ISLAM NEGERI JOHOR",
     "Radio",
     "80%",
     "Nur Izzatul",
     {
      "Dec": 0.012
     }
    ],
    [
     "SURIA JERAI DEEPAVALI & CHRISTMAS PROMO 2026",
     "BRANDADS …",
     "Radio",
     "80%",
     "Yi Tong",
     {
      "Oct": 0.005,
      "Dec": 0.005
     }
    ],
    [
     "PALLAS BTS BRANDING - SMEVAGANZA",
     "International Footwear Sdn Bhd",
     "Radio",
     "80%",
     "Yi Tong",
     {
      "Dec": 0.007
     }
    ]
   ],
   "bank": [
    [
     "SNEK KU 50TH ANNIVERSARY - SEGMENT",
     "NEW STAR FOOD INDUSTRIES SDN BHD",
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
     "IMIKA EMPIRE SDN BHD",
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
     "Thong Guan Trading Sdn Bhd - 888 Teh Tarik Mal",
     "THONG GUAN TRADING SDN BHD",
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
     0.035
    ],
    [
     "SNEKKU - ERA 10AM - 1PM SEGMENT",
     "NEW STAR FOOD INDUSTRIES SDN BHD",
     "Radio",
     "Booked",
     "Nur Izzatul",
     [
      0.017,
      0.017,
      null,
      null
     ],
     0.034
    ],
    [
     "SNEKKU - MY 1PM - 4PM SEGMENT",
     "NEW STAR FOOD INDUSTRIES SDN BHD",
     "Radio",
     "Booked",
     "Nur Izzatul",
     [
      0.017,
      0.017,
      null,
      null
     ],
     0.034
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
     "PAKEJ HUJUNG MINGGU GEGAR JUNE26-JULY27",
     "IMIKA EMPIRE SDN BHD",
     "Radio",
     "Booked",
     "Maznan",
     [
      0.022,
      null,
      null,
      null
     ],
     0.022
    ],
    [
     "FA26 PEN MELODY 670 SPOTS",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     [
      0.012,
      0.001,
      null,
      null
     ],
     0.013
    ],
    [
     "GOXUAN DRIVE SEGMENT SPONSORSHIP SEPT-OCT'…",
     "TEONG HUAT MEDICAL SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
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
     "GOXUAN DRIVE SEGMENT SPONSORSHIP SEPT-O…",
     "TEONG HUAT MEDICAL SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     [
      null,
      0.009,
      null,
      null
     ],
     0.009
    ],
    [
     "FA26 PEN LITE 600 SPOTS",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     [
      null,
      0.001,
      null,
      null
     ],
     0.001
    ],
    [
     "FA26 PEN GEGAR 705",
     "OEL REALTY HOLDINGS SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     [
      null,
      0.001,
      null,
      null
     ],
     0.001
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
     "Thong Guan Trading Sdn Bhd - 888 Teh Tarik Mal",
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
     "SME26 PEN SINAR 100",
     "TECK AUN MEDICAL FACTORY SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     0.024
    ],
    [
     "PAKEJ HUJUNG MINGGU GEGAR JUNE26-JULY27",
     "IMIKA EMPIRE SDN BHD",
     "Radio",
     "Booked",
     "Maznan",
     0.022
    ],
    [
     "SNEKKU - ERA 10AM - 1PM SEGMENT",
     "NEW STAR FOOD INDUSTRIES SDN BHD",
     "Radio",
     "Booked",
     "Nur Izzatul",
     0.017
    ],
    [
     "SNEKKU - MY 1PM - 4PM SEGMENT",
     "NEW STAR FOOD INDUSTRIES SDN BHD",
     "Radio",
     "Booked",
     "Nur Izzatul",
     0.017
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
     "GOXUAN DRIVE SEGMENT SPONSORSHIP SEPT-OCT'…",
     "TEONG HUAT MEDICAL SDN BHD",
     "Radio",
     "Booked",
     "Yi Tong",
     0.01
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
     "SME26 PEN SINAR 100",
     "TECK AUN MEDICAL FACTORY SDN BHD",
     "Radio",
     "Yi Tong",
     0.024
    ],
    [
     "PAKEJ HUJUNG MINGGU GEGAR JUNE26-JULY27",
     "IMIKA EMPIRE SDN BHD",
     "Radio",
     "Maznan",
     0.022
    ],
    [
     "SNEKKU - ERA 10AM - 1PM SEGMENT",
     "NEW STAR FOOD INDUSTRIES SDN BHD",
     "Radio",
     "Nur Izzatul",
     0.017
    ],
    [
     "SNEKKU - MY 1PM - 4PM SEGMENT",
     "NEW STAR FOOD INDUSTRIES SDN BHD",
     "Radio",
     "Nur Izzatul",
     0.017
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
     "CHANDRIKA & GEET GOVIND 2026",
     "YUSUF TAIYOOB SDN BHD",
     "Radio",
     "Maznan",
     0.008
    ],
    [
     "SME360 ERA SOUTH 70",
     "JANNAHNOE EMPIRE SDN BHD",
     "Radio",
     "Nur Izzatul",
     0.008
    ],
    [
     "SME26 ERA SOUTH 80 SPOT",
     "JALEN SERVICES SDN BHD",
     "Radio",
     "Nur Izzatul",
     0.007
    ],
    [
     "Teong Huat Medical Sdn Bhd- Neobun Branding - Br",
     "TEONG HUAT SDN. BHD",
     "Digital",
     "Yi Tong",
     0.005
    ],
    [
     "NATURALLY LANGKAWI REED LADA",
     "LADA ECO TOURISM SDN.BHD",
     "Digital",
     "Maznan",
     0.005
    ],
    [
     "FA26 HITZ SABAH 100",
     "APES MEDIA SOLUTIONS",
     "Radio",
     "Nur Izzatul",
     0.004
    ],
    [
     "SME RAAGA CHANDRIKA OCT",
     "YUSUF TAIYOOB SDN BHD",
     "Radio",
     "Maznan",
     0.002
    ],
    [
     "PHM SINAR IMIKA MEDIAKEY SEPT",
     "IMIKA EMPIRE SDN BHD",
     "Digital",
     "Maznan",
     0.002
    ],
    [
     "JALEN ON GROUND ACTIVATION (MELAKA)",
     "JALEN SERVICES SDN BHD",
     "Radio",
     "Nur Izzatul",
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
     "WAQAF AN NUR | PAKEJ HUJUNG MINGGU ZAYAN JAN - D",
     "WAKAF AN-NUR CORPORATION BHD",
     "Digital",
     "Nur Izzatul",
     0.001
    ],
    [
     "PHM GEGAR IMIKA MEDIA KEY OCT",
     "IMIKA EMPIRE SDN BHD",
     "Digital",
     "Maznan",
     0.0
    ]
   ]
  }
 },
 "previous": {
  "asOf": "2026-10-09",
  "asOfLabel": "9 Oct 2026",
  "companyWon": 15.3,
  "heads": {
   "joy": 2.4,
   "edison": 0.473,
   "yuen": 2.3,
   "alvin": 1.9,
   "belinda": 1.9,
   "suatwei": 3.0,
   "siokchin": 1.6,
   "kavin": 1.1,
   "joanne": 0.373
  },
  "leads": {
   "kenn": 0.182
  },
  "note": "Won-booked, like for like: same forecast rule, Kult inside both totals."
 }
};
