import React from 'react';

import { PhotoArchiveListItem } from '../components/photo/PhotoArchiveListItem'
import { PhotoArchivePhoto } from '../components/photo/PhotoArchivePhoto';
import { fetchPhotoArchives } from '../util/DBUtil';
import { BackToArchiveButton } from '../components/photo/BackToArchiveButton';
import { scrollToTop } from '../util/AppUtil';

export class PhotoPage extends React.Component {
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
    }

    handleFetchedPhotos(archives) {
        this.setState({ archives: archives });
    }

    componentDidMount() {
        fetchPhotoArchives(this.handleFetchedPhotos);
    }

    handleSelection(selected) {
        scrollToTop();

        this.setState({
            selected: selected,
            albumSelected: true
        });
    }

    unSelect() {
        scrollToTop();

        this.setState({
            selected: { photos: [] },
            albumSelected: false
        });
    }

    render() {
        return (
            <>
                <h2>Photo Archives</h2>
                <div hidden={this.state.albumSelected}>
                    {this.state.archives.map(archive => (
                        <PhotoArchiveListItem key={archive.title} count={archive.photos.length} imgSrc={archive.photos[0].imgSrc} title={archive.title} description={archive.description} author={archive.author} handleClick={this.handleSelection} photos={archive.photos} />
                    ))}
                </div>
                <div hidden={!this.state.albumSelected} className="imageArchiveContainer">
                    <BackToArchiveButton handleClick={this.unSelect} />
                    <h3>{this.state.selected.title}</h3>
                    <h4>{this.state.selected.author}</h4>
                    {this.state.selected.photos.map(photo => (
                        <PhotoArchivePhoto key={photo.imgSrc} imgSrc={photo.imgSrc} desc={photo.desc} />
                    ))}
                    <BackToArchiveButton handleClick={this.unSelect} />
                </div>
            </>
        );
    }
}



