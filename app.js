// Portfolio Coins: Currently held
const portfolioCoins = [
  {
    name: "RNDR",
    apiUrl: "https://api.binance.com/api/v3/ticker/price?symbol=RNDRUSDT",
    amount: 2.14785, // Updated coin amount
    purchasePrice: 14,
    imgUrl: "RNDR.png",
  },
  {
    name: "LUNA",
    apiUrl: "https://api.binance.com/api/v3/ticker/price?symbol=LUNAUSDT",
    amount: 13.96602,
    purchasePrice: 10,
    imgUrl: "LUNA.png",
  },
  {
    name: "XLM",
    apiUrl: "https://api.binance.com/api/v3/ticker/price?symbol=XLMUSDT",
    amount: 65.934,
    purchasePrice: 8,
    imgUrl: "XLM.png",
  },
  {
    name: "ADA",
    apiUrl: "https://api.binance.com/api/v3/ticker/price?symbol=ADAUSDT",
    amount: 19.98,
    purchasePrice: 16,
    imgUrl: "ADA.png",
  },
  {
    name: "BONK",
    apiUrl: "https://api.binance.com/api/v3/ticker/price?symbol=BONKUSDT",
    amount: 592877.53,
    purchasePrice: 10,
    imgUrl: "BONK.png",
  },
  {
    name: "PEPE",
    apiUrl: "https://api.binance.com/api/v3/ticker/price?symbol=PEPEUSDT",
    amount: 1659467.87,
    purchasePrice: 20,
    imgUrl: "PEPE.png",
  },
  {
    name: "MEME",
    apiUrl: "https://api.binance.com/api/v3/ticker/price?symbol=MEMEUSDT",
    amount: 1529.469,
    purchasePrice: 20,
    imgUrl: "MEME.png",
  },
  {
    name: "BTTC",
    apiUrl: "https://api.binance.com/api/v3/ticker/price?symbol=BTTCUSDT",
    amount: 17076923,
    purchasePrice: 20,
    imgUrl: "BTTC.png",
  },
  {
    name: "STMX",
    apiUrl: "https://api.binance.com/api/v3/ticker/price?symbol=STMXUSDT",
    amount: 2979.018,
    purchasePrice: 20,
    imgUrl: "STMX.png",
  },
  {
    name: "AI",
    apiUrl: "https://api.binance.com/api/v3/ticker/price?symbol=AIUSDT",
    amount: 129.87,
    purchasePrice: 60,
    imgUrl: "sleepless AI.png",
  },
  {
    name: "FET",
    apiUrl: "https://api.binance.com/api/v3/ticker/price?symbol=FETUSDT",
    amount: 10.989,
    purchasePrice: 8,
    imgUrl: "Fetch-AI.png",
  },
  {
    name: "DOT", // Updated DOT purchase price
    apiUrl: "https://api.binance.com/api/v3/ticker/price?symbol=DOTUSDT",
    amount: 11.81817,
    purchasePrice: 100, // Updated purchase price for DOT
    imgUrl: "DOT.png",
  },
];

// Sold Coins (separate list)
const soldCoins = [
  {
    name: "DOGE",
    amount: 176.823,
    soldPrice: 47.7,
    imgUrl: "DOGE.png",
  },
  {
    name: "SHIBA",
    amount: 1605473.92,
    soldPrice: 44.39,
    imgUrl: "SHIBA INU.png",
  },
  {
    name: "FLOKI",
    amount: 225380.39,
    soldPrice: 42.74,
    imgUrl: "FLOKI.png",
  },
];

// Fetching live price from Binance API
async function fetchPrice(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return parseFloat(data.price);
  } catch (error) {
    console.error("Error fetching price:", error);
    return 0;
  }
}

