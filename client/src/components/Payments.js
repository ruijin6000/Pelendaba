import React , {Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect }  from    'react-redux';
import * as actions from '../actions';


class Payments extends Component {
    render () {

        return (
           <StripeCheckout
               name ="Payment"
               description = "$5 for 5 email credits "
               amount= {500}  // 5 dollar in US currency
               token={ token => {this.props.handleToken (token) ;
                                 console.log(token)}  }  //console.log(token)
               stripeKey = {process.env.REACT_APP_STRIPE_KEY}
           >
               <button className="btn">
                   ADD CREDITS
               </button>
           </StripeCheckout>
        );
    }
}

export default  connect(null,actions) (Payments);