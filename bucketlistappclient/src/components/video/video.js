import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './search-bar';
import VideoDetail from './video-detail'

const API_KEY = 'AIzaSyBh7FOaYJE9S-Xwas4YF2HQL9fBRa4NO_c';

class Video extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('bucketlist');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			console.log(videos);
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term)=>{ this.videoSearch(term) }, 1800);

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo}/>
			</div>
		);
	}
}

export default Video;