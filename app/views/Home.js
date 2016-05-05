/**!
 * react-server-koa-simple - app/views/Home.js
 * page of home
*/

'use strict';

import path from 'path';
import React, {Component, PropTypes} from 'react';
import Content from '../assets/src/js/home/components/Content.js';
import Default from './layout/Default';

class Home extends Component {

    static propTypes = {
        microdata: PropTypes.object,
        mydata: PropTypes.object
    };


    constructor(props, context) {
        super(props, context);

        console.log('constructor');
    }
    
    render() {
        let {microdata, mydata} = this.props;

        // localhost:3000/assets/build/1.0.0-rc4/js/home.js
        let homeJs = `${microdata.styleDomain}/assets/build/${microdata.styleVersion}/js/home.js`;

        let scriptUrls = [homeJs];

        return (
            <Default
                microdata={microdata}
                scriptUrls={scriptUrls}
                title={"demo"}>
                <div id="demoApp"
                    data-microdata={JSON.stringify(microdata)}
                    data-mydata={JSON.stringify(mydata)}>
                        <Content mydata={mydata} microdata={microdata} />
                </div>
            </Default>
        );
    }
};

module.exports = Home;
