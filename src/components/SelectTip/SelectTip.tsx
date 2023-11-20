
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SET_BILL_AMOUNT, SET_TIP_PERCENTAGE, SET_TIP_PERCENTAGE_CUSTOM, SET_NUMBER_OF_PEOPLE, SET_PERSONAL_TIP, SET_PERSONAL_AMOUNT, tipCount } from '../store/tipCount/tipCount-actions';

import css from './SelectTip.module.css';

const SelectTip = () => {
    const dispatch = useDispatch();
    const { billAmount, tipPercentage, tipPercentageCustom, numberOfPeople } = useSelector((state: tipCount) => state.tipCount);

    const [selectedPercentage, setSelectedPercentage] = useState<number | null>(null);

    const handleBillAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const amount = parseFloat(event.target.value);
        const amount = parseFloat((event.target.value).replace(/[^0-9.,]+/g, match => match === '.' ? '.' : ''));
        dispatch({ type: SET_BILL_AMOUNT, payload: (isNaN(amount) || amount < 0) ? 0 : amount });
        calculatePersonalBill(amount, tipPercentage, tipPercentageCustom, numberOfPeople)
    };

    const handleTipPercentageChange = (percentage: number) => {
        dispatch({ type: SET_TIP_PERCENTAGE, payload: percentage });
        setSelectedPercentage(percentage);
        calculatePersonalBill(billAmount, percentage, tipPercentageCustom, numberOfPeople)
    };

    const handleTipPercentageCustomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const percCustom = parseFloat((event.target.value).replace(/[^0-9.]/g, ''));
        dispatch({ type: SET_TIP_PERCENTAGE_CUSTOM, payload: isNaN(percCustom) ? null : percCustom });
        setSelectedPercentage(null);
        calculatePersonalBill(billAmount, percCustom, tipPercentageCustom, numberOfPeople)
    };
    // const handleTipPercentageCustomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const percCustom = parseFloat(event.target.value);
    //     dispatch({ type: SET_TIP_PERCENTAGE_CUSTOM, payload: isNaN(percCustom) ? 0 : percCustom });
    //     setSelectedPercentage(null);
    //     calculatePersonalBill(billAmount, percCustom, tipPercentageCustom, numberOfPeople)
    // };

    const handleNumberOfPeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt((event.target.value).replace(/[^0-9]/g, ''), 10);
        // if (count < 0 || isNaN(count)) {
        //     alert("Number of people must be a positive integer");
        //     return;
        // }
        dispatch({ type: SET_NUMBER_OF_PEOPLE, payload: isNaN(count) ? 0 : count });
        calculatePersonalBill(billAmount, tipPercentage, tipPercentageCustom, count)

    };

    const calculatePersonalBill = (billAmount: number, tipPercentage: number, tipPercentageCustom: number | null, numberOfPeople: number) => {
        const tipCustom: number = (tipPercentageCustom === null || tipPercentageCustom === 0) ? 0 : tipPercentageCustom;
        if (billAmount <= 0) return;
        if (tipPercentage > 0 || tipCustom > 0) {
            const selectedTipPercentage = tipPercentage > 0 ? tipPercentage : tipCustom;
            const selectedNamberOfPeople = numberOfPeople > 0 ? numberOfPeople : 1;
            const totalPersonalTip = (billAmount / selectedNamberOfPeople * selectedTipPercentage / 100).toFixed(2);
            const totalPersonalAmount = (billAmount / selectedNamberOfPeople * (1 + selectedTipPercentage / 100)).toFixed(2);
            dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
            dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })
        } else if (tipPercentage === 0 && tipCustom === 0 && numberOfPeople === 0) {
            const totalPersonalTip = 0;
            const totalPersonalAmount = billAmount.toFixed(2);
            dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
            dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })
        }


    }

    return (
        <div className={css.actionContainer}>
            <label className={css.inputPlaceTitle}>
                Bill
                <input
                    type="number"
                    name="sum"
                    maxLength={10}
                    placeholder={billAmount === 0 ? "0.00" : ""}
                    className={`${css.inputPlace} ${(billAmount === 0 || isNaN(billAmount)) ? css.errorInput : ''}`}
                    value={billAmount === 0 ? "" : billAmount}
                    onChange={handleBillAmountChange}
                />
                <p className={css.dollar}>$</p>
            </label>

            <p className={css.title}>Select Tip %</p>
            <ul className={css.btnList}>
                {['5', '10', '15', '25', '50'].map((item: string) => (
                    <li className={`${css.btn} ${selectedPercentage === parseInt(item, 10) ? css.selected : ''}`} key={item} onClick={() => handleTipPercentageChange(parseInt(item, 10))}>
                        {item}%
                    </li>
                ))}
                <li className={css.customInputArea}>
                    <input type="text"
                        className={`${css.customInput} ${tipPercentageCustom !== 0 ? css.customInputselected : ''}`}
                        placeholder={tipPercentageCustom === null ? "Custom" : "0"}
                        value={tipPercentageCustom === null ? "" : tipPercentageCustom}
                        onChange={handleTipPercentageCustomChange}

                    />
                    {/* <input type="number"
                        className={`${css.customInput} ${tipPercentageCustom !== 0 ? css.customInputselected : ''}`}
                        placeholder={tipPercentageCustom === 0 ? "Custom" : "0"}
                        value={tipPercentageCustom === 0 ? "" : tipPercentageCustom}
                        onChange={handleTipPercentageCustomChange}

                    /> */}
                </li>
            </ul>

            <label className={css.countPeopleTitle}>
                Number of People
                <input
                    type="text"
                    name="count"
                    placeholder={numberOfPeople <= 0 ? "Enter a valid number" : ""}
                    className={`${css.countPeopleInput} ${numberOfPeople === 0 ? css.errorInput : ''}`}
                    value={numberOfPeople <= 0 ? "" : numberOfPeople.toString()}
                    onChange={handleNumberOfPeopleChange}
                />
            </label>
        </div>
    );
};

export default SelectTip;
