
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SET_BILL_AMOUNT, SET_TIP_PERCENTAGE, SET_TIP_PERCENTAGE_CUSTOM, SET_NUMBER_OF_PEOPLE, SET_PERSONAL_TIP, SET_PERSONAL_AMOUNT, tipCount, SET_TOTAL_TIPS, SET_TOTAL_BILL } from '../store/tipCount/tipCount-actions';

import css from './SelectTip.module.css';

const SelectTip = () => {
    const dispatch = useDispatch();
    const { tipPercentage, tipPercentageCustom, numberOfPeople } = useSelector((state: tipCount) => state.tipCount);
    const [billAmountString, setBillAmountString] = useState('0')
    // const billAmount: number = parseFloat(parseFloat(billAmountString).toFixed(2));
    const billAmount: number = billAmountString !== '' ? parseFloat(billAmountString) : 0;
    console.log('billAmountString -', billAmountString);
    console.log('billAmount -', billAmount);

    function checkValue(event: React.ChangeEvent<HTMLInputElement>) {
        console.log('HandleDecimal Value=', handleDecimalsOnValue(event.target.value));

        setBillAmountString(handleDecimalsOnValue(event.target.value));
    }

    function handleDecimalsOnValue(value: string): string {
        const regex = /([0-9]*[\\.,]{0,1}[0-9]{0,2})/s;
        const match = value.replace(/,/g, ".").match(regex);
        // const match0 = match[0] === null ? '' : match[0]

        if (match && match[0] !== null) {
            return match[0];
        } else {
            return '';
        }
        // if (match && match[0] !== null) {
        //     if (match[0].includes('.')) { return (parseFloat(match[0])).toFixed(2) } else { return match[0]; }
        // } else {
        //     return '';
        // }

    }


    const amountCheck = (value: string) => {
        const amount: string = handleDecimalsOnValue(value);

        if (amount === "") return -1;
        if (amount[amount.length - 1] === "." || amount[amount.length - 1] === ",") {
            return parseFloat(amount.slice(0, -1))
        }
        else {
            // console.log(typeof parseFloat(parseFloat(amount).toFixed(2)));

            return parseFloat(amount);
        }
    }

    const handleBillAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const amount: number = amountCheck(event.target.value)

        dispatch({ type: SET_BILL_AMOUNT, payload: (amount < 0) ? 0 : billAmountString });
        calculatePersonalBill(amount, tipPercentage, tipPercentageCustom, numberOfPeople)
    };

    // const resetBillAmont=()=>{setBillAmountString('0')}

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
        // if (billAmount < 0) return;
        if (billAmount === 0 || billAmount === -1) {
            dispatch({ type: SET_PERSONAL_TIP, payload: 0 })
            dispatch({ type: SET_PERSONAL_AMOUNT, payload: 0 })
            dispatch({ type: SET_TOTAL_TIPS, payload: 0 })
            dispatch({ type: SET_TOTAL_BILL, payload: 0 })

        } else
            if ((tipPercentage > 0 || tipCustom > 0) && numberOfPeople === 0) {
                const selectedTipPercentage = tipPercentage > 0 ? tipPercentage : tipCustom;

                const totalPersonalTip = (billAmount * selectedTipPercentage / 100).toFixed(2);
                const totalPersonalAmount = (billAmount * (1 + selectedTipPercentage / 100)).toFixed(2);
                const totalTips = (billAmount * selectedTipPercentage / 100).toFixed(2);
                const totalBill = (billAmount * (1 + selectedTipPercentage / 100)).toFixed(2);

                dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
                dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })
                dispatch({ type: SET_TOTAL_TIPS, payload: totalTips })
                dispatch({ type: SET_TOTAL_BILL, payload: totalBill })

            } else
                if ((tipPercentage > 0 || tipCustom > 0) && (numberOfPeople > 0 || Number.isNaN(numberOfPeople))) {
                    const selectedTipPercentage = tipPercentage > 0 ? tipPercentage : tipCustom;
                    const selectedNumberOfPeople = (numberOfPeople > 0 || !Number.isNaN(numberOfPeople)) ? numberOfPeople : 1;
                    console.log(selectedNumberOfPeople);

                    const totalPersonalTip = (billAmount / selectedNumberOfPeople * selectedTipPercentage / 100).toFixed(2);
                    const totalPersonalAmount = (billAmount / selectedNumberOfPeople * (1 + selectedTipPercentage / 100)).toFixed(2);
                    const totalTips = (billAmount * selectedTipPercentage / 100).toFixed(2);
                    const totalBill = (billAmount * (1 + selectedTipPercentage / 100)).toFixed(2);

                    dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
                    dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })
                    dispatch({ type: SET_TOTAL_TIPS, payload: totalTips })
                    dispatch({ type: SET_TOTAL_BILL, payload: totalBill })

                } else
                    if (tipPercentage === 0 && tipCustom === 0 && (numberOfPeople === 0 || Number.isNaN(numberOfPeople))) {
                        const totalPersonalTip = 0;
                        // const totalPersonalAmount = billAmount.toFixed(2);
                        const totalPersonalAmount = billAmount.toFixed(2);
                        const totalTips = 0;
                        // const totalBill = (billAmount).toFixed(2);
                        const totalBill = billAmount.toFixed(2);
                        dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
                        dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })
                        dispatch({ type: SET_TOTAL_TIPS, payload: totalTips })
                        dispatch({ type: SET_TOTAL_BILL, payload: totalBill })
                    } else
                        if (tipPercentage === 0 && (tipCustom === 0 || Number.isNaN(tipCustom)) && numberOfPeople > 0) {

                            const totalPersonalTip = 0;
                            const totalPersonalAmount = (billAmount / numberOfPeople).toFixed(2);
                            const totalTips = 0;
                            const totalBill = billAmount.toFixed(2);

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
                    // type="number"
                    // pattern="[\d]+([\.][\d]{2})"
                    name="sum"
                    maxLength={10}
                    placeholder={billAmount === 0 ? "0.00" : ""}
                    className={`${css.inputPlace} ${(billAmount === 0 || isNaN(billAmount)) ? css.errorInput : ''}`}
                    value={billAmount === 0 ? "" : billAmountString}
                    // onChange={handleBillAmountChange}
                    type="text"
                    onChange={checkValue}
                    onBlur={handleBillAmountChange}
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
                        value={(tipPercentageCustom === null || tipPercentageCustom === 0) ? "" : tipPercentageCustom}
                        onChange={handleTipPercentageCustomChange}
                        maxLength={2}
                    />
                    {(tipPercentageCustom !== null && tipPercentageCustom !== 0) && <span className={css.dollarAfter}>%</span>}
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
