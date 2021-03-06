import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
//State is now managed by Redux
// import { CAMPSITES } from "../shared/campsites";
// import { COMMENTS} from '../shared/comments';
// import { PARTNERS } from '../shared/partners';
// import { PROMOTIONS } from '../shared/promotions';
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment, fetchCampsites, fetchComments, fetchPromotions } from "../redux/ActionCreators";
import { actions } from "react-redux-form";

// Use the following function to forward state and change all occurences of 'state' to 'props' in the component below
const mapStateToProps = (state) => {
	return {
		campsites: state.campsites,
		comments: state.comments,
		partners: state.partners,
		promotions: state.promotions,
	};
};

const mapDispatchToProps = {
	addComment: (campsiteId, rating, author, text) =>
		addComment(campsiteId, rating, author, text),

	fetchCampsites: () => fetchCampsites(),

	// used to reset  the form whose state is in configureStore.js
	resetFeedbackForm: () => actions.reset("feedbackForm"),

	fetchComments: () => (fetchComments()),

	fetchPromotions: () => (fetchPromotions())
};
class Main extends Component {
	//State is now managed by Redux
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		campsites: CAMPSITES,
	//   comments: COMMENTS,
	//   partners: PARTNERS,
	//   promotions: PROMOTIONS
	// 		// selectedCampsite: null
	// 	};
	// }

	// onCampsiteSelect(campsiteId) {
	//     this.setState({selectedCampsite: campsiteId});
	// }

	componentDidMount() {
		this.props.fetchCampsites();
		this.props.fetchComments();
		this.props.fetchPromotions();
	}

	render() {
		// We use the arrow function here as it is able to pull scope from its parent. A function declaration would have only been locally scoped
		const HomePage = () => {
			return (
				<Home
					// campsite={this.props.campsites.filter(campsite => campsite.featured)[0]}
					campsite={
						this.props.campsites.campsites.filter(
							(campsite) => campsite.featured
						)[0]
					}
					campsitesLoading={this.props.campsites.isLoading}
					campsitesErrMess={this.props.campsites.errMess}
					// the first promotions points to the object and the second to the array within that object
					promotion={
						this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]
					}
					promotionLoading={this.props.promotions.isLoading}
					promotionErrMess={this.props.promotions.errMess}
					partner={this.props.partners.filter((partner) => partner.featured)[0]}
				/>
			);
		};

		const CampsiteWithId = ({ match }) => {
			return (
				<CampsiteInfo
					//    campsite={this.props.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
					campsite={
						this.props.campsites.campsites.filter(
							(campsite) => campsite.id === +match.params.campsiteId
						)[0]
					}
					isLoading={this.props.campsites.isLoading}
					errMess={this.props.campsites.errMess}
					comments={this.props.comments.comments.filter(
						(comment) => comment.campsiteId === +match.params.campsiteId
					)}
					commentsErrMess={this.props.comments.errMess}
					addComment={this.props.addComment}
				/>
			);
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
						render={() => <Directory campsites={this.props.campsites} />}
					/>
					{/*When passing props data use render syntax; otherwise use component attribute*/}
					<Route path="/directory/:campsiteId" component={CampsiteWithId} />
					<Route
						path="/aboutus"
						render={() => <About partners={this.props.partners} />}
					/>
					{/* <Route exact path='/contactus' component={Contact} /> */}
					<Route
						exact
						path="/contactus"
						render={() => (
							<Contact resetFeedbackForm={this.props.resetFeedbackForm} />
						)}
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

//connect helps to link the redux and withRouter allows RouterDom to still work when using Redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
