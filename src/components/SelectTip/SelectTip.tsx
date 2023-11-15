import { useDispatch, useSelector } from 'react-redux';

import { SET_BILL_AMOUNT, SET_TIP_PERCENTAGE, SET_NUMBER_OF_PEOPLE, SET_PERSONAL_TIP, SET_PERSONAL_AMOUNT, AppState } from '../store/tipCount/tipCount-actions';

import css from './SelectTip.module.css';

const SelectTip = () => {
    const dispatch = useDispatch();
    const { billAmount, tipPercentage, numberOfPeople } = useSelector((state: AppState) => state);

    const handleBillAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = parseFloat(event.target.value);
        dispatch({ type: SET_BILL_AMOUNT, payload: isNaN(amount) ? 0 : amount });
    };

    const handleTipPercentageChange = (percentage: number) => {
        dispatch({ type: SET_TIP_PERCENTAGE, payload: percentage });
    };

    const handleNumberOfPeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(event.target.value, 10);
        dispatch({ type: SET_NUMBER_OF_PEOPLE, payload: isNaN(count) ? 0 : count });
    };
    const calculatePersonalBill = (billAmount: number, tipPercentage?: number, numberOfPeople?: number) => {
        if (billAmount <= 0) return;
        if (tipPercentage && numberOfPeople > 1) {
            const totalPersonalTip = billAmount / numberOfPeople * tipPercentage / 100;
            const totalPersonalAmount = billAmount / numberOfPeople * (1 + tipPercentage / 100);
            dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
            dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })
        }


    }

    console.log(billAmount)
    return (
        <div className={css.actionContainer}>
            <label className={css.inputPlaceTitle}>
                Bill
                <input
                    type="number"
                    name="sum"
                    placeholder="0.00"
                    className={css.inputPlace}
                    value={billAmount}
                    onChange={handleBillAmountChange}
                    onBlur={calculatePersonalBill}
                />
                <p className={css.dollar}>$</p>
            </label>

            <p className={css.title}>Select Tip %</p>
            <ul className={css.btnList}>
                {/* Add click handlers for percentage buttons */}
                {['5', '10', '15', '25', '50'].map((item: string) => (
                    <li className={css.btn} key={item} onClick={() => handleTipPercentageChange(parseInt(item, 10))}>
                        {item}%
                    </li>
                ))}
                <li className={css.customInputArea}>
                    <input type="number" className={css.customInput} placeholder="Custom" value={tipPercentage} />
                </li>
            </ul>

            <label className={css.countPeopleTitle}>
                Number of People
                <input
                    type="number"
                    name="count"
                    placeholder="1"
                    className={css.countPeopleInput}
                    value={numberOfPeople}
                    onChange={handleNumberOfPeopleChange}
                />
            </label>
        </div>
    );
};

export default SelectTip;
