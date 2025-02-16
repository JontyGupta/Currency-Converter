import { InputBox } from "./components"
import useCurrencyInfo from "./hooks/useCurrencyInfo"
import {useState} from 'react'
import background_image from './assets/bg-image.avif'

function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div 
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style = {{backgroundImage :  `url(${background_image})`}}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-grey-60 rounded-lg p-5 blackdrop-blur-sm bg-white/30">
          <form onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}>
            <div className="w-full mb-1">
              <InputBox 
                label='From' 
                amount = {amount} 
                currencyOptions = {options}
                selectCurrency = {from}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountchange={(amount) => {setAmount(amount)}}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type = 'button'
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
              Swap
              </button>
            </div>

            <div className="w-full mb-1">
              <InputBox 
                label='To'
                amount = {convertedAmount} 
                currencyOptions = {options}
                selectCurrency = {to}
                onCurrencyChange={(currency) => setTo(currency)}
                amountDisable = {true}
              />
            </div>

            <div>
              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">{`Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}</button>
            </div>
          
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
