// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

import log from 'electron-log';

type Props = {};

export default class ImportTable extends Component<Props> {
  // TODO Each child in an array or iterator should have a unique "key" prop.
  props: Props;
  constructor(Props) {
    super(Props);
    // this.state = { decoded: this.decodeSimCInput() };
  }
  getSimCName = () => {
    // decodeSimCInput();
  };

  decodeSimCInput = () => {
    decoded = this.getBasicSimcData();
  };

  getBasicSimCData = () => {
    var input = '';
    var importsDecoded = [];
    var decoded = [];
    for (var i = 0; i < this.props.imports.length; i++) {
      input = this.props.imports[i];
      input = input.split('\n');

      var name = input[1].split('=');
      //* Strip Quotes
      name = name[1];
      name = name.substring(1, name.length - 1);

      var region = input[4].split('=');
      //* Make uppercase
      region = region[1];
      region = region.toUpperCase();

      var server = input[5].split('=');
      //* Capitalise first letter
      server = server[1];
      server = server.charAt(0).toUpperCase() + server.slice(1);

      decoded.push({ name: name, server: server, region: region });
    }
    // log.info(decoded);
    return decoded;
  };

  populateTable = () => {
    let table = [];

    var decoded = this.getBasicSimCData();

    //* Rows
    for (let y = 0; y < decoded.length; y++) {
      let children = [];
      //* Cols
      for (let x = 0; x < 7; x++) {
        switch (x) {
          case 0:
            children.push(
              <td>
                <i class="fas fa-bars" />
              </td>
            );
            break;
          case 1:
            children.push(
              <td>
                <i class="fas fa-chevron-down" />
              </td>
            );
            break;
          case 2:
            // TODO
            children.push(<td>{decoded[y].name}</td>);
            break;
          case 3:
            // TODO
            children.push(<td>{decoded[y].server}</td>);
            break;
          case 4:
            // TODO
            children.push(<td>{decoded[y].region}</td>);
            break;
          case 5:
            children.push(<td />);
            break;
          case 6:
            children.push(
              <td>
                <i class="fas fa-minus-circle" />
              </td>
            );
            break;
          case 7:
            break;
        }
      }
      //* Generate
      table.push(<tr>{children}</tr>);
    }
    return table;
  };

  render() {
    return (
      <div id="imports-table" class="padding-top-40">
        {/* {log.info(this.props.imports)} */}
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
            {/* START TEST ROW */}
            {/* <tr> */}
            {/* <td scope="row"> */}
            {/* <i class="fas fa-bars" /> */}
            {/* </td> */}
            {/* <td> */}
            {/* <i class="fas fa-chevron-down" /> */}
            {/* </td> */}
            {/* <td>Tetrodotoxin</td> */}
            {/* <td>Kazzak</td> */}
            {/* <td>EU</td> */}
            {/* <td /> */}
            {/* <td> */}
            {/* <i class="fas fa-minus-circle" /> */}
            {/* </td> */}
            {/* </tr> */}
            {/* END TEST ROW */}
            {this.populateTable()}
          </tbody>
        </table>
      </div>
    );
  }
  componentDidMount() {}

  componentWillUnmount() {}
}
