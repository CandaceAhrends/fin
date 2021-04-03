import axios from "./Axios";
import { of, from, forkJoin, throwError, Observable } from "rxjs";
import { switchMap, map, tap, catchError, reduce } from "rxjs/operators";
import moment from "moment";
//const url = "http://localhost:3200/user";
const url = `https://financialmodelingprep.com/api/v3/stock/list?apikey=`;

const key = "a6bc9823f42d03208d2933eef1c722bd";

const stockSymbols = () => {
  // return from(axios.get(`${url}${key}`)).pipe(
  //   map((res) => res.data),
  //   catchError((error) => {
  //     return of({ message: "Server Error" });
  //   })
  // );
  return of(getDummy());
};

export default stockSymbols;

function getDummy() {
  return [
    {
      symbol: "SPY",
      name: "SPDR S&P 500",
      price: 400.61,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FB",
      name: "Face Corp",
      price: 54.75,
      exchange: "Nasdaq Global Select",
    },
    {
      symbol: "C",
      name: "Kinder Morgan Inc",
      price: 16.84,
      exchange: "New York Stock Exchange",
    },
    {
      symbol: "INTC",
      name: "Intel Corp",
      price: 64.55,
      exchange: "Nasdaq Global Select",
    },
    {
      symbol: "MU",
      name: "Micron Technology Inc",
      price: 92.41,
      exchange: "Nasdaq Global Select",
    },
    {
      symbol: "CC",
      name: "VanEck Vectors Gold Miners",
      price: 33.6,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "CCC",
      name: "Franklin FTSE Asia ex Japan",
      price: 29.1112,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "CCA",
      name: "Franklin FTSE Brazil",
      price: 20.2582,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLCA",
      name: "Franklin FTSE Canada",
      price: 30.67,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLCH",
      name: "Franklin FTSE China",
      price: 32.67,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLCO",
      name: "Franklin Liberty Investment Grade Corporate",
      price: 25.635,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLEH",
      name: "Franklin FTSE Europe Hedged",
      price: 26.2,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLFR",
      name: "Franklin FTSE France",
      price: 28.99,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLGB",
      name: "Franklin FTSE United Kingdom",
      price: 24.11,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLGE",
      name: "Credit Suisse FI Large Cap Growth Enhanced ETN",
      price: 573.732,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "F",
      name: "Franklin FTSE Germany",
      price: 26.41,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLGT",
      name: "Fulgent Genetics Inc",
      price: 100.45,
      exchange: "Nasdaq Global Market",
    },
    {
      symbol: "FLHK",
      name: "Franklin FTSE Hong Kong",
      price: 28.559,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLIN",
      name: "Franklin FTSE India",
      price: 28.1201,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLIO",
      name: "Franklin Liberty International Opportunities",
      price: 25.975,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLIY",
      name: "Franklin FTSE Italy",
      price: 26.8103,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLJH",
      name: "Franklin FTSE Japan Hedged",
      price: 31.0973,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLJP",
      name: "Franklin FTSE Japan",
      price: 30.56,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLKR",
      name: "Franklin FTSE South Korea",
      price: 32.19,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLLV",
      name: "Franklin Liberty U.S. Low Volatility",
      price: 44.0983,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLM",
      name: "First Trust Global Engineering and Construction",
      price: 56.1788,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLMB",
      name: "Franklin Templeton ETF Trust Liberty Municipal Bond",
      price: 26.905,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "G",
      name:
        "Franklin Templeton ETF Trust Liberty Intermediate Municipal Opportunities",
      price: 26.335,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLMX",
      name: "Franklin FTSE Mexico",
      price: 22.5499,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLN",
      name: "First Trust Latin America AlphaDEX Fund",
      price: 17.8871,
      exchange: "Nasdaq Global Market",
    },
    {
      symbol: "A",
      name: "Franklin LibertyQ Global Dividend",
      price: 33.4655,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLQG",
      name: "Franklin LibertyQ Global Equity",
      price: 38.0307,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLQH",
      name: "Franklin LibertyQ International Equity Hedged",
      price: 26.9997,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLQL",
      name: "Franklin LibertyQ U.S. Equity",
      price: 40.45,
      exchange: "BATS Exchange",
    },
    {
      symbol: "FLQM",
      name: "Franklin LibertyQ U.S. Mid Cap Equity",
      price: 41.3206,
      exchange: "BATS Exchange",
    },
    {
      symbol: "FLQS",
      name: "Franklin LibertyQ U.S. Small Cap Equity",
      price: 36.9776,
      exchange: "BATS Exchange",
    },
    {
      symbol: "FLRT",
      name: "AdvisorShares Pacific Asset Enhanced Floating Rate",
      price: 48.87,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLRU",
      name: "Franklin FTSE Russia",
      price: 26.6228,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLSW",
      name: "Franklin FTSE Switzerland",
      price: 30.7015,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FLTW",
      name: "Franklin FTSE Taiwan",
      price: 41.8133,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FMAT",
      name: "Fidelity MSCI Materials Index",
      price: 44.63,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FMB",
      name: "First Trust Managed Municipal ETF",
      price: 56.51,
      exchange: "Nasdaq Global Market",
    },
    {
      symbol: "FMDG",
      name: "Fieldstone Merlin Dynamic Large Cap Growth",
      price: 25.03,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FMF",
      name: "First Trust Morningstar Managed Futures Strategy Fund",
      price: 47.48,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FMK",
      name: "First Trust Mega Cap AlphaDEX Fund",
      price: 42.92,
      exchange: "Nasdaq Global Market",
    },
    {
      symbol: "FMN",
      name: "Federated Hermes Premier Municipal Income Fund",
      price: 14.54,
      exchange: "New York Stock Exchange",
    },
    {
      symbol: "FMY",
      name: "First Trust Mortgage Income Fund",
      price: 13.4496,
      exchange: "New York Stock Exchange",
    },
    {
      symbol: "FNCB",
      name: "FNCB Bancorp Inc",
      price: 7.8,
      exchange: "Nasdaq Capital Market",
    },
    {
      symbol: "FNCF",
      name: "iShares Edge MSCI Multifactor Financials",
      price: 34.76,
      exchange: "BATS Exchange",
    },
    {
      symbol: "FNDC",
      name: "Schwab Fundamental International Small Company Index",
      price: 37.92,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FNGD",
      name:
        "BMO REX MicroSectors FANG Index -3X Inverse Leveraged Exchange Traded Notes",
      price: 3.59,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FNK",
      name: "First Trust Mid Cap Value AlphaDEX Fund",
      price: 43.35,
      exchange: "Nasdaq Global Market",
    },
    {
      symbol: "FNTE",
      name: "FinTech Acquisition Corp. II",
      price: 9.84,
      exchange: "Nasdaq Capital Market",
    },
    {
      symbol: "FNTEU",
      name: "FinTech Acquisition Corp. II Unit",
      price: 10.8,
      exchange: "Nasdaq Capital Market",
    },
    {
      symbol: "FNTEW",
      name: "FinTech Acquisition Corp. II Warrant",
      price: 1.58,
      exchange: "Nasdaq Capital Market",
    },
    {
      symbol: "FOANC",
      name: "Gabelli NextShares Trust",
      price: 99.96,
      exchange: "Nasdaq Global Market",
    },
    {
      symbol: "FOIL",
      name: "iPath Pure Beta Aluminum ETN",
      price: 27.89,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FONE",
      name: "First Trust NASDAQ Smartphone Index Fund",
      price: 46.7,
      exchange: "Nasdaq Global Market",
    },
    {
      symbol: "FORD",
      name: "Forward Industries Inc",
      price: 2.82,
      exchange: "Nasdaq Capital Market",
    },
    {
      symbol: "FORK",
      name: "Fuling Global Inc",
      price: 2.34,
      exchange: "Nasdaq Capital Market",
    },
    {
      symbol: "FORTY",
      name: "Formula Systems (1985) Ltd. ADS represents 1 ordinary shares",
      price: 87.45,
      exchange: "Nasdaq Global Select",
    },
    {
      symbol: "FPA",
      name: "First Trust Asia Pacific Ex-Japan AlphaDEX Fund",
      price: 34.162,
      exchange: "NASDAQ Global Market",
    },
    {
      symbol: "FPAY",
      name: "FlexShopper Inc",
      price: 2.63,
      exchange: "Nasdaq Capital Market",
    },
    {
      symbol: "FPEI",
      name: "First Trust Institutional Preferred Securities and Income",
      price: 20.31,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FPXI",
      name: "First Trust International IPO ETF",
      price: 66.98,
      exchange: "Nasdaq Global Market",
    },
    {
      symbol: "FQAL",
      name: "Fidelity Quality Factor",
      price: 45.87,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FRAK",
      name: "VanEck Vectors Unconventional Oil & Gas",
      price: 113.281,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FRD",
      name: "Friedman Industries Inc",
      price: 8.16,
      exchange: "NYSE American",
    },
    {
      symbol: "FSAC",
      name: "Federal Street Acquisition Corp.",
      price: 10.12,
      exchange: "Nasdaq Capital Market",
    },
    {
      symbol: "FSACU",
      name:
        "Federal Street Acquisition Corp. Unit consisting of One Common Stock and Half of a Warrant",
      price: 10.61,
      exchange: "Nasdaq Capital Market",
    },
    {
      symbol: "FSACW",
      name: "Federal Street Acquisition Corp. Warrant",
      price: 0.77,
      exchange: "Nasdaq Capital Market",
    },
    {
      symbol: "FSBC",
      name: "FSB Bancorp Inc.",
      price: 13.35,
      exchange: "Nasdaq Capital Market",
    },
    {
      symbol: "FSBW",
      name: "FS Bancorp Inc",
      price: 67.67,
      exchange: "Nasdaq Capital Market",
    },
    {
      symbol: "FSFG",
      name: "First Savings Financial Group Inc",
      price: 68.5,
      exchange: "Nasdaq Capital Market",
    },
    {
      symbol: "FSI",
      name: "Flexible Solutions International Inc",
      price: 3.99,
      exchange: "NYSE American",
    },
    {
      symbol: "FSTA",
      name: "Fidelity MSCI COnsumer Staples Index",
      price: 41.47,
      exchange: "New York Stock Exchange Arca",
    },
    {
      symbol: "FTA",
      name: "First Trust Large Cap Value AlphaDEX Fund",
      price: 63.99,
      exchange: "Nasdaq Global Market",
    },
    {
      symbol: "FTAG",
      name: "First Trust Indxx Global Agriculture ETF",
      price: 30.4209,
      exchange: "Nasdaq Global Market",
    },
    {
      symbol: "FTEO",
      name: "FRONTEO Inc.",
      price: 135.05,
      exchange: "Nasdaq Global Select",
    },
    {
      symbol: "FTFT",
      name: "Future Fintech Group Inc",
      price: 5.525,
      exchange: "Nasdaq Global Market",
    },
    {
      symbol: "FTGC",
      name: "First Trust Global Tactical Commodity Strategy Fund",
      price: 20.93,
      exchange: "Nasdaq Global Market",
    },
    {
      symbol: "FTHI",
      name: "First Trust BuyWrite Income ETF",
      price: 21.23,
      exchange: "Nasdaq Global Market",
    },
  ];
}
