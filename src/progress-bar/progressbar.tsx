import React from 'react';
import './progressbar.scss';

type ProgressBarProps = {
    status: string;
}

export const ProgressBar = (props: ProgressBarProps) => {
    const {status} = props;
    let step1Class = "step0";
    let step2Class = "step0 text-center";
    let step3Class = "step0 text-muted text-right";
    switch(status) {
        case 'ordered':
            step1Class += " active";
            break;
        case 'shipped':
            step1Class += " active";
            step2Class += " active";
            break;
        case 'delivered':
            step1Class += " active";
            step2Class += " active";
            step3Class += " active";
            break;
        default:
            break;
    }


    return (
        <div>
            <ul id="progressbar">
                <li className={step1Class} id="step1">Ordered</li>
                <li className={step2Class} id="step2">Shipped</li>
                <li className={step3Class} id="step3">Delivered</li>
            </ul>
        </div>
    );
}
