import css from './SelectTip.module.css'

const SelectTip = () => {
    const btnlist = ['5%', '10%', '15%', '25%', '50%', 'Custom']
    return (
        <div className={css.actionContainer}>
            <label className={css.inputPlaceTitle}>Bill
                <input type='number' name='sum' placeholder='0.00' className={css.inputPlace}></input>
                <p className={css.dollar}>$</p>
            </label>

            <p className={css.title}>Select Tip %</p>
            <ul className={css.btnList}>
                {btnlist.map((item) => {
                    return (<li className={css.btn} key={item}>{item}</li>)
                })}
            </ul>
            {/* <p className={css.countPeopleTitle}>Number of People</p> */}
            <label className={css.countPeople}>Number of People
                <input type='number' name='count' placeholder='0' className={css.countPeopleInput}></input>
            </label>
        </div >
    )
}

export default SelectTip