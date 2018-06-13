import React from 'react';
import {customDesignsTitle, customDesignsCopy, contactUs} from '../reducers/page_elements';

class Custom extends React.Component {
    render(){
        const language = this.props.language;
        return (
            <div className="custom">
                <div className="container">   
                    <section className="custom__section">
                        <h2>{customDesignsTitle[language]}</h2>
                        <p>{customDesignsCopy[language]}</p>
                        <button className="whiteBtn">{contactUs[language]}</button>
                    </section>
                    <section className="custom__section">
                        <img className="custom__section--image" alt="Fastpcak custom packagues" src="./img/custom-packages-1.png" />
                    </section>
                </div>
            </div>
        )
    }
}
export default Custom;