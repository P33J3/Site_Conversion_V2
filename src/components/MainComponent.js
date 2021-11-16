import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import { CAMPSITES } from "../shared/campsites";
import Home from "./HomeComponent";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			campsites: CAMPSITES,
			// selectedCampsite: null
		};
	}

	// onCampsiteSelect(campsiteId) {
	//     this.setState({selectedCampsite: campsiteId});
	// }

	render() {
		const HomePage = () => {
			return <Home />;
		};

		return (
			<div>
				{/* <Navbar dark color="primary">
                <div className="container">
                    <NavbarBrand href="/">NuCamp</NavbarBrand>
                </div>
                </Navbar> */}
				<Header />
				<Switch>
					<Route path="/home" component={HomePage} />
					<Route
						exact
						path="/directory"
						render={() => <Directory campsites={this.state.campsites} />}
					/>
					<Redirect to="/home" />
				</Switch>

				{/* <Directory campsites={this.state.campsites} 
          
        onClick={campsiteId => this.onCampsiteSelect(campsiteId)} />
                <CampsiteInfo campsite={this.state.campsites.filter(campsite =>
                  
                 campsite.id === this.state.selectedCampsite)[0]}/> */}
				<Footer />
			</div>
		);
	}
}

export default Main;
