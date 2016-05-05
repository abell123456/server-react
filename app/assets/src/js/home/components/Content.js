/**!
 * project - filepath
 * description
 */

 // 被前后端共用的组件
'use strict';
import React, { Component, PropTypes } from 'react';

class Content extends Component {
    static propTypes = {
        microdata: PropTypes.object,
        mydata: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        console.log('constructor');
    }

    handleClick(e) {
        console.log(11);
        alert(1);
    }

    render() {
        let { microdata, mydata } = this.props;

        return (
            <div onClick={this.handleClick.bind(this)}>hello：{mydata.nick}</div>
        );
    }
}

export default Content;
