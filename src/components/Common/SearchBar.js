import React from "react";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";
import { fetchCategories, setSearchOptions } from "../../actions";

import "./searchBar.css";

class SearchBar extends React.Component {
  state = {
    text: this.props.searchOptions.text,
    categoryId: this.props.searchOptions.categoryId
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  handleChange = e => {
    const categoryId = parseFloat(
      e.target.options[e.target.selectedIndex].getAttribute("id")
    ) || '';
    this.setState({ categoryId });
  };

  onInputChange = e => {
    this.setState({ text: e.target.value });
  };

  render() {
    const categories = this.props.categories.map(category => {
      return (
        <option key={category.id} 
                id={category.id} 
                value={category.id}
        >
          {category.name}
        </option>
      );
    });
    return (
      <div className="search-bar">
        <form
          onSubmit={e => {
            e.preventDefault();
            const options = { 
              categoryId: this.state.categoryId, 
              text: this.state.text 
            };
            this.props.setSearchOptions(options);
            this.props.onSubmit(options);
          }}
          style={{ width: "100%" }}
        >
          <select
            placeholder="All or Select Genre"
            className="ui search dropdown"
            onChange={this.handleChange}
            value={this.state.categoryId}
          >
            <option key="" value="">
              All
            </option>
            {categories}
          </select>
          <Input
            className="prompt"
            type="text"
            placeholder="Search..."
            value={this.state.text}
            onChange={this.onInputChange}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { categories: state.categories, searchOptions: state.searchOptions };
};

export default connect(
  mapStateToProps,
  { fetchCategories, setSearchOptions }
)(SearchBar);
