import { useDispatch, useSelector } from 'react-redux';

import { SET_BILL_AMOUNT, SET_TIP_PERCENTAGE, SET_TIP_PERCENTAGE_CUSTOM, SET_NUMBER_OF_PEOPLE, SET_PERSONAL_TIP, SET_PERSONAL_AMOUNT, tipCount } from '../store/tipCount/tipCount-actions';

import css from './SelectTip.module.css';

const SelectTip = () => {
    const dispatch = useDispatch();
    const { billAmount, tipPercentage, tipPercentageCustom, numberOfPeople } = useSelector((state: tipCount) => state.tipCount);
    // const billAmount = useSelector((state: any) => state.tipCount);

    const handleBillAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = parseFloat(event.target.value);
        dispatch({ type: SET_BILL_AMOUNT, payload: isNaN(amount) ? 0 : amount });
        calculatePersonalBill(amount, tipPercentage, tipPercentageCustom, numberOfPeople)
    };

    const handleTipPercentageChange = (percentage: number) => {
        dispatch({ type: SET_TIP_PERCENTAGE, payload: percentage });
        calculatePersonalBill(billAmount, percentage, tipPercentageCustom, numberOfPeople)
    };

    const handleTipPercentageCustomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const percCustom = parseFloat(event.target.value);
        dispatch({ type: SET_TIP_PERCENTAGE_CUSTOM, payload: isNaN(percCustom) ? 0 : percCustom });
        calculatePersonalBill(billAmount, percCustom, tipPercentageCustom, numberOfPeople)
    };

    const handleNumberOfPeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(event.target.value, 10);
        if (count < 0 || isNaN(count)) {
            // Попередження, можна вивести якось інакше
            alert("Number of people must be a positive integer");
            return;
        }
        dispatch({ type: SET_NUMBER_OF_PEOPLE, payload: isNaN(count) ? 0 : count });
        calculatePersonalBill(billAmount, tipPercentage, tipPercentageCustom, count)

    };

    const calculatePersonalBill = (billAmount: number, tipPercentage: number, tipPercentageCustom: number, numberOfPeople: number) => {
        if (billAmount <= 0) return;
        if ((tipPercentage > 0 || tipPercentageCustom > 0) && numberOfPeople >= 1) {
            const selectedTipPercentage = tipPercentage > 0 ? tipPercentage : tipPercentageCustom;
            const totalPersonalTip = (billAmount / numberOfPeople * selectedTipPercentage / 100).toFixed(2);
            const totalPersonalAmount = (billAmount / numberOfPeople * (1 + selectedTipPercentage / 100)).toFixed(2);
            dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
            dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })
        } else if (tipPercentage === 0 && tipPercentageCustom === 0 && numberOfPeople > 0) {
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
                    placeholder={billAmount === 0 ? "0.00" : ""}
                    className={css.inputPlace}
                    value={billAmount === 0 ? "" : billAmount}
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
                    <input type="number"
                        className={css.customInput}
                        placeholder={tipPercentageCustom === 0 ? "Custom" : "0"}
                        value={tipPercentageCustom === 0 ? "" : tipPercentageCustom}
                        onChange={handleTipPercentageCustomChange}

                    />
                </li>
            </ul>

            <label className={css.countPeopleTitle}>
                Number of People
                <input
                    type="number"
                    name="count"
                    placeholder={numberOfPeople <= 0 ? "Enter a valid number" : ""}
                    className={css.countPeopleInput}
                    value={numberOfPeople <= 0 ? "" : numberOfPeople.toString()}
                    onChange={handleNumberOfPeopleChange}
                />
            </label>
        </div>
    );
};

export default SelectTip;
