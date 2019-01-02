// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

type Props = {};

export default class ImportTable extends Component<Props> {
  props: Props;

  render() {
    return (
      <div id="imports-table" class="padding-top-40">
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col" colSpan="2" />
              <th scope="col">Name</th>
              <th scope="col">Server</th>
              <th scope="col">Region</th>
              <th scope="col" colSpan="2" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">
                <i class="fas fa-bars" />
              </td>
              <td>
                <i class="fas fa-chevron-down" />
              </td>
              <td>Tetrodotoxin</td>
              <td>Kazak</td>
              <td>EU</td>
              <td />
              <td>
                <i class="fas fa-minus-circle" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
