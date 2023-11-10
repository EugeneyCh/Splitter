import css from './InputPlace.module.css'

const InputPlace = () => {
    return (
        <label className={css.inputPlaceTitle}>Bill
            <input type='number' name='sum' placeholder='0.00' className={css.inputPlace}></input>
        <p className={css.dollar}>$</p>
        </label>
    )
}

export default InputPlace