import React from 'react';
import produce from 'immer';
import { connect } from 'react-redux';
import {
    Row, Col, Card, CardImg, CardText, CardBody, CardFooter, CardLink,
    CardTitle, CardSubtitle, Media, Collapse, Button, Input
} from 'reactstrap';
import classes from './Report.module.scss';
import SignificanceOption from '../../components/SignificanceOption/SignificanceOption';
import ReportComment from '../../components/ReportComment/ReportComment';

import img_url from '../../assets/images/my_city_background.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCommentDots, faListAlt, faPoll } from '@fortawesome/free-solid-svg-icons';

import MyInput from '../../components/UI/MyInput/MyInput';
import { reportApi } from '../../services/reportApi';

import axios from '../../services/axiosConfig';
import {withRouter} from 'react-router-dom'

class Report extends React.Component {

    state = {
        isCommentsExpanded: false,
        isStatusExpanded: false,
        isOptionsExpanded: false,

        commentValue: '',

    }

    //-------------expandables handlers ----------------------

    expandCommnetsHandler = () => {
        this.setState(
            produce(draft => {
                draft.isCommentsExpanded = !draft.isCommentsExpanded;
                draft.isStatusExpanded = false;
                draft.isOptionsExpanded = false;
            })
        );
    }

    expandStatusHandler = () => {
        this.setState(
            produce(draft => {
                draft.isStatusExpanded = !draft.isStatusExpanded;
                draft.isCommentsExpanded = false;
                draft.isOptionsExpanded = false;
            })
        );
    }

    expandOptionsHandler = () => {
        this.setState(
            produce(draft => {
                draft.isOptionsExpanded = !draft.isOptionsExpanded;
                draft.isStatusExpanded = false;
                draft.isCommentsExpanded = false;
            })
        );
    }

    //-------------Status----------------------

    increaseStatus = () => {
        if (this.props.user.userType === 'authority' && this.props.user.username === this.props.municipality) {
            if (this.props.state === 'pending') {
                reportApi.changeStatus({ state: 'inprogress' });
            }
            else if (this.props.state === 'inprogress') {
                reportApi.changeStatus({ state: 'resolved' });
            }
        }
    }

    stopStatus = () => {
        if (this.props.user.userType === 'authority' && this.props.user.username === this.props.municipality) {
            if (this.props.state !== 'resolved') {
                reportApi.changeStatus({ state: 'unresolved' });
            }
        }
    }

    //-----------------------------------


    importanceOptionChosenHandler = (option) => {
        // console.log(option)
        const importanceForm = {
            id: this.props.id,
            vote: parseFloat(option)
        };

        console.log(importanceForm);
        reportApi.submitRating(axios, importanceForm);


        //make API request here
        // alert(option);

    }

    renderExpandable = () => {
        if (this.state.isStatusExpanded) {
            return (
                <>
                    <Row className='border-top p-3 font-weight-bold' >
                        {this.props.state}
                    </Row>
                    <Row className='border-top'>
                        <Col>
                            <Button
                                color="success"
                                disabled={this.props.state === 'unresolved' || this.props.state === 'resolved'}
                                onClick={this.increaseState}>
                                Next state
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                color="danger"
                                disabled={this.props.state === 'unresolved' || this.props.state === 'resolved'}
                                onClick={this.stopStatus}>
                                Stop report
                            </Button>
                        </Col>
                    </Row>
                </>
            );
        }
        else if (this.state.isCommentsExpanded) {
            let showComments = '';
            if (this.props.comment) {
                showComments = this.props.comment.map((comment, index) => {
                    return (
                        <ReportComment
                            key={index}
                            text={comment.text}
                            user={comment.id}
                        />
                    )
                })
            }
            return (
                <>
                    <Row className='border-top'>
                    <Input
                        value={this.state.commentValue}
                        type='textarea'
                        placeholder={'Enter Comment'}
                        onChange={this.changeComment}
                    />
                    </Row>
                    <Row className='border-top p-2'>
                        <Button
                            color="info"
                            // disabled={this.props.state === 'unresolved' || this.props.state === 'resolved'}
                            onClick={this.submitComment}>
                                Submit
                        </Button>
                    </Row>

                    {showComments}
                </>
            );
        }
        else if (this.state.isOptionsExpanded) {
            return (
                <Row className='border-top'>
                    {this.renderImportanceOptions()}
                </Row>
            );
        }
        else {
            return null;
        }
    }

