import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';

//object destructuring to pull out the props
function RenderDirectoryItem({ campsite, /*onClick*/ }) {
	return (
		// <Card onClick={() => this.props.onClick(campsite.id)}> becuase the object is destructured, we can remove the this.props from the method.
		// <Card onClick={() => onClick(campsite.id)}>
		<Card>
            <Link to={`/directory/${campsite.id}`}>
			<CardImg width="100%" src={campsite.image} alt={campsite.name} />
			<CardImgOverlay>
				<CardTitle>{campsite.name}</CardTitle>
			</CardImgOverlay>
            </Link>
		</Card>
	);
}

function Directory(props) {
	const directory = props.campsites.map((campsite) => {
		return (
			<div key={campsite.id} className="col-md-5 m-1">
				{ <RenderDirectoryItem campsite={campsite} /*onClick={props.onClick}*/ /> }
			</div>
		);
	});

	return (
		<div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link> </BreadcrumbItem>
                        <BreadcrumbItem active>Directory</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Directory</h2>
                    <hr />
                </div>
            </div>
			<div className="row">{directory}</div>
		</div>
	);
}

export default Directory;

// class Directory extends Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         };
//     // }

//     // renderSelectedCampsite(campsite) {
//     //     if (campsite) {
//     //         return (
//     //             <Card>
//     //                 <CardImg top src={campsite.image} alt={campsite.name} />
//     //                 <CardBody>
//     //                     <CardTitle>{campsite.name}</CardTitle>
//     //                     <CardText>{campsite.description}</CardText>
//     //                   </CardBody>
//     //             </Card>
//     //         )
//     //     }
//     //     return <div />;
//     // }

//     render() {
//         const directory = this.props.campsites.map(campsite => {
//             return (
//                 <div key={campsite.id} className="col-md-5 m-1">
//                    <Card onClick={() => this.props.onClick(campsite.id)}>
//                    <CardImg width='100%' src={campsite.image} alt={campsite.name} />
//                    <CardImgOverlay>
//                          <CardTitle>{campsite.name}</CardTitle>
//                      </CardImgOverlay>
//                    </Card>
//                 </div>
//             )
//         })

//         return (
//             <div className='container'>
//                 <div className='row'>
//                     {directory}
//                 </div>
//                 {/* <div className='row'>
//                     <div className='col-md-5 m-1'>
//                         {this.renderSelectedCampsite(this.state.selectedCampsite)}
//                     </div>
//                 </div> */}

//             </div>
//         );
//     }

// }

// export default Directory;
