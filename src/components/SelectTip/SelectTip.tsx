import { useDispatch, useSelector } from 'react-redux';

import { SET_BILL_AMOUNT, SET_TIP_PERCENTAGE, SET_NUMBER_OF_PEOPLE, SET_PERSONAL_TIP, SET_PERSONAL_AMOUNT, tipCount } from '../store/tipCount/tipCount-actions';

import css from './SelectTip.module.css';

const SelectTip = () => {
    const dispatch = useDispatch();
    const { billAmount, tipPercentage, numberOfPeople } = useSelector((state: tipCount) => state.tipCount);
    // const billAmount = useSelector((state: any) => state.tipCount);

    const handleBillAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = parseFloat(event.target.value);
        dispatch({ type: SET_BILL_AMOUNT, payload: isNaN(amount) ? 0 : amount });
        calculatePersonalBill(amount, tipPercentage, numberOfPeople)
    };

    const handleTipPercentageChange = (percentage: number) => {
        dispatch({ type: SET_TIP_PERCENTAGE, payload: percentage });
        calculatePersonalBill(billAmount, percentage, numberOfPeople)

    };

    const handleNumberOfPeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(event.target.value, 10);
        dispatch({ type: SET_NUMBER_OF_PEOPLE, payload: isNaN(count) ? 0 : count });
        calculatePersonalBill(billAmount, tipPercentage, count)

    };

    const calculatePersonalBill = (billAmount: number, tipPercentage: number, numberOfPeople: number) => {
        if (billAmount <= 0) return;
        if (tipPercentage > 0 && numberOfPeople >= 1) {
            const totalPersonalTip = (billAmount / numberOfPeople * tipPercentage / 100).toFixed(2);
            const totalPersonalAmount = (billAmount / numberOfPeople * (1 + tipPercentage / 100)).toFixed(2);
            dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
            dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })
        } else if (tipPercentage === 0 && numberOfPeople === 1) {
            const totalPersonalTip = 0;
            const totalPersonalAmount = (billAmount / numberOfPeople).toFixed(2);
            dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
            dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })

        }


    }

    // console.log(billAmount)
    return (
        <div className={css.actionContainer}>
            <label className={css.inputPlaceTitle}>
                Bill
                <input
                    type="number"
                    name="sum"
                    placeholder={billAmount > 0 ? billAmount.toString() : "0.00"}
                    className={css.inputPlace}
                    // value={billAmount}
                    onChange={handleBillAmountChange}
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
                    placeholder={numberOfPeople > 1 ? numberOfPeople.toString() : "1"}
                    className={css.countPeopleInput}
                    // value={numberOfPeople}
                    onChange={handleNumberOfPeopleChange}
                />
            </label>
        </div>
    );
};

export default SelectTip;
