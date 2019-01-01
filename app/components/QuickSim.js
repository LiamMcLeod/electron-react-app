// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

type Props = {};

export default class QuickSim extends Component<Props> {
  props: Props;

  render() {
    return(
       <section id="quick-sim" data-tid="container">
        <p><Link to={routes.HOME}>Return</Link></p>
        <div>
        
         {/* <form> */}
          <label>Region</label>
          <select>
            <option>EU </option>
            <option>US</option>
          </select>
           Realm
           <input/> 
           Character
           <input/>
         {/* </form> */}
        </div>
      </section>
    )
  }
}
