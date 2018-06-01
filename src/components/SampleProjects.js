import React from 'react';
import {sampleProjects} from '../reducers/page_elements';
import { language } from '../helpers';

class Custom extends React.Component {
    render(){
        return (
            <div className="sample">
                <div className="container">   
                    {sampleProjects[language]}
                </div>
            </div>
        )
    }
}
export default Custom;