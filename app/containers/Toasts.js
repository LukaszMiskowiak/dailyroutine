import React from 'react';
import Toast from '../components/Toast';

class Toasts extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(next) {
        if (next.toasts.length > this.props.toasts.length) { // if toast is added then setInterval
            const time = setInterval(() => {
                this.props.handleRemoveToast();
                clearInterval(time);
            }, 5000);
        };
    }

    render() {
        return (
            this.props.toasts.length ?
                <aside>
                    {this.props.toasts.map((toast, index) =>
                        <Toast
                            key={index}
                            message={toast.message}
                        />
                    )}
                </aside> : null
        );
    }

};

export default Toasts;
