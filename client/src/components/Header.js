import React , {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import Payments from "./Payments";


class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null :
                return 'Still deciding';
            case false :
                return (<div>
                    <li><a href="/auth/google">Login With Google </a></li>
                    <li><a href="/auth/facebook">Login With FaceBook </a></li>
                    </div>);
            default :
                return [
                    <li key ="1"><Payments /></li>,
                    <li key="3" style = {{margin:'0 10px'}}>
                        Credits:{this.props.auth.credits} </li>,
                    <li key ="2"> <a href="/api/logout">LogOut</a></li>
                    ];
        }
    }

    render(){
       console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? '/surveys' :'/' }
                        className="left brand-logo"
                    >MAXG
                    </Link>
                    <ul className="right">
                       { this.renderContent()}
                    </ul>
                </div>
            </nav>
        );



    }


}

function mapStateToProps(state) {
    return { auth: state.auth};
}

export default connect(mapStateToProps)(Header);