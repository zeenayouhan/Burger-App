import React, { Component } from "react";
import Aux from "../../hoc/Aux1";
import Burger from "../../components/Burger/Burger";
import Buildcontrols from "../../components/Burger/BuildControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandling/withErrorhandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading:false
  };
  componentDidMount(){
    axios.get('https://react-my-buger-519b7.firebaseio.com/ingredients.json')
    .then(response=>{
      this.setState({ingredients:response.data});

    }); 
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  }

  addIngredienthandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAdddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAdddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAdddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };
  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };
  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };
  purchaseContinueHandler = () => {
    this.setState({loading: true});
    const order={
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer:{
        name: 'Zeena Youhan',
        address:{
          street:'Keppetipola Road',
          zipCode: '90000',
          country:'Sri Lanka'
        },
        email: 'zinayouhan33@gmail.com'
      },
      deliveryMethod:'fastest'
    }
    axios.post('/orders.json',order)
    .then(response=>{this.setState({loading:false, purchasing:false})} )
    .catch(error=>{this.setState({loading:false,purchasing:false})});

    //alert("You Continue !!");
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    } 
    let orderSummary=null;
  
  let burger=<Spinner/>
  if(this.state.ingredients){

 burger= (
    <Aux>
  <Burger ingredients={this.state.ingredients} />
  <Buildcontrols
    ingredientAdded={this.addIngredienthandler}
    ingredientRemoved={this.removeIngredientHandler}
    disabled={disabledInfo}
    totalPrice={this.state.totalPrice}
    purchasable={this.state.purchaseable}
    ordered={this.purchaseHandler}
  />
  </Aux>);
  orderSummary=<OrderSummary
  price={this.state.totalPrice}
  ingredientuu={this.state.ingredients}
  purchasedContinue={this.purchaseContinueHandler}
  purchasedCancelled={this.purchaseCancelHandler}
/>;
  }
  if(this.state.loading){
    orderSummary=<Spinner/>;
  }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
          
        </Modal>
        {burger}
       
      </Aux>
    );
    
  }
  
}

export default withErrorHandler(BurgerBuilder,axios);
