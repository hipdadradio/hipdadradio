import React from 'react';

import { fetchHipDadNews, parseNewsData } from '../util/DBUtil';
import { NewsContainer } from './NewsContainer';

/*
    Container that holds the Home page
 */
export class HomeContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            news: [],
            visableNews: []
        }

        this.handleFetchedNews = this.handleFetchedNews.bind(this);
        this.handleNewerStories = this.handleNewerStories.bind(this);
        this.handleOlderStories = this.handleOlderStories.bind(this);
        this.updateVisibleEpisodes = this.updateVisibleEpisodes.bind(this);
    }

    handleFetchedNews(news) {
        let parsedNews = parseNewsData(news);

        this.setState({
            news: parsedNews,
            visableNews: parsedNews.slice(0, 10)
        });
    }

    updateVisibleEpisodes(page) {
        this.setState({
            visableNews: this.state.news.slice(page * 10, page * 10 + 10),
            page: page
        });
    }

    handleOlderStories() {
        setTimeout(this.scrollToTop(), 1000);
        this.updateVisibleEpisodes(this.state.page + 1)
    }

    handleNewerStories() {
        setTimeout(this.scrollToTop(), 1000);
        this.updateVisibleEpisodes(this.state.page - 1)
    }

    scrollToTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }

    componentDidMount() {
        fetchHipDadNews(this.handleFetchedNews);
    }

    render() {
        const newerStoriesExist = this.state.page;
        const olderStoriesExist = this.state.news.length > (this.state.page + 1) * 10;

        return (
            <div >
                <h2>News</h2>
                {this.state.visableNews.map(news => (
                    <NewsContainer date={news.date} title={news.title} text={news.text} image={news.image} />
                ))}
                <br />
                <button id="Newer News" onClick={this.handleNewerStories} hidden={!newerStoriesExist}>Newer Stories</button>
                <button id="Older News" onClick={this.handleOlderStories} hidden={!olderStoriesExist}>Older Stories</button>
            </div >
        );
    }
}