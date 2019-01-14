// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

import { selectFile } from '../../actions/file';

//* Components
import ResultsRow from './ResultsRow';

import log from 'electron-log';

type Props = {};
export default class ResultsTable extends Component<Props> {
  constructor(Props) {
    super(Props);
    this.state = { selectable: false, selected: '' };

    if (Props.selectable) {
      this.state.selectable = Props.selectable;
    } else {
      this.state.selectable = false;
    }
  }
  props: Props;

  refreshRows = ignore => {
    // log.info('refresh called');
    // this.setState({ refreshRows: !this.state.refreshRows });
    return ignore;
  };

  selectRow = id => {
    const { selectFile } = this.props;
    selectFile(id, this.state.results);
    this.props.setSelected(id);
    this.setState({ selected: id });
  };

  getSelectedRow = () => {
    return this.state.selected;
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.results) {
      return { results: nextProps.results };
    }
  }

  componentDidMount() {}

  render() {
    if (this.state.results) {
      var rows = this.state.results.map((row, i) => {
        // TODO add DELETE row ACTION TO REDUX
        // log.info(row.string);
        return (
          <ResultsRow
            selectable={this.state.selectable}
            key={row.id}
            simC=""
            row={row}
            refreshRows={this.refreshRows}
            selectRow={this.selectRow}
            getSelectedRow={this.getSelectedRow}
          />
        );
      });
    }

    return (
      <div id="imports-table" className="padding-top-40">
        {/* {log.info(this.state.selectable)} */}
        {/* {log.info(this.props.imports)} */}
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th />
              <th scope="col">Name</th>
              <th scope="col" />
              <th scope="col"> Type </th>
              <th scope="col">Date</th>
              <th scope="col" colSpan="2" />
            </tr>
          </thead>
          <tbody>{this.state.results ? rows : null}</tbody>
        </table>
      </div>
    );
  }

  componentWillUnmount() {}
}
