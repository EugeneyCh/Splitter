import { useState } from 'react';
import css from './App.module.css'
import AmountTips from './components/AmountTips/AmountTips'
import Header from './components/Header/Header'
import SelectTip from './components/SelectTip/SelectTip'


function App() {
  const [billAmountString, setBillAmountString] = useState<string>('0');

  const handleReset = () => {
    setBillAmountString('0');
  };

  return (
    <>
      <div>
        <Header />
        <div className={css.container}>
          <SelectTip billAmountString={billAmountString} setBillAmountString={setBillAmountString} />
          <AmountTips onReset={handleReset} />
        </div>
      </div>
    </>
  )
}

export default App
