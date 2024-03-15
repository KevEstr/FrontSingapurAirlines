import React, { useState, useEffect } from 'react';
import '../styles.css';

export default function VerPrecios() {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        fetch('https://65f0ba68da8c6584131c57f7.mockapi.io/api/city/flights')
            .then(response => response.json())
            .then(data => setFlights(data))
            .catch(error => console.error('Error fetching flights:', error));
    }, []);

    return (
        <body>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            {flights.map((flight, index) => (
                <div key={index} className="flight-option" style={{ marginBottom: '20px' }}>
                    <div className="best-price">MEJOR PRECIO</div>
                    <div>
                        <div className="departure-time">{flight.hora_ida}</div>
                        <div className="airport-codes">BOG</div>
                    </div>
                    <div class="flight-separator">
                        <div class="flight-separator.left"></div>
                    </div>
                    <div className="separator-div"> 
                        <span class="material-symbols-outlined">flight_takeoff</span>
                    </div>
                    <div class="flight-separator">
                        <div class="flight-separator.left"></div>
                    </div>
                    <div>
                        <div className="arrival-time">{flight.hora_vuelta}</div>
                        <div className="airport-codes">MDE</div>
                    </div>
                    <div>
                        <div class="price">
                            <div class="left-border"></div>
                            {flight.precio} COP
                        </div>
                    </div>
                </div>
            ))}
        </body>
    );
}
