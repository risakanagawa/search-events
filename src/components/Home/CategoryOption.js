import React from "react";
import { connect } from "react-redux";
import {Dropdown } from "semantic-ui-react";
import { fetchCategories } from "../../actions";

class SearchBar extends React.Component {
  state = { value: "" };

  componentDidMount() {
    this.props.fetchCategories();
  }

  categoryList() {
    const categories = this.props.categories.map(category => {
      return { key: category.id, text: category.name };
    });
    return categories;
  }

  render() {
    return (
      <div>
        <Dropdown
          placeholder="All or Select"
          search
          selection
          options={this.categoryList()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { categories: state.categories };
};

export default connect(
  mapStateToProps,
  { fetchCategories }
)(SearchBar);
