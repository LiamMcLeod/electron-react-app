// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';

type Props = {};

export default class Nav extends Component<Props> {
  props: Props;

  render() {
    // TODO ADJUST LINKS
    return (
      <footer>
        <div className="row">
          <div className="col" />
          <div className="col">
            <h4 className="heading">Etc</h4>
            <div className="block">
              <p className="text">
                <a
                  href="https://medium.com/raidbots/frequently-asked-questions-2933b01a2d6e"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FAQ
                </a>
              </p>
              <p className="text">
                <a
                  href="https://medium.com/raidbots"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </p>
              <p className="text">
                <a
                  href="https://www.patreon.com/seriallos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Patreon
                </a>
              </p>
              <p className="text">
                <a href="https://github.com/seriallos/raidbots-issues/issues">
                  Report a bug
                </a>
              </p>
              <p className="text">
                <a href="/developers">Developers</a>
              </p>
              <p className="text">
                <a href="/privacy">Privacy Policy</a>
              </p>
            </div>
          </div>
          <div className="col" />
          <div className="col" />
          <div className="col">
            <h4 className="heading">Contact</h4>
            <div className="block">
              <p className="text">
                Twitter:{' '}
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @placeholder
                </a>
              </p>
              <p className="text">
                Discord:{' '}
                <a
                  href="https://discord.gg/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  placeholder
                </a>
              </p>
              <p className="text">
                Email:{' '}
                <a href="mailto:liammcleod@placeholder.com">
                  liam@placeholder.com
                </a>
              </p>
              <p className="text">
                Inspired by Seriallos' Raidbots.com, Ported to React
              </p>
            </div>
          </div>
          <div className="col" />
        </div>
      </footer>
    );
  }
}
