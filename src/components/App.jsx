import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Profile from './github/Profile.jsx'
import Search from './github/Search.jsx'

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			username: 'PREMPRAKASHSINGH',
			userData: [],
			userRepos: [],
			perPage: 10
		};
	}
	//get user data from github
	getUserData(){
		$.ajax({
			url: 'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({userData: data});
				console.log(data);
			}.bind(this),
			error: function(xhr,status,err){
				this.setState({username: null});
				alert(err);
			}.bind(this)
		});
	}

	//get repo data from github
	getUserRepos(){
		$.ajax({
			url: 'https://api.github.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'&sort=created',
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({userRepos: data});
			}.bind(this),
			error: function(xhr,status,err){
				this.setState({username: null});
				alert(err);
			}.bind(this)
		});
	}

	handleFormSubmit(username){
		this.setState({username:username},function(){		
			this.getUserData();
			this.getUserRepos();
		});
	}

	componentDidMount(){
		this.getUserData();
		this.getUserRepos();
	}

	render(){
		return(
				<div>
					<Search onFormSubmit={this.handleFormSubmit.bind(this)} /><br />
					<Profile {...this.state} />
				</div>
			)
	}
}

App.propTypes={
	clientId: React.PropTypes.string,
	clientSecret: React.PropTypes.string
};
App.defaultProps={
	clientId: 'f5f4a66a50f89b8019cd',
	clientSecret: '108610955d74e5967e813c6d9c06759ffef67b7e'
};
export default App