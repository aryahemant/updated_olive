import React from "react";
import { Component } from "react";

class LongText extends Component {
  constructor(props) {
    super(props);
    this.state = { showAll: false };
  }
  componentDidMount() {
    // const toShow = this.props.content.substring(0,this.props.limit)+"...";
    // console.log("toshow", toShow);
  }
  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });
  render() {
    const { content, limit } = this.props;
    const { showAll } = this.state;
    console.log("content", content.props.dangerouslySetInnerHTML.__html);
    // var regex = /(<([^>]+)>)/ig;
    // var result = content.props.dangerouslySetInnerHTML.__html.replace(regex, "");
    // console.log("body", result);
    const regex = /(<([^>]+)>)/gi;
    const result = content.props.dangerouslySetInnerHTML.__html
      ? content.props.dangerouslySetInnerHTML.__html
      : "";
    console.log("body", result.length);
    const toShow = result.substring(0, limit) + "...";
    return (
      <div>
        {result.length <= limit ? (
          <React.Fragment>{content} </React.Fragment>
        ) : showAll ? (
          <React.Fragment>
            {content}
            <a className="readmorebtn " onClick={this.showLess}>
              {" "}
              Read less
            </a>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div
              className="long-dec-show fl-100"
              dangerouslySetInnerHTML={{
                __html: toShow,
              }}
            />
            {/* {toShow} */}
            <a className="readmorebtn " onClick={this.showMore}>
              {" "}
              Read more
            </a>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default LongText;
