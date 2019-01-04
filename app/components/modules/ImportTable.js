// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

import ls from 'local-storage';
//* Components
import ImportRow from './ImportRow';

import log from 'electron-log';
import { lastDayOfISOWeek } from 'date-fns';

type Props = {};
var Alt = {};
export default class ImportTable extends Component<Props> {
  // TODO Each child in an array or iterator should have a unique "key" prop.
  constructor(Props) {
    super(Props);
    this.state = {
      selectable: false
    };
    if (Props.selectable) {
      this.state.selectable = Props.selectable;
    } else {
      this.state.selectable = false;
    }
  }
  props: Alt;
  getSimCName = () => {
    // decodeSimCInput();
  };

  decodeSimCInput = () => {
    decoded = this.getBasicSimcData();
  };

  getBasicSimCData = () => {
    var input = '';
    var decoded = [];
    var imports = [];
    if (this.props.imports) {
      imports = this.props.imports;
    } else {
      if (ls.get('imports')) {
        imports = ls.get('imports');
      }
    }

    if (imports) {
      for (var i = 0; i < imports.length; i++) {
        input = imports[i].string;
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

        var key = imports[i].key;

        decoded.push({
          key: key,
          name: name,
          server: server,
          region: region
        });
      }

      return decoded;
    } else {
      return null;
    }
  };

  populateTable = () => {
    let rows = [];
    var decoded = this.getBasicSimCData();
    // log.info(rows);
    //TODO MAKE EACH ROW A COMPONENT INSTEAD FAR CLEANER NO NEED FOR FOR LOOP WITH ABSURD CASES HERE

    //* Generate
    for (var i = 0; i < decoded.length; i++) {
      rows.push(
        <ImportRow
          selectable={this.state.selectable}
          key={decoded[i].key}
          simC=""
          decoded={decoded[i]}
        />
      );
    }

    return rows;
  };

  render() {
    return (
      <div id="imports-table" class="padding-top-40">
        {/* {log.info(this.state.selectable)} */}
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
          <tbody>{this.populateTable()}</tbody>
        </table>
      </div>
    );
  }
  componentDidMount() {}

  componentWillUnmount() {}
}
