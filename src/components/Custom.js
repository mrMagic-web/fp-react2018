import React from 'react';
import {customDesignsTitle, customDesignsCopy, contactUs} from '../reducers/page_elements';
import { language } from '../helpers';

class Custom extends React.Component {
    render(){
        return (
            <div className="custom">
                <section className="custom__section">
                    <h1>{customDesignsTitle[language]}</h1>
                    <p>{customDesignsCopy[language]}</p>
                    <button>{contactUs[language]}</button>
                </section>
                <section className="custom__section">v</section>
            </div>
        )
    }
}
export default Custom;