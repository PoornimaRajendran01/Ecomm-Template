import React, { Fragment, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import './config.css';
import { useInitConfig } from "../../data/configuration/utils";

const homeTypes = [
	'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'
];

const shopTypes = [
	'Grid Standard', 'Grid Filter', 'Grid Two Column', 'Grid No Sidebar', 'Grid Full Width', 'Grid Right Sidebar', 'List Standard', 'List Full Width', 'List Two Columns'
];

const productTypes = [
	'Standard', 'Tab Left', 'Tab Right', 'Sticky', 'Slider', 'Fixed Image'
];

const blogTypes = [
	'Standard', 'No Sidebar', 'Right Sidebar', 'Details Standard'
];

const googleFonts = [
	'Roboto', 'Open Sans', 'Poppins', 'Oswald', 'Padauk', 'Raleway', 'Ubuntu', 'Merriweather', 'KoHo', 'Teko', 'Cabin'
];

export const ControlPanel = ({ location }) => {
	const { pathname } = location;

	const initConfig = useInitConfig();
	const [config, setConfig] = useState(initConfig);


	const handleActiveConfig = (id) => {
		const newConfig = config.map(el => ({
			...el,
			isActive: el.id === id
		}))
		setConfig(newConfig);
		setPracticeName(newConfig.find(el => el.id === id).name);
		localStorage.setItem('config', JSON.stringify(newConfig));
	}

	const activeConfig = config.find(el => el.isActive);
	const [practiceName, setPracticeName] = useState(activeConfig.name);

	const handleChange = (event) => {
		const newConfig = config.map(el => ({
			...el,
			[event.target.name]: el.id === activeConfig.id ? event.target.value : el.name
		}))
		setPracticeName(event.target.value);
		setConfig(newConfig);
		localStorage.setItem('config', JSON.stringify(newConfig));
	}

	const handleRadioChange = (event) => {

		const newConfig = config.map(el => ({
			...el,
			variations: {
				...el.variations,
				[event.target.name]: el.id === activeConfig.id ? Number(event.target.value) : el.variations[event.target.name]
			}
		}))
		setConfig(newConfig);
		localStorage.setItem('config', JSON.stringify(newConfig));
	}

	const handleAddNewConfiguration = () => {
		const emptyObject = {
			id: config[config.length-1].id + 1,
			name: '',
			variations: {
				home: 1,
				shop: 1,
				product: 1,
				blog: 1
			},
			isActive: false
		}

		const newConfig = [...config, emptyObject];

		setConfig(newConfig);
		localStorage.setItem('config', JSON.stringify(newConfig));

	}

	const handleSelectChange = (event) => {
		const newConfig = config.map(el => ({
			...el,
			font: el.id === activeConfig.id ? Number(event.target.value) : el.font,
			fontUrl: el.id === activeConfig.id ? `https://fonts.googleapis.com/css2?family=${googleFonts[Number(event.target.value)-1]}:wght@300;400;600;700&display=swap` : el.fontUrl,
			fontName: el.id === activeConfig.id ? googleFonts[Number(event.target.value)-1] : el.fontName
		}));
		setConfig(newConfig);
		localStorage.setItem('config', JSON.stringify(newConfig));
	}

	return (
		<Fragment>
			<BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
			<BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
				Control Panel
			</BreadcrumbsItem>

			<LayoutOne headerTop="visible">
				{/* breadcrumb */}
				<Breadcrumb/>
				<div className="cart-main-area pt-90 pb-100">
					<div className="container">
						<div className="row mb-3 col"><h2>Select configuration to edit:</h2></div>
						<div className="row mb-3 col">
							<div className="btn-group">
								{config.map(btn => {
									const isActive = btn.isActive;
									return <button key={btn.id} className={`btn ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}
																 onClick={() => handleActiveConfig(btn.id)}>Config {btn.id}</button>
								})}
								<button className="btn btn-outline-primary" onClick={handleAddNewConfiguration}>+</button>
							</div>
						</div>
						<div className="">
							<div className="mb-3">
								<label className="form-label">Practice name: </label>
								<input type="name" value={practiceName} onChange={handleChange} name="name" placeholder="Type practice name here..."/>
							</div>
							<div className="mb-3">
								<label className="form-label">Font family: </label>
								<select className="select-admin" name="font" value={activeConfig.font} onChange={handleSelectChange}>
									{googleFonts.map((font, index) => (
										<option value={index+1}>{font}</option>
									))}
								</select>
							</div>
							<div className="row">
								<div className="mb-3 col">
									<label className="form-label">Home type: </label>
									{[1, 2, 3, 4, 5, 6, 7, 8].map( (el, index) => {
										const isActive = activeConfig.variations.home === el;
										return (
											<div className="form-check" key={el}>
												<input className="form-check-input radio-admin" type="radio" name="home" value={el}
															 checked={isActive} onChange={handleRadioChange} id={'home' + index}/>
												<label className="form-check-label" htmlFor={'home' + index}>
													{homeTypes[index]}
												</label>
											</div>
										)
									})}
								</div>
								<div className="mb-3 col">
									<label className="form-label">Shop type: </label>
									{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, index) => {
										const isActive = activeConfig.variations.shop === el;
										return (
											<div className="form-check" key={el}>
												<input className="form-check-input radio-admin" type="radio" name="shop" value={el}
															 checked={isActive} onChange={handleRadioChange} id={'shop'+index} />
												<label className="form-check-label" htmlFor={'shop'+index}>
													{shopTypes[index]}
												</label>
											</div>
										)
									})}
								</div>
								<div className="mb-3 col">
									<label className="form-label">Product type: </label>
									{[1, 2, 3, 4, 5, 6].map((el, index) => {
										const isActive = activeConfig.variations.product === el;
										return (
											<div className="form-check" key={el}>
												<input className="form-check-input radio-admin" type="radio" name="product" value={el}
															 checked={isActive} onChange={handleRadioChange} id={'product'+index} />
												<label className="form-check-label" htmlFor={'product'+index}>
													{productTypes[index]}
												</label>
											</div>
										)
									})}
								</div>
								<div className="mb-3 col">
									<label className="form-label">Blog type: </label>
									{[1, 2, 3, 4].map((el, index) => {
										const isActive = activeConfig.variations.blog === el;
										return (
											<div className="form-check" key={el}>
												<input className="form-check-input radio-admin" type="radio" name="blog" value={el}
															 checked={isActive} onChange={handleRadioChange} id={'blog'+index}/>
												<label className="form-check-label" htmlFor={'blog'+index}>
													{blogTypes[index]}
												</label>
											</div>
										)
									})}
								</div>
							</div>
						</div>
						<div>
							<button className="btn btn-secondary" onClick={()=>window.location.reload()}>Activate configuration on
								site
							</button>
						</div>
					</div>
				</div>
			</LayoutOne>
		</Fragment>
	);
};
