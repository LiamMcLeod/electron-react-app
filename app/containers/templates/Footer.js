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
        <div class="row">
          <div class="col" />
          <div class="col">
            <h4 class="heading">Etc</h4>
            <div class="block">
              <p class="text">
                <a
                  href="https://medium.com/raidbots/frequently-asked-questions-2933b01a2d6e"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FAQ
                </a>
              </p>
              <p class="text">
                <a
                  href="https://medium.com/raidbots"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </p>
              <p class="text">
                <a
                  href="https://www.patreon.com/seriallos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Patreon
                </a>
              </p>
              <p class="text">
                <a href="https://github.com/seriallos/raidbots-issues/issues">
                  Report a bug
                </a>
              </p>
              <p class="text">
                <a href="/developers">Developers</a>
              </p>
              <p class="text">
                <a href="/privacy">Privacy Policy</a>
              </p>
            </div>
          </div>
          <div class="col" />
          <div class="col" />
          <div class="col">
            <h4 class="heading">Contact</h4>
            <div class="block">
              <p class="text">
                Twitter:{' '}
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @placeholder
                </a>
              </p>
              <p class="text">
                Discord:{' '}
                <a
                  href="https://discord.gg/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  placeholder
                </a>
              </p>
              <p class="text">
                Email:{' '}
                <a href="mailto:liammcleod@placeholder.com">
                  liam@placeholder.com
                </a>
              </p>
              <p class="text">
                Inspired by Seriallos' Raidbots.com, Ported to React
              </p>
            </div>
          </div>
          <div class="col" />
        </div>
      </footer>
    );
  }
}
