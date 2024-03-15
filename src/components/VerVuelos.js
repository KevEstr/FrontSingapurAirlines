import React, { useState, useEffect } from 'react';
import '../styles.css';
import VerPrecios from './VerPrecios'; // Importa el componente VerPrecios
import logo from '../assets/airplane.png';
import beach from '../assets/beach.PNG';

export default function VerVuelos() {
    const [cities, setCities] = useState([]);
    const [showPrices, setShowPrices] = useState(false); // Estado para controlar la visibilidad de VerPrecios
    const [tripType, setTripType] = useState('roundTrip'); // Estado para controlar el tipo de viaje
    const [originCity, setOriginCity] = useState(""); // Estado para almacenar la ciudad de origen
    const [destinationCity, setDestinationCity] = useState(""); // Estado para almacenar la ciudad de destino
    const [filteredCities, setFilteredCities] = useState([]); // Estado para almacenar las ciudades filtradas
    const [showMainButtons, setShowMainButtons] = useState(true); // Estado para mostrar los botones principales
    const [originCityFilled, setOriginCityFilled] = useState(false); // Estado para indicar si el campo de origen está lleno
    const [destinationCityFilled, setDestinationCityFilled] = useState(false); // Estado para indicar si el campo de destino está lleno
    const [showModifySearch, setShowModifySearch] = useState(false); // Estado para controlar la visibilidad del botón "Modificar Búsqueda"

    useEffect(() => {
        fetch('https://65f0ba68da8c6584131c57f7.mockapi.io/api/city/cities')
            .then(response => response.json())
            .then(data => {
                setCities(data);
                setFilteredCities(data); // Inicialmente, muestra todas las ciudades disponibles
            })
            .catch(error => console.error('Error fetching cities:', error));
    }, []);

    useEffect(() => {
        // Filtra las ciudades disponibles para el destino
        const filteredDestinationCities = cities.filter(city => city.city.toLowerCase() !== originCity.toLowerCase());
        setFilteredCities(filteredDestinationCities);
    }, [originCity, cities]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (originCityFilled && destinationCityFilled) {
            setShowPrices(true);
            setShowMainButtons(false);
            setShowModifySearch(true); // Mostrar el botón "Modificar Búsqueda" cuando se hace clic en Buscar
        } else {
            alert("Por favor, complete ambos campos de ciudad antes de buscar.");
        }
    }

    const handleTripTypeChange = (e) => {
        setTripType(e.target.value);
    }

    const handleOriginChange = (e) => {
        const value = e.target.value;
        setOriginCity(value);
        setOriginCityFilled(value !== "");
        // Verificar si la ciudad seleccionada como origen ya está seleccionada como destino
        if (value === destinationCity) {
            // Si la ciudad de origen es igual a la ciudad de destino, limpiar el campo de destino
            setDestinationCity("");
            setDestinationCityFilled(false); // Actualizar el estado del campo de destino
        }
    }

    const handleDestinationChange = (e) => {
        const value = e.target.value;
        setDestinationCity(value);
        setDestinationCityFilled(value !== "");
    }

    const handleLogoClick = () => {
        setShowPrices(false); // Cambia el estado para ocultar VerPrecios cuando se hace clic en el logo
        setShowMainButtons(true);
        setShowModifySearch(false);
    }

    // Componente FlightHeader
    const FlightHeader = () => (
        <div className="flight-header-container">
            <div className="flight-header">
                <div className="special-logo-container"> {/* Nuevo contenedor para el icono y el texto */}
                    <div className="flight-header-filter"> {/* Agrega el nuevo icono aquí */}
                        <span className="material-symbols-outlined">flight_takeoff</span>
                    </div>
                    <div className="flight-header-text"> {/* Mueve el texto dentro del nuevo contenedor */}
                        Viaje de Medellín a Bogotá - Dom, Mar 14, 2024
                    </div>
                </div>
                <div className="flight-header-filter">
                    <span className="material-symbols-outlined">filter_alt</span>
                    <span>Recomendado:</span>
                    <button className="filter-button">Vuelos directos</button>
                    <button className="filter-button">Mejor precio</button>
                </div>
            </div>
        </div>
    );



    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            {/* Nuevo contenedor para el encabezado */}
            <div className="header-container">
                <div className="top-panel">
                    <div className="logo-container" onClick={handleLogoClick}>
                        <img src={logo} alt="Logo de Aerolínea" className="logo" />
                        <span className="logo-title">Singapur Airlines</span>
                    </div>
                    <div className="buttons-container">
                        {showMainButtons ? (
                            <>
                                <button style={{ fontWeight: 'bold' }} className="header-button">Reserva tu vuelo</button>
                                <button style={{ fontWeight: 'bold' }} className="header-button">Ofertas y destinos</button>
                                <button style={{ fontWeight: 'bold' }} className="header-button">Tu reserva</button>
                                <button style={{ fontWeight: 'bold' }} className="header-button">Información y ayuda</button>
                            </>
                        ) : (
                            <>

            <button
                style={{ fontWeight: 'bold' }}
                className={`header-button ${tripType === 'roundTrip' ? 'selected' : ''}`}
            >
                <span className="material-symbols-outlined header-button-icon-numbers">looks_one</span>
                Selección de Vuelos
            </button>

            <button
                style={{ fontWeight: 'bold' }}
                className={`header-button ${tripType === 'oneWay' ? 'selected' : ''}`}
            >
                <span className="material-symbols-outlined header-button-icon-numbers">looks_two</span>
                Personaliza tu viaje
            </button>

            <button
                style={{ fontWeight: 'bold' }}
                className={`header-button ${tripType === 'payments' ? 'selected' : ''}`}
            >
                <span className="material-symbols-outlined header-button-icon-numbers">looks_3</span>
                Pagos
            </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="container">
                <label>
                    <input type="radio" name="tripType" value="roundTrip" checked={tripType === 'roundTrip'} onChange={handleTripTypeChange} /> Ida y vuelta
                </label>
                <label>
                    <input type="radio" name="tripType" value="oneWay" checked={tripType === 'oneWay'} onChange={handleTripTypeChange} /> Solo ida
                </label>
                <form className="form-container" id="flightForm" onSubmit={handleSearch}>

                    <div className="input-container">
                        <label htmlFor="origin">Desde</label>
                        <div className="input-icon-container">
                            <span class="icono"><span class="material-symbols-outlined">flight_takeoff</span></span>
                            <input
                                type="text"
                                id="origin"
                                name="origin"
                                value={originCity}
                                onChange={handleOriginChange}
                                autoComplete="off"
                                
                                list="cityList"
                            />
                        </div>
                        <datalist id="cityList">
                            {filteredCities.map(city => (
                                <option key={city.id} value={city.city} />
                            ))}
                        </datalist>
                    </div>

                    <div className="input-container">
                        <label htmlFor="destination">Hasta</label>
                        <div className="input-icon-container">
                            <span class="icono"><span class="material-symbols-outlined">flight_land</span></span>
                            <input
                                type="text"
                                id="destination"
                                name="destination"
                                value={destinationCity}
                                onChange={handleDestinationChange}
                                autoComplete="off" // Desactiva el autocompletar del navegador
                                
                                list="cityListDestination" // Asocia un datalist para mostrar sugerencias
                            />
                        </div>
                        <datalist id="cityListDestination">
                            {filteredCities.map(city => (
                                <option key={city.id} value={city.city} />
                            ))}
                        </datalist>
                    </div>

                    <div className="passengers-container">
                    <label htmlFor="passengers">Pasajeros</label>
                    <div className="input-icon-container">
                        <span class="icono"><span class="material-symbols-outlined">group</span></span>
                        <input type="number" id="passengers" name="passengers" defaultValue="1" min="1" />
                    </div>
                    </div>



                    <div className="dates-container">
                        <label htmlFor="departureDate">Ida:</label>
                        <input type="date" id="departureDate" name="departureDate" defaultValue="2024-03-15" />
                    </div>

                    {tripType === 'roundTrip' && (
                        <div className="dates-container">
                            <label htmlFor="returnDate">Vuelta:</label>
                            <input type="date" id="returnDate" name="returnDate" defaultValue="2024-03-18" />
                        </div>
                    )}
                    <button type="submit" style={{ display: showMainButtons ? 'inline-block' : 'none' }}>Buscar</button>
                {/* Nuevo botón "Modificar Búsqueda" */}
                <button type="button" className="modify-search-button" style={{ display: showModifySearch ? 'inline-block' : 'none' }}>Modificar Búsqueda</button>

                </form>
            </div>

            {/* Espacio adicional para separar los componentes */}
            <div style={{ height: '50px' }} />

            {/* Renderiza el nuevo componente FlightHeader solo cuando showPrices es true */}
            {showPrices && <FlightHeader />}

            {/* Renderiza VerPrecios solo cuando showPrices es true */}
            {showPrices && <VerPrecios />}

            {/* Renderiza la promoción solo cuando showPrices es false */}
            {!showPrices && (
                <div className="promo">
                    <img src={beach} alt="Vista de la playa" class="promo-image"></img>
                </div>
            )}
        </div>
    );
}