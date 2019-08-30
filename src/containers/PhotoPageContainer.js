import React from 'react';

import { PhotoArchiveListItem } from '../components/PhotoArchiveListItem'
import { PhotoArchivePhoto } from '../components/PhotoArchivePhoto';
import { fetchPhotoArchives, parsePhotoData } from '../util/DBUtil';
import { BackToArchiveButton } from '../components/BackToArchiveButton';

export class PhotoPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            archives: [],
            selected: {
                photos: []
            },
            albumSelected: false
        }

        this.handleFetchedPhotos = this.handleFetchedPhotos.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.unSelect = this.unSelect.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    handleFetchedPhotos(photoData) {
        let archives = parsePhotoData(photoData);

        this.setState({ archives });
    }

    componentDidMount() {
        fetchPhotoArchives(this.handleFetchedPhotos);
    }

    scrollToTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }

    handleSelection(selected) {
        this.scrollToTop();
        this.setState({
            selected: selected,
            albumSelected: true
        });
    }

    unSelect() {
        this.scrollToTop();
        this.setState({
            selected: { photos: [] },
            albumSelected: false
        })
    }

    render() {
        return (
            <>
                <h2>Photo Archive</h2>
                <div hidden={this.state.albumSelected}>
                    {this.state.archives.map(archive => (
                        <PhotoArchiveListItem key={archive.title} imgSrc={archive.photos[0].imgSrc} title={archive.title} description={archive.description} author={archive.author} handleClick={this.handleSelection} photos={archive.photos} />
                    ))}
                </div>
                <div hidden={!this.state.albumSelected} class="textContainer">
                    <BackToArchiveButton handleClick={this.unSelect} />
                    <h3>{this.state.selected.title}</h3>
                    <h4>{this.state.selected.author}</h4>
                    {this.state.selected.photos.map(photo => (
                        <PhotoArchivePhoto imgSrc={photo.imgSrc} desc={photo.desc} />
                    ))}
                    <BackToArchiveButton handleClick={this.unSelect} />
                </div>
            </>
        );
    }
}


