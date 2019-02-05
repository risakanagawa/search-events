import React from "react";
import { Input } from "semantic-ui-react";

export default class SearchBar extends React.Component {
  state = { value: "" };

  render() {
    return (
      <div className='search-bar'>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.onSubmit(this.state.value);
          }}
          style={{ width: "100%" }}
        >
          <Input
            className="prompt"
            type="text"
            placeholder="Search..."
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
          />
        </form>
      </div>
    );
  }
}
