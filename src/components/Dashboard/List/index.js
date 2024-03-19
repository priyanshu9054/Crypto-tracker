import "./styles.css";
import React, {useState} from 'react';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from "@mui/material";
import { convertNumbers } from "../../../functions/convertNumbers";
import { Link } from "react-router-dom";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";


function List({coin}) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));
  return (
    <Link to={`/coin/${coin.id}`}>
    <tr className="list-row">
        <Tooltip title="Coin Logo">
        <td className='td-image'>
            <img src={coin.image} className="coin-logo" />
            </td>
            </Tooltip>
            <Tooltip title="Coin Info" placement="bottom-start">
            <td>
            <div className='name-col'>
                <p className="coin-symbol">{coin.symbol}</p>
                <p className='coin-name'>{coin.name}</p>
            </div>
          </td>
          </Tooltip>
          <Tooltip title="Price Change in 24Hrs" placement="bottom-start">
          {coin.price_change_percentage_24h > 0 ? (
            <td className='chip-flex-ls'>
                <div className='price-chip-ls'>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='icon-chip td-icon'> 
                  <TrendingUpRoundedIcon />
                </div>
          </td>
          ) : (
            
            <td className='chip-flex-ls'>
                <div className='price-chip-ls chip-red'>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='icon-chip chip-red td-icon'>
                  <TrendingDownRoundedIcon />
                </div>
            </td>
          )}
        </Tooltip>
        <Tooltip title="Current Price">
          <td>
          <h3 className='coin-price td-center-align' 
          style={{
              color:
              coin.price_change_percentage_24h < 0
              ? "var(--red)"
              : "var(--green)",
              }}
            >
              ${coin.current_price.toLocaleString()}
            </h3>
          </td>  
          </Tooltip>
          <Tooltip title="Total Volume" placement="bottom-end">
          <td>
            <p className='total_volume td-right-align td-total-volume'>
              {coin.total_volume.toLocaleString()}
            </p>
          </td>
          </Tooltip>
          <Tooltip title="Market Cap">
          <td className="desktop-td-mkt">
            <p className='total_volume td-right-align' placement="bottom-end">
              {coin.market_cap.toLocaleString()}
            </p>
          </td>
          </Tooltip>
          <Tooltip title="Market Cap">
          <td className='mobile-td-mkt'>
            <p className='total_volume td-right-align' placement="bottom-end">
              ${convertNumbers(coin.market_cap)}
            </p>
          </td>
          </Tooltip>
          <td
          className={`watchlist-icon ${
            coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
          }`}
          onClick={(e) => {
            if (isCoinAdded) {
              // remove coin
              removeItemToWatchlist(e, coin.id, setIsCoinAdded);
            } else {
              setIsCoinAdded(true);
              saveItemToWatchlist(e, coin.id);
            }
          }}
        >
          {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
        </td>
    </tr>
    </Link>
  )
}

export default List