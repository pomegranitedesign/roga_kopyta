import React, { Fragment, Component, createContext } from "react";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";
import { DataContext } from "../Misc/DataContext";

class Layout extends Component {
  state = {
    representatives: [],
    companies: [],

    search: "",
    error: false
  };

  // Fetch всех клмпаний и представителей
  async componentDidMount() {
    const representatives = await axios.get(
      "http://localhost:5000/api/representatives"
    );
    const companies = await axios.get("http://localhost:5000/api/companies");

    this.setState(_ => ({
      representatives: representatives.data.representatives,
      companies: companies.data.companies
    }));
  }

  // Функционал поиска
  handleChange = e => this.setState({ search: e.target.value });
  handleSearch = e => {
    e.preventDefault();

    const { search } = this.state;
    if (search) {
      const firstName = search.split(" ")[0];
      const lastName = search.split(" ")[1];
      axios
        .get(
          `http://localhost:5000/api/representatives?firstName=${firstName}&lastName=${lastName}`
        )
        .then(response => {
          this.setState({
            representatives: response.data.representatives,
            search: ""
          });
        });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { children } = this.props;
    const { search, error } = this.state;

    return (
      <Fragment>
        <Header
          search={search}
          handleSearch={this.handleSearch}
          handleChange={this.handleChange}
        />
        {error
          ? window.setTimeout(_ => <h1>Please Enter A Value</h1>, 2000)
          : null}
        <DataContext.Provider value={{ ...this.state }}>
          <div style={{ marginBottom: "120px" }}>{children}</div>
        </DataContext.Provider>
        <Footer />
      </Fragment>
    );
  }
}

export default Layout;
