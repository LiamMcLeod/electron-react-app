// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
//* Components
import ImportRow from './ImportRow';

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

      var key = this.props.imports[i].key;

      decoded.push({ key: key, name: name, server: server, region: region });
    }
    // log.info(decoded);
    return decoded;
  };

  populateTable = () => {
    let rows = [];

    var decoded = this.getBasicSimCData();
    //TODO MAKE EACH ROW A COMPONENT INSTEAD FAR CLEANER NO NEED FOR FOR LOOP WITH ABSURD CASES HERE

    //* Generate
    for (var i = 0; i < decoded.length; i++) {
      rows.push(<ImportRow simC="" decoded={decoded[i]} />);
    }

    return rows;
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
            {this.populateTable()}
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

            {/* {this.populateTable()} */}
            {/* {
              rows.map(row => {
                return <ObjectRow key={row.uniqueId} data="" columns="" />;
              }
          });
        } */}
          </tbody>
        </table>
      </div>
    );
  }
  componentDidMount() {}

  componentWillUnmount() {}
}
