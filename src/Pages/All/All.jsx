import React from 'react';
import { Helmet } from 'react-helmet';
import SignModal from '../../Components/Nur/SignModal';

const All = () => {
    return (
        <div>
            <Helmet>
                <title>DevDive | All</title>
            </Helmet>
           <SignModal></SignModal>
        </div>
    );
};

export default All;