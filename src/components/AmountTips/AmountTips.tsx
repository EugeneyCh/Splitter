import css from './AmountTips.module.css'

const AmountTips = () => {
    return (
        <div className={css.container}>
            <div className={css.tipContainer}>
                <div className={css.amount}>
                    <p className={css.tipAmountTitle}>Tip Amount</p>
                    <p className={css.person}>/ person</p>
                </div>
                <p className={css.amountTip}>$4.27</p>
            </div>

            <div className={css.total}>           
              <div className={css.totalContainer}>
                <div className={css.totalAmount}>
                    <p className={css.totalAmountTitle}>Total</p>
                    <p className={css.person}>/ person</p>
                </div>
                <p className={css.amountTotal}>$32.79</p>
               </div>
            </div>
            <button className={css.btnReset}>RESET</button>
        </div>
    )
}

export default AmountTips