// Rendering Portfolio (Current Coins)
async function renderPortfolio() {
  const portfolioContainer = document.getElementById("portfolio-container");
  portfolioContainer.innerHTML = "";
  let totalValue = 0;

  // Fetch the data for each coin and calculate its value
  const portfolioData = await Promise.all(
    portfolioCoins.map(async (coin) => {
      const price = await fetchPrice(coin.apiUrl);
      const value = coin.amount * price;
      totalValue += value; // Add each coin's value to the total portfolio value

      return {
        ...coin,
        price,
        value,
      };
    })
  );

  // Sorting the portfolio data by value descending
  portfolioData.sort((a, b) => b.value - a.value);

  // Displaying the data on the page
  portfolioData.forEach((coin) => {
    const card = document.createElement("div");
    card.className = "crypto-card";
    card.style.backgroundImage = `url('${coin.imgUrl}')`;
    card.innerHTML = `
      <h3>${coin.name}</h3>
      <p>Current Price: <span>${coin.price.toFixed(8)} USDT</span></p>
      <p>Amount: <span>${coin.amount}</span></p>
      <p>Value: <span>${coin.value.toFixed(2)} USDT</span></p>
      <p>Bought for: <span>${coin.purchasePrice.toFixed(2)} USD</span></p>
    `;
    portfolioContainer.appendChild(card);
  });

  // Updating the total value on the page
  document.getElementById("total-value").textContent = totalValue.toFixed(2);
}

// Rendering Sold Portfolio (Sold Coins)
async function renderSoldPortfolio() {
  const soldPortfolioContainer = document.getElementById("sold-portfolio");
  soldPortfolioContainer.innerHTML = "<h3>Sold Portfolio:</h3>";

  let totalSoldValue = 0; // To track total value if not sold

  for (const coin of soldCoins) {
    const currentPrice = await fetchPrice(
      `https://api.binance.com/api/v3/ticker/price?symbol=${coin.name}USDT`
    );
    const currentValue = coin.amount * currentPrice;

    // Calculate how much the coin would be worth today if not sold
    totalSoldValue += currentValue;

    const card = document.createElement("div");
    card.className = "crypto-card";
    card.style.backgroundImage = `url('${coin.imgUrl}')`;
    card.innerHTML = `
      <h3>${coin.name}</h3>
      <p>Amount Sold: <span>${coin.amount}</span></p>
      <p>Sold Price: <span>${coin.soldPrice.toFixed(2)} USDT</span></p>
      <p>Current Value If Not Sold: <span>${currentValue.toFixed(
        2
      )} USDT</span></p>
    `;
    soldPortfolioContainer.appendChild(card);
  }

  // Display the total value of sold coins if not sold
  const totalValueDisplay = document.createElement("div");
  totalValueDisplay.className = "total-sold-value";
  totalValueDisplay.innerHTML = `
    <h3>Total Value of Sold Coins If Not Sold: <span>${totalSoldValue.toFixed(
      2
    )} USDT</span></h3>
  `;
  soldPortfolioContainer.appendChild(totalValueDisplay);
}

// Calling the functions to render both portfolios
renderPortfolio();
renderSoldPortfolio();
// delete
async function renderPortfolio() {
  const portfolioContainer = document.getElementById("portfolio-container");
  portfolioContainer.innerHTML = "";
  let totalValue = 0;

  // Coins that should have red text
  const redCoins = ["ADA", "BTTC", "MEME", "XLM", "FLOKI"];

  const portfolioData = await Promise.all(
    portfolioCoins.map(async (coin) => {
      const price = await fetchPrice(coin.apiUrl);
      const value = coin.amount * price;
      totalValue += value;

      // Check if the coin is in the redCoins list
      const isRedCoin = redCoins.includes(coin.name);
      const textColor = isRedCoin ? "red" : "black"; // Set text color based on the coin

      return {
        ...coin,
        price,
        value,
        textColor, // Pass textColor to display for each coin
      };
    })
  );

  // Sorting the portfolio data by value descending
  portfolioData.sort((a, b) => b.value - a.value);

  portfolioData.forEach((coin) => {
    const card = document.createElement("div");
    card.className = "crypto-card";
    card.style.backgroundImage = `url('${coin.imgUrl}')`;
    card.innerHTML = `
      <h3 style="color: ${coin.textColor};">${coin.name}</h3>
      <p style="color: ${
        coin.textColor
      };">Current Price: <span>${coin.price.toFixed(8)} USDT</span></p>
      <p style="color: ${coin.textColor};">Amount: <span>${
      coin.amount
    }</span></p>
      <p style="color: ${coin.textColor};">Value: <span>${coin.value.toFixed(
      2
    )} USDT</span></p>
      <p style="color: ${
        coin.textColor
      };">Bought for: <span>${coin.purchasePrice.toFixed(2)} USD</span></p>
    `;
    portfolioContainer.appendChild(card);
  });

  document.getElementById(
    "total-value"
  ).textContent = `Total Portfolio Value: ${totalValue.toFixed(2)} USDT`;
}
