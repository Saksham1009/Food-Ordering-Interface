import { Fragment } from "react";
import AvailableMeal from "./AvailableMeal";
import MealSummary from "./MealSummary";

const Meals = props =>{
    return(
        <Fragment>
            <MealSummary />
            <AvailableMeal />
        </Fragment>
    );
};
export default Meals;