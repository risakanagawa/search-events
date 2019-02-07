import React from "react";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";
import { fetchCategories } from "../../actions";

class SearchBar extends React.Component {
  state = { value: "", category: null };

  componentDidMount() {
    this.props.fetchCategories();
  }

  handleChange = (e) => {
    const selectedCategory =  parseFloat(e.target.options[e.target.selectedIndex].getAttribute('id'));
    this.setState({ category : selectedCategory });
  }

  render() {
    const categories = this.props.categories.map(category => {
      return <option key={category.id} id={category.id} value={category.shortname} >{category.name}</option>
    });

    return (
      <div className="search-bar">
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.onSubmit(this.state.value, this.state.category);
          }}
          style={{ width: "100%" }} >
            <select placeholder='All or Select Genre' className="ui search dropdown"
                    onChange={this.handleChange}>
            <option key='' value='' >All</option>
            {categories}
            </select>
            <Input
              className="prompt"
              type="text"
              placeholder="Search..."
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
            />
            {console.log(this.state)}
        </form>
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
