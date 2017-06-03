// @flow
import React from 'react';
import { Map, List, fromJS } from 'immutable';
import CSSGroup from 'react-transition-group/CSSTransitionGroup';
import Mousetrap from 'mousetrap';

import { Navbar } from '../navbar';
import { Floater } from './floater';
import { Header } from './header';
import { Features } from './features';
import { Box } from './box';
import { Discussions } from './discussions';
import { Button } from '../button';

// presentational component for view/changeset.js
export class Changeset extends React.PureComponent {
  state = {
    width: 0,
    left: 0,
    discussions: false,
    features: false,
    details: true,
    showAll: true
  };
  props: {
    changesetId: number,
    currentChangeset: Map<string, *>
  };
  componentDidMount() {
    Mousetrap.bind('ctrl+a', () => {
      this.toggleAll();
    });
    Mousetrap.bind('ctrl+s', () => {
      this.toggleFeatures();
    });
    Mousetrap.bind('ctrl+d', () => {
      this.toggleDiscussions();
    });
    Mousetrap.bind('ctrl+o', () => {
      this.toggleDetails();
    });
  }
  setRef = (r: any) => {
    if (!r) return;
    var rect = r.parentNode.parentNode.parentNode.getBoundingClientRect();
    this.setState({
      width: parseInt(rect.width, 10),
      left: parseInt(rect.left, 10)
    });
  };

  ref = null;

  showFloaters = () => {
    const { changesetId, currentChangeset } = this.props;
    const properties = currentChangeset.get('properties');

    return (
      <CSSGroup
        name="floaters"
        transitionName="floaters"
        transitionAppearTimeout={300}
        transitionAppear={true}
        transitionEnterTimeout={400}
        transitionLeaveTimeout={250}
      >
        {this.state.details &&
          <Box key={3} className=" w480 round-tr round-br">
            <Header changesetId={changesetId} properties={properties} />
          </Box>}
        {this.state.features &&
          <Box key={2} className=" w480 round-tr round-br">
            <Features changesetId={changesetId} properties={properties} />
          </Box>}
        {this.state.discussions &&
          <Box key={1} className=" w480  round-tr round-br">
            <Discussions changesetId={changesetId} properties={properties} />
          </Box>}
      </CSSGroup>
    );
  };

  toggleAll = () => {
    this.setState({
      features: this.state.showAll,
      discussions: this.state.showAll,
      details: this.state.showAll,
      showAll: !this.state.showAll
    });
  };
  toggleFeatures = () => {
    this.setState({
      discussions: false,
      details: false,
      showAll: false,
      features: !this.state.features
    });
  };
  toggleDiscussions = () => {
    this.setState({
      discussions: !this.state.discussions,
      details: false,
      showAll: false,
      features: false
    });
  };
  toggleDetails = () => {
    this.setState({
      discussions: false,
      details: !this.state.details,
      showAll: false,
      features: false
    });
  };
  render() {
    return (
      <div className="flex-child clip" ref={this.setRef}>
        <Floater
          style={{
            top: 55 * 1.2,
            width: 80,
            left: this.state.left - 15
          }}
        >
          <Button
            active={this.state.details}
            onClick={this.toggleDetails}
            bg={'white'}
            className="unround-r unround-bl"
          >
            <svg className="icon inline-block align-middle ">
              <use xlinkHref="#icon-eye" />
            </svg>
          </Button>
          <Button
            active={this.state.features}
            onClick={this.toggleFeatures}
            bg={'white'}
            className="unround"
          >
            <svg className="icon inline-block align-middle">
              <use xlinkHref="#icon-bug" />
            </svg>
          </Button>
          <Button
            active={this.state.discussions}
            onClick={this.toggleDiscussions}
            bg={'white'}
            className="unround"
          >
            <svg className="icon inline-block align-middle">
              <use xlinkHref="#icon-tooltip" />
            </svg>
          </Button>
          <Button
            active={!this.state.showAll}
            onClick={this.toggleAll}
            bg={'white'}
            className="unround-r unround-tl"
          >
            {this.state.showAll
              ? <svg className="icon inline-block align-middle">
                  <use xlinkHref="#icon-database" />
                </svg>
              : <svg className="icon inline-block align-middle">
                  <use xlinkHref="#icon-database" />
                </svg>}
          </Button>
        </Floater>
        <Floater
          style={{
            top: 55 * 1.2,
            width: 480,
            left: 40 + this.state.left
          }}
        >
          {this.showFloaters()}
        </Floater>
      </div>
    );
  }
}