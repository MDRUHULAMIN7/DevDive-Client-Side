import React from 'react';
import { Helmet } from 'react-helmet';
import SignModal from '../../Components/Nur/SignModal';
import ProgressBar from '../../components/adnan/ProgressBar';

const All = () => {
    return (
        <div>
            <Helmet>
                <title>DevDive | All</title>
            </Helmet>
            <ProgressBar/>
        </div>
    );
};

export default All;