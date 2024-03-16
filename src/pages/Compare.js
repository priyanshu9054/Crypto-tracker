import React, { useState, useEffect } from 'react'
import Header from '../components/Common/Header'
import SelectCoins from '../Compare/SelectCoins'
import SelectDays from '../components/CoinPage/SelectDays';
import { getCoinData } from '../functions/getCoinData';
import { coinObject } from '../functions/convertObject';
import { getCoinPrices } from '../functions/getCoinPrices';
import { settingChartData } from '../functions/settingChartData';
import Loader from '../components/Common/Loader';
import Info from '../components/CoinPage/Info';
import List from '../components/Dashboard/List';
import LineChart from '../components/CoinPage/LineChart';
import ToggleComponents from '../components/CoinPage/ToggleComponent';
import { getPrices } from '../functions/getPrices';

function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [days, setDays] = useState(30);
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({});

  async function handleDaysChange(event) {
    setIsLoading(true);
    setDays(event.target.value);
    const prices1 = await getCoinPrices(crypto1, event.target.value, priceType);
    const prices2 = await getCoinPrices(crypto2, event.target.value, priceType);
    settingChartData(setChartData, prices1, prices2);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [])

  async function getData() {
    setIsLoading(true);
    const data1 = await getCoinData(crypto1);
    const data2 = await getCoinData(crypto2);

    if (data1) {
      coinObject(setCrypto1Data, data1);
    }
  if (data2) {
    coinObject(setCrypto2Data, data2);   
  }

  if (data1 && data2) {
    const prices1 = await getCoinPrices(crypto1, days, priceType);
    const prices2 = await getCoinPrices(crypto2, days, priceType);

    if (prices1.length>0 && prices2.length>0) {
      settingChartData(setChartData, prices1,prices2);
      console.log("Both prices are fetched", prices1, prices2)
      setIsLoading(false);
      }
    }
  }

  const handleCoinChange = async (event, isCoin2 = false) => {
  setIsLoading(true);
  if (isCoin2) {
    setCrypto2(event.target.value);
    const data = await getCoinData(event.target.value);
    coinObject(setCrypto2Data, data);
    const prices1 = await getCoinPrices(crypto1, days, priceType);
    const prices2 = await getCoinPrices(crypto2, days, priceType);
    if (prices1.length > 0 && prices2.length > 0) {
      setIsLoading(false);
  }
  } else {
    setCrypto1(event.target.value);
    const data = await getCoinData(event.target.value);
    coinObject(setCrypto1Data, data);
  }
};

  const handlePriceTypeChange = async (e) => {
    const newPriceType = e.target.value;
    setIsLoading(true);
    setPriceType(newPriceType);
    const prices1 = await getPrices(crypto1, days, newPriceType);
    const prices2 = await getPrices(crypto2, days, newPriceType);
    settingChartData(setChartData, prices1, prices2);
    setIsLoading(false);
  };

  return (
    <div><Header />
    {isLoading ? (
      <Loader />
    ) : (
      <>
        <div className="coin-days-flex">
          <SelectCoins 
          crypto1={crypto1} 
          handleCoinChange={handleCoinChange}
          crypto2={crypto2} 
          />
          <SelectDays 
          days={days} 
          handleDaysChange={handleDaysChange}
          noPTag={true}
          />
        </div>
        <div className="grey-wrapper">
            <List coin={crypto1Data} delay={0.5} />
        </div>
        <div className="grey-wrapper">
            <List coin={crypto2Data} delay={0.5} />
        </div>
        <div className="grey-wrapper">
        <ToggleComponents
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart chartData={chartData} priceType={priceType} multiAxis={true}/>
          </div>
        <Info heading={crypto1Data.name} desc={crypto1Data.desc} />
        <Info heading={crypto2Data.name} desc={crypto2Data.desc} />
        </>
    )}
    </div>
  )
}

  
export default ComparePage;