    changeComment = (e) => {
        console.log('ssssss')
        const val = e.target.value;
        this.setState(
            produce(draft => {
                draft.commentValue = val;
            })
        );

        console.log(this.state.commentValue);
    }

    submitComment = () => {
        reportApi.submitComment(axios, { report: this.props.id, text: this.state.commentValue });
        this.props.history.push('/feed');
    }

    renderImportanceOptions = () => {
        const options = [1, 2, 3, 4, 5];
        let significanceOptions = options.map(option => (
            <SignificanceOption option={option} key={option} importanceOptionChosenHandler={() => this.importanceOptionChosenHandler(option)} />
        ));

        return (
            <>
                <Col xs='1'></Col>
                {significanceOptions}
                <Col xs='1'></Col>
            </>
        );
    }

    render() {

        const canPost = this.props.municipality === this.props.currentUser.municipality;
        const canRate = this.props.municipality === this.props.currentUser.municipality;

        const profImgSize = document.documentElement.clientHeight * 0.07;

        return (
            <Row className='justify-content-center ' style={{ paddingTop: '15vh' }}>
                <Col xs='7'>
                    <Card>
                        <CardBody className=''>
                            <Row className=''>
                                <Col xs='10' className=' p-0'>
                                    <Media>
                                        <Media left middle className='pr-3'>
                                            <Media id={classes.profileImg} style={{ width: `${profImgSize}px`, height: `${profImgSize}px` }} className='rounded-circle' object src='https://elysator.com/wp-content/uploads/blank-profile-picture-973460_1280-e1523978675847.png' alt="Profile img" />
                                        </Media>
                                        <Media body>
                                            <Media heading id={classes.username} className=' pt-2 mb-0'>
                                                {this.props.username}
                                            </Media>
                                            <small className='text-muted '>
                                                {this.props.municipality}, {this.props.address}, {this.props.date}
                                            </small>
                                        </Media>
                                    </Media>
                                </Col>
                                <Col xs='2' className=' d-flex align-self-center justify-content-end' id={classes.importance}>
                                    {this.props.significance} <FontAwesomeIcon icon={faExclamationCircle} size="lg" className="ml-2 align-self-center" />
                                </Col>
                            </Row>
                        </CardBody>

                        <CardBody className=' p-1 mb-3'>
                            <CardText id={classes.description} className=' p-0'>
                                {this.props.description}
                            </CardText>
                        </CardBody>

                        <CardImg className='' width="100%" height={document.documentElement.clientHeight * 0.4} src={"data:image/jpg;base64," + this.props.img} alt="Issue img" />

                        <CardFooter className=' pb-0'>
                            <Row id={classes.reportFooter} className='pb-3 align-items-center'>
                                <Col className={'d-flex justify-content-center'}>
                                    <span className={classes.pointer} onClick={this.expandStatusHandler}>
                                        Issue's Status <FontAwesomeIcon icon={faListAlt} size="lg" className="ml-3 align-self-center" />
                                    </span>
                                </Col>

                                <Col className={'d-flex justify-content-center'}>
                                    <span className={classes.pointer} onClick={this.expandCommnetsHandler}>
                                        Comments <FontAwesomeIcon icon={faCommentDots} size="lg" className="ml-3 align-self-center" />
                                    </span>
                                </Col>

                                {
                                    canRate ?
                                        <Col className={'d-flex justify-content-center'}>
                                            <span className={classes.pointer} onClick={this.expandOptionsHandler}>
                                                Rate importance <FontAwesomeIcon icon={faPoll} size="lg" className="ml-3 align-self-center" />
                                            </span>
                                        </Col>
                                        : null
                                }
                            </Row>
                            {this.renderExpandable()}
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }

}

export default withRouter(Report); 