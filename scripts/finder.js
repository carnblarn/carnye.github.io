var PlaylistTable = React.createClass({
	getInitialState: function() {
		return {
			data: data 
		};
	},
	render: function(){
		var rows = this.state.data.map(function(playlist, i){
			return <Playlist data = {playlist} reactKey={i} key={i}/>
		})
		return <div>{rows}</div>
	}
})

var Playlist = React.createClass({
	render: function(){
		var imageLink = "scripts/spotify/topPlaylists/" + this.props.data.image;
		var description =  { __html: this.props.data.description}
		return (<div className="row playlist">
					<a href={this.props.data.link} ><img src={imageLink} className="col-md-2" /> </a>
					<div className=" playlistInfo  col-md-9">
						<h3> <a href={this.props.data.link} >{this.props.reactKey +1}. {this.props.data.name} - {this.props.data.followers} followers </a></h3>

						<h4><small className="text-muted" dangerouslySetInnerHTML={description}></small></h4>
					</div>
				</div>);
	}
})

 React.render(<PlaylistTable />, document.getElementById('playlists'));