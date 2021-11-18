import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';

function RenderCampsite({campsite}) {

	return (
		<div className="col-md-5 m-1">
			<Card>
				<CardImg top src={campsite.image} alt={campsite.name} />
				<CardBody>
					{/* <CardTitle>{campsite.name}</CardTitle> */}
					<CardText>{campsite.description}</CardText>
				</CardBody>
			</Card>
		</div>
	);
}

function RenderComments({comments}) {
	if (comments) {
		return (
			<div className={"col-md-5 m-1"}>
				<h4>Comments</h4>
				{comments.map((comment) => (
					<div key={comment.id}>
						<p>{comment.text}</p>
						<p>
							{comment.author}
							{new Intl.DateTimeFormat("en-US", {
								year: "numeric",
								month: "short",
								day: "2-digit",
							}).format(new Date(Date.parse(comment.date)))}
						</p>
					</div>
				))}
			</div>
		);
	}
	return <div />;


}


function CampsiteInfo (props) {

	const campsite = props.campsite;
		const comment = campsite&&props.comments;

		if (props.campsite) {
			return (
				<div className="container">
					  <div className="row">
						<div className="col">
							<Breadcrumb>
								<BreadcrumbItem><Link to="/directory">Directory</Link> </BreadcrumbItem>
								<BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
							</Breadcrumb>
							<h2>{props.campsite.name}</h2>
							<hr />
						</div>
					</div>
					<div className="row">
						<RenderCampsite campsite={campsite} />
						<RenderComments comments={comment} />
					</div>
				</div>
			);
		}
		return <div></div>;

}

export default	CampsiteInfo;


// class CampsiteInfo extends Component {
// 	renderCampsite(campsite) {
// 		return (
// 			<div className="col-md-5 m-1">
// 				<Card>
// 					<CardImg top src={campsite.image} alt={campsite.name} />
// 					<CardBody>
// 						<CardTitle>{campsite.name}</CardTitle>
// 						<CardText>{campsite.description}</CardText>
// 					</CardBody>
// 				</Card>
// 			</div>
// 		);
// 	}

// 	renderComments(comments) {
// 		if (comments) {
// 			return (
// 				<div className={"col-md-5 m-1"}>
// 					<h4>Comments</h4>
// 					{comments.map((comment) => (
// 						<div key={comment.id}>
// 							<p>{comment.text}</p>
// 							<p>
// 								{comment.author}
// 								{new Intl.DateTimeFormat("en-US", {
// 									year: "numeric",
// 									month: "short",
// 									day: "2-digit",
// 								}).format(new Date(Date.parse(comment.date)))}
// 							</p>
// 						</div>
// 					))}
// 				</div>
// 			);
// 		}
// 		return <div />;
// 	}

// 	render() {
// 		const campsite = this.props.campsite;
// 		const comment = campsite?.comments;

// 		if (campsite) {
// 			return (
// 				<div className="container">
// 					<div className="row">
// 						{this.renderCampsite(campsite)}
// 						{this.renderComments(comment)}
// 					</div>
// 				</div>
// 			);
// 		}
// 		return <div></div>;
// 	}
// }

// export default CampsiteInfo;
