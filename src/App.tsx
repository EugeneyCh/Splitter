import css from './App.module.css'
import AmountTips from './components/AmountTips/AmountTips'
import Header from './components/Header/Header'
import SelectTip from './components/SelectTip/SelectTip'


function App() {

  return (
    <>
      <div>
        <Header />
        <div className={css.container}>
          <SelectTip />
          <AmountTips />
        </div>
      </div>
    </>
  )
}

export default App
