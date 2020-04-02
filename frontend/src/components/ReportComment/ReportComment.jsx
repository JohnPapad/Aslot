import React from 'react';
import { Col, Media, Row } from 'reactstrap';
import classes from './ReportComment.module.scss';


const reportComment = (props) => {

    const profImgSize = document.documentElement.clientHeight * 0.05;
    const { text, id } = props;
    return (
        <Row className='border-top'>
            <Col>
                <Media>
                    <Media left middle className='pr-2'>
                        <Media id={classes.profileImg} style={{width: `${profImgSize}px`, height: `${profImgSize}px`}} className='rounded-circle' object src='https://elysator.com/wp-content/uploads/blank-profile-picture-973460_1280-e1523978675847.png' alt="Profile img" />
                    </Media>
                    <Media body>
                        <Media heading id={classes.commentRow} className='mt-1 p-1'>
                            <span id={classes.username}>
                                {id}
                            </span>
                                {text}
                        </Media>
                    </Media>
                </Media>
            </Col>
        </Row>
    );
}


export default reportComment;