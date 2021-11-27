import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardBody,
	CardText,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {

	constructor(props) {
        super(props);

        
        this.state = {
          isModalOpen: false,
			author: "",
			rating: "",
			comment: "",
		
			touched: {
				author: false,
				rating: false,
				comment: false,
		
			},
	
        };

        this.toggleModal = this.toggleModal.bind(this);

    }

	toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

	handleSubmit(values) {
		console.log("Current state is: " + JSON.stringify(values));
		alert("Current state is: " + JSON.stringify(values));
	}


	render() {
		return (
			<div>
				<div>
					<Button outline onClick={this.toggleModal}>
						<i outline className="fa fa-pencil fa-lg" /> Submit Comment
					</Button>
				</div>
				<div>
					<Modal isOpen= {this.state.isModalOpen} toggle={this.toggleModal}>
						<ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
						<ModalBody>
							<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
								<div className="form-group">
									<Control.select
										model=".rating"
										id="rating"
										name="rating"
										className="form-control"
									>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</div>
								<div className="form-group">
									<Label htmlFor="author" md={2}>
										Author
									</Label>

									<Control.text
										model=".author"
										id="author"
										name="author"
										placeholder="author"
										className="form-control"
										validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
									/>
									 <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />

								</div>
								<div className="form-group">
									<Label>Comment</Label>

									<Control.textarea
										model=".text"
										id="text"
										name="text"
										rows="6"
										className="form-control"
									></Control.textarea>
								</div>
								<Button type="submit" color="primary">
									Submit Comment
								</Button>
							</LocalForm>
						</ModalBody>
					</Modal>
				</div>
			</div>
		);
	}
}

function RenderCampsite({ campsite }) {
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

function RenderComments({ comments }) {
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
				<CommentForm />
			</div>
		);
	}
	return <div />;
}

function CampsiteInfo(props) {
	const campsite = props.campsite;
	const comment = campsite && props.comments;

	if (props.campsite) {
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<Breadcrumb>
							<BreadcrumbItem>
								<Link to="/directory">Directory</Link>{" "}
							</BreadcrumbItem>
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

export default CampsiteInfo;

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
