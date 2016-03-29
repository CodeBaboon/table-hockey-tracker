import React from 'react';

class Award extends React.Component {
    render() {
        const record = this.props.record;
        
        return (
            <div className='award'>
                <div className='award-text'>{record.text}</div>
                <div className='award-desc'>({record.description})</div>
            </div>
        );
    }
}

export default Award;