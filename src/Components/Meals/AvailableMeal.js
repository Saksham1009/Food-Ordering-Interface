import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import styles from './AvailableMeal.module.css';
import MealItem from './MealItems/MealItem';
const AvailableMeal =()=>{
  const [meals,setmeals] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [Httperror, setHttperror] = useState('');
  useEffect(()=>{
    const fetchdata = async() => {
    setisloading(true);
    const response = await fetch("https://foodapp-a4954-default-rtdb.firebaseio.com/meals.json");
    const data = await response.json();
    
    if(!response.ok){
      throw new Error('Failed to Fetch...');
    }

    const loadedmeals = []
  
    for(const key in data){
      loadedmeals.push({
        id: key,
        name: data[key].name,
        desc:data[key].desc,
        price:data[key].price
      })
    }
    setmeals(loadedmeals);
    setisloading(false);
  }
  fetchdata().catch(error=>{
    setHttperror(error.message);
    setisloading(false);
  })
  },[]);
  if(isloading){
    return(
      <section className={styles.mealloading}>
        <h3>Loading...</h3>
      </section>
    );
  }
  if(Httperror){
    return(
      <section className={styles.error}>
        <h4>{Httperror}</h4>
      </section>
    );
  }
    const mealslist = meals.map(meal => <MealItem id={meal.id} key={meal.id} price={meal.price} dsc={meal.description} name={meal.name}/>);
    return(<section className={styles.meals}>
        <Card>
            <ul>
                {mealslist}
            </ul>
        </Card>
    </section>)
};

export default AvailableMeal;