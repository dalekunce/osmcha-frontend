// @flow
import React from 'react';
import { List } from 'immutable';
import moment from 'moment';
import AnchorifyText from 'react-anchorify-text';
import AssemblyAnchor from '../assembly_anchor';
import TranslateButton from './translate_button';

export class Discussions extends React.PureComponent {
  props: {
    discussions: List<*>,
    changesetId: number
  };
  render() {
    const { discussions, changesetId } = this.props;
    return (
      <div className="px12 py6">
        <h2 className="txt-m txt-uppercase txt-bold mr6 mb3">
          Discussions
        </h2>
        {discussions.size === 0
          ? <div className="flex-parent flex-parent--column flex-parent--center-cross mb12">
              <svg className="icon icon--xxl color-darken25">
                <use xlinkHref="#icon-contact" />
              </svg>
              <p className="txt-m">{`No discussions found for ${changesetId}.`}</p>
            </div>
          : <div className="">
              {discussions.map((f, k) =>
                <div
                  key={k}
                  className="flex-parent flex-parent--column justify--space-between border border--gray-light round p6 my6 mt12"
                >
                  <div className="flex-parent flex-parent--row justify--space-between txt-s ">
                    <span>
                      By{' '}
                      <span className="txt-bold">
                        {f.get('userName')}&nbsp;
                      </span>
                    </span>
                    <span>{moment(f.get('timestamp')).fromNow()}</span>
                  </div>
                  <div className="flex-parent flex-parent--column mt6 mb3">
                    <p className="txt-break-url">
                      <AnchorifyText text={f.get('comment')}>
                        <AssemblyAnchor />
                      </AnchorifyText>
                    </p>
                  </div>
                  <div className="flex-parent justify--flex-end">
                    <TranslateButton text={f.get('comment')} />
                  </div>
                </div>
              )}
            </div>}
        <div className="flex-parent flex-parent--center-main my12">
          <a
            target="_blank"
            rel="noopener noreferrer"
            title="Add a comment on OSM"
            href={`https://openstreetmap.org/changeset/${changesetId}`}
            className="btn btn--s border border--1 border--darken5 border--darken25-on-hover round bg-darken10 bg-darken5-on-hover color-gray transition pl12 pr6"
          >
            Add a comment on OSM
            <svg className="icon inline-block align-middle pl3 pb3">
              <use xlinkHref="#icon-share" />
            </svg>
          </a>
        </div>
      </div>
    );
  }
}
