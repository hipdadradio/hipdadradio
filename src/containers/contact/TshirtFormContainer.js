import React from 'react';

const CORS_ROOT = 'https://cors-hipdadradio.herokuapp.com/';
const GOOGLE_FORM_EMAIL_ID = 'entry.59995325';
const GOOGLE_FORM_NAME_ID = 'entry.1768989349';
const GOOGLE_FORM_SIZE_ID = 'entry.1085476325';
const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSerCLCudgSHnslOydfwY5hdLJMUIAJdkxZKa9Bq67caZYsznQ/formResponse';

export class TshirtFormContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            started: false,
            name: '',
            email: '',
            size: ''
        };

        this.startForm = this.startForm.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    startForm() {
        this.setState({ started: true });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handleSizeChange(event) {
        this.setState({ size: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();

        formData.append(GOOGLE_FORM_EMAIL_ID, this.state.email);
        formData.append(GOOGLE_FORM_NAME_ID, this.state.name);
        formData.append(GOOGLE_FORM_SIZE_ID, this.state.size);

        const Http = new XMLHttpRequest();

        const url = CORS_ROOT + GOOGLE_FORM_ACTION_URL;

        Http.onload = function (e) {
            if (Http.readyState === 4) {
                if (Http.status === 200) {
                    alert("Success! You owe us $17!")
                } else {
                    alert("Sorry! Something went wrong... Please try to submit the form again.");
                }
            }
        };

        // Code to execute the http request
        Http.open("POST", url, true);
        Http.send(formData);
        this.setState({
            started: false,
            value: ''
        });
        document.getElementById('tshirtEmail').value = '';
        document.getElementById('tshirtName').value = '';
        document.getElementById('tshirtSize').value = '';
    }

    render() {
        return (
            <div>
                <h2>Can't make the 5k? Order a t-shirt anyway!</h2>
                <button className="formButton" onClick={this.startForm} hidden={this.state.started}><h3>Reserve a shirt</h3></button>
                <form className="textContainer" onSubmit={this.handleSubmit} hidden={!this.state.started}>
                    <h4>We will get you the shirt somehow! Shirts are $17</h4>
                    <section>
                        <p>
                            <label htmlFor="tshirtName">
                                <span>Your Name: </span>
                            </label>
                            <input id="tshirtName" name="name" value={this.state.name} onChange={this.handleNameChange} /> <br />
                        </p>
                        <p hidden={!this.state.name}>
                            <label htmlFor="tshirtEmail">
                                <span>Email: </span>
                            </label>
                            <input id="tshirtEmail" type="email" name="email" value={this.state.email} onChange={this.handleEmailChange} /> <br />
                        </p>
                        <p hidden={!this.state.name || !this.state.email}>
                            <label htmlFor="tshirtSize">
                                <span>T-Shirt Size (unisex):</span>
                            </label>
                            <input id="tshirtSize" name="name" value={this.state.size} onChange={this.handleSizeChange} placeholder="XS - XXL" /> <br />
                        </p>
                    </section>
                    <button id="tshirtSubmit" type='submit' hidden={!this.state.email || !this.state.name || !this.state.size}>Reserve your shirt!</button>
                </form>
            </div>
        );
    }
}