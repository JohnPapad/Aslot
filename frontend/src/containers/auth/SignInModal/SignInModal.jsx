import React from 'react';
import produce from 'immer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../../services/axiosConfig';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import classes from './SignInModal.module.scss';
import { Card, CardHeader, CardBody, Container, Row, Col, Form, Alert, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import MyInput from '../../../components/UI/MyInput/MyInput';
// import Header from '../../components/UI/Header/Header';
import MyBtn from '../../../components/UI/MyBtn/MyBtn';
import { checkValidity } from '../../../utilities/validityUtility';
import { authAPI } from '../../../services/authApi';
import { userActions } from '../../../stores/userStore';

    
class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //modalIsOpen: true,
            formControls: {
                email: {
                    rules: {
                        required: true
                    },
                    id: "login_email",
                    name: "Email",
                    value: '',
                    type: "text",
                    placeholder: "",
                    feedback: null,
                    validity: ''
                },

                password: {
                    rules: {
                        required: true
                    },
                    id: "login_pwd",
                    name: "Password",
                    value: '',
                    type: "password",
                    placeholder: '',
                    feedback: null,
                    validity: ''
                }
			},
			alert:{
				visible: false,
				message: ''
			}
        };
    }
    
    onDismiss = () => {
		this.setState(
			produce( draft => {
				draft.alert.visible = false;
			})
		)
    }
    
    setFormField = (controlName, feedback, validity, value) => {
        this.setState(
            produce(draft => {
                draft.formControls[controlName].feedback = feedback;
                draft.formControls[controlName].validity = validity;
                if (value)
                {
                    draft.formControls[controlName].value = value;
                }
            })
        );
    }

    setFormWithError = () => {
        this.setState(
            produce(draft => {
                draft.formControls.password.value = '';
                draft.formControls.password.feedback = null;
                draft.formControls.password.validity = "is-invalid";
          
                draft.formControls.email.value = '';
                draft.formControls.email.feedback = null;
                draft.formControls.email.validity = "is-invalid";
            })
        );
    }


    inputChangedHandler = ( event, controlName ) => {

        const value = event.target.value;
        this.setState( 
            produce(draft => { 
                draft.formControls[controlName].value = value; 
            }) 
        ); 

        const res = checkValidity(value, this.state.formControls[controlName].rules);
        if (res.report)
        {
            //console.log("ola eginan ok");
            this.setFormField(controlName, null, '', null);
        }
        else
        {
            this.setFormField(controlName, res.msg, "is-invalid", null);
        }       
    }
    
    submitHandler = ( event ) => {
        event.preventDefault();

        let formData = {};
        let formIsValid = true;
        let errFeedBack = {};
        for ( let key in this.state.formControls ) 
        {
            const res = checkValidity(this.state.formControls[key].value, this.state.formControls[key].rules);
            if (!res.report)
            {
                formIsValid = false;
                errFeedBack[key] = res.msg;
            }
            formData[key] = this.state.formControls[key].value;
        }

        if (!formIsValid)
        {
            this.setState(
                produce(draft => {
                    for ( let key in errFeedBack ) 
                    {
                        draft.formControls[key].feedback = errFeedBack[key];
                        draft.formControls[key].validity = "is-invalid";
                    }
                })
            );
            return;
        }

        //  const formData2 = {
        //      'email': "exaple@exaple.com",
        //      'password': "mypass"
        //  }

        console.log("---Form Data---");
        console.log(formData);    
        console.log("---------------");


        authAPI.signIn(axios, formData).then(res => {
            console.log(res);
            if (!res) 
            {
                return;
            }

            if (!res.success)
            {
                console.log("login NOT successful");
				this.setFormWithError();
				this.setState(
					produce( draft => {
						draft.alert.message = "Wrong credentials. Please try again";
						draft.alert.visible = true;
					})
				)
            }
            else
            {
                console.log("login Successful");
                //redux login action
                const { token, id } = res.data;
                this.props.onSignInSuccess(token, id);
                this.props.history.replace("/");
                this.props.toggleSignInModalOpen();
            }
        });
    }

    
    render(){

        const formElementsArray = [];
        for ( let key in this.state.formControls ) 
        {
            formElementsArray.push( {
                id: key,
                config: this.state.formControls[key]
            });
        }

        let formFields = formElementsArray.map( formElement => (
            <MyInput
                key={formElement.id}
                id={formElement.config.id}
                name={formElement.config.name}
                value={formElement.config.value}
                type={formElement.config.type}
                placeholder={formElement.config.placeholder}
                feedback={formElement.config.feedback}
                validity={formElement.config.validity}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} 
            />
        ));

        return (            
            <Modal 
                isOpen={this.props.isSignInModalOpen} 
                toggle={this.props.toggleSignInModalOpen} 
                className="modal-sm"
                centered 
                fade
            >
                <ModalHeader toggle={this.props.toggleSignInModalOpen} id={classes.header_bg}>
                    <span  id={classes.header}>Είσοδος</span>
                </ModalHeader>
                <ModalBody>
                        <p className="small text-muted">
                            Εισέλθετε στην πλατφόρμα προκειμένου να διαχειριστείτε το κατάστημα σας.
                        </p>

                        <Form onSubmit={this.submitHandler}>
                            {formFields}

                            <MyBtn borderWidth='0' size="SM" classes="float-right mt-3" clickedHandler={this.submitHandler} >
                                <span>
                                    Είσοδος
                                </span>
                            </MyBtn>
                        </Form>
                </ModalBody>
        
        
                {/* <ModalFooter>
                    <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter> */}
             </Modal>


            // <Row id={classes.content}> 
            //     <Col xs="12" id={classes.bg_gradient}>
            //         <Row className="justify-content-center">
            //             <Alert 
            //                     color="danger" 
            //                     isOpen={this.state.alert.visible} 
            //                     toggle={() => (this.onDismiss())}
            //             >
            //                 {this.state.alert.message}
            //             </Alert>
            //         </Row>
            //         <Row className="justify-content-center">
            //             <Col className="align-self-center" xs="9" sm="9" md="8" lg="8" style={{paddingLeft : "1%", paddingRight: "1%"}}>
            //                 <Card id={classes.login_form}>
            //                     <CardHeader id={classes.header}>
            //                         Είσοδος στην πλατφόρμα
            //                     </CardHeader>

            //                     <CardBody>
                                    
            //                         <p id={classes.form_text} className="small ">Sign In using your existing account to have full access to all features.</p>

            //                         <Form onSubmit={this.submitHandler}>
            //                             {formFields}

            //                             <Button className="float-right mt-3" id={classes.submit_btn}>
            //                                 <span style={{textShadow: "2px 2px 2px black"}}>
            //                                     Είσοδος
            //                                 </span>
            //                             </Button>
            //                         </Form>
            //                     </CardBody>
            //                 </Card>
            //             </Col>
            //         </Row>
            //     </Col>
            // </Row>
        );
    }

}


const mapDispatchToProps = dispatch => {
    return {
        onSignInSuccess: (token, user) => dispatch(userActions.authSuccess(token, user))
    }
}

export default connect(null, mapDispatchToProps)(withErrorHandler( withRouter(SignIn), axios ));
