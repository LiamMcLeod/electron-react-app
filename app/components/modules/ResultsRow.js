// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import ls from 'local-storage';

import log from 'electron-log';

type Props = {};

//TODO REMOVE DELETED FILES FROM ARRAY

export default class ResultsRow extends Component<Props> {
  props: Props;
  constructor(Props) {
    super(Props);
    this.state = {
      row: Props.row,
      renderRow: true,
      selectable: Props.selectable,
      selected: {},
      showDeleteBox: false,
      deleteConfirm: 'type DELETE to confirm.'
    };
  }

  deleteRow = (e, id) => {
    e.preventDefault();
    if (this.state.deleteConfirm === 'DELETE') {
      this.setState({ showDeleteBox: false });
      this.setState({ renderRow: false });
      this.props.deleteFile(id);
    } else {
      this.setState({ showDeleteBox: true });
    }
  };

  selectRow = (e, id) => {
    if (this.state.selectable) {
      this.setState({ selected: id });
      // log.info('Selected: ' + id);
      this.props.selectRow(id);
      return null;
    }
  };

  deleteBoxChange = e => {
    this.setState({
      deleteConfirm: e.target.value
    });
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
          <td>{/*this.props.row.data.dps */}</td>
          <td> {this.props.row.data.type == 'QS' ? 'Quick Sim' : null} </td>
          <td>{this.props.row.data.dateTime}</td>
          <td>
            {this.state.showDeleteBox ? (
              <input
                className="delete-confirm"
                onChange={e => {
                  this.deleteBoxChange(e);
                }}
                value={this.state.deleteConfirm}
              />
            ) : null}
            <a
              href="#"
              onClick={e => this.deleteRow(e, this.props.row.id)}
              id={this.props.row.id}
              placeholder="DELETE"
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
  componentWillUnmount() {
    this.setState = () => {};
  }
}
