import React, { Component } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";

class CampsiteInfo extends Component {

	renderCampsite(campsite) {
		return (
			<div className="col-md-5 m-1">
				<Card>
					<CardImg top src={campsite.image} alt={campsite.name} />
					<CardBody>
						<CardTitle>{campsite.name}</CardTitle>
						<CardText>{campsite.description}</CardText>
					</CardBody>
				</Card>
			</div>
		);
	}

	renderComments(comments) {
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
		} return <div />
	}

	render() {
		const campsite = this.props.campsite;
        const comment = campsite?.comments;
        
		if (campsite) {
            
			return (
                <div className="row">
                {this.renderCampsite(campsite)}
                {this.renderComments(comment)}
           </div>
           
          
            )

		}
		return <div></div>;
	}
}

export default CampsiteInfo;
