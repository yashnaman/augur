import React, { Component, PropTypes } from 'react';

import AugurLogoIcon from 'modules/common/components/augur-logo-icon';

import topicIcons from 'modules/topics/constants/topic-icons';

export default class TopicIcon extends Component {
  static propTypes = {
    topic: PropTypes.string
  }

  constructor(props) {
    super(props);

    const faFormattedTopic = `fa-${props.topic.split(' ').join('-')}`;

    this.state = {
      hasIcon: true,
      className: `fa ${faFormattedTopic}`
    };

    this.updateIconClass = this.updateIconClass.bind(this);
  }

  componentDidMount() {
    if (!window.getComputedStyle(this.topicIcon, '::before').content) {
      const matchedTopic = Object.keys(topicIcons).find((topic) => {
        if (topic === this.props.topic) {
          return true;
        }
        return false;
      });

      this.updateIconClass(matchedTopic);
    }
  }

  updateIconClass(matchedTopic) {
    // NOTE --  The icon selection is as follows:
    //          > If a topic matches an existing font awesome classname, use that; otherwise,
    //          > If a topic matches a pre-defined mapping, use that; otherwise,
    //          > use Augur logo

    if (matchedTopic) {
      this.setState({
        className: `fa ${topicIcons[matchedTopic]}`
      });
    } else {
      this.setState({
        hasIcon: false,
        className: null
      });
    }
  }

  render() {
    const s = this.state;

    return (
      <article>
        {s.hasIcon ?
          <i
            ref={(topicIcon) => { this.topicIcon = topicIcon; }}
            className={s.className}
          /> :
          <AugurLogoIcon />
        }
      </article>
    );
  }
}
