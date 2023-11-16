import { useDispatch, useSelector } from 'react-redux';
import { RESET_ALL, tipCount } from '../store/tipCount/tipCount-actions';

import css from './AmountTips.module.css';



const AmountTips = () => {
    const dispatch = useDispatch();

    const { amountTip, amountTotal } = useSelector((state: tipCount) => state.tipCount);

    const handleResetAction = () => { dispatch({ type: RESET_ALL }); }


    return (
        <div className={css.container}>
            <div className={css.tipContainer}>
                <div className={css.amount}>
                    <p className={css.tipAmountTitle}>Tip Amount</p>
                    <p className={css.person}>/ person</p>
                </div>
                <p className={css.amountTip}>{amountTip}</p>
            </div>

            <div className={css.total}>
                <div className={css.totalContainer}>
                    <div className={css.totalAmount}>
                        <p className={css.totalAmountTitle}>Total</p>
                        <p className={css.person}>/ person</p>
                    </div>
                    <p className={css.amountTotal}>{amountTotal}</p>
                </div>
            </div>
            <button className={css.btnReset} onClick={handleResetAction}>RESET</button>
        </div>
    )
}

export default AmountTips