const currenciesCode = [
    "AED",
    "ARS",
    "AUD",
    "BRL",
    "BDT",
    "CAD",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CZK",
    "DKK",
    "DZD",
    "EGP",
    "EUR",
    "GBP",
    "HKD",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "JPY",
    "KRW",
    "KWD",
    "KZT",
    "MAD",
    "MXN",
    "MYR",
    "NGN",
    "NOK",
    "NZD",
    "OMR",
    "PHP",
    "PKR",
    "PLN",
    "QAR",
    "RON",
    "RUB",
    "SAR",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "UAH",
    "USD",
    "UZS",
    "VND",
    "ZAR"
  ]
  
  const currencies = ()=>{
      return currenciesCode.map((currency)=>{
          return {
          value: currency,
          label: currency
          }
      })
  }

  export default currencies