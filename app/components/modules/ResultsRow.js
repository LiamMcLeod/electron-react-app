// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import ls from 'local-storage';

import log from 'electron-log';

type Props = {
  //
  deleteFile: () => void,
  selectFile: () => void
};

export default class ResultsRow extends Component<Props> {
  props: Props;
  constructor(Props) {
    super(Props);
    this.state = {
      row: Props.row,
      renderRow: true,
      selectable: Props.selectable,
      selected: {}
    };
  }

  deleteRow = (e, id) => {
    this.setState({ renderRow: false });
    e.preventDefault();
    // const { deleteProfile } = this.props;
    // deleteProfile(e, id);
  };

  selectRow = (e, id) => {
    if (this.state.selectable) {
      this.setState({ selected: id });
      // log.info('Selected: ' + id);
      this.props.selectRow(id);
      return null;
    }
  };

  render() {
    if (this.state.renderRow) {
      return (
        <tr
          onClick={e => {
            this.state.selectable
              ? this.selectRow(e, this.state.row.id)
              : this.selectRow(e); //  & (this.state.row.key !== this.state.selected)
          }}
          style={{
            background:
              this.state.selected === this.props.getSelectedRow()
                ? 'rgba(255, 255, 255, 0.5)'
                : null
          }}
        >
          <td />
          <td>{this.props.row.data.name}</td>
          <td />
          <td>{/*this.props.row.data.dps */}</td>
          <td>{this.props.row.data.dateTime}</td>
          <td>
            <a
            // href="#"
            // onClick={e => this.deleteRow(e, this.props.row.key)}
            // id={this.props.row.key}
            >
              <i className="fas fa-minus-circle" />
            </a>
          </td>
        </tr>
      );
    } else {
      return null;
    }
  }
  componentDidMount() {}

  componentWillUnmount() {}
}
