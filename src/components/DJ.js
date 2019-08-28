import React from 'react';

export class DJ extends React.Component {
    render() {
        return (
            <div className="GrowingContainer">
                <img src={this.props.image} className="NewsImageContainer" alt={this.props.name + "_IMG"} />
                <div className="DJContainer">
                    <h2>{this.props.name}</h2>
                    <p>{this.props.bio}</p>
                </div>
            </div>
        );
    }
}