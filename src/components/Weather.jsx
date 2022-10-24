import React, { useState } from 'react';
import axios from 'axios';

import '../components/Weather.css';

const Weather = () => {
	const [data, setData] = useState({});
	const [location, setLocation] = useState('');
	const [state, setState] = useState('');
	const [icon, setIcon] = useState('');
	const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

	async function inputLocation(e) {
		if (e.key === ('Enter' || 'Done')) {
			await axios
				.get(
					`https://api.openweathermap.org/data/2.5/weather?q=${location},${state}&units=imperial&appid=d5a750bcedae80b849d3570305ce5220`
				)
				.then((response) => {
					setData(response.data);
					setIcon(response.data.weather[0].icon);
					console.log(response.data);
				});
			setLocation('');
			setState('');
		}
	}

	return (
		<div className="weather-container">
			<div className="searchBar">
				<input
					type="text"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					onKeyPress={inputLocation}
					placeholder="Enter Location"
				/>
			</div>

			<div className="temp-container">
				<div className="col-1">
					<div className="city">
						<p>{data.name}</p>
					</div>
					<div className="temp">
						{data.main ? <p>{Math.round(data.main.temp)}°F</p> : null}
					</div>
				</div>

				<div className="col-2">
					<div className="icon">
						{data.main ? (
							<p>
								<img src={iconUrl} alt="icon for current weather status" />
							</p>
						) : null}
					</div>
					{data.main ? (
						<p className="icon-status">{data.weather[0].main}</p>
					) : null}
				</div>
			</div>
			{data.name !== undefined && (
				<div className="weather-details">
					<div className="feels-like">
						<p>Feels Like </p>
						{data.main ? <p>{Math.round(data.main.feels_like)}°F</p> : null}
					</div>
					<div className="humidity">
						<p>Humidity</p>
						{data.main ? <p>{Math.round(data.main.humidity)}%</p> : null}
					</div>
					<div className="wind">
						<p>Wind</p>
						{data.main ? <p>{Math.round(data.wind.speed)} MPH</p> : null}
					</div>
				</div>
			)}
		</div>
	);
};

export default Weather;
