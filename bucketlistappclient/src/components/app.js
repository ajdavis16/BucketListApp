import React from 'react';
import React, { Component } from 'react';
import NavBarHeader from './nav';
import Video from './video/video'

	export default class App extends Component {
		render() {
			return (
				<div>
					<NavBarHeader />
					<Video />
				</div>
			);
		}
	}