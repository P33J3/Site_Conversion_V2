import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import { CAMPSITES } from "../shared/campsites";
import { COMMENTS} from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from './AboutComponent';
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			campsites: CAMPSITES,
      comments: COMMENTS,
      partners: PARTNERS,
      promotions: PROMOTIONS
			// selectedCampsite: null
		};
	}

	// onCampsiteSelect(campsiteId) {
	//     this.setState({selectedCampsite: campsiteId});
	// }

 

	render() {
    // We use the arrow function here as it is able to pull scope from its parent. A function declaration would have only been locally scoped
		const HomePage = () => {
			return <Home
                campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
                promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                partner={this.state.partners.filter(partner => partner.featured)[0]}
                 />;
		};

    const CampsiteWithId =  ({match}) => {
      return (
        <CampsiteInfo
           campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
        comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
         />
  
      )
    }

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
          {/*When passing state data use render syntax; otherwise use component attribute*/}
          <Route path='/directory/:campsiteId' component={CampsiteWithId}  />
		  <Route path='/aboutus' render={ () => <About partners={this.state.partners} /> } />
          <Route exact path='/contactus' component={Contact} />
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
