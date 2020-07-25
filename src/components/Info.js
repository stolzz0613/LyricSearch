import React from 'react';

const Info = ({ info }) => {
    if (Object.keys(info.length === 0)) return null;
    return (
        <div className="card border-light">
            <div className="card-header bg-primary text-light font-weight-bold">
                Información Artista
            </div>
        </div>
    );
}

export default Info;