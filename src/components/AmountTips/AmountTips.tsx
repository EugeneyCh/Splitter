import { useDispatch, useSelector } from 'react-redux';
import { RESET_ALL, tipCount } from '../store/tipCount/tipCount-actions';

import css from './AmountTips.module.css';



const AmountTips = () => {
    const dispatch = useDispatch();

    const { amountTip, amountTotal, totalTips, totalBill } = useSelector((state: tipCount) => state.tipCount);

    const handleResetAction = () => { dispatch({ type: RESET_ALL }); }


    return (
        <div className={css.container}>
            <div className={css.tipContainer}>
                <div className={css.amount}>
                    <p className={css.tipAmountTitle}>Tip Amount<span className={css.person}> /person</span></p>
                    {/* <p className={css.person}>/ person</p> */}
                </div>
                <p className={css.amountTip}>{isNaN(amountTip) ? '0' : amountTip}</p>
            </div>

            <div className={css.total}>
                <div className={css.totalContainer}>
                    <div className={css.totalAmount}>
                        <p className={css.totalAmountTitle}>Total<span className={css.person}> /person</span></p>
                        {/* <p className={css.person}>/ person</p> */}
                    </div>
                    <p className={css.amountTotal}>{isNaN(amountTotal) ? '0' : amountTotal}</p>
                </div>
            </div>
            <div className={css.total}>
                <div className={css.totalContainer}>
                    <div className={css.totalAmount}>
                        <p className={css.totalAmountTitle}>Total Tips</p>
                    </div>
                    <p className={css.amountTotal}>{isNaN(totalTips) ? '0' : totalTips}</p>
                </div>
            </div>
            <div className={css.total}>
                <div className={css.totalContainer}>
                    <div className={css.totalAmount}>
                        <p className={css.totalAmountTitle}>Total Bill</p>
                    </div>
                    <p className={css.amountTotal}>{isNaN(totalBill) ? '0' : totalBill}</p>
                </div>
            </div>
            <button className={css.btnReset} onClick={handleResetAction}>RESET</button>
        </div>
    )
}

export default AmountTips