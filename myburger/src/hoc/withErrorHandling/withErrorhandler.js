import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux1';
import { Component } from 'react';

const withErrorHandler = (WrappedComponent, axios)=>{
    return class extends Component{
        state ={
            error: null
        }
        componentDidMount(){
            this.reqInteceptor=axios.interceptors.request.use(req=>{
                this.setState({error: null });
                return req;
            })
            this.resInteceptor=axios.interceptors.response.use(null,error=>{
                this.setState({error:error})
            });
        }
        componentWillUnmount(){
            console.log('Will Unmount', this.reqInteceptor,this.resInteceptor)
            axios.interceptors.request.eject(this.reqInteceptor);
            axios.interceptors.response.eject(this.resInteceptor);

        }
        errorConfirmedHandler=()=>{
            this.setState({error:null})
        }
        render(){
            return(
                <Aux>
                <Modal show={this.state.error} clicked={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message: null}
                </Modal>
                <WrappedComponent {...this.props}/>
            </Aux>

            )
        }

    }
}

export default withErrorHandler;