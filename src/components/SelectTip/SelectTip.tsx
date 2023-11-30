
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SET_BILL_AMOUNT, SET_TIP_PERCENTAGE, SET_TIP_PERCENTAGE_CUSTOM, SET_NUMBER_OF_PEOPLE, SET_PERSONAL_TIP, SET_PERSONAL_AMOUNT, tipCount, SET_TOTAL_TIPS, SET_TOTAL_BILL } from '../store/tipCount/tipCount-actions';

import css from './SelectTip.module.css';

const SelectTip = () => {
    const dispatch = useDispatch();
    const { billAmount, tipPercentage, tipPercentageCustom, numberOfPeople } = useSelector((state: tipCount) => state.tipCount);

    // const ValidateDecimal = (e: string) => {
    //     const beforeDecimal = 2;
    //     const afterDecimal = 2;

    //     $('#' + e.id).on('input', function () {
    //         this.value = this.value
    //             .replace(/[^\d.]/g, '')
    //             .replace(new RegExp("(^[\\d]{" + beforeDecimal + "})[\\d]", "g"), '$1')
    //             .replace(/(..*)\./g, '$1')
    //             .replace(new RegExp("(\\.[\\d]{" + afterDecimal + "}).", "g"), '$1');
    //     })
    // }

    // const validateDecimal = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const beforeDecimal = 2;
    //     const afterDecimal = 2;

    //     e.target.value = e.target.value
    //         .replace(/[^\d.]/g, '')
    //         .replace(new RegExp("(^[\\d]{" + beforeDecimal + "})[\\d]", "g"), '$1')
    //         .replace(/(..*)\./g, '$1')
    //         .replace(new RegExp("(\\.[\\d]{" + afterDecimal + "}).", "g"), '$1');
    // };

    // function roundNumberTo2Decimal(n: string) {
    //     return +(Math.round(n + "e+2") + "e-2");
    // }

    // function roundNumberTo2Decimal(n: string): number {
    //     // Перетворення рядка у число за допомогою parseFloat
    //     const numberValue = parseFloat(n);

    //     // Перевірка, чи конвертація була успішною
    //     if (!isNaN(numberValue)) {
    //         return +(Math.round(numberValue+ "e+2") + "e-2");
    //     } else {
    //         // Обробка випадку, коли конвертація не вдалася
    //         console.error("Invalid number format");
    //         return 0; // або інше значення за вашим вибором
    //     }
    // }

    const handleBillAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = parseFloat(event.target.value);
        dispatch({ type: SET_BILL_AMOUNT, payload: (isNaN(amount) || amount < 0) ? 0 : amount });
        calculatePersonalBill(amount, tipPercentage, tipPercentageCustom, numberOfPeople)
    };

    const handleTipPercentageChange = (percentage: number) => {
        dispatch({ type: SET_TIP_PERCENTAGE, payload: percentage });
        calculatePersonalBill(billAmount, percentage, tipPercentageCustom, numberOfPeople)
    };

    const handleTipPercentageCustomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const percCustom = parseFloat((event.target.value).replace(/[^0-9]/g, ''));
        dispatch({ type: SET_TIP_PERCENTAGE_CUSTOM, payload: isNaN(percCustom) ? null : percCustom });
        calculatePersonalBill(billAmount, percCustom, tipPercentageCustom, numberOfPeople)
    };

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
            const selectedNumberOfPeople = numberOfPeople > 0 ? numberOfPeople : 1;
            const totalPersonalTip = (billAmount / selectedNumberOfPeople * selectedTipPercentage / 100).toFixed(2);
            const totalPersonalAmount = (billAmount / selectedNumberOfPeople * (1 + selectedTipPercentage / 100)).toFixed(2);
            const totalTips = (billAmount * selectedTipPercentage / 100).toFixed(2);
            const totalBill = (billAmount * (1 + selectedTipPercentage / 100)).toFixed(2);

            dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
            dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })
            dispatch({ type: SET_TOTAL_TIPS, payload: totalTips })
            dispatch({ type: SET_TOTAL_BILL, payload: totalBill })

        } else if (tipPercentage === 0 && tipCustom === 0 && numberOfPeople === 0) {
            const totalPersonalTip = 0;
            const totalPersonalAmount = billAmount.toFixed(2);
            const totalTips = 0;
            const totalBill = (billAmount).toFixed(2);
            dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
            dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })
            dispatch({ type: SET_TOTAL_TIPS, payload: totalTips })
            dispatch({ type: SET_TOTAL_BILL, payload: totalBill })
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
                    <li className={`${css.btn} ${tipPercentage === parseInt(item, 10) ? css.selected : ''}`} key={item} onClick={() => handleTipPercentageChange(parseInt(item, 10))}>
                        {item}%
                    </li>
                ))}
                <li className={css.customInputArea}>
                    <input type="text"
                        className={`${css.customInput} ${tipPercentageCustom !== 0 ? css.customInputselected : ''}`}
                        placeholder={tipPercentageCustom === null ? "Custom" : ""}
                        value={tipPercentageCustom === null ? "" : tipPercentageCustom}
                        onChange={handleTipPercentageCustomChange}
                        maxLength={2}
                    />
                    {tipPercentageCustom !== null && <span className={css.dollarAfter}>%</span>}
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
