import css from './SelectTip.module.css'

const SelectTip = () => {
    const btnlist = ['5', '10', '15', '25', '50', 'Custom']
    return (
        <>
            <p className={css.title}>Select Tip %</p>
            <ul className={css.btnList}>
                {btnlist.map((item) => {
                    return (<li className={css.btn} key={item}>{item}%</li>)
                })}
            </ul>
        </>
    )
}

export default SelectTip