import _ from 'lodash';
import Qs from 'qs';
import React from 'react';
import ReactDOM from 'react-dom';
import CopyToClipboard from 'react-copy-to-clipboard';

import emojifyText from "../emojify.js";


var App = React.createClass({
    getInitialState() {
        return {text: "", copied: false};
    },

    componentWillMount() {
        this.updateUrl = _.debounce(this.updateUrl, 200);
    },

    componentDidMount() {
      if (typeof window !== 'undefined') {
        var txt = window.location.search.replace(/^\?|\/$/g, ''),
            params = Qs.parse(txt);
        
        if (params.q) this.setState({ text: params.q });
      }
    },

    updateUrl() {
      var params_str = Qs.stringify({q: this.state.text}).replace(/%20/g, '+');
      window.history.pushState(this.state, '', '?' + params_str);
    },

    handleChange(event) {
        this.setState({
            text: event.target.value,
            copied: false,
        }, this.updateUrl);
    },

    tweetUrl(text) {
        var params = {
            text: text + ' via http://www.emojist.com',
            hashtags: 'emojist'
        }

        var url = 'https://twitter.com/intent/tweet?' + 
            Qs.stringify(params);

        return url;
    },

    render() {
        var txt = this.state.text,
            translation = emojifyText(txt),
            tweet_url = this.tweetUrl(translation);

        return (
            <div className="clearfix">
                <div className="mb2">
                    <div className="h3">
                        Translate boring English (😕🇬🇧) into awesome Emoji (💥🎉)
                    </div>
                </div>

                <textarea
                    className="col-12 field"
                    onChange={this.handleChange}
                    value={this.state.text}
                    placeholder="Start typing..."
                ></textarea>

                <div className="py2 center">⬇️</div>

                <div className="p2 bg-darken-1 border rounded">
                    {(translation || '💬').split('\n').map(function(line, i) {
                        return <div key={i}>{line}</div>;
                    })}
                </div>

                <div className="py3">
                    <CopyToClipboard text={translation}
                        onCopy={() => this.setState({copied: true})}>
                        <button type="button" className="btn btn-outline">
                            {this.state.copied ? 'Copied' : 'Copy'}
                        </button>
                    </CopyToClipboard>&nbsp;
                    <a target="_blank" href={tweet_url} className="btn btn-outline">Tweet</a>
                </div>

                <footer className="border-top mt3 py2">
                    <div className="right">
                        <a href="https://github.com/brendansudol/text-to-emoji" className="black">
                            Github
                        </a>
                    </div>
                    <a href="http://www.brendansudol.com" className="black">
                        Made by <span className="bold">brensudol</span>
                    </a>
                </footer>
            </div>
        );
    }
});


module.exports = App
