import React from "react";
import mealsimage from '../../Assets/meals.jpeg';
import styles from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
    return <React.Fragment>
        <header className={styles.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton opencart={props.opencart}/>
        </header>
        <div className={styles['main-image']}>
            <img src={mealsimage} alt="A table full of tasty food!"/>
        </div>
    </React.Fragment>
};
export default Header;